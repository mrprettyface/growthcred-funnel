import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { DarkBackdrop, Faq, PillLink } from "../components/ui";
import { Bento, Num, ON_GOLD_BUTTON, Sticker, TILE_TEXT, Tile, tileClass, type TileTone } from "../components/bento";
import { PageScene } from "../components/PageScenes";
import { SEARCH_PAGES } from "../content/searchPages";
import { situationLinksOn } from "../content/situationLinks";
import { HomeScene, STAGE_SCENES, METHOD_SCENES, RENTING_SCENES, OWN_SCENES } from "../components/HomeScenes";
import { BentoHero } from "../components/home/BentoHero";
import { ApplyButton, HomeFooter, HomeHeader } from "../components/home/HomeChrome";
import { track } from "../lib/analytics";
import {
  APPLY_HREF,
  HERO,
  CAPACITY,
  RENTING,
  OWN,
  BELIEFS,
  STAGES,
  METHOD,
  FOUNDER,
  GUARANTEE,
  CLOSE,
  STORIES,
  WAYS,
  GUIDES,
  FAQ,
  SITUATIONS,
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

/** The bento sections share the hero's width. */
const BWRAP = "mx-auto w-[min(1240px,calc(100%-1.5rem))]";

/** #own: four tiles in a staggered 7/5, 5/7 rhythm, one gold and one dark. */
const OWN_TONES: TileTone[] = ["white", "gold", "night", "white"];
const OWN_SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

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

/** Every article and tool on the site, in the order the guide hub lists them. */
const ARTICLES = SEARCH_PAGES.filter((page) => page.kind === "guide" || page.kind === "tool");
/** Situation cards only where the page exists: three guides plus the two pages added here. */
const SITUATION_CARDS = situationLinksOn(SEARCH_PAGES.map((page) => page.path));

/** One client story. The whole card is the link; a quote card inverts to dark. */
function StoryCard({ story }: { story: HomeStory }) {
  const dark = Boolean(story.quote);
  return (
    <Link
      to={story.href}
      className={`cc-card group flex flex-col overflow-hidden rounded-[2rem] border no-underline ${
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
      {/* ---------- 1. Hero: the bento (src/components/home/BentoHero.tsx) ---------- */}
      <BentoHero />

      {/* ---------- 2. The number ----------
          Bento: the gold tile holds the argument; the three things that wait on
          the owner stack beside it; the ask and the fix close the grid. */}
      <section id="capacity" className="bg-paper py-16 md:py-24">
        <Reveal className={BWRAP}>
          <Bento>
            <Tile tone="gold" className="flex flex-col justify-between lg:col-span-7 lg:row-span-3 lg:p-12">
              <div>
                <h2 className="max-w-[18ch] text-[length:clamp(2rem,4.2vw,3.5rem)] text-midnight">{CAPACITY.heading}</h2>
                <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-midnight/80 md:text-xl">{CAPACITY.gap}</p>
              </div>
              <HomeScene name="drain" className="mt-10 h-28 w-36 text-midnight" />
            </Tile>
            {CAPACITY.waits.map((row, i) => (
              <Tile
                key={row.t}
                tone={i === 1 ? "night" : "white"}
                className="flex items-center justify-between gap-4 py-6 md:py-7 lg:col-span-5"
              >
                <span className="font-display text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">{row.t}</span>
                <span className={`text-right ${i === 1 ? "text-cream/75" : "text-ink"}`}>{row.b}</span>
              </Tile>
            ))}
            <Tile tone="dashed" className="flex items-center lg:col-span-5">
              <p className="max-w-[36ch] text-lg leading-relaxed text-midnight md:text-xl">{CAPACITY.lead}</p>
            </Tile>
            <Tile tone="night" className="lg:col-span-7">
              <p className="text-cream/60">{CAPACITY.tried}</p>
              <p className="mt-6 border-t border-cream/15 pt-6 font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-cream md:text-3xl">
                {CAPACITY.closeA} <span className="text-gold-soft">{CAPACITY.closeB}</span>
              </p>
            </Tile>
          </Bento>
        </Reveal>
      </section>

      {/* ---------- 2b. Renting AI doesn't fix it ---------- */}
      <section id="renting" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-16 text-cream md:py-24">
        <DarkBackdrop />
        <div className={BWRAP}>
          <div className="max-w-[44ch]">
            <Label dark>{RENTING.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{RENTING.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-cream/75 md:text-xl">{RENTING.lead}</p>
          </div>
          <Reveal className="mt-12">
            <Bento>
              {RENTING.items.map((item, i) => (
                <Tile
                  key={item.t}
                  as="article"
                  tone="nightSoft"
                  className={`flex flex-col ${i === 0 ? "lg:col-span-6 lg:row-span-2 lg:justify-between lg:p-12" : "lg:col-span-6"}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <Num n={i + 1} dark />
                    <HomeScene name={RENTING_SCENES[i]} className={`text-cream/65 ${i === 0 ? "h-28 w-36 lg:h-52 lg:w-72" : "h-20 w-28"}`} />
                  </div>
                  <div>
                    <h3 className={`mt-6 text-cream ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"}`}>{item.t}</h3>
                    <p className="mt-3 max-w-[46ch] leading-relaxed text-cream/70">{item.b}</p>
                  </div>
                </Tile>
              ))}
              <Tile tone="gold" className="lg:col-span-12 lg:px-14 lg:py-12">
                <p className="max-w-[34ch] font-display text-[length:clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-midnight">
                  {RENTING.close}
                </p>
              </Tile>
            </Bento>
          </Reveal>
        </div>
      </section>

      {/* ---------- 2c. Owning it: the Command Core ---------- */}
      <section id="own" className="bg-paper py-16 md:py-24">
        <div className={BWRAP}>
          <div className="max-w-[44ch]">
            <Label>{OWN.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)]">{OWN.heading}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink md:text-xl">{OWN.lead}</p>
          </div>
          <Reveal className="mt-12">
            <Bento>
              {OWN.items.map((item, i) => {
                const tone = OWN_TONES[i];
                return (
                  <Tile key={item.t} tone={tone} className={OWN_SPANS[i]}>
                    <Num n={i + 1} dark={tone === "night"} />
                    <HomeScene
                      name={OWN_SCENES[i]}
                      className={`mt-5 h-24 w-32 ${tone === "night" ? "text-cream/75" : "text-midnight/80"}`}
                    />
                    <h3 className={`mt-4 text-2xl md:text-3xl ${tone === "night" ? "text-cream" : "text-midnight"}`}>{item.t}</h3>
                    <p className={`mt-3 max-w-[40ch] leading-relaxed ${TILE_TEXT[tone]}`}>{item.b}</p>
                  </Tile>
                );
              })}
              <Tile tone="dashed" className="flex items-center lg:col-span-7">
                <p className="max-w-[56ch] text-lg leading-relaxed text-ink">{OWN.honest}</p>
              </Tile>
              <Tile tone="night" className="flex flex-col justify-between gap-8 overflow-visible lg:col-span-5">
                <Sticker i={1} tone="gold" shape="circle" className="-top-6 right-3 rotate-[12deg] md:-right-4" chipClassName="h-20 w-20 text-lg md:h-24 md:w-24 md:text-xl">
                  Yours
                </Sticker>
                <p className="max-w-[22ch] font-display text-[length:clamp(1.5rem,2.6vw,2rem)] font-extrabold leading-tight tracking-[-0.03em] text-cream">
                  {OWN.owned}
                </p>
                <Link
                  to={OWN.more.to}
                  className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-gold font-semibold text-gold no-underline hover:border-gold-soft hover:text-gold-soft"
                >
                  {OWN.more.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </Tile>
            </Bento>
          </Reveal>
        </div>
      </section>

      {/* ---------- 2d. What we believe, and one time we said "not yet" ---------- */}
      <section id="beliefs" className="bg-paper pb-16 md:pb-24">
        <Reveal className={BWRAP}>
          <Bento>
            <Tile tone="white" className="lg:col-span-7 lg:p-12">
              <Label>{BELIEFS.eyebrow}</Label>
              <h2 className="mt-5 max-w-[16ch] text-[length:clamp(2.25rem,5vw,3.75rem)]">{BELIEFS.heading}</h2>
              <ol className="mt-10 divide-y divide-midnight/10 border-y border-midnight/10">
                {BELIEFS.items.map((item, i) => (
                  <li key={item.t} className="grid grid-cols-[3.25rem_1fr] gap-x-4 py-6">
                    <Num n={i + 1} />
                    <div>
                      <h3 className="text-xl text-midnight md:text-2xl">{item.t}</h3>
                      <p className="mt-2 max-w-[52ch] leading-relaxed text-ink">{item.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Tile>
            <Tile as="article" tone="night" className="flex flex-col lg:col-span-5 lg:p-11">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold">{BELIEFS.story.eyebrow}</p>
              <div className="mb-8">
                {BELIEFS.story.paragraphs.map((p) => (
                  <p key={p} className="mt-5 leading-relaxed text-cream/75">
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-auto rounded-[1.5rem] bg-gold-soft p-6 font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-midnight">
                {BELIEFS.story.moral}
              </p>
            </Tile>
          </Bento>
        </Reveal>
      </section>

      {/* ---------- 3. The situations that still wait on the owner ---------- */}
      <section id="situations" className="bg-paper pb-16 md:pb-24">
        <div className={BWRAP}>
          <div className="pt-4">
            <Label>{SITUATIONS.eyebrow}</Label>
            <h2 className="mt-5 max-w-[16ch] text-[length:clamp(2.5rem,6vw,4.5rem)]">{SITUATIONS.heading}</h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink">{SITUATIONS.sub}</p>
          </div>
          <ul className="mt-12 grid gap-4 lg:grid-cols-6">
            {SITUATION_CARDS.map((item, i) => {
              const tone = i === 0 ? "gold" : "white";
              return (
                <li key={item.path} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                  <Link
                    to={item.path}
                    className={tileClass(
                      tone,
                      `cc-card group flex h-full flex-col gap-6 no-underline ${tone === "white" ? "hover:border-gold/60" : ""}`,
                    )}
                  >
                    <span className={`font-mono text-[12px] uppercase tracking-[0.16em] ${tone === "gold" ? "text-midnight/70" : "text-gold"}`}>
                      {item.label}
                    </span>
                    <span className={`flex-1 leading-snug text-midnight ${i < 2 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} ${tone === "white" ? "group-hover:text-gold" : ""}`}>
                      {item.line}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid h-11 w-11 place-items-center self-end rounded-full transition-transform group-hover:translate-x-0.5 ${
                        tone === "gold" ? "bg-white text-midnight" : "bg-midnight text-gold"
                      }`}
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- 4. Client stories: the proof behind the claims ---------- */}
      <section id="stories" className="bg-paper pb-16 md:pb-24">
        <div className={BWRAP}>
          <div className="flex flex-col gap-6 pt-4 md:flex-row md:items-end md:justify-between">
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
          <Reveal className="mt-12 grid gap-4 md:grid-cols-2">
            {STORIES.items.map((story) => (
              <StoryCard key={story.client} story={story} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- 5. The method ---------- */}
      <section id="method" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-16 text-cream md:py-24">
        <DarkBackdrop />
        <div className={BWRAP}>
          <Label dark>{METHOD.eyebrow}</Label>
          <h2 className="mt-5 max-w-[16ch] text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{METHOD.heading}</h2>
          <p className="mt-5 max-w-[36ch] text-lg text-cream/70">{METHOD.note}</p>
          <Reveal>
            <ol className="mt-12 grid gap-4 lg:grid-cols-3">
              {METHOD.steps.map((step, i) => (
                <Tile key={step.t} as="li" tone={i === 1 ? "gold" : "nightSoft"} className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <Num n={i + 1} dark={i !== 1} />
                    <HomeScene name={METHOD_SCENES[i]} className={`h-20 w-28 ${i === 1 ? "text-midnight/80" : "text-cream/65"}`} />
                  </div>
                  <h3 className={`mt-8 text-3xl md:text-4xl ${i === 1 ? "text-midnight" : "text-cream"}`}>{step.t}</h3>
                  <p className={`mt-3 max-w-[34ch] leading-relaxed ${i === 1 ? "text-midnight/80" : "text-cream/70"}`}>{step.b}</p>
                </Tile>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- 6. Pick your stage ---------- */}
      <section id="stages" className="bg-paper py-16 md:py-24">
        <div className={BWRAP}>
          <div>
            <Label>{STAGES.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)]">{STAGES.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink">{STAGES.sub}</p>
            <p className="mt-3 max-w-[52ch] font-semibold leading-relaxed text-midnight">{STAGES.equipment}</p>
          </div>
          <Reveal className="mt-12 grid gap-4 md:grid-cols-3">
            {STAGES.items.map((stage, i) => {
              const featured = i === 1;
              return (
                <article
                  key={stage.name}
                  className={`cc-card flex flex-col rounded-[2rem] border p-7 md:p-8 ${
                    featured
                      ? "border-gold/40 bg-midnight text-cream shadow-[0_40px_90px_-40px_rgba(26,26,36,0.7)]"
                      : "border-midnight/10 bg-white hover:border-gold/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.14em] ${
                        featured ? "bg-gold-soft text-midnight" : "bg-midnight text-gold-soft"
                      }`}
                    >
                      {stage.band}
                    </span>
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

      {/* ---------- 7. The founder ----------
          Bento: the photo tile on the left, the name in gold and the record in
          white beside it. The photo is unchanged (Phila's choice). */}
      <section id="founder" className="bg-paper pb-16 md:pb-24">
        <Reveal className={BWRAP}>
          <Bento>
            <div className="relative min-h-[26rem] overflow-hidden rounded-[2rem] lg:col-span-5 lg:row-span-2">
              {/* Phila with a guest at an event: the photo the site has always used. */}
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/phila-event-640.webp 640w, /images/phila-event-1200.webp 1200w"
                  sizes="(min-width: 1024px) 480px, 92vw"
                />
                <img
                  src="/images/phila-event.jpg"
                  alt="Phila Ngwenya, Founder of GrowthCred"
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </picture>
            </div>
            <Tile tone="gold" className="lg:col-span-7 lg:p-12">
              <h2 className="text-[length:clamp(2.5rem,5vw,4rem)] text-midnight">{FOUNDER.name}</h2>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-midnight/70">{FOUNDER.title}</p>
            </Tile>
            <Tile tone="white" className="lg:col-span-7">
              <ul className="divide-y divide-midnight/10">
                {FOUNDER.credentials.map((line) => (
                  <li key={line} className="flex items-start gap-4 py-4 text-lg text-midnight first:pt-0 last:pb-0">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    {line}
                  </li>
                ))}
              </ul>
            </Tile>
          </Bento>
        </Reveal>
      </section>

      {/* ---------- 8. The guarantee ---------- */}
      <section id="guarantee" className="bg-paper pb-16 md:pb-24">
        <Reveal className={BWRAP}>
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
      <section id="ways" data-tone="dark" className="relative isolate overflow-hidden bg-midnight py-16 text-cream md:py-24">
        <DarkBackdrop />
        <div className={BWRAP}>
          <div className="max-w-[44ch]">
            <Label dark>{WAYS.eyebrow}</Label>
            <h2 className="mt-5 text-[length:clamp(2.5rem,6vw,4.5rem)] text-cream">{WAYS.heading}</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/70">{WAYS.sub}</p>
          </div>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {WAYS.items.map((way, i) => {
              const gold = i === 0;
              return (
                <Link
                  key={way.href}
                  to={way.href}
                  className={tileClass(
                    gold ? "gold" : "nightSoft",
                    `cc-card group flex flex-col no-underline md:p-7 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${
                      gold ? "" : "hover:border-gold/50"
                    }`,
                  )}
                >
                  <div aria-hidden="true" className={`grid place-items-center rounded-[1.4rem] py-4 ${gold ? "bg-white/50" : "bg-midnight/60"}`}>
                    <PageScene path={way.href} className={`h-24 w-full ${gold ? "text-midnight" : "text-cream/75"}`} />
                  </div>
                  <h3 className={`mt-6 text-xl ${gold ? "text-midnight" : "text-cream"}`}>{way.title}</h3>
                  <p className={`mt-3 flex-1 text-sm leading-relaxed ${gold ? "text-midnight/75" : "text-cream/65"}`}>{way.line}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${gold ? "text-midnight" : "text-gold"}`}>
                    Explore <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ---------- 10. The field guide: every article ---------- */}
      <section id="guides" className="bg-paper py-16 md:py-24">
        <div className={BWRAP}>
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
          <Reveal className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="cc-card group flex flex-col rounded-[2rem] border border-midnight/10 bg-white p-6 no-underline hover:border-gold/50"
              >
                <div aria-hidden="true" className="grid place-items-center rounded-[1.4rem] bg-midnight/[0.03] py-3">
                  <PageScene path={article.path} className="h-24 w-full text-midnight" />
                </div>
                <span className="mt-5 self-start rounded-full bg-gold-soft/60 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-midnight">
                  {article.kind === "tool" ? "Calculator" : "Guide"}
                </span>
                <h3 className="mt-3 text-xl text-midnight">{article.heading}</h3>
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
      <section id="faq" className="bg-paper pb-16 md:pb-24">
        <div className={BWRAP}>
          <Tile tone="white" className="lg:px-16 lg:py-14">
            <div className="mx-auto mb-12 max-w-[40ch] text-center">
              <Label>Questions</Label>
              <h2 className="mt-5 text-[length:clamp(2.25rem,5vw,3.75rem)]">Questions owners actually ask.</h2>
            </div>
            <Faq items={FAQ} />
          </Tile>
        </div>
      </section>

      {/* ---------- 12. Close ----------
          The bookend to the hero: one big gold tile, the same white button. */}
      <section id="close" data-tone="light" className="bg-paper pb-16 md:pb-24">
        <div className={BWRAP}>
          <Tile tone="gold" className="overflow-hidden px-6 py-16 text-center md:px-12 md:py-24">
            <Sticker i={0} tone="white" className="left-[5%] top-[8%] hidden rotate-[-8deg] md:block" chipClassName="text-lg md:text-xl">
              Own your intelligence
            </Sticker>
            <Sticker i={1} tone="night" shape="circle" className="bottom-[8%] right-[5%] hidden rotate-[10deg] md:block" chipClassName="h-28 w-28 text-xl">
              Private AI
            </Sticker>
            <HomeScene name="outOfTheRoom" className="mx-auto mb-8 h-28 w-40 text-midnight" />
            <h2 className="mx-auto max-w-[16ch] text-[length:clamp(2.5rem,6.5vw,5.25rem)] leading-[0.98] text-midnight">
              {CLOSE.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-[44ch] text-lg text-midnight/80">{CLOSE.sub}</p>
            <div className="mt-10 flex justify-center">
              <PillLink to={APPLY_HREF} className={`w-full sm:w-auto ${ON_GOLD_BUTTON}`}>
                {CLOSE.cta}
              </PillLink>
            </div>
          </Tile>
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
  const ring = "20% OF YOUR WEEK BACK · OR YOU DON'T PAY · ";
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
          <span className="block font-display text-5xl font-extrabold leading-none tracking-[-0.05em] text-cream">20%</span>
          <span className="mt-1 block font-mono text-[12px] tracking-[0.2em] text-gold">BACK</span>
        </span>
      </div>
    </div>
  );
}
