import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 if(pathname.startsWith('/api/')){res.writeHead(401,{'Content-Type':'application/json'}).end(JSON.stringify({message:'Local static preview: backend unavailable.'}));return;}
 const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!target.startsWith(root+path.sep)||pathname.includes('/.')){res.writeHead(403).end();return;}
 let file=target,status=200;if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){file=path.join(root,'404.html');status=404;}
 res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.PREVIEW_PORT||4173),'127.0.0.1',()=>console.log('Preview ready'));
