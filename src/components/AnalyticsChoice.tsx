import { useState } from "react";
import { GA_ID, validGaId, analyticsConsent, setAnalyticsConsent } from "../lib/searchAnalytics";
export function AnalyticsChoice(){
  const [open,setOpen]=useState(false);
  if(!validGaId(GA_ID))return null;
  return <div className="mt-5"><button className="min-h-11 text-sm underline" onClick={()=>setOpen(!open)}>Analytics preferences</button>{open&&<div className="mt-3 max-w-lg rounded-xl border border-midnight/15 bg-white p-5"><p className="text-sm">Optional Google Analytics helps us understand visits and completed registrations. It stays off until you choose to allow it. Current preference: {analyticsConsent()?'allowed':'off'}.</p><div className="mt-4 flex gap-4"><button className="min-h-11 rounded-full bg-midnight px-5 text-sm text-cream" onClick={()=>{setAnalyticsConsent(true);setOpen(false);}}>Allow analytics</button><button className="min-h-11 px-3 text-sm underline" onClick={()=>{setAnalyticsConsent(false);setOpen(false);}}>Keep analytics off</button></div></div>}</div>;
}
