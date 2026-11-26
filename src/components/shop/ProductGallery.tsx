import { useEffect, useState } from "react";
import { cn } from "../ui";
import type { ShopImage } from "../../lib/shop";

/**
 * Product photo gallery: large view + clickable thumbnails.
 * Photos only — no SVG tee mockups.
 */
export function ProductGallery({
  images,
  productId,
  colour,
}: {
  images: readonly ShopImage[];
  productId: string;
  colour: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [productId, colour, images]);

  if (!images.length) return null;
  const current = images[Math.min(active, images.length - 1)] ?? images[0];

  return (
    <div data-gallery={productId} data-colour={colour}>
      <div className="shop-card-surface overflow-hidden">
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={900}
          height={1125}
          className="shop-tee-lift aspect-[4/5] w-full object-cover"
          decoding="async"
        />
      </div>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Product views">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show ${image.label}`}
              className={cn(
                "overflow-hidden rounded-xl border-2 transition",
                i === active ? "border-midnight" : "border-transparent hover:border-midnight/25",
              )}
            >
              <img
                src={image.src}
                alt=""
                width={96}
                height={120}
                className="h-20 w-16 object-cover md:h-24 md:w-20"
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{current.label}</p>
    </div>
  );
}
