import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { Button, DarkBackdrop, Faq, PillLink } from "../components/ui";
import { Footer, Header } from "../components/Layout";
import { AuthorBox, Byline } from "../components/AuthorBox";
import { PrivateAiScene } from "../components/PrivateAiScenes";
import { track } from "../lib/analytics";
import { GUIDE_OFFER, requestGuide } from "../lib/guide";
import {
  APPLY,
  HERO,
  PAIN,
  RENT,
  FIXES,
  OWN,
  EVIDENCE,
  COST,
  WHO,
  WRONG,
  HOW,
  GUARANTEE,
  CLOSE,
  FAQ,
  PHOTOS,
  type Source,
} from "../lib/privateAi";

/**
 * /private-ai — the long-form sales page for the Command Core as private AI.
 *
 * Every word comes from src/lib/privateAi.ts; this file is layout only, built
 * from the same primitives as the homepage and the corporate page.
 *
 * Motion: none of its own. Reveal and cc-card are the shared CSS-only,
 * no-preference-only effects; the page reads completely with them off.
 */

const WRAP = "mx-auto w-[min(1120px,calc(100%-2.5rem))]";
const H2 = "text-[length:clamp(2.25rem,5.5vw,4.25rem)]";
/** When the copy was last checked against its sources. */
const PUBLISHED = "2026-09-29";

function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] ${dark ? "text-cream/55" : "text-muted"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

function Cite({ source, dark = false }: { source: Source; dark?: boolean }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noopener"
      className={`font-mono text-[12px] uppercase leading-relaxed tracking-[0.12em] no-underline hover:text-gold ${dark ? "text-cream/50" : "text-muted"}`}
    >
      Source: {source.label} <span aria-hidden="true">&#8599;</span>
    </a>
  );
}

function Photo({ photo, className = "" }: { photo: { src: string; alt: string; width: number; height: number }; className?: string }) {
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-3xl object-cover shadow-[0_30px_80px_-40px_rgba(26,26,36,0.45)] ${className}`}
    />
  );
}

function Punch({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mx-auto mt-16 max-w-[30ch] text-center font-display text-[length:clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] ${
        dark ? "text-cream" : "text-midnight"
      }`}
    >
      {children}
    </p>
  );
}

