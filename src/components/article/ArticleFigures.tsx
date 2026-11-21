import { GOLD } from "../sceneKit";
import { composedScene } from "./ArticleScene";

/**
 * Inline drawings for articles and the main menu. Each one is a small SVG
 * with a reserved aspect ratio, so the page does not jump when it paints.
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
function Poke({ label, aimX, aimY }: { label: string; aimX: number; aimY: number }) {
  const words = label.split(/\s+/).slice(0, 4);
  const lines = words.length <= 2 ? [words.join(" ")] : [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  const longest = Math.max(...lines.map((line) => line.length));
  const width = Math.min(150, Math.max(72, 24 + longest * 7.4));
  const height = lines.length > 1 ? 34 : 24;
  const x = 10;
  const y = 8;
  const fromX = x + width - 6;
  const fromY = y + height - 1;
  const dx = aimX - fromX;
  const dy = aimY - fromY;
  const len = Math.hypot(dx, dy) || 1;
  const tipX = fromX + (dx / len) * Math.max(18, len - 16);
  const tipY = fromY + (dy / len) * Math.max(18, len - 16);
  return (
    <g stroke="none">
      <path d={`M${fromX} ${fromY} L${tipX} ${tipY}`} stroke={GOLD} strokeWidth={2} fill="none" />
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

export function OfferFigures({ seed, captions }: { seed: string; captions: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {captions.slice(0, 3).map((caption, i) => (
        <ArticleFigure key={`${seed}-${i}`} name="check" alt={caption} caption={caption} idSuffix={`${seed}-${i}`} seed={`${seed}-${i}`} motion="pointer" />
      ))}
    </div>
  );
}

export function ArticleFigure({
  name,
  alt,
  caption,
  idSuffix = name,
  motion = false,
  slot = "figure",
  seed,
}: {
  name: ArtName;
  alt: string;
  caption: string;
  idSuffix?: string;
  /** Draw-in plus the cue for this section. The hero stays still. */
  motion?: boolean | "pointer" | "bubble" | "ring";
  slot?: string;
  /** Makes this drawing's composition unique to the page and section. */
  seed?: string;
}) {
  const captionId = `art-${idSuffix}`;
  const cue = motion === true ? "pointer" : motion || null;
  const scene = composedScene(seed || `${name}-${caption}`, caption);
  return (
    <figure data-slot={slot} className="my-6 overflow-hidden rounded-2xl border border-midnight/10 bg-white">
      <svg
        viewBox="0 0 320 200"
        role="img"
        aria-labelledby={captionId}
        className="block h-auto w-full bg-paper text-midnight"
        style={{ aspectRatio: "320 / 200" }}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className={cue ? "gc-article-ink" : undefined}>{scene.node}</g>
        {cue === "ring" && <circle className="gc-article-ring" cx={scene.aimX} cy={scene.aimY} r={18} stroke={GOLD} fill="none" />}
        <g className={cue === "bubble" ? "gc-article-bubble" : cue ? "gc-article-poke" : undefined}>
          <Poke label={pokeLabel(caption)} aimX={scene.aimX} aimY={scene.aimY} />
        </g>
      </svg>
      <figcaption id={captionId} data-slot="caption" className="border-t border-midnight/10 px-4 py-3 text-sm leading-snug text-midnight">
        {caption}
      </figcaption>
      <span className="sr-only">{alt}</span>
    </figure>
  );
}
