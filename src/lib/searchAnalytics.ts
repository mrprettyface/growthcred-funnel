/** Optional GA4. No provider request without an ID and explicit analytics consent. */
export const GA_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "";
export const validGaId = (id:string) => /^G-[A-Z0-9]+$/.test(id);
const CONSENT_KEY="gc_analytics_consent";
let loaded=false;
let lastPage="";
let currentPage={path:"/",title:"GrowthCred"};
const sentPayments=new Set<string>();
declare global { interface Window { gtag?: (...args:unknown[])=>void } }
export function analyticsConsent():boolean {
  try{return localStorage.getItem(CONSENT_KEY)==='granted';}catch{return false;}
}
export function setAnalyticsConsent(granted:boolean){
  try{localStorage.setItem(CONSENT_KEY,granted?'granted':'denied');}catch{/* memory is enough for this visit */}
  if(granted){window.gtag?.('consent','update',{analytics_storage:'granted',ad_storage:'denied'});loadAnalytics();pageView(currentPage.path,currentPage.title,true);}
  else {window.gtag?.('consent','update',{analytics_storage:'denied',ad_storage:'denied'});window[`ga-disable-${GA_ID}` as keyof Window]=true as never;}
}
function loadAnalytics(){
  if(!validGaId(GA_ID))return;
  window[`ga-disable-${GA_ID}` as keyof Window]=false as never;
  window.dataLayer=window.dataLayer??[];
  window.gtag=window.gtag??function(){window.dataLayer!.push(arguments as unknown as Record<string,unknown>);};
  if(loaded)return;
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  loaded=true;
  window.gtag('js',new Date());
  window.gtag('config',GA_ID,{send_page_view:false,page_location:cleanPage(currentPage.path),page_referrer:'',allow_google_signals:false,allow_ad_personalization_signals:false});
  const script=document.createElement('script');script.async=true;script.src=`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;document.head.appendChild(script);
}
/** Strip all query/hash data and use only registered paths; never send form text. */
export function cleanPage(path:string){return 'https://growthcred.co.za'+(path.split(/[?#]/)[0]||'/');}
export function safeEventPayload(payload:Record<string,unknown>){
  const safe:Record<string,string|number|boolean>={};
  for(const key of ['bump','configured','variant','method','currency','value','transaction_id','webinar']){
    const value=payload[key];
    if(typeof value==='boolean'||(typeof value==='number'&&Number.isFinite(value)))safe[key]=value;
    else if(typeof value==='string'&&value.length<=100&&/^[A-Za-z0-9 _.-]+$/.test(value))safe[key]=value;
  }
  return safe;
}
export function pageView(path:string,title:string,force=false){
  currentPage={path,title};
  if(typeof window==='undefined'||!analyticsConsent()||!validGaId(GA_ID))return;
  loadAnalytics();
  if(!force&&path===lastPage)return;
  lastPage=path;
  let referrer='';try{referrer=new URL(document.referrer).origin;}catch{/* direct */}
  window.gtag?.('event','page_view',{page_location:cleanPage(path),page_title:title,page_referrer:referrer});
}
export function analyticsEvent(event:string,payload:Record<string,unknown>={}){
  if(typeof window==='undefined'||!analyticsConsent()||!validGaId(GA_ID))return;
  loadAnalytics();
  const safe:Record<string,string|number|boolean>={...safeEventPayload(payload),page_location:cleanPage(currentPage.path),page_referrer:""};
  // Only a confirmed payment callback with a distinct transaction reference maps to purchase.
  if(event==='checkout_paid'||event==='upsell_paid'||event==='downsell_paid'){
    const id=safe.transaction_id;
    if(typeof id!=='string'||typeof safe.value!=='number')return;
    let previouslySent=false;try{previouslySent=sessionStorage.getItem(`gc_ga_paid_${id}`)==='1';}catch{/* memory fallback */}
    if(sentPayments.has(id)||previouslySent)return;
    sentPayments.add(id);try{sessionStorage.setItem(`gc_ga_paid_${id}`,'1');}catch{/* memory fallback */}
    window.gtag?.('event','purchase',{...safe,currency:'ZAR'});return;
  }
  if(['webinar_register','class_optin','contact_submit','call_apply','build_apply'].includes(event)){
    if(safe.configured===false)return;
    window.gtag?.('event','generate_lead',{method:event,...safe});
  }
  window.gtag?.('event',`gc_${event}`,safe);
}
