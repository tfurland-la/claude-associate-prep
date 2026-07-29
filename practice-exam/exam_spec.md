# CCAO-F Practice Exam — Specification

The durable design record for this practice exam: what it models, the numbers the
code depends on, how questions get into the bank, and where it knowingly diverges
from the real thing. `adaptive.js` and `exam_lib.py` implement this; when they and
this document disagree, that is a bug in one of them.

---

## The exam being modeled

Claude Certified Associate – Foundations, exam code **CCAO-F**. Source of truth is
the official exam guide, **v1.0, effective July 2026**, on the
[Anthropic Partner Academy][academy]. 60 items, 120 minutes, scaled score of 720
on a 100–1,000 range to pass, $99, valid 12 months.

**Item format, per guide §3:** "Multiple-choice and multiple-response items; each
item states how many responses to select." Items are **standalone** — unlike the
Architect exam there is no scenario-cluster structure, so nothing here draws a
subset of scenarios per form.

**Audience, per guide §3 — this constrains almost every other decision.** The
credential "is not intended for software developers who build against APIs or
design agentic systems", and assumes no software-development or API experience.
Its audience is operations, marketing, project management, education,
communications, general knowledge work, and external consultants. Consequences:

- Questions must test business judgment, not developer knowledge. No Agent SDK,
  MCP, tool schemas, agentic loops, CI/CD, or JSON-schema validation.
- Nothing a learner touches may require a toolchain. The exam has to work by
  opening an HTML file — no Python, no venv, no API key.

### Domains and weightings

| Domain | Weight | Objectives | Items in a 60-question form |
|---|---|---|---|
| D1 Prompting and Task Execution | 14% | 4 | 8 |
| D2 Output Evaluation and Validation | 21% | 6 | 13 |
| D3 Product and Model Selection | 12% | 4 | 7 |
| D4 Workflow Integration and Solution Design | 16% | 5 | 10 |
| D5 Configuration and Knowledge Management | 12% | 4 | 7 |
| D6 Governance, Risk, and Responsible Use | 15% | 4 | 9 |
| D7 Troubleshooting and Optimization | 10% | 3 | 6 |

Quotas are the weights applied to 60 and rounded to integers that still total 60.
`DOMAIN_FACTORS` in `adaptive.js` is the same weights normalized to the lightest
domain (D7), so the adaptive overlay preserves relative emphasis.

The 30 objectives are reproduced verbatim from guide §6 in `exam_lib.TASK_STATEMENTS`.
**The `D<n>.<m>` ids are ours** — the guide lists objectives as unnumbered bullets —
assigned in guide order so a domain is recoverable as `id.split(".")[0]`. Do not
cite those ids as though Anthropic assigned them.

`exam_lib.py` is the authoritative copy. `adaptive.js` duplicates it because
`exam.html` loads over `file://` in the desktop app, where `fetch()` of a shared
JSON blueprint fails CORS. `test_practice_exam_js.py` locks the two together;
edit the Python and regenerate the JS rather than hand-editing both.

---

## Adaptive logic

Per-objective weights, seeded at 1.0. A correct answer multiplies the objective's
weight by **0.7** (floor **0.5**); an incorrect one by **1.5** (cap **5.0**).
Selection is a weighted random draw over `weight x DOMAIN_FACTORS[domain]`, with
the last **5** answered objectives held at zero so questions don't cluster.

**Coverage-first.** A high-weight objective that is barely tested is a blind spot
the weighted draw can starve. Any objective at weight >= **2.0** is guaranteed
**2** sightings before selection reverts to weighted-random.

**Difficulty tiers.** Unseen is standard. An objective seen >= **3** times with a
perfect record escalates to hard, as does one correct standard answer earned
in-app. A conditional floor of **1.0** keeps a mastered objective selectable long
enough for its hard variants to actually get asked; it releases after **2** hard
answers.

**Seed.** Deliberately blank — every objective starts at 1.0. A seed encodes one
person's known weak areas, which in a shared tool pushes everyone else's early
questions toward gaps they may not have.

---

## Item types

Both types are supported end to end. An answer is **always an array** internally,
single-answer included, so no rendering, commit or scoring path branches on item
type; `adaptive.js`'s `A.item` owns the shape rules and accepts either a bare
option key or a list.

| | Single-answer | Multiple-response |
|---|---|---|
| Options | 4 (A–D) | 5 (A–E) |
| `correct` | `"B"` or `["B"]` | `["B", "D"]` |
| `selectCount` | absent or 1 | number of correct keys |

`validate_question` enforces the pairing, so a five-option item with one answer,
or a two-answer item with four options, cannot reach the bank.

**Scoring is all-or-nothing** — exact set match. The guide does not say whether
the real exam awards partial credit, and exact-match can understate a score but
never flatter it. `A.item.isCorrect` is the single place to change if a sitting
shows otherwise.

**The five-option shape is calibration, not documentation.** The guide states the
item type exists but publishes no worked example — all three of its sample
questions are single-answer. The five-option shape and the roughly-one-in-six
frequency come from a single third-party CCAO-F practice set written by someone
who sat the exam. Best available evidence; not fact from Anthropic. Recalibrate
after a real sitting.

---

## The question bank

