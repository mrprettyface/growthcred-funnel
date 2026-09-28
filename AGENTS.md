# GrowthCred agent guide

Read `STATUS.md` first for current routes, risks, and open work. Use `CLAUDE.md`
for the project's product and engineering constraints; it is the detailed source
of truth, so do not duplicate it here.

## Writing copy

Every word on the site follows `docs/editorial/VOICE.md`. Read it before writing
or editing any page, article, FAQ or email; its fact rules (sourced numbers, no
invented proof, the exact published guarantee) win over its style rules. After
a build, `node scripts/verify-voice.mjs check` must pass.

## Efficient execution

- Start from paths, errors, and acceptance criteria supplied by the user. Search
  narrowly before broadening scope.
- Keep successful command output compact. Preserve the failing assertion, error,
  and nearby context when a check fails.
- Match the final response to the size of the change: outcome, files changed,
  checks run, and blockers. Add explanation only when it helps a decision.
- Treat a usage budget in the prompt as a real constraint. Prefer the smallest
  sufficient model and reasoning effort; do not trade away required verification.
- Use subagents only when explicitly requested or when independent, bounded work
  materially improves a substantial task. Default delegated routine work to Luna;
  return summaries, not raw logs. Do not delegate small or sequential tasks.
- Apply corrections sent during a run immediately; do not finish a superseded
  approach first.
- For work likely to span sessions, create or update a task-specific `PLAN-*.md`
  or `STATUS.md` with completed work, affected paths, failed checks, and next step.
  Never redo an item already recorded as complete without verifying it is stale.

## Verification

- Build: `npm run build`
- SEO: `npm run verify:seo`
- Search behavior: `npm run verify:search-behavior`
- Substantial or previously incomplete work uses the installed `unlazy` skill and
  acceptance gates. Do not install its optional Stop hook without permission.

