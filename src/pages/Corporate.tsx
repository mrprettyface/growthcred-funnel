import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { DarkBackdrop, Faq, PillLink } from "../components/ui";
import { Footer, Header } from "../components/Layout";
import { CorporateScene } from "../components/CorporateScenes";
import { CorporateRoi } from "../components/CorporateRoi";
import { CorporateEnquiry } from "../components/CorporateEnquiry";
import { track } from "../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";
import { FOUNDER } from "../lib/home";
import {
  ENQUIRE_ANCHOR,
  ROI_ANCHOR,
  HERO,
  TRIED,
  RESEARCH,
  DIFFERENT,
  TARGET,
  ROI,
  DELIVERY,
  PACK,
  STAKEHOLDERS,
  PRICING,
  TRAINER,
  FAQ,
  ENQUIRY,
} from "../lib/corporate";

/**
 * /corporate-ai-training — AI training sold to organisations, per employee, on
 * a measured transformation: every employee producing documents and reports
 * 3× faster.
 *
 * Every word comes from src/lib/corporate.ts. This file is layout only, built
 * from the same primitives as the homepage (dark sections with the grid and
 * gold light, hairline labels, gold pills, burnished accents) so the site
 * reads as one design.
 *
 * Motion: none of its own. Reveal, cc-card and cc-bar are the shared CSS-only,
 * no-preference-only effects; the page reads completely with all of them off.
 */

const WRAP = "mx-auto w-[min(1120px,calc(100%-2.5rem))]";

