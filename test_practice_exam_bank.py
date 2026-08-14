"""Tests for the CCAO-F practice exam question bank (practice-exam/questions.js).

The practice-exam directory name is hyphenated, so it cannot be imported as a
package; modules are loaded by file path instead (with the directory placed on
sys.path so their sibling imports resolve).
"""

import importlib.util
import sys
from pathlib import Path

import pytest

PRACTICE_EXAM_DIR = Path(__file__).parent / "practice-exam"


def load_practice_exam_module(filename):
    sys.path.insert(0, str(PRACTICE_EXAM_DIR))
    try:
        path = PRACTICE_EXAM_DIR / filename
        spec = importlib.util.spec_from_file_location(path.stem, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        return module
    finally:
        sys.path.remove(str(PRACTICE_EXAM_DIR))


exam_lib = load_practice_exam_module("exam_lib.py")


@pytest.fixture(scope="module")
def bank():
    return exam_lib.load_bank()


def make_valid_question():
    question = {
        "taskStatement": "D1.2",
        "domain": "D1",
        "scenario": "A production scenario.",
        "question": "What should you do?",
        "options": {"A": "First", "B": "Second", "C": "Third", "D": "Fourth"},
        "correct": "B",
        "explanations": {"A": "Wrong", "B": "Right", "C": "Wrong", "D": "Wrong"},
        "provenance": {
            "source": "official-sample",
            "model": None,
            "generatedAt": None,
            "reviewed": True,
        },
    }
    question["id"] = exam_lib.question_id(question)
    return question


@pytest.fixture
def covered_bank(bank):
    """Coverage gates below are dormant until the bank is actually grown.

    The committed bank starts as the three official guide samples only, so
    per-objective and per-domain minimums cannot be met yet. Skipping states that
    outright rather than asserting something weaker, so a thin bank never reads
    as a satisfied coverage guarantee. These activate on the first refill batch.
    """
    needed = exam_lib.MIN_PER_TASK * len(exam_lib.TASK_STATEMENTS)
    if len(bank) < needed:
        pytest.skip(
            f"bank holds {len(bank)} questions; coverage gates need >= {needed} "
            f"(MIN_PER_TASK={exam_lib.MIN_PER_TASK} x {len(exam_lib.TASK_STATEMENTS)} objectives). "
            "Grow it with generate_bank.py / the exam-refill skill."
        )
    return bank


def test_bank_loads_and_holds_the_official_samples(bank):
    assert isinstance(bank, list)
    official = [q for q in bank if q["provenance"]["source"] == "official-sample"]
    assert len(official) == 3, "the three exam-guide samples must stay in the bank"
    assert all(q["provenance"]["reviewed"] for q in bank)


def test_every_bank_entry_passes_validation(bank):
    for entry in bank:
        exam_lib.validate_question(entry)


def test_bank_ids_are_unique(bank):
    ids = [entry["id"] for entry in bank]
    assert len(ids) == len(set(ids))


def test_every_bank_entry_is_reviewed(bank):
    for entry in bank:
        assert entry["provenance"]["reviewed"] is True


def test_per_task_statement_minimum(covered_bank):
    bank = covered_bank
    counts = {ts: 0 for ts in exam_lib.TASK_STATEMENTS}
    for entry in bank:
        counts[entry["taskStatement"]] += 1
    short = {ts: n for ts, n in counts.items() if n < exam_lib.MIN_PER_TASK}
    assert not short, f"below MIN_PER_TASK={exam_lib.MIN_PER_TASK}: {short}"


def test_exam_form_quotas_sum_to_sixty():
    """Blueprint-level and bank-independent, so it always runs."""
    assert sum(exam_lib.EXAM_FORM_QUOTAS.values()) == 60
    assert set(exam_lib.EXAM_FORM_QUOTAS) == set(exam_lib.DOMAINS)


def test_bank_covers_a_full_exam_form(covered_bank):
    """Every domain must hold at least its 60-question exam-form quota."""
    bank = covered_bank
    per_domain = {}
    for entry in bank:
        per_domain[entry["domain"]] = per_domain.get(entry["domain"], 0) + 1
    for domain, quota in exam_lib.EXAM_FORM_QUOTAS.items():
        assert per_domain.get(domain, 0) >= quota, (
            f"{domain} has {per_domain.get(domain, 0)} questions, "
            f"exam form needs {quota}"
        )


def test_render_bank_round_trips_the_committed_file(bank):
    source = (PRACTICE_EXAM_DIR / "questions.js").read_text()
    assert exam_lib.render_bank(bank) == source


def test_task_statement_catalog_is_complete():
    assert len(exam_lib.TASK_STATEMENTS) == 30
    assert set(exam_lib.DOMAINS) == {"D1", "D2", "D3", "D4", "D5", "D6", "D7"}
    for ts in exam_lib.TASK_STATEMENTS:
        assert ts.split(".")[0] in exam_lib.DOMAINS


def test_validate_accepts_a_well_formed_question():
    exam_lib.validate_question(make_valid_question())


def test_validate_rejects_unknown_task_statement():
    question = make_valid_question()
    question["taskStatement"] = "D9.9"
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_rejects_domain_mismatch():
    question = make_valid_question()
    question["domain"] = "D2"
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_rejects_bad_correct_key():
    question = make_valid_question()
    question["correct"] = "E"
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_rejects_missing_option():
    question = make_valid_question()
    del question["options"]["D"]
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_rejects_stale_id():
    question = make_valid_question()
    question["scenario"] = "An edited scenario that no longer matches the id."
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_rejects_unreviewed_entry():
    question = make_valid_question()
    question["provenance"]["reviewed"] = False
    with pytest.raises(ValueError):
        exam_lib.validate_question(question)


def test_validate_without_provenance_for_generated_candidates():
    candidate = make_valid_question()
    del candidate["id"]
    del candidate["provenance"]
    exam_lib.validate_question(candidate, require_provenance=False)


# ── Bank building (generate_bank.py + exam_lib helpers) ────────────────────

generate_bank = load_practice_exam_module("generate_bank.py")


def make_candidate_for(task_statement, marker="x"):
    candidate = make_valid_question()
    del candidate["id"]
    del candidate["provenance"]
    candidate["taskStatement"] = task_statement
    candidate["domain"] = task_statement.split(".")[0]
    candidate["scenario"] = f"A production scenario ({marker})."
    return candidate


def test_attach_provenance_builds_a_pending_entry():
    entry = exam_lib.attach_provenance(
        make_candidate_for("D1.2"),
        source="seed-generated",
        model="claude-sonnet-5",
        generated_at="2026-07-02",
    )
    assert entry["id"] == exam_lib.question_id(entry)
    assert entry["provenance"] == {
        "source": "seed-generated",
        "model": "claude-sonnet-5",
        "generatedAt": "2026-07-02",
        "reviewed": False,
    }


def test_remaining_targets_skips_covered_statements():
    pending = [
        exam_lib.attach_provenance(make_candidate_for("D1.1", "a"), source="seed-generated"),
        exam_lib.attach_provenance(make_candidate_for("D1.1", "b"), source="seed-generated"),
    ]
    targets = generate_bank.remaining_targets(pending, per_task=2, tasks=["D1.1", "D1.2"])
    assert targets == {"D1.2": 2}


def test_merge_pending_sets_reviewed_and_recomputes_edited_ids():
    entry = exam_lib.attach_provenance(make_candidate_for("D2.2"), source="seed-generated")
    entry["scenario"] = "Edited during human review."  # id is now stale on purpose
    merged = generate_bank.merge_pending(exam_lib.load_bank(), [entry])
    added = merged[-1]
    assert added["provenance"]["reviewed"] is True
    assert added["id"] == exam_lib.question_id(added)
    for question in merged:
        exam_lib.validate_question(question)


def test_merge_pending_rejects_duplicates_of_bank_content():
    bank = exam_lib.load_bank()
    assert bank, "needs at least one committed question to duplicate"
    duplicate = {
        key: bank[0][key]
        for key in ("taskStatement", "domain", "scenario", "question",
                    "options", "correct", "explanations")
    }
    entry = exam_lib.attach_provenance(duplicate, source="seed-generated")
    with pytest.raises(ValueError):
        generate_bank.merge_pending(bank, [entry])


# ── Multiple-response items ────────────────────────────────────────────────
# The exam mixes multiple-choice with multiple-response items. A multi item
# carries five options and a list of correct keys; a single item keeps four and
# a bare string. Validation enforces the pairing so a half-formed item — five
# options but one answer, or two answers but four options — cannot reach the bank.


def make_multi_question():
    q = make_valid_question()
    q["options"]["E"] = "A fifth option, which only multi-select items carry."
    q["explanations"]["E"] = "Incorrect. Explained for parity with the other options."
    q["correct"] = ["B", "D"]
    q["selectCount"] = 2
    q["id"] = exam_lib.question_id(q)
    return q


def test_validate_accepts_a_multiple_response_question():
    exam_lib.validate_question(make_multi_question())


def test_multi_response_requires_five_options():
    q = make_multi_question()
    del q["options"]["E"]
    del q["explanations"]["E"]
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="A, B, C, D, E"):
        exam_lib.validate_question(q)


