import { cn } from "../ui";
import { GcMark } from "./GcMark";
import type { ShopColour, ShopProduct } from "../../lib/shop";

type Face = "front" | "back";

/**
 * CSS/SVG tee mockup. Colour drives fabric and print ink. No stock photos.
 * Chest mark stays the existing repo logo until the GC arrow mark arrives.
 */
export function TeeMockup({
  product,
  colour = "Black",
  face = "front",
  className,
}: {
  product: ShopProduct;
  colour?: ShopColour;
  face?: Face;
  className?: string;
}) {
  const white = colour === "White";
  const body = white ? "#f4f2ec" : "#1a1a24";
  const seam = white ? "#ddd8ce" : "#2c2c36";
  const stitch = white ? "rgba(26,26,36,0.12)" : "rgba(0,0,0,0.35)";
  const markOn = white ? "light" : "dark";

  const dreamInk = white ? "text-midnight" : "text-cream";
  const wifiHeadline = white ? "text-[#c62828]" : "text-gold";
  const qrSrc = white ? "/images/shop/qr-growthcred.svg" : "/images/shop/qr-growthcred-cream.svg";

  return (
    <div
      className={cn("shop-tee relative mx-auto w-full max-w-[22rem]", className)}
      data-face={face}
      data-product={product.id}
      data-colour={colour}
    >
      <svg
        viewBox="0 0 320 360"
        className="h-auto w-full"
        role="img"
        aria-label={`${product.name}, ${colour}, ${face} view`}
      >
        <defs>
          <linearGradient id={`tee-shine-${product.id}-${colour}-${face}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={white ? 0.55 : 0.08} />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#c8a04a" stopOpacity={white ? 0.04 : 0.06} />
          </linearGradient>
        </defs>
        <path
          d="M108 54 L62 88 L78 118 L108 98 L108 330 Q160 342 212 330 L212 98 L242 118 L258 88 L212 54 Q160 38 108 54 Z"
          fill={body}
        />
        <path d="M124 58 Q160 78 196 58 Q160 48 124 58 Z" fill={seam} />
        <path d="M132 56 Q160 70 188 56" fill="none" stroke={stitch} strokeWidth="2" />
        <path d="M78 118 L108 98" fill="none" stroke={seam} strokeWidth="3" strokeLinecap="round" />
        <path d="M242 118 L212 98" fill="none" stroke={seam} strokeWidth="3" strokeLinecap="round" />
        <path
          d="M108 54 L62 88 L78 118 L108 98 L108 330 Q160 342 212 330 L212 98 L242 118 L258 88 L212 54 Q160 38 108 54 Z"
          fill={`url(#tee-shine-${product.id}-${colour}-${face})`}
        />
        <path d="M112 110 V320" fill="none" stroke={stitch} strokeWidth="1" />
        <path d="M208 110 V320" fill="none" stroke={stitch} strokeWidth="1" />
      </svg>

      {face === "front" ? (
        <div className="pointer-events-none absolute left-[38%] top-[34%] w-[13%] -translate-x-1/2">
          <GcMark on={markOn} className="h-auto w-full" title="GrowthCred chest mark" />
        </div>
      ) : null}

      {face === "back" && product.prints === "dream-back" && product.dreamLines ? (
        <div className="pointer-events-none absolute left-1/2 top-[28%] w-[62%] -translate-x-1/2 text-center">
          <p className={cn("font-condensed uppercase leading-[0.9] tracking-[0.02em]", dreamInk)}>
            {product.dreamLines.map((line) => (
              <span
                key={line}
                className={cn(
                  "block",
                  line === "DREAM"
                    ? "text-[clamp(1.35rem,6.5vw,2.15rem)]"
                    : "text-[clamp(0.72rem,3.4vw,1.05rem)]",
                )}
              >
                {line}
              </span>
            ))}
          </p>
          <p className="mt-2 font-display text-[clamp(0.42rem,1.7vw,0.58rem)] font-bold tracking-[-0.03em] text-gold">
            GrowthCred
          </p>
        </div>
      ) : null}

      {face === "back" && product.prints === "wifi-back" ? (
        <div className="pointer-events-none absolute left-1/2 top-[27%] w-[58%] -translate-x-1/2 text-center">
          <p
            className={cn(
              "font-condensed text-[clamp(1.1rem,5.2vw,1.7rem)] uppercase leading-none tracking-[0.04em]",
              wifiHeadline,
            )}
          >
            FREE WiFi
          </p>
          <img
            src={qrSrc}
            alt="QR code to growthcred.co.za"
            width={120}
            height={120}
            className="mx-auto mt-3 w-[48%] max-w-[7.5rem]"
            decoding="async"
          />
        </div>
      ) : null}

      {face === "back" && product.prints === "chest" ? (
        <p
          className={cn(
            "pointer-events-none absolute left-1/2 top-[42%] w-[50%] -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.18em]",
            white ? "text-midnight/30" : "text-cream/35",
          )}
        >
          Plain back
        </p>
      ) : null}
    </div>
  );
}
