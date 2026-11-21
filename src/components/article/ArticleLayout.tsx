import { Link } from "react-router-dom";
import { SEARCH_PAGES, REVIEWED, type SearchPage as Page } from "../../content/searchPages";
import { AuthorBox, Byline } from "../AuthorBox";
import { FaqMark } from "../FaqMarks";
import { Button, ButtonLink, Eyebrow, Faq, Section } from "../ui";
import { GUIDE_OFFER, requestGuide } from "../../lib/guide";
import { linkPhrase, linkPhrases } from "../PhraseLink";
import { ArticleFigure, type ArtName } from "./ArticleFigures";
import { articleArt } from "./articleArt";
import { lessonsFor } from "./articleLessons";

const COUNCILS = "/ai-training-for-bargaining-councils-statutory-bodies";

/** Guide pages, plus the councils page, which is written as an article. */
export function isArticlePage(page: Page) {
  return page.kind === "guide" || page.path === COUNCILS;
}

const labels: Record<string, string> = {
  "/workshop": "Online AI workshop",
  "/": "The Command Core",
  "/call": "Discuss an implementation project",
  "/brain": "Build your Business Brain",
  "/contact": "Contact GrowthCred",
  "/corporate-ai-training": "Corporate AI training for teams",
  "/private-ai": "Private AI, explained",
  "/playbook": "Start with a useful AI workflow.",
};

/** First one or two sentences already on the page. Nothing new is written here. */
function takeSentences(text: string, count: number) {
  const parts = text.match(/[^.!?]+[.!?]+/g);
  if (!parts?.length) return text.trim();
  return parts.slice(0, count).join(" ").replace(/\s+/g, " ").trim();
}

function quickAnswerText(page: Page) {
  const faq = page.faq?.[0]?.a ?? "";
  const answer = page.answer ?? "";
  const standfirstAlreadyShowsAnswer = !page.article?.wayOut && Boolean(answer);
  const source = standfirstAlreadyShowsAnswer && faq ? faq : answer || faq || page.intro;
  return takeSentences(source, 2);
}

function wordsOf(page: Page) {
  const bits = [
    page.heading,
    page.answer ?? "",
    page.intro,
    page.article?.pain ?? "",
    page.article?.wayOut ?? "",
    page.article?.learn ?? "",
    page.article?.get ?? "",
    ...(page.article?.learnItems ?? []),
    page.article?.why ?? "",
    ...(page.article?.mentions?.map((mention) => mention.text) ?? []),
    ...page.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.items ?? []),
      ...(section.points ? [...section.points.problem, ...section.points.fix] : []),
      section.line ?? "",
      section.figureCaption ?? "",
    ]),
    ...(page.faq ?? []).flatMap((item) => [item.q, item.a]),
  ];
  return bits.join(" ").split(/\s+/).filter(Boolean).length;
}

function GuideCallout({ line }: { line: string }) {
  return (
    <aside aria-label={GUIDE_OFFER.title} className="my-8 rounded-2xl border border-gold/50 bg-gold/[0.08] px-5 py-6 md:px-7">
      <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{GUIDE_OFFER.eyebrow}</p>
      <p className="mt-2 max-w-[65ch] text-lg leading-relaxed text-ink">{line}</p>
      <Button type="button" onClick={requestGuide} className="mt-5">{GUIDE_OFFER.cta}</Button>
    </aside>
  );
}

function Toc({ page }: { page: Page }) {
  return (
    <nav aria-label="On this page">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">On this page</p>
      <ol className="mt-3 space-y-2 text-sm">
        {page.sections.map((section, i) => (
          <li key={section.title}>
            <a href={`#section-${i + 1}`} className="text-midnight no-underline hover:text-gold">{section.title}</a>
          </li>
        ))}
        {page.sources && <li><a href="#sources" className="text-midnight no-underline hover:text-gold">Sources</a></li>}
        {page.faq && <li><a href="#faq" className="text-midnight no-underline hover:text-gold">Frequently asked questions</a></li>}
      </ol>
    </nav>
  );
}

