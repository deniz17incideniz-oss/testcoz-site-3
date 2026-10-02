import fs from 'node:fs';
import {load} from 'cheerio';
const base=process.argv[2];if(!base)throw new Error('URL required');
const rows=[];
const get=async route=>{const r=await fetch(new URL(route,base),{redirect:'manual',signal:AbortSignal.timeout(20000)});const text=await r.text();return {status:r.status,text};};
const sitemap=await get('/sitemap.xml');
const urls=[...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
for(let i=0;i<urls.length;i+=6)await Promise.all(urls.slice(i,i+6).map(async route=>{
 const r=await get(route),$=load(r.text);const canonical=$('link[rel="canonical"]').attr('href');
 rows.push({route,status:r.status,canonical,robots:$('meta[name="robots"]').attr('content'),ok:r.status===200&&canonical===`https://testcoz.pro${route}`&&!/noindex/.test($('meta[name="robots"]').attr('content')||'')});
}));
const resources=[];
for(const route of ['/robots.txt','/ads.txt','/giris.html','/kayit.html','/panel.html','/hakkimizda.html','/iletisim.html','/gizlilik-politikasi.html','/kullanim-sartlari.html','/icerik-yaklasimimiz.html','/api/session','/api/student-weaknesses','/qa-deliberately-missing-page','/tests/4-sinif-matematik-tartma-zor-test-2.html']){
 const r=await get(route);resources.push({route,status:r.status,...(route==='/ads.txt'?{publisherCorrect:r.text.trim()==='google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0'}:{})});
}
const auth=[];
for(const [route,body] of [['/api/register',{}],['/api/login',{email:'qa-invalid-login@example.invalid',password:'Wrong-password-for-validation'}]]){
 const r=await fetch(new URL(route,base),{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify(body)});auth.push({route,status:r.status});
}
const report={base,sitemapCount:urls.length,sitemapFailures:rows.filter(r=>!r.ok),resources,auth,rows};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync(`outputs/remote-${new URL(base).hostname}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,rows:undefined}));
