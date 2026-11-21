# Gates: bento hero on `/` (22 Nov 2026)

Phila's brief: restructure the landing page's first screen like a reference
shot (a coloured headline card that cuts into a large photo, floating stickers
on the photo, a dashed proof card under the headline). Layout only.

Baseline before the change (fresh build, 22 Nov): build passes, verify-seo
passes, verify-voice passes, own-intelligence `home` has 2 pre-existing
failures (FAQ "How is this different from ChatGPT?" missing; meta description
lacks "own your intelligence"). This work must not add a third.

| Gate | Check | How |
| --- | --- | --- |
| G1 copy | One h1, word for word Phila's headline; sub, Apply → `/call`, "Read client stories" → `/stories`, scarcity line and logo strip all still in `#hero`. | `node scripts/verify-own-intelligence.mjs home` (no new failure) + grep of `dist/index.html` |
| G2 no new claims | Every sticker and proof-card word is lifted from copy already on the site (HERO.sub, PROOF_LINE, the schema address). No new number, client or result. | Review `HERO_BENTO` in `src/lib/home.ts`; each line carries its source |
| G3 motion | Stickers float and pop only inside `prefers-reduced-motion: no-preference`; transform/translate/scale/opacity only; no blur; nothing readable is behind an animation. | CSS review + reduced-motion screenshot |
| G4 layout | 1440px: headline card cuts into the photo with rounded corners; proof card sits under it. 390px: stacked, no sideways overflow (`scrollWidth <= clientWidth`). | Browser pane, both widths, screenshots after animations finish |
| G5 build | `npm run build`, `verify-seo`, `verify-voice check` pass. | Run them |
| G6 images | Photo reused from `/private-ai` with its existing alt; width/height set; eager + high priority as the LCP image. | Source review |

## Pass 2: the rest of `/` in the bento style (22 Nov 2026, Phila: "Yes, homepage next")

Baseline before pass 2: `wc-home` already out of range (3,314 words, pre-existing, see STATUS 27 Oct); `verify-strategy-home` and `verify-stories` pass.

| Gate | Check | How |
| --- | --- | --- |
| H1 words | Rendered word count of `/` is unchanged (±10 for "01"-style numerals and labels). No copy edited in `src/lib/home.ts`. | `node scripts/wc-home.mjs` before/after + `git diff src/lib/home.ts` shows only HERO_BENTO |
| H2 sections | Every section id still present, in the same order: hero, capacity, renting, own, beliefs, situations, stories, method, stages, founder, guarantee, ways, guides, faq, close. | `verify-own-intelligence home` (no new failure) + `verify-strategy-home` + `verify-stories` |
| H3 shared kit | Tiles and stickers come from one shared module (`src/components/bento.tsx`), used by the hero and the sections, so other pages can reuse it. | Source review |
| H4 contrast | No gold-on-gold button; text on gold-soft tiles is midnight. | Screenshots |
| H5 layout | 1440px and 375px: no sideways overflow, no clipped text; each section screenshotted. | Browser pane |
| H6 build | `npm run build`, `verify-seo`, `verify-voice check` pass. | Run them |
