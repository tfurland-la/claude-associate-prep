# Claude Certified Associate – Foundations (CCAO-F) prep

An adaptive practice exam for the **Claude Certified Associate – Foundations**
credential, built against the official exam guide (v1.0, effective July 2026).

**You do not need to be a developer to use this.** No Python, no API key, no
install — open the practice exam in a browser and start. That matches the
credential itself, which is aimed at operations, marketing, project management,
education, communications and general knowledge work, and which assumes no
software-development or API experience.

## Start here

Open **[`practice-exam/exam.html`][exam]** — double-click the file, or use the
hosted copy. Your progress is saved in your browser.

Two modes:

- **Practice** — one question at a time with an explanation after each. The exam
  tracks which of the 30 objectives you are weakest on and asks more about those.
- **Timed exam** — a full 60-question, 120-minute simulation matching the real
  exam's domain weighting, with skipping, mark-for-review, backward navigation,
  a review screen, and an approximate scaled score against the 720 pass mark.

## What the exam covers

60 items · 120 minutes · scaled score of 720 out of 100–1,000 to pass · $99 ·
valid 12 months. Seven domains, weighted as the guide publishes them:

| Domain | Weight | Items in a 60-question form |
|---|---|---|
| D1 Prompting and Task Execution | 14% | 8 |
| D2 Output Evaluation and Validation | 21% | 13 |
| D3 Product and Model Selection | 12% | 7 |
| D4 Workflow Integration and Solution Design | 16% | 10 |
| D5 Configuration and Knowledge Management | 12% | 7 |
| D6 Governance, Risk, and Responsible Use | 15% | 9 |
| D7 Troubleshooting and Optimization | 10% | 6 |

The 30 objectives under those domains are reproduced verbatim from the guide in
[`practice-exam/exam_lib.py`](practice-exam/exam_lib.py). The `D<n>.<m>` numbering
is ours — the guide lists them as unnumbered bullets — so don't quote those ids as
though Anthropic assigned them.

The authoritative guide is on the
[Anthropic Partner Academy certifications page][academy]. Read it in full before
scheduling; this repo is a supplement, not a replacement, and Anthropic does not
guarantee any resource produces a pass.

## Current state — read this before trusting a score

This is early. Being explicit so a score isn't over-read:

- **The question bank holds 95 questions** — 3 official samples from the guide, 2
  hand-authored multiple-response items, and 90 generated ones. Every one of the 30
  objectives now has at least 3, so the adaptive engine can give you a balanced run
  across the whole blueprint.
- **Covered by count is not the same as covered in substance.** Clearing the
  3-per-objective bar says nothing about whether an objective's questions test its
  whole scope. D5.2 ("manage uploaded knowledge and connectors") is the worked
  example: its three generated questions turned out to be one question about who
  can see a Project's knowledge, wearing three different personas, and none of them
  tested managing knowledge or connectors at all. Three hand-authored questions now
  cover connecting a source that keeps changing, choosing which connector reaches
  which material, and pruning a knowledge base that has gone stale. Treat a strong
  score on any one objective as evidence about the slice that got tested.
- **The generated questions lean redundant.** Across both batches the reviewers'
  main objection was questions teaching the *same lesson* with a different persona
  — a generator habit, not a one-off, and one that got worse as the anti-fabrication
  rules narrowed its room. Around a third was cut for it, and some redundancy
  survived by deliberate choice rather than sacrifice coverage. Expect to meet the
  same underlying point more than once, particularly around keeping Project
  knowledge current and verifying a suspect figure against its source.
- **Multiple-response items work, but their calibration is inferred.** "Select
  two" items render, gate on a complete selection, and score by exact set match.
  What is *not* documented is how the real exam shapes them: the guide states the
  item type exists but publishes no worked example, so the five-option shape and
  the roughly-one-in-six frequency come from one third-party practice set written
  by someone who sat the exam. Treat that as the best available evidence, not as
  fact from Anthropic.
- **Multiple-response scoring is all-or-nothing here.** The guide does not say
  whether the real exam awards partial credit. Exact-set-match is the
  conservative choice — it can understate a score but never flatter it.
- **The scaled score is a linear approximation.** The real exam equates across
  forms; this maps raw-correct onto 100–1,000 directly.
- **No study guide or hands-on exercises yet.** Planned.

## Growing the question bank (author side)

This part does need Python and an authenticated Claude Code CLI. Set up once:

```bash
python3 -m venv .venv && .venv/bin/pip install pytest pywebview
```

Then launch with the **venv interpreter**, not a bare `python3` — the app imports
`pywebview`, which is installed in the venv and almost certainly not in your
system Python:

```bash
.venv/bin/python practice-exam/exam_app.py
```

That opens the exam in a desktop window and generates fresh questions through
your own Claude Code login — no API key. To add questions to the committed bank,
run the `/exam-refill` skill in Claude Code, which walks the pipeline below.

### The pipeline

`generate_bank.py --merge` is the only writer of `questions.js`; never hand-edit
the bank.

| Step | Command | What it does |
|---|---|---|
| 1. Generate | `generate_bank.py --per-task N` | Writes candidates to the gitignored `questions_pending.json`. `--per-task` counts *pending* only, not what is already committed. |
| 2. Normalize | `normalize_pending.py` | Permutes option order under a fixed seed. Generators have a positional habit — the first batch put 68% of correct answers on B, which is exploitable without knowing the material. |
| 3. Screen (script) | `screen_mechanical.py` | Content validity, developer vocabulary, stub content, circular rationales, near-duplicates, position skew, length tells. Reports; never deletes. |
| 4. Screen (judgment) | `screening_prompt.md` | Fabricated product claims and defensible distractors — what a script can't decide. |
| 5. Review gate | — | See the caveat above. `compare_reviews.py` compares two reviewers' verdicts if you use the two-model route. |
| 6. Merge | `generate_bank.py --merge` | Flips `reviewed`, dedupes, rewrites the bank. |

Every committed question carries `reviewed: true` and pytest enforces it, but be
precise about what that flag currently means: the official samples and the
hand-authored items were checked by a person, while the bulk generated batch
cleared the gate by **two independent model reviewers agreeing**, with every
disagreement escalated. That is stronger than one screener and weaker than a human
read — so a question in this bank may never have been read by a person. If you
hit one that looks wrong, flag it in the app (which stops it affecting your
weights) and say so. The full reasoning is in the spec's review-gate section.

```bash
.venv/bin/python -m pytest -q && node --test practice-exam/adaptive.test.js
```

The two bank-coverage tests are now active (they skip while the bank is too thin,
so a sparse bank never reads as a satisfied coverage guarantee). They check a
*count* — three questions per objective — which is why the substance caveat above
matters: the count can pass while an objective's questions all probe the same
corner of it.

Design decisions, the numbers the adaptive engine uses, the question pipeline, and
what has actually cleared the review gate are all in
[`practice-exam/exam_spec.md`](practice-exam/exam_spec.md). Read the review-gate
section before treating a question as vetted.

[exam]: practice-exam/exam.html
[academy]: https://anthropic-partners.skilljar.com/page/partner-certifications
