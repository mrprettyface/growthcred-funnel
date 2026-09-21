# Plan: simplify the site on the Hyros pattern

Status: **plan only, nothing implemented.** Agreed 21 September 2026.
Execute in a later session — this is a multi-section build, so run it under
`/unlazy` with gates written first.

Reference: Hyros homepage and agency page screenshots supplied by the owner.
We are copying their **structure**, never their claims.

## Why

The homepage is 2 125 words. Hyros says the same amount in a few hundred. The
argument is good; it is buried. Measured word counts on the current build:

| Page | Words |
| --- | --- |
| `/` | **2 729** (2 125 rendered) |
| `/ai-training-south-africa` | 604 |
| `/webinar` | 419 |
| `/about` | 408 |
| `/resources` | 283 |

Worst sections on `/`, rendered word count:

| Section | Heading | Words | Target |
| --- | --- | --- | --- |
| `day` | You build it, not just hear about it. | 384 | ~90 |
| `demo` | It doesn't know your business. | 253 | ~70 |
| `levels` | The seven levels of AI. | 231 | ~90 |
| `cost` | Work out what this is already costing you. | 173 | ~60 |
| `who` | This is for you if… | 166 | ~70 |
| `walk` | What you walk away with. | 114 | ~50 |
| `guarantee` | The 10 hours back, or you don't pay. | 110 | ~45 |
| `hero` | Same business. 10 hours a week back. | 114 | done |

Homepage target: **2 125 → ~850 rendered words.**

## The grammar we are copying

Every Hyros block obeys the same four rules:

1. **Headline is a direct value claim**, usually two beats with the second half
   in the accent colour. "Same ad spend. 15% more ROAS." Ours is gold.
2. **Sub is one or two short lines.** Never a paragraph.
3. **The body is blocks, and each block is one line.** A card earns a title and
   a single sentence. If it needs two, it is the wrong pattern.
4. **A CTA pair closes every major block** — primary filled, secondary outline.

Tiny mono uppercase labels, big numbers, generous whitespace. We already have
the type scale and the tokens for this; what we lack is the discipline.

## Pattern library to build

New shared components in `src/components/blocks/`. Each needs a
`prefers-reduced-motion` branch if it animates, per CLAUDE.md.

| Component | Hyros source | Used by |
| --- | --- | --- |
| `CtaPair` | hero / guarantee block | extract from the hero we already shipped |
| `PickerCards` | "Pick your business model" | `who`, `levels` |
| `BenefitChips` | "Every agency partner gets" — alternating dark/light, one line each | `walk`, `day` |
| `StatGrid` | 2×2 big-number card | `cost` — **see the proof warning below** |
| `GuaranteeCard` | "Your ads grow. Or you don't pay." | `guarantee` |
| `CompareTable` | commission comparison table | training vs done-for-you |
| `ProofChips` | "Tracking $5B+ for: Tony Robbins…" | **blocked, see below** |

## Section-by-section

### `hero` — done, plus the rotating word

Shipped already: outcome headline, 18-word sub, CTA pair above the fold.

The owner wants the task to animate through **proposals → follow-ups → admin
work → drafting documents**.

**Recommended (Option A).** Keep the H1 stable, put the rotator on its own
hero-scale line underneath:

```
Same business. 10 hours a week back.     <- h1, static, prerendered
Starting with proposals.                  <- rotator on "proposals"
```

Why not inside the H1:

- **Honesty.** "10 hours back from proposals" claims that proposals alone are
  worth the full ten hours. The guarantee covers ten hours across the whole
  week, not per task. Option A keeps the claim exactly where the guarantee
  already puts it.
- **SEO.** `verify:seo` asserts exactly one `<h1>` and the prerenderer bakes
  its text into `dist/index.html`. A static H1 keeps that stable.

**Option B**, rotator inside the H1, is available if the owner accepts a
reworded claim that does not attach the ten hours to one task.

Build notes either way:

- The prerendered HTML must contain a complete, readable sentence with the
  first word already in it. Nothing waits on JS.
