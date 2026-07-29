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
  }
];
