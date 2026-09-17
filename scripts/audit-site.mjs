import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
const root = process.cwd();
const skip = new Set(['.git', 'node_modules', 'automation', 'work', 'outputs']);
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? (skip.has(e.name) ? [] : walk(path.join(dir,e.name))) : [path.join(dir,e.name)]);
const files = walk(root), pages = files.filter(f=>f.endsWith('.html'));
const errors=[], warnings=[], titles=new Map(), descriptions=new Map(), canonicals=new Map(), paragraphs=new Map();
const rel=f=>path.relative(root,f).replaceAll('\\','/');
const check=(file,reference)=>{
  if (!reference || /^(#|mailto:|tel:|data:|javascript:)/i.test(reference)) return;
  let url; try { url=new URL(reference, 'https://testcoz.pro/'+rel(file)); } catch {errors.push(`${rel(file)}: invalid URL ${reference}`);return;}
  if (!['testcoz.pro','www.testcoz.pro'].includes(url.hostname)) return;
  if (url.pathname.startsWith('/api/')) return;
  const dest=path.join(root,decodeURIComponent(url.pathname));
  if(!fs.existsSync(dest) || (fs.statSync(dest).isDirectory()&&!fs.existsSync(path.join(dest,'index.html')))) errors.push(`${rel(file)}: missing ${reference}`);
};
const add=(map,key,file)=>{if(key)map.set(key,[...(map.get(key)||[]),rel(file)]);};
const indexed=[];
for(const file of pages){
 const $=load(fs.readFileSync(file,'utf8'));
 $('[href],[src]').each((_,e)=>{check(file,$(e).attr('href'));check(file,$(e).attr('src'));});
 if(/noindex/i.test($('meta[name="robots"]').attr('content')||''))continue;
 indexed.push(file);
 for(const [name,value] of [['title',$('title').text().trim()],['description',$('meta[name="description"]').attr('content')],['canonical',$('link[rel="canonical"]').attr('href')]])if(!value)errors.push(`${rel(file)}: missing ${name}`);
 if($('h1').length!==1)errors.push(`${rel(file)}: H1 count ${$('h1').length}`);
 add(titles,$('title').text().trim(),file);add(descriptions,$('meta[name="description"]').attr('content'),file);
 const canonical=$('link[rel="canonical"]').attr('href');if(canonical){check(file,canonical);add(canonicals,canonical,file);if(!canonical.startsWith("https://testcoz.pro/") || new URL(canonical).search)errors.push(`${rel(file)}: nonproduction/query canonical`);}
 $('main p').each((_,e)=>{const t=$(e).text().trim();if(t.length>150)add(paragraphs,t,file);});
 const ad=$('script[src*="adsbygoogle.js"]');if(ad.length>1)errors.push(`${rel(file)}: duplicate AdSense script`);
 if(ad.length && !ad.attr('src').includes('ca-pub-1287455375559097'))errors.push(`${rel(file)}: publisher changed`);
}
for(const [kind,map] of [['title',titles],['description',descriptions],['canonical',canonicals]])for(const [text,items]of map)if(items.length>1)errors.push(`duplicate ${kind}: ${items.join(', ')}`);
for(const file of files.filter(f=>f.endsWith('.js')&&rel(f).startsWith('js/'))){
 const source=fs.readFileSync(file,'utf8');
 for(const m of source.matchAll(/(?:location(?:\.href)?\s*=|location\.(?:assign|replace)\()\s*["']([^"']+)["']/g))if(!m[1].includes('${'))check(path.join(root,'index.html'),m[1]);
}
const sitemap=load(fs.readFileSync('sitemap.xml','utf8'),{xml:true});const urls=new Set();
sitemap('loc').each((_,e)=>{const url=sitemap(e).text();if(urls.has(url))errors.push(`sitemap duplicate: ${url}`);urls.add(url);check(path.join(root,'index.html'),url);const target=path.join(root,new URL(url).pathname==='/'?'index.html':new URL(url).pathname);if(fs.existsSync(target)){const $=load(fs.readFileSync(target,'utf8'));if(/noindex/i.test($('meta[name="robots"]').attr('content')||''))errors.push(`sitemap noindex: ${url}`);if($('link[rel="canonical"]').attr('href')!==url)errors.push(`sitemap noncanonical: ${url}`);}});
for(const file of indexed){const $=load(fs.readFileSync(file,'utf8'));const canonical=$('link[rel="canonical"]').attr('href');if(canonical&&!urls.has(canonical))warnings.push(`outside sitemap: ${rel(file)}`);}
const repeated=[...paragraphs].filter(([,items])=>items.length>5).map(([text,items])=>({text,count:items.length})).sort((a,b)=>b.count-a.count);
const report={pages:pages.length,indexed:indexed.length,sitemap:urls.size,errors,warnings,repeatedParagraphs:repeated,largeAssets:files.filter(f=>/\.(png|jpg|svg|js|css)$/.test(f)&&fs.statSync(f).size>250000).map(f=>({file:rel(f),bytes:fs.statSync(f).size}))};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/site-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:report.pages,indexed:report.indexed,sitemap:report.sitemap,errors,warnings,repeatedParagraphs:repeated.length},null,2));
if(errors.length)process.exitCode=1;
