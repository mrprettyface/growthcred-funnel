# GrowthCred funnel

Read **[STATUS.md](STATUS.md)** first. It is the living handover doc: routes,
prices, what is done, what is open, and the rules each page has to keep.

## Working agreements

- **Prices must match Whop exactly.** Site prices are in `src/lib/offers.ts`
  (cents), plan IDs in `src/lib/whop.ts`. A mismatch has bitten us twice.
- **No invented proof.** Testimonials, figures and named results go on the site
  only when someone real has given them, with permission. Placeholders are
  visible (`ToCome`), never quietly plausible.
- **Motion is decoration.** Every animated scene needs a plain branch under
  `prefers-reduced-motion`, and no content is ever gated behind an animation
  finishing. See the mobile performance rules in STATUS.md before touching the
  webinar experience — especially "no `filter: blur()` on anything driven by
  scroll".
- Deploy is: push to GitHub → cPanel Git → Update from Remote → Deploy HEAD.

## Skills

### unlazy

Installed globally at `~/.agents/skills/unlazy/SKILL.md` (also linked from
`~/.claude/skills/unlazy`).

Use it for substantial work in this repo — a full page build, an exhaustive
audit, a multi-file refactor, or anything that has already come back half-done.
It writes runnable acceptance gates before implementing and re-verifies them
before reporting done, which is exactly the failure mode this project keeps
hitting: a confident "done" on work that was only mostly done.

Invoke with `/unlazy`, or `/unlazy tree 3 <task>` to split a task three layers
deep. Skip it for a one-line change or a question.

The optional Stop hook is deliberately NOT installed. Do not install it without
asking.