export default function PrivateAi() {
  useEffect(() => track("private_ai_view"), []);

  return (
    <>
      <Header cta={{ to: APPLY, label: "Apply" }} tone="light" />

      {/* ---------- Hero ---------- */}
      <section id="hero" data-tone="light" className="relative isolate overflow-hidden bg-paper text-midnight">
        <div aria-hidden="true" className="cc-grid-light pointer-events-none absolute inset-0 -z-10" />
        <div className={`${WRAP} grid items-center gap-10 pb-16 pt-14 md:pb-24 md:pt-24 lg:grid-cols-[1.25fr_0.75fr]`}>
          <div>
          <Label>{HERO.eyebrow}</Label>
          <h1 className="mt-6 max-w-[14ch] text-[length:clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.055em] text-midnight">
            {HERO.headlineLead} <span className="cc-marker">{HERO.headlineMark}</span>
          </h1>
          <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl">{HERO.sub}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <PillLink to={APPLY} className="w-full whitespace-nowrap px-5 sm:w-auto sm:px-8">
              {HERO.cta}
            </PillLink>
            <a
              href="#cost"
              className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-midnight font-semibold text-midnight no-underline hover:border-gold hover:text-gold sm:self-auto"
            >
              {HERO.secondary} <span aria-hidden="true">&darr;</span>
            </a>
          </div>
          <Byline date={PUBLISHED} label="Checked against sources" className="mt-10" />
          </div>
          <div className="mx-auto w-full max-w-[420px] rounded-[2rem] border border-midnight/10 bg-white p-6 shadow-[0_40px_90px_-40px_rgba(26,26,36,0.45)]">
            <PrivateAiScene name="hero" className="h-auto w-full text-midnight" />
          </div>
        </div>
      </section>

      {/* ---------- The pain ---------- */}
      <section id="pain" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={`${WRAP} grid gap-14 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-20`}>
          <div>
            <Label dark>{PAIN.eyebrow}</Label>
            <h2 className={`mt-5 ${H2} text-cream`}>{PAIN.heading}</h2>
            {PAIN.paras.map((p) => (
              <p key={p} className="mt-6 max-w-[48ch] text-lg leading-relaxed text-cream/75">
                {p}
              </p>
            ))}
            <Photo photo={PHOTOS.team} className="mt-10 aspect-[3/2]" />
          </div>
          <div className="rounded-3xl border border-cream/10 bg-midnight-soft/70 p-7 md:p-9">
            <PrivateAiScene name="paste" className="mb-4 h-28 w-40 text-cream/75" />
            <p className="cc-gold-text font-display text-7xl font-extrabold tracking-[-0.05em]">{PAIN.stat.figure}</p>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">{PAIN.stat.line}</p>
            <div className="mt-5">
              <Cite source={PAIN.stat.source} dark />
            </div>
          </div>
        </div>
        <div className={WRAP}>
          <Punch dark>{PAIN.punch}</Punch>
        </div>
      </section>

      {/* ---------- What renting costs ---------- */}
      <section id="cost-of-renting" className="bg-paper py-20 md:py-32">
        <div className={`${WRAP} grid gap-14 md:grid-cols-2 md:gap-20`}>
          <div>
            <Label>{RENT.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{RENT.heading}</h2>
            {RENT.paras.map((p) => (
              <p key={p} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink">
                {p}
              </p>
            ))}
            <PrivateAiScene name="meter" className="mt-8 h-32 w-48 text-midnight" />
          </div>
          <div className="self-center rounded-3xl border border-midnight/10 bg-white p-7 shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] md:p-9">
            <PrivateAiScene name="border" className="mb-4 h-28 w-40 text-midnight" />
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em] text-midnight">{RENT.popia.lead}</p>
            <p className="mt-4 leading-relaxed text-ink">{RENT.popia.body}</p>
            <div className="mt-5">
              <Cite source={RENT.popia.source} />
            </div>
          </div>
        </div>
        <div className={WRAP}>
          <Punch>{RENT.punch}</Punch>
        </div>
      </section>

      {/* ---------- Why the usual fixes fail ---------- */}
      <section id="fixes" className="bg-white py-20 md:py-32">
        <div className={WRAP}>
          <div className="max-w-[40ch]">
            <Label>{FIXES.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{FIXES.heading}</h2>
          </div>
          <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
            {FIXES.items.map((item, i) => (
              <article key={item.t} className="cc-card flex flex-col rounded-3xl border border-midnight/10 bg-paper p-7">
                <div className="mb-5 grid place-items-center rounded-2xl bg-white py-3">
                  <PrivateAiScene name={item.scene} className="h-24 w-36 text-midnight" />
                </div>
                <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl text-midnight">{item.t}</h3>
                <p className="mt-3 leading-relaxed text-ink">{item.b}</p>
              </article>
            ))}
          </Reveal>
          <Punch>{FIXES.punch}</Punch>
        </div>
      </section>

      {/* ---------- The fix ---------- */}
      <section id="own" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop glow="bottom" />
        <div className={WRAP}>
          <div className="max-w-[46ch]">
            <Label dark>{OWN.eyebrow}</Label>
            <h2 className={`mt-5 ${H2} text-cream`}>{OWN.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75 md:text-xl">{OWN.lead}</p>
          </div>
          <Reveal className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-cream/10 bg-cream/10 md:grid-cols-3">
            {OWN.proofs.map((p) => (
              <div key={p.t} className="bg-midnight-soft p-7 md:p-8">
                <PrivateAiScene name={p.scene} className="mb-4 h-24 w-36 text-cream/75" />
                <h3 className="text-2xl text-cream">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-cream/70">{p.b}</p>
              </div>
            ))}
          </Reveal>
          <aside
            data-guide-callout
            aria-label={GUIDE_OFFER.title}
            className="mt-12 flex flex-col gap-5 rounded-3xl border border-gold/40 bg-gold/[0.08] p-6 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-cream/55">{GUIDE_OFFER.eyebrow}</p>
              <p className="mt-2 max-w-[56ch] leading-relaxed text-cream/85">{OWN.guide}</p>
            </div>
            <Button type="button" onClick={requestGuide} className="shrink-0">
              {GUIDE_OFFER.cta}
            </Button>
          </aside>
        </div>
      </section>

      {/* ---------- The evidence ---------- */}
      <section id="evidence" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40ch]">
              <Label>{EVIDENCE.eyebrow}</Label>
              <h2 className={`mt-5 ${H2}`}>{EVIDENCE.heading}</h2>
            </div>
            <PrivateAiScene name="market" className="h-32 w-48 shrink-0 text-midnight" />
          </div>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-midnight/10 bg-midnight/10 md:grid-cols-3">
            {EVIDENCE.items.map((item) => (
              <div key={item.figure} className="flex flex-col bg-white p-7 md:p-8">
                <dt className="font-display text-5xl font-extrabold tracking-[-0.05em] text-midnight">{item.figure}</dt>
                <dd className="mt-4 flex flex-1 flex-col">
                  <span className="flex-1 leading-relaxed text-ink">{item.body}</span>
                  <span className="mt-5">
                    <Cite source={item.source} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <figure className="mx-auto mt-14 grid max-w-[860px] items-center gap-8 md:grid-cols-[240px_1fr]">
            <img
              src={PHOTOS.phila.src}
              alt={PHOTOS.phila.alt}
              width={PHOTOS.phila.width}
              height={PHOTOS.phila.height}
              loading="lazy"
              decoding="async"
              className="mx-auto aspect-[3/4] w-full max-w-[240px] rounded-3xl object-cover"
            />
            <figcaption className="font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-midnight md:text-3xl">
              {EVIDENCE.own}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- The maths ---------- */}
      <section id="cost" data-tone="dark" className="relative isolate scroll-mt-16 bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={`${WRAP} grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-20`}>
          <div>
            <Label dark>{COST.eyebrow}</Label>
            <h2 className={`mt-5 ${H2} text-cream`}>{COST.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75">{COST.lead}</p>
            <p className="mt-4 text-lg leading-relaxed text-cream/75">{COST.study}</p>
          </div>
          <div className="rounded-3xl border border-cream/10 bg-midnight-soft/80 p-7 md:p-9">
            <PrivateAiScene name="breakeven" className="mb-5 h-32 w-48 text-cream/75" />
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-cream/55">{COST.label}</p>
            <ul className="mt-6 divide-y divide-cream/10 border-y border-cream/10">
              {COST.rows.map((row) => (
                <li key={row.size} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="whitespace-nowrap text-cream/80">{row.size}</span>
                  <span className="cc-gold-text font-display text-2xl font-extrabold tracking-[-0.03em] sm:text-right">{row.months}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Cite source={COST.source} dark />
            </div>
            <p className="mt-6 leading-relaxed text-cream/75">{COST.close}</p>
          </div>
        </div>
        <div className={WRAP}>
          <Punch dark>{COST.punch}</Punch>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section id="who" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="max-w-[40ch]">
            <Label>{WHO.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{WHO.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">{WHO.lead}</p>
          </div>
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHO.items.map((item) => {
              const inner = (
                <>
                  <div className="mb-5 grid place-items-center rounded-2xl bg-paper py-3">
                    <PrivateAiScene name={item.scene} className="h-24 w-36 text-midnight" />
                  </div>
                  <h3 className="text-2xl text-midnight">{item.t}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink">{item.b}</p>
                  {item.href ? (
                    <span className="mt-5 inline-flex items-center gap-2 font-semibold text-midnight group-hover:text-gold">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </span>
                  ) : null}
                </>
              );
              return item.href ? (
                <Link key={item.t} to={item.href} className="cc-card group flex flex-col rounded-3xl border border-midnight/10 bg-white p-7 no-underline hover:border-gold/50">
                  {inner}
                </Link>
              ) : (
                <article key={item.t} className="flex flex-col rounded-3xl border border-midnight/10 bg-white p-7">
                  {inner}
                </article>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ---------- When it's the wrong call ---------- */}
      <section id="wrong-call" className="bg-white py-20 md:py-32">
        <div className={WRAP}>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr] md:gap-16">
            <div className="max-w-[40ch]">
              <Label>{WRONG.eyebrow}</Label>
              <h2 className={`mt-5 ${H2}`}>{WRONG.heading}</h2>
            </div>
            <Photo photo={PHOTOS.files} className="aspect-[3/2]" />
          </div>
          <ul className="mt-12 divide-y divide-midnight/10 border-y border-midnight/10">
            {WRONG.items.map((item) => (
              <li key={item.t} className="grid items-center gap-4 py-7 md:grid-cols-[140px_0.8fr_1.2fr] md:gap-10">
                <PrivateAiScene name={item.scene} className="h-24 w-36 text-midnight" />
                <h3 className="text-2xl text-midnight">{item.t}</h3>
                <p className="leading-relaxed text-ink">
                  {item.b}{" "}
                  {item.href ? (
                    <Link to={item.href} className="font-semibold text-midnight hover:text-gold">
                      See the training <span aria-hidden="true">&rarr;</span>
                    </Link>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
          <Punch>{WRONG.punch}</Punch>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop glow="bottom" />
        <div className={WRAP}>
          <Label dark>{HOW.eyebrow}</Label>
          <h2 className={`mt-5 ${H2} text-cream`}>{HOW.heading}</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {HOW.steps.map((step, i) => (
              <li key={step.t}>
                <div className="flex items-center gap-5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/50 font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <PrivateAiScene name={step.scene} className="h-20 w-28 text-cream/70" />
                </div>
                <h3 className="mt-6 text-3xl text-cream">{step.t}</h3>
                <p className="mt-3 max-w-[34ch] leading-relaxed text-cream/70">{step.b}</p>
              </li>
            ))}
          </ol>
          <figure className="mt-16 grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <img
              src={PHOTOS.session.src}
              alt={PHOTOS.session.alt}
              width={PHOTOS.session.width}
              height={PHOTOS.session.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-3xl object-cover"
            />
            <figcaption className="text-lg leading-relaxed text-cream/75">
              {PHOTOS.session.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- The guarantee ---------- */}
      <section id="guarantee" className="bg-paper py-20 md:py-28">
        <div className={WRAP}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-midnight px-7 py-12 text-cream md:px-16 md:py-16">
            <div aria-hidden="true" className="cc-glow pointer-events-none absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem]" />
            <h2 className="text-[length:clamp(2.25rem,5vw,4rem)] text-cream">
              {GUARANTEE.lead} <span className="cc-gold-text">{GUARANTEE.accent}</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/75">{GUARANTEE.body}</p>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="bg-paper pb-20 md:pb-32">
        <div className={WRAP}>
          <div className="mx-auto mb-12 max-w-[40ch] text-center">
            <Label>Questions</Label>
            <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">What owners ask first.</h2>
          </div>
          <Faq items={FAQ} />
          <AuthorBox className="mx-auto mt-16 max-w-[760px]" />
        </div>
      </section>

      {/* ---------- Close ---------- */}
      <section id="close" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-24 text-center text-cream md:py-36">
        <img
          src={PHOTOS.joburg.src}
          alt={PHOTOS.joburg.alt}
          width={PHOTOS.joburg.width}
          height={PHOTOS.joburg.height}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-midnight/80" />
        <div className={WRAP}>
          <PrivateAiScene name="key" className="mx-auto mb-6 h-32 w-48 text-cream/75" />
          <h2 className="mx-auto max-w-[18ch] text-[length:clamp(2.25rem,5.5vw,4.5rem)] text-cream">{CLOSE.heading}</h2>
          <p className="mx-auto mt-6 max-w-[40ch] text-lg text-cream/75">{CLOSE.sub}</p>
          <PillLink to={APPLY} className="mt-10 whitespace-nowrap px-5 sm:px-8">
            {CLOSE.cta}
          </PillLink>
        </div>
      </section>

      {/* Sticky mobile CTA. */}
      <div className="sticky bottom-0 z-40 border-t border-cream/10 bg-midnight/95 p-3 md:hidden">
        <PillLink to={APPLY} size="sm" className="w-full">
          {HERO.cta}
        </PillLink>
      </div>

      <Footer />
    </>
  );
}