def test_single_answer_must_not_carry_a_fifth_option():
    q = make_valid_question()
    q["options"]["E"] = "A fifth option on a single-answer item."
    q["explanations"]["E"] = "Incorrect."
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="A, B, C, D"):
        exam_lib.validate_question(q)


def test_select_count_must_match_the_answer_key():
    q = make_multi_question()
    q["selectCount"] = 3  # claims three, lists two
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="selectCount"):
        exam_lib.validate_question(q)


def test_correct_list_rejects_duplicates():
    q = make_multi_question()
    q["correct"] = ["B", "B"]
    q["selectCount"] = 2
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="duplicate"):
        exam_lib.validate_question(q)


def test_correct_list_rejects_an_unknown_option_key():
    q = make_multi_question()
    q["correct"] = ["B", "Z"]
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError):
        exam_lib.validate_question(q)


def test_a_single_element_list_is_a_single_answer_item():
    """["B"] means one selection, so the item stays four-option."""
    q = make_valid_question()
    q["correct"] = ["B"]
    q["id"] = exam_lib.question_id(q)
    exam_lib.validate_question(q)


def test_summarize_for_avoid_handles_a_multi_response_answer():
    """It indexes explanations by the correct key, which is a list here."""
    summary = exam_lib.summarize_for_avoid(make_multi_question())
    assert "correct=B,D" in summary or "correct=B, D" in summary


