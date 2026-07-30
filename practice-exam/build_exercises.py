"""Generate exercises.html — the four CCAO-F preparation exercises.

Machine-written from the data below, same discipline as build_course.py: the build
asserts every objective an exercise claims to cover actually exists in
exam_lib.TASK_STATEMENTS, and that the four exercises between them touch all seven
domains.

    python3 practice-exam/build_exercises.py

Design constraints that shaped these:

  - The audience is explicitly non-developer, so nothing here needs Python, a
    terminal, or an API key. Everything is done in Claude.ai and a browser.
  - The Architect repo gated its exercises with pytest, which is impossible for
    judgment work. Two of these four are gated instead by *planted defects with an
    answer key* — the learner's audit is scored against a known-correct list. That
    makes 36% of the exam by weight objectively self-assessable rather than
    rubric-only, which was the whole reason for choosing this design.
  - Answer keys sit behind <details> so peeking is a deliberate act, and need no
    JavaScript to work.
"""

import html
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import exam_lib  # noqa: E402

OUT = Path(__file__).parent.parent / "exercises.html"

# ── Exercise 3: the output-evaluation gauntlet (keyed) ──────────────────────
# Each item gives source material and a Claude output built from it, with defects
# planted deliberately. The learner audits; the key names every planted defect.
GAUNTLET = [
    {
        "n": 1,
        "title": "Expense policy summary",
        "brief": "A colleague asked Claude to summarise the expense policy for a team wiki.",
        "source": [
            "Travel expenses must be submitted within 30 days of the trip ending.",
            "Receipts are required for any single item over £25.",
            "Client entertainment needs written approval from a director before it is incurred.",
        ],
        "output": (
            "Under section 4.2 of the policy, travel expenses must be submitted within 30 "
            "days of the trip ending, and client entertainment requires written director "
            "approval beforehand. Submit through the usual portal."
        ),
        "defects": [
            ("Fabricated citation",
             "“section 4.2” does not appear anywhere in the source. The policy text "
             "has no section numbering at all. A specific-looking reference like this is "
             "the classic planted hallucination — precise, plausible, and invented."),
            ("Omission",
             "The receipt requirement for items over £25 is simply gone. The summary is "
             "accurate about what it covers, which is exactly why omission is easy to "
             "miss: nothing in it is false."),
        ],
        "judgments": ["J1"],
    },
    {
        "n": 2,
        "title": "Staff survey readout",
        "brief": "Claude was given the raw counts and asked for a short readout.",
        "source": [
            "240 employees responded to the survey.",
            "96 mentioned onboarding as a pain point.",
            "72 mentioned internal tooling as a pain point.",
        ],
        "output": (
            "40% of respondents (96 of 240) raised onboarding, making it the most cited "
            "issue — it came up nearly twice as often as internal tooling."
        ),
        "defects": [
            ("Overstated comparison",
             "96 against 72 is about 1.3 times, not “nearly twice”. The percentage and "
             "the raw counts are both correct, which makes the unsupported comparison "
             "sitting beside them easy to read past."),
        ],
        "judgments": ["J1"],
    },
    {
        "n": 3,
        "title": "Customer feedback summary",
        "brief": "Two pieces of feedback were pasted in; Claude was asked to summarise them.",
        "source": [
            "Reviewer A: “Setup took ten minutes and support answered within the hour. "
            "Genuinely impressed.”",
            "Reviewer B: “Setup was fine but the reporting is thin, and we have raised "
            "the same gap three times without progress.”",
        ],
        "output": (
            "Customer feedback is positive: reviewers highlight fast setup and responsive "
            "support, describing themselves as impressed with the product."
        ),
        "defects": [
            ("Selective representation",
             "Reviewer B's substantive complaint — thin reporting, raised three times "
             "without progress — has been dropped entirely."),
            ("Partial presented as whole",
             "“Customer feedback is positive” characterises the whole set from half of "
             "it. This is the bias failure the blueprint names, and it is more damaging "
             "than a wrong number because it survives fact-checking: every individual "
             "claim in the output is true."),
        ],
        "judgments": ["J1"],
    },
    {
        "n": 4,
        "title": "Churn analysis",
        "brief": "Claude was given two figures and asked what they show.",
        "source": [
            "A price increase took effect on 1 March.",
            "Monthly churn rose from 2.1% in February to 3.4% in April.",
        ],
        "output": (
            "The March price increase drove churn up from 2.1% to 3.4%, so the pricing "
            "change should be reconsidered before the next renewal cycle."
        ),
        "defects": [
            ("Causation asserted from sequence",
             "The source supports only that one thing followed another. “Drove” claims a "
             "mechanism the data cannot show, and nothing rules out a competitor launch, "
             "a seasonal effect, or an unrelated service problem."),
            ("Recommendation resting on the unsupported claim",
             "The advice to reconsider pricing inherits the flaw. A defect in the "
             "reasoning does not stay contained — it propagates into whatever is built "
             "on top of it."),
        ],
        "judgments": ["J1", "J2"],
    },
    {
        "n": 5,
        "title": "A quick question from a director",
        "brief": "The director asked: “How many open roles are in the plan for Q3?”",
        "source": [
            "The Q3 hiring plan lists 7 open roles.",
        ],
        "output": (
            "I am highly confident the answer is 7. [Followed by a 900-word artifact "
            "titled “Q3 Hiring Plan Analysis”, with sections on methodology, "
            "role-by-role breakdown, and risks.]"
        ),
        "defects": [
            ("Format mismatched to use",
             "A number the director will read once belongs in a plain inline reply. An "
             "artifact is for substantial standalone content someone will keep and "
             "revise — the blueprint tests this choice directly."),
            ("Self-reported confidence offered as support",
             "“Highly confident” is not evidence. The exam treats reliance on a model's "
             "own confidence as a wrong answer wherever it appears, because it is "
             "uncorrelated with accuracy."),
        ],
        "judgments": ["J1", "J7"],
    },
]

