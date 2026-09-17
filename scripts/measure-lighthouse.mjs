import fs from 'node:fs';
import {chromium} from '@playwright/test';
import lighthouse from 'lighthouse';
process.env.PREVIEW_PORT='4174';
await import('./preview-server.mjs');
const routes=['/','/ders/1-sinif-matematik.html','/tests/1-sinif-matematik-sayilar-ve-nicelikler-kolay-test-1.html','/test.html?sinif=1&ders=matematik&konu=sayilar-ve-nicelikler&zorluk=kolay&test=1'];
const summaries=[];
try{
 const browser=await chromium.launch({headless:true,args:['--remote-debugging-port=9225']});
 try{for(const route of routes){
 const {lhr}=await lighthouse('http://127.0.0.1:4174'+route,{port:9225,output:'json',onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'});
 const scores=Object.fromEntries(Object.entries(lhr.categories).map(([key,c])=>[key,c.score===null?null:Math.round(c.score*100)]));
 summaries.push({route,scores,warnings:lhr.runWarnings,failedAudits:Object.values(lhr.audits).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score}))});
 fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/lighthouse-'+(summaries.length)+'.json',JSON.stringify(lhr));console.log(JSON.stringify({route,scores}));
 }}finally{await browser.close();}
 fs.writeFileSync('outputs/lighthouse-summary.json',JSON.stringify(summaries,null,2));
 fs.mkdirSync('docs/lighthouse',{recursive:true});
 fs.writeFileSync('docs/lighthouse/README.md','# Lighthouse\n\nYerel mobil ölçüm; production ölçümü değildir. AdSense yükleyicisi engellenmedi. Ağ koşulları sonuçları etkiler.\n\n| Sayfa | Performance | Accessibility | Best Practices | SEO |\n|---|---:|---:|---:|---:|\n'+summaries.map(s=>'| '+s.route+' | '+Object.values(s.scores).join(' | ')+' |').join('\n')+'\n\nTam kanıt: outputs/lighthouse-summary.json. npm run lighthouse ile yeniden üretilebilir.\n');
 process.exit(0);
}catch(error){console.error(error);process.exit(1);}
