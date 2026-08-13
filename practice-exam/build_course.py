"""Generate associate_course.html — the CCAO-F study guide.

Content lives here as data rather than in hand-written HTML so that the objective
list can be checked against exam_lib.TASK_STATEMENTS: the build asserts the keys
match exactly, so the guide cannot silently miss an objective or invent one. Same
discipline as questions.js — the HTML is machine-written, this is the source.

    python3 practice-exam/build_course.py

The ten judgments below were derived from the committed question bank, not
invented: they are the lessons the 96 questions' correct answers actually turn on.
"""

import html
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import exam_lib  # noqa: E402

OUT = Path(__file__).parent.parent / "associate_course.html"

# ── The through-line ────────────────────────────────────────────────────────
JUDGMENTS = [
    ("J1", "Verify the specific-looking detail",
     "A date, a figure, a citation, a clause number — the more precise a claim looks, "
     "the more it needs checking against the source before it leaves your hands. This "
     "is the single most-tested judgment on the exam. The trap is always the same: the "
     "output reads fluently and confidently, and the wrong answer is to trust that "
     "fluency, or to ask Claude how confident it is. Self-reported confidence is not "
     "an accuracy signal."),
    ("J2", "Claude drafts; a person decides",
     "Where an output affects someone's pay, employment, compliance exposure, or a "
     "customer relationship, a human owns the decision and the sign-off. Claude can do "
     "the organising, the drafting and a preliminary check. The exam repeatedly offers "
     "a plausible option that hands the judgment itself to Claude — that option is "
     "wrong even when the analysis would be good."),
    ("J3", "De-identify before it goes in",
     "Strip, mask or aggregate regulated personal data before uploading it, rather "
     "than uploading it and instructing Claude not to retain it. An instruction is not "
     "a control. Note the exam also punishes over-caution: abandoning a task entirely "
     "is usually wrong when anonymising would let it proceed within policy."),
    ("J4", "Standing context belongs in a Project",
     "If you find yourself re-pasting the same guidance, template or reference "
     "document into a fresh chat each week, that is configuration, not conversation. "
     "Move it into a Project — instructions for how to behave, knowledge sources for "
     "what to draw on. Watch for the distractor that suggests keeping one enormous "
     "chat open instead."),
    ("J5", "Specific beats vague — everywhere",
     "The most repeated lesson in the whole blueprint, and it shows up in three "
     "different disguises: as writing a prompt (D1), as writing a Project's custom "
     "instructions (D5), and as the diagnosis when a Project's output comes back "
     "generic (D7). “Be helpful and thorough” constrains nothing. Name the "
     "audience, the length, the tone, the required sections, and the rule that must "
     "always hold."),
    ("J6", "Keep the configuration current",
     "Superseded knowledge is worse than no knowledge: it produces confident answers "
     "from guidance nobody follows any more. When something changes, replace the stale "
     "source rather than layering an instruction on top of it, and prune what is no "
     "longer relevant."),
    ("J7", "Match the tool to the task",
     "A fast, low-cost model for straightforward high-volume work; the most capable "
     "model when the task turns on deep multi-factor reasoning; research mode when you "
     "need current external information with citations you can check; an artifact when "
     "the output is a substantial standalone thing someone will keep and revise. The "
     "wrong answers are always “use the best model for everything” and "
     "“switch platforms”."),
    ("J8", "Decompose, then iterate",
     "Break a multi-part request into ordered steps when later steps depend on earlier "
     "ones, or into independent tasks when they do not. Improve a weak draft by naming "
     "exactly what was missing and asking for a revision in the same conversation — "
     "not by asking for something “better”, and not by starting over."),
    ("J9", "Diagnose before you fix",
     "When a Project's output is consistently off, look at its instructions and its "
     "knowledge sources before you reach for a different model or a longer prompt. The "
     "exam's troubleshooting questions almost always resolve to one of those two, and "
     "the tempting wrong answer is to escalate the model."),
    ("J10", "On a sequencing item, eliminate on first and last",
     "Roughly four or five of the sixty items give you five numbered steps and five "
     "candidate orderings. They share a shape: three of the five can be discarded on "
     "their first or last step alone, leaving two that begin and end identically. The "
     "entire question is which of those two orders the middle correctly. So do not "
     "read five orderings in full — read the first and last step of each, discard the "
     "three that start or finish wrongly, then spend your time on the one real "
     "comparison. The middle almost always turns on a dependency: something that "
     "cannot happen until something else has. You cannot refine an instruction before "
     "running the thing once, or write instructions referencing a document you have "
     "not added yet, or re-measure a process you have not changed."),
]

