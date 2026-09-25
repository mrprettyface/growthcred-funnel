import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { DarkBackdrop, Faq } from "../components/ui";
import { PageScene } from "../components/PageScenes";
import { SEARCH_PAGES } from "../content/searchPages";
import { HomeScene, STAGE_SCENES, METHOD_SCENES } from "../components/HomeScenes";
import { HeroGraph } from "../components/home/HeroGraph";
import { ClientLogos } from "../components/ClientLogos";
import { ApplyButton, HomeFooter, HomeHeader } from "../components/home/HomeChrome";
import { track } from "../lib/analytics";
import {
  APPLY_HREF,
  HERO,
  PROOF_LINE,
  CAPACITY,
  BEFORE_AFTER,
  STAGES,
  METHOD,
  FOUNDER,
  GUARANTEE,
  CLOSE,
  STORIES,
  WAYS,
  GUIDES,
  FAQ,
  type HomeStory,
} from "../lib/home";

/**
 * THE LANDING PAGE — "The Command Core".
 *
 * Every word comes from src/lib/home.ts. This file is layout only.
 *
 * Motion rules (STATUS.md, CLAUDE.md): everything that moves is CSS, sits
 * behind prefers-reduced-motion: no-preference, animates transform or opacity
 * only, and rests in its finished state. No scroll handlers, no blur filters.
 * The marquee, the pulse, the seal and the chart bars are decoration; the page
 * reads completely with all of them switched off.
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

const pct = (from: number, to: number) => Math.min(99, Math.round((1 - to / from) * 100));
const afterWidth = (from: number, to: number) => `${Math.max(2, (to / from) * 100)}%`;
/** Deterministic thousands separator, so the server and browser render the same string. */
const rand = (n: number) => "R" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Every article and tool on the site, in the order the guide hub lists them. */
const ARTICLES = SEARCH_PAGES.filter((page) => page.kind === "guide" || page.kind === "tool");

