import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../ui";
import { useReducedMotion } from "../../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * A full-bleed photograph between scenes.
 *
 * Two jobs. It gives the eye somewhere to rest in a page that is otherwise a
 * long argument in words, and it marks the turn from one part of the story to
 * the next. The line over it is the caption, not a new point — if it needs
 * explaining it is the wrong photo.
 *
 * The image drifts slightly slower than the page, which reads as depth. Under
 * reduced motion it simply sits still.
 */
export function ImageBreak({
  src,
  alt,
  line,
  eyebrow,
  position = "center",
  height = "tall",
}: {
  src: string;
  alt: string;
  line?: string;
  eyebrow?: string;
  position?: string;
  height?: "tall" | "short";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    const image = imageRef.current;
    if (!host || !image || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, host);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={hostRef}
      data-tone="dark"
      className={cn(
        "relative w-full overflow-hidden bg-midnight",
        height === "tall" ? "h-[58vh] min-h-[360px]" : "h-[38vh] min-h-[240px]",
      )}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        /* Oversized so the parallax drift never exposes an edge. */
        className="absolute inset-0 h-[120%] w-full -translate-y-[8%] object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/45 to-midnight/20"
      />

      {(line || eyebrow) && (
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))] pb-10 md:pb-14">
            {eyebrow && (
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">
                {eyebrow}
              </p>
            )}
            {line && (
              <p className="mt-3 max-w-[20ch] font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.04em] text-cream md:text-4xl">
                {line}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
