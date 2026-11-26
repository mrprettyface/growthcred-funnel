import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer, Header } from "../components/Layout";
import { BuyButton } from "../components/shop/BuyButton";
import { ProductGallery } from "../components/shop/ProductGallery";
import { ButtonLink, Eyebrow, H1, cn } from "../components/ui";
import { track } from "../lib/analytics";
import {
  SHOP_BY_SLUG,
  SHOP_PATH,
  SHOP_PRODUCTS,
  SHOP_SHIPPING,
  SHOP_SIZES,
  galleryFor,
  shopPrice,
  type ShopColour,
  type ShopSize,
} from "../lib/shop";

/**
 * /shop/:slug — colour (when offered), size, photo gallery, price, Buy.
 */
export default function ShopProduct() {
  const { slug = "" } = useParams();
  const product = SHOP_BY_SLUG[slug];
  const [size, setSize] = useState<ShopSize>("L");
  const [colour, setColour] = useState<ShopColour>(product?.colours[0] ?? "Black");

  useEffect(() => {
    if (product) track("shop_product_view", { product: product.id });
  }, [product]);

  useEffect(() => {
    if (!product) return;
    setColour(product.colours[0]);
    setSize("L");
  }, [product]);

  if (!product) return <Navigate to={SHOP_PATH} replace />;

  const images = galleryFor(product, colour);
  const multiColour = product.colours.length > 1;

  return (
    <div className="min-h-screen bg-white text-midnight">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>
      <Header tone="light" cta={{ to: product.path, label: "Buy" }} />
      <main id="main-content">
        <section id="product" data-tone="light" className="pb-16 pt-8 md:pb-24 md:pt-12">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              <Link to={SHOP_PATH} className="text-ink no-underline hover:text-gold">
                Shop
              </Link>
              {" / "}
              <span aria-current="page">{product.name}</span>
            </nav>

            <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <ProductGallery images={images} productId={product.id} colour={colour} />

              <div>
                <Eyebrow>Merch</Eyebrow>
                <H1 className="mt-3 text-midnight">{product.name}</H1>
                <p className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-gold">
                  {shopPrice(product)}
                </p>
                <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-ink md:text-lg">{product.blurb}</p>
                <p className="mt-2 text-sm text-muted">{product.fabric}</p>
                <p className="mt-2 text-sm text-muted">{SHOP_SHIPPING}</p>
                <p className="mt-2 text-sm text-muted">You pick your size. I print it for you.</p>

                {multiColour ? (
                  <fieldset className="mt-7">
                    <legend className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">Colour</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.colours.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setColour(c)}
                          aria-pressed={colour === c}
                          className={cn(
                            "inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-body text-sm font-semibold transition",
                            colour === c
                              ? "bg-midnight text-cream"
                              : "border border-midnight/15 text-midnight hover:border-gold hover:text-gold",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-3.5 w-3.5 rounded-full border border-midnight/20",
                              c === "Black" ? "bg-midnight" : "bg-white",
                            )}
                          />
                          {c}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <p className="mt-7 font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
                    Colour · {colour}
                  </p>
                )}

                <fieldset className="mt-6">
                  <legend className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">Size</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SHOP_SIZES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        aria-pressed={size === s}
                        className={cn(
                          "min-h-11 min-w-11 rounded-full px-3 font-body text-sm font-semibold transition",
                          size === s
                            ? "bg-midnight text-cream"
                            : "border border-midnight/15 text-midnight hover:border-gold hover:text-gold",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <BuyButton product={product} size={size} colour={colour} className="mt-7 max-w-md" />

                <p className="mt-10">
                  <Link to={SHOP_PATH} className="text-sm font-semibold text-ink no-underline hover:text-gold">
                    ← Back to shop
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="also" data-tone="light" className="border-t border-midnight/8 py-14 md:py-20">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <Eyebrow>Also in the drop</Eyebrow>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {SHOP_PRODUCTS.filter((p) => p.id !== product.id).map((other) => (
                <li key={other.id}>
                  <ButtonLink to={other.path} variant="outline" className="w-full justify-between">
                    <span>{other.name}</span>
                    <span>{shopPrice(other)}</span>
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
