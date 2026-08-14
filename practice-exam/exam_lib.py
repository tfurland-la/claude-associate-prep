"""Shared library for the CCAO-F local practice exam.

Owns the question bank format (questions.js), question validation, and
question generation through the local Claude Code CLI (`claude -p`). The bank
file is machine-written: render_bank() is the only writer and load_bank() the
only reader, so the file layout is a private contract of this module.
"""

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

PRACTICE_EXAM_DIR = Path(__file__).parent


def _resolve_resource_dir():
    """Read-only assets (exam.html, questions.js, the generation prompt) live
    next to this file in a checkout, but inside the PyInstaller bundle when
    the desktop app is frozen into an executable."""
    if getattr(sys, "frozen", False):
        return Path(sys._MEIPASS)
    return Path(__file__).parent


RESOURCE_DIR = _resolve_resource_dir()
BANK_PATH = RESOURCE_DIR / "questions.js"
PROMPT_PATH = RESOURCE_DIR / "generation_prompt.md"

BANK_HEADER = (
    "// CCAO-F practice exam question bank - machine-written by exam_lib.render_bank().\n"
    "// Do not hand-edit; add or change questions via generate_bank.py.\n"
)
BANK_MARKER = "window.CCAOF_BANK ="

# Minimum committed questions per task statement, enforced by pytest so bank
# coverage cannot silently regress below three questions per statement.
MIN_PER_TASK = 3

# Domain quotas for a 60-question timed exam form, mirroring the published
# weighting (14/21/12/16/12/15/10%) rounded to integers that sum to 60. Matches
# EXAM_FORM_QUOTAS in adaptive.js (cross-checked by test_practice_exam_js.py).
EXAM_FORM_QUOTAS = {
    "D1": 8, "D2": 13, "D3": 7, "D4": 10, "D5": 7, "D6": 9, "D7": 6,
}

DOMAINS = {
    "D1": "Prompting and Task Execution",
    "D2": "Output Evaluation and Validation",
    "D3": "Product and Model Selection",
    "D4": "Workflow Integration and Solution Design",
    "D5": "Configuration and Knowledge Management",
    "D6": "Governance, Risk, and Responsible Use",
    "D7": "Troubleshooting and Optimization",
}

# The 30 objectives from exam guide v1.0 section 6, verbatim. The guide lists them
# as unnumbered bullets under each domain; the D<n>.<m> keys are ours, assigned in
# guide order so the domain can be recovered as key.split(".")[0].
TASK_STATEMENTS = {
    "D1.1": "Create effective prompts for business and technical tasks",
    "D1.2": "Apply task decomposition techniques to structure complex requests",
    "D1.3": "Iterate prompts to improve output quality",
    "D1.4": "Adapt prompting strategies based on task type (analysis, research, drafting, brainstorming)",
    "D2.1": "Evaluate Claude-generated outputs for accuracy and completeness",
    "D2.2": "Identify hallucinations, inconsistencies, and biases in responses",
    "D2.3": "Apply fact-checking and validation techniques",
    "D2.4": "Determine when human review or additional verification is required",
    "D2.5": "Edit, adapt, refine, and compare outputs for the intended audience",
    "D2.6": "Organize and curate information and select appropriate output formats (artifacts, inline, structured data)",
    "D3.1": "Select appropriate Claude product features (Projects, research mode, chat, artifacts)",
    "D3.2": "Differentiate between Claude model types (Haiku, Sonnet, Opus)",
    "D3.3": "Align model selection with task requirements (cost, speed, quality)",
    "D3.4": "Understand and manage context limitations and memory considerations (when to restart, summarize, or persist)",
    "D4.1": "Apply Claude to analyze requirements and use cases",
    "D4.2": "Leverage Claude for research, planning, and process optimization",
    "D4.3": "Use Claude to support solution design, development, and iteration",
    "D4.4": "Integrate Claude into existing workflows to augment or redesign them",
    "D4.5": "Communicate Claude's value and limitations to stakeholders",
    "D5.1": "Configure Claude Projects with instructions and knowledge sources",
    "D5.2": "Manage uploaded knowledge and connectors (e.g., Google Drive, Gmail)",
    "D5.3": "Create effective system-level instructions",
    "D5.4": "Inform, maintain, and update Claude configurations, knowledge sources, and instructions",
    "D6.1": "Identify appropriate and inappropriate use cases",
    "D6.2": "Apply data sensitivity, regulatory, and privacy considerations",
    "D6.3": "Follow organizational AI policies and governance standards",
    "D6.4": "Understand the ethical implications of AI usage",
    "D7.1": "Identify, diagnose, and resolve issues with underperforming prompts or poor outputs",
    "D7.2": "Adjust approach based on feedback and results",
    "D7.3": "Optimize workflows for efficiency and effectiveness",
}

