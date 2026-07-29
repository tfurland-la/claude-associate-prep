"""Deterministic pre-screen over questions_pending.json.

Runs the checks a script can decide, so the LLM screening pass (and the human
review after it) only spends attention on judgment: whether a claim is fabricated
and whether a distractor is defensible.

Reports; never deletes. The author decides what goes.

    python3 practice-exam/screen_mechanical.py
"""

import json
import re
import sys
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import exam_lib  # noqa: E402

PENDING_PATH = exam_lib.PRACTICE_EXAM_DIR / "questions_pending.json"

# The credential is explicitly not for people who build against APIs, so a
# question turning on any of these is out of scope however well written.
# Only terms with no ordinary business sense. "compile" and "repository" were
# here and produced nothing but false positives — "compiles a weekly status
# report", "document repository" — so a term that a non-technical person would
# plausibly write does not belong on this list, however technical it sounds.
DEVELOPER_TERMS = [
    "agent sdk", "agentic loop", "mcp server", "mcp tool", "ci/cd", "json schema",
    "json-schema", "tool_use", "tool_choice", "stop_reason", "subagent", "api key",
    "webhook", "pull request", "codebase", "stack trace", "regex", "sql query",
    "http request", "rest api", "python script",
]

# Shape-valid stub content the generator emits when it gives up.
STUB_MARKERS = ["test scenario", "lorem", "option a", "placeholder", "tbd", "xxx", "example.com"]


def norm(text):
    return re.sub(r"\W+", " ", (text or "").lower()).strip()


def similarity(a, b):
    return SequenceMatcher(None, norm(a), norm(b)).ratio()


