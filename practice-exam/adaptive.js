// Adaptive core for the CCAO-F local practice exam. Pure logic, no DOM and no
// I/O, so the same file runs in the browser (window.CCAOF_ADAPTIVE) and under
// `node --test` (module.exports). Numbers mirror practice_exam_spec.md:
// correct x0.7 (floor 0.5), incorrect x1.5 (cap 5.0), domain overlay, and a
// cooldown on the last 5 task statements in history.
"use strict";

const TASK_STATEMENTS = {
  "D1.1": "Create effective prompts for business and technical tasks",
  "D1.2": "Apply task decomposition techniques to structure complex requests",
  "D1.3": "Iterate prompts to improve output quality",
  "D1.4": "Adapt prompting strategies based on task type (analysis, research, drafting, brainstorming)",
  "D2.1": "Evaluate Claude-generated outputs for accuracy and completeness",
  "D2.2": "Identify hallucinations, inconsistencies, and biases in responses",
  "D2.3": "Apply fact-checking and validation techniques",
  "D2.4": "Determine when human review or additional verification is required",
  "D2.5": "Edit, adapt, refine, and compare outputs for the intended audience",
  "D2.6": "Organize and curate information and select appropriate output formats (artifacts, inline, structured data)",
  "D3.1": "Select appropriate Claude product features (Projects, research mode, chat, artifacts)",
  "D3.2": "Differentiate between Claude model types (Haiku, Sonnet, Opus)",
  "D3.3": "Align model selection with task requirements (cost, speed, quality)",
  "D3.4": "Understand and manage context limitations and memory considerations (when to restart, summarize, or persist)",
  "D4.1": "Apply Claude to analyze requirements and use cases",
  "D4.2": "Leverage Claude for research, planning, and process optimization",
  "D4.3": "Use Claude to support solution design, development, and iteration",
  "D4.4": "Integrate Claude into existing workflows to augment or redesign them",
  "D4.5": "Communicate Claude's value and limitations to stakeholders",
  "D5.1": "Configure Claude Projects with instructions and knowledge sources",
  "D5.2": "Manage uploaded knowledge and connectors (e.g., Google Drive, Gmail)",
  "D5.3": "Create effective system-level instructions",
  "D5.4": "Inform, maintain, and update Claude configurations, knowledge sources, and instructions",
  "D6.1": "Identify appropriate and inappropriate use cases",
  "D6.2": "Apply data sensitivity, regulatory, and privacy considerations",
  "D6.3": "Follow organizational AI policies and governance standards",
  "D6.4": "Understand the ethical implications of AI usage",
  "D7.1": "Identify, diagnose, and resolve issues with underperforming prompts or poor outputs",
  "D7.2": "Adjust approach based on feedback and results",
  "D7.3": "Optimize workflows for efficiency and effectiveness",
};

const DOMAINS = {
  D1: "Prompting and Task Execution",
  D2: "Output Evaluation and Validation",
  D3: "Product and Model Selection",
  D4: "Workflow Integration and Solution Design",
  D5: "Configuration and Knowledge Management",
  D6: "Governance, Risk, and Responsible Use",
  D7: "Troubleshooting and Optimization",
};

// Published domain weights (14/21/12/16/12/15/10) normalized to the smallest domain.
const DOMAIN_FACTORS = { D1: 1.4, D2: 2.1, D3: 1.2, D4: 1.6, D5: 1.2, D6: 1.5, D7: 1.0 };

const CORRECT_MULTIPLIER = 0.7;
const INCORRECT_MULTIPLIER = 1.5;
const WEIGHT_FLOOR = 0.5;
const WEIGHT_CAP = 5.0;
const COOLDOWN_SIZE = 5;
const HISTORY_LIMIT = 50;
const EXAM_HISTORY_LIMIT = 20;