# Option count follows the ITEM TYPE, not the answer count:
#   standard        4 options (A-D), one correct
#   multiple-response  5 options (A-E), two or more correct
#   sequencing      5 options (A-E), one correct — five candidate orderings
# validate_question enforces the pairing, so a mismatched item cannot reach the
# bank. Both five-option shapes are confirmed by a first-hand account after a real
# sitting: "select two" items appear at roughly one in six, and 4-5 of the 60 items
# are sequencing.
OPTION_KEYS = ("A", "B", "C", "D")
MULTI_OPTION_KEYS = ("A", "B", "C", "D", "E")
PROVENANCE_SOURCES = ("official-sample", "seed-generated", "refill", "hand-authored")

# "sequencing" asks the candidate to put five numbered steps in order. It is
# structurally single-answer with five options, a shape the old option/answer
# coupling rejected outright.
ITEM_TYPES = ("standard", "sequencing")

# Optional per-question fields: present on some items, absent on others, so they
# are excluded from the required set but allowed by the unexpected-field check.
OPTIONAL_FIELDS = {"selectCount", "itemType"}
PROVENANCE_FIELDS = {"source", "model", "generatedAt", "reviewed"}
CONTENT_FIELDS = {
    "taskStatement",
    "domain",
    "scenario",
    "question",
    "options",
    "correct",
    "explanations",
}


def parse_ordering(text):
    """The step numbers in an ordering option, in the order written.

    Options read like "3 → 1 → 4 → 2 → 5"; only the integers matter, so the
    separator is free (arrow, comma, dash) and prose around it is ignored.
    """
    return tuple(int(n) for n in re.findall(r"\d+", text))


def validate_sequencing_shape(options, correct_key):
    """Enforce the distractor architecture reported from a real sitting.

    Of the five orderings, exactly two share the same first and last step — those
    are the real contest, and the answer is one of them. The other three are
    eliminable on first or last alone. Enforcing this matters because an item
    that fails it is either trivially guessable (the key is the only one with a
    plausible first step) or unfairly hard (three survive the elimination pass),
    and neither trains the judgment the exam actually asks for.
    """
    orderings = {key: parse_ordering(text) for key, text in options.items()}

    lengths = {len(o) for o in orderings.values()}
    if lengths != {5}:
        raise ValueError(
            f"each sequencing option must list five steps; got lengths {sorted(lengths)}")

    step_sets = {frozenset(o) for o in orderings.values()}
    if len(step_sets) != 1:
        raise ValueError(
            "every sequencing option must be a permutation of the same five steps; "
            f"found {len(step_sets)} different step sets")
    steps = next(iter(step_sets))
    for key, order in orderings.items():
        if len(set(order)) != 5:
            raise ValueError(f"option {key} repeats a step: {order}")
    if steps != set(range(1, 6)):
        raise ValueError(f"sequencing steps must be numbered 1-5, got {sorted(steps)}")

    endpoints = {}
    for key, order in orderings.items():
        endpoints.setdefault((order[0], order[-1]), []).append(key)
    contested = [keys for keys in endpoints.values() if len(keys) > 1]
    if len(contested) != 1 or len(contested[0]) != 2:
        shape = sorted(len(k) for k in endpoints.values())
        raise ValueError(
            "exactly two options must share the same first and last step "
            f"(the contested pair); endpoint grouping was {shape}")

    if correct_key not in contested[0]:
        raise ValueError(
            f"the correct answer must be one of the contested pair {contested[0]}; "
            f"{correct_key} is eliminable on its first or last step alone")

    # The rules above are necessary but not sufficient, which drawn items proved:
    # a third option may still open on the pair's first step provided it closes
    # differently, and every one of the first seven authored items did exactly
    # that. Then "eliminate on the opening" clears two distractors rather than
    # three, and one form ran four of five options closing on the same step. So
    # pin both ends: the pair's opening belongs to the pair alone, each distractor
    # opens somewhere different, and only one may borrow the pair's ending.
    pair_first, pair_last = orderings[correct_key][0], orderings[correct_key][-1]
    others = [key for key in sorted(orderings) if key not in contested[0]]

    opening = {}
    for key in others:
        opening.setdefault(orderings[key][0], []).append(key)
    if pair_first in opening:
        raise ValueError(
            f"option(s) {opening[pair_first]} open on step {pair_first}, the same "
            f"first step as the contested pair {contested[0]} — eliminating on the "
            "first step must remove all three distractors, not two")
    repeated = {step: keys for step, keys in opening.items() if len(keys) > 1}
    if repeated:
        raise ValueError(
            f"distractors must each open on a different first step; {repeated} "
            "share one, which wastes an elimination")

    sharing_last = [key for key in others if orderings[key][-1] == pair_last]
    if len(sharing_last) > 1:
        raise ValueError(
            f"at most one distractor may close on step {pair_last}, the contested "
            f"pair's last step; {sharing_last} all do, leaving the last step with "
            "almost no signal")


