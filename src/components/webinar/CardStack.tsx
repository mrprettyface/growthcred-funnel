import { type ReactNode } from "react";
import { cn } from "../ui";
import { useReducedMotion } from "../../lib/motion";

/**
 * The card stack, rebuilt for phones with no JavaScript at all.
 *
 * The vendored ScrollStack produces this effect by recalculating a transform
 * for every card on every scroll event, reading layout as it goes. On a phone
 * that is the difference between smooth and broken, which is why it was pulled
 * from mobile entirely — and the page lost something it should not have lost.
 *
 * `position: sticky` gives the same behaviour for free. Each card pins a few
 * pixels lower than the one before it, so as you scroll, each new card rises
 * and covers the last while leaving a sliver of it showing above. The browser
 * does the whole thing on the compositor; there is no scroll handler, no layout
 * read, and nothing to throttle.
 *
 * Under reduced motion the cards are a plain list, in order, pinning nothing.
 */
export function CardStack({
  children,
  className,
  /** Where the first card pins, clear of the sticky site header. */
  offset = 88,
  /** How much of each buried card stays visible above the one covering it. */
  step = 14,
  /**
   * Scroll distance between one card arriving and the next. This gap is the
   * animation's runway: too small and the whole pile forms and releases in a
   * flick. The space is never empty, because the cards already pinned are
   * sitting in it.
   */
  gap = "34vh",
}: {
  children: ReactNode[];
  className?: string;
  offset?: number;
  step?: number;
  gap?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={cn("grid gap-4", className)}>{children}</div>;
  }

  return (
    <div className={cn("grid", className)} style={{ rowGap: gap }}>
      {children.map((child, i) => (
        <div
          key={i}
          className="sticky"
          style={{
            top: offset + i * step,
            // Cards deeper in the pile sit fractionally smaller, which reads as
            // depth. A fixed value per card, not a scroll calculation.
            scale: 1 - (children.length - 1 - i) * 0.012,
            // Last card on top. Without this the DOM order would let an earlier
            // card paint over the one covering it once both are pinned.
            zIndex: i + 1,
          }}
        >
          {child}
        </div>
      ))}
      {/* Tail, so the last card holds its pin briefly before the section ends. */}
      <div aria-hidden="true" className="h-[18vh]" />
    </div>
  );
}
