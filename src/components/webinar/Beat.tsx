import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../ui";
import { useReducedMotion } from "../../lib/motion";

/**
 * One idea, given room to land.
 *
 * A four-paragraph block is fine on a wide screen, where the eye can see the
 * shape of the whole thing at once. On a phone the same block is a wall: you
 * scroll into the middle of it with no idea how much is left. So each Beat
 * arrives on its own and fades up — you are handed one thought at a time.
 *
 * Spacing follows the content. An earlier version reserved a fixed share of the
 * viewport for every Beat, which meant a five-word line claimed as much screen
 * as a three-line paragraph, and the page filled with dead air between short
 * sentences. Padding scales the gap to what is actually in the Beat instead.
 * Use `solo` for the rare line that has genuinely earned a screen to itself.
 *
 * This never hides anything: every word is in the DOM, and under reduced motion
 * it is a plain paragraph with normal spacing.
 */
export function Beat({
  children,
  className,
  /** `lead` gets the larger type reserved for the sentence that carries a point. */
  lead = false,
  /** Give this Beat a screen of its own. Use sparingly — it is the loud option. */
  solo = false,
}: {
  children: ReactNode;
  className?: string;
  lead?: boolean;
  solo?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(reduced);

  useEffect(() => {
    // Fail open: no observer support means show the content, never hide it.
    if (reduced || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      // Trigger a little earlier than before (-8% vs -12%): on a phone the
      // reveal should feel like it is reacting to you, not trailing you.
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700",
        // Breathing room proportional to the content, not to the viewport.
        reduced ? "mt-5" : "py-5 md:py-0 md:mt-5",
        // The loud option, opted into per Beat rather than applied to all.
        solo && !reduced && "flex min-h-[62vh] flex-col justify-center py-0 md:min-h-0 md:py-0",
        // Compositor-only properties: transform and opacity, never filter.
        seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        lead ? "text-lg font-medium md:text-xl" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
