"""Compare two independent reviewers' verdicts over the pending questions.

The review gate here is two-model consensus rather than one human read. This
script makes that gate mechanical: questions both reviewers accept pass, and
anything they disagree on — or either one rejects — is surfaced for a decision
instead of being silently averaged.

Each reviewer writes {"<index>": {"verdict": "ACCEPT|REJECT", "reason": "..."}}.

    python3 practice-exam/compare_reviews.py <a.json> <b.json> [--label-a X --label-b Y]
"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import exam_lib  # noqa: E402

PENDING_PATH = exam_lib.PRACTICE_EXAM_DIR / "questions_pending.json"


def load(path):
    raw = json.loads(Path(path).read_text(encoding="utf-8"))
    return {int(k): v for k, v in raw.items()}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("a")
    ap.add_argument("b")
    ap.add_argument("--label-a", default="A")
    ap.add_argument("--label-b", default="B")
    args = ap.parse_args()

    pending = json.loads(PENDING_PATH.read_text(encoding="utf-8"))
    a, b = load(args.a), load(args.b)

    all_idx = set(range(len(pending)))
    missing_a, missing_b = sorted(all_idx - set(a)), sorted(all_idx - set(b))

    def verdict(d, i):
        return (d.get(i) or {}).get("verdict", "MISSING").upper()

    both_accept, both_reject, disagree = [], [], []
    for i in sorted(all_idx):
        va, vb = verdict(a, i), verdict(b, i)
        if va == vb == "ACCEPT":
            both_accept.append(i)
        elif va == vb == "REJECT":
            both_reject.append(i)
        else:
            disagree.append((i, va, vb))

    total = len(pending)
    print(f"{total} pending questions · reviewer {args.label_a} vs {args.label_b}\n")
    if missing_a:
        print(f"!! {args.label_a} returned no verdict for {len(missing_a)}: {missing_a[:20]}")
    if missing_b:
        print(f"!! {args.label_b} returned no verdict for {len(missing_b)}: {missing_b[:20]}")
    if missing_a or missing_b:
        print("   Incomplete coverage — an unreviewed question must not be treated as accepted.\n")

    agree = len(both_accept) + len(both_reject)
    print(f"both ACCEPT : {len(both_accept)}")
    print(f"both REJECT : {len(both_reject)}")
    print(f"DISAGREE    : {len(disagree)}")
    print(f"agreement   : {agree}/{total} ({agree/max(1,total):.0%})\n")

    if both_reject:
        print("── Both reject (drop these) ──")
        for i in both_reject:
            ts = pending[i]["taskStatement"]
            print(f"  [{i}] {ts}")
            print(f"      {args.label_a}: {(a.get(i) or {}).get('reason','')[:120]}")
            print(f"      {args.label_b}: {(b.get(i) or {}).get('reason','')[:120]}")
        print()

    if disagree:
        print("── Disagreement (needs a decision) ──")
        for i, va, vb in disagree:
            ts = pending[i]["taskStatement"]
            print(f"  [{i}] {ts}  {args.label_a}={va}  {args.label_b}={vb}")
            for label, d in ((args.label_a, a), (args.label_b, b)):
                reason = (d.get(i) or {}).get("reason", "")
                if reason:
                    print(f"      {label}: {reason[:160]}")
        print()

    # Coverage if only the agreed-accepted questions are merged.
    from collections import Counter
    bank = exam_lib.load_bank()
    c = Counter([pending[i]["taskStatement"] for i in both_accept]
                + [q["taskStatement"] for q in bank])
    short = {ts: c.get(ts, 0) for ts in exam_lib.TASK_STATEMENTS
             if c.get(ts, 0) < exam_lib.MIN_PER_TASK}
    print(f"merging only the {len(both_accept)} agreed-accepted (plus {len(bank)} banked):")
    print(f"  objectives below MIN_PER_TASK={exam_lib.MIN_PER_TASK}: {short or 'none — gate clears'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
