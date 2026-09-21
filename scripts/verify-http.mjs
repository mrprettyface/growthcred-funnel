import assert from 'node:assert/strict';
import http from 'node:http';
const base=process.env.SEARCH_BASE_URL||'http://127.0.0.1:4174';
for(const [route,status,type] of [['/',200,'text/html'],['/ai-training-south-africa',200,'text/html'],['/resources',200,'text/html'],['/contact',200,'text/html'],['/robots.txt',200,'text/plain'],['/sitemap.xml',200,'xml'],['/checkout',200,'text/html'],['/missing-search-check-page',404,'text/html'],['/guides/missing-search-check-page',404,'text/html']]){
 const response=await fetch(base+route,{redirect:'manual'});assert.equal(response.status,status,route);assert.ok(response.headers.get('content-type')?.includes(type),route+' MIME');
 if(route==='/checkout')assert.match(response.headers.get('x-robots-tag')||'',/noindex/);
 console.log(`${route}: ${status}`);
}
for(const [route,target] of [['/agency?source=test','/ai-automation-south-africa?source=test'],['/workshop','/'],['/class','/webinar'],['/webinar-plain','/webinar'],['/resources/','/resources'],['/resources.html','/resources'],['/index.html','/']]){
 const response=await fetch(base+route,{redirect:'manual'});assert.equal(response.status,301,route);const dest=new URL(response.headers.get('location'),base);assert.equal(dest.pathname+dest.search,target,route+' target');
}
const host=base.startsWith('https://')?new URL(base).hostname:'growthcred.co.za';
for(const name of [host,'www.'+host]){
 const url=base.startsWith('https://')?`http://${name}/resources?source=test`:base+'/resources?source=test';
 const response=await new Promise((resolve,reject)=>{http.get(url,{headers:{host:name}},r=>{r.resume();resolve({status:r.statusCode,headers:{get:key=>r.headers[key]}});}).on('error',reject);});
 assert.equal(response.status,301,name);assert.equal(response.headers.get('location'),'https://growthcred.co.za/resources?source=test');
}
console.log('HTTP search verification passed');