- Reserve the width of the longest option (`drafting documents`) so the line
  does not reflow each tick — no CLS.
- Under `prefers-reduced-motion`, render the first word and do not cycle.
- Cross-fade opacity only. No `filter: blur()` — see the mobile performance
  rules in STATUS.md.
- Pause when the tab is hidden.

### `day` 384 → ~90 — the biggest win

Currently prose describing the day. Becomes `BenefitChips`: one chip per block
of the day, each a title plus one line. The detail that survives moves into the
existing FAQ, which is already the right home for it.

### `demo` 253 → ~70

The "generic AI doesn't know your business" argument. Keep the live demo,
delete the essay around it. Headline + one line + the demo itself.

### `levels` 231 → ~90

The seven-rung deck already works and has its own drawn scenes. Cut each rung's
copy to the one-line `desc` it already has and drop the surrounding prose.

### `cost` 173 → ~60

Keep the calculator — it is the interactive proof and it earns its space. Strip
the prose to a headline and one line. **Do not** wrap it in a Hyros-style
`StatGrid` of results: we have no measured outcomes to put in one.

### `who` 166 → ~70

Straight `PickerCards`, exactly Hyros's "pick your business model": numbered
card, one-line description, "Show me how". Good candidate for segmenting by
business type once we know the segments.

### `walk` 114 → ~50

`BenefitChips`, one line each.

### `guarantee` 110 → ~45

`GuaranteeCard`: icon, mono eyebrow, two-beat headline with the second half in
gold, one line, CTA pair. The copy already exists and already converts as an
idea — it just needs the compact frame.

### Other pages, after `/` lands

- `/checkout` — the pricing page, and it still has no FAQ and no reassurance
  beyond a refund link. Add the FAQ from `/` (existing answers, no new copy).
- `/ai-training-south-africa`, `/ai-automation-south-africa` — 604 words of
  good SEO copy. Keep the words for crawlers, restructure into blocks so a
  human can skim it.
- `/webinar` — apply the hero pattern already shipped on `/`.

## Guardrails — read before executing

- **No invented proof.** Hyros's strongest blocks are the brand chip row
  ("Tony Robbins, Alex Hormozi, Whop…") and the 2×2 results grid
  ("15–20% ad ROI, 10–15% CPA drop"). We have **zero** real testimonials and
  **zero** measured client outcomes. `ProofChips` and a results `StatGrid`
  stay unbuilt, or ship visibly empty as `ToCome`, until the owner supplies
  real, permissioned evidence. This is the highest-value blocked item on the
  site and it is people work, not code.
- **No fake urgency.** Their red countdown bar sits on a permanent sale. Only
  build a countdown against a real deadline.
- **Prices must match Whop.** `src/lib/offers.ts`, plan IDs in `src/lib/whop.ts`.
- **Reduced motion.** Every animated block needs a plain branch, and no content
  is ever gated behind an animation finishing.
- **Both hosts keep working.** Gate `host-portable` (G23).
- **`/` has two implementations.** `WorkshopExperience.tsx` and the
  reduced-motion fallback `Workshop.tsx` must not drift — they already had,
  and it was only caught by accident. Every section change lands in both.

## Sequence

1. Write gates first (`GATES-simplify.md`), under `/unlazy`.
2. Build the pattern library with no page wired to it.
3. Convert `/` section by section, heaviest first: `day`, `demo`, `levels`,
   `cost`, `who`, `walk`, `guarantee`. Both implementations each time.
4. Hero rotator.
5. `/checkout` FAQ, then the service pages, then `/webinar`.
6. Re-run `npm run deploy:prepare`, `verify:seo`, `verify:search-behavior`,
   and the mobile gate. Confirm the rendered word count actually fell.

## Open decisions for the owner

1. Rotator Option A (under the H1, recommended) or Option B (inside it)?
2. Segments for `PickerCards` on `who` — which business types?
3. Any real testimonial or measured result available yet? That unlocks the two
   blocked patterns.
