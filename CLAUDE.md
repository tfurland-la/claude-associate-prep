# CLAUDE.md

## What this repo is

An adaptive practice exam for the **Claude Certified Associate – Foundations**
(CCAO-F) credential, built against exam guide v1.0 (effective July 2026). It is
for colleagues preparing to sit the exam, most of whom are not developers.

The exam engine was forked from the Architect-exam repo (`Consulting-python`),
which targets a different credential (CCAR-F). Only the engine transferred — the
blueprint, question bank, and audience are all different. Don't reason from the
Architect repo's content.

## The audience constraint — this drives most decisions

The guide states the credential "is not intended for software developers who build
against APIs or design agentic systems", and that no software-development or API
experience is needed. Its audience is operations, marketing, project management,
education, communications, general knowledge work, and external consultants.

Consequences that are easy to get wrong:

- **Questions must test business judgment, not developer knowledge.** No Agent
  SDK, MCP servers, tool schemas, agentic loops, CI/CD, JSON-schema validation,
  or code reading. The product surface is chat, Projects, Artifacts, research
  mode, Memory, Skills, Code Execution, connectors, and the model choice.
- **Nothing colleague-facing may require a toolchain.** The practice exam has to
  work by opening an HTML file: no Python, no venv, no API key, no npm. Python is
  author-side only, for growing the question bank.

## The blueprint

7 domains weighted 14/21/12/16/12/15/10, 30 objectives (4/6/4/5/4/4/3), 60 items,
120 minutes, 720 to pass. Items are standalone — unlike the Architect exam there
are no scenario clusters, so don't reintroduce a "4 of 6 scenarios" structure.

`exam_lib.py` is the authoritative copy of the blueprint; `adaptive.js` holds a
duplicate because `exam.html` is loaded over `file://` in the desktop app, where
`fetch()` of a shared JSON file fails CORS. **The two must stay identical** —
`test_practice_exam_js.py` locks them together. When changing the blueprint, edit
`exam_lib.py` and regenerate the JS copy rather than hand-editing both.

`PERSONAS` is a variety device for question generation, not an exam structure.
Keep the roles non-technical.

## How to work here

**Test-driven.** Write the failing test first. `pytest` for Python, `node --test
practice-exam/adaptive.test.js` for the adaptive core. Pure logic belongs in
`adaptive.js` (it runs in both the browser and node, and is already bundled by
`exam_app.spec`); `exam.html` should hold only DOM wiring.

**A new file loaded by exam.html must be added to `exam_app.spec`'s `DATAS`
list**, or the frozen desktop app breaks while the browser build keeps working. A
test asserts this.

**Deconflict, don't paper over.** If a change breaks a test, surface it and
explain what broke — don't quietly weaken the assertion.

**Verify, don't memorize.** Model names, product features and pricing change.
Check the current exam guide on the Partner Academy and
https://docs.claude.com rather than relying on training data. The guide is
authoritative where it and the product docs disagree.

**Never invent exam facts.** No fabricated feature names, limits, or option
counts. If the guide doesn't say it, don't assert it — record it as a known gap
instead, with what would close it.

## Hard rules — secrets & hygiene

- Never commit secrets. Any API key lives in `.env`, which is gitignored.
- Respect `.gitignore`; generated output and `.venv/` stay out of version control.
- Before any `git push`, summarize what will be pushed and wait for confirmation.
- This repo is public. Don't commit third-party material (for example someone
  else's practice questions) without their permission, and keep client or firm
  detail out entirely.

## Repo map

- `README.md` — how a colleague starts, and the current known gaps
- `associate_course.html` — the study guide. **Machine-written** by
  `practice-exam/build_course.py`; edit the content data in that script and re-run
  it, never the HTML. The build asserts its objective list matches
  `TASK_STATEMENTS`, and two pytest checks guard the committed output.
- `practice-exam/exam.html` — the exam UI. With the guide, the only two things a
  learner opens
- `practice-exam/adaptive.js` — pure adaptive + navigation core (browser + node)
- `practice-exam/exam_lib.py` — blueprint, bank I/O, validation, generation
- `practice-exam/questions.js` — machine-written bank; `render_bank()` is the only writer
- `practice-exam/exam_app.py` — pywebview desktop window, for generating questions
- `practice-exam/exam_spec.md` — the durable design record: blueprint, adaptive
  numbers, item types, the question pipeline, the review gate, and known gaps.
  Update it in the same change as the behaviour it describes.
- `practice-exam/generation_prompt.md`, `screening_prompt.md` — the generation pipeline's prompts
- `practice-exam/screen_mechanical.py`, `normalize_pending.py`, `compare_reviews.py` — bank pipeline tooling
- `test_*.py` at the root — run with `pytest -q`