# ── Per-objective content. Keys are checked against exam_lib.TASK_STATEMENTS. ──
# Each entry: (what it means / what gets tested, [judgment ids])
OBJECTIVES = {
    "D1.1": ("Write a prompt that carries the context Claude cannot infer: who the audience "
             "is, what tone is wanted, the constraints that matter, and any facts only you "
             "have. Expect a scenario where a one-line request produced something generic, "
             "and the fix is supplying what was missing rather than rephrasing.", ["J5"]),
    "D1.2": ("Split a complex request. Use an ordered sequence when a later step needs the "
             "output of an earlier one, and independent tasks when they do not. Bundling four "
             "deliverables into one message is the failure being tested. This is also the "
             "objective where an ordering question is most likely to turn up.", ["J8", "J10"]),
    "D1.3": ("Improve an output by naming the specific gap — the three dates it missed, the "
             "two features it omitted — and asking for a revision in the same conversation. "
             "“Make it better” and starting fresh are the wrong answers.", ["J8", "J5"]),
    "D1.4": ("Adapt the approach to the kind of task. Brainstorming wants breadth and "
             "deliberately varied options; research wants current sources and citations; "
             "drafting wants audience, format and length; analysis wants the criteria stated "
             "up front.", ["J7", "J8"]),
    "D2.1": ("Judge an output on accuracy and completeness — including what it left out. "
             "A summary that is accurate about what it covers can still be wrong by omission, "
             "so check coverage against the source material, not just the claims made.", ["J1"]),
    "D2.2": ("Recognise a hallucination by its shape: a specific, confident detail that is not "
             "in the source you provided. Also covers internal inconsistency and bias in "
             "framing or in whose perspective is represented.", ["J1"]),
    "D2.3": ("Check a claim against an authoritative source: the contract clause, the plan "
             "document, the competitor's own pricing page, the original call notes. Sampling "
             "the raw data to test whether a stated prevalence holds counts here too.", ["J1"]),
    "D2.4": ("Decide when a human must look. Triggers are stakes (pay, employment, legal "
             "exposure), a policy that requires review, ambiguity the output cannot resolve, "
             "and any claim that carries consequences if wrong.", ["J2"]),
    "D2.5": ("Reshape an output for a different audience by telling Claude the new audience, "
             "purpose and tone explicitly — plain language for frontline staff, brevity for an "
             "executive — rather than lightly editing what you have.", ["J5", "J8"]),
    "D2.6": ("Choose the output format by how the thing will be used. A substantial standalone "
             "document someone will keep and revise belongs in an artifact; a short answer read "
             "once belongs inline. Structured comparisons belong in a table.", ["J7"]),
    "D3.1": ("Pick the right product feature: a Project for recurring work with fixed context, "
             "research mode for current external information with citations, artifacts for "
             "substantial output, plain chat for a one-off question.", ["J7", "J4"]),
    "D3.2": ("Know what the model tiers are for. Haiku is the fast, low-cost option for "
             "straightforward high-volume work; Opus is for tasks whose value lies in depth of "
             "reasoning; Sonnet sits between them.", ["J7"]),
    "D3.3": ("Match the model to the requirement rather than defaulting. Two tasks in one week "
             "may warrant two different models. “Always use the most capable” wastes "
             "cost and latency; the exam treats that as a real error.", ["J7"]),
    "D3.4": ("Manage the conversation itself. A long chat degrades and starts contradicting "
             "earlier conclusions; the fix is to have Claude summarise the settled decisions "
             "and carry that summary into a fresh conversation — or to persist the recurring "
             "parts in a Project.", ["J4", "J9"]),
    "D5.1": ("Set a Project up so it holds the right two things: knowledge sources for the "
             "material to draw on, and custom instructions for how to behave. Reference "
             "documents do not belong pasted into instructions.", ["J4", "J5"]),
    "D5.2": ("Manage what a Project reaches. Connect a source that keeps changing rather than "
             "pasting a copy; choose the connector that reaches the material you need (documents "
             "in Drive, agreements in email); and prune knowledge that has gone stale.",
             ["J6", "J7"]),
    "D5.3": ("Write instructions that constrain the output. Name the audience, the structure, the "
             "tone, and the rules that must always hold. Vague virtue words produce inconsistent "
             "results across a team.", ["J5"]),
    "D5.4": ("Maintain a configuration over time. When guidance is superseded, replace the stale "
             "knowledge source and update the instructions that describe the old template — do "
             "not layer a correction on top.", ["J6"]),
    "D4.1": ("Use Claude to sharpen a vague requirement before working on it: ask the clarifying "
             "questions that pin down which data, which period, and what the output is actually "
             "for.", ["J8"]),
    "D4.2": ("Apply Claude to research and planning, using research mode where current external "
             "sources matter, and reviewing the citations rather than taking the synthesis on "
             "trust.", ["J7", "J1"]),
    "D4.3": ("Support design and iteration as a dialogue: share the current process and its pain "
             "points, have Claude propose options, then refine. Not a single request expecting a "
             "finished answer.", ["J8"]),
    "D4.4": ("Fit Claude into an existing workflow. Recurring manual assembly — the same weekly "
             "report from the same three spreadsheets — is the signal to move the standing parts "
             "into a Project.", ["J4"]),
    "D4.5": ("Explain to a stakeholder both what Claude gives you and what it does not: pair the "
             "concrete value with the review step that stays human. Neither uncritical "
             "enthusiasm nor blanket refusal is the answer.", ["J2"]),
    "D6.1": ("Separate appropriate uses from inappropriate ones. Drafting, organising, analysing "
             "and preliminary checks are fine; final decisions with human consequences, and "
             "presenting generated content as genuine, are not.", ["J2"]),
    "D6.2": ("Apply data-sensitivity and privacy judgment: anonymise, aggregate or mask regulated "
             "data before it goes in, keep genuinely sensitive material out of shared spaces, and "
             "confirm that anyone given access is authorised to see what it holds.", ["J3"]),
    "D6.3": ("Follow the organisation's own AI policy, including the parts that are inconvenient. "
             "If policy requires review before external release, or committee approval for a new "
             "automated use, that step is not optional.", ["J2"]),
    "D6.4": ("Think about the ethics rather than only the rules: fabricated testimonials "
             "presented as real, performance ratings decided by a draft, a rejection reason "
             "exposing detail it should not. The judgment is about consequence, not compliance.",
             ["J2", "J3"]),
    "D7.1": ("Diagnose an underperforming Project by inspecting its instructions and its "
             "knowledge sources — vague wording, missing definitions, a stale document — before "
             "changing anything else.", ["J9", "J5", "J10"]),
    "D7.2": ("Act on the pattern in the feedback. A systematic mismatch repeating for weeks is an "
             "instruction problem: revise the instruction, and add a worked example of what good "
             "looks like.", ["J9", "J5"]),
    "D7.3": ("Optimise the workflow, not just the prompt. Separate Projects for separate "
             "initiatives, an artifact for a document being revised repeatedly, and standing "
             "context configured once instead of re-supplied.", ["J4", "J7", "J10"]),
}

