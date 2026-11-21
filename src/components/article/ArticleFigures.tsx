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
      <path d="M158 52v80M126 132h64" />
      <path d="M98 70h120" />
      <path d="M98 70l-22 28h44z" />
      <path d="M218 70l-22 28h44z" />
      <circle cx="98" cy="106" r="5" fill={GOLD} stroke="none" />
      <path d="M204 102h24M204 110h16" />
      <Figure x={40} y={100} arms="M0 10 l18 2 M0 10 l-8 14" />
      <rect x="22" y="122" width="20" height="14" rx="2" />
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
      <rect x="28" y="46" width="58" height="78" rx="4" />
      <path d="M40 66h34M40 80h26M40 94h30" />
      <Figure x={112} y={108} arms="M0 8 l20 -10 M0 8 l-8 14" />
      <path d="M128 78h22" />
      <rect x="156" y="46" width="96" height="70" rx="8" />
      <path d="M170 76h64M170 92h40" />
      <circle cx="204" cy="60" r="5" fill={GOLD} stroke="none" />
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
      <rect x="28" y="48" width="64" height="88" rx="4" />
      <path d="M40 70h40M40 86h32M40 102h36" />
      <Figure x={124} y={108} arms="M0 10 l18 -4 M0 10 l-10 12" />
      <rect x="150" y="78" width="28" height="20" rx="2" />
      <circle cx="214" cy="72" r="22" />
      <path d="M204 72h20M214 62v20" stroke={GOLD} />
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
      <Figure x={48} y={108} arms="M0 10 l16 4 M0 10 l-8 14" />
      <rect x="78" y="86" width="62" height="40" rx="4" />
      <path d="M90 102h36" />
      <rect x="156" y="68" width="46" height="58" rx="4" />
      <path d="M168 86h22M168 102h16" />
      <circle cx="230" cy="78" r="14" />
      <path d="M230 70v16M222 78h16" stroke={GOLD} />
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

const TRAIL = new Set(["a", "an", "the", "from", "to", "of", "and", "or", "in", "on", "for", "with", "your", "you", "at", "by"]);

/** A finished phrase of two to four words, never a chopped sentence. */
function pokeLabel(caption: string) {
  const words = caption.replace(/[.!?].*$/, "").split(/\s+/).map((word) => word.replace(/[^A-Za-z0-9'-]/g, "")).filter(Boolean).slice(0, 5);
  let end = Math.min(4, words.length);
  for (let i = 2; i < words.length; i += 1) {
    if (TRAIL.has(words[i].toLowerCase().replace(/[^a-z]/g, ""))) {
      end = i;
      break;
    }
  }
  while (end > 2 && TRAIL.has(words[end - 1].toLowerCase().replace(/[^a-z]/g, ""))) end -= 1;
  return words.slice(0, Math.max(2, end)).join(" ");
}

/** A pointer and a highlight that stays inside the drawing. */
function Poke({ label }: { label: string }) {
  const words = label.split(/\s+/).slice(0, 4);
  const lines = words.length <= 2 ? [words.join(" ")] : [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  const longest = Math.max(...lines.map((line) => line.length));
  const width = Math.min(156, Math.max(78, 26 + longest * 7.2));
  const height = lines.length > 1 ? 34 : 24;
  const x = 12;
  const y = 8;
  const tipX = Math.min(248, x + width + 16);
  const tipY = y + height + 14;
  return (
    <g stroke="none">
      <path d={`M${x + width - 10} ${y + height - 1} L${tipX} ${tipY}`} stroke={GOLD} strokeWidth={2} fill="none" />
      <path d={`M${tipX} ${tipY} l-9 -1 l3 7 z`} fill={GOLD} />
      <rect x={x} y={y} width={width} height={height} rx={height / 2} fill="#fff" stroke={GOLD} strokeWidth={1.5} />
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + width / 2}
          y={y + (lines.length > 1 ? 14 + i * 13 : 16)}
          textAnchor="middle"
          fontSize={11}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fill="#1a1a24"
        >
          {line}
        </text>
      ))}
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
        viewBox="0 0 280 180"
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
