import { useEffect, useRef, useState } from "react";
import { SeatButton } from "./SeatCta";
import { cn } from "../ui";

/**
 * The always-there ask on mobile — which has to know when to get out of the way.
 *
 * Two fixes over the naive version. It carries a solid background rather than a
 * translucent one with a backdrop-blur: a blurred backdrop on a bar that is
 * pinned over moving content has to recompute for every frame of every scroll,
 * and it lets content ghost through underneath.
 *
 * And it hides itself once a real seat form or CTA is on screen, so the end of
 * the page never shows two identical gold buttons stacked on top of each other.
 */
export function StickySeatBar({ watch }: { watch: string[] }) {
  const [hidden, setHidden] = useState(false);
  const visibleCount = useRef(0);

  useEffect(() => {
    const targets = watch
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleCount.current += entry.isIntersecting ? 1 : -1;
        });
        visibleCount.current = Math.max(0, visibleCount.current);
        setHidden(visibleCount.current > 0);
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [watch]);

  return (
    <div
      className={cn(
        "sticky bottom-0 z-40 border-t border-midnight/10 bg-paper p-3 transition-transform duration-300 md:hidden",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
    >
      <SeatButton className="w-full">Save my seat &middot; 2 September</SeatButton>
    </div>
  );
}
