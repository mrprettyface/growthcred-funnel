import { SEARCH_PAGES, REVIEWED } from "../content/searchPages";
export const SITE = "https://growthcred.co.za";
export type RouteMeta = {path:string; title:string; description:string; index:boolean; canonical?:string; modified?:string};
export const ROUTES: RouteMeta[] = [
  {path:"/",title:"Online AI Workshop for Business Owners | GrowthCred SA",description:"Build practical AI workflows in GrowthCred’s one-day online workshop for South African business owners. R990. Session details confirmed on registration.",index:true,modified:REVIEWED},
  ...SEARCH_PAGES.map(p=>({path:p.path,title:p.title,description:p.description,index:true,modified:REVIEWED})),
  {path:"/contact",title:"Contact GrowthCred | AI Training & Automation",description:"Contact GrowthCred in Johannesburg about online AI workshops, team training requests or business automation. Email and WhatsApp contact options.",index:true,modified:REVIEWED},
  {path:"/webinar",title:"Free Online AI Class for Business Owners | GrowthCred",description:"Register for GrowthCred’s next free online AI class. Learn how business context improves AI workflows. Session details confirmed on registration.",index:true,modified:REVIEWED},
  {path:"/class",title:"Free Online AI Class | GrowthCred",description:"Register for our next online AI class.",index:false,canonical:"/webinar"},
  {path:"/playbook",title:"Free AI Business Resources | GrowthCred",description:"Read GrowthCred’s free practical AI guides and use the Business Brain builder. Downloadable packs are being prepared.",index:true,modified:REVIEWED},
  {path:"/brain",title:"Free AI Business Brain Builder | GrowthCred",description:"Build a reusable business context document for AI. Answer practical questions, then copy or download your document.",index:false},
  {path:"/call",title:"Discuss Your AI Automation Project | GrowthCred",description:"Tell GrowthCred about your business workflow and discuss a scoped implementation engagement.",index:false},
  ...["checkout","upsell","downsell","build","thank-you"].map(p=>({path:`/${p}`,title:`${({checkout:"Workshop Registration",upsell:"Your Next Step",downsell:"Your Options",build:"Implementation Request","thank-you":"Order Confirmation"} as Record<string,string>)[p]} | GrowthCred`,description:"Manage your GrowthCred registration and next steps.",index:false})),
  ...["terms","privacy","refunds"].map(p=>({path:`/${p}`,title:`${p[0].toUpperCase()+p.slice(1)} | GrowthCred`,description:`Read GrowthCred’s ${p} policy and contact us with questions.`,index:false})),
];
export const ALIASES: Record<string,string> = {"/workshop":"/", "/agency":"/ai-automation-south-africa", "/webinar-plain":"/webinar", "/class":"/webinar"};
export const normalizePath = (p:string) => p.replace(/\/+$/, "") || "/";
export function routeMeta(path:string): RouteMeta {
  const clean=normalizePath(path);
  return ROUTES.find(r=>r.path===clean) ?? {path:clean,title:"Page Not Found | GrowthCred",description:"This page could not be found. Explore GrowthCred’s AI workshops and resources.",index:false};
}
export function structuredData(meta:RouteMeta) {
  const organization={"@type":"Organization","@id":`${SITE}/#organization`,name:"GrowthCred",legalName:"GrowthCred (Pty) Ltd",url:SITE,email:"info@growthcred.co.za",logo:`${SITE}/images/growthcred-mark.svg`,founder:{"@id":`${SITE}/about#phila`},sameAs:["https://www.youtube.com/@PhilaNgwenyagrowth","https://www.linkedin.com/in/phila-ngwenya-908b1a179/"]};
  const person={"@type":"Person","@id":`${SITE}/about#phila`,name:"Phila Ngwenya",jobTitle:"Founder and CEO",url:`${SITE}/about`,worksFor:{"@id":`${SITE}/#organization`},sameAs:["https://www.linkedin.com/in/phila-ngwenya-908b1a179/"]};
  const url=SITE+(meta.canonical??meta.path);
  const page=SEARCH_PAGES.find(p=>p.path===meta.path);
  const graph:Record<string,unknown>[]=[organization,person,{"@type":"WebSite","@id":`${SITE}/#website`,url:SITE,name:"GrowthCred",publisher:{"@id":`${SITE}/#organization`},inLanguage:"en-ZA"},{"@type":page?.kind==="about"?"AboutPage":"WebPage","@id":`${url}#page`,url,name:meta.title,description:meta.description,isPartOf:{"@id":`${SITE}/#website`},inLanguage:"en-ZA"}];
  if(page?.kind==="guide") graph.push({"@type":"Article",headline:page.heading,description:page.description,mainEntityOfPage:{"@id":`${url}#page`},author:{"@id":`${SITE}/about#phila`},publisher:{"@id":`${SITE}/#organization`},dateModified:REVIEWED,image:`${SITE}/images/search-share.png`});
  if(page?.kind==="service") graph.push({"@type":"Service",name:page.heading,description:page.intro,provider:{"@id":`${SITE}/#organization`},areaServed:{"@type":"Country",name:"South Africa"},url});
  if(meta.path!=="/") graph.push({"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:SITE+"/"},{"@type":"ListItem",position:2,name:page?.heading??meta.title,item:url}]});
  return {"@context":"https://schema.org","@graph":graph};
}
