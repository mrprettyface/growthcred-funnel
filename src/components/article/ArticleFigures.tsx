import type { ReactNode } from "react";
import { Figure, GOLD } from "../sceneKit";

/**
 * Hand-drawn line scenes for guide pages. One stroke weight, one gold mark
 * per scene, the same person as the rest of the site. No photos, no names.
 */
export type ArtName =
  | "live"
  | "video"
  | "split"
  | "lock"
  | "scale"
  | "table"
  | "list"
  | "check"
  | "paste"
  | "blank"
  | "groups"
  | "quote"
  | "hire"
  | "tools"
  | "clock";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Board({ x, y }: { x: number; y: number }) {
  return (
    <g {...stroke}>
      <rect x={x} y={y} width="78" height="52" rx="4" />
      <rect x={x + 10} y={y + 12} width="28" height="8" rx="2" fill={GOLD} stroke="none" />
      <path d={`M${x + 10} ${y + 30}h48M${x + 10} ${y + 40}h32`} />
    </g>
  );
}

const SCENES: Record<ArtName, ReactNode> = {
  live: (
    <>
      <Figure x={36} y={78} arms="M0 10 l-14 16 M0 10 l22 -8" />
      <Board x={78} y={36} />
      <Figure x={188} y={96} arms="M0 8 l-10 14 M0 8 l12 10" />
      <Figure x={230} y={96} arms="M0 8 l-12 12 M0 8 l14 8" />
      <path d="M168 150h80" />
    </>
  ),
  video: (
    <>
      <Figure x={48} y={96} arms="M0 12 l16 6 M0 12 l-8 16" />
      <rect x="108" y="40" width="120" height="78" rx="6" />
      <path d="M96 126h144" />
      <path d="M156 66 l28 16 l-28 16z" fill={GOLD} stroke="none" />
    </>
  ),
  split: (
    <>
      <Figure x={46} y={96} arms="M0 12 l14 8 M0 12 l-8 14" />
      <rect x="78" y="48" width="52" height="36" rx="4" />
      <path d="M98 60 l12 8 l-12 8z" fill={GOLD} stroke="none" />
      <path d="M150 40v100" strokeDasharray="3 6" />
      <Figure x={188} y={88} arms="M0 10 l-12 14 M0 10 l18 -6" />
      <Figure x={232} y={96} arms="M0 8 l-10 12 M0 8 l12 10" />
      <rect x="200" y="42" width="48" height="28" rx="3" />
    </>
  ),
  lock: (
    <>
      <path d="M118 78v-16a22 22 0 0 1 44 0v16" />
      <rect x="100" y="78" width="80" height="58" rx="6" />
      <rect x="132" y="96" width="16" height="22" rx="3" fill={GOLD} stroke="none" />
      <path d="M70 130h20M210 130h20" />
      <Figure x={52} y={100} arms="M0 10 l18 4 M0 10 l-10 16" />
    </>
  ),
  scale: (
    <>
      <path d="M150 36v96M110 132h80" />
      <path d="M70 56h160" />
      <path d="M70 56l-28 36h56z" />
      <path d="M230 56l-28 36h56z" />
      <circle cx="70" cy="100" r="6" fill={GOLD} stroke="none" />
      <path d="M214 96h32M214 104h24" />
    </>
  ),
  table: (
    <>
      <path d="M40 108h220" />
      <path d="M64 108v28M236 108v28" />
      <rect x="108" y="92" width="36" height="16" rx="2" fill={GOLD} stroke="none" />
      <rect x="150" y="94" width="28" height="14" rx="2" />
      <Figure x={70} y={70} arms="M0 8 l14 10 M0 8 l-12 12" />
      <Figure x={150} y={62} arms="M0 8 l16 6 M0 8 l-14 10" />
      <Figure x={230} y={70} arms="M0 8 l-16 8 M0 8 l12 12" />
    </>
  ),
  list: (
    <>
      <rect x="96" y="28" width="100" height="128" rx="6" />
      <path d="M128 28v-10h36v10" />
      <path d="M114 58h16M140 58h36" />
      <path d="M114 82h16M140 82h36" />
      <path d="M114 106h16M140 106h28" />
      <path d="M116 78l6 6 12-14" stroke={GOLD} />
      <Figure x={48} y={100} arms="M0 10 l20 2 M0 10 l-8 16" />
    </>
  ),
  check: (
    <>
      <rect x="118" y="36" width="92" height="116" rx="4" />
      <path d="M134 64h60M134 84h48M134 104h54" />
      <path d="M70 108l16 16 32-40" stroke={GOLD} />
      <Figure x={56} y={88} arms="M0 12 l22 -2 M0 12 l-10 14" />
    </>
  ),
  paste: (
    <>
      <rect x="36" y="40" width="70" height="90" rx="4" />
      <path d="M50 62h42M50 78h34M50 94h38" />
      <path d="M120 84h36" />
      <path d="M148 72l12 12" />
      <rect x="168" y="48" width="88" height="72" rx="8" />
      <path d="M184 78h56M184 94h40" />
      <circle cx="212" cy="64" r="5" fill={GOLD} stroke="none" />
    </>
  ),
  blank: (
    <>
      <rect x="120" y="40" width="100" height="88" rx="4" />
      <path d="M140 108h40" stroke={GOLD} />
      <Figure x={64} y={96} arms="M0 10 l18 8 M0 10 l-8 16" />
    </>
  ),
  groups: (
    <>
      <Figure x={48} y={90} arms="M0 8 l-12 14 M0 8 l14 8" />
      <Figure x={92} y={96} arms="M0 8 l-10 12 M0 8 l12 10" />
      <rect x="36" y="128" width="72" height="8" rx="2" fill={GOLD} stroke="none" />
      <Figure x={188} y={90} arms="M0 8 l-12 14 M0 8 l14 8" />
      <Figure x={232} y={96} arms="M0 8 l-10 12 M0 8 l12 10" />
      <path d="M176 132h72" />
    </>
  ),
  quote: (
    <>
      <rect x="40" y="48" width="78" height="96" rx="4" />
      <path d="M54 72h50M54 90h40M54 108h46" />
      <path d="M132 96h28" />
      <circle cx="196" cy="70" r="28" />
      <path d="M184 70h24M196 58v24" stroke={GOLD} />
      <path d="M176 110v28M216 110v28" />
    </>
  ),
  hire: (
    <>
      <Figure x={56} y={90} arms="M0 10 l-14 14 M0 10 l16 8" />
      <Figure x={110} y={96} arms="M0 8 l-12 14 M0 8 l14 6" />
      <path d="M160 48v88" strokeDasharray="3 6" />
      <Figure x={210} y={92} arms="M0 10 l18 4 M0 10 l-8 16" />
      <rect x="232" y="70" width="36" height="28" rx="3" />
      <path d="M244 80h14" stroke={GOLD} />
    </>
  ),
  tools: (
    <>
      <rect x="48" y="88" width="70" height="44" rx="4" />
      <path d="M62 104h42" />
      <rect x="140" y="70" width="52" height="62" rx="4" />
      <path d="M154 90h24M154 106h18" />
      <circle cx="230" cy="78" r="16" />
      <path d="M230 70v16M222 78h16" stroke={GOLD} />
      <path d="M214 110v22M246 110v22" />
    </>
  ),
  clock: (
    <>
      <circle cx="150" cy="78" r="40" />
      <path d="M150 78V52" />
      <path d="M150 78l18 12" stroke={GOLD} />
      <rect x="48" y="56" width="48" height="64" rx="3" />
      <path d="M60 74h24M60 88h18" />
      <Figure x={230} y={96} arms="M0 10 l-16 8 M0 10 l12 14" />
    </>
  ),
};