function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] ${
        dark ? "text-cream/55" : "text-muted"
      }`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

const H2 = "text-[length:clamp(2.25rem,5.5vw,4.25rem)]";

export default function Corporate() {
  useEffect(() => track("corporate_view"), []);

  return (
    <>
      <Header cta={{ to: ENQUIRE_ANCHOR, label: "Enquire" }} tone="light" />

      {/* ---------- 1. Hero ---------- */}
      <section id="hero" data-tone="light" className="relative isolate overflow-hidden bg-paper text-midnight">
        <div aria-hidden="true" className="cc-grid-light pointer-events-none absolute inset-0 -z-10" />
        <div className={`${WRAP} grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
          <div>
            <Label>{HERO.eyebrow}</Label>
            <h1 className="mt-6 max-w-[13ch] text-[length:clamp(2.75rem,7.5vw,6rem)] leading-[0.98] tracking-[-0.055em] text-midnight">
              {HERO.headlineLead} <span className="cc-marker whitespace-nowrap">{HERO.headlineMark}</span>
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl">{HERO.sub}</p>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <PillLink to={ENQUIRE_ANCHOR} className="w-full sm:w-auto">
                {HERO.cta}
              </PillLink>
              <a
                href={ROI_ANCHOR}
                className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-midnight font-semibold text-midnight no-underline hover:border-gold hover:text-gold sm:self-auto"
              >
                {HERO.secondary} <span aria-hidden="true">&darr;</span>
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {HERO.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-midnight/10 bg-white px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink"
                >
                  <span aria-hidden="true" className="mr-2 text-gold">&#9670;</span>
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <figure className="mx-auto w-full max-w-[520px]">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-gold/60" />
              <img
                src={HERO.photo.src}
                alt={HERO.photo.alt}
                width={HERO.photo.width}
                height={HERO.photo.height}
                fetchPriority="high"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_40px_90px_-40px_rgba(26,26,36,0.6)]"
              />
            </div>
            <figcaption className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              {HERO.photo.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- 2. What they have already tried ---------- */}
      <section id="tried" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={WRAP}>
          <div className="max-w-[44ch]">
            <Label dark>{TRIED.eyebrow}</Label>
            <h2 className={`mt-5 ${H2} text-cream`}>{TRIED.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/70">{TRIED.sub}</p>
          </div>

          {/* Two wide, then three: five cards never squeeze into five narrow columns. */}
          <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {TRIED.items.map((item, i) => (
              <article
                key={item.t}
                className={`cc-card flex flex-col rounded-3xl border border-cream/10 bg-midnight-soft/70 p-6 ${
                  i < 2 ? "lg:col-span-3" : i === 4 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"
                }`}
              >
                <div className="grid place-items-center rounded-2xl bg-midnight/60 py-3">
                  <CorporateScene name={item.scene} className="h-24 w-full text-cream/70" />
                </div>
                <h3 className="mt-6 text-xl text-cream">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">{item.b}</p>
              </article>
            ))}
          </Reveal>

          <div className="mt-20 border-t border-cream/10 pt-14">
            <h3 className="text-2xl text-cream md:text-3xl">{RESEARCH.heading}</h3>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
              {RESEARCH.items.map((item) => (
                <div key={item.figure + item.source} className="flex flex-col bg-midnight p-6 md:p-7">
                  <dt className="cc-gold-text font-display text-6xl font-extrabold tracking-[-0.05em]">{item.figure}</dt>
                  <dd className="mt-4 flex flex-1 flex-col">
                    <span className="leading-relaxed text-cream/80">{item.line}</span>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener"
                      className="mt-5 font-mono text-[12px] uppercase leading-relaxed tracking-[0.12em] text-cream/50 no-underline hover:text-gold"
                    >
                      {item.source} <span aria-hidden="true">&#8599;</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/45">{RESEARCH.note}</p>
          </div>

          <p className="mx-auto mt-20 max-w-[30ch] text-center font-display text-[length:clamp(1.75rem,3.6vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-cream">
            {TRIED.close}
          </p>
        </div>
      </section>

      {/* ---------- 3. How this is different ---------- */}
      <section id="different" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="max-w-[40ch]">
            <Label>{DIFFERENT.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{DIFFERENT.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">{DIFFERENT.sub}</p>
          </div>

          <Reveal className="mt-14 overflow-hidden rounded-3xl border border-midnight/10 bg-white shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)]">
            <div className="hidden grid-cols-[0.8fr_1fr_1.2fr] border-b border-midnight/10 font-mono text-[12px] uppercase tracking-[0.16em] md:grid">
              <span className="p-6" />
              <span className="p-6 text-muted">{DIFFERENT.columns[0]}</span>
              <span className="bg-midnight p-6 text-gold">{DIFFERENT.columns[1]}</span>
            </div>
            <ul className="divide-y divide-midnight/10">
              {DIFFERENT.rows.map((row) => (
                <li key={row.k} className="grid gap-3 p-6 md:grid-cols-[0.8fr_1fr_1.2fr] md:gap-0 md:p-0">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-midnight md:p-6">{row.k}</span>
                  <span className="text-muted line-through decoration-midnight/20 md:p-6">
                    <span className="sr-only">{DIFFERENT.columns[0]}: </span>
                    {row.them}
                  </span>
                  <span className="rounded-2xl bg-midnight p-4 font-semibold text-cream md:rounded-none md:p-6">
                    <span className="sr-only">{DIFFERENT.columns[1]}: </span>
                    <span aria-hidden="true" className="mr-2 text-gold">&#8599;</span>
                    {row.us}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------- 4. The transformation ---------- */}
      <section id="target" className="bg-white py-20 md:py-32">
        <Reveal className={`${WRAP} grid gap-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-20`}>
          <div>
            <Label>{TARGET.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(3rem,9vw,7rem)] leading-[0.92] tracking-[-0.06em]">
              {TARGET.heading}
            </h2>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink">{TARGET.body}</p>

            <div className="mt-10 rounded-3xl border border-midnight/10 bg-paper p-6 md:p-8">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{TARGET.label}</p>
              <div className="mt-6 space-y-4" aria-hidden="true">
                <div className="flex items-center gap-4">
                  <span className="w-14 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Before</span>
                  <div className="h-4 flex-1 rounded-full bg-midnight/25" />
                  <span className="w-12 text-right font-display text-2xl font-extrabold text-midnight/40">{TARGET.before}h</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-14 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">After</span>
                  <div className="h-4 flex-1">
                    <div
                      className="cc-bar h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
                      style={{ width: `${(TARGET.after / TARGET.before) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right font-display text-2xl font-extrabold text-gold">{TARGET.after}h</span>
                </div>
              </div>
              <p className="sr-only">
                {TARGET.label}: {TARGET.before} hours before, {TARGET.after} hours after.
              </p>
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{TARGET.disclaimer}</p>
            </div>
          </div>

          <div>
            <CorporateScene name="target" className="h-32 w-44 text-midnight" />
            <h3 className="mt-6 text-2xl md:text-3xl">{TARGET.where.heading}</h3>
            <ol className="mt-6 divide-y divide-midnight/10 border-y border-midnight/10">
              {TARGET.where.items.map((line, i) => (
                <li key={line} className="flex items-start gap-5 py-4 text-lg text-midnight">
                  <span className="mt-1 font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {line}
                </li>
              ))}
            </ol>

            <Link
              to={TARGET.proof.href}
              className="cc-card group mt-8 block rounded-3xl border border-gold/30 bg-midnight p-6 text-cream no-underline md:p-7"
            >
              <p className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.16em]">
                <span className="text-gold">{TARGET.proof.client}</span>
                <span className="text-cream/45">Client result</span>
              </p>
              <p className="mt-4 flex items-baseline gap-4 font-display tracking-[-0.04em]">
                <span className="text-2xl font-extrabold text-cream/35 line-through decoration-gold/50 decoration-2">
                  {TARGET.proof.before}
                </span>
                <span aria-hidden="true" className="text-xl text-gold">&rarr;</span>
                <span className="cc-gold-text text-5xl font-extrabold">{TARGET.proof.after}</span>
              </p>
              <p className="mt-3 text-cream/75">{TARGET.proof.line}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                Read the client stories <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- 5. The business case ---------- */}
      <section id="roi" className="scroll-mt-20 border-t border-midnight/10 bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="max-w-[44ch]">
            <Label>{ROI.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{ROI.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">{ROI.sub}</p>
          </div>
          <div className="mt-12">
            <CorporateRoi />
          </div>
        </div>
      </section>

      {/* ---------- 6. Delivery ---------- */}
      <section id="delivery" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop glow="bottom" />
        <div className={WRAP}>
          <Label dark>{DELIVERY.eyebrow}</Label>
          <h2 className={`mt-5 max-w-[20ch] ${H2} text-cream`}>{DELIVERY.heading}</h2>
          <Reveal>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14 lg:grid-cols-4 lg:gap-8">
              <span
                aria-hidden="true"
                className="absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-gold via-gold/40 to-transparent lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-7 top-7 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:hidden"
              />
              {DELIVERY.steps.map((step, i) => (
                <li key={step.t} className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 md:block">
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-midnight font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <CorporateScene name={step.scene} className="h-20 w-28 text-cream/65 md:mt-7" />
                    <h3 className="mt-2 text-2xl text-cream md:mt-3 md:text-3xl">{step.t}</h3>
                    <p className="mt-3 max-w-[34ch] leading-relaxed text-cream/70">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- 7. The pack ---------- */}
      <section id="pack" className="bg-paper py-20 md:py-32">
        <Reveal className={`${WRAP} grid items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20`}>
          <figure className="mx-auto w-full max-w-[460px]">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 -translate-x-4 translate-y-4 rounded-3xl border border-gold/60" />
              <img
                src={PACK.photo.src}
                alt={PACK.photo.alt}
                width={PACK.photo.width}
                height={PACK.photo.height}
                loading="lazy"
                decoding="async"
                className="relative w-full rounded-3xl object-cover shadow-[0_40px_90px_-40px_rgba(26,26,36,0.6)]"
              />
            </div>
            <figcaption className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              {PACK.photo.caption}
            </figcaption>
          </figure>
          <div>
            <Label>{PACK.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{PACK.heading}</h2>
            <ul className="mt-10 space-y-6">
              {PACK.items.map((item) => (
                <li key={item.t} className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                  <span>
                    <span className="block font-display text-lg font-bold tracking-[-0.02em] text-midnight">{item.t}</span>
                    <span className="mt-1 block leading-relaxed text-ink">{item.b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------- 8. The people who sign it off ---------- */}
      <section id="stakeholders" className="bg-white py-20 md:py-32">
        <div className={WRAP}>
          <div className="max-w-[40ch]">
            <Label>{STAKEHOLDERS.eyebrow}</Label>
            <h2 className={`mt-5 ${H2}`}>{STAKEHOLDERS.heading}</h2>
          </div>
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STAKEHOLDERS.items.map((item) => (
              <article
                key={item.role}
                className="cc-card flex flex-col rounded-3xl border border-midnight/10 bg-paper p-6 hover:border-gold/50"
              >
                <div className="grid place-items-center rounded-2xl bg-white py-3">
                  <CorporateScene name={item.scene} className="h-24 w-full text-midnight" />
                </div>
                <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-gold">{item.role}</p>
                <h3 className="mt-2 text-xl text-midnight">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">{item.b}</p>
              </article>
            ))}
          </Reveal>
          <Link
            to={STAKEHOLDERS.dataLink.to}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-midnight no-underline hover:text-gold"
          >
            {STAKEHOLDERS.dataLink.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ---------- 9. Pricing ---------- */}
      <section id="pricing" data-tone="dark" className="relative isolate bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={WRAP}>
          <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
            <div>
              <Label dark>{PRICING.eyebrow}</Label>
              <h2 className={`mt-5 ${H2} text-cream`}>{PRICING.heading}</h2>
            </div>
            <p className="text-lg leading-relaxed text-cream/75">{PRICING.body}</p>
          </div>

          <Reveal className="mt-14 grid gap-5 md:grid-cols-3">
            {PRICING.tiers.map((tier, i) => {
              const featured = i === 1;
              return (
                <article
                  key={tier.name}
                  className={`cc-card flex flex-col rounded-3xl border p-7 md:p-8 ${
                    featured ? "border-gold/50 bg-cream text-midnight" : "border-cream/10 bg-midnight-soft/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">Per employee</span>
                    <span className={`font-mono text-[12px] ${featured ? "text-midnight/40" : "text-cream/35"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={`mt-6 text-3xl md:text-4xl ${featured ? "text-midnight" : "text-cream"}`}>{tier.name}</h3>
                  <p className={`mt-2 font-semibold ${featured ? "text-ink" : "text-cream/80"}`}>{tier.scope}</p>
                  <p className={`mt-5 flex-1 leading-relaxed ${featured ? "text-ink" : "text-cream/65"}`}>{tier.line}</p>
                  <a
                    href={ENQUIRE_ANCHOR}
                    className={`mt-8 inline-flex min-h-11 items-center gap-2 border-t pt-5 font-semibold no-underline ${
                      featured ? "border-midnight/15 text-midnight hover:text-gold" : "border-cream/15 text-gold"
                    }`}
                  >
                    Request a proposal <span aria-hidden="true">&rarr;</span>
                    <span className="sr-only"> for a {tier.name.toLowerCase()}</span>
                  </a>
                </article>
              );
            })}
          </Reveal>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/45">{PRICING.note}</p>
        </div>
      </section>

      {/* ---------- 10. Who runs the room ---------- */}
      <section id="trainer" className="bg-white py-20 md:py-32">
        <Reveal className={`${WRAP} grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20`}>
          <figure className="relative mx-auto w-full max-w-[360px]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-gold/60" />
            <picture>
              <source type="image/webp" srcSet={TRAINER.photo.webp} sizes="(min-width: 768px) 360px, 90vw" />
              <img
                src={TRAINER.photo.src}
                alt={TRAINER.photo.alt}
                width={TRAINER.photo.width}
                height={TRAINER.photo.height}
                loading="lazy"
                decoding="async"
                className="relative aspect-[3/4] w-full rounded-3xl object-cover object-top"
              />
            </picture>
          </figure>
          <div>
            <Label>{TRAINER.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">{TRAINER.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              <strong className="font-semibold text-midnight">{FOUNDER.name}</strong> {TRAINER.lead}
            </p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-midnight/10 bg-midnight/10 sm:grid-cols-3">
              {TRAINER.proof.map((p) => (
                <div key={p.t} className="bg-paper p-5">
                  <dt className="font-display text-2xl font-extrabold tracking-[-0.04em] text-midnight">{p.k}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">{p.t}</dd>
                </div>
              ))}
            </dl>
            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-display text-xl font-bold leading-snug tracking-[-0.02em] text-midnight md:text-2xl">
                &ldquo;{TRAINER.quote.text}&rdquo;
              </p>
              <footer className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{TRAINER.quote.by}</footer>
            </blockquote>
            <Link
              to={TRAINER.stories.to}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-midnight no-underline hover:text-gold"
            >
              {TRAINER.stories.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- 11. FAQ ---------- */}
      <section id="faq" className="border-t border-midnight/10 bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="mx-auto mb-12 max-w-[40ch] text-center">
            <Label>Questions</Label>
            <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">Questions sponsors ask first.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* ---------- 12. Enquiry ---------- */}
      <section id="enquire" data-tone="dark" className="relative isolate scroll-mt-16 bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop glow="bottom" />
        <div className={`${WRAP} grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
          <div>
            <Label dark>{ENQUIRY.eyebrow}</Label>
            <h2 className={`mt-5 ${H2} text-cream`}>{ENQUIRY.heading}</h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-cream/75">{ENQUIRY.sub}</p>
            <CorporateScene name="workshop" className="mt-10 h-32 w-44 text-cream/70" />
            <div className="mt-10 space-y-3 font-mono text-[12px] uppercase tracking-[0.14em]">
              <a
                href={whatsappUrl(ENQUIRY.whatsapp)}
                target="_blank"
                rel="noopener"
                className="flex min-h-11 items-center gap-2 text-cream/75 no-underline hover:text-gold"
              >
                WhatsApp {WHATSAPP_DISPLAY} <span aria-hidden="true">&#8599;</span>
              </a>
              <a
                href="mailto:info@growthcred.co.za?subject=Corporate%20AI%20training"
                className="flex min-h-11 items-center gap-2 text-cream/75 no-underline hover:text-gold"
              >
                info@growthcred.co.za <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
          <CorporateEnquiry id="corporate-enquiry" />
        </div>
      </section>

      {/* Sticky mobile CTA. */}
      <div className="sticky bottom-0 z-40 border-t border-cream/10 bg-midnight/95 p-3 md:hidden">
        <PillLink to={ENQUIRE_ANCHOR} size="sm" className="w-full">
          {HERO.cta}
        </PillLink>
      </div>

      <Footer />
    </>
  );
}
