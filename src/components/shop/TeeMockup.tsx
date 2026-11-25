import { cn } from "../ui";
import { GcMark } from "./GcMark";
import type { ShopProduct } from "../../lib/shop";

type Face = "front" | "back";

/**
 * CSS/SVG tee mockup. Front shows the official chest mark. Back shows the
 * Dream quote when the product carries one. No stock photos.
 */
export function TeeMockup({
  product,
  face = "front",
  className,
}: {
  product: ShopProduct;
  face?: Face;
  className?: string;
}) {
  const washed = product.id === "gc-mark-tee";
  const body = washed ? "#2a2a32" : "#14141c";
  const seam = washed ? "#3a3a44" : "#1c1c26";
  const showBack = face === "back" && product.prints === "chest-and-back" && product.backQuote;

  return (
    <div
      className={cn("shop-tee relative mx-auto w-full max-w-[22rem]", className)}
      data-face={face}
      data-product={product.id}
    >
      <svg viewBox="0 0 320 360" className="h-auto w-full" role="img" aria-label={`${product.name}, ${face} view`}>
        <defs>
          <linearGradient id={`tee-shine-${product.id}-${face}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.07" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#c8a04a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Body */}
        <path
          d="M108 54 L62 88 L78 118 L108 98 L108 330 Q160 342 212 330 L212 98 L242 118 L258 88 L212 54 Q160 38 108 54 Z"
          fill={body}
        />
        {/* Neck */}
        <path d="M124 58 Q160 78 196 58 Q160 48 124 58 Z" fill={seam} />
        <path d="M132 56 Q160 70 188 56" fill="none" stroke="#0e0e14" strokeWidth="2" opacity="0.35" />
        {/* Sleeves fold */}
        <path d="M78 118 L108 98" fill="none" stroke={seam} strokeWidth="3" strokeLinecap="round" />
        <path d="M242 118 L212 98" fill="none" stroke={seam} strokeWidth="3" strokeLinecap="round" />
        {/* Soft sheen */}
        <path
          d="M108 54 L62 88 L78 118 L108 98 L108 330 Q160 342 212 330 L212 98 L242 118 L258 88 L212 54 Q160 38 108 54 Z"
          fill={`url(#tee-shine-${product.id}-${face})`}
        />
        {/* Side seams */}
        <path d="M112 110 V320" fill="none" stroke="#0e0e14" strokeWidth="1" opacity="0.25" />
        <path d="M208 110 V320" fill="none" stroke="#0e0e14" strokeWidth="1" opacity="0.25" />
      </svg>

      {face === "front" ? (
        <div className="pointer-events-none absolute left-[38%] top-[34%] w-[14%] -translate-x-1/2">
          <GcMark className="h-auto w-full drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]" title="GrowthCred chest mark" />
        </div>
      ) : null}

      {showBack && product.backQuote ? (
        <div className="pointer-events-none absolute left-1/2 top-[30%] w-[58%] -translate-x-1/2 text-center">
          <p className="font-display text-[clamp(0.55rem,2.4vw,0.8rem)] font-semibold leading-snug tracking-[-0.02em] text-cream/90">
            {product.backQuote.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <p className="mt-2 font-display text-[clamp(0.4rem,1.6vw,0.55rem)] font-bold tracking-[-0.03em] text-gold">
            Growth<span className="text-gold">Cred</span>
          </p>
        </div>
      ) : null}

      {face === "back" && product.prints === "chest" ? (
        <p className="pointer-events-none absolute left-1/2 top-[42%] w-[50%] -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream/35">
          Plain back
        </p>
      ) : null}
    </div>
  );
}
