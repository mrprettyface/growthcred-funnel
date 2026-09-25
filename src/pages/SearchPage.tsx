import { Link } from "react-router-dom";
import { SEARCH_PAGES, REVIEWED, type SearchPage as Page } from "../content/searchPages";

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
/** "2026-09-24" -> "24 September 2026", without the locale APIs (server and browser must agree). */
const longDate=(iso:string)=>{const [y,m,d]=iso.split("-").map(Number);return `${d} ${MONTHS[m-1]} ${y}`;};
const kindLabel=(kind?:Page["kind"])=>kind==="tool"?"Calculator":kind==="story"?"Client story":"Guide";
import { ButtonLink, Section, Eyebrow, Faq } from "../components/ui";
import { FOUNDER } from "../lib/home";
import { CostCalculator } from "../components/CostCalculator";
import { PageScene } from "../components/PageScenes";
import { FaqMark } from "../components/FaqMarks";
const labels:Record<string,string>={"/workshop":"Online AI workshop","/":"The Command Core","/call":"Discuss an implementation project","/brain":"Build your Business Brain","/contact":"Contact GrowthCred","/corporate-ai-training":"Corporate AI training for teams"};
export function SearchPage({page}:{page:Page}) {
  return <>
    <Section dark className="pt-10 md:pt-16">
      <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/55 [&_a]:text-cream/75 [&_a]:no-underline [&_a:hover]:text-gold"><Link to="/">Home</Link> / {page.kind==='guide'&&<><Link to="/resources">Resources</Link> / </>}{page.kind==='story'&&<><Link to="/stories">Stories</Link> / </>}<span aria-current="page">{page.kind==='guide'?'Guide':page.kind==='story'?'Client story':page.kind==='tool'?'Calculator':page.kind==='about'?'About':page.path==='/stories'?'Stories':page.kind==='hub'?'Resources':'Services'}</span></nav>
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-[860px]">
        <Eyebrow dark>{page.kind==='guide'?'The GrowthCred field guide':page.kind==='story'?'Client story':page.path==='/stories'?'Client stories':page.kind==='tool'?'Work out the time':'GrowthCred · South Africa'}</Eyebrow>
        <h1 className="mt-5 text-4xl leading-tight text-cream md:text-6xl">{page.heading}</h1>
        <p className="mt-7 max-w-[68ch] text-lg leading-relaxed text-cream/75">{page.intro}</p>
        {page.kind!=='hub'&&page.kind!=='about'&&<p className="mt-6 text-sm text-cream/55 [&_a]:text-cream">By <Link to="/about">Phila Ngwenya</Link> · {page.published?'Published':'Reviewed'} <time dateTime={page.published??REVIEWED}>{longDate(page.published??REVIEWED)}</time></p>}
      </div>
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rounded-3xl border border-cream/10 bg-midnight-soft/70 p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] md:mx-0"><PageScene path={page.path} className="h-40 w-full text-cream/80 md:h-48" /></div>
      </div>
    </Section>
    {(page.quote||page.images)&&<Section className="pb-0 md:pb-0">
      {page.quote&&<figure className="max-w-[860px] border-l-4 border-gold pl-6 md:pl-8"><blockquote className="font-display text-2xl font-extrabold leading-snug tracking-[-0.03em] text-midnight md:text-4xl"><span aria-hidden="true" className="text-gold">&ldquo;</span>{page.quote.text}<span aria-hidden="true" className="text-gold">&rdquo;</span></blockquote><figcaption className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{page.quote.by}</figcaption></figure>}
      {page.images&&<div className={`grid gap-5 ${page.quote?'mt-10':''} ${page.images.length>1?'md:grid-cols-2':''}`}>{page.images.map(img=><figure key={img.src} className="overflow-hidden rounded-3xl border border-midnight/10 bg-white shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)]"><img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="h-auto w-full"/>{img.caption&&<figcaption className="px-5 py-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{img.caption}</figcaption>}</figure>)}</div>}
    </Section>}
    {page.kind==='about'&&<Section className="pb-0 md:pb-0"><img src="/images/phila-event-640.webp" width="640" height="853" alt="Phila Ngwenya, founder of GrowthCred" className="w-full max-w-sm rounded-2xl"/><p className="mt-4 flex flex-wrap gap-5"><a href="https://www.youtube.com/@PhilaNgwenyagrowth">Watch Phila on YouTube</a><a href="https://www.linkedin.com/in/phila-ngwenya-908b1a179/">Phila on LinkedIn</a></p></Section>}
    <Section>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,760px)_1fr]">
        <article className="min-w-0 space-y-10">
          {page.sections.map((section,i)=><section id={`section-${i+1}`} key={section.title} className="scroll-mt-28"><h2 className="flex items-center gap-3 text-2xl md:text-3xl">{section.mark&&<span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold"><FaqMark name={section.mark}/></span>}{section.title}</h2>{section.paragraphs.map(p=><p key={p} className="mt-4 max-w-[70ch] leading-relaxed text-ink">{p}</p>)}{section.items&&<ul className="mt-5 list-disc space-y-3 pl-6 text-ink">{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}
          {page.sources&&<section id="sources" className="scroll-mt-28"><h2 className="text-2xl md:text-3xl">Sources behind this page</h2><p className="mt-4 max-w-[70ch] leading-relaxed text-ink">These sources support the public claims and decision context on this page. They are not GrowthCred client results, endorsements of GrowthCred or a substitute for professional advice.</p><ul className="mt-5 list-disc space-y-3 pl-6 text-ink">{page.sources.map(source=><li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section>}
          {page.kind==='tool'&&<CostCalculator/>}
          {page.faq&&<section id="faq" className="scroll-mt-28"><h2 className="text-2xl md:text-3xl">Frequently asked questions</h2><div className="mt-6"><Faq items={page.faq}/></div></section>}
          {page.kind!=='hub'&&page.kind!=='about'&&<AuthorBox/>}
          {page.kind==='hub'&&<ul className="grid gap-4 sm:grid-cols-2">{page.related.map(path=>{const target=SEARCH_PAGES.find(p=>p.path===path);return <li key={path}><Link to={path} className="cc-card group flex h-full flex-col rounded-3xl border border-midnight/10 bg-white p-5 no-underline hover:border-gold"><div aria-hidden="true" className="grid place-items-center rounded-xl bg-midnight/[0.03] py-3"><PageScene path={path} className="h-28 w-full text-midnight"/></div><span className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{kindLabel(target?.kind)}</span><span className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-midnight">{target?.heading??path}</span><span className="mt-3 text-sm text-gold">Read on<span aria-hidden="true"> ↗</span></span></Link></li>})}</ul>}
        </article>
        <aside className="rounded-3xl border border-midnight/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] lg:sticky lg:top-28"><h2 className="text-lg">On this page</h2><ul className="mt-4 space-y-3 text-sm">{page.sections.map((s,i)=><li key={s.title}><a href={`#section-${i+1}`}>{s.title}</a></li>)}{page.sources&&<li><a href="#sources">Sources</a></li>}{page.faq&&<li><a href="#faq">Frequently asked questions</a></li>}</ul>{page.ctas?<div className="mt-6 grid gap-3">{page.ctas.map((cta,i)=><ButtonLink key={cta.to} to={cta.to} variant={i===0?undefined:"outline"} className="w-full">{cta.label}</ButtonLink>)}</div>:<ButtonLink to={page.kind==='story'||page.path==='/stories'?'/call':page.path.includes('automation')?'/call':'/workshop'} className="mt-6 w-full">{page.kind==='story'||page.path==='/stories'?'Apply to work with us':page.path.includes('automation')?'Discuss your workflow':'Explore the workshop'}</ButtonLink>}</aside>
      </div>
    </Section>
    {page.kind!=='hub'&&<Section dark><Eyebrow dark>Keep going</Eyebrow><h2 className="mt-4 text-3xl text-cream">Your next useful step.</h2><div className="mt-7 grid gap-4 md:grid-cols-2">{page.related.map(path=><Link key={path} to={path} className="cc-card rounded-2xl border border-cream/20 bg-midnight-soft/60 p-5 text-cream no-underline hover:border-gold">{SEARCH_PAGES.find(p=>p.path===path)?.heading??labels[path]??path}<span aria-hidden="true"> ↗</span></Link>)}</div></Section>}
  </>;
}
/** Who wrote this. Experience and authorship, stated plainly, on every article. */
function AuthorBox(){return <aside aria-label="About the author" className="flex flex-col gap-5 rounded-3xl border border-midnight/10 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] sm:flex-row sm:items-center"><img src="/images/phila-event-640.webp" width="640" height="853" alt="Phila Ngwenya, founder of GrowthCred" loading="lazy" decoding="async" className="h-28 w-24 shrink-0 rounded-2xl object-cover object-top"/><div><p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">About the author</p><p className="mt-1 font-display text-xl font-extrabold tracking-[-0.03em] text-midnight"><Link to="/about" className="no-underline hover:text-gold">{FOUNDER.name}</Link></p><p className="mt-1 text-sm text-muted">{FOUNDER.title}</p><p className="mt-3 text-sm leading-relaxed text-ink">{FOUNDER.credentials.join(" ")}</p></div></aside>}
export function NotFound(){return <Section className="min-h-[65vh] pt-16"><Eyebrow>404 · Page not found</Eyebrow><h1 className="mt-5 text-4xl md:text-6xl">Let’s get you to the right place.</h1><p className="mt-6 max-w-xl text-lg">This address doesn’t match a page on our site. Explore the workshop, find a practical guide, or contact us.</p><div className="mt-8 flex flex-wrap gap-4"><ButtonLink to="/workshop">The workshop</ButtonLink><ButtonLink to="/resources" variant="outline">Practical guides</ButtonLink><ButtonLink to="/contact" variant="outline">Contact</ButtonLink></div></Section>}
