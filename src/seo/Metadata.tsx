import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, routeMeta, structuredData } from "./routes";
import { pageView } from "../lib/searchAnalytics";
/** Initial tags are generated at build time. Keep them accurate on client navigation. */
export function Metadata() {
  const {pathname}=useLocation();
  useEffect(()=>{
    const meta=routeMeta(pathname);
    document.title=meta.title;
    const set=(selector:string,tag:string,attrs:Record<string,string>)=>{
      let el=document.head.querySelector(selector);
      if(!el){el=document.createElement(tag);document.head.appendChild(el);}
      for(const [key,value] of Object.entries(attrs)) el.setAttribute(key,value);
    };
    set('meta[name="description"]','meta',{name:'description',content:meta.description});
    set('meta[name="robots"]','meta',{name:'robots',content:meta.index?'index, follow, max-image-preview:large':'noindex, follow'});
    set('link[rel="canonical"]','link',{rel:'canonical',href:SITE+(meta.canonical??meta.path)});
    for(const [property,content] of Object.entries({'og:title':meta.title,'og:description':meta.description,'og:url':SITE+(meta.canonical??meta.path),'og:image':`${SITE}/images/search-share.png`,'og:type':meta.path.startsWith('/guides/')?'article':'website'})) set(`meta[property="${property}"]`,'meta',{property,content});
    for(const [name,content] of Object.entries({'twitter:card':'summary_large_image','twitter:title':meta.title,'twitter:description':meta.description,'twitter:image':`${SITE}/images/search-share.png`})) set(`meta[name="${name}"]`,'meta',{name,content});
    let json=document.getElementById('site-schema');
    if(!json){json=document.createElement('script');json.id='site-schema';json.setAttribute('type','application/ld+json');document.head.appendChild(json);}
    json.textContent=JSON.stringify(structuredData(meta));
    pageView(meta.title.startsWith("Page Not Found") ? "/404" : meta.path,meta.title);
  },[pathname]);
  return null;
}