/** One client story. The whole card is the link; a quote card inverts to dark. */
function StoryCard({ story }: { story: HomeStory }) {
  const dark = Boolean(story.quote);
  return (
    <Link
      to={story.href}
      className={`cc-card group flex flex-col overflow-hidden rounded-3xl border no-underline ${
        dark
          ? "border-gold/30 bg-midnight text-cream shadow-[0_40px_90px_-40px_rgba(26,26,36,0.7)]"
          : "border-midnight/10 bg-white hover:border-gold/50"
      }`}
    >
      {story.image ? (
        <img
          src={story.image.src}
          alt={story.image.alt}
          width={story.image.width}
          height={story.image.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="flex items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
          <span className="text-gold">{story.client}</span>
          <span className={dark ? "text-cream/45" : "text-muted"}>{story.sector}</span>
        </p>
        {story.quote ? (
          <blockquote className="mt-6 font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-cream md:text-3xl">
            <span aria-hidden="true" className="text-gold">&ldquo;</span>
            {story.quote}
            <span aria-hidden="true" className="text-gold">&rdquo;</span>
          </blockquote>
        ) : null}
        {story.stat ? (
          <p className="mt-6 flex items-baseline gap-4 font-display tracking-[-0.04em]">
            <span className="text-3xl font-extrabold text-midnight/30 line-through decoration-gold/50 decoration-2">
              {story.stat.before}
            </span>
            <span aria-hidden="true" className="text-2xl text-gold">&rarr;</span>
            <span className="cc-gold-text text-6xl font-extrabold md:text-7xl">{story.stat.after}</span>
          </p>
        ) : null}
        <h3 className={`mt-6 text-2xl md:text-3xl ${dark ? "text-cream" : "text-midnight"}`}>{story.headline}</h3>
        <p className={`mt-3 flex-1 leading-relaxed ${dark ? "text-cream/70" : "text-ink"}`}>{story.body}</p>
        <span
          className={`mt-6 inline-flex items-center gap-2 font-semibold ${
            dark ? "text-gold" : "text-midnight group-hover:text-gold"
          }`}
        >
          {story.href === "/stories" ? "More client stories" : "Read the story"} <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => track("home_view", { variant: "command-core" }), []);

  return (
    <>
      <HomeHeader />
      {/* ---------- 1. Hero + proof strip ----------
          Light, left-aligned, with the graph climbing behind the headline to a
          gold point: the time drain going the other way. */}
      <section id="hero" data-tone="light" className="relative isolate overflow-hidden bg-paper text-midnight">
        {/* The graph belongs to the headline block, not the company strip. */}
        <div className="relative isolate">
        <HeroGraph />
        <div className={`${WRAP} pb-16 pt-16 md:pb-24 md:pt-28`}>
          <h1 className="max-w-[12ch] text-[length:clamp(2.75rem,8vw,6.5rem)] leading-[0.98] tracking-[-0.055em] text-midnight">
            {HERO.headlineLead} <span className="cc-marker">{HERO.headlineMark}</span>{" "}
            <span className="cc-marker">{HERO.headlineAccent}</span>
          </h1>
          <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-ink md:text-xl">{HERO.sub}</p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <ApplyButton className="w-full sm:w-auto">{HERO.cta}</ApplyButton>
            <Link
              to={HERO.secondary.to}
              className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-midnight font-semibold text-midnight no-underline hover:border-gold hover:text-gold sm:self-auto"
            >
              {HERO.secondary.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{HERO.scarcity}</p>
        </div>
        </div>

        <div className="border-t border-midnight/10 bg-paper/70 py-10 md:py-12">
          <ClientLogos />
          <p className={`${WRAP} mt-8 text-center text-sm text-ink md:text-base`}>
            <span aria-hidden="true" className="mr-2 text-gold">&#9670;</span>
            {PROOF_LINE}
          </p>
        </div>
      </section>

      {/* ---------- 2. The number ---------- */}
      <section id="capacity" className="bg-paper py-20 md:py-32">
        <Reveal className={`${WRAP} grid gap-14 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-20`}>
          <h2 className="text-midnight">
            <span className="block max-w-[26ch] font-body text-lg font-medium tracking-normal text-ink md:text-xl">
              {CAPACITY.lead}
            </span>
            <span className="mt-3 block text-[length:clamp(3.5rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.06em]">
              {CAPACITY.figure}
            </span>
            <span className="mt-4 block max-w-[24ch] font-body text-lg font-medium tracking-normal text-ink md:text-xl">
              {CAPACITY.tail}
            </span>
          </h2>

          <div className="rounded-3xl border border-midnight/10 bg-white p-7 shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] md:p-9">
            <HomeScene name="drain" className="mb-5 h-24 w-32 text-midnight" />
            <p className="text-muted">{CAPACITY.notThis}</p>
            <p className="mt-3 text-lg font-semibold text-midnight">{CAPACITY.butThis}</p>

            <div className="mt-8 space-y-5" aria-hidden="true">
              <div>
                <div className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  <span>Work done at</span>
                  <span className="text-midnight">{rand(CAPACITY.lowRate)}/hr</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-midnight/[0.06]">
                  <div
                    className="cc-bar h-full rounded-full bg-midnight/40"
                    style={{ width: `${Math.max(1.5, (CAPACITY.lowRate / CAPACITY.highRate) * 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  <span>Decisions worth</span>
                  <span className="text-midnight">{rand(CAPACITY.highRate)}/hr</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-midnight/[0.06]">
                  <div className="cc-bar h-full w-full rounded-full bg-gradient-to-r from-gold to-gold-soft" />
                </div>
              </div>
              <p className="font-display text-5xl font-extrabold tracking-[-0.05em] text-midnight">
                {Math.round(CAPACITY.highRate / CAPACITY.lowRate)}&times;
              </p>
            </div>

            <p className="mt-8 border-t border-midnight/10 pt-6 text-lg text-midnight">
              {CAPACITY.closeA}{" "}
              <strong className="font-extrabold text-gold">{CAPACITY.closeB}</strong>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- 3. Before / after console ---------- */}
      <section id="results" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop glow="bottom" />
        <div className={WRAP}>
          <div className="mx-auto max-w-[40ch] text-center">
            <Label dark>{BEFORE_AFTER.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{BEFORE_AFTER.heading}</h2>
          </div>

          <div className="mx-auto mt-14 max-w-[980px] overflow-hidden rounded-3xl border border-cream/10 bg-midnight-soft/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 border-b border-cream/10 px-5 py-4" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-cream/15" />
              <span className="h-3 w-3 rounded-full bg-cream/15" />
              <span className="h-3 w-3 rounded-full bg-gold/70" />
              <span className="ml-3 font-mono text-[12px] tracking-[0.1em] text-cream/40">command-core / before-after</span>
            </div>
            <dl className="grid gap-px bg-cream/10 md:grid-cols-2">
              {BEFORE_AFTER.rows.map((row) => (
                <div key={row.metric} className="bg-midnight-soft p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-mono text-[12px] uppercase tracking-[0.16em] text-cream/55">{row.metric}</dt>
                    <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[12px] text-gold">
                      &minus;{pct(row.from, row.to)}%
                    </span>
                  </div>
                  <dd className="mt-5">
                    <p className="flex items-baseline gap-4 font-display tracking-[-0.04em]">
                      <span className="text-2xl font-extrabold text-cream/35 line-through decoration-gold/50 decoration-2">
                        {row.before}
                      </span>
                      <span aria-hidden="true" className="text-xl text-gold">&rarr;</span>
                      <span className="cc-gold-text text-5xl font-extrabold md:text-6xl">{row.after}</span>
                    </p>
                    <div className="mt-6 space-y-2" aria-hidden="true">
                      <div className="h-1.5 rounded-full bg-cream/15" />
                      <div className="h-1.5 overflow-hidden rounded-full">
                        <div
                          className="cc-bar h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
                          style={{ width: afterWidth(row.from, row.to) }}
                        />
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-6 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-cream/45">
            {BEFORE_AFTER.disclaimer}
          </p>
        </div>
      </section>

      {/* ---------- 4. Client stories: the proof behind the claims ---------- */}
      <section id="stories" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40ch]">
              <Label>{STORIES.eyebrow}</Label>
              <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)]">{STORIES.heading}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink">{STORIES.sub}</p>
            </div>
            <Link
              to="/stories"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-midnight no-underline hover:text-gold"
            >
              {STORIES.all} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <Reveal className="mt-12 grid gap-5 md:grid-cols-2">
            {STORIES.items.map((story) => (
              <StoryCard key={story.client} story={story} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 5. The method ---------- */}
      <section id="method" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={WRAP}>
          <Label dark>{METHOD.eyebrow}</Label>
          <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{METHOD.heading}</h2>
          <Reveal>
            <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {/* The thread joining the steps: across on desktop, down the gutter on phones. */}
              <span
                aria-hidden="true"
                className="absolute left-7 right-7 top-7 hidden h-px bg-gradient-to-r from-gold via-gold/40 to-transparent md:block"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-7 top-7 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:hidden"
              />
              {METHOD.steps.map((step, i) => (
                <li key={step.t} className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 md:block">
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-midnight font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <HomeScene name={METHOD_SCENES[i]} className="h-20 w-28 text-cream/65 md:mt-7" />
                    <h3 className="mt-2 text-3xl text-cream md:mt-3 md:text-4xl">{step.t}</h3>
                    <p className="mt-3 max-w-[34ch] leading-relaxed text-cream/70 md:mt-4">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- 6. Pick your stage ---------- */}
      <section id="stages" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Label>{STAGES.eyebrow}</Label>
              <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)]">{STAGES.heading}</h2>
            </div>
          </div>
          <Reveal className="mt-12 grid gap-5 md:grid-cols-3">
            {STAGES.items.map((stage, i) => {
              const featured = i === 1;
              return (
                <article
                  key={stage.name}
                  className={`cc-card flex flex-col rounded-3xl border p-7 md:p-8 ${
                    featured
                      ? "border-gold/40 bg-midnight text-cream shadow-[0_40px_90px_-40px_rgba(26,26,36,0.7)]"
                      : "border-midnight/10 bg-white hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{stage.band}</span>
                    <span className={`font-mono text-[12px] ${featured ? "text-cream/35" : "text-faint"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <HomeScene
                    name={STAGE_SCENES[i]}
                    className={`mt-6 h-24 w-32 ${featured ? "text-cream/75" : "text-midnight/80"}`}
                  />
                  <h3 className={`mt-4 ${featured ? "text-cream" : "text-midnight"}`}>
                    <span className={`block font-body text-base font-medium tracking-normal ${featured ? "text-cream/55" : "text-muted"}`}>
                      {stage.family}
                    </span>
                    <span className="mt-1 block text-4xl md:text-[length:clamp(2rem,3.4vw,2.75rem)]">{stage.name}</span>
                  </h3>
                  <p className={`mt-5 flex-1 leading-relaxed ${featured ? "text-cream/75" : "text-ink"}`}>{stage.line}</p>
                  <Link
                    to={APPLY_HREF}
                    className={`mt-8 inline-flex min-h-11 items-center gap-2 border-t pt-5 font-semibold no-underline ${
                      featured ? "border-cream/15 text-gold" : "border-midnight/10 text-midnight hover:text-gold"
                    }`}
                  >
                    Apply <span aria-hidden="true">&rarr;</span>
                    <span className="sr-only"> for Command Core {stage.name}</span>
                  </Link>
                </article>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ---------- 7. The founder ---------- */}
      <section id="founder" className="bg-white py-20 md:py-32">
        <Reveal className={`${WRAP} grid items-center gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20`}>
          <div className="relative mx-auto w-full max-w-[400px]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-gold/60" />
            {/* Phila with a guest at an event: the photo the site has always used. */}
            <picture>
              <source
                type="image/webp"
                srcSet="/images/phila-event-640.webp 640w, /images/phila-event-1200.webp 1200w"
                sizes="(min-width: 768px) 400px, 90vw"
              />
              <img
                src="/images/phila-event.jpg"
                alt="Phila Ngwenya, Founder of GrowthCred"
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
                className="relative aspect-[3/4] w-full rounded-3xl object-cover"
              />
            </picture>
          </div>
          <div>
            <h2 className="text-[length:clamp(2.5rem,5vw,4rem)]">{FOUNDER.name}</h2>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-gold">{FOUNDER.title}</p>
            <ul className="mt-8 divide-y divide-midnight/10 border-y border-midnight/10">
              {FOUNDER.credentials.map((line) => (
                  <li key={line} className="flex items-start gap-4 py-4 text-lg text-midnight">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    {line}
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ---------- 8. The guarantee ---------- */}
      <section id="guarantee" className="bg-paper pb-20 md:pb-32">
        <Reveal className={WRAP}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-midnight px-7 py-12 text-cream md:px-16 md:py-16">
            <div aria-hidden="true" className="cc-glow pointer-events-none absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem]" />
            <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
              <Seal />
              <div>
                <h2 className="text-[length:clamp(2.25rem,5vw,4rem)] text-cream">
                  {GUARANTEE.lead} <span className="cc-gold-text">{GUARANTEE.accent}</span>
                </h2>
                <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-cream/75">{GUARANTEE.body}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- 9. Other ways in: the rest of the site ---------- */}
      <section id="ways" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-20 text-cream md:py-32">
        <DarkBackdrop />
        <div className={WRAP}>
          <div className="max-w-[44ch]">
            <Label dark>{WAYS.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{WAYS.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">{WAYS.sub}</p>
          </div>
          <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WAYS.items.map((way) => (
              <Link
                key={way.href}
                to={way.href}
                className="cc-card group flex flex-col rounded-3xl border border-cream/10 bg-midnight-soft/70 p-6 text-cream no-underline hover:border-gold/50"
              >
                <div aria-hidden="true" className="grid place-items-center rounded-2xl bg-midnight/60 py-4">
                  <PageScene path={way.href} className="h-24 w-full text-cream/75" />
                </div>
                <h3 className="mt-6 text-xl text-cream">{way.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/65">{way.line}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  Explore <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 10. The field guide: every article ---------- */}
      <section id="guides" className="bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[40ch]">
              <Label>{GUIDES.eyebrow}</Label>
              <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">{GUIDES.heading}</h2>
            </div>
            <Link
              to="/resources"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-midnight no-underline hover:text-gold"
            >
              {GUIDES.all} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <Reveal className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="cc-card group flex flex-col rounded-3xl border border-midnight/10 bg-white p-6 no-underline hover:border-gold/50"
              >
                <div aria-hidden="true" className="grid place-items-center rounded-2xl bg-midnight/[0.03] py-3">
                  <PageScene path={article.path} className="h-24 w-full text-midnight" />
                </div>
                <span className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                  {article.kind === "tool" ? "Calculator" : "Guide"}
                </span>
                <h3 className="mt-2 text-xl text-midnight">{article.heading}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{article.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-midnight group-hover:text-gold">
                  {article.kind === "tool" ? "Open the calculator" : "Read the guide"} <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 11. FAQ ---------- */}
      <section id="faq" className="border-t border-midnight/10 bg-paper py-20 md:py-32">
        <div className={WRAP}>
          <div className="mx-auto mb-12 max-w-[40ch] text-center">
            <Label>Questions</Label>
            <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">Questions owners actually ask.</h2>
          </div>
          <Faq items={FAQ} />
        </div>
      </section>

      {/* ---------- 12. Close ---------- */}
      <section id="close" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-24 text-center text-cream md:py-36">
        <DarkBackdrop glow="bottom" />
        <div className={WRAP}>
          <HomeScene name="outOfTheRoom" className="mx-auto mb-8 h-28 w-40 text-cream/70" />
          <h2 className="mx-auto max-w-[16ch] text-[length:clamp(2.5rem,6.5vw,5.25rem)] leading-[0.98] text-cream">
            {CLOSE.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[44ch] text-lg text-cream/70">{CLOSE.sub}</p>
          <div className="mt-10 flex justify-center">
            <ApplyButton className="w-full sm:w-auto">{CLOSE.cta}</ApplyButton>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA. */}
      <div className="sticky bottom-0 z-40 border-t border-cream/10 bg-midnight/95 p-3 md:hidden">
        <ApplyButton size="sm" className="w-full">
          {HERO.cta}
        </ApplyButton>
      </div>

      <HomeFooter />
    </>
  );
}

/** Guarantee seal. The ring turns slowly where motion is welcome; decorative only. */
function Seal() {
  const ring = "20 HOURS BACK · OR YOU DON'T PAY · ";
  return (
    <div aria-hidden="true" className="relative mx-auto h-44 w-44 md:h-52 md:w-52">
      <svg viewBox="0 0 200 200" className="cc-spin h-full w-full text-gold">
        <defs>
          <path id="cc-seal-ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        {/* Stretched to the ring's exact circumference (2π·78) so the phrase meets itself. */}
        <text fill="currentColor" fontFamily="DM Mono, monospace" fontSize="13">
          <textPath href="#cc-seal-ring" textLength="489" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-gold/50 bg-gold/10">
        <span className="text-center">
          <span className="block font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-cream">20</span>
          <span className="mt-1 block font-mono text-[12px] tracking-[0.2em] text-gold">HOURS</span>
        </span>
      </div>
    </div>
  );
}
