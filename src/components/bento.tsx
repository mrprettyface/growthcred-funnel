import type { CSSProperties, ReactNode } from "react";
import { cn } from "./ui";

/**
 * The bento kit (22 Nov 2026). One shared set of pieces so the bento style the
 * homepage uses can be reused on any page without hand-rolled styles:
 *
 *   <Bento>      a 12-column grid on desktop with a 1rem gap, one column below lg.
 *   <Tile>       a rounded-[2rem] card in one of six tones.
 *   <Sticker>    a tilted decorative chip that pops in and drifts (index.css,
 *                .gc-sticker). aria-hidden: it may only repeat words that are
 *                already on the page, never carry new information.
 *
 * Tones keep contrast safe: text on `gold` is midnight, text on `night` is cream.
 * A gold PillLink must never sit on a gold tile; use `onGold` on PillLink's
 * className (white button) instead.
 */

export type TileTone = "gold" | "white" | "paper" | "night" | "nightSoft" | "dashed" | "dashedDark";

const TONES: Record<TileTone, string> = {
  gold: "bg-gold-soft text-midnight",
  white: "border border-midnight/10 bg-white text-midnight",
  paper: "border border-midnight/10 bg-paper text-midnight",
  night: "bg-midnight text-cream",
  nightSoft: "border border-cream/10 bg-midnight-soft/80 text-cream",
  dashed: "border-2 border-dashed border-midnight/25 text-midnight",
  dashedDark: "border-2 border-dashed border-cream/25 text-cream",
};

/** Body text colour that reads on each tone. */
export const TILE_TEXT: Record<TileTone, string> = {
  gold: "text-midnight/80",
  white: "text-ink",
  paper: "text-ink",
  night: "text-cream/75",
  nightSoft: "text-cream/70",
  dashed: "text-ink",
  dashedDark: "text-cream/70",
};

/** The white button for use on a gold tile (the gold pill would vanish there). */
export const ON_GOLD_BUTTON = "bg-white shadow-[0_14px_34px_-16px_rgba(26,26,36,0.55)] hover:bg-paper";

/** Tile classes for an element that can't be a <Tile> (a router <Link> card). */
export function tileClass(tone: TileTone, className?: string) {
  return cn("relative min-w-0 rounded-[2rem] p-7 md:p-9", TONES[tone], className);
}

export function Bento({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("grid gap-4 lg:grid-cols-12", className)}>{children}</div>;
}

export function Tile({
  tone = "white",
  as: As = "div",
  className,
  style,
  children,
}: {
  tone?: TileTone;
  as?: "div" | "article" | "li";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <As style={style} className={cn("relative min-w-0 rounded-[2rem] p-7 md:p-9", TONES[tone], className)}>
      {children}
    </As>
  );
}

export type StickerTone = "gold" | "white" | "night";

const STICKER_TONES: Record<StickerTone, string> = {
  gold: "bg-gold-soft text-midnight",
  white: "bg-white text-midnight",
  night: "bg-midnight text-gold-soft",
};

/**
 * A tilted chip. Position it with `className` (absolute + left/top + rotate-[..]).
 * `shape="circle"` makes a round stamp; size it with h-/w- classes on `chipClassName`.
 */
export function Sticker({
  i = 0,
  tone = "white",
  shape = "pill",
  className,
  chipClassName,
  children,
}: {
  i?: number;
  tone?: StickerTone;
  shape?: "pill" | "circle";
  className?: string;
  chipClassName?: string;
  children: ReactNode;
}) {
  return (
    <StickerFrame i={i} className={className}>
      <span
        className={cn(
          "font-display font-extrabold tracking-[-0.02em] shadow-[0_18px_40px_-18px_rgba(26,26,36,0.6)]",
          shape === "circle"
            ? "grid place-items-center rounded-full p-3 text-center leading-tight"
            : "block whitespace-nowrap rounded-2xl px-4 py-2.5",
          STICKER_TONES[tone],
          chipClassName,
        )}
      >
        {children}
      </span>
    </StickerFrame>
  );
}

/** The bare moving frame, for a sticker with its own shape (an icon tile, a triangle). */
export function StickerFrame({ i = 0, className, children }: { i?: number; className?: string; children: ReactNode }) {
  return (
    <span aria-hidden="true" style={{ "--i": i } as CSSProperties} className={cn("gc-sticker absolute z-10 select-none", className)}>
      {children}
    </span>
  );
}

/** A number in a gold-ringed circle: the bento way to count items. */
export function Num({ n, dark = false }: { n: number; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-grid h-11 w-11 place-items-center rounded-full font-mono text-sm",
        dark ? "border border-gold/50 text-gold" : "border border-midnight/20 text-midnight",
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