def length_bias(question):
    """Mean length of the correct options over mean length of the distractors.

    1.0 is no bias. The single-longest-option check misses the multiple-response
    shape entirely: with two correct options neither need be the outright longest
    while the pair still runs consistently longer, which lets a candidate pick the
    two longest and score without reading. Measured on the first hand-authored
    batch, the correct pair WAS the two longest in 6 of 11 items.

    The cause is structural rather than careless: a correct option is usually the
    qualified one ("do X, because Y") while a distractor is a single flat claim.
    The fix is to give the distractors the same shape, never to trim the key.
    """
    keys = set(correct_keys(question))
    options = question["options"]
    correct = [len(v) for k, v in options.items() if k in keys]
    distractors = [len(v) for k, v in options.items() if k not in keys]
    if not correct or not distractors:
        return 1.0
    return (sum(correct) / len(correct)) / (sum(distractors) / len(distractors))


def correct_are_length_extreme(question):
    """True when the correct options are exactly the longest OR exactly the shortest
    — either way a test-wise candidate can sort by length and skip the reading."""
    keys = set(correct_keys(question))
    by_length = sorted(question["options"], key=lambda k: len(question["options"][k]))
    n = len(keys)
    # Both ends matter. Correcting only the "longest" case pushed the first batch
    # straight through parity into the mirror tell: pick-the-two-shortest went from
    # scoring 4 of 11 to 7 of 11, worse than the bias being fixed.
    return set(by_length[-n:]) == keys or set(by_length[:n]) == keys