# ── Exercise 4 part B: governance triage (keyed) ────────────────────────────
TRIAGE_CATEGORIES = [
    ("A", "Proceed", "Normal use. Review the output as you would any draft."),
    ("B", "Restrict or de-identify first",
     "The task is fine once the data is anonymised, aggregated, or kept out of a "
     "shared space."),
    ("C", "Claude assists, a human owns the decision",
     "The analysis and drafting are appropriate; the judgment and sign-off are not "
     "delegable."),
    ("D", "Not an appropriate use",
     "Either the output would misrepresent something, or policy forbids it until "
     "someone approves."),
]

TRIAGE = [
    ("Reformat 200 supplier addresses into a standard layout.", "A",
     "High-volume, low-stakes, no sensitive content and no judgment call. Note this is "
     "also the model-choice question from D3 — a fast, low-cost model fits."),
    ("Summarise a newly published regulation for the compliance team.", "A",
     "Public material. The one thing to carry forward is that any specific clause or "
     "subsection cited must be verified against the regulation before it circulates."),
    ("Analyse a spreadsheet of customer names and account numbers for spending trends.", "B",
     "The analysis is legitimate; the identifiers are not needed for it. Anonymise or "
     "aggregate before uploading. Abandoning the task entirely is the over-cautious "
     "wrong answer the exam also punishes."),
    ("Add a spreadsheet of medical accommodation requests to a shared team Project.", "B",
     "Special-category personal data in a space every project member can read. Keep it "
     "out of the shared Project; if some analysis is genuinely needed, de-identify it "
     "first and consider whether it belongs in a shared space at all."),
    ("Draft performance ratings that will feed this year's pay decisions.", "C",
     "Drafting is fine. A human must review each rating against fuller context and own "
     "the outcome, because it affects someone's pay and career."),
    ("Decide which of three shortlisted candidates gets the offer.", "C",
     "Claude can organise the evidence and surface comparisons. The decision itself has "
     "consequences for a person and stays with the hiring manager."),
    ("Draft the quarterly board update from the team's internal notes.", "C",
     "Appropriate, and a good use of a Project's knowledge sources — with a human "
     "verifying the figures before it goes to the board."),
    ("Generate customer testimonials for the new landing page.", "D",
     "Generated quotes presented as real customer statements misrepresent them, whoever "
     "reviews them. Claude can legitimately help draft general benefit statements, or "
     "tidy up testimonials real customers actually gave."),
    ("Turn on automatic sending of vendor chase emails with no one reading them first, "
     "where the AI policy requires review before external release.", "D",
     "Not until the governance process says so. The policy is the control; a new "
     "automated use goes to whoever approves those, and “it will probably be fine” is "
     "not the test."),
    ("Ask Claude to confirm whether a redundancy selection is legally defensible, and "
     "act on the answer.", "D",
     "This needs qualified legal advice, not a model's read. Claude can help organise "
     "the facts and draft questions for the lawyer — which is a different task from the "
     "one described."),
]