// ── Coverage-first + difficulty tiering ───────────────────────────────────
// A statement seeded/weighted high but barely tested is a blind spot the pure
// weighted-random draw can starve for many questions. Coverage-first
// guarantees every statement at weight >= 2.0 is seen at least twice before
// selection reverts to weighted-random. Difficulty escalates once a statement
// is demonstrably mastered at standard tier, and a conditional floor keeps
// mastered statements selectable so hard variants actually get asked before
// their earned decay is allowed to suppress them.
const COVERAGE_WEIGHT_THRESHOLD = 2.0;
const COVERAGE_TARGET_SEEN = 2;
const HARD_MASTERY_SEEN = 3; // seen >= this and 100% -> hard variants
const HARD_FLOOR = 1.0; // effective-weight floor for hard-eligible statements
const HARD_FLOOR_RELEASE = 2; // hard answers after which the floor releases

// Per-statement counters with the tier fields defaulted, so imported state
// (which only carries {seen, correct}) reads cleanly.
function taskStat(state, ts) {
  const p = (state.stats.perTask || {})[ts] || {};
  return {
    seen: p.seen || 0,
    correct: p.correct || 0,
    stdSeen: p.stdSeen || 0,
    stdCorrect: p.stdCorrect || 0,
    hardSeen: p.hardSeen || 0,
    hardCorrect: p.hardCorrect || 0,
  };
}

// Statements owed coverage: weight >= 2.0 and not yet seen twice. Optionally
// intersected with an availability map (static bank mode).
function coverageOwed(state, availability) {
  const owed = [];
  for (const ts of Object.keys(TASK_STATEMENTS)) {
    if ((state.weights[ts] || 0) < COVERAGE_WEIGHT_THRESHOLD) continue;
    if (taskStat(state, ts).seen >= COVERAGE_TARGET_SEEN) continue;
    if (availability && !((availability[ts] || 0) > 0)) continue;
    owed.push(ts);
  }
  return owed;
}

function inCoveragePhase(state) {
  return coverageOwed(state).length > 0;
}

// Difficulty tier for the next question on a statement. seen==0 -> standard
// (first exposure). seen>=3 with a perfect record -> hard (mastery bar). One
// correct STANDARD answer earned in-app -> hard (second-pass escalation).
// Imported correct answers carry no tier tag, so they raise the mastery-bar
// counts but do not by themselves trigger second-pass escalation.
function difficultyFor(state, ts) {
  const p = taskStat(state, ts);
  if (p.seen === 0) return "standard";
  if (p.seen >= HARD_MASTERY_SEEN && p.correct === p.seen) return "hard";
  if (p.stdCorrect >= 1) return "hard";
  return "standard";
}

function hardEligible(state, ts) {
  return difficultyFor(state, ts) === "hard";
}

// A 60-question exam form mirroring the published domain weighting
// (14/21/12/16/12/15/10% -> 8/13/7/10/7/9/6). Matches EXAM_FORM_QUOTAS in exam_lib.py.
const EXAM_FORM_QUOTAS = { D1: 8, D2: 13, D3: 7, D4: 10, D5: 7, D6: 9, D7: 6 };
const EXAM_MINUTES = 120;
const PASSING_SCALED_SCORE = 720;

// Timed-mode difficulty spread over the 60-question form: ~60% standard (mid),
// 25% harder, 15% hard-tail — reproducing the guide samples' spread, not a
// uniform hard level. Standard is the remainder (60 - 15 - 9 = 36).
const EXAM_HARDER = 15;
const EXAM_HARD_TAIL = 9;

function makeSeedWeights(seed) {
  const weights = {};
  for (const ts of Object.keys(TASK_STATEMENTS)) {
    weights[ts] = seed && seed[ts] !== undefined ? seed[ts] : 1.0;
  }
  return weights;
}

function initialState(seed) {
  return {
    version: 1,
    weights: makeSeedWeights(seed),
    stats: { totalAnswered: 0, totalCorrect: 0, totalFlagged: 0, perTask: {} },
    history: [],
    seen: {},
    flagged: [],
    examHistory: [],
  };
}

function cooldownSet(state) {
  const recent = state.history.slice(-COOLDOWN_SIZE);
  return new Set(recent.map((entry) => entry.t));
}

