import { renderToPipeableStream, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { PassThrough } from "node:stream";
import App from "./App";
export { ROUTES, ALIASES, SITE, structuredData, eventNode, eventSession } from "./seo/routes";
export { SEARCH_PAGES } from "./content/searchPages";
export { hasFutureSession, calendarUrl, outlookCalendarUrl, msUntilStart, sessionHasPassed } from "./lib/webinar";
export { chatTrapCost } from "./lib/jcciWebinar";
export { cleanPage, safeEventPayload, validGaId } from "./lib/searchAnalytics";
export async function render(path:string):Promise<string> {
  await new Promise((resolve,reject)=>{
    const output=new PassThrough();let html='';let failed=false;let piped=false;
    output.on('data',chunk=>{html+=chunk.toString();});output.on('end',()=>{clearTimeout(timeout);if(!failed)resolve(html);});output.on('error',reject);
    const stream=renderToPipeableStream(<StaticRouter location={path}><App /></StaticRouter>,{
      /* Guard: when a lazy chunk is already warm (e.g. /shop/gc-mark-tee then
         /shop/dream-tee share ShopProduct), onAllReady can fire in a way that
         would call pipe twice. React allows only one pipe per stream. */
      onAllReady(){
        if(piped)return;
        piped=true;
        stream.pipe(output);
      },
      onError(error){failed=true;clearTimeout(timeout);reject(error);}
    });
    const timeout=setTimeout(()=>{stream.abort();reject(new Error(`Prerender timed out: ${path}`));},20000);
  });
  // All lazy modules have resolved. A second synchronous pass produces complete
  // visible HTML rather than React streaming placeholders/reveal scripts.
  const html=renderToString(<StaticRouter location={path}><App /></StaticRouter>);
  if(html.includes("<!--$!-->") || html.includes("<!--$?-->"))throw new Error(`Unresolved SSR boundary: ${path}`);
  return html;
}