def test_multi_response_round_trips_through_the_bank_file():
    entries = exam_lib.load_bank() + [
        exam_lib.attach_provenance(
            {k: v for k, v in make_multi_question().items()
             if k in exam_lib.CONTENT_FIELDS | {"selectCount"}},
            source="hand-authored",
        )
    ]
    rendered = exam_lib.render_bank(entries)
    assert '"selectCount": 2' in rendered
    assert '"correct": [' in rendered


# ── Study guide ────────────────────────────────────────────────────────────


def test_study_guide_covers_every_objective_verbatim():
    """associate_course.html is machine-written by build_course.py, which asserts
    its objective list matches TASK_STATEMENTS. This checks the *committed* HTML,
    so a stale guide can't survive a blueprint change unnoticed."""
    import html as html_mod

    guide = (PRACTICE_EXAM_DIR.parent / "associate_course.html")
    assert guide.exists(), "run practice-exam/build_course.py"
    doc = guide.read_text(encoding="utf-8")
    missing_ids = [o for o in exam_lib.TASK_STATEMENTS if f">{o}</div>" not in doc]
    assert not missing_ids, f"guide omits objectives: {missing_ids}"
    not_verbatim = [
        o for o, text in exam_lib.TASK_STATEMENTS.items()
        if html_mod.escape(text, quote=False) not in doc
    ]
    assert not not_verbatim, (
        f"objective text is not verbatim from the guide for: {not_verbatim}"
    )


