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
  }
];