CSS = """
:root{--ink:#1a1a2e;--ink-light:#4a4a6a;--ink-faint:#8888aa;--paper:#f7f6f1;
--paper-warm:#eeeade;--card:#fffdf8;--accent:#2E4057;--teal:#048A81;
--teal-soft:#e2f2f0;--amber:#c17f24;--coral:#c94f3a;}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);
font-family:'DM Sans',system-ui,sans-serif;font-weight:300;line-height:1.65;
font-size:16.5px;-webkit-font-smoothing:antialiased}
.wrap{max-width:860px;margin:0 auto;padding:0 22px 90px}
header.top{background:var(--accent);color:#fff;padding:46px 22px 40px;margin-bottom:34px}
header.top .inner{max-width:860px;margin:0 auto}
h1{font-family:'DM Serif Display',serif;font-weight:400;font-size:35px;margin:0 0 10px;
line-height:1.15}
.sub{color:#c9d4e2;font-size:16px;max-width:640px}
.eyebrow{font-family:'DM Mono',monospace;font-size:11.5px;letter-spacing:.13em;
text-transform:uppercase;color:#8fa8c4;margin-bottom:14px}
h2{font-family:'DM Serif Display',serif;font-weight:400;font-size:25px;
margin:52px 0 6px;line-height:1.2}
h2 .code{font-family:'DM Mono',monospace;font-size:14px;color:var(--ink-faint);
letter-spacing:.06em}
.weight{font-family:'DM Mono',monospace;font-size:12.5px;color:var(--teal);
margin-bottom:20px}
h3{font-family:'DM Sans',sans-serif;font-weight:600;font-size:17px;margin:0 0 6px}
p{margin:0 0 14px}
a{color:var(--teal)}
.card{background:var(--card);border:1px solid var(--paper-warm);border-radius:9px;
padding:19px 21px;margin-bottom:14px}
.obj{display:flex;gap:14px;align-items:flex-start}
.obj input{margin-top:5px;width:17px;height:17px;accent-color:var(--teal);
cursor:pointer;flex:0 0 auto}
.obj .body{flex:1 1 auto;min-width:0}
.oid{font-family:'DM Mono',monospace;font-size:12px;color:var(--ink-faint);
letter-spacing:.05em}
.tags{margin-top:9px;display:flex;gap:6px;flex-wrap:wrap}
.tag{font-family:'DM Mono',monospace;font-size:11px;text-decoration:none;
background:var(--teal-soft);color:#036b64;padding:2.5px 8px;border-radius:20px;
border:1px solid #c9e6e3}
.tag:hover{background:#d3ece9}
.j{background:var(--card);border:1px solid var(--paper-warm);border-left:3px solid var(--teal);
border-radius:0 9px 9px 0;padding:17px 20px;margin-bottom:12px}
.j .n{font-family:'DM Mono',monospace;font-size:11.5px;color:var(--teal);
letter-spacing:.09em;margin-bottom:3px}
.note{background:#fff8e8;border:1px solid #f0dcae;border-radius:9px;padding:17px 20px;
margin:22px 0;font-size:15.3px}
.note strong{color:var(--amber)}
.toc{background:var(--card);border:1px solid var(--paper-warm);border-radius:9px;
padding:19px 22px;margin-bottom:12px}
.toc ol{margin:0;padding-left:20px;columns:2;column-gap:30px}
.toc li{margin-bottom:5px;break-inside:avoid}
.bar{position:sticky;top:0;background:rgba(247,246,241,.95);backdrop-filter:blur(7px);
border-bottom:1px solid var(--paper-warm);padding:9px 22px;z-index:9;
font-family:'DM Mono',monospace;font-size:12.5px;color:var(--ink-light)}
.bar .inner{max-width:860px;margin:0 auto;display:flex;justify-content:space-between;
gap:12px;align-items:center;flex-wrap:wrap}
.bar button{font:inherit;background:none;border:1px solid var(--paper-warm);
border-radius:5px;padding:2px 9px;cursor:pointer;color:var(--ink-light)}
.bar button:hover{border-color:var(--teal);color:var(--teal)}
footer{margin-top:60px;padding-top:22px;border-top:1px solid var(--paper-warm);
font-size:14.5px;color:var(--ink-light)}
@media(max-width:620px){.toc ol{columns:1}h1{font-size:28px}}
"""

