# Screening Prompt — Generated Question Review Assist

Machine-generated questions are adversarially screened before human review.
This file is the durable screening prompt: paste it (or reference it) when
running screening agents over `questions_pending.json`. Screening assists the
human pass — it never replaces it, and it cannot merge anything
(`provenance.reviewed` is only flipped by `generate_bank.py --merge`).

---

## Grounding rule — which source wins

**The CCAO-F exam guide (v1.0) is the authoritative grounding source for
correctness.** Current Anthropic product docs are the secondary source. Apply
them in this order:

1. A claim supported by the exam guide is **correct for screening purposes**,
   even where current product docs have moved past the guide (e.g., slash
   commands merged into skills, `disable-model-invocation`). Where the two
   diverge, annotate the finding as **"product-docs divergence — verify
   against exam guide"** rather than treating it as a disqualifying
   fabrication.
2. A claim appearing in **neither** the exam guide **nor** current docs — an
   invented CLI flag, environment variable, API parameter, numeric limit, or
   configuration-dependent behavior — remains a **disqualifying fabrication**
   (historical examples: a `--non-interactive` flag; "strict JSON mode
   availability depends on deployment configuration").

## Per-question checks

For each assigned question:

1. **FABRICATION** — does the scenario, any option, or any explanation assert
   a specific technical fact you cannot confirm? If a specific claim is
   load-bearing for the marked-correct answer, verify it first against the
   exam guide, then against https://docs.claude.com or
   https://code.claude.com/docs. Apply the grounding rule above to decide
   between "fabrication" and "product-docs divergence."
2. **ANSWER KEY** — is the marked-correct option clearly the best answer?
   Argue *for* each distractor: does any have a defensible case of being equally
   or more correct given the scenario? If yes, flag it.
   Multiple-response items are supported by the engine, but the generator is
   restricted to single-answer, so a *generated* candidate expecting more than
   one selection is out of contract — flag it. Hand-authored multi items are
   fine and carry `selectCount`.
3. **QUALITY** — a realistic workplace scenario for a non-developer using Claude
   as a productivity tool; four parallel, plausible options; non-circular
   explanations. Flag stub/placeholder content. Flag near-duplicates of other
   questions in the file (same premise, option skeleton, or correct-answer
   rationale).
4. **ITEM FORMAT** — flag any candidate that is a sequencing question (asking for
   five steps in order) or expects more than one selection. Both formats are
   supported, but they are hand-authored: their distractor architecture is exact
   and a generated attempt will usually violate it. Reject rather than repair.
5. **AUDIENCE** — flag any question that requires developer knowledge. This
   credential is explicitly not for people who build against APIs or design
   agentic systems, so a question turning on the Agent SDK, MCP servers, tool
   schemas, CI/CD, JSON-schema validation, or reading code is out of scope no
   matter how well written. The judgment tested must be business judgment.
6. **PATTERN CURRENCY** — does the marked-correct answer rely on a mechanism
   not present in the exam guide's task-statement knowledge/skills inventory?
   A real-but-superseded pattern presented as the recommended answer is the
   failure mode here (e.g., `CLAUDE.local.md`, which functions but is
   superseded by home-directory imports via `@~/.claude/` paths and is absent
   from the D3.1 inventory). Annotate such a finding **"verify pattern
   currency"** and treat it with the same severity as the product-docs
   divergence category — **not auto-disqualifying**, since the guide's
   inventory is not exhaustive. A deprecated pattern is acceptable as a
   distractor when the explanation names it deprecated and gives the current
   replacement.

Default to **pass** when the question is grounded in the exam's stated
principles (programmatic enforcement vs. probabilistic compliance, tool
description quality, structured error categories, least privilege, escalation
criteria). Reserve **concern** for problems a human reviewer must look at —
one concrete sentence each, naming the option or claim at fault.

Output shape per question: `{id, verdict: pass|concern, concerns: [string]}`.
