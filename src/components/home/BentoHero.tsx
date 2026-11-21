import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ClientLogos } from "../ClientLogos";
import { PillLink } from "../ui";
import { ON_GOLD_BUTTON, StickerFrame } from "../bento";
import { APPLY_HREF, HERO, HERO_BENTO, LOGOS_LABEL } from "../../lib/home";

/**
 * The homepage's first screen as a bento (22 Nov 2026, Phila's reference).
 *
 * Desktop (lg+) is a 12-column grid. The gold headline card (cols 1-7) sits
 * ON TOP of the photo (cols 6-12, both rows), and a paper-coloured ring the
 * width of the grid gap cuts it out of the photo, so the photo reads as an L
 * with a rounded notch. Two paper "fillets" round the photo's two outer
 * corners where it meets the ring; the inner corner is rounded by the ring
 * itself. The dashed proof card fills the bottom-left. Below lg it all stacks.
 *
 * The ring and fillets are painted in --color-paper, so the section behind
 * the bento must stay plain paper.
 *
 * Motion (index.css, .gc-sticker): the stickers pop in and drift, only under
 * prefers-reduced-motion: no-preference, by scale/translate/opacity. They are
 * decoration that repeats the hero's own words; the h1 and buttons never wait
 * on them.
 */

/** Grid gap = ring width. Change both together. */
const GAP = "1rem";
/** Card corner radius = fillet size. */
const RADIUS = "2rem";

/** Paper outside a quarter circle: rounds a photo corner that meets the ring. */
const filletStyle = (extra: CSSProperties): CSSProperties => ({
  width: RADIUS,
  height: RADIUS,
  background: `radial-gradient(circle at 100% 100%, transparent calc(${RADIUS} - 0.5px), var(--color-paper) ${RADIUS})`,
  ...extra,
});

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 lg:h-9 lg:w-9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </svg>
  );
}

