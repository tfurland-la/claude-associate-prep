// CCAO-F practice exam question bank - machine-written by exam_lib.render_bank().
// Do not hand-edit; add or change questions via generate_bank.py.
window.CCAOF_BANK = [
  {
    "taskStatement": "D2.3",
    "domain": "D2",
    "scenario": "An associate asks Claude to summarize a new regulation. Claude produces a confident summary that cites a specific subsection number. The summary is about to go to the compliance team.",
    "question": "Before sending the summary, what is the most appropriate action?",
    "options": {
      "A": "Send it as-is, since Claude expressed high confidence.",
      "B": "Verify the cited subsection against the official regulation text before sharing.",
      "C": "Ask Claude to rate its own confidence and send it if the rating is high.",
      "D": "Reword the summary to sound more formal, then send it."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Expressed confidence is not evidence of accuracy; a fluent, confident summary can still contain a fabricated citation.",
      "B": "Correct. Language models can fabricate specific-looking details such as citation numbers. Validating factual claims against an authoritative source is the required diligence step, especially for a compliance audience.",
      "C": "Incorrect. Self-reported confidence is not a reliable accuracy signal, so routing on it reproduces the same risk.",
      "D": "Incorrect. Reformatting changes tone, not correctness, and leaves the unverified citation in place."
    },
    "provenance": {
      "source": "official-sample",
      "model": null,
      "generatedAt": null,
      "reviewed": true
    },
    "id": "D2.3-0361f880"
  },
  {
    "taskStatement": "D3.3",
    "domain": "D3",
    "scenario": "An associate needs to generate a high volume of short customer-reply drafts. The work is straightforward, and speed and cost matter more than deep reasoning.",
    "question": "Which choice best fits the task?",
    "options": {
      "A": "Use the most capable, highest-cost model for every reply to maximize quality.",
      "B": "Use a faster, lower-cost model suited to straightforward, high-volume tasks.",
      "C": "Disable all product features to reduce cost.",
      "D": "Switch to a different AI platform."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Always reaching for the top model wastes the cost and latency budget on work that does not need deep reasoning.",
      "B": "Correct. Aligning model selection with task requirements means matching a faster, lower-cost model to straightforward, high-volume work, and reserving the most capable model for complex reasoning.",
      "C": "Incorrect. Turning features off does not address the model-selection trade-off the task actually presents.",
      "D": "Incorrect. Changing platform does not address the trade-off, and discards a capability that already fits once the right model is chosen."
    },
    "provenance": {
      "source": "official-sample",
      "model": null,
      "generatedAt": null,
      "reviewed": true
    },
    "id": "D3.3-28dafc1e"
  },
  {
    "taskStatement": "D6.2",
    "domain": "D6",
    "scenario": "A project manager wants to upload a spreadsheet containing customer names and account numbers so Claude can analyze trends. Organizational policy restricts sharing regulated personal data.",
    "question": "What is the most appropriate action?",
    "options": {
      "A": "Upload the file as-is, since the analysis is internal.",
      "B": "Remove or anonymize the personal identifiers before uploading, consistent with policy.",
      "C": "Upload the file but instruct Claude not to retain it.",
      "D": "Skip the analysis entirely."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Internal use does not exempt regulated personal data from a policy that restricts sharing it.",
      "B": "Correct. Applying data-sensitivity and privacy safeguards means redacting or anonymizing regulated identifiers before use, so the analysis proceeds without exposing protected data.",
      "C": "Incorrect. An instruction to the model is not a policy control; the regulated data has already been shared.",
      "D": "Incorrect. Abandoning the task is unnecessary when anonymization lets the analysis go ahead within policy."
    },
    "provenance": {
      "source": "official-sample",
      "model": null,
      "generatedAt": null,
      "reviewed": true
    },
    "id": "D6.2-72d31180"
  },
  {
    "taskStatement": "D5.1",
    "domain": "D5",
    "scenario": "An operations lead is setting up a Claude Project so their team can draft consistent supplier-onboarding summaries. Today each person pastes the onboarding policy into a fresh chat, and the summaries come back in different shapes depending on who asked.",
    "question": "Which two changes to the Project most directly fix the inconsistency?",
    "options": {
      "A": "Upload the onboarding policy as a knowledge source in the Project, so every conversation draws on the same document.",
      "B": "Write Project instructions that state the required summary sections and their order.",
      "C": "Ask each team member to keep their own chat open for as long as possible so context carries over.",
      "D": "Tell the team to paste the policy at the start of every message rather than only the first.",
      "E": "Switch the Project to a more capable model so the summaries come out longer."
    },
    "correct": [
      "A",
      "B"
    ],
    "selectCount": 2,
    "explanations": {
      "A": "Correct. A knowledge source attached to the Project gives every conversation the same policy text, removing the variation that comes from each person pasting their own copy.",
      "B": "Correct. Project instructions are where a required output shape belongs, so the structure no longer depends on how each person happens to phrase the request.",
      "C": "Incorrect. Long-running chats are fragile and personal to one user; they cannot make output consistent across a team.",
      "D": "Incorrect. This is more of the behaviour causing the problem, and it wastes context on text the Project could hold once.",
      "E": "Incorrect. Model capability is not the constraint here; length is not consistency, and the inconsistency is a configuration gap."
    },
    "provenance": {
      "source": "hand-authored",
      "model": null,
      "generatedAt": null,
      "reviewed": true
    },
    "id": "D5.1-d78516a0"
  },
  {
    "taskStatement": "D2.4",
    "domain": "D2",
    "scenario": "A communications specialist used Claude to draft an all-staff announcement about a change to the benefits package. The draft reads well, names specific enrolment dates, and quotes a figure for the new employer contribution.",
    "question": "Which two of these warrant human verification before the announcement goes out?",
    "options": {
      "A": "The specific enrolment dates in the draft.",
      "B": "The figure quoted for the employer contribution.",
      "C": "The greeting and sign-off wording.",
      "D": "The paragraph ordering of the announcement.",
      "E": "The reading level of the final paragraph."
    },
    "correct": [
      "A",
      "B"
    ],
    "selectCount": 2,
    "explanations": {
      "A": "Correct. Dates are exactly the kind of specific-looking detail a model can fabricate, and a wrong enrolment date in an all-staff message causes real harm.",
      "B": "Correct. A benefits figure is a verifiable factual claim with financial consequences, so it must be checked against the authoritative source rather than trusted because it reads plausibly.",
      "C": "Incorrect. Greeting and sign-off are matters of tone. Getting them wrong is embarrassing, not misleading, and they carry no factual claim to verify.",
      "D": "Incorrect. Paragraph ordering is an editorial preference the author can judge directly; nothing about it can be factually false.",
      "E": "Incorrect. Reading level is a style judgement, and the author is better placed than a verifier to decide it."
    },
    "provenance": {
      "source": "hand-authored",
      "model": null,
      "generatedAt": null,
      "reviewed": true
    },
    "id": "D2.4-c0ef40dc"
  },
  {
    "taskStatement": "D1.1",
    "domain": "D1",
    "scenario": "A marketing manager is preparing a first draft of messaging for a new product launch. She opens a chat with Claude and types: \"Write marketing copy for our new product launch.\" The output is generic — it could describe almost any product in any industry, and doesn't mention the target audience, tone, or channel she has in mind.",
    "question": "What change to her prompt would most likely produce a more useful draft?",
    "options": {
      "B": "Add context Claude needs to do the task well: the product's key features, the target audience, the desired tone, and the intended channel (e.g., a launch email versus a social post).",
      "A": "Ask Claude the same question three separate times and manually splice together the best sentences from each response.",
      "C": "Switch to a more capable model, since the issue is the model's reasoning ability rather than the prompt itself.",
      "D": "Repeat the same request but add the word \"please\" and ask Claude to \"try harder\" on this attempt."
    },
    "correct": "B",
    "explanations": {
      "B": "Correct. Effective prompting means giving Claude the context and specifics it needs to complete a business task well — here, the product details, audience, tone, and channel. A prompt with clear context produces a far more usable, targeted draft than a vague one, regardless of which model is used.",
      "A": "Incorrect. Re-running an underspecified prompt multiple times doesn't fix the root cause — vague inputs will keep producing vague, generic outputs regardless of how many times it's repeated.",
      "C": "Incorrect. The output was generic because the prompt lacked necessary context, not because the task exceeded the model's reasoning capacity. A more capable model given the same vague prompt would likely still produce generic copy.",
      "D": "Incorrect. Politeness or exhortations like \"try harder\" don't supply the missing information Claude needs; the fix is adding concrete task context, not adjusting tone toward the model."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.1-668163c1"
  },
  {
    "taskStatement": "D1.2",
    "domain": "D1",
    "scenario": "An Operations Lead needs to overhaul the company's vendor onboarding process before the end of the quarter. The work involves reviewing the current onboarding checklist to spot outdated steps, drafting a revised checklist, writing a short training summary for new hires, and preparing a rollout timeline across three regional offices. Unsure how to phrase such a sprawling request, she types one message asking Claude to \"fix our vendor onboarding process,\" attaches the old checklist, and expects a single comprehensive answer back.\n\nThe first response feels shallow — it touches on all four goals but goes into real depth on none of them, and she isn't sure which part to trust or use first.",
    "question": "What is the best way for the Operations Lead to get a more useful result from Claude?",
    "options": {
      "C": "Resend the same one-line request but switch to a more capable model, since model choice is what determines whether a broad task gets decomposed correctly.",
      "D": "Ask Claude to generate clarifying questions about the onboarding process, then treat Claude's own answers to those questions as the finished, ready-to-use checklist.",
      "A": "Break the request into separate, ordered steps — first identify outdated checklist items, then draft the revised checklist, then write the training summary, then build the rollout timeline — reviewing each output before moving to the next.",
      "B": "Keep the single broad request as written, since Claude performs best when given full autonomy over ambiguous, multi-part tasks in one pass."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. A more capable model can reason better within a turn, but it does not substitute for structuring a multi-part request into ordered steps; the underlying issue is task decomposition, not model capability.",
      "D": "Incorrect. Clarifying questions can help scope a task, but Claude's own generated answers are not a substitute for the Operations Lead's actual input or for a reviewed, deliberately drafted checklist — treating them as final skips the verification a business-critical document needs.",
      "A": "Correct. Decomposing a request that bundles several distinct deliverables (audit, draft, summary, timeline) into discrete, sequential subtasks — and checking each output before it feeds the next — gives Claude a focused goal at each stage and lets the Operations Lead catch problems early instead of receiving one shallow, hard-to-verify response covering everything at once.",
      "B": "Incorrect. A single instruction spanning four distinct deliverables tends to produce shallow, unfocused coverage of each one, which is exactly the problem she already experienced — the fix is structuring the request, not trusting the model to unpack it unaided."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.2-f8ae58ca"
  },
  {
    "taskStatement": "D1.3",
    "domain": "D1",
    "scenario": "An Operations Lead asks Claude to draft a vendor escalation email summarizing three missed SLA deadlines. The first draft is technically accurate but reads as vague and overly soft — it buries the missed dates in the middle of a paragraph and doesn't clearly state what the vendor needs to do next. The Operations Lead needs a sharper version before sending it to the vendor's account manager today.",
    "question": "What is the most effective next step to get a usable draft?",
    "options": {
      "A": "Give Claude specific feedback on what's wrong with the draft (e.g., list the three missed dates up front, and end with a clear required action and deadline), then ask it to revise.",
      "D": "Switch to a more capable model without changing the prompt, since output quality is primarily a function of which model is used.",
      "B": "Manually rewrite the email themselves, since Claude's first attempt already shows it cannot handle this kind of firm, direct communication.",
      "C": "Regenerate the draft from scratch with the exact same prompt, since a second attempt will likely produce a stronger result."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Iterating effectively means giving Claude specific, concrete feedback about what fell short and what the revision should include, rather than vague dissatisfaction or repeating the same instructions. Pointing to exact gaps (buried dates, no clear ask) gives Claude what it needs to improve the draft on the next turn.",
      "D": "Incorrect. The problem here is a lack of specific direction in the prompt, not a reasoning-capability gap the draft displayed — changing models without addressing the actual feedback does not reliably fix a vague, poorly structured draft.",
      "B": "Incorrect. One weak draft does not mean the task is beyond Claude's ability; iterating with clearer, specific feedback is the appropriate step before abandoning the tool for a task like this.",
      "C": "Incorrect. Re-running an identical prompt gives Claude no new information about what was wrong, so it is likely to reproduce the same vague, soft framing rather than fix it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.3-8dcd244d"
  },
  {
    "taskStatement": "D1.3",
    "domain": "D1",
    "scenario": "A marketing manager asks Claude to draft social media captions for a new product launch. The first draft comes back grammatically correct but generic — it reads like it could describe any product in the category, and doesn't mention the two features the team is most excited about. The manager doesn't have time to rewrite the captions from scratch and wants Claude's next attempt to actually be usable.",
    "question": "What is the most effective way to get a better draft from Claude?",
    "options": {
      "A": "Start a brand-new conversation and resend the exact same prompt, since Claude sometimes produces a better result on a second try.",
      "D": "Give Claude specific feedback on what was missing (the two key features) and describe the tone and specificity wanted, then ask it to revise.",
      "C": "Ask Claude to make the captions \"more creative\" without further detail, since a vaguer draft just needs a vaguer instruction to loosen it up.",
      "B": "Accept the draft and manually add the two missing features herself, since asking Claude again is unlikely to change the outcome."
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. Resending an identical prompt in a fresh conversation discards the useful context of what was wrong with the first draft and relies on chance rather than deliberate iteration.",
      "D": "Correct. Iterating effectively means telling Claude specifically what was wrong and what's needed — naming the missing features and the desired tone/specificity gives Claude concrete direction to revise against, rather than leaving it to guess.",
      "C": "Incorrect. A vague instruction like \"more creative\" doesn't address the actual problem (missing feature mentions, generic tone) and gives Claude no concrete target to improve toward.",
      "B": "Incorrect. Manually patching the output abandons the iteration process; specific, targeted feedback would likely get Claude to produce a usable draft directly, saving the manual rework."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.3-959e5991"
  },
  {
    "taskStatement": "D1.4",
    "domain": "D1",
    "scenario": "An Operations Lead has spent the morning using the same approach for every Claude conversation: open a chat, type a short open-ended request, and take whatever comes back. That worked fine for drafting a quick internal announcement, but now she needs Claude to brainstorm several distinct options for restructuring the team's on-call rotation, and the first response reads like one polished, fully-formed recommendation rather than a set of alternatives to react to.\n\nShe wants a wider spread of genuinely different rotation structures to bring to a planning meeting this afternoon, not just one finished plan.",
    "question": "To get a more useful result for this brainstorming task, what should the Operations Lead change about her prompting approach?",
    "options": {
      "D": "Switch to research mode so Claude gathers external sources on on-call rotation best practices before responding.",
      "A": "Explicitly ask for several distinct options with different underlying trade-offs, and frame the request as generating alternatives to react to rather than a single final recommendation.",
      "C": "Keep the prompt exactly as written, since the open-ended style that worked for the announcement will naturally produce diverse options for any task.",
      "B": "Add the current on-call policy as a knowledge source in a Project so Claude has more background before answering."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. Research mode is suited to gathering and citing external information; it does not address the actual problem, which is that the prompt itself is structured to produce a single recommendation rather than divergent options.",
      "A": "Correct. Brainstorming benefits from a prompt that explicitly requests multiple, meaningfully different options and casts Claude's role as generating alternatives rather than settling on one answer — this is the adaptation that fits the task type, unlike the drafting-style prompt she reused.",
      "C": "Incorrect. Drafting and brainstorming call for different prompting strategies. A prompt style that converges on one polished output suits drafting but is exactly why brainstorming came back as a single recommendation instead of a spread of alternatives.",
      "B": "Incorrect. Adding background context can improve relevance, but it does not change the prompt's framing from 'give one answer' to 'give several distinct alternatives,' so the same narrow, single-recommendation output would likely recur."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.4-67fe9e5a"
  },
  {
    "taskStatement": "D1.4",
    "domain": "D1",
    "scenario": "Priya, a marketing manager, is planning next quarter's campaign work in a single chat with Claude. First she wants Claude to look into how competitors have positioned similar products over the past year, since she isn't sure yet what the market landscape actually looks like. After that, she plans to have Claude generate a wide range of unconventional campaign taglines before she and her team narrow them down, and finally she wants Claude to draft the actual customer-facing email copy once a direction is chosen.",
    "question": "Priya wants to prompt each stage of this work in a way suited to what that stage actually requires. Which approach best matches prompting strategy to task type across the three stages?",
    "options": {
      "B": "Use one identical, detailed prompt for all three stages, since consistent phrasing produces the most reliable results regardless of task type.",
      "A": "For the competitor landscape, use research-oriented prompting to gather and synthesize current information; for taglines, prompt for volume and variety without narrowing early; for the email copy, give a tightly specified prompt with audience, tone, and required content.",
      "C": "Skip prompting for the competitor landscape since Claude already knows the market, and ask for taglines and email copy using the same brainstorming-style prompt to save time.",
      "D": "Give the most tightly constrained, detailed prompt at every stage, including the tagline brainstorming, since more specific instructions always produce better output."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. Research, brainstorming, and drafting call for different prompting approaches; a single fixed prompt style ignores that research needs current-information gathering, brainstorming needs open-ended breadth, and drafting needs tight specification.",
      "A": "Correct. Adapting prompting strategy to task type means using research-oriented prompting to surface and synthesize current, verifiable information when the landscape is unknown, open-ended prompting that favors quantity and variety over premature narrowing for brainstorming, and a precisely specified prompt (audience, tone, required elements) once the task shifts to producing a finished draft.",
      "C": "Incorrect. Claude's knowledge can be outdated or incomplete for a fast-moving competitive landscape, so treating research as unnecessary risks a stale or ungrounded answer; it also collapses brainstorming and drafting into one style even though they need opposite prompting approaches (broad and unconstrained vs. narrow and specific).",
      "D": "Incorrect. Applying tight constraints during brainstorming suppresses the variety that stage is meant to produce; over-specifying too early narrows the option set before the team has had a chance to diverge."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.4-508fef63"
  },
  {
    "taskStatement": "D1.4",
    "domain": "D1",
    "scenario": "A project manager is kicking off a stalled internal initiative: renaming a confusing internal tool that three different teams call by three different names. She wants a wide slate of fresh name candidates to bring to a naming workshop next week, not a final decision — the team will narrow the list together in the meeting.\n\nShe opens a new Claude chat to get the ideas flowing before the workshop.",
    "question": "Which prompt best fits what she needs at this stage?",
    "options": {
      "A": "\"Research how other companies named similar internal tools and produce a fully cited report on industry naming conventions.\"",
      "C": "\"Here's background on the tool and its users. Analyze all the naming options and tell me definitively which single name is correct.\"",
      "B": "\"Write the final announcement email introducing the new tool name to the company, in a formal and polished tone.\"",
      "D": "\"Here's background on the tool and its users. Generate as many varied name candidates as you can, including some unconventional ones — don't narrow it down, I want a broad list to react to.\""
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. This substitutes a research task (gathering and citing external sources) for what is needed: original creative candidates grounded in the team's own context, not a literature review of other companies' conventions.",
      "C": "Incorrect. This treats an open-ended brainstorm as an analysis task by asking Claude to converge on a single 'correct' answer. Forcing early convergence defeats the purpose of generating a broad set of options for the workshop to discuss.",
      "B": "Incorrect. This applies a drafting strategy — producing one polished, final-form document — to a stage where no name has even been chosen. It skips the divergent idea-generation step the situation actually calls for.",
      "D": "Correct. The task is brainstorming — the goal is volume and variety of raw material for a group to react to. A prompt that explicitly asks for many varied, even unconventional options, and instructs Claude not to prematurely narrow the list, matches that open-ended, divergent purpose."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.4-eb717825"
  },
  {
    "taskStatement": "D2.1",
    "domain": "D2",
    "scenario": "A project manager is preparing a status report for a steering committee. She pastes in raw notes from five separate stakeholder update calls and asks Claude to produce a consolidated summary of project risks, decisions, and open action items. Claude returns a well-organized summary, including a line stating that \"the vendor confirmed the integration delay will be resolved by August 15th.\"\n\nThe project manager doesn't recall anyone stating that exact date on the calls, but the rest of the summary matches her recollection closely, and the report is due to the committee within the hour.",
    "question": "What is the most appropriate next step before sending the report?",
    "options": {
      "C": "Send the report as-is, since the rest of the summary is accurate and Claude is generally reliable at synthesizing notes.",
      "B": "Ask Claude whether it is confident about the August 15th date, and include the claim only if Claude says it is sure.",
      "A": "Delete the entire risks section from the summary to avoid any chance of an inaccurate statement reaching the committee.",
      "D": "Cross-check the specific date claim against the original call notes or with the vendor before including it in the report."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. Overall accuracy across most of a summary does not guarantee every specific detail is correct; a single fabricated or misattributed fact, like a commitment date, can still slip through and mislead a committee that will act on it.",
      "B": "Incorrect. A model's self-reported confidence is not a reliable indicator of factual accuracy, so using it as the basis for inclusion just reproduces the same unverified risk rather than resolving it.",
      "A": "Incorrect. Removing the entire section discards genuinely useful, verifiable content to avoid dealing with one questionable claim, when the actual fix is to verify that specific detail.",
      "D": "Correct. Evaluating a Claude-generated output for accuracy and completeness means verifying specific, checkable claims against the underlying source material before relying on them, especially when a detail doesn't match the reviewer's own recollection and will inform a decision-making audience."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.1-80c3730a"
  },
  {
    "taskStatement": "D2.1",
    "domain": "D2",
    "scenario": "A marketing manager is preparing a competitive landscape brief for the VP of Marketing ahead of a Monday planning meeting. She asks Claude, using research mode, to pull from current web sources and summarize five competitors' recent product launches, pricing changes, and messaging shifts. Claude returns a well-organized brief with a summary table listing each competitor's launch date, price point, and a one-line takeaway.\n\nThe table looks polished and internally consistent, and two of the five rows match figures she already knew from her own market tracking. She's ready to paste the table directly into her deck for the VP.",
    "question": "What is the most appropriate next step before using the brief?",
    "options": {
      "A": "Paste the table into the deck as-is, since research mode pulled from live web sources and two rows already checked out against her own tracking.",
      "B": "Ask Claude to state how confident it is in each row, and keep only the rows it rates as high confidence.",
      "C": "Rewrite the takeaways in a more polished tone so the brief reads better for the VP, then use it as-is.",
      "D": "Spot-check the remaining unfamiliar figures (launch dates, price points) against the competitors' own sites or press releases, and confirm the brief actually covers all five competitors before using it."
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. That two rows happened to match her prior knowledge doesn't validate the other three; a fluent, well-organized table can still contain inaccurate or outdated figures, and partial agreement is not verification of the whole.",
      "B": "Incorrect. A model's self-reported confidence rating is not a reliable signal of actual accuracy, so filtering rows by it reproduces the same risk rather than resolving it.",
      "C": "Incorrect. Polishing tone changes presentation, not correctness, and leaves any unverified or incomplete figures in place.",
      "D": "Correct. Evaluating a Claude-generated output for accuracy and completeness means checking unfamiliar factual claims against authoritative sources and confirming nothing was dropped or generalized (all five competitors genuinely covered) before it goes into a deck for a VP."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.1-9367f206"
  },
  {
    "taskStatement": "D2.2",
    "domain": "D2",
    "scenario": "An Operations Lead is preparing a vendor comparison for an upcoming contract renewal. She pastes three vendors' pricing sheets into a Claude chat and asks it to summarize each vendor's renewal terms and flag any contracts that include automatic price escalation clauses. Claude's summary states that Vendor B's contract includes a 5% automatic annual price increase starting in year two.\n\nWhen she opens Vendor B's actual pricing sheet to attach it to her recommendation memo, she cannot find any mention of an automatic annual increase anywhere in the document.",
    "question": "What does this discrepancy most likely indicate, and what should she do next?",
    "options": {
      "D": "It indicates Claude applied outside general knowledge about typical vendor contracts, which is acceptable as long as the rest of the summary appears accurate.",
      "B": "It indicates Claude hallucinated a detail not present in the source document, so she should correct that claim and re-check the rest of the summary against the original pricing sheets before using it in the memo.",
      "C": "It indicates Claude deliberately misled her, so she should stop using Claude for this kind of document review going forward.",
      "A": "It indicates the pricing sheet she uploaded was an outdated version, so she should ask Claude which version is correct."
    },
    "correct": "B",
    "explanations": {
      "D": "Incorrect. Inventing a specific numeric term not found in the provided source is a hallucination, not a benign application of general knowledge, and it should not be waved through just because other parts of the summary look plausible.",
      "B": "Correct. A specific, confident-sounding detail that does not appear anywhere in the source document is a classic hallucination. Finding one fabricated claim means the rest of the summary's claims should also be verified against the original pricing sheets before the comparison informs a contract decision.",
      "C": "Incorrect. Hallucination is a known model limitation rather than intentional deception, and abandoning the tool entirely is an overreaction when the real issue is verifying outputs against source material before relying on them.",
      "A": "Incorrect. Claude has no way to independently know whether an uploaded document is outdated; treating a fabrication as a document-versioning question asks the model to judge something it cannot actually verify."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.2-7469e52c"
  },
  {
    "taskStatement": "D2.2",
    "domain": "D2",
    "scenario": "A marketing manager is using Claude to draft a competitor landscape summary for an upcoming pricing review. She pastes in three competitor blog posts and asks Claude to summarize each company's pricing model and recent product launches. The response is well-organized and confident, listing specific price points and launch dates for each competitor, including one launch date that she does not recall seeing mentioned in any of the pasted articles.",
    "question": "What should she do before including this summary in the pricing review deck?",
    "options": {
      "D": "Include the summary as written, since Claude only had the three pasted articles to work from and could not have introduced anything not in them.",
      "A": "Cross-check the unfamiliar launch date and other specific claims against the original source articles before using them in the deck.",
      "B": "Delete the one launch date she noticed was unfamiliar, and leave the rest of the confident, well-organized summary untouched.",
      "C": "Ask Claude to double-check its own answer and trust the summary if it reaffirms the same launch date."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. A confident, well-organized response is not proof that every specific detail is grounded in the provided text; Claude can still generate a fluent but fabricated detail such as a launch date not present in the source articles.",
      "A": "Correct. A specific detail that doesn't match her recollection of the source material is a signal to verify against the original articles before it is used in a business deck, since fabricating plausible-sounding specifics is a known failure mode even in otherwise well-organized responses.",
      "B": "Incorrect. Removing only the single detail she happened to notice does not address whether other specific claims, such as the price points, are similarly unsupported by the source articles; the underlying claims all need to be checked, not just the one that stood out.",
      "C": "Incorrect. Asking the same model to re-check its own output and treating a repeated answer as confirmation is not independent verification; the model can confidently restate the same unsupported claim."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.2-bbc81c78"
  },
  {
    "taskStatement": "D2.3",
    "domain": "D2",
    "scenario": "A project manager is using a Claude Project to prepare a vendor risk memo for a steering committee. The Project's knowledge sources include the vendor's signed contract PDF and last year's audit report. When asked \"What is the vendor's data breach notification window per the contract?\", Claude replies with a specific number of hours and phrases the answer as if quoting the contract directly.",
    "question": "What is the most appropriate next step before including this figure in the steering committee memo?",
    "options": {
      "A": "Open the contract PDF and locate the actual notification-window clause to confirm the number Claude gave.",
      "D": "Trust the figure, since Claude answered from documents uploaded to the Project's knowledge source rather than general training data.",
      "B": "Add a footnote to the memo stating the figure came from Claude, so the committee can judge reliability themselves.",
      "C": "Ask Claude a second time in a new chat and use the answer if it repeats the same number."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Even when Claude draws on uploaded knowledge sources, it can misstate or fabricate specific figures. Checking the cited number against the actual contract text is the required validation step before a factual claim goes into a decision-facing document.",
      "D": "Incorrect. Grounding a Project in knowledge sources improves relevance but does not guarantee every stated figure is an accurate quotation of those sources; the output still needs verification against the source itself.",
      "B": "Incorrect. Disclosing the source shifts the burden of verification onto the committee instead of resolving whether the figure is correct, and does not fulfill the fact-checking responsibility before sharing.",
      "C": "Incorrect. A repeated answer reflects consistency, not accuracy - the same misreading of the contract could recur identically across chats, so this does not substitute for checking the source document."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.3-af9abe93"
  },
  {
    "taskStatement": "D2.3",
    "domain": "D2",
    "scenario": "A marketing manager uses Claude to draft a competitor comparison one-pager for the sales team, pulling in a rival product's pricing tiers and feature list. Claude's draft states the competitor's enterprise plan \"starts at $499/month and includes SSO,\" phrased with the same fluent confidence as the rest of the document. The manager doesn't recall seeing that specific pricing detail in the competitor's public materials but is on a tight deadline to get the sheet to sales before an afternoon call.",
    "question": "What is the most appropriate way to handle the pricing claim before distributing the sheet?",
    "options": {
      "C": "Ask Claude, in the same chat, whether the $499 figure is accurate, and rely on that answer to decide.",
      "B": "Check the competitor's pricing page (or another authoritative source) for that figure before sending, and correct or remove it if it can't be confirmed.",
      "D": "Distribute the sheet on schedule, since Claude would only include a specific figure like that if it had a source for it.",
      "A": "Delete the specific number and replace it with vaguer language like \"competitively priced\" so nothing needs to be checked."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Asking the same model to confirm its own prior output is not independent verification against an authoritative source; a model can restate or even double down on a fabricated figure with the same fluent confidence as the original claim.",
      "B": "Correct. Specific quantitative claims like pricing are exactly the kind of detail a model can fabricate while sounding certain. The manager already has doubt about this one, so verifying it against the competitor's actual pricing page (or another authoritative source) before it reaches sales is the appropriate validation step.",
      "D": "Incorrect. A model can state a specific-looking number fluently and confidently whether or not it has a verified source for it; the manager's own hesitation about the figure is a signal to check, not a reason to assume it's grounded.",
      "A": "Incorrect. Vagueing away the claim avoids the work of checking it, but it also discards potentially accurate, useful information the sales team could use. The correct fix is to verify the figure, not to dodge verification by deleting specifics."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.3-913ad1c1"
  },
  {
    "taskStatement": "D2.3",
    "domain": "D2",
    "scenario": "An HR business partner used Claude to draft answers to a list of frequently asked benefits-enrollment questions for the company intranet, pulling from a PDF of this year's plan document uploaded to the chat. One answer states that the dependent-care FSA contribution limit is $7,500 for the year. The HR partner recalls a different figure from the open-enrollment webinar but isn't fully sure, and the FAQ page is scheduled to go live company-wide tomorrow morning.",
    "question": "What should the HR partner do before publishing the FAQ page?",
    "options": {
      "A": "Delete the specific dollar figure from the answer so there is nothing left to verify.",
      "B": "Ask Claude whether it is confident in the figure, and publish if Claude says it is confident.",
      "D": "Publish the page as-is, since the figure came from the uploaded plan document rather than from Claude's general knowledge.",
      "C": "Locate the contribution limit in the source plan document (or check the current authoritative plan-provider figure) and confirm it matches before publishing."
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. Removing the figure avoids the immediate risk but leaves employees without the information they need; verifying the correct figure and publishing it is the better outcome.",
      "B": "Incorrect. A model's self-reported confidence is not evidence of accuracy and should not substitute for checking the source document or the authoritative figure.",
      "D": "Incorrect. Grounding a response in an uploaded document reduces but does not eliminate the risk of error — the model can still misread or misstate a number from the source, so the specific figure still needs to be checked before it goes out company-wide.",
      "C": "Correct. A specific, checkable number about to reach a wide audience is exactly the kind of claim that needs validation against an authoritative source before publishing, especially when the HR partner already has a reason to doubt it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.3-099ae010"
  },
  {
    "taskStatement": "D2.4",
    "domain": "D2",
    "scenario": "A marketing manager runs a Claude Project set up to draft social media captions and short ad copy variants for an upcoming product launch. The Project's knowledge source includes past campaign style guides, and the manager routinely asks Claude to generate 10-15 caption options at a time, then picks favorites and schedules them directly through the team's social media connector without further review, since the tone has consistently matched brand voice.\n\nThis week's launch includes a limited-time discount tied to a specific promo code and expiration date. Claude drafts captions that state the promo code and end date confidently, in the same on-brand style as always.",
    "question": "Given the manager's usual practice of picking favorites and scheduling them without further review, what should change for this batch of captions?",
    "options": {
      "A": "Before scheduling, verify the promo code and expiration date against the actual offer terms, since these are concrete factual details Claude could get wrong even in an on-brand draft.",
      "B": "Nothing — the captions match brand voice as reliably as always, so the same pick-and-schedule process is fine.",
      "D": "Add a custom instruction telling Claude to always double-check its own facts, then continue scheduling without separate review.",
      "C": "Switch the Project to a more capable model so the promo details are generated more accurately."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. A confident, on-brand draft can still contain a fabricated or misremembered detail, and exact facts like a promo code or expiration date carry real consequences if wrong (customer confusion, an honored expired discount, an invalid code). This is exactly the kind of specific, high-stakes detail that requires human verification against the source before publishing, even when the surrounding style is trustworthy.",
      "B": "Incorrect. Consistent brand voice reflects style matching, not factual accuracy — it says nothing about whether the specific promo code or expiration date is correct, so it doesn't justify skipping review.",
      "D": "Incorrect. Asking the model to self-check does not substitute for verification against the actual offer terms — a model's self-reported diligence is not evidence its output is correct.",
      "C": "Incorrect. A more capable model may write more polished copy but is not a guaranteed fix for factual accuracy on specific details like a promo code or date; the correct control is human verification, not a model upgrade."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.4-4fa7ba1c"
  },
  {
    "taskStatement": "D2.4",
    "domain": "D2",
    "scenario": "A project manager set up a Claude Project for weekly status reporting, with the project's knowledge sources containing the team's task tracker exports and prior status reports. Each Friday, the PM asks Claude to generate a status update summarizing which milestones are on track, at risk, or delayed, then pastes the result directly into an email to the department VP.\n\nThis week, Claude's draft flags the \"vendor integration\" milestone as \"on track,\" but the PM recalls hearing in a hallway conversation two days ago that the vendor had a staffing change that might delay their deliverable. That conversation isn't reflected in any of the uploaded documents.",
    "question": "What should the PM do before sending this week's status update to the VP?",
    "options": {
      "D": "Verify the vendor milestone's status with the team or vendor contact before reporting it, since Claude's output cannot reflect information that was never in its knowledge sources.",
      "B": "Ask Claude whether it is confident about the vendor milestone status, and send the update if it says yes.",
      "C": "Send the update as-is, since Claude's assessment is based directly on the uploaded task tracker data.",
      "A": "Add the hallway conversation as a custom instruction in the Project so future reports account for it, and send this week's update unchanged."
    },
    "correct": "D",
    "explanations": {
      "D": "Correct. When the person closest to the work has outside reason to doubt an output, that is precisely the signal calling for human verification: the PM should confirm the vendor milestone status through a human channel (the team or vendor contact) before it reaches the VP.",
      "B": "Incorrect. A model's self-reported confidence reflects how it processed its available inputs, not whether those inputs were complete or current. It cannot substitute for verifying a fact the model was never given.",
      "C": "Incorrect. Grounding in the uploaded documents only guarantees consistency with what was provided, not completeness. Claude has no way to reflect information, like the hallway conversation, that was never uploaded to the Project's knowledge sources.",
      "A": "Incorrect. Updating the Project's knowledge or instructions may help future reports, but it does nothing to fix or verify the claim in this week's update, which is what is about to be sent."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.4-58533755"
  },
  {
    "taskStatement": "D2.4",
    "domain": "D2",
    "scenario": "An HR business partner uses a Claude Project to triage employee relations cases. The project's knowledge sources include the employee handbook and past case summaries, and the custom instructions ask Claude to suggest a recommended course of action for each new case description pasted into the chat. For a routine late-arrival attendance case, Claude recommended a verbal coaching conversation, citing the relevant handbook section, and the HR partner followed the suggestion after a quick skim.\n\nA new case arrives describing an employee's complaint about a coworker's repeated comments related to their religion. Claude again produces a confident, well-organized recommendation, this time proposing a specific disciplinary outcome and next steps.",
    "question": "Compared with how the HR partner handled the attendance case, what should be different about how they handle Claude's output this time?",
    "options": {
      "C": "Nothing — since the Project already includes the handbook as a knowledge source, Claude's recommendation reflects vetted company policy either way.",
      "B": "This case should be routed to a human reviewer such as legal or senior HR before any action is taken, because it involves a protected-class harassment allegation with legal and disciplinary stakes.",
      "D": "The HR partner should ask Claude to rate how confident it is in the recommendation and proceed if Claude reports high confidence.",
      "A": "The HR partner should ask Claude to regenerate the recommendation and follow whichever version reads as more authoritative."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Having the handbook as a knowledge source does not make Claude a policy authority or decision-maker; it can still misapply or misweigh the material, and its output remains a draft suggestion rather than a vetted determination — the routine-case shortcut doesn't scale to a higher-stakes case.",
      "B": "Correct. Determining when human review is required means weighing the stakes and consequences of a decision, not treating every output the same way. A harassment complaint tied to a protected characteristic carries legal exposure and disciplinary consequences well beyond a late-arrival coaching conversation, so it warrants escalation to a qualified human reviewer before any action, even though the same Project handled both cases.",
      "D": "Incorrect. Claude's self-reported confidence is not a reliable signal of correctness or of legal soundness, so gating the decision on it reproduces the same risk the scenario is testing for.",
      "A": "Incorrect. Regenerating the output and picking the more confident-sounding version does not add verification; a more authoritative tone is not evidence the recommendation is correct or legally sound."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.4-b089ed77"
  },
  {
    "taskStatement": "D2.5",
    "domain": "D2",
    "scenario": "An Operations Lead asked Claude to draft a summary of a new warehouse safety procedure for the leadership team, and the result is thorough but dense: full of compliance terminology, cross-references to regulation numbers, and multi-clause sentences. Leadership approved it, and now the Operations Lead needs to distribute the same procedure to frontline warehouse staff who will read it quickly on a shared tablet between shifts.\n\nReusing the leadership draft as-is would save time, but the Operations Lead is unsure whether it will actually communicate the procedure clearly to that different audience.",
    "question": "What is the most appropriate way to prepare the version for frontline staff?",
    "options": {
      "C": "Send the leadership draft to frontline staff unchanged, since the underlying procedure is identical for both audiences.",
      "D": "Ask Claude to revise the draft specifically for frontline staff — plain-language steps, no regulation cross-references or compliance jargon — then review the rewrite before distributing it.",
      "B": "Ask Claude to shorten the draft by cutting words, without otherwise changing its tone or terminology.",
      "A": "Ask Claude to make the draft sound more formal and authoritative so frontline staff take the procedure seriously."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. The same content in the same form does not serve two audiences with very different needs; content correct for a leadership review does not guarantee it communicates clearly to staff reading quickly between shifts.",
      "D": "Correct. Adapting an output for its intended audience means re-tailoring language, structure, and level of detail to that reader's needs, then checking the result before it goes out — not merely reusing or lightly trimming the original.",
      "B": "Incorrect. Trimming length without addressing terminology and structure conflates brevity with audience fit — a shorter version can still be full of jargon a frontline reader won't parse quickly.",
      "A": "Incorrect. Frontline staff scanning a procedure quickly need plain, actionable language; adding formality moves further from what this audience needs rather than adapting toward it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.5-2f07e9e2"
  },
  {
    "taskStatement": "D2.5",
    "domain": "D2",
    "scenario": "A marketing manager used Claude to draft an announcement about an upcoming product update. The draft is written in a detailed, feature-by-feature style with technical specifications, which worked well for an internal brief to the sales team. Now the manager needs a version of the same announcement for the company's customer email newsletter, where the tone should be brief, benefit-focused, and free of internal jargon.\n\nRather than starting over, the manager wants to reuse the existing draft and reshape it for the new audience.",
    "question": "What is the most effective way for the marketing manager to produce the customer-facing version?",
    "options": {
      "B": "Give Claude the original draft and ask it to refine and adapt it for the newsletter audience, specifying the shorter length, customer-friendly tone, and benefit-first framing needed.",
      "A": "Copy the sales draft into the newsletter as-is, since it already covers all the product details customers would want.",
      "C": "Start a brand-new chat and ask Claude to write a newsletter announcement with no reference to the original draft, so the tone isn't influenced by the internal version.",
      "D": "Ask Claude to shorten the draft, then manually delete any sentences that look too technical before sending."
    },
    "correct": "B",
    "explanations": {
      "B": "Correct. Effectively editing and adapting an output for a new audience means giving Claude the existing draft along with explicit guidance on the target audience, desired length, tone, and framing, so the refinement is purposeful rather than generic.",
      "A": "Incorrect. The internal draft's detailed, jargon-heavy style is mismatched to a customer newsletter audience; reusing it unchanged ignores the need to adapt tone and content to the intended reader.",
      "C": "Incorrect. Discarding the original draft wastes usable content and context; comparing and adapting an existing output for a new audience does not require abandoning it, only redirecting it with clear audience-specific instructions.",
      "D": "Incorrect. This treats adaptation as a generic shortening pass followed by manual line-by-line cleanup, rather than directing Claude with the specific audience, tone, and framing needed. It is slower and more error-prone than giving clear adaptation instructions upfront."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.5-cbd2bec7"
  },
  {
    "taskStatement": "D2.6",
    "domain": "D2",
    "scenario": "An Operations Lead asks Claude to compare five shipping vendors across cost, transit time, and reliability, using data pasted from several emailed quotes. The comparison will be referenced repeatedly over the next two weeks as the team negotiates contracts, and the Operations Lead wants to hand a clean version to a colleague who was not part of the conversation.",
    "question": "Which way of receiving the output best fits this situation?",
    "options": {
      "C": "As a raw JSON data dump, since structured data is inherently more trustworthy than a formatted document",
      "A": "As an artifact, but only because artifacts should be used for every Claude response regardless of content",
      "B": "As a well-organized artifact containing the comparison table, since it is substantial standalone content meant to be revisited and shared independently of the chat",
      "D": "As plain inline chat text, since keeping everything in the conversation is always the simplest option"
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Structured data formats are appropriate when the output feeds another system or process, not because they carry more inherent credibility; for a document meant to be read and shared by a person, a formatted comparison is more useful than a raw data dump.",
      "A": "Incorrect. Choosing the artifact format is right here, but not because artifacts suit every response - output format should be matched to the content and its use, and a one-off quick answer would not warrant an artifact.",
      "B": "Correct. A multi-vendor comparison that will be revisited and handed to someone outside the conversation is exactly the kind of substantial, standalone content that curating into an artifact serves best - it stays organized, editable, and shareable apart from the chat thread.",
      "D": "Incorrect. Inline text works for short, disposable answers, but it is awkward to hand off to a colleague and hard to revisit as a clean reference over two weeks - the content here calls for a durable, standalone format."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.6-be1ef58b"
  },
  {
    "taskStatement": "D2.6",
    "domain": "D2",
    "scenario": "A marketing manager is prepping for a quarterly planning meeting. She asks Claude to pull together a competitive landscape review: a short narrative summary of what changed this quarter, a table comparing five competitors across pricing, positioning, and recent launches, and a list of three recommended campaign responses. She plans to paste the table into a shared planning doc, read the narrative aloud in the meeting, and leave the recommendations as talking points she'll speak to live.",
    "question": "Given how each piece of content will actually be used, how should she ask Claude to structure the output?",
    "options": {
      "A": "Have Claude generate everything as one long inline chat response, since keeping it all in a single format is simplest to manage.",
      "C": "Have Claude generate all three pieces as separate artifacts, since artifacts are the more advanced output format and should be used whenever available.",
      "B": "Have Claude put the competitor comparison in an artifact formatted as a table for easy copying, and keep the narrative summary and recommendations inline in the chat.",
      "D": "Have Claude output the entire competitive review as structured JSON so it is easiest for her to reuse later."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. A single inline block forces her to hand-extract the table data to paste into the planning doc, which is exactly the friction that choosing an appropriate output format is meant to avoid.",
      "C": "Incorrect. Artifacts are appropriate for standalone, substantial, or reusable content, not a default to apply to every output regardless of use; the narrative and recommendations do not need to persist as separate documents.",
      "B": "Correct. Selecting an output format means matching it to how the content will be used: the table is standalone, reusable content meant to be copied into another document, so an artifact suits it, while the narrative and talking points are meant to be read or spoken in the moment, so keeping them inline avoids creating artifacts she will never reuse.",
      "D": "Incorrect. Structured data like JSON is suited to further processing or system integration, not to content a person will read aloud or speak to as talking points in a meeting."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.6-92bd6a97"
  },
  {
    "taskStatement": "D3.1",
    "domain": "D3",
    "scenario": "A marketing manager writes a monthly customer newsletter and wants every draft to consistently match the brand's tone of voice and formatting conventions. Each month she opens a new chat and pastes in the company style guide and a couple of past newsletters as examples before asking Claude to draft the new one, which is time-consuming and produces slightly inconsistent results depending on what she happens to paste in.",
    "question": "Going forward, what is the best way to get consistent, on-brand newsletter drafts each month?",
    "options": {
      "C": "Save the style guide as an Artifact so it displays alongside the chat, then paste it into the conversation each month as before.",
      "D": "Set up a Project with custom instructions describing the brand voice and the style guide and past newsletters uploaded as knowledge sources, then draft each month's newsletter inside that Project.",
      "A": "Use research mode each month and ask Claude to look up the company's brand guidelines before drafting.",
      "B": "Keep using a single, ever-growing chat conversation so Claude can scroll back to see the style guide and past examples she pasted in earlier."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. Artifacts are for substantial, standalone outputs (like the newsletter draft itself) to view and iterate on, not a mechanism for storing reference material or instructions that persist across future conversations.",
      "D": "Correct. A Project lets custom instructions capture the brand voice once and knowledge sources hold the style guide and past newsletters, so every conversation started inside it automatically has that context without re-pasting it each time.",
      "A": "Incorrect. Research mode is for gathering and synthesizing information from external sources; the brand guide is an internal document she already has, not something to be discovered via research.",
      "B": "Incorrect. A single long-running chat still depends on the guide and examples having been pasted into that thread already, doesn't scale across separate sessions cleanly, and isn't the feature built for persisting standing instructions and reference material."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.1-9b400181"
  },
  {
    "taskStatement": "D3.3",
    "domain": "D3",
    "scenario": "An Operations Lead has been using Claude all week for quick, high-volume tasks like drafting shift-change reminders and cleaning up meeting notes, and the fast, low-cost model has handled those fine. Now she needs to work through a much harder problem: two vendors have submitted competing proposals with different pricing structures, service-level guarantees, and transition risks, and leadership wants a single recommendation that weighs all the tradeoffs and anticipates likely objections from finance and legal.",
    "question": "For the vendor-consolidation recommendation, what is the most appropriate model choice?",
    "options": {
      "C": "Switch to the most capable model for this task, since it involves complex, multi-factor reasoning, while keeping the faster model for the routine drafting work.",
      "B": "Switch to whichever model was released most recently, since newer models are always the better choice for harder problems.",
      "D": "Use the most capable model for all of her work going forward, including the shift-change reminders and meeting notes.",
      "A": "Keep using the same fast, low-cost model for this task too, since she is already familiar with it and it has worked well so far."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Matching model selection to task requirements means reserving the most capable model for complex reasoning across competing tradeoffs and likely objections, while continuing to use a faster, lower-cost model for straightforward, high-volume drafting.",
      "B": "Incorrect. Recency is not the basis for model selection; the relevant distinction is which model's capability level fits the task's complexity, not which model is newest.",
      "D": "Incorrect. Always reaching for the most capable model wastes cost and speed on simple, high-volume work that does not need deep reasoning.",
      "A": "Incorrect. A model well-suited to quick, high-volume drafting is not necessarily suited to weighing multiple competing tradeoffs and anticipating objections; familiarity with the tool does not substitute for matching model capability to task complexity."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.3-9198df28"
  },
  {
    "taskStatement": "D3.2",
    "domain": "D3",
    "scenario": "A marketing manager runs two very different tasks through Claude in the same week. The first is triaging a spreadsheet of 300 incoming webinar sign-up questions, sorting each one into a handful of simple categories like \"pricing,\" \"scheduling,\" or \"technical.\" The second is drafting the messaging strategy and positioning narrative for a major product launch, where Claude needs to weigh competitive tradeoffs, reconcile input from three stakeholder groups, and produce a nuanced recommendation.\n\nShe wants to choose the right model for each task rather than defaulting to the same one for everything, since her team's Claude usage is billed by consumption.",
    "question": "Which model choice best fits these two tasks?",
    "options": {
      "D": "Use Haiku for the sign-up categorization, since it's a fast, low-cost fit for simple, high-volume classification, and use Opus for the launch strategy, since it involves complex reasoning and reconciling competing considerations.",
      "B": "Use Opus for the sign-up categorization to guarantee accuracy on every row, and use Haiku for the launch strategy to keep drafting costs down.",
      "C": "Use Opus for the sign-up categorization since it is the most capable model, and use Opus for the launch strategy as well, to keep results consistent.",
      "A": "Use the same mid-tier model, Sonnet, for both tasks, since one model applied consistently removes the need to think about task fit."
    },
    "correct": "D",
    "explanations": {
      "D": "Correct. Matching model to task means using a fast, lower-cost model like Haiku for straightforward, repetitive classification work, and reserving the most capable model, Opus, for tasks that require deep reasoning, weighing tradeoffs, and synthesizing input from multiple stakeholders.",
      "B": "Incorrect. This pairing is backwards: it applies unnecessary capability to the simple task while under-powering the complex, high-stakes strategy work that actually needs deeper reasoning.",
      "C": "Incorrect. Reaching for the most capable, highest-cost model for simple, high-volume categorization wastes cost and latency budget on work that does not need deep reasoning.",
      "A": "Incorrect. Picking one model for convenience ignores that tasks vary in complexity; it does not appropriately match model capability to the demands of either task."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.2-23944b5a"
  },
  {
    "taskStatement": "D3.3",
    "domain": "D3",
    "scenario": "A marketing manager is preparing a competitive positioning analysis for an upcoming board review. The task involves synthesizing dense market research, weighing subtle trade-offs between competitor strategies, and producing a defensible strategic recommendation. The board meeting is not for another two weeks, so there is no unusual time pressure, but the analysis needs to hold up under tough questioning.",
    "question": "Which model choice best fits this task?",
    "options": {
      "A": "Run the fastest, lowest-cost model several times and combine the drafts, since repetition can substitute for a more capable model.",
      "D": "Use whichever model is the newest release, since newer always means better suited to this task.",
      "B": "Use the most capable model available, since the task requires deep reasoning and the output quality matters more than speed or cost here.",
      "C": "Use the fastest, lowest-cost model, since there is no deadline pressure and cost efficiency should always come first."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Running a lower-capability model multiple times does not add the reasoning depth needed; it multiplies cost without addressing the actual requirement.",
      "D": "Incorrect. Recency is not the relevant selection criterion; the decision should rest on matching model capability to task complexity, not on release date.",
      "B": "Correct. Aligning model selection with task requirements means reserving the most capable model for complex, high-stakes reasoning where quality outweighs speed and cost, which is exactly the trade-off this board-level analysis presents.",
      "C": "Incorrect. Treating cost as the top priority regardless of task complexity ignores that this analysis requires the kind of nuanced reasoning a faster, lighter model is not built to deliver reliably."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.3-61b5d3d5"
  },
  {
    "taskStatement": "D3.4",
    "domain": "D3",
    "scenario": "A marketing manager has spent the afternoon in a single Claude chat iterating on a product launch campaign: she pasted in three rounds of brand guidelines, several competitor teardown notes, a dozen tagline drafts, and a long back-and-forth refining messaging for three audience segments. The conversation is now very long, and she notices Claude has started contradicting earlier decisions — reintroducing a tagline she explicitly rejected two rounds ago and mixing up which segment gets which tone.\n\nShe still has two more segments' worth of messaging to draft and wants the final set to stay consistent with the decisions already made, without re-pasting everything from scratch each time.",
    "question": "What is the most appropriate way for her to proceed?",
    "options": {
      "A": "Switch the conversation to a more capable model, since a higher-tier model will correctly recall the rejected tagline without any other action.",
      "D": "Continue in the same chat, but from now on repeat the full brand guidelines and list of rejected options in every new message.",
      "C": "Keep working in the same chat, since Claude retains everything said earlier in a conversation with equal reliability no matter how long it runs.",
      "B": "Ask Claude to summarize the confirmed decisions so far, then start a fresh conversation carrying that summary forward as the new working context."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Choosing a more capable model changes reasoning quality, not the underlying context-length problem; it does not substitute for summarizing and restarting when a long conversation is losing track of earlier decisions.",
      "D": "Incorrect. Re-pasting everything in every message adds bulk to an already overloaded conversation rather than resolving the cause of the contradictions, and is far less efficient than consolidating decisions into a summary and starting fresh.",
      "C": "Incorrect. A conversation's effective context can degrade as it grows very long, which is exactly why earlier decisions were dropped or contradicted; assuming equal recall regardless of length ignores the symptom she already observed.",
      "B": "Correct. When a conversation grows unwieldy and earlier decisions start slipping, the appropriate response is to distill the confirmed state into a summary and restart in a fresh conversation using that summary, preserving continuity without carrying forward a degraded, overlong context."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.4-bae16dc2"
  },
  {
    "taskStatement": "D4.1",
    "domain": "D4",
    "scenario": "A marketing manager is scoping a request from the VP of Sales: build a Claude-based workflow that turns raw win/loss interview notes into a quarterly themes report. Before setting anything up, the manager wants to make sure the workflow will actually solve the VP's problem rather than just producing a polished-looking summary. So far the manager has only been told \"we need to understand why we're losing deals to Competitor X.\"\n\nThe manager considers configuring a Claude Project with the interview notes as a knowledge source and a first-pass set of custom instructions, but pauses before building it out.",
    "question": "What is the most appropriate next step before configuring the Project?",
    "options": {
      "C": "Ask clarifying questions to pin down the specific use case — e.g., which deals, what time range, and what decision the report will inform — then design the Project around that.",
      "D": "Skip the Project and instead ask Claude in a single chat to infer the VP's real requirements from the interview notes alone.",
      "A": "Set the model to Opus, since higher capability will compensate for an underspecified request.",
      "B": "Build the Project with broad default instructions now, and refine the use case later based on the VP's reaction to the first report."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Applying Claude to analyze requirements and use cases starts with clarifying the actual business need — scope, timeframe, and intended decision — so the resulting configuration is built around a well-understood use case rather than a guess.",
      "D": "Incorrect. The interview notes describe deals, not the VP's reporting requirements; asking Claude to infer intent from the wrong source doesn't replace clarifying the request directly with the stakeholder.",
      "A": "Incorrect. Model capability does not substitute for requirements gathering; a more capable model applied to an ambiguous task still produces output aligned to the wrong problem.",
      "B": "Incorrect. Shipping a first pass and iterating off the VP's reaction treats requirements-gathering as optional and risks a wasted cycle of rework that could have been avoided by asking upfront."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.1-21c9a08d"
  },
  {
    "taskStatement": "D3.4",
    "domain": "D3",
    "scenario": "A project manager runs a shared Claude Project that several teammates use to track a multi-team software rollout — status updates, a stakeholder list, and a formatting convention for weekly summaries all come up constantly. She's noticed that she re-explains the same stakeholder list and formatting rule every time she opens a new chat inside the Project, and two colleagues who also work in the same Project have each been typing their own versions of the same corrections into their individual chats.",
    "question": "What is the best way to make this recurring guidance available automatically to her and her teammates in every new conversation started within the Project?",
    "options": {
      "B": "Turn on Claude's Memory feature so it remembers the guidance and applies it automatically for everyone who uses the Project.",
      "D": "Keep all the work in one long-running conversation thread so the guidance never has to be re-explained.",
      "C": "Add the guidance to the Project's custom instructions or knowledge files so it's applied to every new conversation started within the Project.",
      "A": "Ask each teammate to paste the same guidance at the start of their own chats to keep everyone consistent."
    },
    "correct": "C",
    "explanations": {
      "B": "Incorrect. Memory carries context forward for an individual user's own conversations; it doesn't give a shared, consistent baseline to every teammate working in the same Project.",
      "D": "Incorrect. A single ever-growing thread doesn't scale to multiple teammates working separately, and an unbounded conversation is itself a context-management problem rather than a persistence solution.",
      "C": "Correct. Custom instructions and knowledge sources are attached to the Project itself, so they're automatically applied to every new conversation anyone starts within it — the right mechanism for persisting recurring context across sessions and across people.",
      "A": "Incorrect. Manual repetition by each teammate is the exact failure already happening; it depends on everyone remembering to do it the same way and invites drift rather than fixing it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.4-2b78af5a"
  },
  {
    "taskStatement": "D4.1",
    "domain": "D4",
    "scenario": "An Operations Lead is exploring where Claude could help streamline the internal IT support process. She has collected written notes from interviews with five team leads describing recurring complaints about how support tickets get routed and delayed. She wants to use Claude to work through these notes and identify well-defined use cases worth pursuing, rather than guessing at what the real problems are.\n\nShe's deciding how to set Claude up for this analysis before bringing anything back to the wider team for discussion.",
    "question": "What is the most appropriate way for her to use Claude to analyze the requirements and identify candidate use cases?",
    "options": {
      "D": "Have Claude review the interview notes and independently select the single use case to build, then pass that choice straight to IT for implementation.",
      "A": "Turn on research mode and have Claude search external sources on common ticket-routing problems, using that as the basis for the requirements analysis instead of the internal notes.",
      "B": "Ask Claude in a quick chat to infer the department's likely pain points from general industry knowledge, since that saves time typing up the interview notes.",
      "C": "Create a Project, add the interview notes as knowledge sources with instructions to surface recurring pain points and candidate use cases, then review that synthesis with stakeholders before deciding."
    },
    "correct": "C",
    "explanations": {
      "D": "Incorrect. Letting Claude pick and finalize a single use case without human review skips the validation step; Claude can help surface candidate use cases, but selecting and committing to one is a business decision that needs stakeholder input.",
      "A": "Incorrect. External research can supplement analysis, but substituting it for the internal notes means the requirements analysis is no longer grounded in what this specific team actually reported.",
      "B": "Incorrect. Skipping the actual interview notes in favor of Claude's general knowledge discards the one source that reflects this team's real problems, risking a plausible-sounding but ungrounded analysis.",
      "C": "Correct. Applying Claude to analyze requirements means giving it the actual source material as a knowledge source, using instructions to focus the synthesis on recurring themes and candidate use cases, and then validating that output with the people who provided the input before any use case is chosen."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.1-e21ac567"
  },
  {
    "taskStatement": "D4.1",
    "domain": "D4",
    "scenario": "A project manager at a mid-sized software firm is kicking off discovery for a new internal tool. She has a folder of stakeholder interview notes, old feature request emails, and a competitor teardown document, and wants to figure out what the actual requirements are before writing a formal spec. She's used Claude for drafting status updates before but hasn't used it for this kind of open-ended analysis.\n\nShe's considering just pasting one interview transcript into a one-off chat and asking \"what should we build,\" but she also has all the source documents sitting in a shared Drive folder and expects to keep adding new interview notes over the next few weeks as more stakeholders are interviewed.",
    "question": "Given that she'll keep adding new interview notes and source documents over several weeks, what is the most effective way to use Claude to support this requirements analysis?",
    "options": {
      "C": "Ask Claude to research similar tools online and base the requirements primarily on that research rather than the internal interview notes.",
      "A": "Paste the single most detailed interview transcript into a new chat each time and ask Claude to infer the full set of requirements from that transcript alone.",
      "D": "Create a Claude Project, add the existing documents as knowledge sources, and set custom instructions describing the analysis goal, so new notes can be added as they arrive without re-establishing context.",
      "B": "Switch to Haiku for this work, since requirements analysis is a high-volume task best matched to a faster, lower-cost model."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. External research can supplement analysis, but the actual requirements should be grounded in what stakeholders said; substituting web research for the internal interview notes sidelines the primary source of truth.",
      "A": "Incorrect. Working from one transcript in an isolated chat discards the rest of the stakeholder input and competitor material already collected, and loses all continuity as new notes arrive over the following weeks.",
      "D": "Correct. A Project keeps the growing set of interview notes and source documents as shared knowledge and lets custom instructions frame the recurring analysis task, so she isn't re-uploading files or re-explaining context in a fresh chat each time new material comes in.",
      "B": "Incorrect. Requirements analysis from qualitative interview notes is exactly the kind of nuanced synthesis work that benefits from a more capable model; the faster/lower-cost model is suited to straightforward, high-volume tasks, not this one."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.1-b8c3d6da"
  },
  {
    "taskStatement": "D4.2",
    "domain": "D4",
    "scenario": "An Operations Lead is preparing a recommendation to leadership on reducing shipping errors and wants to benchmark the company's fulfillment error rate against current industry standards. The team has never compiled this kind of external benchmarking before, and the deadline is tight, so the Operations Lead wants to use Claude to speed up the research phase without sacrificing accuracy.",
    "question": "Which approach best leverages Claude for this research task?",
    "options": {
      "A": "Create a Project with the company's internal shipping data as a knowledge source and ask Claude to fill in comparable industry figures where public data is unavailable.",
      "C": "Ask Claude in a standard chat to state current industry benchmark figures from what it already knows, since its training gives it broad general knowledge.",
      "D": "Use Claude's research capability to gather current external sources with citations, then review those citations before including any figures in the report.",
      "B": "Have Claude produce the finished leadership report directly from a research-mode query, since research mode already verifies its own citations before presenting them."
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. Asking Claude to invent figures to cover gaps in public data introduces fabricated numbers into what is meant to be an external benchmark, regardless of how the internal knowledge source is configured.",
      "C": "Incorrect. General training knowledge is not current and carries no traceable source, which is exactly the risk for a benchmarking figure headed to leadership.",
      "D": "Correct. Research mode is built for gathering and citing current external information, and reviewing those citations before use is the diligence step that catches an unverified or fabricated figure before it reaches a decision-maker.",
      "B": "Incorrect. Research-mode citations still require human review; treating them as self-verifying and skipping that check risks sending an unverified figure straight to leadership."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.2-2d8a9ccb"
  },
  {
    "taskStatement": "D4.2",
    "domain": "D4",
    "scenario": "A project manager at a logistics company is preparing a recommendation for leadership on which of three inventory-management vendors to adopt. She needs current, sourced information on each vendor's features, pricing tiers, and recent customer feedback, since her own knowledge of the vendors is a year out of date and the market has shifted since then.\n\nShe wants Claude to gather this information from the web, synthesize it across vendors, and show where each claim came from so she can verify anything surprising before it goes into her recommendation.",
    "question": "Which Claude capability best fits this task?",
    "options": {
      "C": "Code Execution, so Claude can write a script that pulls live pricing data directly from each vendor's website.",
      "B": "A Project with custom instructions telling Claude to estimate typical pricing and features for vendors in this category.",
      "A": "Research mode, which searches the web across multiple sources and synthesizes findings with citations she can check.",
      "D": "A standard chat conversation, since Claude's training data likely already covers these vendors in enough depth."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. Code Execution runs code in a sandboxed environment for tasks like data analysis; it is not a tool for retrieving live information from external websites, and treating it as a substitute for research misunderstands its purpose.",
      "B": "Incorrect. Instructing Claude to estimate rather than retrieve real data produces plausible-sounding but unverified figures, which is worse than outdated information for a decision going to leadership.",
      "A": "Correct. Research mode is built for exactly this: it searches current sources across the web, synthesizes findings across the three vendors, and surfaces citations, letting her verify any surprising claim before using it in a recommendation.",
      "D": "Incorrect. Standard chat relies on training data that may be outdated or incomplete for current pricing and reviews, and it does not provide the sourced trail she needs to verify claims before they reach leadership."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.2-689c2a56"
  },
  {
    "taskStatement": "D4.3",
    "domain": "D4",
    "scenario": "An Operations Lead is redesigning the intake process for facilities requests. She has a rough idea — a shorter form, an automatic triage step, and a weekly summary for the facilities manager — but hasn't worked out how the pieces fit together or what could go wrong. She opens a chat with Claude, describes the current process and the pain points, and wants to use the conversation to think through the design before writing anything up for her manager.\n\nShe's mainly used Claude for drafting emails and summarizing meeting notes, and isn't sure how to get value out of it for something more open-ended like this.",
    "question": "Which approach best uses Claude to support this design work?",
    "options": {
      "C": "Have Claude generate the final written proposal in one pass and send it to her manager unchanged, since revising it afterward would waste the first output.",
      "B": "Hold off on using Claude until she has worked out the design on her own, then bring it in only to polish the grammar of the final write-up.",
      "D": "Treat the chat as an iterative dialogue: share the current process and pain points, ask Claude to propose options and surface risks or edge cases, then refine the design across turns before finalizing it herself.",
      "A": "Send a single broad prompt like \"redesign our intake process\" and adopt whatever structure it returns, since adding specifics would just constrain a more creative answer."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. Sending an unreviewed first draft to her manager skips the iteration and verification that turns a rough idea into a design she can stand behind; the point of iterating is to catch gaps before the proposal goes out, not after.",
      "B": "Incorrect. This discards Claude's usefulness for the actual design work — generating options, stress-testing the plan, surfacing edge cases — and reserves it only for a task, proofreading, that doesn't touch the design problem at all.",
      "D": "Correct. Design and iteration work well as a dialogue: giving Claude the current-state context, asking it to generate options and flag risks or edge cases, and refining the design across turns lets her use Claude as a thinking partner while she keeps ownership of the final decision.",
      "A": "Incorrect. A vague one-shot prompt skips the back-and-forth that surfaces the pain points and constraints specific to her process, producing a generic design she has no basis to evaluate."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.3-f78a7793"
  },
  {
    "taskStatement": "D4.4",
    "domain": "D4",
    "scenario": "An Operations Lead currently runs a weekly capacity-planning process by hand: pulling numbers from three spreadsheets, writing a summary email, and manually flagging any team that's over-allocated. The process takes about two hours every Monday and rarely changes in structure. The Operations Lead wants Claude to take over as much of this as reasonably possible, but is unsure how to move it from \"something I do in chat each week\" to something that reliably repeats the same way every Monday.",
    "question": "What is the best way to redesign this workflow around Claude?",
    "options": {
      "B": "Ask Claude once to memorize the spreadsheet layout and summary format, and rely on Memory alone to carry the process forward.",
      "C": "Have Claude generate the summary email at the highest capability model tier and send it straight to the team leads without review.",
      "A": "Set up a Claude Project with custom instructions describing the weekly steps, and add the spreadsheets as knowledge sources so the same process runs consistently each week.",
      "D": "Keep using ad hoc chat each week, but retype a slightly different set of instructions depending on how busy the week has been."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. Memory is not a substitute for explicitly defining the process; relying on it alone to carry forward a multi-step, sourced workflow risks inconsistent or incomplete recall compared to instructions plus knowledge sources set once in a Project.",
      "C": "Incorrect. Model tier does not address the workflow-integration problem, and sending an output that flags who is over-allocated straight to team leads without review skips the diligence step a recurring business report needs.",
      "A": "Correct. Redesigning a recurring, structurally stable workflow around Claude means capturing the repeatable steps as custom instructions and giving Claude the relevant files as durable knowledge sources, so the same process applies consistently each week instead of being reconstructed from scratch in chat.",
      "D": "Incorrect. Retyping instructions from scratch each week is the inconsistency the redesign should remove, and it discards the reusable structure a Project provides."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.4-9f816cd1"
  },
  {
    "taskStatement": "D4.3",
    "domain": "D4",
    "scenario": "A marketing manager is using a Claude Project — loaded with brand voice guidelines and past campaign performance notes — to design copy for a new product launch landing page. Claude produces a first draft of the headline, body copy, and call-to-action, which the manager circulates to two stakeholders for feedback.",
    "question": "The stakeholders respond that the tone reads too formal and the call-to-action feels weak. What is the most effective way to incorporate this feedback into the next draft?",
    "options": {
      "B": "In the same conversation, tell Claude the specific feedback on tone and the call-to-action, and ask it to revise the existing draft accordingly.",
      "A": "Manually rewrite the headline and call-to-action, and only use Claude for the body copy the stakeholders did not comment on.",
      "C": "Start a brand-new chat outside the Project so Claude approaches the copy without any bias from the earlier draft.",
      "D": "Ask Claude to produce five entirely different concepts and pick whichever one seems closest to what stakeholders might want."
    },
    "correct": "B",
    "explanations": {
      "B": "Correct. Supporting iteration means feeding specific, actionable feedback about what didn't work back into the same draft and asking for a targeted revision — this is how solution design improves round over round.",
      "A": "Incorrect. This underuses Claude for exactly the parts that need revision, turning an iterative design task into disconnected manual edits instead of a guided revision.",
      "C": "Incorrect. Leaving the conversation discards the working draft and context Claude has already built up; effective iteration builds on the existing draft rather than restarting from zero each round.",
      "D": "Incorrect. Generating unrelated new concepts ignores the concrete feedback given and does not converge on a fix for the tone and CTA issues that were actually flagged."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.3-cec725fb"
  },
  {
    "taskStatement": "D4.3",
    "domain": "D4",
    "scenario": "A project manager at a logistics company is redesigning the vendor-onboarding process. She's collecting feedback from three stakeholders over several weekly meetings and wants to use Claude to draft the process document, revise it after each round of feedback, and keep everyone working from the same evolving version rather than losing track of which changes came from where.",
    "question": "Which approach best supports this iterative design work?",
    "options": {
      "D": "Start a brand-new chat each week and paste the full document plus the latest feedback into it, so each conversation is self-contained.",
      "C": "Rely on Claude's Memory feature alone to carry the document and context forward across separate ad hoc chats, without setting up a Project.",
      "A": "Have each stakeholder run their own separate chat with Claude to add comments, then manually merge the three versions into a final document.",
      "B": "Set up a Claude Project with the relevant background materials (org policies, prior vendor docs) as knowledge sources, and iterate on the process document as an Artifact so each week's revisions build on the same draft."
    },
    "correct": "B",
    "explanations": {
      "D": "Incorrect. Pasting the whole document into a fresh chat every week works around the lack of persistent context but discards the benefit of an evolving, trackable draft and invites copy-paste errors as the document grows.",
      "C": "Incorrect. Memory is not a substitute for a Project's structured knowledge sources; it is not designed to reliably anchor a specific evolving deliverable and its supporting reference documents across unrelated ad hoc chats.",
      "A": "Incorrect. Splitting the work into independent, unconnected chats per stakeholder fragments the iteration and shifts the integration work back onto the PM manually, defeating the purpose of using Claude to support the design process.",
      "B": "Correct. A Project's knowledge sources keep the relevant background material consistently available, and iterating on the document as an Artifact lets each week's edits refine the same evolving draft rather than starting over or fragmenting across chats."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.3-be017849"
  },
  {
    "taskStatement": "D4.5",
    "domain": "D4",
    "scenario": "A marketing manager has been using Claude to draft campaign briefs and summarize customer survey data for her team. Her VP, who has never used Claude, asks her to present a five-minute overview at the next leadership meeting on whether the team should expand its use of Claude to draft messaging for a sensitive product recall notice.",
    "question": "Which framing should the marketing manager use in her presentation to the VP?",
    "options": {
      "D": "Claude's drafts can be trusted without review whenever the tool reports high confidence in its output.",
      "C": "Claude should be avoided entirely for the recall notice, since any AI-assisted drafting on a sensitive topic carries too much reputational risk.",
      "A": "Claude can fully replace the legal and communications review process for the recall notice, since it drafts fluent, professional-sounding copy.",
      "B": "Claude is a strong drafting aid that can accelerate the recall notice, but outputs still need human review for accuracy and tone, especially for sensitive, high-stakes communications."
    },
    "correct": "B",
    "explanations": {
      "D": "Incorrect. Claude's self-reported confidence is not a reliable indicator of accuracy, so treating it as a trust signal misrepresents the tool's actual limitations to the VP.",
      "C": "Incorrect. Blanket avoidance discards real drafting value the tool can provide; the accurate message is conditional use with review, not exclusion.",
      "A": "Incorrect. Fluent output is not the same as verified accuracy or appropriateness; presenting Claude as a full replacement for legal/comms review overstates its capabilities for a sensitive, high-stakes document.",
      "B": "Correct. Communicating Claude's value and limitations means being clear that it speeds up drafting but does not eliminate the need for human judgment and review, particularly for sensitive stakeholder-facing content like a recall notice."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.5-899e877f"
  },
  {
    "taskStatement": "D4.5",
    "domain": "D4",
    "scenario": "An Operations Lead has piloted Claude for a month, using it to draft vendor contract summaries and triage incoming support tickets. Leadership has asked for a short briefing on whether to expand the pilot to two more teams, and several directors will use the briefing to decide how much oversight the rollout needs.",
    "question": "What should the Operations Lead include in the briefing?",
    "options": {
      "A": "A statement that Claude has performed flawlessly during the pilot, so the expanded rollout can run without any review step.",
      "D": "A general assurance that the AI is working well, leaving out specifics so directors aren't distracted by edge cases before the vote.",
      "B": "A description of where Claude sped up drafting and triage, paired with the specific outputs that still need human review before they're acted on.",
      "C": "A recommendation to pause expansion, since any tool that can produce an incorrect summary is too risky to use on vendor contracts."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Claiming flawless performance overstates Claude's reliability; fluent output is not proof of accuracy, and recommending zero review sets the expanded teams up to act on unverified errors.",
      "D": "Incorrect. Omitting specifics to keep the message reassuring denies stakeholders the information they need to set appropriate oversight, which is the core purpose of this kind of briefing.",
      "B": "Correct. Communicating Claude's value and limitations means naming concretely where it helped (faster drafts, faster triage) and where human judgment is still required (which outputs need verification before use), giving directors an accurate basis for deciding how much oversight to build in.",
      "C": "Incorrect. This overcorrects on the limitation and ignores the demonstrated value; the pilot showed real speed gains that a paired review step can capture safely, so recommending a full halt discards a workable path."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.5-5a95d28e"
  },
  {
    "taskStatement": "D5.4",
    "domain": "D5",
    "scenario": "An HR generalist set up a Claude Project to help draft answers to employee questions about benefits, and attached the company's benefits handbook PDF as a knowledge source. Mid-year, the insurance carrier issued an update that changed the deductible amounts, but the Project still has the original handbook PDF attached. Employees have started asking about the new deductible in chats within the Project, and Claude keeps citing the old figures from the outdated document.",
    "question": "What should the HR generalist do so the Project reliably gives employees the correct, current deductible amounts?",
    "options": {
      "A": "Start new chats outside the Project so Claude relies on its general training knowledge instead of the handbook.",
      "C": "Replace the outdated handbook PDF in the Project's knowledge sources with a version reflecting the updated deductibles.",
      "D": "Add a custom instruction telling Claude to assume the deductibles have changed and to adjust its answers accordingly.",
      "B": "Ask employees to state the new deductible amounts in their questions so Claude can use them in its reply."
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. Leaving the Project removes the knowledge source entirely, and Claude's general training data has no visibility into this employer's specific, company-created benefits handbook or its updates.",
      "C": "Correct. Knowledge sources are the mechanism for grounding Project answers in current, authoritative documents; updating the attached file with the revised handbook is what makes Claude's answers reflect the new deductibles.",
      "D": "Incorrect. Custom instructions shape tone and behavior, not facts; telling Claude to \"assume\" a change doesn't supply the actual new figures, so it cannot reliably produce the correct deductible amounts.",
      "B": "Incorrect. Requiring each employee to already know and supply the new figures defeats the purpose of the Project, which should be the source of that information, not merely repeat back what the employee provides."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.4-e5828de5"
  },
  {
    "taskStatement": "D5.1",
    "domain": "D5",
    "scenario": "A marketing manager is setting up a Claude Project so her team can draft campaign briefs that consistently reflect the company's current product positioning. The positioning guidance lives in a 15-page messaging document that marketing updates every quarter, and she wants every teammate's draft to pull from whatever version is current rather than whatever someone happens to remember or paste in.",
    "question": "How should she configure the Project to best achieve this?",
    "options": {
      "D": "Upload the messaging document as a Project knowledge source, and keep the custom instructions short, focused on tone and directing Claude to draw on the uploaded document.",
      "A": "Paste the entire 15-page messaging document into the Project's custom instructions field so it is always in force.",
      "C": "Skip the Project setup and have each teammate paste the messaging document into the first message of their own chats.",
      "B": "Split the messaging document roughly in half, putting part of it in custom instructions and the rest in a knowledge source, for redundancy."
    },
    "correct": "D",
    "explanations": {
      "D": "Correct. Knowledge sources are designed to hold reference documents that Claude can draw on, while custom instructions are best kept concise and focused on behavior and style; this pairing lets the whole team work from one current, centrally updated document.",
      "A": "Incorrect. Custom instructions are meant to hold concise behavioral guidance that applies to every message; loading a long reference document into that field misuses it and makes updates harder to manage as the document changes.",
      "C": "Incorrect. This abandons the Project setup entirely, recreating the exact inconsistency problem she is trying to solve, since each teammate would rely on their own copy-paste habits rather than a shared, current source.",
      "B": "Incorrect. Arbitrarily dividing one document across two different mechanisms does not match their intended purposes and makes the document harder to update as a whole when it changes quarterly."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.1-03725565"
  },
  {
    "taskStatement": "D5.3",
    "domain": "D5",
    "scenario": "An Operations Lead is setting up a Claude Project that the fulfillment team will use every day to draft responses to shipping-delay inquiries. Her first attempt at the Project's custom instructions simply says: \"Be helpful and professional when answering questions about shipping delays.\" After a week of use, team members report that Claude's responses vary widely — some offer refunds, some don't mention the delay-credit policy at all, and some use a casual tone that doesn't match company style.\n\nShe wants to rewrite the custom instructions so the Project behaves consistently no matter who on the team is using it.",
    "question": "Which revision to the Project's custom instructions would most directly address the inconsistency the team is seeing?",
    "options": {
      "C": "Leave the instructions as they are, and instead ask each team member to add \"please follow the delay-credit policy\" to their own chat messages.",
      "B": "Add a line telling Claude to always double-check its own answers for policy accuracy before responding.",
      "D": "Keep the instructions general so Claude can use its own judgment on tone and policy across the range of inquiries the team handles.",
      "A": "Replace the vague wording with specific, concrete directions: the exact tone to use, when the delay-credit policy applies, and what to always include or avoid in a response."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. Pushing the fix into individual chat messages abandons the Project-level instruction that is supposed to apply consistently to everyone, so behavior stays user-dependent rather than becoming uniform.",
      "B": "Incorrect. A self-check instruction does not supply the missing tone and policy criteria; without concrete rules to check against, Claude has nothing consistent to verify its answer against.",
      "D": "Incorrect. Generality is what produced the inconsistency in the first place; leaving tone and policy calls to Claude's judgment means different conversations will resolve them differently.",
      "A": "Correct. Effective system-level instructions are specific and unambiguous rather than general — spelling out tone, the conditions under which a policy applies, and required or prohibited content gives Claude concrete criteria to apply the same way across every conversation, which directly removes the variation the team observed."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.3-8b9b6431"
  },
  {
    "taskStatement": "D5.4",
    "domain": "D5",
    "scenario": "A project manager runs a shared Claude Project that the whole delivery team uses to ask questions about vendor escalation procedures. The Project's knowledge sources include a PDF of the current Vendor Escalation Guide, and the custom instructions tell Claude to answer escalation questions using that document. Legal just revised the guide, changing the primary escalation contact.",
    "question": "To make sure every teammate who asks the Project about escalations gets the corrected contact, what should the project manager do?",
    "options": {
      "C": "Turn on Memory for her own account so Claude remembers the new contact information the next time she opens the Project.",
      "B": "Add a line to the custom instructions noting the new contact, but leave the outdated PDF in the knowledge sources, since instructions take priority over uploaded documents.",
      "A": "Replace the outdated PDF in the Project's knowledge sources with the revised Vendor Escalation Guide, so every conversation in the Project draws on the current version.",
      "D": "Mention the new escalation contact once in her own chat with the Project, since Claude carries that correction forward into teammates' future conversations automatically."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. Memory carries context forward within a project — it is not a way to publish a corrected fact to colleagues. The authoritative place for a detail every teammate must get right is the Project's knowledge sources, not memory.",
      "B": "Incorrect. Instructions do not reliably override a stale reference document, and leaving the outdated PDF in place risks Claude citing conflicting or superseded details from it.",
      "A": "Correct. Maintaining and updating a Project's knowledge sources means replacing outdated files with current ones so the corrected information is available consistently across every conversation any teammate has in that Project.",
      "D": "Incorrect. Individual chat threads do not share context with each other; a correction stated in one conversation has no effect on separate conversations teammates start within the same Project."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.4-2c44235e"
  },
  {
    "taskStatement": "D6.1",
    "domain": "D6",
    "scenario": "A marketing manager is setting up a Claude Project for the team's quarterly campaign planning. She has added the brand style guide and past campaign briefs as project knowledge, and now wants to use the same Project to have Claude review draft ad copy against the company's regulated-industry compliance rules before the copy goes to legal for final sign-off.",
    "question": "Is this an appropriate use of Claude in this workflow?",
    "options": {
      "D": "Inappropriate — Claude should never be used to touch anything related to regulatory compliance in any capacity.",
      "C": "Inappropriate — Project knowledge sources can only hold brand style guides, so compliance rules cannot be added at all.",
      "A": "Appropriate — Claude can do a preliminary compliance check against the guidance in the Project's knowledge, but legal review should still remain the final gate before publication.",
      "B": "Appropriate — once Claude reviews the copy against the compliance rules, the legal sign-off step can be skipped to save time."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. This overstates the restriction; Claude can appropriately assist with a preliminary review as long as final regulatory sign-off stays with qualified humans — it is not categorically off-limits.",
      "C": "Incorrect. Project knowledge sources are not restricted to a single document type; the manager can add whatever reference material, including compliance guidance, is relevant to the Project's purpose.",
      "A": "Correct. Using Claude and Project knowledge to draft and pre-screen copy is an appropriate productivity use, as long as a qualified human (legal) still performs the authoritative compliance sign-off — Claude assists judgment, it doesn't replace the accountable reviewer.",
      "B": "Incorrect. Skipping the human legal gate turns an assistive check into the final compliance decision, which is an inappropriate reliance on a probabilistic output for a regulated determination."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.1-597b78be"
  },
  {
    "taskStatement": "D6.1",
    "domain": "D6",
    "scenario": "A project manager is preparing for a quarterly leadership review of a software rollout. She has set up a Claude Project with the project charter and status reports as knowledge sources, and uses it to draft the quarterly update summarizing progress, risks, and budget variance before reviewing and sending it herself. Encouraged by how well this went, she starts wondering whether Claude could also take on a harder decision: one vendor on the project has been underperforming, and the contract renewal is due this week. She considers having Claude review the vendor's performance data and issue the final call on whether to terminate the $2 million contract, without any further sign-off from her or the finance team.",
    "question": "Which of the following is the most appropriate use of Claude in this situation?",
    "options": {
      "A": "Instructing Claude to notify the vendor directly that the contract is terminated, so the decision takes effect immediately without further review.",
      "C": "Having Claude independently finalize the vendor termination decision, since it can analyze the performance data more thoroughly than she can.",
      "D": "Using Claude to draft the quarterly status update from the Project's knowledge sources, then reviewing it herself before it is sent to leadership.",
      "B": "Asking Claude to decide on the contract renewal and skipping finance's sign-off, since the status update draft it produced was accurate."
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. Letting Claude take a consequential external action on the organization's behalf, with no human review of the outcome, compounds the risk of an unreviewed decision by also removing oversight of its execution.",
      "C": "Incorrect. A binding, high-stakes financial and contractual decision carries real business consequences and requires accountable human judgment; delegating the final call to Claude, even after a thorough analysis, is an inappropriate use.",
      "D": "Correct. Drafting a summary from designated knowledge sources, with the human reviewing and taking ownership before distribution, is exactly the kind of productivity use case Claude is appropriate for.",
      "B": "Incorrect. Claude performing well on a lower-stakes drafting task does not establish that it is appropriate to hand it an unrelated, higher-stakes decision or to bypass a required approval step like finance sign-off."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.1-85147105"
  },
  {
    "taskStatement": "D6.1",
    "domain": "D6",
    "scenario": "An Operations Lead is managing a round of staffing reductions across three regional warehouses. To save time, she sets up a Claude Project with the latest performance reviews and attendance records as knowledge sources, then asks Claude to rank employees and generate a finalized list of who should be let go, planning to forward that list directly to HR for processing without further review.\n\nShe's pleased that Claude returns a confident, well-organized ranking with justifications for each name, and is ready to send it on as the final decision.",
    "question": "Is this an appropriate use of Claude?",
    "options": {
      "C": "Yes, as long as she switches to the most capable model tier first, since higher capability offsets the risk of treating the output as final.",
      "A": "Yes, because the Project's custom instructions and knowledge sources make the ranking reliable enough to act on directly.",
      "D": "No — Claude can appropriately help analyze the records and draft a recommendation, but a human must review and finalize any termination decision before it goes to HR.",
      "B": "No — Claude should not be used anywhere in this workflow, since analyzing personnel records is entirely outside appropriate use."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. Model capability affects reasoning quality, not accountability; a more capable model does not make it appropriate to skip human review of a high-stakes personnel decision.",
      "A": "Incorrect. A well-organized, confident output is not evidence of a sound basis for a high-stakes, consequential decision about people's employment; Project configuration does not remove the need for human judgment.",
      "D": "Correct. Claude is well suited to drafting analysis and a recommendation, but consequential decisions affecting people's livelihoods require human review and accountability before being acted on — Claude's role should stay assistive, not final decision-maker.",
      "B": "Incorrect. Using Claude to help summarize and analyze records is a reasonable productivity use; the problem is treating its unreviewed output as the final decision, not the analysis itself."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.1-8eb48200"
  },
  {
    "taskStatement": "D6.2",
    "domain": "D6",
    "scenario": "A marketing manager is building a Claude Project to help draft quarterly campaign performance summaries. She wants to add a knowledge source containing last quarter's email campaign results, which include subscriber email addresses and each subscriber's individual purchase history. The Project will be shared with two teammates who help write campaign copy, and company policy restricts sharing regulated personal data outside the systems approved to hold it.",
    "question": "What is the most appropriate way to handle this knowledge source?",
    "options": {
      "B": "Upload the file, but add a custom instruction telling Claude not to repeat any email addresses or purchase details in its responses.",
      "C": "Restrict the Project's sharing so only the manager can access it, then upload the file as-is.",
      "D": "Upload the file as-is, since it is only used inside a Project rather than shared in the open chat interface.",
      "A": "Aggregate or de-identify the subscriber-level data before adding it as a knowledge source, so teammates can still get campaign insights without exposing regulated personal data."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. A custom instruction shapes Claude's responses but does not remove the sensitive data itself; the personal identifiers remain in the knowledge source and the underlying exposure has already occurred.",
      "C": "Incorrect. Limiting sharing to one person does not address the policy violation of placing regulated personal data into the Project's knowledge source in the first place.",
      "D": "Incorrect. A Project's knowledge sources are still a data-sharing surface; using it internally rather than in open chat does not exempt regulated personal data from a policy restricting where such data may be shared.",
      "A": "Correct. Applying data-sensitivity and privacy safeguards means removing or anonymizing regulated personal identifiers before the data is used, letting the campaign analysis proceed without exposing protected subscriber data."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.2-f1ed4961"
  },
  {
    "taskStatement": "D6.2",
    "domain": "D6",
    "scenario": "An HR business partner is setting up a Claude Project to help draft responses to employee questions about benefits enrollment. To make the answers specific, she wants to add a knowledge source containing last year's anonymized FAQ log, but she also has a spreadsheet of individual employee medical accommodation requests that includes diagnosis notes. She considers uploading that spreadsheet too, reasoning it would help Claude write more personalized draft replies to specific employees.",
    "question": "What is the most appropriate way for her to proceed?",
    "options": {
      "C": "Add both files as knowledge sources, since everything in the Project stays internal to HR and is never shared externally.",
      "B": "Add the medical accommodation spreadsheet only, since it is more specific than the FAQ log, and skip the anonymized FAQ log as unnecessary.",
      "A": "Add both files, but include a custom instruction telling Claude not to repeat the diagnosis details back in its replies.",
      "D": "Add the anonymized FAQ log as a knowledge source, but keep the medical accommodation spreadsheet out of the Project since it contains sensitive health data protected under privacy regulations."
    },
    "correct": "D",
    "explanations": {
      "C": "Incorrect. Staying internal to HR is not a privacy safeguard; regulated health data still requires protections such as minimization or de-identification regardless of who can view the Project, and internal-only access does not satisfy those requirements.",
      "B": "Incorrect. This uploads the more sensitive file while omitting the safe one, the opposite of applying sensitivity safeguards, and specificity does not outweigh the requirement to protect regulated health data.",
      "A": "Incorrect. A custom instruction is a request to the model's behavior, not a data control; the sensitive health data has already been uploaded and exposed to the Project once added as a knowledge source.",
      "D": "Correct. The anonymized FAQ log carries no regulated identifiers, so it is appropriate to use. The accommodation spreadsheet contains individually identifiable health information subject to privacy regulation, and applying sensitivity safeguards means keeping regulated personal data out of the Project rather than uploading it for convenience."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.2-5dc80d73"
  },
  {
    "taskStatement": "D6.3",
    "domain": "D6",
    "scenario": "A marketing manager at a mid-size company has started using Claude Projects to draft campaign briefs and summarize customer research. Her company's internal AI governance policy requires that all AI-assisted content used in external-facing materials be labeled as AI-assisted and reviewed by a human before publication, and it restricts uploading customer contact data to any AI tool without prior approval from the data privacy team.\n\nShe wants to speed up her workflow by uploading a customer feedback spreadsheet (which includes names and email addresses) into a Project's knowledge source so Claude can help her write a campaign email, and she plans to send the AI-drafted email directly to the distribution list once Claude produces a version she likes.",
    "question": "Which course of action best follows her organization's AI governance policy as described?",
    "options": {
      "B": "Ask Claude to confirm it will not retain the customer data, then upload the file and send the finished draft without further review.",
      "D": "Remove or mask the customer names and email addresses before uploading the spreadsheet, and have a human review and label the draft as AI-assisted before it goes out.",
      "C": "Skip using Claude for this task entirely and write the campaign email manually to avoid any policy risk.",
      "A": "Upload the spreadsheet as-is since it stays within a single Project's private knowledge source, then send the draft once Claude's output looks polished and ready."
    },
    "correct": "D",
    "explanations": {
      "B": "Incorrect. A verbal assurance from Claude is not a substitute for the organization's approval process or its review requirement; the policy requires privacy-team approval for the data and human review before publication, neither of which occurred.",
      "D": "Correct. This satisfies both stated policy requirements: anonymizing the contact data avoids sharing regulated customer data without privacy-team approval, and the human review plus AI-assisted labeling step meets the publication requirement for external-facing content.",
      "C": "Incorrect. Avoiding the tool entirely is unnecessary and overcautious; anonymizing the data and applying the required review lets the task proceed within policy.",
      "A": "Incorrect. A Project's knowledge source is still an AI tool the data was uploaded to; keeping it 'private' to the Project does not satisfy a policy requiring privacy-team approval before sharing customer contact data. Sending on the basis of the output looking polished also skips the mandatory human review and labeling step."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.3-ef2383ef"
  },
  {
    "taskStatement": "D6.3",
    "domain": "D6",
    "scenario": "An Operations Lead at a logistics company already runs a Claude Project that drafts internal shipment reports, and IT has approved a Gmail connector for that project. The Operations Lead now wants to extend the same Project so Claude automatically sends confirmation emails to vendors, with no one reading each message before it goes out. The company's AI governance policy states that any new use case involving automated, external-facing communication requires review and sign-off from the AI governance committee before it is deployed, even when the underlying connector is already approved for other purposes.",
    "question": "What should the Operations Lead do before turning on automatic vendor email replies?",
    "options": {
      "C": "Skip automatic sending and instead have Claude draft the vendor emails for a teammate to send manually, without notifying the governance committee.",
      "D": "Enable automatic sending, but ask Claude to review its own drafts for accuracy before they go out.",
      "A": "Proceed immediately, since the Gmail connector was already approved for other internal uses.",
      "B": "Submit the new use case to the AI governance committee for review and approval before enabling automatic sending."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Routing drafts through a human sender reduces some risk, but it is a workaround the Operations Lead adopted unilaterally; it does not fulfill the policy's requirement to bring the new use case to the governance committee.",
      "D": "Incorrect. Having Claude self-check its own output is not a governance control and does not satisfy the requirement for committee review of a new use case.",
      "A": "Incorrect. Approval of a connector for one use case does not carry over to a new use case; automated external communication is a distinct scenario the policy singles out for separate review.",
      "B": "Correct. The organization's governance standard requires committee review and approval before deploying a new use case involving automated external-facing communication, regardless of what has already been approved for the underlying tool."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.3-c0ccb003"
  },
  {
    "taskStatement": "D6.3",
    "domain": "D6",
    "scenario": "A project manager at a mid-size logistics company uses Claude daily to draft status updates and summarize vendor contracts. Her company's published AI usage policy requires that any AI-generated content shared externally with clients or vendors first receive human review, and it separately prohibits pasting vendor pricing terms into any AI tool not on the company's approved-vendor list (Claude is on that list).\n\nShe wants Claude to draft a renewal email to a shipping vendor that references the vendor's current contract rates. She's confident Claude captured the numbers correctly and is ready to send the draft straight to the vendor without any further check.",
    "question": "Which action best follows the organization's AI policy in this situation?",
    "options": {
      "B": "Send the draft after asking Claude to confirm that it double-checked the rate figures against the contract.",
      "C": "Send the Claude-generated draft directly to the vendor, since the review requirement applies only to internal communications.",
      "D": "Skip Claude for this task and write the email manually, since a policy requiring review is too burdensome to apply to routine vendor emails.",
      "A": "Have Claude draft the email, then have a human review the draft and verify the rate figures before it is sent to the vendor."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. A self-attestation from Claude is not a substitute for human review; the model's own claim of having checked the figures is not verification and does not satisfy the policy.",
      "C": "Incorrect. The human-review requirement is specifically triggered by external sharing, which is exactly what this vendor email is — sending it unreviewed violates the policy rather than falling outside its scope.",
      "D": "Incorrect. Abandoning the tool is unnecessary and not what the policy asks; Claude may still be used for the draft as long as the required human review step happens before sending.",
      "A": "Correct. The policy requires human review of AI-generated content before it goes to an external party. Following it means treating Claude's draft as a starting point, then having a person verify the figures and review the content before it is sent."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.3-65279a95"
  },
  {
    "taskStatement": "D6.4",
    "domain": "D6",
    "scenario": "A marketing manager is using Claude to draft a series of customer testimonial blurbs for a new product launch. To speed things up, she asks Claude to \"write realistic customer quotes praising the product's reliability and ease of use, in the voice of a small business owner,\" planning to attribute the quotes to fictional customer names on the landing page.\n\nClaude produces several polished, specific-sounding quotes, but nothing in the request or the output indicates any of them come from an actual customer.",
    "question": "What is the most appropriate action for the marketing manager to take?",
    "options": {
      "D": "Publish the quotes but add a small disclaimer elsewhere on the site noting that some content was AI-assisted.",
      "A": "Do not present the fabricated quotes as real customer testimonials; use Claude instead to draft general product copy or to help organize outreach for authentic customer feedback.",
      "C": "Ask Claude to rephrase the quotes so they sound less polished and more authentic before publishing them as testimonials.",
      "B": "Publish the quotes as-is, since Claude generated the wording and is therefore responsible for its accuracy."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. A general, unrelated AI-assistance disclaimer does not resolve the core issue: readers seeing named 'customer' quotes will still believe specific real people said them, which remains deceptive.",
      "A": "Correct. Presenting AI-generated fictional quotes as real customer testimonials misrepresents synthetic content as authentic to the audience, regardless of writing quality. Responsible use means not passing off fabricated statements as real customer voices, and instead directing the tool toward legitimate tasks like general copy or organizing real feedback collection.",
      "C": "Incorrect. Adjusting tone or polish addresses style, not the underlying problem that the quotes are fabricated and attributed to customers who do not exist.",
      "B": "Incorrect. Claude generating the wording does not shift accountability for a deceptive practice; the person who publishes fabricated quotes as genuine customer statements is responsible for that misrepresentation."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.4-88a2be6e"
  },
  {
    "taskStatement": "D6.4",
    "domain": "D6",
    "scenario": "An Operations Lead is preparing quarterly performance ratings that will determine bonus allocations for a 40-person team. To save time, they upload anonymized productivity metrics to a Claude Project and ask it to draft a suggested rating for each employee along with a short justification. The drafts read as polished, confident assessments, and the Operations Lead is tempted to forward them straight to HR as the final ratings.\n\nBefore finalizing anything, the Operations Lead pauses to think through how this use of Claude should be handled, since the output will materially affect people's compensation and careers.",
    "question": "What is the most ethically appropriate way for the Operations Lead to use Claude's drafted ratings?",
    "options": {
      "B": "Forward the drafts to HR as the official ratings, since a capable model's confident justification is a reliable basis for compensation decisions.",
      "D": "Ask Claude to rewrite the justifications so they read as entirely human-authored, then submit them under the Operations Lead's own name.",
      "A": "Treat the drafts as a starting point: have a human review each rating against fuller context and make the final call, so accountability stays with a person.",
      "C": "Present the ratings to employees as management's assessment without mentioning Claude drafted them, since disclosing the AI's role would only invite pushback."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. Fluent, confident output is not evidence of sound judgment; letting a model's draft stand as the final decision on compensation removes human accountability for an outcome that materially affects people's livelihoods.",
      "D": "Incorrect. Disguising AI-generated content as fully human-authored work is a form of misrepresentation, compounding the accountability problem rather than solving it.",
      "A": "Correct. Understanding the ethical implications of AI usage means recognizing that consequential, people-affecting decisions require human review and accountability. Claude's draft can inform the process, but a person must weigh fuller context and own the final rating.",
      "C": "Incorrect. Concealing that AI contributed to an assessment that affects someone's compensation is a transparency failure, not a way to avoid conflict; employees and the organization have a legitimate interest in knowing how the decision was produced."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.4-cebfa65a"
  },
  {
    "taskStatement": "D6.4",
    "domain": "D6",
    "scenario": "A project manager is preparing a performance review for a team member whose delivery has slipped on two consecutive projects. The PM asks Claude to help organize scattered notes from stand-ups, retrospectives, and status emails into a clear written narrative of the team member's performance over the quarter, and also asks Claude whether the team member should be placed on a formal performance improvement plan.",
    "question": "What is the most appropriate way for the PM to use Claude in this situation?",
    "options": {
      "C": "Use Claude to help organize the scattered notes into a clear draft narrative, but keep the judgment call about the improvement plan and final wording with the PM.",
      "D": "Let Claude decide whether to issue the performance improvement plan, since an AI's assessment is less likely to be influenced by personal bias than the PM's own.",
      "B": "Avoid using Claude for any part of the task, since any AI involvement in an employee's performance review is inherently unethical.",
      "A": "Accept whichever recommendation Claude gives without review, since reviewing it afterward would reintroduce the bias Claude was meant to remove."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Using Claude to assist with drafting and organizing while the PM retains responsibility for the substantive judgment reflects the expected balance between AI assistance and human accountability for decisions with real consequences for someone's career.",
      "D": "Incorrect. Decisions that materially affect a person's employment require human accountability and judgment; treating Claude's output as the decision itself offloads a consequential call the PM must own.",
      "B": "Incorrect. Responsible AI use is about appropriate scope and oversight, not blanket avoidance; using Claude to organize notes into a draft is a reasonable productivity use as long as the PM retains the judgment and final decision.",
      "A": "Incorrect. Skipping review does not remove bias, it removes the PM's oversight of a consequential recommendation, and a fluent AI-generated answer is not evidence that it is fair or accurate."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D6.4-a47904b8"
  },
  {
    "taskStatement": "D7.1",
    "domain": "D7",
    "scenario": "An Operations Lead set up a Claude Project to draft weekly vendor status reports, with custom instructions and a knowledge base of vendor contracts and SLA documents. Lately the drafts have been generic — they restate boilerplate language instead of referencing the specific SLA terms and deadlines that matter for each vendor, forcing the Ops Lead to rewrite most of the report by hand each week.\n\nBefore giving up on using the Project for this task, the Ops Lead wants to figure out why the outputs are underperforming and fix the root cause.",
    "question": "What is the most appropriate first step to diagnose and resolve the poor output quality?",
    "options": {
      "D": "Review the custom instructions for vague wording and confirm the uploaded knowledge sources actually contain the current, vendor-specific SLA details the drafts should reflect.",
      "B": "Switch the Project to the most capable model available, since generic drafts indicate the model isn't powerful enough for the task.",
      "C": "Abandon the Project and instead ask Claude in a fresh chat to \"try harder\" and be more specific each week.",
      "A": "Turn on Memory so Claude retains details from past conversations and can use them to improve future drafts."
    },
    "correct": "D",
    "explanations": {
      "D": "Correct. Underperforming outputs from a Project are typically caused by imprecise custom instructions or knowledge sources that don't actually supply the specific facts needed. Checking both, and revising the instructions or refreshing the knowledge sources as needed, addresses the root cause instead of masking the symptom.",
      "B": "Incorrect. Generic, boilerplate output is a classic symptom of vague instructions or a knowledge base that isn't supplying the right specifics, not insufficient model capability. Changing the model without diagnosing the actual cause is unlikely to fix it and adds unnecessary cost.",
      "C": "Incorrect. Discarding the Project loses its configured instructions and knowledge sources, and a vague verbal nudge like \"try harder\" does not address why the outputs are generic in the first place.",
      "A": "Incorrect. Memory retains details across conversations but does not fix a Project whose instructions are vague or whose knowledge sources lack the specific SLA details the drafts need; it does not diagnose or resolve the underlying cause."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.1-d463fd81"
  },
  {
    "taskStatement": "D7.2",
    "domain": "D7",
    "scenario": "An Operations Lead set up a Claude Project to draft weekly vendor status updates, using a custom instruction that tells Claude to \"keep the tone upbeat and concise.\" After two weeks of use, the team notices the drafts consistently omit mention of delays or open risks, even when the source documents (uploaded meeting notes) clearly describe them. Vendors have started asking why previously flagged issues weren't mentioned in the updates.",
    "question": "What is the most appropriate way to adjust the approach?",
    "options": {
      "A": "Keep the instruction as-is but manually add a risks section to every draft after Claude generates it.",
      "C": "Revise the custom instruction to explicitly require that known delays and open risks always be included, in addition to keeping an upbeat tone.",
      "D": "Stop uploading meeting notes as knowledge sources and instead paste the risk items directly into the chat each week.",
      "B": "Switch the Project to a more capable model, since the omissions suggest the current model isn't reasoning carefully enough about the notes."
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. A permanent manual workaround does not adjust the underlying approach and leaves the same instruction producing incomplete drafts every week, requiring ongoing correction instead of fixing the root cause.",
      "C": "Correct. The observed result (systematic omission of risks) traces directly to the instruction's wording, which emphasized \"upbeat\" without requiring completeness. Adjusting the approach based on this feedback means revising the custom instruction to explicitly require both tone and content, rather than changing an unrelated part of the setup.",
      "D": "Incorrect. The knowledge source isn't the problem — the notes already contain the risk information; the issue is that the custom instruction is causing Claude to leave it out.",
      "B": "Incorrect. The failure pattern is consistent with the instruction steering tone at the expense of content, not a reasoning limitation; changing the model doesn't address the instruction that is causing the omission."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.2-1d2b9be0"
  },
  {
    "taskStatement": "D7.2",
    "domain": "D7",
    "scenario": "A marketing manager set up a Claude Project to draft social captions for the brand's Instagram account, with custom instructions describing the desired voice (\"short, punchy, upbeat, under 40 words\"). Over the past two weeks, the manager has generated dozens of captions and noticed a consistent pattern: Claude keeps producing polished but lengthy captions (60-80 words) with a formal tone, no matter how many times the manager just reruns the same request hoping for a better draft.\n\nThe manager wants captions that actually match brand voice on the first try, since editing every single output is eating up the time the Project was supposed to save.",
    "question": "Given this recurring pattern, what is the most appropriate next step?",
    "options": {
      "B": "Stop using the Project and instead paste the voice guidelines into the chat window fresh each time, so the instructions stay top of mind.",
      "A": "Update the Project's custom instructions to be more specific, adding a couple of example captions that hit the target length and tone, since the current instructions aren't producing the desired result.",
      "D": "Switch the Project to a more capable model without changing the instructions, since a stronger model should infer the intended voice on its own.",
      "C": "Keep resubmitting the same request in the Project, since Claude's output naturally varies and a good draft should turn up eventually."
    },
    "correct": "A",
    "explanations": {
      "B": "Incorrect. Abandoning the Project discards the reusable knowledge source and forces the manager to retype guidance every session, which is less efficient and does not address the actual problem: the instructions themselves need refinement.",
      "A": "Correct. Two weeks of consistent misses on length and tone is feedback that the current instructions aren't specifying the constraint clearly enough. Revising the Project's custom instructions and adding concrete examples directly adjusts the approach based on the observed results.",
      "D": "Incorrect. A more capable model does not resolve an underspecified instruction; the tone and length requirements still need to be stated clearly and reinforced with examples for the output to reliably match brand voice.",
      "C": "Incorrect. The captions aren't failing due to random variance - they consistently miss on length and tone in the same direction. Rerunning the identical request without changing anything ignores the feedback the results are providing."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.2-a2a26a4d"
  },
  {
    "taskStatement": "D7.2",
    "domain": "D7",
    "scenario": "Priya, a project manager, set up a Claude Project to generate her team's weekly stakeholder status update. The Project's knowledge sources include sprint notes and a running risk log pulled from Google Drive, and the custom instructions tell Claude to summarize progress and flag open risks. After a few weeks of use, stakeholders tell Priya that the reports keep listing risks that were actually resolved two sprints ago, which makes the updates look stale and is starting to erode confidence in the process.\n\nPriya wants to fix this going forward rather than keep patching individual reports.",
    "question": "Based on this feedback, what is the most appropriate way for Priya to adjust her approach?",
    "options": {
      "B": "Keep the Project as configured, and manually delete the outdated risk mentions from each report before sending it to stakeholders.",
      "A": "Switch the Project to a more capable model, on the assumption that a stronger model is less likely to surface outdated information.",
      "C": "In the current chat, tell Claude not to mention old risks, so the next report it generates in that conversation leaves them out.",
      "D": "Review the Project's knowledge sources and custom instructions, remove or update the outdated risk-log entries, and revise the instructions so Claude is directed to rely on current risk status going forward."
    },
    "correct": "D",
    "explanations": {
      "B": "Incorrect. Manually fixing each output treats the symptom, not the cause, and requires repeating the same correction every single week rather than adjusting the approach that produced the recurring error.",
      "A": "Incorrect. This is a stale-data and instruction-clarity problem, not a capability problem. A more powerful model will still summarize outdated documents accurately as outdated documents if the knowledge source itself hasn't been updated.",
      "C": "Incorrect. An instruction given inside one chat does not change the Project's knowledge sources or custom instructions, so the same outdated-risk problem will resurface in the next report generated from the Project.",
      "D": "Correct. The feedback points to a root cause in the Project's setup: stale knowledge sources and instructions that don't direct Claude to prioritize current status. Adjusting the approach means updating the underlying configuration so the recurring problem doesn't reappear in future reports."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.2-03cfb8b5"
  },
  {
    "taskStatement": "D7.3",
    "domain": "D7",
    "scenario": "Priya is the Operations Lead at a regional logistics company. Every Monday she manually compiles a status report by pulling numbers from three separate spreadsheets, writing a summary paragraph, and emailing it to the leadership team — a task that takes her about 90 minutes each week. She has set up a Claude Project with the three recurring spreadsheets attached as knowledge sources and custom instructions describing the report's required format, and now asks Claude to draft the weekly summary directly from that Project.",
    "question": "Which change most directly improves the efficiency of Priya's weekly reporting workflow?",
    "options": {
      "A": "Have Claude generate the draft from the Project's attached spreadsheets and custom instructions, so Priya reviews and edits the draft instead of compiling and writing it from scratch.",
      "C": "Select the most capable model available for the task, since the report is going to leadership and accuracy matters most.",
      "B": "Ask Claude to generate the report from a general chat instead of the Project, since Projects can slow down each response with extra context.",
      "D": "Switch the conversation to research mode so Claude can pull in outside industry benchmarks to enrich the report."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. The Project's knowledge sources and custom instructions already hold the recurring data and required format, so Claude can produce a formatted draft directly from them. This turns Priya's task from manual compiling-and-writing into reviewing-and-editing, which is the actual efficiency gain available here.",
      "C": "Incorrect. This is a routine, well-defined summarization task over familiar internal data, not a complex reasoning problem, so defaulting to the most capable model adds cost and latency without addressing the workflow's actual bottleneck, which is manual compilation.",
      "B": "Incorrect. Moving to a general chat discards the whole benefit of the Project setup, forcing Priya to re-supply the spreadsheets and format instructions in every conversation instead of reusing the persistent setup she already built.",
      "D": "Incorrect. Research mode is for gathering outside information; the bottleneck in this workflow is compiling and summarizing known internal spreadsheet data, not sourcing external benchmarks, so it doesn't address the real inefficiency."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.3-659aba73"
  },
  {
    "taskStatement": "D7.3",
    "domain": "D7",
    "scenario": "A project manager compiles a weekly status report for stakeholders by pulling updates from several team channels. Every week, she opens a new chat with Claude and starts over: pasting the same report template, re-explaining the tone stakeholders expect, and re-uploading the same glossary of project acronyms so Claude can interpret team updates correctly. This repeated setup takes nearly as long as the actual drafting.",
    "question": "What is the most effective way for her to reduce this repeated setup time going forward?",
    "options": {
      "B": "Keep using a fresh chat each week, but paste a shorter version of the template to save a little typing time.",
      "A": "Switch to the most capable model available for the report chat, since a stronger model will infer the format and glossary without being told.",
      "D": "Ask Claude at the start of each new chat to remember the template and glossary from now on, then proceed as usual.",
      "C": "Create a Project with custom instructions describing the report format and tone, and add the glossary as a knowledge source, so future chats start with that context already in place."
    },
    "correct": "C",
    "explanations": {
      "B": "Incorrect. A shortened template still must be re-pasted every week and does not remove the underlying repeated-setup problem; it only trims it slightly.",
      "A": "Incorrect. Model capability does not substitute for providing context; a more capable model still lacks the specific template, tone, and glossary unless they are supplied, so the repeated setup remains.",
      "D": "Incorrect. A verbal request in one chat does not carry context into a separate future chat; without a Project (or another mechanism to persist that context), each new chat still starts from scratch.",
      "C": "Correct. A Project lets her set standing custom instructions and attach the glossary as a knowledge source once, so every future chat in that Project starts with the format, tone, and reference material already available, removing the repeated setup."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.3-72f3655f"
  },
  {
    "taskStatement": "D1.1",
    "domain": "D1",
    "scenario": "A project manager just finished a 45-minute client requirements call and has the raw meeting transcript. She needs to hand the engineering team a clean set of requirements they can start scoping from by end of day, but the transcript is full of tangents, restated ideas, and a few contradictions between what the client said early on versus later in the call.",
    "question": "Which approach will get Claude to produce the most useful requirements document on the first attempt?",
    "options": {
      "B": "Paste the full transcript and add instructions specifying the audience (engineering), the desired output structure (a prioritized requirements list), and how to handle the contradictions (flag them rather than silently pick one).",
      "D": "Paste the full transcript with no additional instructions, since Claude will naturally infer that a requirements list for engineers is wanted from the content alone.",
      "C": "Summarize the call from memory in a few bullet points instead of pasting the transcript, so Claude only has to work with the essentials.",
      "A": "Paste the full transcript and ask Claude to write the most thorough and exhaustive document possible, trusting it to resolve the contradictions using its best judgment."
    },
    "correct": "B",
    "explanations": {
      "B": "Correct. An effective prompt for this task supplies the raw source material plus the specifics Claude cannot infer on its own: who the output is for, what structure it should take, and explicit handling instructions for the one ambiguous part of the input (the contradictions) rather than leaving that judgment call to chance.",
      "D": "Incorrect. Without stated audience and format, Claude has to guess the structure and priorities engineering actually needs, and has no instruction to surface the contradictions rather than quietly resolving them one way.",
      "C": "Incorrect. Replacing the transcript with a memory-based summary discards the actual source detail Claude needs to work from, including the exact wording of the contradictory statements.",
      "A": "Incorrect. \"Most thorough and exhaustive\" is not a format or audience specification, and leaving the contradiction to Claude's best judgment risks silently baking in an assumption the client never confirmed."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.1-2e0d9809"
  },
  {
    "taskStatement": "D2.1",
    "domain": "D2",
    "scenario": "A project manager has set up a Claude Project for a product launch, with the knowledge source containing four uploaded documents: a project charter, a risk register, and two weeks of stakeholder meeting notes. Ahead of a Friday leadership sync, she asks Claude, \"Summarize all open risks and action items from our project documents.\" Claude returns a tidy, well-organized list of six risks and four action items, each phrased clearly and none of them looking obviously wrong.",
    "question": "Before she presents this summary as the full risk picture, what should she do?",
    "options": {
      "D": "Accept the summary, since a Claude Project with knowledge sources only draws from the uploaded documents and cannot omit anything they contain.",
      "B": "Ask Claude to double-check its own summary for completeness and proceed if it confirms nothing was missed.",
      "A": "Skim through each of the four source documents herself to confirm every risk and action item mentioned in them actually appears in the summary.",
      "C": "Send the summary as drafted, since each risk and action item is phrased clearly with no internal inconsistencies."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. Having relevant documents in a Project's knowledge source does not guarantee every item within them gets surfaced in a given response; retrieval and summarization across multiple documents can still skip material.",
      "B": "Incorrect. Asking Claude to self-assess whether its own output is complete is not an independent check — it is the same process evaluating itself and can miss the same gaps.",
      "A": "Correct. Evaluating an output for completeness, not just accuracy, requires comparing it back against the original source material to confirm nothing relevant was dropped — a distinct check from verifying that the items included are individually correct.",
      "C": "Incorrect. Clear phrasing and internal consistency speak to how polished the output reads, not to whether it captured everything the source documents actually contain."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.1-6da29af6"
  },
  {
    "taskStatement": "D1.2",
    "domain": "D1",
    "scenario": "A project manager is preparing a retrospective on a feature launch that slipped its deadline. She has a folder of raw customer support tickets and wants Claude's help to: identify the root causes behind the delay from the ticket feedback, draft a revised launch timeline that addresses those causes, and write a stakeholder email summarizing the findings and the new plan. Each later piece genuinely depends on what the earlier analysis turns up — the timeline can't be drafted sensibly until the causes are known, and the email can't be written until the timeline exists.",
    "question": "What is the most effective way to structure this request so Claude's output holds together?",
    "options": {
      "C": "Give Claude an ordered sequence of prompts: first extract root causes from the ticket feedback, then use that output to draft the revised timeline, then use the timeline to write the stakeholder email — reviewing each step before moving to the next.",
      "D": "Paste all the raw ticket text into one message and ask Claude to identify causes, draft the timeline, and write the email all at once, trusting it to sequence the reasoning internally.",
      "B": "Split the work into three separate prompts — causes, timeline, and email — and run them at the same time so each finishes independently, then combine the three outputs into one document.",
      "A": "Skip the intermediate analysis and ask Claude to write only the stakeholder email directly, letting it infer the causes and timeline from the ticket data on its own."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Because the timeline depends on the identified causes and the email depends on the timeline, decomposing the request into an ordered chain — where each reviewed step's output feeds the next — matches the real dependency structure and gives Claude a clear, verifiable path through the work.",
      "D": "Incorrect. Bundling three dependent tasks and a large pile of raw source data into one instruction leaves Claude to silently decide the sequencing and carry any early misreading of the tickets through the rest of the output, with no checkpoint to catch it.",
      "B": "Incorrect. Running the three prompts in parallel treats them as independent when they are not — the timeline and email prompts would have to guess at causes that haven't actually been established yet, since the true causes only exist after the first step completes.",
      "A": "Incorrect. Asking for only the final deliverable skips the decomposition entirely, so the causes and timeline are never surfaced for the PM to check, even though the email's credibility depends on both being right."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.2-023cb7a4"
  },
  {
    "taskStatement": "D3.2",
    "domain": "D3",
    "scenario": "A marketing manager is preparing a competitive positioning brief for the executive team ahead of a product launch. The task requires synthesizing dozens of pages of analyst reports, past campaign retrospectives, and pricing data into a strategic recommendation, weighing subtle tradeoffs between three possible launch narratives.\n\nShe has been defaulting to whichever model happens to be selected in her chat window without giving it much thought, and a colleague mentions that Claude offers different models suited to different kinds of work.",
    "question": "Given the nature of this task, which model choice is most appropriate?",
    "options": {
      "D": "Opus, because the task involves complex, nuanced reasoning across many sources where depth of analysis matters more than speed or cost.",
      "A": "Haiku, because it is the newest model, and the newest model is generally the most capable for any task.",
      "B": "Sonnet, because it is the default model, and the default is the right choice regardless of task complexity.",
      "C": "Whichever model was used last time, because switching models mid-project introduces inconsistency in output quality."
    },
    "correct": "D",
    "explanations": {
      "D": "Correct. Aligning model selection with task requirements means reserving the most capable model, Opus, for complex reasoning across large volumes of information with subtle tradeoffs, where depth of analysis outweighs speed or cost.",
      "A": "Incorrect. Haiku is built for speed and cost-efficiency on straightforward, high-volume tasks, not deep multi-source strategic reasoning; being newer does not make a model the right fit for every task.",
      "B": "Incorrect. Treating one model as universally correct ignores the purpose of model selection, which is to match model capability to task complexity, not to default without consideration.",
      "C": "Incorrect. Model choice should be driven by the demands of the current task, not by habit or prior usage; a task with heavier reasoning needs warrants reconsidering the model."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.2-6f44926d"
  },
  {
    "taskStatement": "D5.1",
    "domain": "D5",
    "scenario": "A project manager is setting up a Claude Project to help run weekly status meetings for a product launch. She wants every reply formatted the same way (risks first, then milestones, then open questions), and she wants Claude to always reference the current sprint backlog, which her team updates in a shared document every few days.\n\nShe is deciding how to configure the Project so the formatting stays consistent and the backlog reference stays current, without her having to re-explain either one at the start of every conversation.",
    "question": "How should she configure the Project to meet both goals?",
    "options": {
      "B": "Paste the current backlog document into the custom instructions field, and also add the formatting rules there, since instructions apply to every conversation in the Project.",
      "D": "Put the formatting rules in the custom instructions, and attach the backlog document as a knowledge source so it can be swapped for the updated version without editing the instructions.",
      "C": "Skip Project configuration entirely, and instead retype the formatting rules and paste the latest backlog into the chat at the start of each weekly conversation.",
      "A": "Attach the backlog document as a knowledge source, and rely on Claude's general knowledge of status-report conventions to keep the formatting consistent each time."
    },
    "correct": "D",
    "explanations": {
      "B": "Incorrect. Custom instructions are meant for durable behavioral guidance, not fast-changing reference content; embedding the backlog there means re-editing the instructions every few days as the document changes.",
      "D": "Correct. Custom instructions hold stable behavioral guidance like the required response format, while knowledge sources hold reference material Claude draws on and can be updated independently, so the backlog can be refreshed without touching the formatting rules.",
      "C": "Incorrect. Manually re-entering the same setup every meeting is exactly the repeated work that Project configuration is meant to eliminate, and it invites inconsistency between weeks.",
      "A": "Incorrect. A knowledge source is well suited to the backlog, but the specific risks-milestones-questions ordering is a Project-specific preference, not a general convention Claude can be expected to infer and apply consistently on its own."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.1-38ff5a4f"
  },
  {
    "taskStatement": "D7.1",
    "domain": "D7",
    "scenario": "A project manager runs a Claude Project to triage incoming bug reports pulled in from a shared inbox connector, with custom instructions telling Claude to classify each report as \"Critical,\" \"High,\" or \"Low\" priority. After two weeks of use, the PM notices that almost every report is being labeled \"High,\" even reports that are clearly minor cosmetic issues, which makes the priority labels useless for planning standups.",
    "question": "What is the most likely cause of this underperforming output, and what should the PM do first?",
    "options": {
      "A": "The custom instructions name the categories but don't define what distinguishes them, so the PM should revise the instructions to give concrete, distinguishing criteria for each priority level.",
      "B": "The inbox connector is probably malfunctioning and corrupting report text before Claude sees it, so the PM should disconnect and reconnect the connector.",
      "C": "Claude's underlying model is not capable of reliable multi-category classification, so the PM should switch the Project to Opus for every triage request going forward.",
      "D": "Claude is deliberately over-flagging issues to prompt more human review, so the PM should reduce the number of reports submitted per session."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Vague custom instructions that name categories without defining distinguishing criteria are a common cause of underperforming Project outputs; giving Claude concrete criteria for each priority level directly addresses the observed skew and is the right first diagnostic step.",
      "B": "Incorrect. A connector malfunction would more likely produce garbled, missing, or truncated content, not a consistent, meaningful-looking mislabeling pattern across otherwise well-formed reports.",
      "C": "Incorrect. Classifying text into a small set of named categories is well within capability at any model tier; the failure pattern points to unclear instructions, not insufficient model capability, so switching models does not address the root cause.",
      "D": "Incorrect. Claude does not have independent motives to manipulate workflow behavior; this attributes intentionality where the actual cause is an instruction-design gap."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.1-78f82a61"
  },
  {
    "taskStatement": "D2.2",
    "domain": "D2",
    "scenario": "An HR business partner is preparing a themes report from an annual engagement survey with about 200 open-ended comments. She pastes all the comments into Claude and asks it to identify the top three themes with supporting detail, planning to present the results to the leadership team next week. Claude's summary states that \"the vast majority of employees feel unsupported by their direct managers,\" listed as the top theme. She recalls skimming the raw comments earlier and thinks only a modest number specifically mentioned management support — most comments seemed to focus on workload and tooling instead.",
    "question": "Given her recollection that the raw comments skewed differently than the stated theme, what should she do before presenting the report to leadership?",
    "options": {
      "A": "Ask Claude to soften the phrasing of the management theme so it sounds less alarming before sending it to leadership.",
      "C": "Trust the summary as written, since Claude processed all 200 comments directly and would have caught any skew in its own analysis.",
      "B": "Sample a portion of the raw comments and check whether the stated prevalence of the management theme actually matches the distribution she observes.",
      "D": "Ask Claude to assign a confidence percentage to the management theme and include that percentage alongside it in the leadership report."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Rewording the theme changes tone, not accuracy, and does nothing to confirm whether the underlying characterization of the data is correct.",
      "C": "Incorrect. Processing all the input text does not guarantee an accurate, unbiased aggregation; a model can overstate or understate a theme's prevalence, and there is no mechanism ensuring it would self-detect that kind of skew.",
      "B": "Correct. When a stated theme's prevalence conflicts with the reviewer's own recollection of the source material, spot-checking a sample of the raw comments against the claim is the diligence step needed before the characterization goes to leadership.",
      "D": "Incorrect. A self-reported confidence percentage is not a reliable accuracy signal and does not substitute for checking the claim against the actual source data."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.2-c4797877"
  },
  {
    "taskStatement": "D1.2",
    "domain": "D1",
    "scenario": "A project manager is prepping materials for a quarterly business review. She needs three things from Claude: a theme summary of 500 open-ended customer survey responses stored in a spreadsheet, a set of slide bullet points describing the upcoming product roadmap, and a short competitive comparison of how two rival products price their premium tier. None of these three deliverables depends on the content of either of the others — they draw on different sources and will land on different slides.",
    "question": "What is the most effective way for her to structure this request to Claude?",
    "options": {
      "A": "Ask Claude to complete the survey summary first, then have it use that output as the basis for the roadmap bullets and the pricing comparison in turn.",
      "B": "Treat the three deliverables as separate, independently scoped tasks, each with its own clear inputs and instructions, since none relies on another's output.",
      "C": "Combine all three requests into one broad prompt asking Claude to 'pull together the quarterly review materials' and let it infer what is needed for each piece.",
      "D": "Have Claude produce only the deliverable she considers most important for the review and skip decomposing the other two for now."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Imposing a sequential chain on tasks that have no actual dependency wastes time and risks letting an unrelated survey-summary output improperly color the roadmap and pricing content.",
      "B": "Correct. Effective decomposition means identifying which subtasks are genuinely independent versus which depend on one another, then structuring each independent piece with its own specific inputs and instructions rather than forcing false sequencing or vague bundling.",
      "C": "Incorrect. Merging unrelated deliverables with different source material into one vague prompt makes it harder for Claude to apply the right data and instructions to each piece, typically producing shallower results than clearly scoped separate requests.",
      "D": "Incorrect. Dropping deliverables isn't decomposition; the task calls for structuring all three, not narrowing scope to avoid the work of breaking down the request."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.2-a098d0c1"
  },
  {
    "taskStatement": "D1.1",
    "domain": "D1",
    "scenario": "A project manager sends a weekly status update to senior leadership. Each Friday she collects raw bullet notes from her team leads on progress, blockers, and budget, then reshapes them into a one-page brief leadership can scan in under a minute, with any at-risk items called out first. This week she is short on time and opens a chat with Claude, pastes in the raw team notes, and types: \"Turn these notes into an update for leadership.\" The result reads fine but buries a schedule slip three paragraphs down, follows a generic project-summary structure, and runs to two and a half pages.",
    "question": "What should the project manager do differently to get a usable draft on the next attempt?",
    "options": {
      "C": "Paste each team lead's notes in a separate message so Claude can focus on one item at a time before combining them into an update.",
      "A": "Rewrite the prompt to state the audience, the one-page length limit, and the rule that at-risk items must be listed first, along with the raw notes.",
      "D": "Keep the same prompt, then repeatedly tell Claude to \"make it more professional and concise\" until the length and tone happen to work.",
      "B": "Ask Claude to first guess what senior leadership typically expects from a status update, then apply that guess to the notes."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. Splitting the notes across separate messages fragments the context Claude needs to compare items and decide which risks matter most, and still never states the format or priority rules the update actually needs.",
      "A": "Correct. An effective prompt for this task gives Claude the specifics it cannot infer on its own: who the update is for, the required length, and the rule that risks come first, alongside the source notes. This is the standard the prior draft failed on and directly fixes the buried risk and wrong length.",
      "D": "Incorrect. Vague follow-up nudges like \"more professional\" don't supply the missing specifics (audience, length cap, ordering rule), so results stay inconsistent instead of reliably matching the needed format.",
      "B": "Incorrect. Having Claude guess the audience's expectations substitutes inference for information the project manager already knows; an effective prompt supplies that context directly rather than asking Claude to speculate about it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.1-41e5049f"
  },
  {
    "taskStatement": "D1.3",
    "domain": "D1",
    "scenario": "An HR Business Partner asks Claude to draft talking points for a manager who needs to deliver a layoff notification to a team of five. The first draft is clear and covers severance and next steps, but it opens with \"We've made the difficult decision to eliminate your positions\" and reads as blunt and cold given that two of the affected employees have been with the company for over a decade.",
    "question": "What is the most effective way to get a revision that actually fixes the problem?",
    "options": {
      "C": "Tell Claude the tone is wrong and ask for a version that sounds more empathetic.",
      "D": "Regenerate the draft from scratch with the same prompt, since a second attempt often reads better.",
      "A": "Switch to a more capable model and resend the identical prompt, since a stronger model will infer the tenure issue on its own.",
      "B": "Tell Claude the opening feels abrupt given the employees' long tenure, and ask it to acknowledge each person's years of contribution before stating the decision."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. This names the problem category (tone) but not what's missing or what a fix should include, leaving Claude with a vague instruction to be nicer rather than concrete direction.",
      "D": "Incorrect. Re-running the identical prompt without new feedback gives Claude nothing to change and is unlikely to fix a specific, already-identified shortcoming.",
      "A": "Incorrect. A more capable model is not a substitute for feedback; without being told what's wrong, there's no reason to expect it would infer the tenure consideration unprompted.",
      "B": "Correct. Effective iteration means giving specific, concrete feedback: identifying exactly what fell short (an abrupt opening that ignores tenure) and what the revision needs to include (acknowledgment of each person's contribution before the decision). This gives Claude a clear target to revise toward."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D1.3-43bf4ca0"
  },
  {
    "taskStatement": "D2.5",
    "domain": "D2",
    "scenario": "An HR business partner used Claude to draft detailed talking points for managers on how to deliver a round of compensation adjustments, including guidance on handling pushback and specific policy citations. The talking points worked well in a manager-only briefing. Now the HRBP wants to send a version of the same content directly to all affected employees explaining the changes.",
    "question": "What is the most effective way to produce the employee-facing version?",
    "options": {
      "A": "Send the manager talking points to employees unchanged, since the underlying facts about the compensation changes are the same for both audiences.",
      "D": "Paste the talking points into a new Artifact and apply a cleaner visual layout, keeping the wording as-is.",
      "B": "Give Claude the manager talking points along with the new audience, purpose, and tone (a direct, reassuring employee notice rather than internal coaching), and ask it to revise structure, detail level, and language accordingly.",
      "C": "Ask Claude to shorten the talking points by roughly half without any other instructions, since a shorter document is automatically more appropriate for a general audience."
    },
    "correct": "B",
    "explanations": {
      "A": "Incorrect. Content built for managers coaching other managers - including pushback-handling guidance and internal policy framing - is not suited to employees reading about their own pay, even though the facts are identical.",
      "D": "Incorrect. Reformatting visual presentation changes how the content looks, not whether its tone and content are appropriate for employees rather than managers.",
      "B": "Correct. Effectively adapting an output for a new audience means telling Claude who the new readers are and what the document needs to accomplish for them, then having it revise tone, structure, and level of detail - not just editing surface wording.",
      "C": "Incorrect. Length is only one dimension of audience fit; trimming word count without addressing tone, framing, or which details belong in front of employees can still leave inappropriate content in place."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.5-a1ae0fb2"
  },
  {
    "taskStatement": "D2.6",
    "domain": "D2",
    "scenario": "A project manager is running weekly status check-ins for a software rollout. Each Friday she pastes updates from four workstream leads into Claude and asks it to identify blockers and risks. This week she also needs to answer a quick message from her director, who is asking only whether the rollout is still on track for the August 15 launch date.",
    "question": "For replying to the director's one-line question, which output format should the project manager have Claude produce?",
    "options": {
      "A": "A structured table artifact listing every blocker and risk from all four workstreams, so the director has full visibility into the underlying detail",
      "B": "A downloadable spreadsheet artifact tracking launch-readiness percentages, so the reply can be updated and reused in future weekly check-ins",
      "D": "A standalone document artifact with a formatted executive summary section, even though the director asked for a one-line status",
      "C": "A plain inline chat reply, since the answer is a brief statement the director will read once and doesn't need to be saved or edited separately"
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. The director asked a yes/no status question, not for the full blocker-and-risk detail; producing a comprehensive table answers a question that wasn't asked and buries the actual answer.",
      "B": "Incorrect. A reusable, updatable tracking format fits recurring structured data, not a one-off reply to a single question with no indication it needs to persist or be reused.",
      "D": "Incorrect. Wrapping a one-line answer in a formatted document artifact adds structure the content doesn't need and makes the director hunt for the answer instead of reading it directly.",
      "C": "Correct. A short, single-use answer that will be read once in the flow of conversation and doesn't need editing, reuse, or handoff as a standalone document is exactly the case for an inline reply rather than an artifact."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D2.6-5ba4e010"
  },
  {
    "taskStatement": "D3.4",
    "domain": "D3",
    "scenario": "A project manager runs a multi-quarter product rollout using a Claude Project. The Project's custom instructions capture the rollout's goals, the stakeholder list, and the current milestone status, and a few knowledge documents hold the detailed rollout plan. Each week she opens a brand-new chat inside the Project to review status updates and draft stakeholder emails, rather than continuing the previous week's chat, which had grown to several hundred messages before she left it alone.\n\nThis week a teammate suggests it would be simpler to just keep reusing that same long-running chat indefinitely going forward, since it already contains every prior discussion and status update.",
    "question": "Should the project manager adopt the teammate's suggestion of continuing to work in one long-running chat indefinitely?",
    "options": {
      "D": "Yes — continuing the same chat indefinitely guarantees Claude retains perfect recall of every past detail without ever needing to be reminded.",
      "A": "No — she should have Claude output the full raw conversation log each week rather than rely on the Project's knowledge sources.",
      "C": "No — she should turn off the Project's custom instructions instead, since they just duplicate what already sits in the chat history.",
      "B": "No — an ever-growing single chat becomes unwieldy to work in, so recurring context like goals, stakeholders, and milestones belongs in the Project's instructions and knowledge, with fresh chats started for each week's work."
    },
    "correct": "B",
    "explanations": {
      "D": "Incorrect. A conversation that keeps growing runs into practical context limitations, so treating it as a guaranteed, perfect memory store is the wrong mental model — it also gets harder to navigate as it lengthens.",
      "A": "Incorrect. Dumping raw logs isn't a substitute for structured, reusable knowledge, and it doesn't solve the underlying problem of one chat growing without bound.",
      "C": "Incorrect. Custom instructions are exactly the right place to persist stable, recurring rollout context so it's automatically available in every new chat within the Project; removing them would eliminate the one mechanism that avoids re-explaining everything each week.",
      "B": "Correct. Recognizing that a single conversation shouldn't grow indefinitely, and instead persisting recurring facts in the Project's instructions/knowledge while starting new chats for new work, is the right way to manage context limitations and keep each session focused and manageable."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.4-51ff15fd"
  },
  {
    "taskStatement": "D4.2",
    "domain": "D4",
    "scenario": "An HR generalist is redesigning the company's new-hire onboarding checklist, which has grown into a disorganized 15-page document accumulated over several years of ad hoc edits. She creates a Project, adds the current checklist and last year's exit-interview summary as knowledge sources, and sets custom instructions asking Claude to identify redundant steps and propose a leaner, better-sequenced process.\n\nClaude returns a restructured checklist that consolidates several steps and moves IT-equipment provisioning and badge-access setup earlier in the timeline, with a short rationale for each change.",
    "question": "Before rolling out the restructured checklist company-wide, what is the most appropriate next step?",
    "options": {
      "A": "Discard the restructuring, since a Project should not be used to reorganize an operational process.",
      "C": "Review the proposed changes against how onboarding actually runs today and confirm the new sequence with IT and facilities before rolling it out.",
      "B": "Ask Claude to redo the analysis with a more capable model and adopt whichever version reads as more thorough.",
      "D": "Publish the new checklist immediately, since the Project's custom instructions already scoped the task correctly."
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. Using Claude to draft a reorganization and then validating it with the relevant teams is appropriate use; discarding useful drafting work outright is unwarranted.",
      "C": "Correct. Claude is well suited to synthesizing a disorganized document into a leaner draft, but a resequencing that touches other teams' workflows, like IT provisioning and facility access, needs confirmation from the people who actually run those steps before it goes live.",
      "B": "Incorrect. Model choice affects reasoning depth and detail, not whether the plan matches real operational constraints; a more detailed output is not the same as a verified one.",
      "D": "Incorrect. Well-scoped custom instructions improve the quality of the draft but do not verify it against operational reality; a plausible-sounding reordering can still overlook constraints Claude was never told about."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.2-6793a171"
  },
  {
    "taskStatement": "D3.2",
    "domain": "D3",
    "scenario": "A project manager is setting up a Claude Project for their team's weekly status reporting workflow. Each week, the Project takes in raw stand-up notes and calendar exports and is expected to produce a polished, multi-section report that reconciles conflicting timeline updates across five workstreams, flags dependency risks, and drafts recommended re-sequencing for the steering committee.",
    "question": "Which model choice for this Project best fits the task?",
    "options": {
      "A": "Opus, because reconciling conflicting information across workstreams and producing a reasoned recommendation calls for the most capable model.",
      "B": "Sonnet, because it is Anthropic's newest model and is therefore the right default for any Project regardless of task complexity.",
      "C": "Whichever model is already configured on the team's other Projects, to keep the model choice consistent across the workspace.",
      "D": "Haiku, because status reports are a routine weekly task and routine tasks should always default to the fastest, lowest-cost model."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Reconciling conflicting inputs, assessing dependency risk, and drafting a substantive recommendation is complex reasoning work, which is what the most capable model, Opus, is suited for.",
      "B": "Incorrect. Recency is not the basis for model selection; the choice should be driven by the complexity of the task, not which model was released most recently.",
      "C": "Incorrect. Consistency with other Projects ignores this specific task's requirements; model choice should match what each Project actually needs to do.",
      "D": "Incorrect. \"Routine\" and \"weekly\" describe frequency, not difficulty; this task involves multi-source reconciliation and judgment, which goes beyond what Haiku is intended for."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.2-d2cd9fea"
  },
  {
    "taskStatement": "D5.4",
    "domain": "D5",
    "scenario": "A project manager set up a Claude Project that her delivery team uses to draft weekly status reports. The Project's custom instructions describe the old report format: a narrative paragraph followed by a bulleted risk list. Last month, leadership adopted a new template with separate \"Progress,\" \"Blockers,\" and \"Next Steps\" headers, and the whole team is now expected to use it. Claude keeps generating reports in the old narrative-plus-bullets format whenever teammates use the Project.\n\nThe project manager wants every teammate's drafts to follow the new template automatically, without each person having to explain the format in their own chats.",
    "question": "What is the most effective way to make Claude consistently produce reports in the new template for everyone using the Project?",
    "options": {
      "D": "Ask each teammate to paste the new template into the first message of every chat they start in the Project.",
      "A": "Update the Project's custom instructions so they describe the new \"Progress,\" \"Blockers,\" and \"Next Steps\" template.",
      "B": "Create a new Project with the same knowledge sources and put the new template in its custom instructions, then have the team switch over.",
      "C": "Upload a document describing the new template as an additional knowledge source, leaving the existing custom instructions unchanged."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. This puts the formatting burden on every teammate for every chat rather than fixing the Project itself, so the old format will keep resurfacing whenever someone forgets to paste it in.",
      "A": "Correct. Custom instructions govern Claude's behavior across all chats in a Project. Since they still describe the outdated format, editing them to describe the new template is the direct update that applies automatically for every teammate going forward, with no per-chat repetition.",
      "B": "Incorrect. Standing up a duplicate Project is unnecessary extra work and fragments the team's history and access when simply editing the existing Project's custom instructions achieves the same result.",
      "C": "Incorrect. Adding a knowledge source that describes the new template while the custom instructions still explicitly describe the old one leaves conflicting guidance in place; the outdated instructions are not corrected just because a newer file also exists."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.4-f7f4ac93"
  },
  {
    "taskStatement": "D7.1",
    "domain": "D7",
    "scenario": "A communications specialist is drafting an all-staff email announcing a new remote-work policy. She's working in a plain Claude chat window, typing the policy details from memory and asking Claude to write the announcement. The drafts come back grammatically fine but generic — they don't sound like the company's usual voice and leave out details the team always includes, like a link to the FAQ and a nod to the pilot group that tested the policy. She keeps sending follow-up messages like \"make it sound more like us\" and \"add more of our usual details,\" but each new draft is still just as generic.",
    "question": "What is the most effective way to fix the underperforming outputs?",
    "options": {
      "A": "Ask Claude to search the web for how other companies phrase remote-work announcements and model the draft on those examples.",
      "D": "Set up a Claude Project with custom instructions describing the company's tone and required elements, and add past announcements as knowledge sources for Claude to reference.",
      "B": "Switch the conversation to Opus, assuming a more capable model will infer the company's tone and standard details without being shown any examples.",
      "C": "Keep rephrasing the same request in the chat, since enough iterations of \"sound more like us\" will eventually converge on the right tone."
    },
    "correct": "D",
    "explanations": {
      "A": "Incorrect. Other companies' announcements reflect their own voice and policies, not this company's; borrowing external phrasing doesn't supply the missing company-specific reference material the task actually needs.",
      "D": "Correct. The underperformance traces to missing context, not model capability or wording. A Project lets her set persistent custom instructions capturing the required tone and elements, and add past announcements as knowledge sources so Claude has the company's actual voice and standard details to draw on.",
      "B": "Incorrect. The generic output isn't a capability limitation — Claude was never given the company's actual voice or required content to draw on, so a more capable model faces the same missing-context problem.",
      "C": "Incorrect. Vague verbal nudges in chat don't supply the missing reference material; without concrete examples or instructions to work from, repeated rephrasing tends to produce more of the same generic drafts."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.1-a6de8f56"
  },
  {
    "taskStatement": "D7.3",
    "domain": "D7",
    "scenario": "Jordan, a project manager, is juggling three concurrent initiatives: a vendor contract renewal, a new hire onboarding plan, and a customer escalation review. For months Jordan has done all of this work in a single, ever-growing chat conversation with Claude, pasting in new documents for whichever initiative comes up that day. Lately Claude's responses have started blending details from different initiatives together, and Jordan has to keep reminding it which project a question actually belongs to.\n\nJordan wants a workflow that keeps each initiative's context distinct so Claude's answers stay focused and Jordan spends less time correcting mix-ups.",
    "question": "What change would most improve the efficiency and effectiveness of Jordan's workflow?",
    "options": {
      "C": "Set up a separate Project for each initiative, with its own custom instructions and knowledge sources, and hold conversations about that initiative inside its Project.",
      "B": "Keep working in the single ongoing chat, but start each message with a one-line reminder of which initiative it concerns.",
      "D": "Continue the single chat, but switch to a more capable model so it can track all three initiatives without confusion.",
      "A": "Start a brand-new chat for every question and re-paste all the relevant background documents each time, regardless of initiative."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Separating each initiative into its own Project lets Jordan scope the relevant knowledge sources and standing instructions to that initiative alone, so context stays isolated and Jordan stops having to disambiguate or correct blended answers.",
      "B": "Incorrect. A reminder line only patches the symptom message by message; the documents and instructions for all three initiatives remain mixed in one long thread, so cross-contamination keeps recurring.",
      "D": "Incorrect. A more capable model does not resolve the structural problem of unrelated documents and instructions sharing one conversation; the mixing would still occur regardless of model choice.",
      "A": "Incorrect. Re-pasting the same background documents into a fresh chat every time discards the benefit of reusable standing instructions and knowledge sources, adding manual effort rather than reducing it."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.3-b6501029"
  },
  {
    "taskStatement": "D7.3",
    "domain": "D7",
    "scenario": "An HR communications specialist is revising a 10-page updated remote-work policy document that has already been reviewed by legal. Each time she wants a change, she pastes the entire draft into a new chat message, asks Claude to rewrite the affected section, then copies the whole revised document back out to send the next request. After a dozen rounds of small wording tweaks, the conversation is long and unwieldy, and she is spending more time managing pasted text than actually reviewing the edits.",
    "question": "What is the most efficient way for her to manage this iterative editing task going forward?",
    "options": {
      "A": "Use the Artifacts feature so the policy document lives as a single editable object that Claude can revise in place, rather than regenerating and re-pasting the full text each round.",
      "B": "Start a fresh chat for every requested edit so the conversation stays uncluttered and each response is faster.",
      "D": "Switch the conversation to the Opus model, since a more capable model will produce cleaner rewrites and reduce the number of editing rounds needed.",
      "C": "Keep editing in the chat window as before, but paste each new version into a separate Word document to track changes manually."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Artifacts keep a document as a persistent, editable object that Claude can update in place, so revisions apply directly to the existing draft instead of resending and regenerating the full text in chat each time - the more effective workflow for iterative document editing.",
      "B": "Incorrect. Starting a new chat for every edit discards the context of prior revisions, forcing her to re-explain what changed and re-paste the draft again, which adds effort rather than reducing it.",
      "D": "Incorrect. Model capability affects the quality of a given rewrite, but it does not address the actual inefficiency here, which is re-pasting and regenerating the entire document on every round of edits.",
      "C": "Incorrect. Manually tracking versions in a separate Word document adds an extra manual step outside Claude and does not solve the underlying inefficiency of regenerating the full text each round."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D7.3-0ce1349f"
  },
  {
    "taskStatement": "D3.1",
    "domain": "D3",
    "scenario": "A project manager is preparing a vendor-selection memo comparing three project-management software platforms for her department's upcoming renewal. Before she writes her recommendation, she wants Claude to pull current information from each vendor's public pricing page and recent third-party review sites, since the vendors have all changed their plans in the last few months and she doesn't want to rely on outdated or remembered details.\n\nShe already has a Claude Project set up for this initiative, with her department's evaluation criteria saved as custom instructions and last year's vendor comparison spreadsheet uploaded as a knowledge source.",
    "question": "Which feature should she use to gather the current, multi-source pricing and review information she needs before drafting her memo?",
    "options": {
      "A": "Research mode, which can search and synthesize information from multiple current external sources.",
      "B": "The existing Project, since its custom instructions and uploaded spreadsheet already define the vendors under review.",
      "D": "A regular chat conversation, since Claude's training gives it reliable knowledge of current vendor pricing.",
      "C": "An Artifact, so the pricing comparison can be organized into a clean, structured document."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Research mode is built to search and pull in current information from multiple external sources and synthesize it, which fits the need for up-to-date pricing and review data that isn't reliable from memory alone.",
      "B": "Incorrect. The Project's custom instructions and uploaded spreadsheet capture her department's fixed criteria and last year's data, but neither one reaches out to current vendor websites or review sites for updated information.",
      "D": "Incorrect. A model's training data has a cutoff and cannot reflect pricing changes made in the last few months; treating a plain chat answer as current risks using stale or fabricated details in a decision memo.",
      "C": "Incorrect. Artifacts are for organizing and presenting content Claude already has, not for gathering new external information; she would still need a way to collect the current data first."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.1-75b2fe04"
  },
  {
    "taskStatement": "D3.1",
    "domain": "D3",
    "scenario": "An HR business partner is preparing a one-time global mobility report comparing parental-leave entitlements in five countries where the company is opening offices. She needs current statutory minimums, recent legal changes, and citable sources she can attach to the report for the legal team to spot-check. She won't need this information again after the report ships, and she has no prior files or standing instructions to reuse.",
    "question": "Which Claude feature is the best fit for this task?",
    "options": {
      "D": "Set up a Project with custom instructions describing the five countries and parental-leave terminology, then ask the question inside the Project.",
      "B": "Open an artifact and build the comparison table directly, filling in each country's entitlement from general knowledge.",
      "C": "Use research mode to have Claude search external sources, synthesize the current entitlements, and return citations.",
      "A": "Ask in a regular chat conversation and rely on Claude's existing training knowledge of each country's leave laws."
    },
    "correct": "C",
    "explanations": {
      "D": "Incorrect. Projects add lasting value through custom instructions and knowledge sources reused across many related tasks; a single non-recurring report gains nothing from that setup and adds effort with no payoff.",
      "B": "Incorrect. An artifact is a surface for producing and formatting a document once the underlying facts are known; it doesn't gather or verify external information, so building the table this way skips the sourcing step the report needs.",
      "C": "Correct. This task needs current, external, citable information rather than reusable context or document formatting - research mode is built to search sources, synthesize findings, and return citations the legal team can verify, which matches exactly what the report requires.",
      "A": "Incorrect. Statutory leave rules change and vary by jurisdiction, and training knowledge can be outdated with no citations attached; for a fact-sensitive report going to legal for verification, ungrounded recall from chat is the weakest option."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.1-432a6219"
  },
  {
    "taskStatement": "D4.4",
    "domain": "D4",
    "scenario": "A project manager currently coordinates a cross-functional product launch by manually copying status updates from Slack, email, and a shared doc into a single weekly \"launch health\" report. This takes about two hours every Friday and often lags because updates trickle in throughout the week. The PM wants to redesign this into a Claude Project: the plan is to add the team's status-update exports and the launch plan doc as knowledge sources, and write custom instructions describing the report's structure and what counts as a red/yellow/green flag for each workstream.",
    "question": "Before rolling this out to replace the manual process, what should the PM do to validate the redesign?",
    "options": {
      "C": "Switch the whole team over immediately, since adding the launch plan and status updates as knowledge sources ensures the flags will match reality.",
      "B": "Run the new Project against a recent week with a known-correct report, compare Claude's flags and summary against what actually happened, and adjust the instructions before relying on it for live use.",
      "D": "Skip validation and only check the Project's output if a stakeholder later complains that a flag seems wrong.",
      "A": "Have the Project generate one report, send it directly to stakeholders, and use their reactions to catch any errors in the flagging logic."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Adding relevant documents as knowledge sources gives Claude material to reference, but it does not guarantee the flagging logic in the custom instructions is correct; that still needs to be checked against a real case.",
      "B": "Correct. Redesigning a recurring workflow around Claude means testing it against a known-good baseline before it replaces the trusted manual process, then tuning the custom instructions based on where the output diverges from what actually happened.",
      "D": "Incorrect. Waiting for a stakeholder complaint means the redesigned workflow is unvalidated in production, risking a wrong red/yellow/green flag reaching decision-makers before anyone reviews it.",
      "A": "Incorrect. Using live stakeholders as the error-detection mechanism means mistakes reach the audience before anyone catches them, which is the opposite of validating before rollout."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.4-2b8816fe"
  },
  {
    "taskStatement": "D4.4",
    "domain": "D4",
    "scenario": "An HR Communications Specialist is redesigning how the team handles employee questions during open enrollment. In past years, HR staff manually answered a flood of repetitive emails about deductibles, plan tiers, and enrollment deadlines. She sets up a Claude Project, uploads the benefits handbook and the open-enrollment FAQ as knowledge sources, and writes instructions telling Claude to answer in a friendly tone and cite the relevant handbook section. Employees will be able to ask questions directly through this Project during the enrollment window.\n\nWhile planning the rollout, she recalls that a handful of questions each year don't fit the handbook cleanly — for example, whether a domestic partnership that isn't a legal marriage qualifies an employee for a special enrollment period. These have always been judgment calls that HR staff review individually rather than answer from a policy line.",
    "question": "As she finalizes the redesigned workflow, how should she handle this edge-case question type?",
    "options": {
      "C": "Configure the Project so Claude answers routine, handbook-covered questions directly but directs cases like this one to HR staff for a human decision.",
      "D": "Leave the edge case out of the redesign since it comes up rarely, and let Claude answer it the same way it answers everything else once asked.",
      "B": "Add an instruction telling Claude to always grant special enrollment requests so employees aren't delayed during the enrollment window.",
      "A": "Instruct Claude to answer using its general knowledge of benefits law whenever the handbook doesn't directly address a question."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. A well-designed integration matches each part of the workflow to what it's suited for: Claude handles the repetitive, well-documented questions the handbook already answers, while questions that have historically required individual HR judgment are routed to a person. This preserves the redesign's efficiency gains without automating a decision that was never rule-based.",
      "D": "Incorrect. Omitting the case from the redesign doesn't prevent it from occurring; without a defined path, the same ambiguous question will reach Claude anyway and be answered as if it were routine, silently reintroducing the risk the redesign should address.",
      "B": "Incorrect. This turns an eligibility judgment call that has always required individual review into an automatic approval, which could grant benefits eligibility incorrectly and removes the human check the case actually needs.",
      "A": "Incorrect. The organization's own handbook, not general knowledge about benefits law, is the authoritative source for this workflow; answering from outside that source on an already-ambiguous case increases the risk of a wrong answer being delivered with confidence."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.4-8a2bb186"
  },
  {
    "taskStatement": "D5.3",
    "domain": "D5",
    "scenario": "A Marketing Manager sets up a Claude Project for her team's monthly campaign-performance recaps. Her custom instructions read: \"Analyze the campaign data and write a helpful summary for stakeholders.\" When two teammates each run the same request against the same uploaded spreadsheet, one gets a two-paragraph narrative overview while the other gets a bulleted list heavy on technical metrics like CTR and CPM — neither matching what leadership actually wants to see.",
    "question": "What is the most likely reason the instructions are producing inconsistent, off-target output, and what should she do?",
    "options": {
      "B": "Claude cannot follow instructions consistently across different users, so she should abandon the Project and paste the instructions into chat each time instead.",
      "A": "The Project's knowledge source is outdated, so she should re-upload the spreadsheet before the next request.",
      "C": "The instructions are too vague to constrain the response — she should rewrite them to specify the audience, required sections, tone, and which metrics to include or exclude.",
      "D": "The teammates are on different model tiers, so she should require everyone to switch to Opus for this Project."
    },
    "correct": "C",
    "explanations": {
      "B": "Incorrect. The inconsistency traces to the instructions themselves being underspecified, not to an inherent limitation of Claude following instructions; rewriting the instructions to be specific solves it without discarding the Project's shared setup.",
      "A": "Incorrect. Nothing in the scenario points to stale data — both teammates analyzed the same source but framed the output completely differently, which is a hallmark of ambiguous instructions, not a data-currency issue.",
      "C": "Correct. Vague, general instructions like \"write a helpful summary\" leave format, tone, and content choices unconstrained, so each run fills the gaps differently. Effective system-level instructions are specific: they name the audience, required structure, tone, and which details matter, which narrows the range of acceptable outputs and produces consistent results.",
      "D": "Incorrect. Model tier affects reasoning depth and cost, not the specific gaps in tone, structure, and metric selection left open by the instructions — that is an instruction-design problem, not a model-selection one."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.3-8a838d5b"
  },
  {
    "taskStatement": "D5.3",
    "domain": "D5",
    "scenario": "An HR Business Partner sets up a Claude Project so her team can draft candidate rejection emails after final-round interviews. Her custom instructions read: \"Be professional and empathetic when writing rejection emails to candidates.\" After a week of use, a hiring manager on the team pastes in interview notes that include specific criticisms of a candidate's skills, and Claude produces a rejection email that repeats those specific criticisms as the stated reason the candidate wasn't selected. Legal has flagged that giving candidates specific, documentable reasons for rejection increases the company's exposure in discrimination disputes, and company policy is to keep rejection emails generic.",
    "question": "What change to the Project's custom instructions would most directly prevent this problem going forward?",
    "options": {
      "C": "Add more descriptive tone words, such as \"warm, kind, and respectful,\" so the email reads as more considerate to the candidate.",
      "A": "Instruct Claude to ask the hiring manager clarifying questions about the candidate before drafting each email.",
      "B": "Add an explicit rule that the stated reason for rejection must always stay generic, even when specific interview feedback or skill criticisms are pasted into the chat.",
      "D": "Lengthen the instructions with several paragraphs of general guidance on maintaining a positive employer brand."
    },
    "correct": "B",
    "explanations": {
      "C": "Incorrect. Warmer tone words make the writing sound more considerate but do nothing to stop specific criticisms from the pasted notes appearing as the rejection reason — the failure is a missing content boundary, not a tone problem.",
      "A": "Incorrect. Asking clarifying questions adds a conversational step but does not constrain what ends up in the final email; Claude could still incorporate specific criticisms once it has the details.",
      "B": "Correct. Effective system-level instructions are specific and unambiguous about what must and must not appear in the output. Naming the exact behavior to exclude — never restating specific feedback as the rejection reason, even if such notes are supplied — directly closes the gap that vague \"professional and empathetic\" phrasing left open.",
      "D": "Incorrect. More general, unrelated guidance on employer branding adds length without addressing the specific ambiguity that caused the problem; vague, broad instructions are the root issue, not a shortage of words."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.3-b42d5df5"
  },
  {
    "taskStatement": "D3.1",
    "domain": "D3",
    "scenario": "A marketing manager is scoping next year's category positioning and wants a broad, well-sourced view of competitor pricing changes, analyst commentary, and trade-press coverage from the last six months. She has no single document to upload — she needs Claude to go find and synthesize current information from many outside sources and hand back a cited summary she can drop into a planning deck.\n\nShe's used to running most of her day-to-day work — subject line drafts, meeting recaps — in her team's shared Project, which holds the brand style guide and campaign calendar as knowledge sources.",
    "question": "Which approach best fits this task?",
    "options": {
      "A": "Generate the summary as an artifact so it can be edited and reused across future planning cycles.",
      "B": "Add the competitor names to the Project's custom instructions so Claude prioritizes them in every reply.",
      "C": "Use research mode to have Claude search and synthesize current external sources into a cited summary.",
      "D": "Ask the question in the existing Project chat, since its knowledge sources already give Claude the needed context."
    },
    "correct": "C",
    "explanations": {
      "A": "Incorrect. An artifact is a format for holding and reusing content once it exists; it doesn't address how to gather current, cited information from outside sources in the first place.",
      "B": "Incorrect. Custom instructions shape tone and priorities for a Project's ongoing work; they do not give Claude the ability to search current external sources, which is what this task actually requires.",
      "C": "Correct. The task requires gathering and synthesizing current information from many outside sources with citations — that is what research mode is designed for, rather than relying on a fixed knowledge base or the model's training data alone.",
      "D": "Incorrect. The Project's knowledge sources are the brand style guide and campaign calendar — internal reference material, not current competitor pricing or trade-press coverage — so the existing Project setup does not supply what the task needs."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D3.1-4113f1bd"
  },
  {
    "taskStatement": "D5.2",
    "domain": "D5",
    "scenario": "Priya is the Operations Lead for a regional logistics company and manages a Claude Project called \"Vendor Contracts\" for her team. She has connected the team's Google Drive so the folder of vendor agreements syncs into the project as a knowledge source, and she has added several teammates as project members so they can use it for contract questions.\n\nA new operations coordinator joins the team and asks Priya whether, just by being added as a project member, they can see the vendor contract details and the custom instructions Priya wrote for the project, without needing any separate file access.",
    "question": "What should Priya tell the coordinator?",
    "options": {
      "A": "Yes — anyone added as a member of the project can see its knowledge sources and custom instructions.",
      "C": "No — custom instructions are private to the project owner and are never visible to other members.",
      "B": "Yes, but only after Priya manually shares each vendor document with the coordinator outside of Claude.",
      "D": "No — each teammate must individually re-upload the Drive files to their own account before they can view them."
    },
    "correct": "A",
    "explanations": {
      "A": "Correct. Members with access to a project can see its knowledge sources, including connected Drive content, and its custom instructions, so simply being added as a project member is sufficient.",
      "C": "Incorrect. Custom instructions are part of the project configuration visible to members with project access, not restricted to the owner alone.",
      "B": "Incorrect. This introduces an unnecessary manual sharing step outside the project; project membership itself governs visibility of the connected knowledge and instructions.",
      "D": "Incorrect. Project members don't need to individually re-upload or duplicate connected Drive content; the connected Drive folder is already part of the shared project knowledge."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.2-cbced3ae"
  },
  {
    "taskStatement": "D5.2",
    "domain": "D5",
    "scenario": "A project manager runs a Claude Project for a client rollout. The project's knowledge sources include a requirements document uploaded from a teammate's laptop plus a folder of specs connected directly from Google Drive. The PM notices Claude's answers about the specs reflect edits made in Drive that same morning, but has not separately verified the uploaded requirements document.\n\nA contractor is joining the team to help with testing, and the PM wants to understand what the contractor will be able to see before granting them access to the Project.",
    "question": "Before adding the contractor to the Project, what should the PM keep in mind about what the contractor will be able to see?",
    "options": {
      "B": "Once given access to the Project, the contractor will be able to see all of its knowledge sources and custom instructions, so access should be limited to what the contractor genuinely needs.",
      "D": "The contractor will see the Project's instructions but not its uploaded knowledge files, since those stay private to whoever originally added them.",
      "A": "Access can be granted without review, since Claude automatically redacts sensitive content from a project's knowledge for new members.",
      "C": "The contractor will only see the Google Drive specs, since Drive-connected files carry their own separate permissions that override the Project's access."
    },
    "correct": "B",
    "explanations": {
      "B": "Correct. Members with access to a Project can see its knowledge sources and instructions, so the PM should scope what the contractor is granted access to, or adjust the Project's contents, before adding them.",
      "D": "Incorrect. Uploaded knowledge sources are not walled off to only the person who added them; anyone with project access can see them along with the instructions.",
      "A": "Incorrect. There is no automatic redaction of project knowledge for new members, so granting access without reviewing what is inside the Project is not a safe assumption.",
      "C": "Incorrect. Project access is not split so that Drive-connected files stay visible while other knowledge sources are hidden; a member with project access sees the project's knowledge as a whole."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.2-636f547d"
  },
  {
    "taskStatement": "D5.2",
    "domain": "D5",
    "scenario": "Priya, an HR communications specialist, sets up a Claude Project to help draft materials for the upcoming benefits open enrollment period. She connects the team's Google Drive folder, which holds the current policy documents and plan comparison sheets, so Claude can reference them when drafting employee-facing emails and FAQs.\n\nA colleague from the marketing team offers to help polish the tone of the enrollment emails and asks Priya to add them to the Project so they can use Claude with the same context. Before adding the colleague, Priya pauses to think through what that access would actually expose.",
    "question": "What should Priya consider before adding the marketing colleague to the Project?",
    "options": {
      "C": "She should disconnect and reconnect the Google Drive folder each time Project membership changes, to refresh what the new member can see.",
      "B": "Only she, as the person who added the connector, can view the connected Drive documents; other Project members would not be able to see them.",
      "D": "Access doesn't matter, since Claude only shares the responses it generates, not the underlying connected files or custom instructions.",
      "A": "Anyone added to the Project can view its connected knowledge sources and custom instructions, so she should confirm the colleague is authorized to see the policy documents before granting access."
    },
    "correct": "A",
    "explanations": {
      "C": "Incorrect. There is no basis for a disconnect-and-reconnect step controlling per-member visibility; Project access is governed by membership, not by re-adding a connector.",
      "B": "Incorrect. This reverses the actual behavior: any member with access to the Project can see its connected knowledge sources, not only the person who originally added the connector.",
      "D": "Incorrect. Members with access to a Project can see its connected knowledge sources and custom instructions, not just Claude's generated replies, so this understates what the colleague would actually be able to view.",
      "A": "Correct. Connected knowledge sources and custom instructions are visible to anyone with access to the Project, so Priya's real decision is whether the colleague should be authorized to see that policy content, not a technical question about the connector itself."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D5.2-c80bb7cb"
  },
  {
    "taskStatement": "D4.5",
    "domain": "D4",
    "scenario": "An HR business partner has set up a Claude Project to help draft internal policy FAQs, using the employee handbook and past HR announcements as knowledge sources. A department head who has never used Claude asks her to write a short note to the leadership team recommending whether the whole HR function should adopt it, and specifically whether it could replace the HR helpdesk that answers employee questions about individual benefits and leave situations.",
    "question": "Which recommendation most accurately represents Claude's value and limitations to leadership?",
    "options": {
      "C": "Recommend adoption for FAQ and communication drafting, since that speeds up writing, but keep a human HR reviewer confirming any answer to an individual employee's benefits or leave question before it goes out.",
      "B": "Recommend against adoption anywhere in HR, since a tool that can occasionally produce incorrect wording is not appropriate for a function that handles employee-facing communications at all.",
      "D": "Recommend replacing the helpdesk outright, since the Project already contains the handbook and a well-configured Project answers individual employee cases with the same reliability as a trained specialist.",
      "A": "Recommend adoption for the helpdesk first, since employees benefit most from faster answers, and hold off on FAQ drafting until leadership has more experience evaluating its writing quality."
    },
    "correct": "C",
    "explanations": {
      "C": "Correct. Communicating Claude's value and limitations means naming concretely where it helps (faster FAQ and communications drafting) while flagging where unsupervised use is risky (individual benefit or leave determinations with real consequences for an employee), so human review stays at the point of impact.",
      "B": "Incorrect. This overcorrects by discarding a demonstrated, lower-stakes drafting benefit because of a risk that only applies to a different, higher-stakes use case; the two should be evaluated separately, not lumped together.",
      "D": "Incorrect. Having relevant knowledge sources in a Project does not make its output authoritative for case-specific decisions; individual employee circumstances still require a qualified reviewer, which this option removes entirely.",
      "A": "Incorrect. This reverses the appropriate order of caution: it hands the higher-stakes, employee-facing case work to Claude unsupervised first while delaying the safer, well-supported drafting use, understating where the real limitation lies."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.5-b12f776a"
  },
  {
    "taskStatement": "D4.5",
    "domain": "D4",
    "scenario": "A corporate trainer has been using Claude to draft practice questions, answer keys, and explanations for a new compliance certification course. The drafts have been well-organized and fast to produce, and the training director now wants to expand Claude's use to every course the team runs. Before approving the expansion, the director asks the trainer to present a short briefing to the leadership team on what Claude actually does well and where it needs oversight.",
    "question": "Which statement should the trainer include in the leadership briefing?",
    "options": {
      "D": "Claude can independently certify that a full course meets the organization's compliance and accuracy standards, so the SME review step can be removed from the workflow.",
      "B": "Claude's only real limitation is drafting speed compared to a human writer, so its value is mainly for teams that lack time to write content manually.",
      "C": "Because Claude produced the practice questions with confident, well-formatted language, the team can publish them without an additional SME review pass.",
      "A": "Claude speeds up drafting of practice questions and explanations, but the answer keys and explanations should still be reviewed by a subject-matter expert, since Claude can generate plausible-sounding but incorrect content."
    },
    "correct": "A",
    "explanations": {
      "D": "Incorrect. Overstating Claude as a certifier of compliance accuracy misrepresents its limitations; fluent output is not the same as verified correctness, and removing SME review increases the risk of publishing wrong content.",
      "B": "Incorrect. Framing the limitation as merely \"slower than a human\" understates the real risk, which is that generated content can be factually wrong despite reading well, not just a speed trade-off.",
      "C": "Incorrect. Confident, polished phrasing is not evidence of accuracy; treating fluency as a signal to skip review is the exact failure mode that communicating limitations honestly is meant to prevent.",
      "A": "Correct. Communicating Claude's value and limitations means being concrete about what it speeds up (drafting questions and explanations) while naming the specific risk that requires human oversight: it can produce plausible but incorrect content, so SME review of accuracy-critical material remains necessary."
    },
    "provenance": {
      "source": "seed-generated",
      "model": "claude-sonnet-5",
      "generatedAt": "2026-07-29",
      "reviewed": true
    },
    "id": "D4.5-94b40693"
  }
];