`questions.js` is machine-written — `exam_lib.render_bank()` is the only writer.
Each entry carries an `id` (objective id plus an 8-hex content hash over
scenario/question/options, so duplicate content is rejected at merge) and
`provenance` of `{source, model, generatedAt, reviewed}`. `source` is one of
`official-sample`, `seed-generated`, `refill`, or `hand-authored`.

**Every committed entry must have `reviewed: true`, and pytest enforces it.** That
flag is the gate; see below for what has actually cleared it.

`MIN_PER_TASK = 3` — three committed questions per objective. Two tests enforce
that, and they **skip with a stated reason** while the bank is too small rather
than asserting something weaker, so a thin bank never reads as satisfied coverage.

### Pipeline

    generate  ->  normalize  ->  screen (mechanical)  ->  screen (judgment)  ->  review gate  ->  merge

1. **Generate** — `generate_bank.py --per-task N` writes candidates to the
   gitignored `questions_pending.json`. Note `--per-task` counts *pending* only,
   not what is already committed. Generation is restricted to single-answer items:
   with no worked multiple-response example published there is nothing to ground a
   generator against, so multi items are hand-authored.
2. **Normalize** — `normalize_pending.py` permutes each item's option order under
   a fixed seed. This exists because a generator has a positional habit: the first
   batch put 68% of correct answers on B, which a test-wise candidate can exploit
   without knowing any of the material. The prompt now asks for variety, but
   asking is weaker than enforcing.
3. **Screen, mechanical** — `screen_mechanical.py` decides what a script can:
   content-shape validity, developer vocabulary, stub content, circular
   rationales, near-duplicates against the batch and the bank, answer-position
   skew, and length tells (a correct option much longer than its distractors is
   exploitable). It reports and never deletes.
4. **Screen, judgment** — `screening_prompt.md` applied per candidate, for what a
   script cannot decide: fabricated product claims and defensible distractors.
5. **Review gate** — below.
6. **Merge** — `generate_bank.py --merge` flips `reviewed`, dedupes, and rewrites
   the bank. It is the only writer.

### The review gate, and what has actually cleared it

The `reviewed: true` flag was designed to encode **a human read of every
question**. Recording plainly how the current bank cleared it, so the flag is not
over-read later:

- The **3 official samples** from guide §8 were transcribed and checked by hand.
- The **2 hand-authored multiple-response items** were written by hand.
- The **first bulk batch (66 of 95 generated candidates)** cleared the gate by
  **two-model consensus, not a human read**. Two reviewers on different models
  judged all 95 independently against the same criteria: they agreed on 73 (77%),
  and every one of the 43 rejections between them was for near-duplication except
  a single fabrication catch. `compare_reviews.py` performed the comparison
  mechanically and refuses to treat a missing verdict as an acceptance.

  How the 29 drops were decided, since the two reviewers cut at very different
  depths (41% vs 24%):
  - **20 both rejected** — dropped.
  - **1 dropped over a reviewer's accept.** The stricter reviewer cited the Help
    Center stating the Google Drive connector is unavailable for shared projects,
    so the mechanism the answer turned on did not exist in the configuration
    described. A citation outranks a reviewer who did not check that item —
    evidence, not consensus, settled it.
  - **5 dropped that both reviewers accepted**, because a separate verification
    pass found their load-bearing claim — that an uploaded Project file is a
    static copy needing re-upload — has *no published source*, and caught a
    search summarizer inventing a supporting quote for it. Plausible is not
    sourced.
  - **17 disagreements kept**, on the more permissive reviewer's line. All were
    one model calling a question a duplicate lesson and the other judging it
    distinct. Coverage was the deciding factor: dropping them would have needed a
    larger regeneration round, and regeneration is what produced the duplication.
    The cost is accepted redundancy, disclosed in the README.

Two-model consensus is stronger evidence than a single screener and weaker than a
careful human pass. It is a deliberate trade, made because ~95 questions is a real
sitting to read and the alternative on the table was accepting a single screener's
word. **A question that both reviewers accepted has still never been read by a
person.** Anyone relying on this bank should know that, and anyone who does read a
question and finds it wrong should treat that as expected maintenance rather than
a surprise — flag it in the app so it stops affecting weights, and delete it.

---

## Known fidelity gaps

Where this tool knowingly differs from the real exam. Each records what would
close it, so a gap is never mistaken for a bug.

**Multiple-response calibration is inferred, not documented.** See *Item types*.
The mechanic works; the shape and frequency are one third party's inference.
*Closes when:* a guide revision publishes a worked example, or a sitting confirms
the real shape.

**The scaled score is a linear approximation.** Raw-correct maps onto 100–1,000
directly. The real exam equates across forms, so a borderline result here should
not be read as a borderline result there. *Closes when:* never, realistically —
equating tables are not published.

**Difficulty tiering is calibrated against three samples.** The guide publishes
only three sample questions, so the standard/harder/hard spread is an inference
from a very small sample. *Closes when:* a sitting gives a felt sense of the real
difficulty distribution.

**No study guide or hands-on exercises yet.** The guide's "How to Prepare"
recommends building a real Project and evaluating outputs; none of that is
scaffolded here. *Closes when:* built.

[academy]: https://anthropic-partners.skilljar.com/page/partner-certifications