def canonical_content(question):
    """Canonical JSON of the fields that define a question's identity."""
    content = {
        "scenario": question["scenario"],
        "question": question["question"],
        "options": question["options"],
    }
    return json.dumps(content, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def question_id(question):
    digest = hashlib.sha256(canonical_content(question).encode("utf-8")).hexdigest()
    return f"{question['taskStatement']}-{digest[:8]}"


def validate_question(question, *, require_provenance=True):
    """Raise ValueError describing the first problem found; return None if valid.

    require_provenance=False validates a freshly generated candidate, which has
    no id or provenance yet (they are added when the question enters the bank).
    """
    if not isinstance(question, dict):
        raise ValueError("question must be a JSON object")

    required = set(CONTENT_FIELDS)
    if require_provenance:
        required |= {"id", "provenance"}
    missing = required - question.keys()
    if missing:
        raise ValueError(f"missing fields: {sorted(missing)}")
    extra = question.keys() - required - OPTIONAL_FIELDS
    if extra:
        raise ValueError(f"unexpected fields: {sorted(extra)}")

    ts = question["taskStatement"]
    if ts not in TASK_STATEMENTS:
        raise ValueError(f"unknown task statement: {ts!r}")
    if question["domain"] != ts.split(".")[0]:
        raise ValueError(f"domain {question['domain']!r} does not match task statement {ts!r}")

    for field in ("scenario", "question"):
        value = question[field]
        if not isinstance(value, str) or not value.strip():
            raise ValueError(f"{field} must be a non-empty string")

    # `correct` is a bare key on a single-answer item and a list on a
    # multiple-response one. Normalize first so the checks below read the same way
    # for both, then let the number of correct keys decide the expected shape.
    raw_correct = question["correct"]
    if isinstance(raw_correct, list):
        if len(set(raw_correct)) != len(raw_correct):
            raise ValueError(f"correct has duplicate keys: {raw_correct!r}")
        correct_keys = sorted(raw_correct)
    else:
        correct_keys = [raw_correct]
    if not correct_keys:
        raise ValueError("correct must name at least one option")

    item_type = question.get("itemType", "standard")
    if item_type not in ITEM_TYPES:
        raise ValueError(f"itemType must be one of {ITEM_TYPES}, got {item_type!r}")

    # Option count follows the item type, not the answer count. A sequencing item is
    # single-answer with five options (five candidate orderings); a multiple-response
    # item is many-answer with five; a standard item is single-answer with four.
    if item_type == "sequencing":
        if len(correct_keys) != 1:
            raise ValueError("a sequencing item is single-answer; got "
                             f"{len(correct_keys)} correct keys")
        expected_keys = MULTI_OPTION_KEYS  # five orderings, A-E
    else:
        expected_keys = MULTI_OPTION_KEYS if len(correct_keys) > 1 else OPTION_KEYS

    for block_name in ("options", "explanations"):
        block = question[block_name]
        if not isinstance(block, dict) or tuple(sorted(block)) != expected_keys:
            noun = ("five options" if item_type == "sequencing"
                    else f"exactly the keys {', '.join(expected_keys)} "
                         f"for a {len(correct_keys)}-answer item")
            raise ValueError(f"{block_name} must have {noun}")
        for key, value in block.items():
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"{block_name}.{key} must be a non-empty string")

    for key in correct_keys:
        if key not in expected_keys:
            raise ValueError(f"correct key {key!r} is not one of {expected_keys}")

    if item_type == "sequencing":
        validate_sequencing_shape(question["options"], correct_keys[0])

    # selectCount is optional and purely a rendering aid ("Select 2"), so when it
    # is present it must agree with the answer key or the stem lies to the reader.
    if "selectCount" in question:
        declared = question["selectCount"]
        if not isinstance(declared, int) or isinstance(declared, bool):
            raise ValueError(f"selectCount must be an integer, got {declared!r}")
        if declared != len(correct_keys):
            raise ValueError(
                f"selectCount {declared} disagrees with {len(correct_keys)} correct keys"
            )

    if require_provenance:
        if question["id"] != question_id(question):
            raise ValueError(f"id {question['id']!r} does not match content hash")
        prov = question["provenance"]
        if not isinstance(prov, dict) or set(prov) != PROVENANCE_FIELDS:
            raise ValueError(f"provenance must have exactly the fields {sorted(PROVENANCE_FIELDS)}")
        if prov["source"] not in PROVENANCE_SOURCES:
            raise ValueError(f"provenance.source must be one of {PROVENANCE_SOURCES}")
        if prov["reviewed"] is not True:
            raise ValueError("committed questions must have provenance.reviewed = true")


def load_bank(path=BANK_PATH):
    source = Path(path).read_text(encoding="utf-8")
    start = source.index(BANK_MARKER) + len(BANK_MARKER)
    end = source.rindex(";")
    return json.loads(source[start:end])


def render_bank(bank, path=None):
    """Render the bank to questions.js source; optionally write it to path."""
    body = json.dumps(bank, indent=2, ensure_ascii=False)
    source = f"{BANK_HEADER}{BANK_MARKER} {body};\n"
    if path is not None:
        Path(path).write_text(source, encoding="utf-8")
    return source


# ── Question generation via the local Claude Code CLI ──────────────────────
#
# `claude -p` rides the user's existing Claude Code authentication, so there
# is no API key anywhere in this tool. --bare is deliberately NOT used: it
# skips OAuth/keychain auth. The subprocess runs from a neutral temp directory
# so this repo's CLAUDE.md and hooks are not loaded into generation calls.