// availability (optional): map of taskStatement -> question count; statements
// absent or 0 are excluded from the draw. Omit it in dynamic mode, where any
// statement can be generated.
function effectiveWeights(state, opts) {
  const options = opts || {};
  const cooled = options.ignoreCooldown ? new Set() : cooldownSet(state);
  const eff = {};
  for (const ts of Object.keys(TASK_STATEMENTS)) {
    const available = !options.availability || (options.availability[ts] || 0) > 0;
    if (!available || cooled.has(ts)) {
      eff[ts] = 0; // never floored: the floor must not resurrect an excluded statement
      continue;
    }
    let base = state.weights[ts] * DOMAIN_FACTORS[ts.split(".")[0]];
    // Conditional floor: keep a mastered (hard-eligible) statement selectable
    // at eff >= 1.0 until it has answered HARD_FLOOR_RELEASE hard variants,
    // then release it to its earned decay. A floor, not a boost — it lifts
    // only what sits below 1.0 and preserves the ordering of everything above.
    if (hardEligible(state, ts) && taskStat(state, ts).hardSeen < HARD_FLOOR_RELEASE) {
      base = Math.max(base, HARD_FLOOR);
    }
    eff[ts] = base;
  }
  return eff;
}

// Coverage-first pick: strictly least-seen owed statement (so the never-tested
// ones come first), effective weight then task-statement id as tiebreaks, the
// standard cooldown to prevent repeats, and a domain-interleave nudge so equal-
// priority picks don't stack the same domain back-to-back (which would
// telegraph the answer category).
function coveragePick(state, owed) {
  const cooled = cooldownSet(state);
  let pool = owed.filter((ts) => !cooled.has(ts));
  if (!pool.length) pool = owed.slice(); // everything cooled -> ignore cooldown
  const seenOf = (ts) => taskStat(state, ts).seen;
  const minSeen = Math.min(...pool.map(seenOf));
  const metric = (ts) => state.weights[ts] * DOMAIN_FACTORS[ts.split(".")[0]];
  const top = pool
    .filter((ts) => seenOf(ts) === minSeen)
    .sort((a, b) => metric(b) - metric(a) || (a < b ? -1 : a > b ? 1 : 0));
  const prev = state.history[state.history.length - 1];
  const prevDomain = prev ? prev.t.split(".")[0] : null;
  if (prevDomain && top[0].split(".")[0] === prevDomain) {
    const alt = top.find((ts) => ts.split(".")[0] !== prevDomain);
    if (alt) return alt; // same-seen, different-domain alternative exists
  }
  return top[0];
}

function weightedDraw(eff, rng) {
  const total = Object.values(eff).reduce((sum, w) => sum + w, 0);
  if (total <= 0) return null;
  let cursor = (rng || Math.random)() * total;
  for (const ts of Object.keys(eff)) {
    cursor -= eff[ts];
    if (cursor < 0) return ts;
  }
  return null; // unreachable barring floating-point edge; caller treats as no-draw
}

function drawTaskStatement(state, opts) {
  const options = opts || {};
  // `exclude` removes the statement currently on screen: render-time prefetch
  // draws before that question is graded, so without this the same statement
  // (still showing seen<target) would be drawn back-to-back. Best-effort — if
  // excluding it would leave nothing to draw, the exclusion is dropped.
  const exclude = options.exclude || null;

  // Coverage-first phase takes precedence over weighted-random until every
  // weight>=2 statement has been seen twice.
  const owed = coverageOwed(state, options.availability);
  if (owed.length) {
    const pool = exclude && owed.some((ts) => ts !== exclude)
      ? owed.filter((ts) => ts !== exclude)
      : owed;
    return coveragePick(state, pool);
  }
  const drawWith = (ignoreCooldown) => {
    const eff = effectiveWeights(state, {
      availability: options.availability,
      ignoreCooldown,
    });
    if (exclude && Object.keys(eff).some((ts) => ts !== exclude && eff[ts] > 0)) {
      eff[exclude] = 0;
    }
    return weightedDraw(eff, options.rng);
  };
  let ts = drawWith(false);
  if (ts === null) ts = drawWith(true); // cooldown emptied the pool; redraw
  return ts;
}