# ── Exercises 1, 2 and 4A: rubric-based ────────────────────────────────────
RUBRIC_EXERCISES = [
    {
        "n": 1,
        "title": "Build a Project, then maintain it",
        "objectives": ["D5.1", "D5.2", "D5.3", "D5.4", "D3.1"],
        "why": (
            "The guide's own preparation advice is to configure a Project with "
            "instructions and knowledge sources and then keep it current. Nothing on the "
            "exam rewards reading about this rather than doing it once."
        ),
        "phases": [
            ("Configure it",
             "Pick a real recurring task of your own — a weekly update, a standard reply, "
             "a recurring summary. Create a Project. Put the *reference material* in as "
             "knowledge sources and the *behaviour* in custom instructions. Getting that "
             "split right is the whole point: reference documents pasted into "
             "instructions is the most common configuration mistake."),
            ("Use it three times",
             "Run the task three times across three separate conversations, without "
             "re-pasting anything. If you find yourself supplying the same context again, "
             "that context belongs in the Project — go and move it."),
            ("Break it, then diagnose",
             "Change one thing about the underlying task, the way real work changes: a "
             "new required section, a renamed stage, a superseded document. Do not fix it "
             "yet. First write down whether the fault sits in the instructions or in the "
             "knowledge sources. Then fix it and see whether you were right."),
            ("Prune it",
             "Remove something from the knowledge sources that is no longer current and "
             "confirm the output stops reflecting it."),
        ],
        "done_when": [
            "Three conversations produced consistent output with nothing re-pasted.",
            "You predicted correctly whether a drift was an instructions or a knowledge problem.",
            "You can say in one sentence what belongs in instructions versus knowledge sources.",
        ],
    },
    {
        "n": 2,
        "title": "Prompt iteration and decomposition",
        "objectives": ["D1.1", "D1.2", "D1.3", "D1.4", "D7.1", "D7.2"],
        "why": (
            "“Specific beats vague” is the single most repeated judgment in the "
            "blueprint — it appears as prompt writing, as custom instructions, and as "
            "the diagnosis when output is generic. This exercise is the cheapest way to "
            "make it reflexive."
        ),
        "phases": [
            ("Start deliberately badly",
             "Take a real task and ask for it in one vague line — “write something about "
             "X”. Keep the output. It is your baseline and you will want it later."),
            ("Improve one variable at a time",
             "Produce at least four versions, changing exactly one thing per version: "
             "add the audience; add the format and length; add the constraint that must "
             "always hold; add a worked example. After each, write one line on what that "
             "change actually bought you. Changing several things at once teaches you "
             "nothing about which one mattered."),
            ("Decompose something bundled",
             "Take a request with three or four deliverables in it. Split it — ordered "
             "steps where a later one needs an earlier one's output, independent tasks "
             "where they do not. Compare against asking for all of it at once."),
            ("Vary the task type",
             "Run the same subject as a brainstorm (breadth, deliberately varied "
             "options) and as an analysis (criteria stated up front). Notice that the "
             "prompt shape differs, not just the wording."),
        ],
        "done_when": [
            "Your before/after log shows which single change produced the largest jump.",
            "You can look at a weak output and name what the prompt failed to specify.",
            "You reached for a specific critique rather than “make it better”.",
        ],
    },
]


def esc(t):
    return html.escape(t, quote=False)


