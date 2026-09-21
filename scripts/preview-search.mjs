/** Static preview matching the generated routing policy, including real 404s. */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const manifest=JSON.parse(await readFile(path.join(root,'search-manifest.json'),'utf8'));
const routes=new Map(manifest.routes.map(r=>[r.path,r]));
const types={'.html':'text/html; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);
  const alias=manifest.aliases[pathname];
  if(alias){res.writeHead(301,{Location:alias+url.search});res.end();return;}
  if(pathname!=='/'&&pathname.endsWith('/')){res.writeHead(301,{Location:pathname.replace(/\/+$/,'')+url.search});res.end();return;}
  if(pathname.endsWith('.html')){const next=pathname==='/index.html'?'/':pathname.slice(0,-5);res.writeHead(301,{Location:next+url.search});res.end();return;}
  const route=routes.get(pathname);
  let file=path.resolve(root,route?.file??'.'+pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(400);res.end();return;}
  let status=200;try{if(!(await stat(file)).isFile())throw Error();}catch{file=path.join(root,'404.html');status=404;}
  const headers={'Content-Type':types[path.extname(file)]??'application/octet-stream','Cache-Control':'no-store'};
  if(route&&!route.index||status===404)headers['X-Robots-Tag']='noindex, follow';
  res.writeHead(status,headers);res.end(await readFile(file));
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.listen(Number(process.env.PORT??4173),'127.0.0.1',()=>console.log('Search preview http://127.0.0.1:'+(process.env.PORT??4173)));