function availabilityFromBank(bank, flagged) {
  const blocked = new Set(flagged || []);
  const counts = {};
  for (const question of bank) {
    if (blocked.has(question.id)) continue;
    counts[question.taskStatement] = (counts[question.taskStatement] || 0) + 1;
  }
  return counts;
}

function pickBankQuestion(bank, taskStatement, state, opts) {
  const options = opts || {};
  const blocked = new Set(state.flagged);
  const candidates = bank.filter(
    (q) => q.taskStatement === taskStatement && !blocked.has(q.id)
  );
  if (candidates.length === 0) return null;
  const unseen = candidates.filter((q) => state.seen[q.id] === undefined);
  if (unseen.length > 0) {
    return unseen[Math.floor((options.rng || Math.random)() * unseen.length)];
  }
  return candidates.reduce((oldest, q) =>
    state.seen[q.id] < state.seen[oldest.id] ? q : oldest
  );
}

function applyAnswer(state, answer) {
  const ts = answer.taskStatement;
  const difficulty = answer.difficulty === "hard" ? "hard" : "standard";
  const multiplier = answer.correct ? CORRECT_MULTIPLIER : INCORRECT_MULTIPLIER;
  const updated = state.weights[ts] * multiplier;
  state.weights[ts] = answer.correct
    ? Math.max(WEIGHT_FLOOR, updated)
    : Math.min(WEIGHT_CAP, updated);

  state.stats.totalAnswered += 1;
  if (answer.correct) state.stats.totalCorrect += 1;
  const perTask = state.stats.perTask[ts] || { seen: 0, correct: 0 };
  perTask.seen += 1;
  if (answer.correct) perTask.correct += 1;
  // Per-tier counters drive difficulty escalation and the floor release, and
  // survive history trimming (unlike counting from the rolling history).
  const seenKey = difficulty === "hard" ? "hardSeen" : "stdSeen";
  const correctKey = difficulty === "hard" ? "hardCorrect" : "stdCorrect";
  perTask[seenKey] = (perTask[seenKey] || 0) + 1;
  // Always a number (0 when this answer was wrong), so an exported record
  // shows the tier's correct count explicitly rather than by omission.
  perTask[correctKey] = (perTask[correctKey] || 0) + (answer.correct ? 1 : 0);
  state.stats.perTask[ts] = perTask;

  // `d` tags each history entry with its difficulty tier so an exported /
  // re-imported record distinguishes which tier an answer was earned at.
  state.history.push({ t: ts, q: answer.questionId, c: answer.correct, at: answer.at, d: difficulty });
  if (state.history.length > HISTORY_LIMIT) {
    state.history.splice(0, state.history.length - HISTORY_LIMIT);
  }
  if (answer.questionId) state.seen[answer.questionId] = answer.at;
  return state;
}

// ── Timed exam mode ──────────────────────────────────────────────────────

