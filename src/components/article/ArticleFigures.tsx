import { ARTICLE_SCENES, scenesForCaptions } from "./articleScenes";

/**
 * Inline drawings for articles and the main menu, in the site's own stick-
 * figure hand (src/components/sceneKit.tsx). Each drawing matches its subject
 * (`name`); the full caption sits underneath, so the picture never has to
 * carry words. The box reserves its aspect ratio, so the page does not jump.
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

/** Three drawings in a row for an offer page; each picks its scene from its caption. */
export function OfferFigures({ seed, captions }: { seed: string; captions: string[] }) {
  const names = scenesForCaptions(captions.slice(0, 3));
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {captions.slice(0, 3).map((caption, i) => (
        <ArticleFigure
          key={`${seed}-${i}`}
          name={names[i]}
          alt={caption}
          caption={caption}
          idSuffix={`${seed}-${i}`}
          motion
        />
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
}: {
  name: ArtName;
  alt: string;
  caption: string;
  idSuffix?: string;
  /** Draw the lines in as the figure arrives. The hero stays still. Older
   *  values ("pointer", "bubble", "ring") all mean draw-in now. */
  motion?: boolean | "pointer" | "bubble" | "ring";
  slot?: string;
}) {
  const captionId = `art-${idSuffix}`;
  return (
    <figure data-slot={slot} className="my-6 overflow-hidden rounded-2xl border border-midnight/10 bg-white">
      <div className="bg-paper px-4 py-5 md:py-7">
        <svg
          viewBox="0 0 200 150"
          role="img"
          aria-labelledby={captionId}
          className="mx-auto block h-auto w-full max-w-[280px] text-midnight"
          style={{ aspectRatio: "200 / 150" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className={motion ? "gc-article-ink" : undefined}>{ARTICLE_SCENES[name]}</g>
        </svg>
      </div>
      <figcaption id={captionId} data-slot="caption" className="border-t border-midnight/10 px-4 py-3 text-sm leading-snug text-midnight">
        {caption}
      </figcaption>
      <span className="sr-only">{alt}</span>
    </figure>
  );
}
