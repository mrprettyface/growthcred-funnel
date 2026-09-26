import { SEARCH_PAGES, REVIEWED } from "../content/searchPages";
import { FAQ as HOME_FAQ, FOUNDER } from "../lib/home";
import { FAQ as CORPORATE_FAQ, CORPORATE_PATH, CORPORATE_SERVICE } from "../lib/corporateSeo";
export const SITE = "https://growthcred.co.za";
export type RouteMeta = {path:string; title:string; description:string; index:boolean; canonical?:string; modified?:string};
export const ROUTES: RouteMeta[] = [
  {path:"/",title:"The Command Core: Founder-Grade Operations | GrowthCred SA",description:"Win back the 20–40% of your time lost to admin. GrowthCred deploys founder-grade AI operations across every department of owner-led businesses. Apply today.",index:true,modified:REVIEWED},
  {path:CORPORATE_PATH,title:"Corporate AI Training for Teams in South Africa | GrowthCred",description:"Corporate AI training that gets every employee producing documents and reports 3× faster. Live workshops, role playbooks, measured ROI, priced per head.",index:true,modified:"2026-09-25"},
  {path:"/workshop",title:"Online AI Workshop for Business Owners | GrowthCred SA",description:"Build practical AI workflows in GrowthCred’s one-day online workshop for South African business owners. R990. Session details confirmed on registration.",index:true,modified:REVIEWED},
  ...SEARCH_PAGES.map(p=>({path:p.path,title:p.title,description:p.description,index:!p.draft,modified:p.published??REVIEWED})),
  {path:"/contact",title:"Contact GrowthCred | AI Training & Automation, Johannesburg",description:"Contact GrowthCred in Johannesburg about online AI workshops, team training requests or business automation. Email and WhatsApp contact options.",index:true,modified:REVIEWED},
  {path:"/webinar",title:"Free Online AI Class for Business Owners | GrowthCred",description:"Register for GrowthCred’s next free online AI class. Learn how business context improves AI workflows. Session details confirmed on registration.",index:true,modified:REVIEWED},
  {path:"/class",title:"Free Online AI Class | GrowthCred",description:"Register for our next online AI class.",index:false,canonical:"/webinar"},
  {path:"/playbook",title:"Free AI Business Resources and Guides | GrowthCred SA",description:"Read GrowthCred’s free practical AI guides for business owners and use the Business Brain builder. Downloadable packs are being prepared.",index:true,modified:REVIEWED},
  {path:"/ai-implementation-guide",title:"The AI Implementation Guide | GrowthCred",description:"Seven steps to put AI to work in your business without changing the way you work or the platforms you work in.",index:false},
  {path:"/brain",title:"Free AI Business Brain Builder | GrowthCred",description:"Build a reusable business context document for AI. Answer practical questions, then copy or download your document.",index:false},
  {path:"/call",title:"Discuss Your AI Automation Project | GrowthCred",description:"Tell GrowthCred about your business workflow and discuss a scoped implementation engagement.",index:false},
  ...["checkout","upsell","downsell","build","thank-you"].map(p=>({path:`/${p}`,title:`${({checkout:"Workshop Registration",upsell:"Your Next Step",downsell:"Your Options",build:"Implementation Request","thank-you":"Order Confirmation"} as Record<string,string>)[p]} | GrowthCred`,description:"Manage your GrowthCred registration and next steps.",index:false})),
  ...["terms","privacy","refunds"].map(p=>({path:`/${p}`,title:`${p[0].toUpperCase()+p.slice(1)} | GrowthCred`,description:`Read GrowthCred’s ${p} policy and contact us with questions.`,index:false})),
];
export const ALIASES: Record<string,string> = {"/agency":"/ai-automation-south-africa", "/webinar-plain":"/webinar", "/class":"/webinar"};
export const normalizePath = (p:string) => p.replace(/\/+$/, "") || "/";
export function routeMeta(path:string): RouteMeta {
  const clean=normalizePath(path);
  return ROUTES.find(r=>r.path===clean) ?? {path:clean,title:"Page Not Found | GrowthCred",description:"This page could not be found. Explore GrowthCred’s AI workshops and resources.",index:false};
}
export function structuredData(meta:RouteMeta) {
  /* Every fact here is also visible on the site: the legal name and registration
   (footer), Rosebank, Johannesburg (footer, about), and the markets with their
   own pages. No street address or opening hours are claimed, because none are
   published. */
  const organization={"@type":["Organization","ProfessionalService"],"@id":`${SITE}/#organization`,name:"GrowthCred",legalName:"GrowthCred (Pty) Ltd",url:SITE,email:"info@growthcred.co.za",logo:{"@type":"ImageObject",url:`${SITE}/icon-512.png`,width:512,height:512},image:`${SITE}/images/search-share.png`,description:"Founder-led AI systems, automation and training for owner-led businesses, from Rosebank, Johannesburg.",address:{"@type":"PostalAddress",addressLocality:"Rosebank, Johannesburg",addressCountry:"ZA"},areaServed:[{"@type":"Country",name:"South Africa"},{"@type":"Country",name:"United Kingdom"},{"@type":"Country",name:"United States"},{"@type":"Country",name:"Australia"},{"@type":"Continent",name:"Africa"}],founder:{"@id":`${SITE}/about#phila`},sameAs:["https://www.youtube.com/@PhilaNgwenyagrowth","https://www.linkedin.com/in/phila-ngwenya-908b1a179/"]};
  const person={"@type":"Person","@id":`${SITE}/about#phila`,name:"Phila Ngwenya",jobTitle:"Founder and CEO",url:`${SITE}/about`,image:`${SITE}/images/phila-event-640.webp`,description:FOUNDER.credentials.join(" "),knowsAbout:["AI automation","AI training","Business process automation","Operations for owner-led businesses"],worksFor:{"@id":`${SITE}/#organization`},sameAs:["https://www.linkedin.com/in/phila-ngwenya-908b1a179/","https://www.youtube.com/@PhilaNgwenyagrowth"]};
  const url=SITE+(meta.canonical??meta.path);
  const page=SEARCH_PAGES.find(p=>p.path===meta.path);
  const graph:Record<string,unknown>[]=[organization,person,{"@type":"WebSite","@id":`${SITE}/#website`,url:SITE,name:"GrowthCred",publisher:{"@id":`${SITE}/#organization`},inLanguage:"en-ZA"},{"@type":page?.kind==="about"?"AboutPage":"WebPage","@id":`${url}#page`,url,name:meta.title,description:meta.description,isPartOf:{"@id":`${SITE}/#website`},inLanguage:"en-ZA"}];
  if(page?.kind==="guide"||page?.kind==="story") graph.push({"@type":"Article",headline:page.heading,description:page.description,mainEntityOfPage:{"@id":`${url}#page`},author:{"@id":`${SITE}/about#phila`},publisher:{"@id":`${SITE}/#organization`},...(page.published?{datePublished:page.published}:{}),dateModified:page.published??REVIEWED,image:page.images?.[0]?`${SITE}${page.images[0].src}`:`${SITE}/images/search-share.png`});
  if(meta.path===CORPORATE_PATH) graph.push({"@type":"Service",name:"Corporate AI training",serviceType:"Corporate AI training",description:CORPORATE_SERVICE,provider:{"@id":`${SITE}/#organization`},areaServed:[{"@type":"Country",name:"South Africa"},{"@type":"Place",name:"Online"}],audience:{"@type":"BusinessAudience",name:"Organisations training their teams"},url});
  if(page?.kind==="service") graph.push({"@type":"Service",name:page.heading,description:page.intro,provider:{"@id":`${SITE}/#organization`},areaServed:{"@type":"Country",name:"South Africa"},url});
  /* FAQPage only where the same questions are visible on the page. */
  const faq=meta.path==="/"?HOME_FAQ:meta.path===CORPORATE_PATH?CORPORATE_FAQ:page?.faq;
  if(faq?.length) graph.push({"@type":"FAQPage","@id":`${url}#faq`,mainEntity:faq.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
  if(meta.path!=="/") graph.push({"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:SITE+"/"},{"@type":"ListItem",position:2,name:page?.heading??(meta.path===CORPORATE_PATH?"Corporate AI training":meta.title),item:url}]});
  return {"@context":"https://schema.org","@graph":graph};
}
