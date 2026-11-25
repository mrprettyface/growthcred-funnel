import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer, Header } from "../components/Layout";
import { TeeMockup } from "../components/shop/TeeMockup";
import { ButtonLink, Eyebrow, H1, H2 } from "../components/ui";
import { track } from "../lib/analytics";
import {
  SHOP_PRODUCTS,
  SHOP_SHIPPING,
  SHOP_STORY,
  shopPrice,
} from "../lib/shop";

/**
 * /shop — simple white merch storefront. Product detail at /shop/:slug.
 */
export default function Shop() {
  useEffect(() => {
    track("shop_view");
  }, []);

  return (
    <div className="min-h-screen bg-white text-midnight">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to content
      </a>
      <Header tone="light" cta={{ to: "/shop#tees", label: "Shop tees" }} />
      <main id="main-content">
        <section id="hero" data-tone="light" className="pb-10 pt-14 md:pb-14 md:pt-20">
          <div className="mx-auto w-[min(920px,calc(100%-2.5rem))] text-center">
            <Eyebrow>{SHOP_STORY.eyebrow}</Eyebrow>
            <H1 className="mx-auto mt-5 max-w-[10ch] text-midnight">
              Wear the <span className="text-gold">work.</span>
            </H1>
            <p className="mx-auto mt-5 max-w-[34ch] text-lg leading-relaxed text-ink">{SHOP_STORY.lead}</p>
            <p className="mx-auto mt-3 max-w-[40ch] text-sm text-muted">{SHOP_SHIPPING}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="#tees" className="min-w-[10rem]">
                See the tees
              </ButtonLink>
              <Link
                to="/call"
                className="font-body text-sm font-semibold text-ink no-underline hover:text-gold"
              >
                Or apply for the work →
              </Link>
            </div>
          </div>
        </section>

        <section id="tees" data-tone="light" className="pb-20 pt-6 md:pb-28">
          <div className="mx-auto w-[min(1120px,calc(100%-2.5rem))]">
            <div className="mx-auto max-w-xl text-center">
              <Eyebrow>The drop</Eyebrow>
              <H2 className="mt-3">Three tees. Your colour.</H2>
              <p className="mt-3 text-ink">
                You pick Black or White on the product page. I take payment when the link is live. Until then, Buy opens a WhatsApp order to me.
              </p>
            </div>

            <ul className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {SHOP_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    to={product.path}
                    className="group block no-underline"
                    data-product-card={product.id}
                  >
                    <div className="shop-card-surface relative px-4 pb-2 pt-6 transition duration-500 group-hover:-translate-y-1">
                      <TeeMockup product={product} colour="Black" face="front" className="shop-tee-lift relative" />
                    </div>
                    <div className="mt-6 flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-extrabold tracking-[-0.04em] text-midnight">
                        {product.name}
                      </h3>
                      <p className="shrink-0 font-display text-lg font-bold tracking-[-0.03em] text-midnight">
                        {shopPrice(product)}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{product.blurb}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-body text-sm font-semibold text-gold">
                      View · Black or White · S to 3XL
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

        <section id="story" data-tone="light" className="border-t border-midnight/8 py-16 md:py-24">
          <div className="mx-auto w-[min(640px,calc(100%-2.5rem))] text-center">
            <Eyebrow>Why these exist</Eyebrow>
            <H2 className="mt-3">{SHOP_STORY.storyTitle}</H2>
            <div className="mt-8 space-y-5 text-left text-lg leading-relaxed text-ink">
              {SHOP_STORY.story.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
            <p className="mt-10 font-display text-2xl font-extrabold tracking-[-0.04em] text-midnight md:text-3xl">
              You need the plane. <span className="text-gold">I sell you the destination.</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
