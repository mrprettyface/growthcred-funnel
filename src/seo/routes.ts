import { SEARCH_PAGES, REVIEWED } from "../content/searchPages";
import { FAQ as HOME_FAQ, FOUNDER } from "../lib/home";
import { FAQ as CORPORATE_FAQ, CORPORATE_PATH, CORPORATE_SERVICE } from "../lib/corporateSeo";
import { PRIVATE_AI_FAQ, PRIVATE_AI_PATH, PRIVATE_AI_SERVICE } from "../lib/privateAiSeo";
import { WEBINAR, hasFutureSession } from "../lib/webinar";
import { WORKSHOP_EVENT, seatsLeft } from "../lib/workshopEvent";
import { WORKSHOP } from "../lib/offers";
export const SITE = "https://growthcred.co.za";
export type RouteMeta = {path:string; title:string; description:string; index:boolean; canonical?:string; modified?:string};
export const ROUTES: RouteMeta[] = [
  {path:"/",title:"Private AI Implementation in Johannesburg & South Africa | GrowthCred",description:"Let us help you own your intelligence. Your own AI on equipment we deploy, built around your business. No per-seat subscriptions. Apply today.",index:true,modified:REVIEWED},
  {path:PRIVATE_AI_PATH,title:"Private AI South Africa: Own Your Intelligence | GrowthCred",description:"Your own AI, on your own equipment, set up around your business. Why firms are moving AI in-house, what owning costs, and when it's the wrong call.",index:true,modified:"2026-09-29"},
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
export type EventSession = {name:string; description:string; path:string; startUtc:string; endUtc:string; online:boolean; venue?:string; priceCents:number; soldOut?:boolean};
const isoUtc=(s:string)=>s.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
/** Event markup only for a session with a real date still ahead. An undated or
 past session gets none: Google requires a start date, and a stale one misleads. */
export function eventNode(s:EventSession|null, now=Date.now()):Record<string,unknown>|null {
  if(!s||!hasFutureSession(s.startUtc,now))return null;
  const url=SITE+s.path;
  return {"@type":"Event","@id":`${url}#event`,name:s.name,description:s.description,url,startDate:isoUtc(s.startUtc),...(s.endUtc?{endDate:isoUtc(s.endUtc)}:{}),eventStatus:"https://schema.org/EventScheduled",
    eventAttendanceMode:s.online?"https://schema.org/OnlineEventAttendanceMode":"https://schema.org/OfflineEventAttendanceMode",
    location:s.online?{"@type":"VirtualLocation",url}:{"@type":"Place",name:s.venue,address:{"@type":"PostalAddress",streetAddress:s.venue,addressCountry:"ZA"}},
    image:`${SITE}/images/search-share.png`,organizer:{"@id":`${SITE}/#organization`},performer:{"@id":`${SITE}/about#phila`},
    ...(s.priceCents===0?{isAccessibleForFree:true}:{}),
    offers:{"@type":"Offer",url,price:(s.priceCents/100).toFixed(2),priceCurrency:"ZAR",availability:s.soldOut?"https://schema.org/SoldOut":"https://schema.org/InStock",validFrom:new Date(now).toISOString().slice(0,10)}};
}
/** The two sessions the site sells, from the same files the pages read. */
export function eventSession(path:string):EventSession|null {
  if(path==="/webinar")return {name:`GrowthCred live class: ${WEBINAR.title}`,description:routeMeta(path).description,path,startUtc:WEBINAR.startUtc,endUtc:WEBINAR.endUtc,online:true,priceCents:0};
  if(path==="/workshop"&&WORKSHOP_EVENT&&WORKSHOP.amountCents!==null)return {name:`GrowthCred workshop: ${WORKSHOP.name}`,description:routeMeta(path).description,path,startUtc:WORKSHOP_EVENT.startUtc,endUtc:WORKSHOP_EVENT.endUtc,online:WORKSHOP_EVENT.online,venue:WORKSHOP_EVENT.venue,priceCents:WORKSHOP.amountCents,soldOut:seatsLeft()===0};
  return null;
}
export function structuredData(meta:RouteMeta) {
  /* Every fact here is also visible on the site: the legal name and registration
   (footer), Rosebank, Johannesburg (footer, about), and the markets with their
   own pages. No street address or opening hours are claimed, because none are
   published. */
  const organization={"@type":["Organization","ProfessionalService"],"@id":`${SITE}/#organization`,name:"GrowthCred",alternateName:["GrowthCred SA","GrowthCred (Pty) Ltd"],legalName:"GrowthCred (Pty) Ltd",slogan:"Own your intelligence.",url:SITE,email:"info@growthcred.co.za",telephone:"+27662830289",contactPoint:[{"@type":"ContactPoint",contactType:"sales",telephone:"+27662830289",email:"info@growthcred.co.za",url:"https://wa.me/27662830289",areaServed:"ZA",availableLanguage:["English"]}],identifier:{"@type":"PropertyValue",propertyID:"CIPC registration number",value:"2026/229279/07"},knowsAbout:["Private AI","On-premise AI deployment","POPIA and AI data protection","AI automation","AI proposal automation","Quote Engine","Company Brain","New Hire Trainer","AI training for businesses","Corporate AI training","AI for law firms","AI for financial services","Owner-led business operations"],logo:{"@type":"ImageObject",url:`${SITE}/icon-512.png`,width:512,height:512},image:`${SITE}/images/search-share.png`,description:"Founder-led AI systems, automation and training for owner-led businesses, from Rosebank, Johannesburg.",address:{"@type":"PostalAddress",addressLocality:"Rosebank, Johannesburg",addressCountry:"ZA"},areaServed:[{"@type":"Country",name:"South Africa"},{"@type":"Country",name:"United Kingdom"},{"@type":"Country",name:"United States"},{"@type":"Country",name:"Australia"},{"@type":"Continent",name:"Africa"}],founder:{"@id":`${SITE}/about#phila`},sameAs:["https://www.youtube.com/@PhilaNgwenyagrowth","https://www.linkedin.com/in/phila-ngwenya-908b1a179/"],hasOfferCatalog:{"@type":"OfferCatalog",name:"GrowthCred engagements",itemListElement:[{"@type":"Offer",itemOffered:{"@type":"Service",name:"Command Core Velocity",description:"One-day Command Core engagement for owner-led firms from R5M to R50M. Your own AI, set up around your business and its biggest admin drains.",url:`${SITE}/call`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Command Core Integration",description:"90-day private AI integration for firms from R50M to R200M, across sales, delivery and admin.",url:`${SITE}/call`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Command Core Transformation",description:"Custom, department-by-department operating model rebuild on owned AI for firms above R200M.",url:`${SITE}/call`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Corporate AI training",description:"Team training on real work, priced per employee.",url:`${SITE}/corporate-ai-training`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Private AI deployment",description:"AI deployed on equipment GrowthCred chooses and maintains, set up around the business's own documents and way of working.",url:`${SITE}/private-ai`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Quote Engine",description:"Drafts PPE and uniform quotes from the business's own price list and rules. A person still approves the price and the send.",url:`${SITE}/quote-engine`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Company Brain",description:"Answers the team from the business's own files, on equipment GrowthCred sets up, and shows the source. The business decides who can ask.",url:`${SITE}/company-brain`}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"New Hire Trainer",description:"Teaches one role from the business's own notes, scripts and calls. It stays inside the business. A person still signs off.",url:`${SITE}/new-hire-trainer`}}]}};
  const person={"@type":"Person","@id":`${SITE}/about#phila`,name:"Phila Ngwenya",jobTitle:"Founder and CEO",url:`${SITE}/about`,image:`${SITE}/images/phila-event-640.webp`,description:FOUNDER.credentials.join(" "),knowsAbout:["AI automation","AI training","Business process automation","Operations for owner-led businesses"],worksFor:{"@id":`${SITE}/#organization`},sameAs:["https://www.linkedin.com/in/phila-ngwenya-908b1a179/","https://www.youtube.com/@PhilaNgwenyagrowth"]};
  const url=SITE+(meta.canonical??meta.path);
  const page=SEARCH_PAGES.find(p=>p.path===meta.path);
  const graph:Record<string,unknown>[]=[organization,person,{"@type":"WebSite","@id":`${SITE}/#website`,url:SITE,name:"GrowthCred",publisher:{"@id":`${SITE}/#organization`},inLanguage:"en-ZA"},{"@type":page?.kind==="about"?"AboutPage":"WebPage","@id":`${url}#page`,url,name:meta.title,description:meta.description,isPartOf:{"@id":`${SITE}/#website`},inLanguage:"en-ZA"}];
  if(page?.kind==="guide"||page?.kind==="story") graph.push({"@type":"Article",headline:page.heading,description:page.description,mainEntityOfPage:{"@id":`${url}#page`},author:{"@id":`${SITE}/about#phila`},publisher:{"@id":`${SITE}/#organization`},...(page.published?{datePublished:page.published}:{}),dateModified:page.published??REVIEWED,image:page.images?.[0]?`${SITE}${page.images[0].src}`:`${SITE}/images/search-share.png`});
  if(meta.path===PRIVATE_AI_PATH) graph.push({"@type":"Service",name:"Private AI: the Command Core",serviceType:"Private AI deployment",description:PRIVATE_AI_SERVICE,provider:{"@id":`${SITE}/#organization`},areaServed:{"@type":"Country",name:"South Africa"},url});
  if(meta.path===CORPORATE_PATH) graph.push({"@type":"Service",name:"Corporate AI training",serviceType:"Corporate AI training",description:CORPORATE_SERVICE,provider:{"@id":`${SITE}/#organization`},areaServed:[{"@type":"Country",name:"South Africa"},{"@type":"Place",name:"Online"}],audience:{"@type":"BusinessAudience",name:"Organisations training their teams"},url});
  if(page?.kind==="service") graph.push({"@type":"Service",name:page.heading,description:page.intro,provider:{"@id":`${SITE}/#organization`},areaServed:{"@type":"Country",name:"South Africa"},url});
  const event=eventNode(eventSession(meta.path));
  if(event) graph.push(event);
  /* FAQPage only where the same questions are visible on the page. */
  const faq=meta.path==="/"?HOME_FAQ:meta.path===CORPORATE_PATH?CORPORATE_FAQ:meta.path===PRIVATE_AI_PATH?PRIVATE_AI_FAQ:page?.faq;
  if(faq?.length) graph.push({"@type":"FAQPage","@id":`${url}#faq`,mainEntity:faq.map(f=>({"@type":"Question",name:f.q,acceptedAnswer:{"@type":"Answer",text:f.a}}))});
  if(meta.path!=="/") graph.push({"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:SITE+"/"},{"@type":"ListItem",position:2,name:page?.heading??(meta.path===CORPORATE_PATH?"Corporate AI training":meta.path===PRIVATE_AI_PATH?"Private AI":meta.title),item:url}]});
  return {"@context":"https://schema.org","@graph":graph};
}