CSS = """
:root{--ink:#1a1a2e;--ink-light:#4a4a6a;--ink-faint:#8888aa;--paper:#f7f6f1;
--paper-warm:#eeeade;--card:#fffdf8;--accent:#2E4057;--teal:#048A81;
--teal-soft:#e2f2f0;--amber:#c17f24;--coral:#c94f3a;--coral-soft:#f8e9e6;}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
font-family:'DM Sans',system-ui,sans-serif;font-weight:300;line-height:1.65;
font-size:16.5px;-webkit-font-smoothing:antialiased}
.wrap{max-width:860px;margin:0 auto;padding:0 22px 90px}
header.top{background:var(--accent);color:#fff;padding:46px 22px 40px;margin-bottom:30px}
header.top .inner{max-width:860px;margin:0 auto}
h1{font-family:'DM Serif Display',serif;font-weight:400;font-size:35px;margin:0 0 10px;
line-height:1.15}
.sub{color:#c9d4e2;font-size:16px;max-width:660px}
.eyebrow{font-family:'DM Mono',monospace;font-size:11.5px;letter-spacing:.13em;
text-transform:uppercase;color:#8fa8c4;margin-bottom:14px}
h2{font-family:'DM Serif Display',serif;font-weight:400;font-size:26px;
margin:54px 0 4px;line-height:1.2}
h3{font-family:'DM Sans',sans-serif;font-weight:600;font-size:17px;margin:22px 0 6px}
h4{font-family:'DM Sans',sans-serif;font-weight:600;font-size:15.5px;margin:0 0 5px}
p{margin:0 0 14px}
a{color:var(--teal)}
.meta{font-family:'DM Mono',monospace;font-size:12.5px;color:var(--teal);
margin-bottom:16px}
.card{background:var(--card);border:1px solid var(--paper-warm);border-radius:9px;
padding:19px 21px;margin-bottom:14px}
.src{background:#fff;border-left:3px solid var(--ink-faint);padding:11px 15px;
margin:0 0 13px;font-size:15.2px;color:var(--ink-light)}
.src ul{margin:0;padding-left:19px}.src li{margin-bottom:4px}
.out{background:var(--teal-soft);border-left:3px solid var(--teal);padding:11px 15px;
margin:0 0 13px;font-size:15.2px}
.note{background:#fff8e8;border:1px solid #f0dcae;border-radius:9px;padding:17px 20px;
margin:22px 0;font-size:15.3px}
.note strong{color:var(--amber)}
.warn{background:var(--coral-soft);border:1px solid #e8c4bb;border-radius:9px;
padding:17px 20px;margin:22px 0;font-size:15.3px}
.warn strong{color:var(--coral)}
details{background:#fff;border:1px solid var(--paper-warm);border-radius:8px;
padding:0;margin-top:12px}
details summary{cursor:pointer;padding:11px 16px;font-family:'DM Mono',monospace;
font-size:12.5px;color:var(--teal);letter-spacing:.05em;list-style:none}
details summary::-webkit-details-marker{display:none}
details summary::before{content:"▸ ";}
details[open] summary::before{content:"▾ ";}
details .inner{padding:2px 16px 15px;border-top:1px solid var(--paper-warm)}
.defect{margin-bottom:12px}
.defect .label{font-weight:600;font-size:15px}
ol.phases{padding-left:22px;margin:0}
ol.phases>li{margin-bottom:15px}
ul.done{padding-left:20px;margin:6px 0 0}
ul.done li{margin-bottom:5px}
table{width:100%;border-collapse:collapse;font-size:15px;margin-bottom:6px}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--paper-warm);
vertical-align:top}
th{font-family:'DM Mono',monospace;font-size:11.5px;letter-spacing:.07em;
text-transform:uppercase;color:var(--ink-faint);font-weight:400}
td.cat{font-family:'DM Mono',monospace;font-weight:500;white-space:nowrap}
.tags{margin-top:9px;display:flex;gap:6px;flex-wrap:wrap}
.tag{font-family:'DM Mono',monospace;font-size:11px;background:var(--teal-soft);
color:#036b64;padding:2.5px 8px;border-radius:20px;border:1px solid #c9e6e3}
footer{margin-top:60px;padding-top:22px;border-top:1px solid var(--paper-warm);
font-size:14.5px;color:var(--ink-light)}
@media(max-width:620px){h1{font-size:28px}table{font-size:14px}}
"""


