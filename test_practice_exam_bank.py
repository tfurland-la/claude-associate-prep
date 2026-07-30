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
