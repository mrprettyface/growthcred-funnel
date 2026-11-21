import { GOLD } from "../sceneKit";
import { composedScene, type BubbleDir } from "./ArticleScene";

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

/** A short pointer from the bubble to the mouth. The pill sits beside the face. */
function Poke({ label, aimX, aimY, dir }: { label: string; aimX: number; aimY: number; dir: BubbleDir }) {
  const words = label.split(/\s+/).slice(0, 4);
  const lines = words.length <= 2 ? [words.join(" ")] : [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
  const longest = Math.max(...lines.map((line) => line.length));
  const width = Math.min(148, Math.max(72, 22 + longest * 7.2));
  const height = lines.length > 1 ? 34 : 24;
  const preferred = dir === "nw" ? aimX - width - 14 : aimX + 14;
  const parked = preferred < 8 || preferred + width > 312;
  const x = parked ? 8 : Math.max(6, Math.min(312 - width, preferred));
  const y = parked ? 6 : Math.max(4, Math.min(168, aimY - height / 2));
  const fromX = parked ? x + 22 : dir === "nw" ? x + width : x;
  const fromY = parked ? y + height : y + height / 2;
  const pointer = parked ? `M${fromX} ${fromY} L${fromX} ${aimY} L${aimX} ${aimY}` : `M${fromX} ${fromY} L${aimX} ${aimY}`;
  return (
    <g stroke="none">
      <path d={pointer} stroke={GOLD} strokeWidth={2} fill="none" />
      <path d={`M${aimX} ${aimY} l${dir === "nw" ? -8 : 8} -2 l${dir === "nw" ? 2 : -2} 7 z`} fill={GOLD} />
      <rect x={x} y={y} width={width} height={height} rx={height / 2} fill="#fff" stroke={GOLD} strokeWidth={1.6} />
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
        {cue === "ring" && <circle className="gc-article-ring" cx={scene.aimX} cy={scene.aimY} r={8} stroke={GOLD} fill="none" />}
        <g className={cue === "bubble" ? "gc-article-bubble" : cue ? "gc-article-poke" : undefined}>
          <Poke label={pokeLabel(caption)} aimX={scene.aimX} aimY={scene.aimY} dir={scene.dir} />
        </g>
      </svg>
      <figcaption id={captionId} data-slot="caption" className="border-t border-midnight/10 px-4 py-3 text-sm leading-snug text-midnight">
        {caption}
      </figcaption>
      <span className="sr-only">{alt}</span>
    </figure>
  );
}
