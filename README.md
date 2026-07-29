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

- **The question bank holds 5 questions.** The 3 official samples from the guide,
  plus 2 hand-authored multiple-response items. That is nowhere near enough to
  practise against — the desktop app generates fresh questions on demand (see
  below), which is the usable path today.
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

This part does need Python and an authenticated Claude Code CLI:

```bash
python3 -m venv .venv && .venv/bin/pip install pytest pywebview
python3 practice-exam/exam_app.py
```

That opens the exam in a desktop window and generates fresh questions through
your own Claude Code login — no API key. To add reviewed questions to the
committed bank, run the `/exam-refill` skill in Claude Code, which walks the
generate → screen → human review → merge pipeline. Every committed question must
be human-reviewed; pytest enforces it.

```bash
.venv/bin/python -m pytest -q && node --test practice-exam/adaptive.test.js
```

Two bank-coverage tests skip until the bank is large enough to satisfy them —
that's deliberate, so a thin bank never reads as a satisfied coverage guarantee.

[exam]: practice-exam/exam.html
[academy]: https://anthropic-partners.skilljar.com/page/partner-certifications
