import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import path from 'node:path';
const read=p=>readFile(p,'utf8');
const manifest=JSON.parse(await read('dist/search-manifest.json'));
const publicRoutes=manifest.routes.filter(r=>r.index);
const sitemap=await read('dist/sitemap.xml');
const robots=await read('dist/robots.txt');
function validRobots(text){assert.match(text,/^User-agent: \*/m);assert.match(text,/^Sitemap: https:\/\/growthcred.co.za\/sitemap.xml$/m);assert.doesNotMatch(text,/<html|<!doctype/i);}
validRobots(robots);assert.throws(()=>validRobots('<html><body>Homepage</body></html>'));
function validPage(html,route){
 assert.equal((html.match(/<title>/g)||[]).length,1,route.path+' title count');
 assert.ok(html.includes(route.title.replaceAll('&','&amp;')),route.path+' title');
 assert.match(html,/<meta name="description" content="[^"]+"/);
 assert.ok(html.includes(`href="https://growthcred.co.za${route.canonical??route.path}"`),route.path+' canonical');
 assert.match(html,/<meta property="og:image" content="https:\/\/growthcred.co.za\/images\/search-share.png"/);
 assert.match(html,/<meta name="twitter:card" content="summary_large_image"/);
 const json=html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);assert.ok(json,route.path+' schema');
 const schema=JSON.parse(json[1]);assert.equal(schema['@context'],'https://schema.org');assert.ok(schema['@graph'].length>=4);
 for(const item of schema['@graph']) assert.ok(!['AggregateRating','Review','Event'].includes(item['@type']),'No unverified event or review markup');
 if(route.prerendered){
   assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,route.path+' H1 count');
   assert.ok(html.includes(`data-prerendered="${route.path}"`));
   assert.doesNotMatch(html,/<!--\$!-->|<template[^>]*data-msg=/,'SSR must resolve Suspense without recovery errors');
 }
 if(route.index){assert.match(html,/content="index, follow, max-image-preview:large"/);assert.ok(html.length>5000);}
 else assert.match(html,/content="noindex, follow"/);
}
let checkedLinks=0;
const known=new Set([...manifest.routes.map(r=>r.path),...Object.keys(manifest.aliases)]);
for(const route of manifest.routes){
 const html=await read('dist/'+route.file);validPage(html,route);
 if(route.index){assert.ok(sitemap.includes(`<loc>https://growthcred.co.za${route.path}</loc>`));assert.doesNotMatch(html,/9 September 2026|before Wednesday|\[TO COME:/);}
 else assert.ok(!sitemap.includes(`<loc>https://growthcred.co.za${route.path}</loc>`));
 for(const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
   const dest=match[1];if(known.has(dest)){checkedLinks++;continue;}
   await access(path.join('dist',dest));checkedLinks++;
 }
}
const home=await read('dist/index.html');
assert.throws(()=>validPage(home.replace(/<h1[\s\S]*?<\/h1>/,''),manifest.routes[0]));
// The homepage now sells the high-ticket strategy call, not the R990 workshop.
assert.match(home,/time drain/,'homepage no longer leads with the time-drain claim');
assert.match(home,/href="\/call"/,'homepage has no strategy-call CTA');
assert.doesNotMatch(home,/R990/,'homepage must not price the workshop that moved to /workshop');
assert.doesNotMatch(home,/<iframe/,'Homepage player must be click-to-load');
assert.doesNotMatch(home,/fonts\.googleapis\.com/,'Fonts are served locally');
// The R990 workshop funnel moved to /workshop intact, and must keep its terms.
const workshop=await read('dist/workshop.html');
assert.match(workshop,/One day · Online|One-day online/);assert.match(workshop,/R990/);assert.match(workshop,/Confirmed on registration/);
assert.doesNotMatch(workshop,/<iframe/,'Workshop player must be click-to-load');
assert.equal((sitemap.match(/<loc>/g)||[]).length,publicRoutes.length);
for(const privatePath of ['/checkout','/upsell','/downsell','/build','/thank-you','/brain','/call'])assert.equal(manifest.routes.find(r=>r.path===privatePath)?.index,false);
const rules=await read('dist/.htaccess');assert.match(rules,/ErrorDocument 404 \/404\.html/);assert.match(rules,/RewriteCond %\{DOCUMENT_ROOT\}\/\$1\.html -f/);assert.doesNotMatch(rules,/RewriteRule \. \/index\.html/);
assert.match(rules,/\.well-known/);await access('dist/.well-known/apple-developer-merchantid-domain-association');
const imageManifest=JSON.parse(await read('src/content/imageManifest.json'));
for(const key of ['the-drain','the-outcome'])for(const v of imageManifest[key]){assert.ok(v.bytes<160000);await access('dist'+v.src);}
console.log(`SEO verification passed: ${manifest.routes.length} routes, ${publicRoutes.length} sitemap URLs, ${checkedLinks} internal references; negative controls passed.`);
