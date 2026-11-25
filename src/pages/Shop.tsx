import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components/Layout";
import { GcMark } from "../components/shop/GcMark";
import { TeeMockup } from "../components/shop/TeeMockup";
import { ButtonLink, DarkBackdrop, Eyebrow, H1, H2, cn } from "../components/ui";
import { track } from "../lib/analytics";
import {
  SHOP_PRODUCTS,
  SHOP_SHIPPING,
  SHOP_STORY,
  shopPrice,
} from "../lib/shop";

/**
 * /shop — GrowthCred merch. Hero, product grid, short brand story.
 * Product detail lives at /shop/:slug.
 */
export default function Shop() {
  useEffect(() => {
    track("shop_view");
  }, []);

  return (
    <div className="min-h-screen bg-paper text-midnight">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>
      <Header cta={{ to: "/shop#tees", label: "Shop tees" }} />
      <main id="main-content">
        {/* Hero: dark, premium, official mark. No invented GC arrow. */}
        <section
          id="hero"
          data-tone="dark"
          className="relative isolate overflow-x-clip bg-midnight pb-20 pt-16 text-cream md:pb-28 md:pt-24"
        >
          <DarkBackdrop glow="top" />
          <div
            aria-hidden="true"
            className="shop-hero-glass pointer-events-none absolute inset-0 -z-10"
          />
          <div className="mx-auto grid w-[min(1120px,calc(100%-2.5rem))] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow dark>{SHOP_STORY.eyebrow}</Eyebrow>
              <H1 className="mt-6 max-w-[12ch] text-cream">
                {SHOP_STORY.h1.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-gold">{SHOP_STORY.h1.split(" ").slice(-1)}</span>
              </H1>
              <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-cream/70">
                {SHOP_STORY.lead}
              </p>
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-cream/50">
                {SHOP_SHIPPING}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="#tees" className="min-w-[10rem]">
                  See the tees
                </ButtonLink>
                <Link
                  to="/call"
                  className="font-body text-sm font-semibold text-cream/70 no-underline hover:text-gold"
                >
                  Or apply for the work →
                </Link>
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
              <div className="shop-hero-mark relative grid place-items-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-[-18%] rounded-[28%] bg-[radial-gradient(circle_at_30%_25%,rgba(232,224,208,0.18),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(200,160,74,0.22),transparent_50%)]"
                />
                <GcMark
                  withTile
                  className="shop-mark-float relative h-44 w-44 md:h-56 md:w-56"
                  title="GrowthCred official mark"
                />
              </div>
              <p className="mt-6 font-display text-2xl font-extrabold tracking-[-0.05em] text-cream">
                Growth<span className="text-gold">Cred</span>
                <span className="text-gold">.</span>
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
                AI solutions
              </p>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section id="tees" className="py-16 md:py-24" data-tone="light">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <Eyebrow>The drop</Eyebrow>
            <H2 className="mt-4 max-w-[16ch]">Two tees. One mark.</H2>
            <p className="mt-4 max-w-[42ch] text-lg text-ink">
              You pick a size on the product page. I take payment when the link is live. Until then, Buy opens a WhatsApp order to me.
            </p>
            <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
              {SHOP_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    to={product.path}
                    className="group block no-underline"
                    data-product-card={product.id}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-[2rem] px-6 pb-4 pt-8 transition duration-500 group-hover:-translate-y-1",
                        product.id === "dream-tee" ? "bg-midnight" : "bg-[#1f1f28]",
                      )}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(200,160,74,0.12),transparent_55%)]"
                      />
                      <TeeMockup product={product} face="front" className="shop-tee-lift relative" />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-extrabold tracking-[-0.04em] text-midnight">
                          {product.name}
                        </h3>
                        <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-ink">
                          {product.blurb}
                        </p>
                      </div>
                      <p className="shrink-0 font-display text-xl font-bold tracking-[-0.03em] text-midnight">
                        {shopPrice(product)}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-gold">
                      View · sizes S to 3XL
                      <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Brand story */}
        <section
          id="story"
          data-tone="dark"
          className="relative isolate bg-midnight py-16 text-cream md:py-24"
        >
          <DarkBackdrop glow="bottom" />
          <div className="mx-auto w-[min(720px,calc(100%-2.5rem))]">
            <Eyebrow dark>Why these exist</Eyebrow>
            <H2 className="mt-4 text-cream">{SHOP_STORY.storyTitle}</H2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/70">
              {SHOP_STORY.story.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <p className="mt-10 font-display text-2xl font-extrabold tracking-[-0.04em] text-cream md:text-3xl">
              You need the plane. <span className="text-gold">I sell you the destination.</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
