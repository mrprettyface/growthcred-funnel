/**
 * The homepage hero's background: a line climbing to a gold point.
 *
 * Decorative only (aria-hidden). The SVG stretches to its box
 * (preserveAspectRatio="none") so the curve always spans the space beside the
 * headline, and `vectorEffect="non-scaling-stroke"` keeps the line weight
 * constant at any size. The end point is HTML, not SVG, so it stays a circle
 * instead of being stretched with the drawing: the curve ends at (900, 200) in
 * a 1000 × 600 box, which is exactly left 90%, top 33.333%.
 *
 * The end point is a clock: time, climbing. It never moves. The grid and a
 * field of gold specks drift down and to the left behind it, forever and at two
 * speeds, so it reads as rising. Each layer moves exactly one tile per loop, so
 * the loop has no seam, and moves by transform only.
 *
 * Motion lives in index.css (.cc-graph-*, .cc-*-drift, .cc-clock-*). With motion
 * off, this renders as the finished, still graph.
 */

/** The rising line: a slow start, a brief plateau, then a steady climb. The hero
 *  box is taller than 1000 × 600 relative to its width, which steepens every
 *  slope by about 1.3×, so the last stretch is drawn flatter (about 32°) to land
 *  near 40° on screen: growth, not a spike. */
const CURVE = "M0 565 C150 560 300 545 420 520 C520 500 560 470 640 455 C720 440 760 400 800 330 C830 275 860 225 900 200";
/** The same line closed down to the baseline, for the gold area under it. */
const AREA = `${CURVE} L900 600 L0 600 Z`;
/** A quieter second series underneath, for depth. */
const FAINT = "M0 590 C260 575 520 548 700 520 S860 490 1000 470";

export function HeroGraph() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Still frame, moving layers: the fade stays put while the layers drift. */}
      <div className="cc-drift-mask absolute inset-0 overflow-hidden">
        <div className="cc-grid-light cc-grid-drift absolute -inset-[120px]" />
        <div className="cc-specks cc-specks-drift absolute -inset-[240px]" />
      </div>
      <div className="absolute inset-y-0 right-0 w-full opacity-35 md:w-[68%] md:opacity-100">
        <svg
          className="cc-graph-draw absolute inset-0 h-full w-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="cc-hero-area" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#f2c86e" stopOpacity="0" />
              <stop offset="0.55" stopColor="#f2c86e" stopOpacity="0.2" />
              <stop offset="1" stopColor="#f2c86e" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="cc-hero-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="cc-hero-mask">
              <rect width="1000" height="600" fill="url(#cc-hero-fade)" />
            </mask>
            <linearGradient id="cc-hero-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#1a1a24" stopOpacity="0" />
              <stop offset="0.35" stopColor="#1a1a24" stopOpacity="0.3" />
              <stop offset="1" stopColor="#1a1a24" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path d={AREA} fill="url(#cc-hero-area)" mask="url(#cc-hero-mask)" />
          <path d={FAINT} stroke="#1a1a24" strokeOpacity="0.1" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path
            d={CURVE}
            stroke="url(#cc-hero-line)"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {/* On phones the whole graph, clock included, sits faded behind the copy. */}
        <span className="cc-graph-halo absolute left-[90%] top-[33.333%] h-10 w-10 rounded-full bg-gold/35 md:h-14 md:w-14" />
        <span className="cc-graph-dot absolute left-[90%] top-[33.333%] grid h-9 w-9 place-items-center rounded-full bg-gold md:h-12 md:w-12 text-midnight shadow-[0_0_0_6px_rgba(200,160,74,0.2),0_12px_30px_-8px_rgba(200,160,74,0.9)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path className="cc-clock-hand cc-clock-hour" d="M12 12l3.5 2" />
            <path className="cc-clock-hand cc-clock-minute" d="M12 12V6.5" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          </svg>
        </span>
      </div>
    </div>
  );
}