JS = """
// Self-assessment ticks, persisted locally. The official guide tells candidates to
// self-assess against the blueprint, so the guide it points at should let you.
var KEY = "ccaof.guide.v1";
function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
                 catch (e) { return {}; } }
function save(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
function paint(){
  var s = load(), boxes = document.querySelectorAll(".obj input"), done = 0;
  boxes.forEach(function(b){ if (s[b.dataset.oid]) { b.checked = true; done++; } });
  document.getElementById("count").textContent =
    done + " of " + boxes.length + " objectives marked as understood";
}
document.addEventListener("change", function(e){
  if (!e.target.matches(".obj input")) return;
  var s = load();
  if (e.target.checked) s[e.target.dataset.oid] = 1; else delete s[e.target.dataset.oid];
  save(s); paint();
});
document.getElementById("reset").addEventListener("click", function(){
  save({});
  document.querySelectorAll(".obj input").forEach(function(b){ b.checked = false; });
  paint();
});
paint();
"""


def esc(t):
    return html.escape(t, quote=False)


def build():
    ts, dom = exam_lib.TASK_STATEMENTS, exam_lib.DOMAINS
    # The whole point of generating this: the guide cannot drift from the blueprint.
    missing, extra = set(ts) - set(OBJECTIVES), set(OBJECTIVES) - set(ts)
    assert not missing, f"guide is missing objectives: {sorted(missing)}"
    assert not extra, f"guide invents objectives not in the blueprint: {sorted(extra)}"
    known = {j[0] for j in JUDGMENTS}
    for oid, (_, tags) in OBJECTIVES.items():
        bad = set(tags) - known
        assert not bad, f"{oid} references unknown judgments {bad}"

    weights = {"D1": 14, "D2": 21, "D3": 12, "D4": 16, "D5": 12, "D6": 15, "D7": 10}
    p = []
    p.append('<link rel="preconnect" href="https://fonts.googleapis.com">')
    p.append('<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display'
             '&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;600&display=swap"'
             ' rel="stylesheet">')
    p.append(f"<style>{CSS}</style>")
    p.append('<header class="top"><div class="inner">'
             '<div class="eyebrow">Claude Certified Associate &middot; Foundations</div>'
             '<h1>Study guide</h1>'
             '<p class="sub">The seven domains and all thirty objectives of the CCAO-F '
             'blueprint, plus the ten judgments the exam keeps coming back to. Built '
             'against exam guide v1.0 (July 2026).</p></div></header>')
    p.append('<div class="bar"><div class="inner"><span id="count"></span>'
             '<button id="reset" type="button">Clear ticks</button></div></div>')
    p.append('<div class="wrap">')

    p.append('<div class="note"><strong>How to use this.</strong> The official guide '
             'tells you to self-assess against the blueprint, so tick an objective once '
             'you could explain the judgment it asks for to a colleague. Ticks are saved '
             'in this browser only. Read the ten judgments first — they are the '
             'through-line, and most questions are one of them wearing a different '
             'job title. Then work the domains, heaviest first: D2 is 21% of the exam '
             'and D7 is 10%.</div>')

    p.append('<h2>The ten judgments</h2>')
    p.append('<div class="weight">Derived from the questions in the practice bank, '
             'not invented &mdash; these are what the correct answers actually turn on. The last is a technique rather than a principle: it is how to attack the sequencing items, which a real sitting confirmed are 4-5 of the 60.</div>')
    for jid, title, body in JUDGMENTS:
        p.append(f'<div class="j" id="{jid}"><div class="n">{jid}</div>'
                 f'<h3>{esc(title)}</h3><p>{esc(body)}</p></div>')

    p.append('<h2>The blueprint</h2>')
    p.append('<div class="toc"><ol>')
    for d in sorted(dom):
        p.append(f'<li><a href="#{d}">{esc(dom[d])}</a> '
                 f'<span class="oid">{weights[d]}%</span></li>')
    p.append('</ol></div>')

    for d in sorted(dom):
        objs = sorted((o for o in ts if o.startswith(d + ".")),
                      key=lambda s: int(s.split(".")[1]))
        p.append(f'<h2 id="{d}">{esc(dom[d])} <span class="code">{d}</span></h2>')
        p.append(f'<div class="weight">{weights[d]}% of the exam &middot; '
                 f'{len(objs)} objectives &middot; '
                 f'about {exam_lib.EXAM_FORM_QUOTAS[d]} of 60 questions</div>')
        for oid in objs:
            body, tags = OBJECTIVES[oid]
            tag_html = "".join(
                f'<a class="tag" href="#{t}">{t} {esc(dict((j[0], j[1]) for j in JUDGMENTS)[t])}</a>'
                for t in tags)
            p.append(
                f'<div class="card obj">'
                f'<input type="checkbox" data-oid="{oid}" aria-label="Mark {oid} understood">'
                f'<div class="body"><div class="oid">{oid}</div>'
                f'<h3>{esc(ts[oid])}</h3><p>{esc(body)}</p>'
                f'<div class="tags">{tag_html}</div></div></div>')

    p.append('<footer><p><strong>This is a supplement, not a replacement.</strong> The '
             'authoritative source is the exam guide on the Anthropic Partner Academy; '
             'read it in full before scheduling. Anthropic does not guarantee that any '
             'resource produces a pass.</p>'
             '<p>The objective text is quoted verbatim from guide section 6. The '
             '<span class="oid">D&lt;n&gt;.&lt;m&gt;</span> numbering is this repo\'s, not '
             'Anthropic\'s &mdash; the guide lists objectives as unnumbered bullets.</p>'
             '<p>Practise against these objectives in the '
             '<a href="practice-exam/exam.html">adaptive practice exam</a>. Read its '
             'known limitations first &mdash; they are listed in the README.</p></footer>')
    p.append('</div>')
    p.append(f"<script>{JS}</script>")

    doc = ("<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n"
           "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n"
           "<title>CCAO-F Study Guide</title>\n"
           "<!-- Machine-written by practice-exam/build_course.py. Do not hand-edit;\n"
           "     edit the content data in that script and re-run it. -->\n"
           + "\n".join(p[:3]) + "\n</head>\n<body>\n"
           + "\n".join(p[3:]) + "\n</body>\n</html>\n")
    OUT.write_text(doc, encoding="utf-8")
    print(f"  wrote {OUT.name}: {len(ts)} objectives, {len(JUDGMENTS)} judgments, "
          f"{len(doc):,} bytes")


if __name__ == "__main__":
    build()
