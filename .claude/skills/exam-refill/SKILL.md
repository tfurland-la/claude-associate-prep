---
name: exam-refill
description: Grow the CCAO-F practice exam question bank. Use when the user asks to refill the exam bank, add or regenerate practice questions, or top up thin task statements. Runs the generate → screen → human review → merge pipeline around practice-exam/generate_bank.py.
---

# Exam Bank Refill

Grow `practice-exam/questions.js` through the reviewed pipeline. Never edit
`questions.js` directly — `generate_bank.py --merge` is the only writer, and
every committed question must survive screening AND the user's review.

## 1. Status and targets

Run `python3 practice-exam/generate_bank.py` (no arguments) to show
per-statement coverage. Pick targets:

- If the user named task statements, use those.
- Otherwise propose the statements with the lowest counts, and — if
  `practice-exam/exam_progress.json` exists — the user's highest-weight
  (weakest) statements from its `weights` map. Confirm targets with the user.

## 2. Generate

```
.venv/bin/python practice-exam/generate_bank.py --per-task <N> --tasks <TS1,TS2,…> --workers <W>
```

`--per-task` counts *pending* candidates only, not what is already committed, so
check coverage first. Candidates land in gitignored `questions_pending.json`
(resumable — rerun after failures).

On `--workers`: sequential generation (`--workers 1`) lets each call see summaries
of all its predecessors, which is the mechanism against template reskinning.
Observed on the first 95-question batch at `--workers 4`: **no textual
near-duplicates at all** (highest same-objective scenario similarity 0.15 against a
0.62 flag threshold), so concurrency is usable. But the judgment screeners did find
the subtler form — several objectives where every question taught the *same
lesson* in different words, e.g. all three D2.2 items testing hallucination
detection while that objective also names inconsistencies and biases. Concurrency
costs lesson diversity, not text diversity. Use 4 for speed, then read the
per-objective groups and top up the uncovered facets.

## 2a. Normalize — always

```
.venv/bin/python practice-exam/normalize_pending.py
```

Permutes each item's option order under a fixed seed. Generators have a positional
habit: the first batch put 68% of correct answers on B, which a test-wise candidate
exploits without knowing any of the material. The prompt asks for variety too, but
asking is weaker than enforcing.

## 3. Screen — script first, then judgment

```
.venv/bin/python practice-exam/screen_mechanical.py
```

Decides what a script can, so LLM attention is not spent on it: content validity,
developer vocabulary, stub content, circular rationales, near-duplicates against
both batch and bank, answer-position skew, and length tells (a correct option much
longer than its distractors is another giveaway). It reports and never deletes.

Then apply `practice-exam/screening_prompt.md` to every pending candidate — via
subagents for large batches, or directly for a handful. Honor its grounding
rule: the CCAO-F exam guide is authoritative; product-docs divergence is an
annotation, not a disqualifier; invented flags/env-vars/limits disqualify.
Known failure modes to hunt: near-duplicates of existing same-statement
questions (compare premise, option skeleton, correct-answer rationale — not
just topic), and shape-valid stub content ("Test scenario?", options a/b/c/d).

Delete failing candidates from the pending file. If a statement's
regenerations keep converging on one lesson, hand-author from unused
Knowledge/Skills bullets in the exam guide instead, and have the authored
question screened independently.

## 4. Review gate — required, and record which route was used

Merging flips `provenance.reviewed` to true, and that flag was designed to mean a
human approved the question. Never merge without the user's explicit go-ahead.

Two routes are acceptable. Whichever is used, **say so in the commit message and
keep `exam_spec.md`'s review-gate section accurate** — the flag must not be read
later as a stronger claim than what actually happened.

- **Human read.** Walk the user through the survivors grouped per objective with
  screening notes. They edit or delete entries in `questions_pending.json`.
- **Two-model consensus.** Two reviewers on *different* models judge every
  candidate independently against the same criteria, each writing
  `{"<index>": {"verdict": "ACCEPT|REJECT", "reason": "..."}}`. Then:

  ```
  .venv/bin/python practice-exam/compare_reviews.py <a.json> <b.json>
  ```

  Merge only what both accepted; escalate every disagreement to the user. The
  script refuses to treat a missing verdict as an acceptance. This is stronger
  than one screener and weaker than a human pass — a question both models accept
  has still never been read by a person.

## 5. Merge and verify

```
.venv/bin/python practice-exam/generate_bank.py --merge
.venv/bin/python -m pytest -q
node --test practice-exam/adaptive.test.js
```

Merge recomputes content-hash ids (review edits change them), dedupes, and
rewrites `questions.js`. pytest enforces the bank format, per-statement
minimum (`MIN_PER_TASK` in `exam_lib.py`), and exam-form domain quotas.
Commit only after the suite is green.