function pokeLabel(caption: string) {
  return caption.split(/[,.]/)[0].split(/\s+/).slice(0, 3).join(" ");
}

/** A pointer and a small highlight, so the drawing reads like a note in an article. */
function Poke({ label }: { label: string }) {
  const width = Math.min(148, 18 + label.length * 7);
  return (
    <g stroke="none">
      <path d={`M${24 + width} 28 L${40 + width} 52`} stroke={GOLD} strokeWidth={2} fill="none" />
      <path d={`M${40 + width} 52 l-10 -2 l2 8 z`} fill={GOLD} />
      <rect x={16} y={8} width={width} height={24} rx={12} fill="#fff" stroke={GOLD} strokeWidth={1.5} />
      <text x={16 + width / 2} y={24} textAnchor="middle" fontSize={11} fontFamily="ui-sans-serif, system-ui, sans-serif" fill="#1a1a24">
        {label}
      </text>
    </g>
  );
}

export function ArticleFigure({
  name,
  alt,
  caption,
  idSuffix = name,
  motion = false,
  slot = "figure",
}: {
  name: ArtName;
  alt: string;
  caption: string;
  idSuffix?: string;
  /** Draw-in plus the cue for this section. The hero stays still. */
  motion?: boolean | "pointer" | "bubble" | "ring";
  slot?: string;
}) {
  const captionId = `art-${idSuffix}`;
  const cue = motion === true ? "pointer" : motion || null;
  return (
    <figure data-slot={slot} className="my-6 overflow-hidden rounded-2xl border border-midnight/10 bg-white">
      <svg
        viewBox="0 0 280 168"
        role="img"
        aria-labelledby={captionId}
        className="h-auto w-full bg-paper text-midnight"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className={cue ? "gc-article-ink" : undefined}>{SCENES[name]}</g>
        {cue === "ring" && <circle className="gc-article-ring" cx="168" cy="52" r="26" stroke={GOLD} fill="none" />}
        <g className={cue === "bubble" ? "gc-article-bubble" : cue ? "gc-article-poke" : undefined}>
          <Poke label={pokeLabel(caption)} />
        </g>
      </svg>
      <figcaption id={captionId} data-slot="caption" className="border-t border-midnight/10 px-4 py-3 text-sm leading-snug text-midnight">
        {caption}
      </figcaption>
      <span className="sr-only">{alt}</span>
    </figure>
  );
}
