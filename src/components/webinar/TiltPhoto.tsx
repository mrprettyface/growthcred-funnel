import { useRef, type CSSProperties } from "react";
import { cn } from "../ui";
import { useReducedMotion } from "../../lib/motion";

/**
 * A photo that tilts toward the pointer.
 *
 * Replaces React Bits' TiltedCard, which is lovely but reaches for a spring
 * library to do it — 101 kB gzipped for a hover effect on one image, on the
 * page that takes the money. This does the same job with two CSS custom
 * properties and a transform: no dependency, no spring, and the browser
 * composites it on the GPU.
 *
 * Pointer only. Touch devices get the photo, since there is no hover to answer
 * and tilting under a finger fights the scroll.
 */
export function TiltPhoto({
  src,
  alt,
  className,
  amplitude = 8,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Maximum tilt in degrees at the corners. */
  amplitude?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // -0.5..0.5 from the centre of the card.
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * amplitude).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * amplitude).toFixed(2)}deg`);
    el.style.setProperty("--scale", "1.03");
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--scale", "1");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={
        {
          "--rx": "0deg",
          "--ry": "0deg",
          "--scale": "1",
          perspective: "900px",
        } as CSSProperties
      }
      className={cn("[transform-style:preserve-3d]", className)}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_22%] transition-transform duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))_scale(var(--scale))]"
      />
    </div>
  );
}
