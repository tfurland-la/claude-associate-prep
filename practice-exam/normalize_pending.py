"""Randomize option order across questions_pending.json.

Why this exists as a step rather than a prompt instruction: a generator has a
positional habit. The first CCAO-F batch put 68% of correct answers on B, which a
test-wise candidate can exploit without knowing any of the material. The prompt
now asks for variety, but asking is weaker than enforcing — permuting the options
after generation removes positional bias regardless of what the model did.

Permuting is safe because the four (or five) options are independent alternatives:
remap options, explanations and the correct key together and the item is
unchanged apart from which letter carries which text.

Seeded, so a rerun on the same file gives the same result and a review is not
invalidated by re-running the tool.

    python3 practice-exam/normalize_pending.py [--seed N]
    python3 practice-exam/normalize_pending.py --bank   # hand-authored items only

Hand-authored questions never pass through the pending file, so they skip this
step by definition — and it shows. The first seven hand-authored sequencing items
all had their answer at E, a 100% tell worth seven free marks to anyone who
noticed. --bank permutes the committed hand-authored items to close that gap.
It changes their ids (the id hashes the option block), which orphans the
"already seen" record for those questions in anyone's saved progress. That is a
deliberate trade: a stale seen-flag costs a repeated question, a position tell
costs the exam its validity.
"""

import argparse
import json
import random
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import exam_lib  # noqa: E402

PENDING_PATH = exam_lib.PRACTICE_EXAM_DIR / "questions_pending.json"


def permute(question, rng):
    keys = sorted(question["options"])
    shuffled = keys[:]
    rng.shuffle(shuffled)
    # old key -> new key
    mapping = dict(zip(shuffled, keys))
    question["options"] = {mapping[k]: question["options"][k] for k in keys}
    question["explanations"] = {mapping[k]: question["explanations"][k] for k in keys}
    raw = question["correct"]
    if isinstance(raw, list):
        question["correct"] = sorted(mapping[k] for k in raw)
    else:
        question["correct"] = mapping[raw]
    question["id"] = exam_lib.question_id(question)  # id hashes the option block
    return question


def normalize_bank(seed):
    """Permute the committed hand-authored questions. Generated ones were already
    permuted before merge, so re-permuting them would churn ids for nothing."""
    bank = exam_lib.load_bank()
    targets = [q for q in bank if q["provenance"]["source"] == "hand-authored"]
    if not targets:
        print("no hand-authored questions in the bank")
        return 0
    before = Counter(k for q in targets for k in exam_lib.correct_keys(q))
    rng = random.Random(seed)
    for q in targets:
        permute(q, rng)
        exam_lib.validate_question(q)  # re-checks the sequencing architecture too
    after = Counter(k for q in targets for k in exam_lib.correct_keys(q))
    assert len({q["id"] for q in bank}) == len(bank), "permutation collided two ids"
    exam_lib.BANK_PATH.write_text(exam_lib.render_bank(bank), encoding="utf-8")
    fmt = lambda c: "  ".join(f"{k}={c.get(k,0)}" for k in "ABCDE" if c.get(k))  # noqa: E731
    print(f"permuted {len(targets)} hand-authored questions (seed {seed})")
    print(f"  before: {fmt(before)}")
    print(f"  after : {fmt(after)}")
    whole = Counter(k for q in bank for k in exam_lib.correct_keys(q))
    print(f"  whole bank now: {fmt(whole)} "
          f"(worst {max(whole.values())/sum(whole.values()):.0%})")
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--seed", type=int, default=20260729)
    ap.add_argument("--bank", action="store_true",
                    help="permute committed hand-authored questions instead of pending")
    args = ap.parse_args()

    if args.bank:
        return normalize_bank(args.seed)

    if not PENDING_PATH.exists():
        print("no pending file")
        return 1
    pending = json.loads(PENDING_PATH.read_text(encoding="utf-8"))
    before = Counter(k for q in pending for k in exam_lib.correct_keys(q))

    rng = random.Random(args.seed)
    for q in pending:
        permute(q, rng)
        # A permutation must not change what the item asks or how it scores.
        content = {k: v for k, v in q.items() if k not in ("id", "provenance")}
        exam_lib.validate_question(content, require_provenance=False)

    after = Counter(k for q in pending for k in exam_lib.correct_keys(q))
    PENDING_PATH.write_text(
        json.dumps(pending, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    total = sum(after.values())
    fmt = lambda c: "  ".join(f"{k}={c.get(k,0)}" for k in "ABCDE" if c.get(k))  # noqa: E731
    print(f"permuted {len(pending)} candidates (seed {args.seed})")
    print(f"  before: {fmt(before)}")
    print(f"  after : {fmt(after)}")
    if total:
        print(f"  worst position now holds {max(after.values())/total:.0%} "
              f"(was {max(before.values())/sum(before.values()):.0%})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