DEFAULT_MODEL = "claude-sonnet-5"
GENERATION_TIMEOUT_SECONDS = 120

# Working personas for question scenarios. Unlike the Architect exam, CCAO-F has
# no published scenario clusters — its items are standalone — so this list is not
# an exam structure. It exists only for variety: rotating through it when
# generating several questions for one objective prevents template reskinning.
#
# The roles are the ones the guide names in "Intended Audience" (operations,
# marketing, project management, education, communications, general knowledge
# work, plus external consultants). Deliberately non-technical: the guide states
# the credential "is not intended for software developers who build against APIs
# or design agentic systems", and no API or software-development experience is
# assumed.
PERSONAS = (
    "Operations Lead",
    "Marketing Manager",
    "Project Manager",
    "Communications or HR Professional",
    "Educator or Trainer",
    "Knowledge Worker or Analyst",
    "External Consultant",
)

_OPTION_BLOCK_SCHEMA = {
    "type": "object",
    "properties": {key: {"type": "string"} for key in OPTION_KEYS},
    "required": list(OPTION_KEYS),
    "additionalProperties": False,
}

QUESTION_JSON_SCHEMA = {
    "type": "object",
    "properties": {
        "taskStatement": {"type": "string"},
        "domain": {"type": "string"},
        "scenario": {"type": "string"},
        "question": {"type": "string"},
        "options": _OPTION_BLOCK_SCHEMA,
        "correct": {"type": "string", "enum": list(OPTION_KEYS)},
        "explanations": _OPTION_BLOCK_SCHEMA,
    },
    "required": [
        "taskStatement",
        "domain",
        "scenario",
        "question",
        "options",
        "correct",
        "explanations",
    ],
    "additionalProperties": False,
}


def attach_provenance(candidate, source, model=None, generated_at=None):
    """Turn a validated generation candidate into a pending bank entry.

    Pending entries carry reviewed=False; merge (generate_bank.py --merge)
    flips it after human review. The id is a content hash, so it must be
    recomputed if the reviewer edits the question.
    """
    entry = dict(candidate)
    entry["provenance"] = {
        "source": source,
        "model": model,
        "generatedAt": generated_at,
        "reviewed": False,
    }
    entry["id"] = question_id(entry)
    return entry


class GenerationError(Exception):
    """Question generation failed after the retry attempt."""


class ClaudeUnavailableError(Exception):
    """The `claude` CLI could not be located; generation cannot run at all."""


# GUI-launched apps (double-clicked, IDE run buttons) don't inherit the shell
# PATH — on macOS they get launchd's /usr/bin:/bin:… — so a plain PATH lookup
# misses the common ~/.local/bin install. Discovery order: explicit override,
# PATH, known install locations, then a login shell as the last resort.
CLAUDE_PATH_ENV = "CCAOF_CLAUDE"
CLAUDE_PROBE_PATHS = (
    Path.home() / ".local" / "bin" / "claude",
    Path("/opt/homebrew/bin/claude"),
    Path("/usr/local/bin/claude"),
)