def build():
    ts = exam_lib.TASK_STATEMENTS
    # Every objective an exercise claims must exist, and the four together must
    # touch all seven domains — otherwise the set has a hole.
    claimed = set()
    for ex in RUBRIC_EXERCISES:
        for o in ex["objectives"]:
            assert o in ts, f"exercise {ex['n']} claims unknown objective {o}"
            claimed.add(o)
    for o in ("D2.1", "D2.2", "D2.3", "D2.4", "D2.6", "D4.1", "D4.4", "D4.5",
              "D6.1", "D6.2", "D6.3", "D6.4"):
        assert o in ts, f"unknown objective {o}"
        claimed.add(o)
    doms = {o.split(".")[0] for o in claimed}
    assert doms == set(exam_lib.DOMAINS), (
        f"exercises miss domains: {sorted(set(exam_lib.DOMAINS) - doms)}")
    assert len({t[0] for t in TRIAGE_CATEGORIES}) == 4
    for _, cat, _ in TRIAGE:
        assert cat in {c[0] for c in TRIAGE_CATEGORIES}, f"unknown triage category {cat}"

    p = []
    p.append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    p.append('<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display'
             '&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;600&display=swap"'
             ' rel="stylesheet">')
    p.append(f"<style>{CSS}</style>")
    p.append('<header class="top"><div class="inner">'
             '<div class="eyebrow">Claude Certified Associate &middot; Foundations</div>'
             '<h1>Preparation exercises</h1>'
             '<p class="sub">Four exercises covering all seven domains. Two are scored '
             'against an answer key; two are self-assessed against a stated bar. '
             'Everything here is done in Claude and a browser &mdash; no tooling, no '
             'API key.</p></div></header>')
    p.append('<div class="wrap">')

    p.append('<div class="note"><strong>Order matters.</strong> Do exercise 3 first. '
             'Output evaluation is 21% of the exam &mdash; the heaviest domain by some '
             'way &mdash; and it is the one where a wrong instinct costs you most in real '
             'work. Then 4, then 1 and 2 in either order. Exercises 3 and 4B have answer '
             'keys, which between them make about a third of the exam by weight '
             'objectively checkable rather than a matter of opinion.</div>')

    p.append('<div class="warn"><strong>If you are working through this with Claude, '
             'one rule.</strong> Ask it to explain a concept, react to your reasoning, or '
             'play the stakeholder. Do not ask it to find the planted defects in exercise '
             '3 or classify the triage items in exercise 4 for you. Those judgments are '
             'the thing being exercised, and outsourcing them leaves you with a completed '
             'worksheet and no new instinct.</div>')

    # ── Exercise 3 ─────────────────────────────────────────────────────────
    p.append('<h2>3 &middot; The output-evaluation gauntlet</h2>')
    p.append('<div class="meta">D2 &mdash; Output Evaluation and Validation &middot; '
             '21% of the exam &middot; scored against an answer key</div>')
    p.append('<p>Five outputs below, each built from the source material shown above it. '
             'Every one has at least one deliberate defect. For each, write down what is '
             'wrong <em>before</em> opening the key &mdash; and note that "nothing" is '
             'never the answer here, which is itself unlike real life. Nine defects are '
             'planted in total.</p>')
    p.append('<p>The point is not to spot typos. It is to notice the four failure shapes '
             'the exam actually tests: a specific detail that is not in the source, a '
             'comparison the numbers do not support, a summary that is true about the '
             'half it covers, and a claim about cause built on nothing but sequence.</p>')
    for item in GAUNTLET:
        p.append('<div class="card">')
        p.append(f'<h3>{item["n"]}. {esc(item["title"])}</h3>')
        p.append(f'<p style="font-size:15.2px;color:var(--ink-light)">'
                 f'{esc(item["brief"])}</p>')
        p.append('<h4>Source material</h4><div class="src"><ul>'
                 + "".join(f'<li>{esc(s)}</li>' for s in item["source"])
                 + '</ul></div>')
        p.append('<h4>Claude\'s output</h4>'
                 f'<div class="out">{esc(item["output"])}</div>')
        p.append('<details><summary>Show the answer key '
                 f'({len(item["defects"])} planted)</summary><div class="inner">')
        for label, why in item["defects"]:
            p.append(f'<div class="defect"><div class="label">{esc(label)}</div>'
                     f'<div>{esc(why)}</div></div>')
        p.append('</div></details>')
        p.append('<div class="tags">'
                 + "".join(f'<span class="tag">{j}</span>' for j in item["judgments"])
                 + '</div>')
        p.append('</div>')

    p.append('<div class="note"><strong>Scoring yourself.</strong> Nine defects. Seven or '
             'more found, and your evaluation instinct is in reasonable shape. Below five, '
             'reread the nine judgments in the study guide and come back &mdash; this is '
             'the heaviest domain on the exam and the one most worth the second pass. '
             'Count a defect found only if you named what was wrong, not just that '
             'something felt off.</div>')

    # ── Exercise 4 ─────────────────────────────────────────────────────────
    p.append('<h2>4 &middot; Workflow redesign and governance triage</h2>')
    p.append('<div class="meta">D4 &mdash; Workflow Integration (16%) and D6 &mdash; '
             'Governance, Risk and Responsible Use (15%) &middot; part A self-assessed, '
             'part B scored against an answer key</div>')

    p.append('<h3>Part A &mdash; redesign a workflow you actually own</h3>')
    p.append('<p>Pick a recurring process you are responsible for. Then, in order:</p>')
    p.append('<ol class="phases">'
             '<li><strong>Describe it as it is</strong>, step by step, including who does '
             'each step and where it stalls. Vague input is the commonest reason a '
             'redesign goes nowhere.</li>'
             '<li><strong>Have Claude ask you clarifying questions</strong> before it '
             'proposes anything. If it starts proposing immediately, stop it and ask what '
             'it still needs to know. Pinning down the actual use case is itself an exam '
             'objective.</li>'
             '<li><strong>Work through two or three options as a dialogue</strong>, not '
             'one request expecting a finished answer.</li>'
             '<li><strong>Brief a stakeholder in writing</strong> &mdash; half a page on '
             'what this gives them <em>and</em> what stays human. A briefing that only '
             'sells the upside fails the objective; so does a blanket "too risky".</li>'
             '</ol>')
    p.append('<div class="card"><h4>Done when</h4><ul class="done">'
             '<li>Claude asked you at least two questions you had not thought about.</li>'
             '<li>Your briefing names a specific limitation and the review step that '
             'covers it, not "a human checks it".</li>'
             '<li>You can point at which steps changed and which deliberately did not.</li>'
             '</ul></div>')

    p.append('<h3>Part B &mdash; governance triage</h3>')
    p.append('<p>Classify each task into one category. Write your answers down before '
             'opening the key. The distinctions that matter are between B and D &mdash; '
             'fixable by handling the data differently, versus not appropriate at all '
             '&mdash; and between C and D, where Claude can help but must not decide.</p>')
    p.append('<table><thead><tr><th>Code</th><th>Category</th><th>Meaning</th></tr></thead>'
             '<tbody>')
    for code, name, meaning in TRIAGE_CATEGORIES:
        p.append(f'<tr><td class="cat">{code}</td><td>{esc(name)}</td>'
                 f'<td>{esc(meaning)}</td></tr>')
    p.append('</tbody></table>')
    p.append('<div class="card"><table><thead><tr><th style="width:34px">#</th>'
             '<th>Task</th></tr></thead><tbody>')
    for i, (task, _, _) in enumerate(TRIAGE, 1):
        p.append(f'<tr><td class="cat">{i}</td><td>{esc(task)}</td></tr>')
    p.append('</tbody></table>')
    p.append('<details><summary>Show the answer key (10 items)</summary><div class="inner">'
             '<table><thead><tr><th style="width:34px">#</th><th style="width:44px">Cat</th>'
             '<th>Why</th></tr></thead><tbody>')
    for i, (_, cat, why) in enumerate(TRIAGE, 1):
        p.append(f'<tr><td class="cat">{i}</td><td class="cat">{cat}</td>'
                 f'<td>{esc(why)}</td></tr>')
    p.append('</tbody></table></div></details></div>')
    p.append('<div class="note"><strong>Scoring yourself.</strong> Eight or more of ten '
             'is solid. If you missed items in both directions &mdash; some too cautious, '
             'some too permissive &mdash; that is more useful than a consistent bias: it '
             'means you are reading each case rather than applying one rule. The exam '
             'punishes reflexive caution as readily as recklessness.</div>')

    # ── Rubric exercises ──────────────────────────────────────────────────
    for ex in RUBRIC_EXERCISES:
        objs = ", ".join(ex["objectives"])
        p.append(f'<h2>{ex["n"]} &middot; {esc(ex["title"])}</h2>')
        p.append(f'<div class="meta">{objs} &middot; self-assessed against the bar below</div>')
        p.append(f'<p>{esc(ex["why"])}</p>')
        p.append('<ol class="phases">')
        for name, body in ex["phases"]:
            p.append(f'<li><strong>{esc(name)}.</strong> {esc(body)}</li>')
        p.append('</ol>')
        p.append('<div class="card"><h4>Done when</h4><ul class="done">'
                 + "".join(f'<li>{esc(d)}</li>' for d in ex["done_when"])
                 + '</ul></div>')

    # ── Debrief ───────────────────────────────────────────────────────────
    p.append('<h2>After each exercise</h2>')
    p.append('<p>Two questions, written down. They are worth more than the exercise.</p>')
    p.append('<div class="card"><h4>Where did you hesitate?</h4>'
             '<p>The places you guessed, reached for the docs, or needed a second attempt '
             'are exactly where the exam\'s distractors are aimed. Name them precisely '
             'enough to recognise them again.</p>'
             '<h4>Which wrong answers can you now reason away?</h4>'
             '<p>Not recognise &mdash; reason away. Being able to say <em>why</em> the '
             'tempting option is wrong is the difference between having seen a question '
             'before and understanding it.</p></div>')
    p.append('<div class="note"><strong>Then go and test it.</strong> Open the '
             '<a href="practice-exam/exam.html">practice exam</a> and answer questions on '
             'the objectives the exercise covered. The exam tracks which objectives you '
             'are weakest on and asks more about those, so an exercise that genuinely '
             'landed should show up as those objectives getting asked about less over '
             'time. (Unlike the Architect-exam repo this was forked from, there is no '
             'seed file to hand-edit here &mdash; every objective starts level and the '
             'weights are earned from your answers.)</div>')

    p.append('<footer><p>These exercises expand the "How to Prepare" section of the '
             'official exam guide. That guide is authoritative and this is a supplement; '
             'read it in full before scheduling. Anthropic does not guarantee that any '
             'resource produces a pass.</p>'
             '<p>Judgment codes (J1, J7&hellip;) refer to the nine recurring judgments in '
             'the <a href="associate_course.html">study guide</a>.</p></footer>')
    p.append('</div>')

    doc = ("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
           "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n"
           "<title>CCAO-F Preparation Exercises</title>\n"
           "<!-- Machine-written by practice-exam/build_exercises.py. Do not hand-edit;\n"
           "     edit the content data in that script and re-run it. -->\n"
           + "\n".join(p[:3]) + "\n</head>\n<body>\n"
           + "\n".join(p[3:]) + "\n</body>\n</html>\n")
    OUT.write_text(doc, encoding="utf-8")
    planted = sum(len(i["defects"]) for i in GAUNTLET)
    print(f"  wrote {OUT.name}: 4 exercises, {planted} planted defects, "
          f"{len(TRIAGE)} triage items, {len(doc):,} bytes")
    print(f"  objectives claimed: {len(claimed)} across domains {sorted(doms)}")


if __name__ == "__main__":
    build()
