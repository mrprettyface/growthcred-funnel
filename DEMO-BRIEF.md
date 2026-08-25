# Brief: make the mobile demo as good as the desktop one

## What this component is

`src/components/webinar/LiveDemo.tsx`. It is the most important thing on the
page — the moment the argument stops being a claim and becomes something the
visitor watches happen. Everything before it sets this up; everything after it
is follow-through. If only one part of this page is excellent, it is this.

The visitor picks the job that eats their week (Proposals, Quotes, Follow-ups,
Invoices, Reports) and the same question gets answered twice: once by AI that
has never met them, once by AI that has been taught their business.

## Why the desktop version works

Two panes, side by side, typing from **one shared character counter**. They
race. At any given moment your eye can see:

- left: `Dear [Client Name] … Investment: [Insert pricing]`
- right: `Hi Thabo … R148,000, our standard 50/50 terms`

The persuasion is in the **simultaneity and the contrast held in one view**. You
are not told the trained answer is better; you watch it out-run the other one in
real time, and you can flick between the two without moving your eyes far.

## Why the mobile version is flatter

Two columns of monospace do not fit on a 375px screen, so mobile became a
**sequence**: type the generic answer, wait, auto-flip to the trained one, with
a toggle to go back.

It is competent and it is not embarrassing. But the contrast is now held in
**memory instead of in view**, and memory is a much weaker place to hold it. The
current caption literally has to instruct the user — "TAP BACK TO COMPARE" —
which is the tell that the design is asking them to do the work the desktop
version does for them.

**The goal: find a mobile-native interaction that puts the contrast back in
view, or makes the transformation itself the thing you watch.**

## Three directions, with honest trade-offs

### A. Drag-to-compare wipe — recommended

One card. The generic answer underneath, the trained answer on top, clipped by a
draggable vertical divider. Drag the handle across and the answer transforms
under your finger, placeholder text becoming real detail as you go.

- **Why it is good:** genuinely mobile-native, tactile, and it puts the contrast
  back in one view. The user controls the reveal, which makes it *theirs*. This
  is the interaction people screenshot.
- **Cost:** `clip-path: inset()` or a `transform: translateX` mask on the top
  layer, driven by pointer position. Compositor-only. Cheap.
- **Risk:** the two answers wrap to different line counts, so a straight
  vertical wipe shows mismatched text on either side of the divider. Needs
  either equal-height layout or a design that embraces the mismatch.
- **No copy changes needed.**

### B. In-place morph — the ambitious one

One answer. Type out the generic version, then let the placeholders **become**
the real values in place: `[Client Name]` → `Thabo`, `[Insert pricing]` →
`R148,000`, each swap sweeping gold as it lands. You watch the AI learn the
business rather than watching two separate outputs.

- **Why it is good:** it is the page's actual thesis, animated. Probably the
  strongest idea here conceptually.
- **Cost:** transform/opacity per token. Cheap to run.
- **Real risk, do not underestimate:** the two answers are **not structurally
  parallel** today. For Proposals the generic is 9 tokens opening "Dear " and
  the trained is 11 opening "Hi ". A morph requires rewriting all five job pairs
  so both versions share a skeleton with swappable slots. That is a copywriting
  job as much as an engineering one, and the copy is good — do not let it get
  worse in service of the effect.

### C. Stacked split-screen race

Keep both panes visible on mobile, stacked, each about 30vh with its own
internal scroll, both typing at once from the shared counter — the desktop
mechanic, rotated 90°.

- **Why it is good:** preserves simultaneity exactly. Lowest-risk change.
- **Risk:** cramped. Two 30vh monospace boxes on a phone may read as busy rather
  than dramatic. Prototype before committing.

**Recommendation: build A.** It is the most mobile-native, needs no copy
rewrite, and is the one most likely to be shown to someone else. Keep B on the
list for when the copy is being revisited anyway.

## Constraints that cannot break

These are load-bearing. All of them are currently verified and gated.

- **No `filter: blur()` or `backdrop-filter`.** Filters repaint every frame and
  were the original cause of this page's mobile jank. `transform` and `opacity`
  only.
- **No layout shift while typing.** Each `Pane` renders an invisible full-text
  "sizer" with the typed layer absolutely positioned over it, so the card is
  full height from the first character. Measured at 0px shift. Any new design
  must preserve this — a wipe between two answers of different lengths must
  reserve the taller of the two.
- **Typing repaints are throttled** to ~25fps (`PAINT_INTERVAL_MS`). Do not
  restore a per-frame `setState` over hundreds of spans.
- **44px minimum tap targets** (`min-h-11`) on chips and toggle.
- **`prefers-reduced-motion`** must render the finished text plainly, with no
  auto-flip and no drag requirement to see both answers.
- **Screen readers** get the full answer via an `sr-only` copy; the animated
  layer is `aria-hidden`. Do not make a screen reader listen to a typewriter.
- **12px minimum type**, weight 400 minimum.

## Data model

```ts
type Kind = "plain" | "miss" | "hit";   // miss = grey placeholder, hit = gold highlight
type Token = { text: string; kind?: Kind };
type Job = { label: string; ask: string; generic: Token[]; trained: Token[] };
```

Five jobs, each with a paired `generic` and `trained` answer already marked up
with `miss` / `hit` tokens. The highlight markup you need already exists.

## What is already good — do not regress it

- The chip row for job selection (horizontal scroll, edge fade, 44px targets)
- The "You ask" card framing the question
- The auto-turn after the generic answer finishes (`TURN_DELAY_MS`, 1600ms)
- Job change replays the sequence; manual control disables the auto-turn
- The sizer, the throttle, the sr-only copy

## The bar for done

`GATES.md` + `scripts/verify-mobile.mjs` must exit 0 before and after:

```
node scripts/verify-mobile.mjs build
node scripts/verify-mobile.mjs no-blur
node scripts/verify-mobile.mjs sizer
node scripts/verify-mobile.mjs tap-targets
node scripts/verify-mobile.mjs perf-guards
```

Add a gate for the new interaction. Prove layout shift is still 0px by measuring
the page position of the punchline below the demo before and after the
answer changes — do not assert it, measure it.

**Success:** someone scrolls to this section on a phone, plays with it
unprompted, and shows it to somebody else. It must never stutter, and it must
never need a caption telling the user what to do.
