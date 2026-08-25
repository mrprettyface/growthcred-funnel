# Brief: get the experience back on mobile without the jank

## The situation

`/webinar` (`src/pages/WebinarExperience.tsx`) is a long-form landing page built
as a scroll experience — the page argues its case as you move through it rather
than handing you a document. On desktop it works and the owner likes it.

Two rounds of feedback pulled in opposite directions:

1. **"Make it an experience."** Scroll-linked reveals, a pinned card stack,
   blur-focus text, a WebGL hero, an interactive demo.
2. **"It's janky and over-engineered on mobile."** A performance audit demanded
   the animations be stripped.

Round 2 was actioned. The page is now smooth on mobile — and flat. It lost the
thing that made it worth building. **That is the problem to solve.**

## The insight the audit got wrong

The audit blamed *motion*. Motion was not the cost. **Filters were.**

- `filter: blur()` and `backdrop-filter` force a repaint every frame. They never
  reach the compositor fast path. This was the actual cause of the jank.
- `transform` (translate / scale / rotate) and `opacity` are composited on the
  GPU and are essentially free, even on a mid-range Android.

So "smooth" and "rich" are **not** in tension here. The page can have real
motion and still hold 60fps. It just cannot animate filters, geometry, or
anything that reads layout on every scroll event.

## Hard rules (do not violate)

**Free — use freely:**
- `transform`: translate, scale, rotate
- `opacity`
- IntersectionObserver to trigger animations
- **One** exception for blur, already taken: `.gc-lane-dim` in `index.css` sets
  back the demo lane you are not reading. It is allowed because the radius is
  fixed rather than scrubbed, it is on one element at a time, and it is never
  transitioned — so it rasterises once instead of repainting per frame. Gate G13
  enforces all three. A blur that changes value while scrolling is still banned;
  that is what caused the original jank.

**Banned:**
- `filter: blur()` or `backdrop-filter` on anything that moves or is pinned
- Easing a blur radius — `transition-all` counts, because it includes `filter`
- Animating width, height, top, left, or box-shadow
- Reading layout (`getBoundingClientRect`, `offsetTop`) inside a scroll handler
- A second smooth-scroll library. One Lenis instance exists in
  `src/components/webinar/SmoothScroll.tsx` and owns the page.

**Also required:**
- Every scene needs a plain branch under `prefers-reduced-motion`
- No content may be gated behind an animation completing
- Minimum 12px type, minimum weight 400, 44px tap targets
- Section gaps ≤64px on mobile

## What was stripped and should come back — done cheaply

1. **The card stack** (`ScrollStack`, the "everything you tried" scene). Removed
   from mobile wholesale via `plainStack` in `WebinarExperience.tsx`. It was
   removed because it reads layout for every card on every scroll event, not
   because stacking cards is expensive. Rebuild it transform-only, driven by a
   single scroll position value, and it can return to mobile.
2. **Depth on the beats.** `Beat.tsx` now does a plain fade-and-rise. It could
   scale or stagger and cost nothing more.
3. **The hero.** WebGL is correctly off on phones, but nothing replaced it —
   a CSS gradient with a slow transform drift would cost nothing.
4. **Scene transitions.** Sections currently just abut. Cheap parallax on the
   image breaks already exists; nothing else has depth.

## Spacing principle

Space must be **proportional to content**, never a fixed fraction of the
viewport. An earlier version gave every prose block `min-h-[24vh]`, so a
five-word line claimed as much screen as a three-line paragraph and the page
filled with dead air. `Beat.tsx` now uses padding, with an opt-in `solo` prop
for the rare line that has earned a screen of its own.

## Where things live

| Concern | File |
|---|---|
| Page composition, scene order | `src/pages/WebinarExperience.tsx` |
| One idea at a time (prose) | `src/components/webinar/Beat.tsx` |
| The counting scene | `src/components/webinar/HoursScene.tsx` |
| The interactive demo | `src/components/webinar/LiveDemo.tsx` |
| Scroll authority | `src/components/webinar/SmoothScroll.tsx` |
| CTA / modal / bands | `src/components/webinar/SeatCta.tsx` |
| Mobile vs desktop switch | `src/lib/motion.ts` (`useIsMobile`) |
| Vendored React Bits (patched — read the file headers) | `src/components/reactbits/` |

## The bar for "done"

`GATES.md` holds ten acceptance gates; seven are machine-checked by
`scripts/verify-mobile.mjs`. Run this and it must exit 0 **before and after**
any change:

```
node scripts/verify-mobile.mjs build
node scripts/verify-mobile.mjs no-blur
node scripts/verify-mobile.mjs perf-guards
```

Add a gate for anything new you introduce. A ticked checkbox is not evidence;
re-run the check.

## What success looks like

Scroll `/webinar` on a real phone. It should feel *alive* — things arrive, move
with weight, and reward scrolling — and it should never stutter once. If a
reviewer says "smooth but boring", that is a failure. If they say "beautiful but
laggy", that is also a failure. Both, or it is not done.