function shuffled(items, rng) {
  const draw = rng || Math.random;
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(draw() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Draw a 60-question exam form: domain quotas per EXAM_FORM_QUOTAS,
// round-robin across a domain's task statements (unseen questions first
// within each statement), flagged questions excluded. Returns null if the
// bank cannot fill a quota.
function drawExamForm(bank, state, opts) {
  const options = opts || {};
  const rng = options.rng || Math.random;
  const blocked = new Set(state.flagged);
  const form = [];
  for (const [domain, quota] of Object.entries(EXAM_FORM_QUOTAS)) {
    // Two round-robin phases: every statement's unseen questions first
    // (globally — no repeat is drawn while any unseen remains in the
    // domain), then seen questions as filler.
    const unseenQueues = {};
    const seenQueues = {};
    for (const question of bank) {
      if (question.domain !== domain || blocked.has(question.id)) continue;
      const target = state.seen[question.id] === undefined ? unseenQueues : seenQueues;
      (target[question.taskStatement] = target[question.taskStatement] || []).push(question);
    }
    const statements = new Set([...Object.keys(unseenQueues), ...Object.keys(seenQueues)]);
    const order = shuffled([...statements], rng);
    for (const ts of order) {
      if (unseenQueues[ts]) unseenQueues[ts] = shuffled(unseenQueues[ts], rng);
      if (seenQueues[ts]) seenQueues[ts] = shuffled(seenQueues[ts], rng);
    }
    const picked = [];
    for (const queues of [unseenQueues, seenQueues]) {
      let exhausted = false;
      while (picked.length < quota && !exhausted) {
        exhausted = true;
        for (const ts of order) {
          if (picked.length >= quota) break;
          const next = queues[ts] && queues[ts].shift();
          if (next) {
            picked.push(next);
            exhausted = false;
          }
        }
      }
      if (picked.length >= quota) break;
    }
    if (picked.length < quota) return null; // domain exhausted below quota
    form.push(...picked);
  }
  return shuffled(form, rng);
}

// Choose n distinct items from a list, spread-free random. Returns all items
// (shuffled) when n >= length.
function sampleN(items, n, rng) {
  return shuffled(items, rng).slice(0, Math.min(n, items.length));
}

// Pick `count` positions from `positions`, one per evenly-sized bucket, so the
// choices spread across the range instead of clustering.
function pickPerBucket(positions, count, rng) {
  const draw = rng || Math.random;
  const chosen = [];
  for (let i = 0; i < count; i++) {
    const lo = Math.floor((i * positions.length) / count);
    const hi = Math.floor(((i + 1) * positions.length) / count);
    const span = Math.max(1, hi - lo);
    chosen.push(positions[lo + Math.floor(draw() * span)]);
  }
  return chosen;
}

// A per-question difficulty plan for the 60-question timed form: EXAM_HARD_TAIL
// hard-tail and EXAM_HARDER harder questions, each bucket-spread across the
// sequence (so the hard tail is distributed, never clustered), the rest
// standard. Returns an array of 60 labels in presentation order.
function examDifficultyPlan(rng) {
  const draw = rng || Math.random;
  const total = Object.values(EXAM_FORM_QUOTAS).reduce((s, n) => s + n, 0);
  const labels = new Array(total).fill("standard");
  const all = Array.from({ length: total }, (_, i) => i);
  const hardTail = pickPerBucket(all, EXAM_HARD_TAIL, draw);
  const htSet = new Set(hardTail);
  const remaining = all.filter((i) => !htSet.has(i));
  const harder = pickPerBucket(remaining, EXAM_HARDER, draw);
  for (const i of hardTail) labels[i] = "hard";
  for (const i of harder) labels[i] = "harder";
  return labels;
}

// Draw 60 task statements matching the exam-form quotas — the target list
// for a freshly GENERATED exam form (no bank questions involved). Round-robin
// across each domain's statements so every statement appears 1-3 times.
function drawExamStatements(opts) {
  const rng = (opts || {}).rng || Math.random;
  const statements = [];
  for (const [domain, quota] of Object.entries(EXAM_FORM_QUOTAS)) {
    const order = shuffled(
      Object.keys(TASK_STATEMENTS).filter((ts) => ts.split(".")[0] === domain),
      rng
    );
    for (let k = 0; k < quota; k++) {
      statements.push(order[k % order.length]);
    }
  }
  return shuffled(statements, rng);
}

// answers: map of question id -> chosen letter. Unanswered counts as wrong.
// The scaled score is a linear approximation of the exam's 100-1000 scale;
// the real exam uses equating, so treat this as directional only.
function scoreExam(form, answers) {
  let correct = 0;
  const byDomain = {};
  for (const question of form) {
    const d = (byDomain[question.domain] = byDomain[question.domain] || {
      correct: 0,
      total: 0,
    });
    d.total += 1;
    if (ITEM.isCorrect(question, answers[question.id])) {
      correct += 1;
      d.correct += 1;
    }
  }
  const scaled = Math.round(100 + (900 * correct) / form.length);
  return {
    correct,
    total: form.length,
    scaled,
    passed: scaled >= PASSING_SCALED_SCORE,
    byDomain,
  };
}

// Rescore an exam with flagged-as-flawed questions removed entirely — scored
// out of the remaining count, exactly as if they had never been on the form.
// Weights already applied by applyExamResults are NOT reverted (a single
// x1.5 on one statement self-corrects through normal drilling).
function discountedScore(form, answers, excludedIds) {
  const excluded = new Set(excludedIds || []);
  return scoreExam(form.filter((q) => !excluded.has(q.id)), answers);
}

// ── Per-question timing (diagnostic only) ────────────────────────────────
// Timing never touches scoring, selection, or the pass threshold. An incorrect
// answer under this threshold reads as a rushed miss rather than a knowledge
// gap — the diagnostic the summary is for.
const FAST_INCORRECT_MS = 45000;

// elapsed: map of question id -> cumulative dwell ms (may be null/absent when
// a start stamp was missing, or for runs saved before timing existed).
// excludedIds: flagged-as-flawed ids, excluded here exactly as they are from
// discountedScore. Every mean is null rather than NaN when its side is empty.
function summarizeExamTiming(form, answers, elapsed, excludedIds) {
  const excluded = new Set(excludedIds || []);
  const times = elapsed || {};
  let totalMs = 0;
  let counted = 0;
  let untimed = 0;
  let correctMs = 0;
  let correctN = 0;
  let incorrectMs = 0;
  let incorrectN = 0;
  let fastIncorrect = 0;
  for (const question of form) {
    if (!question || excluded.has(question.id)) continue;
    const ms = times[question.id];
    if (typeof ms !== "number" || !isFinite(ms)) {
      untimed += 1;
      continue;
    }
    totalMs += ms;
    counted += 1;
    if (ITEM.isCorrect(question, answers[question.id])) {
      correctMs += ms;
      correctN += 1;
    } else {
      incorrectMs += ms;
      incorrectN += 1;
      if (ms < FAST_INCORRECT_MS) fastIncorrect += 1;
    }
  }
  return {
    totalMs,
    counted,
    untimed,
    meanMs: counted ? totalMs / counted : null,
    meanCorrectMs: correctN ? correctMs / correctN : null,
    meanIncorrectMs: incorrectN ? incorrectMs / incorrectN : null,
    fastIncorrect,
  };
}

// Fold an exam attempt into the adaptive state: weights, stats, and seen
// update exactly like drill answers, and the attempt lands in examHistory.
// Drill `history` is deliberately untouched — it drives the cooldown and
// trend display, and 60 batch entries would wipe it.
// totalElapsedMs is the run's cumulative dwell time, or null when unavailable
// (including every run saved before timing existed).
function applyExamResults(state, form, answers, at, totalElapsedMs) {
  const score = scoreExam(form, answers);
  for (const question of form) {
    const ts = question.taskStatement;
    const isCorrect = ITEM.isCorrect(question, answers[question.id]);
    const multiplier = isCorrect ? CORRECT_MULTIPLIER : INCORRECT_MULTIPLIER;
    const updated = state.weights[ts] * multiplier;
    state.weights[ts] = isCorrect
      ? Math.max(WEIGHT_FLOOR, updated)
      : Math.min(WEIGHT_CAP, updated);
    state.stats.totalAnswered += 1;
    if (isCorrect) state.stats.totalCorrect += 1;
    const perTask = state.stats.perTask[ts] || { seen: 0, correct: 0 };
    perTask.seen += 1;
    if (isCorrect) perTask.correct += 1;
    state.stats.perTask[ts] = perTask;
    if (!question.ephemeral) {
      state.seen[question.id] = at; // generated questions leave no seen-mark
    }
  }
  state.examHistory = state.examHistory || [];
  state.examHistory.push({
    at,
    correct: score.correct,
    total: score.total,
    scaled: score.scaled,
    elapsedMs: typeof totalElapsedMs === "number" ? totalElapsedMs : null,
  });
  if (state.examHistory.length > EXAM_HISTORY_LIMIT) {
    state.examHistory.splice(0, state.examHistory.length - EXAM_HISTORY_LIMIT);
  }
  return score;
}

// Full discard of the most recent answer (spec: "flag as flawed"). The caller
// keeps {taskStatement, questionId, correct, at, prevWeight} for the question
// on screen; the control is only offered before advancing.
function applyFlag(state, lastAnswer) {
  const ts = lastAnswer.taskStatement;
  state.weights[ts] = lastAnswer.prevWeight;

  state.stats.totalAnswered -= 1;
  if (lastAnswer.correct) state.stats.totalCorrect -= 1;
  const perTask = state.stats.perTask[ts];
  if (perTask) {
    const difficulty = lastAnswer.difficulty === "hard" ? "hard" : "standard";
    const seenKey = difficulty === "hard" ? "hardSeen" : "stdSeen";
    const correctKey = difficulty === "hard" ? "hardCorrect" : "stdCorrect";
    perTask.seen -= 1;
    if (lastAnswer.correct) perTask.correct -= 1;
    perTask[seenKey] = (perTask[seenKey] || 0) - 1;
    if (lastAnswer.correct) perTask[correctKey] = (perTask[correctKey] || 0) - 1;
  }

  const last = state.history[state.history.length - 1];
  if (last && last.q === lastAnswer.questionId && last.at === lastAnswer.at) {
    state.history.pop();
  }
  if (lastAnswer.questionId) {
    delete state.seen[lastAnswer.questionId];
    state.flagged.push(lastAnswer.questionId);
  }
  state.stats.totalFlagged += 1;
  return state;
}

/* ── Item shape: single-answer and multiple-response ───────────────────────
   The exam mixes multiple-choice with multiple-response items that state how
   many responses to select. Rather than branch on item type at every scoring
   and rendering site, everything reads answers through these helpers, which
   accept either a bare option key or an array of them.

   `correct` may therefore be "B" or ["B", "D"]; both normalize to a sorted
   array here, so nothing downstream cares which form the bank used.

   ASSUMPTION — all-or-nothing scoring. The exam guide states the item type
   exists but publishes no worked example, so whether real multiple-response
   items award partial credit is unknown. Exact-set-match is the conservative
   reading: it can only understate a score, never flatter it. If a sitting shows
   otherwise, isCorrect is the single place to change. */

function correctKeys(question) {
  const raw = question && question.correct;
  const keys = Array.isArray(raw) ? raw : raw == null ? [] : [raw];
  return [...keys].sort();
}

function itemOptionKeys(question) {
  return Object.keys((question && question.options) || {}).sort();
}

// Explicit selectCount wins so an item can state "select 2" even before its
// answer key is attached; otherwise it follows from the number of correct keys.
function itemSelectCount(question) {
  if (question && Number.isInteger(question.selectCount) && question.selectCount > 0) {
    return question.selectCount;
  }
  return Math.max(1, correctKeys(question).length);
}

function isMultiSelect(question) {
  return itemSelectCount(question) > 1;
}

function isAnswerCorrect(question, answer) {
  const expected = correctKeys(question);
  const given = Array.isArray(answer) ? [...answer].sort() : answer == null ? [] : [answer];
  if (given.length === 0 || given.length !== expected.length) return false;
  return expected.every((key, i) => key === given[i]);
}

function answerLabel(answer) {
  const keys = Array.isArray(answer) ? [...answer].sort() : answer == null ? [] : [answer];
  return keys.length ? keys.join(", ") : "—";
}

const ITEM = {
  correctKeys,
  optionKeys: itemOptionKeys,
  selectCount: itemSelectCount,
  isMulti: isMultiSelect,
  isCorrect: isAnswerCorrect,
  answerLabel,
};

/* ── Exam form navigation ──────────────────────────────────────────────────
   Pure helpers for moving through a fixed exam form. The real exam lets a
   candidate leave a question blank, move on, and return to it later, so
   nothing here requires an answer to advance — the DOM layer calls these to
   decide what to render and whether a submit needs confirming.

   A form slot can be sparse: form[i] may still be undefined while its question
   sits in prep.buffer[i], materialized on first render. Every helper resolves
   ids through both, so a still-loading slot is never mistaken for a blank one
   that the candidate chose to skip — or worse, for an answered one. */

function resolveFormIds(form, prep) {
  const buffer = (prep && prep.buffer) || [];
  return (form || []).map((q, i) => {
    if (q && q.id != null) return q.id;
    const buffered = buffer[i];
    return buffered && buffered.id != null ? buffered.id : null;
  });
}

function navIsAnswered(answers, id) {
  return id != null && !!answers && answers[id] !== undefined;
}

function unansweredIndices(form, answers, prep) {
  return resolveFormIds(form, prep).reduce((out, id, i) => {
    if (!navIsAnswered(answers, id)) out.push(i);
    return out;
  }, []);
}

function markedIndices(form, marked, prep) {
  return resolveFormIds(form, prep).reduce((out, id, i) => {
    if (id != null && marked && marked[id]) out.push(i);
    return out;
  }, []);
}

// Returns a new map rather than mutating, so callers can't accidentally share
// review state between an exam in progress and a restored one.
function toggleMarked(marked, id) {
  const next = Object.assign({}, marked);
  if (next[id]) delete next[id];
  else next[id] = true;
  return next;
}

function examProgress(form, answers, marked, prep) {
  const ids = resolveFormIds(form, prep);
  const unanswered = unansweredIndices(form, answers, prep);
  return {
    total: ids.length,
    answered: ids.length - unanswered.length,
    unanswered,
    marked: markedIndices(form, marked, prep),
    complete: unanswered.length === 0,
  };
}

function needsSubmitConfirmation(form, answers, prep) {
  return unansweredIndices(form, answers, prep).length > 0;
}

// True once a form slot has a real question, or is guaranteed to get one on the
// next render — either it is already buffered, or generation failed for it and a
// bank question will be substituted. False only for the paused "still
// generating" state, where advancing would race ahead of the generator and
// quietly turn a fresh-question exam into bank substitutes. A bank exam has no
// prep at all and is always ready.
function slotIsResolved(form, prep, index) {
  if ((form || [])[index]) return true;
  if (!prep) return true;
  if ((prep.buffer || [])[index]) return true;
  return !!(prep.failedSlots && prep.failedSlots.has(index));
}

// Next blank after the cursor, wrapping past the end. The cursor's own slot is
// checked LAST rather than never: moving elsewhere is preferred, but if the
// cursor is the only blank left, returning it beats reporting the form complete.
function nextUnansweredFrom(index, form, answers, prep) {
  const ids = resolveFormIds(form, prep);
  const n = ids.length;
  if (n === 0) return null;
  for (let step = 1; step <= n; step++) {
    const i = (index + step) % n;
    if (!navIsAnswered(answers, ids[i])) return i;
  }
  return null;
}

const NAV = {
  resolveFormIds,
  isAnswered: navIsAnswered,
  unansweredIndices,
  markedIndices,
  toggleMarked,
  examProgress,
  needsSubmitConfirmation,
  nextUnansweredFrom,
  slotIsResolved,
};

const CCAOF_ADAPTIVE = {
  nav: NAV,
  item: ITEM,
  TASK_STATEMENTS,
  DOMAINS,
  DOMAIN_FACTORS,
  CORRECT_MULTIPLIER,
  INCORRECT_MULTIPLIER,
  WEIGHT_FLOOR,
  WEIGHT_CAP,
  COOLDOWN_SIZE,
  HISTORY_LIMIT,
  EXAM_FORM_QUOTAS,
  EXAM_MINUTES,
  PASSING_SCALED_SCORE,
  EXAM_HARDER,
  EXAM_HARD_TAIL,
  COVERAGE_WEIGHT_THRESHOLD,
  COVERAGE_TARGET_SEEN,
  HARD_MASTERY_SEEN,
  HARD_FLOOR,
  HARD_FLOOR_RELEASE,
  makeSeedWeights,
  initialState,
  effectiveWeights,
  drawTaskStatement,
  coverageOwed,
  inCoveragePhase,
  difficultyFor,
  hardEligible,
  availabilityFromBank,
  pickBankQuestion,
  applyAnswer,
  applyFlag,
  drawExamForm,
  drawExamStatements,
  examDifficultyPlan,
  sampleN,
  scoreExam,
  discountedScore,
  applyExamResults,
  summarizeExamTiming,
  FAST_INCORRECT_MS,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CCAOF_ADAPTIVE;
}
if (typeof window !== "undefined") {
  window.CCAOF_ADAPTIVE = CCAOF_ADAPTIVE;
}