export function BentoHero() {
  const s = HERO_BENTO.stickers;
  const p = HERO_BENTO.proof;

  return (
    <section id="hero" data-tone="light" className="relative isolate overflow-hidden bg-paper text-midnight">
      <div className="mx-auto w-[min(1240px,calc(100%-1.5rem))] pb-12 pt-5 md:pb-16 md:pt-8">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* ---- The headline card: on top, ringed in paper. ---- */}
          <div
            className="gc-hero-settle relative z-10 rounded-[2rem] bg-gold-soft px-6 py-9 sm:px-10 sm:py-12 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:px-12 lg:py-14 lg:shadow-[0_0_0_1rem_var(--color-paper)]"
            style={{ "--i": 0 } as CSSProperties}
          >
            <h1 className="max-w-[19ch] text-[length:clamp(2rem,3.7vw,3.5rem)] leading-[1.16] tracking-[-0.045em] text-midnight">
              {HERO.headlineLead}{" "}
              <span className="rounded-[0.5rem] bg-white px-[0.18em] py-[0.02em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                {HERO.headlineMark}
              </span>{" "}
              {HERO.headlineTail}
            </h1>
            <p className="mt-7 max-w-[48ch] text-base leading-relaxed text-midnight/80 md:text-lg">{HERO.sub}</p>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <PillLink
                to={APPLY_HREF}
                className={`w-full sm:w-auto ${ON_GOLD_BUTTON}`}
              >
                {HERO.cta}
              </PillLink>
              <Link
                to={HERO.secondary.to}
                className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-midnight font-semibold text-midnight no-underline hover:border-white sm:self-auto"
              >
                {HERO.secondary.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-midnight/65">{HERO.scarcity}</p>

            {/* Fillets: round the photo's two outer corners at the ring (desktop only). */}
            <span aria-hidden="true" className="absolute top-0 hidden lg:block" style={filletStyle({ left: `calc(100% + ${GAP})` })} />
            <span
              aria-hidden="true"
              className="absolute hidden lg:block"
              style={filletStyle({ top: `calc(100% + ${GAP})`, left: `calc((100% - 6 * ${GAP}) * 5 / 7 + 5 * ${GAP})` })}
            />
          </div>

          {/* ---- The photo, with the stickers on it. ---- */}
          <div
            className="gc-hero-frame relative h-[21rem] min-w-0 overflow-hidden rounded-[2rem] bg-midnight sm:h-auto sm:aspect-[16/10] lg:h-auto lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[44rem]"
            style={{ "--i": 1 } as CSSProperties}
          >
            <img
              src={HERO_BENTO.photo.src}
              alt={HERO_BENTO.photo.alt}
              width={HERO_BENTO.photo.width}
              height={HERO_BENTO.photo.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
            />

            <StickerFrame i={2} className="left-[6%] top-[7%] rotate-[-7deg] lg:left-[42%] lg:top-[30%]">
              <span className="flex flex-col items-start gap-2 rounded-[1.4rem] bg-gold-soft px-4 py-3 font-display text-lg font-extrabold tracking-[-0.03em] text-midnight shadow-[0_18px_40px_-18px_rgba(26,26,36,0.6)] lg:px-6 lg:py-5 lg:text-2xl">
                <DocIcon />
                {s.documents}
              </span>
            </StickerFrame>

            <StickerFrame i={3} className="right-[5%] top-[8%] rotate-[12deg] lg:top-[44%]">
              <span className="grid h-28 w-28 place-items-center rounded-full bg-white p-2 text-center font-display text-[10px] font-extrabold uppercase leading-tight tracking-[0.04em] text-midnight shadow-[0_18px_40px_-18px_rgba(26,26,36,0.6)] lg:h-32 lg:w-32 lg:text-[12px]">
                {s.place}
              </span>
            </StickerFrame>

            <StickerFrame i={4} className="bottom-[7%] left-[6%] rotate-[-9deg] lg:bottom-[10%] lg:left-[8%]">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-midnight p-3 text-center font-display text-lg font-extrabold leading-tight tracking-[-0.03em] text-gold-soft shadow-[0_18px_40px_-18px_rgba(26,26,36,0.8)] lg:h-40 lg:w-40 lg:text-3xl">
                {s.privateAi}
              </span>
            </StickerFrame>

            <StickerFrame i={5} className="bottom-[10%] right-[5%] rotate-[-6deg] lg:bottom-[25%] lg:left-[36%] lg:right-auto">
              <span className="block max-w-[11rem] rounded-2xl bg-white px-4 py-3 font-display text-sm font-extrabold leading-snug tracking-[-0.02em] text-midnight shadow-[0_18px_40px_-18px_rgba(26,26,36,0.6)] sm:max-w-none lg:px-6 lg:py-4 lg:text-xl">
                {s.data}
              </span>
            </StickerFrame>

            <StickerFrame i={6} className="bottom-[4%] right-[6%] hidden rotate-[14deg] lg:block">
              <span className="relative grid h-36 w-40 place-items-center">
                <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  <path d="M50 10 L90 80 L10 80 Z" fill="var(--color-gold-soft)" stroke="var(--color-gold-soft)" strokeWidth="16" strokeLinejoin="round" />
                </svg>
                <span className="relative mt-8 font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">{s.owned}</span>
              </span>
            </StickerFrame>
          </div>

          {/* ---- The proof card: dashed, under the headline. ---- */}
          <div
            className="gc-hero-rise flex flex-col justify-between gap-6 rounded-[2rem] border-2 border-dashed border-midnight/25 p-7 md:p-9 lg:col-span-5 lg:col-start-1 lg:row-start-2"
            style={{ "--i": 2 } as CSSProperties}
          >
            <div>
              <p className="font-display text-6xl font-extrabold leading-none tracking-[-0.05em] text-midnight md:text-7xl">{p.figure}</p>
              <p className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-midnight md:text-2xl">{p.label}</p>
            </div>
            <ul className="flex">
              {p.photos.map((photo, n) => (
                <li key={photo.src} className={n ? "-ml-3" : ""}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-paper"
                  />
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-3 text-sm text-ink md:text-base">
              <span aria-hidden="true" className="text-gold">&#9670;</span>
              {p.line}
            </p>
          </div>
        </div>
      </div>

      {/* The logo strip, as before. */}
      <div className="border-t border-midnight/10 bg-paper/70 py-10 md:py-12">
        <p className="mb-8 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-muted">{LOGOS_LABEL}</p>
        <ClientLogos />
      </div>
    </section>
  );
}
