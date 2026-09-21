import { Link } from "react-router-dom";
import { SEARCH_PAGES, REVIEWED, type SearchPage as Page } from "../content/searchPages";
import { ButtonLink, Section, Eyebrow } from "../components/ui";
import { CostCalculator } from "../components/CostCalculator";
import { PageScene } from "../components/PageScenes";
import { FaqMark } from "../components/FaqMarks";
const labels:Record<string,string>={"/":"Online AI workshop","/call":"Discuss an implementation project","/brain":"Build your Business Brain","/contact":"Contact GrowthCred"};
export function SearchPage({page}:{page:Page}) {
  return <>
    <Section className="pt-10 md:pt-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm"><Link to="/">Home</Link> / {page.kind==='guide'&&<><Link to="/resources">Resources</Link> / </>}<span aria-current="page">{page.kind==='guide'?'Guide':page.kind==='tool'?'Calculator':page.kind==='about'?'About':page.kind==='hub'?'Resources':'Services'}</span></nav>
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
      <div className="max-w-[860px]">
        <Eyebrow>{page.kind==='guide'?'The GrowthCred field guide':page.kind==='tool'?'Work out the time':'GrowthCred · South Africa'}</Eyebrow>
        <h1 className="mt-5 text-4xl leading-tight md:text-6xl">{page.heading}</h1>
        <p className="mt-7 max-w-[68ch] text-lg leading-relaxed text-ink">{page.intro}</p>
        {page.kind==='guide'&&<p className="mt-6 text-sm text-muted">By <Link to="/about">Phila Ngwenya</Link> · Reviewed <time dateTime={REVIEWED}>20 September 2026</time></p>}
      </div>
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rounded-2xl bg-midnight/[0.03] p-5 md:mx-0"><PageScene path={page.path} className="h-40 w-full text-midnight md:h-48" /></div>
      </div>
    </Section>
    {page.kind==='about'&&<Section className="pt-0"><img src="/images/phila-event-640.webp" width="640" height="853" alt="Phila Ngwenya, founder of GrowthCred" className="w-full max-w-sm rounded-2xl"/><p className="mt-4 flex flex-wrap gap-5"><a href="https://www.youtube.com/@PhilaNgwenyagrowth">Watch Phila on YouTube</a><a href="https://www.linkedin.com/in/phila-ngwenya-908b1a179/">Phila on LinkedIn</a></p></Section>}
    <Section className="pt-0">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,760px)_1fr]">
        <article className="min-w-0 space-y-10">
          {page.sections.map((section,i)=><section id={`section-${i+1}`} key={section.title} className="scroll-mt-28"><h2 className="flex items-center gap-3 text-2xl md:text-3xl">{section.mark&&<span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold"><FaqMark name={section.mark}/></span>}{section.title}</h2>{section.paragraphs.map(p=><p key={p} className="mt-4 max-w-[70ch] leading-relaxed text-ink">{p}</p>)}{section.items&&<ul className="mt-5 list-disc space-y-3 pl-6 text-ink">{section.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}
          {page.kind==='tool'&&<CostCalculator/>}
          {page.kind==='hub'&&<ul className="grid gap-4 sm:grid-cols-2">{page.related.map(path=>{const target=SEARCH_PAGES.find(p=>p.path===path);return <li key={path}><Link to={path} className="group flex h-full flex-col rounded-2xl border border-midnight/10 bg-white p-5 no-underline transition hover:border-gold"><div aria-hidden="true" className="grid place-items-center rounded-xl bg-midnight/[0.03] py-3"><PageScene path={path} className="h-28 w-full text-midnight"/></div><span className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">{target?.kind==='tool'?'Calculator':'Guide'}</span><span className="mt-2 font-display text-lg font-bold tracking-[-0.02em] text-midnight">{target?.heading??path}</span><span className="mt-3 text-sm text-gold">Read on<span aria-hidden="true"> ↗</span></span></Link></li>})}</ul>}
        </article>
        <aside className="rounded-2xl border border-midnight/10 bg-white p-6 lg:sticky lg:top-28"><h2 className="text-lg">On this page</h2><ul className="mt-4 space-y-3 text-sm">{page.sections.map((s,i)=><li key={s.title}><a href={`#section-${i+1}`}>{s.title}</a></li>)}</ul><ButtonLink to={page.path.includes('automation')?'/call':'/'} className="mt-6 w-full">{page.path.includes('automation')?'Discuss your workflow':'Explore the workshop'}</ButtonLink></aside>
      </div>
    </Section>
    {page.kind!=='hub'&&<Section dark><Eyebrow dark>Keep going</Eyebrow><h2 className="mt-4 text-3xl text-cream">Your next useful step.</h2><div className="mt-7 grid gap-4 md:grid-cols-2">{page.related.map(path=><Link key={path} to={path} className="rounded-xl border border-cream/25 p-5 text-cream no-underline hover:border-gold">{SEARCH_PAGES.find(p=>p.path===path)?.heading??labels[path]??path}<span aria-hidden="true"> ↗</span></Link>)}</div></Section>}
  </>;
}
export function NotFound(){return <Section className="min-h-[65vh] pt-16"><Eyebrow>404 · Page not found</Eyebrow><h1 className="mt-5 text-4xl md:text-6xl">Let’s get you to the right place.</h1><p className="mt-6 max-w-xl text-lg">This address doesn’t match a page on our site. Explore the workshop, find a practical guide, or contact us.</p><div className="mt-8 flex flex-wrap gap-4"><ButtonLink to="/">The workshop</ButtonLink><ButtonLink to="/resources" variant="outline">Practical guides</ButtonLink><ButtonLink to="/contact" variant="outline">Contact</ButtonLink></div></Section>}