def test_study_guide_states_the_numbering_is_not_anthropics():
    """The D<n>.<m> ids are this repo's invention; the guide must not imply
    otherwise, since a colleague could otherwise quote them as official."""
    doc = (PRACTICE_EXAM_DIR.parent / "associate_course.html").read_text(encoding="utf-8")
    assert "not" in doc and "Anthropic" in doc
    assert "unnumbered bullets" in doc


def test_exercises_cover_every_domain():
    """The four exercises must between them touch all seven domains — a gap here
    means a whole weighting slice has no hands-on practice. build_exercises.py
    asserts this at build time; this guards the committed HTML."""
    doc = (PRACTICE_EXAM_DIR.parent / "exercises.html")
    assert doc.exists(), "run practice-exam/build_exercises.py"
    text = doc.read_text(encoding="utf-8")
    for domain, name in exam_lib.DOMAINS.items():
        assert domain in text, f"{domain} is not referenced in the exercises"


def test_exercises_ship_answer_keys():
    """Two exercises are gated by planted defects with a key rather than a rubric.
    That is what makes the heaviest domain self-scorable, so the keys must exist."""
    text = (PRACTICE_EXAM_DIR.parent / "exercises.html").read_text(encoding="utf-8")
    assert text.count("<details>") >= 6, "answer keys are missing from the exercises"
    assert "9 planted" in text or "planted" in text
    assert "Show the answer key" in text


def test_exercises_forbid_outsourcing_the_judgment():
    """The exercises are worthless if a learner asks Claude to find the planted
    defects or classify the triage items, so the page must say so explicitly."""
    text = (PRACTICE_EXAM_DIR.parent / "exercises.html").read_text(encoding="utf-8")
    assert "Do not ask it to find the planted defects" in text


# ── Sequencing items ───────────────────────────────────────────────────────
# A sequencing item asks the candidate to put five numbered steps in order. It is
# structurally a single-answer multiple-choice question whose five options are five
# candidate orderings — so it needs 5 options with 1 correct answer, a shape the
# original validation rejected because it coupled option count to answer count.
#
# The distractor architecture is reported first-hand from a real sitting: of the
# five orderings, exactly two share the same first and last step, and the contest
# is which of that pair orders the middle correctly. The other three are
# eliminable on first or last alone. That is a checkable contract, so validation
# enforces it rather than trusting the author.


def make_sequencing_question():
    """Steps 1-5. Correct order is 3,1,4,2,5. Options C and E share first=3,
    last=5 — they are the real contest. A, B and D open on 1, 2 and 4: three
    distinct steps, none of them 3, so the pair's opening belongs to the pair
    alone and eliminating on the first step removes all three at once. Only A
    also closes on 5."""
    q = make_valid_question()
    q["taskStatement"], q["domain"] = "D1.2", "D1"
    q["itemType"] = "sequencing"
    q["scenario"] = (
        "A team is setting up a Claude Project for their weekly report. The steps, "
        "in no particular order: (1) write custom instructions describing the "
        "format, (2) run the task once and check the output, (3) create the "
        "Project, (4) add the source spreadsheets as knowledge, (5) refine the "
        "instructions based on what the first run got wrong."
    )
    q["question"] = "Which sequence puts the five steps in the correct order?"
    q["options"] = {
        "A": "1 → 3 → 4 → 2 → 5",
        "B": "2 → 3 → 1 → 5 → 4",
        "C": "3 → 4 → 1 → 2 → 5",
        "D": "4 → 3 → 1 → 5 → 2",
        "E": "3 → 1 → 4 → 2 → 5",
    }
    q["correct"] = "E"
    q["explanations"] = {k: f"Explanation for option {k}." for k in "ABCDE"}
    q["id"] = exam_lib.question_id(q)
    return q