def find_claude():
    override = os.environ.get(CLAUDE_PATH_ENV)
    if override:
        return override if Path(override).exists() else None
    found = shutil.which("claude")
    if found:
        return found
    for candidate in CLAUDE_PROBE_PATHS:
        if candidate.exists():
            return str(candidate)
    try:
        shell = os.environ.get("SHELL", "/bin/zsh")
        completed = subprocess.run(
            [shell, "-lc", "command -v claude"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        path = completed.stdout.strip()
        if completed.returncode == 0 and path:
            return path
    except Exception:
        pass
    return None


def _few_shot_block(bank):
    """The official sample questions, as JSON examples for the prompt."""
    examples = []
    for entry in bank:
        if entry.get("provenance", {}).get("source") != "official-sample":
            continue
        example = {field: entry[field] for field in
                   ("taskStatement", "domain", "scenario", "question",
                    "options", "correct", "explanations")}
        examples.append(json.dumps(example, indent=2, ensure_ascii=False))
    return "\n\n".join(examples)


def correct_keys(question):
    """`correct` as a sorted list, whether the item stored a key or a list."""
    raw = question["correct"]
    return sorted(raw) if isinstance(raw, list) else [raw]


def summarize_for_avoid(question):
    """Compact summary of an existing question, for the generation avoid-list."""
    keys = correct_keys(question)
    # Join the per-option rationales so a multi-answer item contributes the
    # reasoning for every correct option, not just the first.
    rationale = " ".join(question["explanations"][key] for key in keys)
    return (
        f"correct={','.join(keys)} | scenario: {question['scenario'][:160]} "
        f"| correct because: {rationale[:120]}"
    )


# Three timed-exam tiers reproduce the guide samples' spread. standard = mid
# (no block; guide Q1/Q10 register). harder = the graded middle. hard = the
# hard tail (guide Q9 register). All three bind every guardrail below — hard is
# a sharper principle distinction, never invented specifics or ambiguity.
DIFFICULTIES = ("standard", "harder", "hard")

# HARDER tier: the graded middle the real exam has — a single strong near-miss
# distractor, resolved once the candidate applies the right principle.
HARDER_DIFFICULTY_INSTRUCTIONS = (
    "- Make this a HARDER question (the graded middle, not the hard tail): "
    "include exactly ONE strong near-miss distractor that a partially-prepared "
    "candidate could pick, alongside two clearly-weaker options. The near-miss "
    "must be resolvable — once the candidate applies the right exam principle "
    "(e.g., root cause vs. symptom, proportionate first step, programmatic vs. "
    "probabilistic, scope matched to the problem), the correct answer is clear. "
    "It should read at the register of a mid-hard guide sample, not the Q9 hard "
    "tail. The distinction must be a real principle, never invented specifics.\n"
)

# HARD (hard-tail) tier: sharpen the principle distinction, never lean on
# invented specifics (the fabrication guardrail below still binds). Modeled on
# the exam guide's hardest sample (Q9, scoped verify_fact): two surface-
# plausible options where the decision turns on one exam principle.
HARD_DIFFICULTY_INSTRUCTIONS = (
    "- Make this a HARD-TAIL question. At least TWO of the four options must be "
    "defensible on the surface to a partially-knowledgeable candidate; the "
    "distinction between the best answer and the strongest distractor must turn "
    "on a single exam principle (e.g., programmatic enforcement vs. "
    "probabilistic compliance, root-cause fix vs. proportionate first step, "
    "least privilege, the exam-guide framing of the 'most effective FIRST "
    "step'). Model the option style on the official guide's scoped verify_fact "
    "question: plausible near-miss distractors, not obviously-wrong ones. "
    "Hard-tail means a sharper principle distinction, NOT reliance on invented "
    "technical specifics, ambiguity, or more than one genuinely correct answer "
    "— if a knowledgeable candidate still can't confidently choose, the "
    "question is broken, not hard.\n"
)


def build_prompt(task_statement, retry_feedback=None, bank=None, avoid=None,
                 persona=None, difficulty="standard"):
    if task_statement not in TASK_STATEMENTS:
        raise ValueError(f"unknown task statement: {task_statement!r}")
    if persona is not None and persona not in PERSONAS:
        raise ValueError(f"unknown persona: {persona!r}")
    if difficulty not in DIFFICULTIES:
        raise ValueError(f"unknown difficulty: {difficulty!r}")
    domain = task_statement.split(".")[0]
    if bank is None:
        bank = load_bank()
    retry_block = ""
    if retry_feedback:
        retry_block = (
            "IMPORTANT: your previous attempt failed validation with this "
            f"error:\n{retry_feedback}\n"
            "Produce corrected strict JSON that fixes exactly this problem.\n\n"
        )
    scenario_block = ""
    if persona:
        scenario_block = (
            f"- Set your scenario within this exam persona: "
            f"{persona}. Do not use a different persona.\n"
        )
    avoid_block = ""
    if avoid:
        listing = "\n".join(f"- {summary}" for summary in avoid)
        avoid_block = (
            "Questions for this task statement already exist, summarized "
            "below. Your question must NOT reuse their scenario premise, "
            "option skeleton, or correct-answer rationale — test a different "
            "failure mode or decision angle within this task statement. Also "
            "prefer a correct-answer letter that is not already "
            "over-represented in the summaries:\n" + listing + "\n\n"
        )
    difficulty_block = {
        "harder": HARDER_DIFFICULTY_INSTRUCTIONS,
        "hard": HARD_DIFFICULTY_INSTRUCTIONS,
    }.get(difficulty, "")
    prompt = PROMPT_PATH.read_text(encoding="utf-8")
    for placeholder, value in (
        ("{{TASK_ID}}", task_statement),
        ("{{TASK_LABEL}}", TASK_STATEMENTS[task_statement]),
        ("{{DOMAIN_ID}}", domain),
        ("{{DOMAIN_LABEL}}", DOMAINS[domain]),
        ("{{FEW_SHOT_EXAMPLES}}", _few_shot_block(bank)),
        ("{{PERSONA}}", scenario_block),
        ("{{DIFFICULTY}}", difficulty_block),
        ("{{AVOID}}", avoid_block),
        ("{{RETRY_FEEDBACK}}", retry_block),
    ):
        prompt = prompt.replace(placeholder, value)
    return prompt


def strip_fences(text):
    text = text.strip()
    if text.startswith("```"):
        first_newline = text.index("\n")
        text = text[first_newline + 1 :]
        if text.rstrip().endswith("```"):
            text = text.rstrip()[:-3]
    return text.strip()


def extract_candidate(envelope):
    """Pull the question JSON out of a `claude -p --output-format json` reply.

    With --json-schema the CLI validates and returns the object in
    `structured_output`; older output lands as text in `result`.
    """
    structured = envelope.get("structured_output")
    if isinstance(structured, dict):
        return structured
    return json.loads(strip_fences(envelope.get("result", "")))


def run_claude(prompt):
    binary = find_claude()
    if binary is None:
        raise ClaudeUnavailableError(
            "the `claude` CLI could not be found — install Claude Code, or "
            f"set {CLAUDE_PATH_ENV} to its full path"
        )
    model = os.environ.get("CCAOF_MODEL", DEFAULT_MODEL)
    try:
        completed = subprocess.run(
            [
                binary,
                "-p",
                "--output-format",
                "json",
                "--json-schema",
                json.dumps(QUESTION_JSON_SCHEMA),
                "--model",
                model,
            ],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=GENERATION_TIMEOUT_SECONDS,
            cwd=tempfile.gettempdir(),
        )
    except subprocess.TimeoutExpired as err:
        raise GenerationError(
            f"claude -p timed out after {GENERATION_TIMEOUT_SECONDS}s"
        ) from err
    if completed.returncode != 0:
        raise GenerationError(
            f"claude -p exited {completed.returncode}: {completed.stderr.strip()[-500:]}"
        )
    return json.loads(completed.stdout)


def generate_question(task_statement, run=run_claude, avoid=None, persona=None,
                      difficulty="standard"):
    """Generate and validate one question; retry once with error feedback.

    The retry-with-error-feedback loop is the exam's own D4.4 pattern applied
    to this tool. ClaudeUnavailableError propagates immediately — a missing
    CLI will not fix itself on retry. `avoid` lists summaries of existing
    questions for the task statement (see summarize_for_avoid), `persona`
    pins one of PERSONAS, and `difficulty` selects the standard or hard
    question tier — so repeated generations diversify instead of converging.
    """
    if task_statement not in TASK_STATEMENTS:
        raise ValueError(f"unknown task statement: {task_statement!r}")
    bank = load_bank()
    error = None
    for _ in range(2):
        prompt = build_prompt(
            task_statement,
            retry_feedback=error,
            bank=bank,
            avoid=avoid,
            persona=persona,
            difficulty=difficulty,
        )
        try:
            candidate = extract_candidate(run(prompt))
            validate_question(candidate, require_provenance=False)
            if candidate["taskStatement"] != task_statement:
                raise ValueError(
                    f"generated a question for {candidate['taskStatement']!r}, "
                    f"but {task_statement!r} was requested"
                )
            return candidate
        except (GenerationError, ValueError, KeyError, TypeError) as err:
            error = str(err)
    raise GenerationError(f"generation failed after retry: {error}")
