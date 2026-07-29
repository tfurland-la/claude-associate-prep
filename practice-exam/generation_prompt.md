You are generating one practice question for the Claude Certified Associate –
Foundations (CCAO-F) exam. Produce a single scenario-based multiple-choice
question targeting exactly this task statement:

- Task statement: {{TASK_ID}} — {{TASK_LABEL}}
- Domain: {{DOMAIN_ID}} — {{DOMAIN_LABEL}}

Requirements:

- Write a realistic workplace scenario (1-2 short paragraphs) about someone using
  Claude as a productivity tool in an ordinary business workflow — drafting,
  summarizing, analyzing, researching, reviewing, or configuring a Claude Project.
- **The person in the scenario is not a developer.** This credential is
  explicitly not intended for people who build against APIs or design agentic
  systems, and assumes no software-development or API experience. So do NOT write
  scenarios about the Claude Agent SDK, agentic loops, MCP servers, tool schemas,
  CI/CD pipelines, JSON-schema validation, or writing code. The judgment being
  tested is business judgment: which feature to use, whether to trust an output,
  when to escalate, what the policy allows.
- Stay inside the product surface a non-technical user actually touches: chat,
  Projects (custom instructions and knowledge sources), Artifacts, research mode,
  Memory, Skills, Code Execution, connectors such as Google Drive and Gmail, and
  the Haiku/Sonnet/Opus model choice.
- **Do not make the correct answer depend on undocumented product mechanics.** Six
  questions were discarded from an earlier batch for resting on "an uploaded
  Project file is a static copy that must be re-uploaded to update" — plausible,
  widely repeated, and not stated anywhere in Anthropic's documentation or Help
  Center. Specifically avoid asserting, as the basis of the answer: sync or refresh
  behaviour of uploaded files, whether Memory is shared between teammates, any
  file-size or file-count limit, retention periods, or that a named model cannot do
  something. What IS documented and safe to build on, in these exact terms and no
  wider: **Google Docs** added to chats and projects sync from Google Drive, and
  members with project access can see a project's knowledge and instructions. Do
  not generalise the first one — the documented statement covers Google Docs
  specifically, not Sheets, Slides, PDFs or "files" in general. A question was
  discarded for asserting that a weekly-updated Google *Sheet* stays current this
  way. If a question needs one of the unsafe claims to work,
  write a different question — build the answer on the user's judgment (verify,
  escalate, choose the right feature, check the policy) rather than on a mechanism.
{{PERSONA}}
- Provide exactly one correct answer and three plausible distractors. The
  distractors must represent the kinds of mistakes a candidate with incomplete
  knowledge would make.
  (The real exam also has multiple-response items. Support for them is not built
  yet, so generate single-answer items only — do not emit an item that expects
  more than one selection.)
- **Keep the options close in length — within roughly 25% of each other.** A
  correct answer noticeably longer than the distractors is a giveaway a candidate
  exploits without knowing the subject: the fully-hedged, most-qualified option is
  usually the right one.

  This fails in a specific, predictable way, so guard against it directly. The
  right answer is often the nuanced one — two clauses joined by "but", or a
  compound action ("set up X *with* Y *and* Z") — while the wrong answers are each
  a single flat idea. That alone makes the answer visibly longest. **Do not fix it
  by trimming the correct answer**, which strips the nuance that makes it correct.
  Fix it by giving the distractors the same shape: make each a compound or
  qualified statement too, so a candidate cannot pick out the "careful-sounding"
  option. Before you finish, compare your four option lengths; if the correct one
  is the longest by a wide margin, lengthen the distractors.
- **Vary which letter is correct.** Do not default to B. Choose the correct
  letter as though at random across the set of questions you produce.
- Provide an explanation of why the correct answer is right and why each
  distractor is wrong.
{{DIFFICULTY}}- You are NOT to invent specific technical facts — flag names, environment
  variables, configuration behaviors, or claims about how a feature depends on
  configuration or deployment — unless grounded in the documented CCAO-F exam
  content provided in this prompt (the task statement descriptions and the
  example questions below). If an explanation needs a technical detail to
  justify why an option is correct or incorrect, it must use only facts
  established in the provided exam content rather than fabricating
  plausible-sounding specifics. When in doubt, prefer an explanation grounded
  in the exam's stated principles (e.g., programmatic enforcement vs.
  probabilistic compliance, tool description quality, structured error
  categories) over one relying on an invented technical detail.
- Do not present deprecated or superseded patterns as correct answers. If a
  mechanism exists but has been replaced by a current best practice (e.g.,
  CLAUDE.local.md superseded by home-directory imports via @~/.claude/ paths),
  the correct answer must use the current pattern. When uncertain whether a
  pattern is current, prefer mechanisms explicitly named in the CCAO-F exam
  guide v1.0 (its task statement knowledge and skills lists are the canonical
  inventory). A deprecated pattern may appear as a distractor only if the
  explanation identifies it as deprecated and names the current replacement.

{{AVOID}}Here are official sample questions showing the desired style and difficulty.
Match their tone, scenario realism, and distractor quality:

{{FEW_SHOT_EXAMPLES}}

{{RETRY_FEEDBACK}}Respond with STRICT JSON only — no preamble, no markdown fences — in exactly
this shape:

{"taskStatement": "{{TASK_ID}}", "domain": "{{DOMAIN_ID}}", "scenario": "...",
 "question": "...", "options": {"A": "...", "B": "...", "C": "...", "D": "..."},
 "correct": "A|B|C|D",
 "explanations": {"A": "...", "B": "...", "C": "...", "D": "..."}}