def test_validate_accepts_a_well_formed_sequencing_question():
    exam_lib.validate_question(make_sequencing_question())


def test_sequencing_needs_five_options():
    q = make_sequencing_question()
    del q["options"]["E"], q["explanations"]["E"]
    q["correct"] = "C"
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="five"):
        exam_lib.validate_question(q)


def test_sequencing_options_must_be_permutations_of_the_same_steps():
    q = make_sequencing_question()
    q["options"]["B"] = "3 → 4 → 1 → 5 → 6"  # 6 is not one of the five steps
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="permutation"):
        exam_lib.validate_question(q)


def test_sequencing_needs_exactly_two_options_sharing_first_and_last():
    """Three sharing first+last means three survive the elimination pass, which
    is not the shape the real exam uses."""
    q = make_sequencing_question()
    q["options"]["B"] = "3 → 1 → 2 → 4 → 5"  # now B, C and E all start 3 end 5
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="first and last"):
        exam_lib.validate_question(q)


def test_sequencing_distractors_must_not_open_on_the_pair_first_step():
    """The defect found by inspecting drawn items: "exactly two share first AND
    last" is satisfiable while a third option still opens on the pair's first
    step, because its last step differs. Eliminating on the opening then removes
    two distractors instead of three, and the technique the study guide teaches
    only half works."""
    q = make_sequencing_question()
    q["options"]["B"] = "3 → 2 → 1 → 5 → 4"  # opens on 3, same as the C/E pair
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="first step"):
        exam_lib.validate_question(q)


def test_sequencing_distractors_must_open_on_distinct_steps():
    """Two distractors sharing an opening wastes one of the three eliminations."""
    q = make_sequencing_question()
    q["options"]["B"] = "4 → 2 → 1 → 5 → 3"  # opens on 4, same as D
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="first step"):
        exam_lib.validate_question(q)


def test_sequencing_allows_at_most_one_distractor_to_close_on_the_pair_last_step():
    """A real form was observed with four of five options closing on the same
    step, which leaves the ending carrying almost no signal."""
    q = make_sequencing_question()
    q["options"]["B"] = "2 → 3 → 1 → 4 → 5"  # closes on 5; A already does
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="last step"):
        exam_lib.validate_question(q)


def test_sequencing_correct_answer_must_be_in_the_contested_pair():
    """If the key is eliminable on first or last, the item is trivially wrong."""
    q = make_sequencing_question()
    q["correct"] = "A"  # A starts with 1, so it is eliminated in the first pass
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="contested pair"):
        exam_lib.validate_question(q)


def test_sequencing_is_single_answer_only():
    q = make_sequencing_question()
    q["correct"] = ["C", "E"]
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="single"):
        exam_lib.validate_question(q)


def test_a_standard_single_answer_item_still_needs_exactly_four_options():
    """Relaxing the option count for sequencing must not relax it generally."""
    q = make_valid_question()
    q["options"]["E"] = "A fifth option on a standard item."
    q["explanations"]["E"] = "Incorrect."
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="A, B, C, D"):
        exam_lib.validate_question(q)


def test_unknown_item_type_is_rejected():
    q = make_sequencing_question()
    q["itemType"] = "matching"
    q["id"] = exam_lib.question_id(q)
    with pytest.raises(ValueError, match="itemType"):
        exam_lib.validate_question(q)