def main():
    if not PENDING_PATH.exists():
        print("no pending file")
        return 1
    pending = json.loads(PENDING_PATH.read_text(encoding="utf-8"))
    bank = exam_lib.load_bank()
    findings = defaultdict(list)

    for i, q in enumerate(pending):
        ts = q.get("taskStatement", "?")
        tag = f"[{i}] {ts}"
        blob = json.dumps(q).lower()

        # 1. Content shape. Neither validate_question mode fits a pending entry:
        #    require_provenance=True demands reviewed=true (false by definition
        #    until a human passes it), and False rejects the id/provenance that
        #    generate_bank.py does attach on write. So validate the content on a
        #    stripped copy, which is the part worth checking at this stage.
        content = {k: v for k, v in q.items() if k not in ("id", "provenance")}
        try:
            exam_lib.validate_question(content, require_provenance=False)
        except ValueError as err:
            findings["INVALID SCHEMA"].append(f"{tag}: {err}")
        else:
            if q.get("id") and q["id"] != exam_lib.question_id(q):
                findings["STALE ID"].append(f"{tag}: id does not match content hash")

        # 2. Audience: developer content the prompt forbids.
        hits = sorted({t for t in DEVELOPER_TERMS if t in blob})
        if hits:
            findings["DEVELOPER CONTENT"].append(f"{tag}: {', '.join(hits)}")

        # 3. Literal escape sequences. A backslash-n that survived into the text
        #    renders as the characters "\n" in the exam UI. Textual-similarity and
        #    stub checks both miss it because the question is otherwise fine.
        for field in ("scenario", "question"):
            if re.search(r"\\[nt]", q.get(field, "")):
                findings["LITERAL ESCAPE"].append(f"{tag}: {field} contains a literal escape sequence")
        for key, val in q.get("options", {}).items():
            if re.search(r"\\[nt]", val):
                findings["LITERAL ESCAPE"].append(f"{tag}: option {key} contains a literal escape sequence")

        # 4. Stub / placeholder content.
        stubs = sorted({m for m in STUB_MARKERS if m in blob})
        if stubs:
            findings["STUB CONTENT"].append(f"{tag}: {', '.join(stubs)}")

        # 5. Circular explanations: the rationale just restates the option.
        for key in exam_lib.correct_keys(q):
            opt, exp = q["options"].get(key, ""), q["explanations"].get(key, "")
            if opt and exp and similarity(opt, exp) > 0.72:
                findings["CIRCULAR RATIONALE"].append(
                    f"{tag} option {key}: rationale restates the option "
                    f"(similarity {similarity(opt, exp):.2f})")

        # 6. Option-length tell: the longest option being correct is a giveaway
        #    a test-wise candidate can exploit without knowing the content.
        lengths = {k: len(v) for k, v in q["options"].items()}
        longest = max(lengths, key=lengths.get)
        if longest in exam_lib.correct_keys(q) and len(lengths) > 1:
            second = sorted(lengths.values())[-2]
            if lengths[longest] > second * 1.6:
                findings["LENGTH TELL"].append(
                    f"{tag}: correct option {longest} is {lengths[longest]} chars vs "
                    f"{second} for the next longest")

        # 7. Answer-position skew is checked in aggregate below.

    # 8. Near-duplicates within the batch and against the committed bank.
    #
    #    KNOWN BLIND SPOT, measured: this compares scenario *text*, and text
    #    similarity does not find the duplication that actually matters. On the
    #    first 95-question batch this check reported nothing (highest
    #    same-objective similarity 0.15), while an LLM reviewer rejected 38 of 95
    #    as near-duplicates — questions that swap the persona and the surface
    #    details but teach one identical lesson with the same distractor skeleton.
    #    So "NEAR-DUPLICATE: none" here means only "no copied wording". Lesson-level
    #    convergence needs the judgment screen; do not read a clean run as
    #    diversity.
    for i, q in enumerate(pending):
        for j in range(i + 1, len(pending)):
            r = pending[j]
            if q.get("taskStatement") != r.get("taskStatement"):
                continue
            sim = similarity(q.get("scenario", ""), r.get("scenario", ""))
            if sim > 0.62:
                findings["NEAR-DUPLICATE (batch)"].append(
                    f"[{i}] vs [{j}] {q['taskStatement']}: scenario similarity {sim:.2f}")
        for b in bank:
            if b.get("taskStatement") != q.get("taskStatement"):
                continue
            sim = similarity(q.get("scenario", ""), b.get("scenario", ""))
            if sim > 0.62:
                findings["NEAR-DUPLICATE (bank)"].append(
                    f"[{i}] {q['taskStatement']}: {sim:.2f} vs banked {b['id']}")

    # ── Report ────────────────────────────────────────────────────────────
    print(f"screened {len(pending)} candidates against {len(bank)} banked\n")

    per_ts = Counter(q.get("taskStatement") for q in pending)
    missing = [ts for ts in exam_lib.TASK_STATEMENTS if ts not in per_ts]
    print(f"objectives covered : {len(per_ts)}/{len(exam_lib.TASK_STATEMENTS)}"
          + (f"  MISSING: {', '.join(missing)}" if missing else ""))

    positions = Counter(
        k for q in pending for k in exam_lib.correct_keys(q))
    total_keys = sum(positions.values())
    spread = "  ".join(f"{k}={positions.get(k,0)}" for k in "ABCDE" if positions.get(k))
    print(f"answer positions   : {spread}")
    if total_keys:
        worst = max(positions.values()) / total_keys
        if worst > 0.40:
            print(f"  ^ SKEWED: one position holds {worst:.0%} of correct answers "
                  f"(expect ~25% each). A test-wise candidate can exploit this.")

    multi = [q for q in pending if len(exam_lib.correct_keys(q)) > 1]
    print(f"multiple-response  : {len(multi)} of {len(pending)} "
          f"({len(multi)/max(1,len(pending)):.0%}) — prompt generates single-answer only\n")

    if not findings:
        print("MECHANICAL SCREEN CLEAN — nothing for a script to object to.")
        print("Judgment checks (fabricated claims, defensible distractors) still needed.")
        return 0

    flagged = set()
    for category in sorted(findings):
        items = findings[category]
        print(f"── {category} ({len(items)}) ──")
        for line in items[:14]:
            print(f"  {line}")
            m = re.match(r"\[(\d+)\]", line)
            if m:
                flagged.add(int(m.group(1)))
        if len(items) > 14:
            print(f"  … and {len(items) - 14} more")
        print()
    print(f"candidates with at least one mechanical flag: {len(flagged)} of {len(pending)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
