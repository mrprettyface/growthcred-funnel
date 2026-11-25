import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Footer, Header } from "../components/Layout";
import { BuyButton } from "../components/shop/BuyButton";
import { TeeMockup } from "../components/shop/TeeMockup";
import { ButtonLink, DarkBackdrop, Eyebrow, H1, cn } from "../components/ui";
import { track } from "../lib/analytics";
import {
  SHOP_BY_SLUG,
  SHOP_PATH,
  SHOP_PRODUCTS,
  SHOP_SHIPPING,
  SHOP_SIZES,
  shopPrice,
  type ShopSize,
} from "../lib/shop";

type Face = "front" | "back";

/**
 * /shop/:slug — size picker, front/back toggle, price, Buy.
 */
export default function ShopProduct() {
  const { slug = "" } = useParams();
  const product = SHOP_BY_SLUG[slug];
  const [size, setSize] = useState<ShopSize>("L");
  const [face, setFace] = useState<Face>("front");

  useEffect(() => {
    if (product) track("shop_product_view", { product: product.id });
  }, [product]);

  if (!product) return <Navigate to={SHOP_PATH} replace />;

  const hasBack = product.prints === "chest-and-back";

  return (
    <div className="min-h-screen bg-paper text-midnight">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>
      <Header cta={{ to: product.path, label: "Buy" }} />
      <main id="main-content">
        <section
          id="product"
          data-tone="dark"
          className="relative isolate overflow-x-clip bg-midnight pb-16 pt-10 text-cream md:pb-24 md:pt-16"
        >
          <DarkBackdrop />
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/45">
              <Link to={SHOP_PATH} className="text-cream/70 no-underline hover:text-gold">
                Shop
              </Link>
              {" / "}
              <span aria-current="page">{product.name}</span>
            </nav>

            <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="relative overflow-hidden rounded-[2rem] bg-[#16161e] px-4 pb-2 pt-6 md:px-8 md:pt-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_10%,rgba(200,160,74,0.14),transparent_50%)]"
                  />
                  <TeeMockup product={product} face={face} className="relative" />
                </div>
                <div className="mt-5 flex gap-2" role="group" aria-label="Front or back view">
                  {(["front", "back"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFace(f)}
                      aria-pressed={face === f}
                      className={cn(
                        "min-h-11 rounded-full px-5 font-body text-sm font-semibold capitalize transition",
                        face === f
                          ? "bg-gold text-midnight"
                          : "border border-cream/25 bg-transparent text-cream hover:border-gold hover:text-gold",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {!hasBack && face === "back" ? (
                  <p className="mt-3 text-sm text-cream/50">This tee is chest print only. The back is plain.</p>
                ) : null}
              </div>

              <div>
                <Eyebrow dark>Merch</Eyebrow>
                <H1 className="mt-4 text-cream">{product.name}</H1>
                <p className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-gold">
                  {shopPrice(product)}
                </p>
                <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-cream/70">{product.blurb}</p>
                <p className="mt-3 text-sm text-cream/50">{product.fabric}</p>
                <p className="mt-3 text-sm text-cream/50">{SHOP_SHIPPING}</p>
                <p className="mt-3 text-sm text-cream/50">
                  You pick your size. I print it for you. No warehouse pile.
                </p>

                <fieldset className="mt-8">
                  <legend className="font-mono text-[12px] uppercase tracking-[0.18em] text-cream/55">
                    Size
                  </legend>
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
                            ? "bg-cream text-midnight"
                            : "border border-cream/25 text-cream hover:border-gold hover:text-gold",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <BuyButton product={product} size={size} className="mt-8 max-w-md" />

                {product.backQuote ? (
                  <blockquote className="mt-10 max-w-[28ch] border-l-2 border-gold pl-5 font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-cream/85">
                    {product.backQuote.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </blockquote>
                ) : null}

                <p className="mt-10">
                  <Link to={SHOP_PATH} className="text-sm font-semibold text-cream/60 no-underline hover:text-gold">
                    ← Back to shop
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="also" className="py-16 md:py-20" data-tone="light">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <Eyebrow>Also in the drop</Eyebrow>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
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