def test_no_answer_position_tell_in_the_bank(bank):
    """A position a candidate can bet on is worth free marks without knowledge.

    This exists because hand-authored questions bypass normalize_pending.py by
    definition — they never enter the pending file — and the first seven
    hand-authored sequencing items all landed on E. Generated batches are
    permuted before merge; hand-authored ones need `normalize_pending.py --bank`.
    """
    from collections import Counter

    positions = Counter(k for q in bank for k in exam_lib.correct_keys(q))
    total = sum(positions.values())
    worst_key, worst_n = positions.most_common(1)[0]
    assert worst_n / total < 0.40, (
        f"answer position {worst_key} holds {worst_n / total:.0%} of correct answers "
        f"({dict(positions)}); run normalize_pending.py --bank"
    )


def test_sequencing_answers_are_not_all_on_one_option(bank):
    """The specific failure that happened: every sequencing key on the same letter."""
    seq = [q for q in bank if q.get("itemType") == "sequencing"]
    if len(seq) < 3:
        pytest.skip(f"only {len(seq)} sequencing questions; a spread is not meaningful yet")
    keys = {q["correct"] for q in seq}
    assert len(keys) > 1, (
        f"all {len(seq)} sequencing questions key to {keys.pop()} — a free-marks tell"
    )


# ── Artifact builders actually run ────────────────────────────────────────
# The tests above assert only that the generated HTML exists and has content,
# so a builder that raises on import or in its build-time guards stays invisible
# to pytest. That is not hypothetical: a guard was once added to
# build_exercises.py that raised NameError on every run, and the full suite
# still passed. These tests run each builder and require the committed artifact
# to be byte-identical afterwards, which catches both a broken builder and an
# artifact left stale relative to the data it is generated from.

@pytest.mark.parametrize("script,artifact", [
    ("build_course.py", "associate_course.html"),
    ("build_exercises.py", "exercises.html"),
])
def test_builder_runs_and_committed_artifact_is_current(script, artifact):
    import subprocess
    path = PRACTICE_EXAM_DIR.parent / artifact
    before = path.read_bytes()
    result = subprocess.run(
        [sys.executable, str(PRACTICE_EXAM_DIR / script)],
        capture_output=True, text=True,
    )
    after = path.read_bytes()
    if after != before:
        path.write_bytes(before)  # a test must not mutate the working tree
    assert result.returncode == 0, f"{script} failed:\n{result.stderr}"
    assert after == before, (
        f"{artifact} is stale — {script} regenerates it differently. "
        f"Run practice-exam/{script} and commit the result.")


def test_multiple_response_items_carry_no_group_length_bias(bank):
    """The correct pair must not be sortable out by length, in either direction.

    The single-longest-option check does not see this shape: with two correct
    options neither need be the outright longest while the pair still runs
    consistently longer. Measured on the first hand-authored batch, the correct
    pair WAS the two longest in 6 of 11 items — a candidate could have scored 55%
    on those without reading a word. Correcting only that direction then pushed
    seven items past parity into the mirror tell, so this asserts both ends.
    """
    multi = [q for q in bank if len(exam_lib.correct_keys(q)) > 1]
    if len(multi) < 5:
        pytest.skip(f"only {len(multi)} multiple-response items; a bias read is not meaningful")
    biased = {
        q["id"]: round(exam_lib.length_bias(q), 2)
        for q in multi
        if abs(exam_lib.length_bias(q) - 1) > 0.15
        or exam_lib.correct_are_length_extreme(q)
    }
    assert not biased, (
        "correct options are separable by length alone in: "
        f"{biased} (1.0 is parity; lengthen the distractors, never trim the key)")


def test_multiple_response_stems_do_not_hardcode_the_select_count(bank):
    """exam.html appends "(Select N.)" itself, so a stem that also spells it out
    renders as "(Select two.) (Select 2.)". Ten items shipped that way in one
    batch before it was spotted in the browser."""
    import re
    offenders = [
        q["taskStatement"] for q in bank
        if len(exam_lib.correct_keys(q)) > 1
        and re.search(r"\(select \w+\.?\)", q["question"], re.I)
    ]
    assert not offenders, (
        f"stems restate the selection count the renderer adds: {offenders}")