/**
 * Shared reading layout for every guide. The words stay in searchPages.
 * The opening is the hook, the way out, then why to listen. Drawings teach the section.
 */
function Lead({ text }: { text: string }) {
  const match = text.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  if (!match) return <strong className="gc-article-mark font-semibold text-midnight">{text}</strong>;
  return (
    <>
      <strong className="gc-article-mark font-semibold text-midnight">{match[1]}</strong> {match[2]}
    </>
  );
}

function PointPair({ slot, label, points, step = false }: { slot: string; label: string; points: string[]; step?: boolean }) {
  return (
    <div data-slot={slot} className="mt-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{label}</p>
      <ol className={`mt-3 list-decimal space-y-3 pl-6 text-lg text-ink ${step ? "gc-article-steps" : ""}`}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>
    </div>
  );
}

export function ArticleLayout({ page }: { page: Page }) {
  const art = articleArt(page.path);
  const hero = page.article?.hero
    ? { name: page.article.hero.name as ArtName, alt: page.article.hero.alt, caption: page.article.hero.caption }
    : art.hero;
  const minutes = page.article?.minutes ?? Math.max(1, Math.round(wordsOf(page) / 220));
  const split = page.intro.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  const pain = page.article?.pain ?? (page.answer ? page.intro : (split?.[1] ?? page.intro));
  const wayOut = page.article?.wayOut ?? page.answer ?? split?.[2] ?? "";
  const fallbackLessons = lessonsFor(page.path, [
    `You learn ${page.sections[0]?.title ?? "the problem"}.`,
    `You get ${page.sections[1]?.title ?? "a next step you can use"}.`,
  ]);
  const lessons: [string, string] = page.article?.learn && page.article?.get
    ? [page.article.learn, page.article.get]
    : fallbackLessons;
  const learnItems = page.article?.learnItems;
  const why = page.article?.why ?? "GrowthCred is a Johannesburg company. We implement AI, and we train teams. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech system that was presented at Parliament.";
  const linkIntro = (text: string) =>
    page.introLink && text.includes(page.introLink.phrase)
      ? linkPhrase(text, page.introLink.phrase, page.introLink.href)
      : text;
  const endCta = page.close?.cta ?? {
    to: page.path.includes("automation") ? "/call" : "/workshop",
    label: page.path.includes("automation") ? "Discuss your workflow" : "Explore the workshop",
  };

  return (
    <>
      <Section className="pb-6 pt-8 md:pb-8 md:pt-12">
        <header className="mx-auto max-w-[72ch]">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted [&_a]:text-midnight [&_a]:no-underline [&_a:hover]:text-gold">
            <Link to="/">Home</Link>
            {page.kind === "guide" && <> / <Link to="/resources">Resources</Link></>}
            {" / "}
            <span aria-current="page">{page.heading}</span>
          </nav>
          <div className="mt-6"><Eyebrow>{page.kind === "guide" ? "The GrowthCred field guide" : "GrowthCred · South Africa"}</Eyebrow></div>
          <h1 className="mt-4 max-w-[36ch] text-[length:clamp(2.15rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.04em] text-midnight">{page.heading}</h1>
          <p data-slot="pain" className="mt-5 max-w-[68ch] text-lg leading-relaxed text-ink">{linkIntro(pain)}</p>
          {wayOut && <p data-slot="way-out" data-direct-answer className="mt-5 max-w-[68ch] border-l-2 border-gold pl-4 text-xl leading-snug text-midnight">{page.article?.wayOut || !page.answer ? linkIntro(wayOut) : wayOut}</p>}
          {!wayOut && <span data-direct-answer className="sr-only">{pain}</span>}
          <div data-slot="quick-answer" className="mt-5 rounded-2xl border border-gold/50 bg-white px-4 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Quick answer</p>
            <p className="mt-2 text-base leading-snug text-midnight">{quickAnswerText(page)}</p>
          </div>
          <p data-slot="read-time" className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{minutes} min read</p>
          {learnItems ? (
            <div data-slot="learn" className="mt-5 rounded-2xl border border-midnight/10 bg-white px-4 py-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">You&apos;ll learn</p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-base leading-snug text-midnight">
                {learnItems.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {(["You'll learn", "You'll get"] as const).map((label, i) => (
                <div key={label} data-slot={i === 0 ? "learn" : "get"} className="rounded-2xl border border-midnight/10 bg-white px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{label}</p>
                  <p className="mt-2 text-base leading-snug text-midnight">{lessons[i]}</p>
                </div>
              ))}
            </div>
          )}
          <section data-slot="why-listen" className="mt-5 rounded-2xl bg-midnight px-5 py-5 text-cream" aria-label="Why listen to GrowthCred">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">Why listen to GrowthCred</p>
            <p className="mt-3 text-base leading-relaxed text-cream/85">{why}</p>
          </section>
          <div className="mt-5">
            <Byline date={page.published ?? REVIEWED} label={page.published ? "Published" : "Reviewed"} />
          </div>
          <ArticleFigure name={hero.name} alt={hero.alt} caption={hero.caption} idSuffix="hero" slot="hero-figure" />
        </header>
      </Section>

      <Section className="pt-0 md:pt-0">
        <div className="lg:grid lg:grid-cols-[minmax(0,72ch)_15rem] lg:justify-center lg:gap-14">
          <article className="min-w-0">
            <details className="mb-10 rounded-2xl border border-midnight/10 bg-white px-4 py-3 lg:hidden">
              <summary className="cursor-pointer font-mono text-[12px] uppercase tracking-[0.14em] text-midnight">On this page</summary>
              <div className="mt-4"><Toc page={page} /></div>
            </details>

            {page.sections.map((section, i) => {
              const fromCopy = section.figure;
              const drawing = fromCopy
                ? { name: fromCopy.name as ArtName, alt: fromCopy.alt, caption: fromCopy.caption, motion: fromCopy.motion }
                : art.inline[i] ?? art.inline[i % art.inline.length];
              const caption = section.figureCaption ?? drawing?.caption ?? "";
              return (
                <section data-slot="section" id={`section-${i + 1}`} key={section.title} className="scroll-mt-24 border-t border-midnight/10 py-10 first:border-t-0 first:pt-0">
                  <h2 className="flex items-start gap-3 text-[length:clamp(1.6rem,3vw,2.15rem)] leading-tight tracking-[-0.03em]">
                    <span className="mt-1 font-mono text-lg text-gold" aria-hidden="true">{i + 1}</span>
                    {section.mark && <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><FaqMark name={section.mark} /></span>}
                    <span>{section.titleLink ? linkPhrase(section.title, section.titleLink.phrase, section.titleLink.href) : section.title}</span>
                  </h2>
                  {drawing && <ArticleFigure name={drawing.name} alt={drawing.alt} caption={caption} idSuffix={`s${i}`} motion={drawing.motion ?? "pointer"} />}
                  {section.points && (
                    <>
                      <PointPair slot="problem" label="The problem" points={section.points.problem} />
                      <PointPair slot="fix" label="The way through" points={section.points.fix} step />
                    </>
                  )}
                  {section.line && <p data-slot="line" className="mt-5 max-w-[70ch] text-lg leading-relaxed text-ink"><strong className="gc-article-mark font-semibold text-midnight">{section.line}</strong></p>}
                  {!section.points && section.paragraphs.map((p, j) => {
                    const links = section.links?.filter((l) => l.index === j);
                    const body = links?.length ? linkPhrases(p, links) : <Lead text={p} />;
                    const callout = i === 1 && j === 0 && p.length < 280;
                    if (callout) {
                      return (
                        <blockquote key={p} className="my-6 border-y border-gold/40 py-5 font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-midnight">
                          {body}
                        </blockquote>
                      );
                    }
                    return <p key={p} className="mt-4 max-w-[70ch] text-lg leading-relaxed text-ink">{body}</p>;
                  })}
                  {section.items && (
                    <ul className="mt-5 max-w-[70ch] list-disc space-y-3 pl-6 text-lg text-ink">
                      {section.items.map((item, k) => {
                        const links = section.itemLinks?.filter((l) => l.index === k);
                        return <li key={item}>{links?.length ? linkPhrases(item, links) : item}</li>;
                      })}
                    </ul>
                  )}
                  {section.table && (
                    <div className="mt-6 max-w-full overflow-x-auto rounded-2xl border border-midnight/10 bg-white">
                      <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-ink">
                        <caption className="sr-only">{section.table.caption}</caption>
                        <thead className="bg-midnight text-cream">
                          <tr>{section.table.headers.map((h) => <th key={h} scope="col" className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em]">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")} className="odd:bg-paper">
                              {row.map((cell, k) => <td key={k} className="border-t border-midnight/10 px-4 py-3 align-top">{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {page.guide?.after === i && <GuideCallout line={page.guide.line} />}
                  {page.close && i === page.sections.length - 2 && (
                    <p className="mt-6">
                      <Link to={endCta.to} className="font-semibold text-midnight underline decoration-gold underline-offset-4 hover:text-gold">{endCta.label}</Link>
                    </p>
                  )}
                </section>
              );
            })}

            {page.article?.mentions && (
              <div data-slot="mentions" className="mt-2 border-t border-midnight/10 py-8">
                {page.article.mentions.map((mention) => (
                  <p key={mention.text} data-slot="mention" className="mt-4 max-w-[70ch] text-lg leading-relaxed text-ink first:mt-0">
                    {mention.phrase && mention.href ? linkPhrase(mention.text, mention.phrase, mention.href) : mention.text}
                  </p>
                ))}
              </div>
            )}

            {page.close && (
              <section data-slot="cta" aria-label="Next step" className="mt-4 rounded-3xl bg-midnight px-6 py-8 text-cream md:px-10 md:py-12">
                <p className="max-w-[20ch] font-display text-[length:clamp(1.8rem,4vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em]">{page.close.line}</p>
                <p className="mt-5 max-w-[42ch] text-lg text-cream/75">{page.close.ask}</p>
                <ButtonLink to={page.close.cta.to} className="mt-6">{page.close.cta.label}</ButtonLink>
              </section>
            )}

            {page.sources && (
              <section id="sources" className="scroll-mt-24 border-t border-midnight/10 py-10">
                <h2 className="text-2xl">Sources behind this page</h2>
                <p className="mt-4 max-w-[70ch] leading-relaxed text-ink">Here&apos;s where the public figures on this page come from. They aren&apos;t our client results. They don&apos;t endorse us. And they&apos;re no substitute for your own professional advice.</p>
                <ul className="mt-5 list-disc space-y-3 pl-6 text-ink">
                  {page.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}
                </ul>
              </section>
            )}

            {page.faq && (
              <section id="faq" className="scroll-mt-24 border-t border-midnight/10 py-10">
                <h2 className="text-2xl md:text-3xl">Frequently asked questions</h2>
                <div className="mt-6">
                  <Faq items={page.faq.map((item) => ({
                    ...item,
                    q: item.qLink ? linkPhrase(item.q, item.qLink.phrase, item.qLink.href) : item.q,
                    a: item.aLink ? linkPhrase(item.a, item.aLink.phrase, item.aLink.href) : item.a,
                  }))} />
                </div>
              </section>
            )}

            {!page.close && (
              <section data-slot="cta" aria-label="Next step" className="mt-8">
                <ButtonLink to={endCta.to}>{endCta.label}</ButtonLink>
              </section>
            )}
            <AuthorBox className="mt-8" />
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-midnight/10 bg-white p-5">
              <Toc page={page} />
            </div>
          </aside>
        </div>
      </Section>

      <Section dark>
        <Eyebrow dark>Keep going</Eyebrow>
        <h2 className="mt-4 text-3xl text-cream">Your next useful step.</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {page.related.map((path) => (
            <Link key={path} to={path} className="cc-card rounded-2xl border border-cream/20 bg-midnight-soft/60 p-5 text-cream no-underline hover:border-gold">
              {SEARCH_PAGES.find((p) => p.path === path)?.heading ?? labels[path] ?? path}
              <span aria-hidden="true"> ↗</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
