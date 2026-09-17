import fs from 'node:fs';
import {load} from 'cheerio';
const pages=fs.readdirSync('tests').filter(f=>f.endsWith('.html')).map(file=>{const $=load(fs.readFileSync('tests/'+file,'utf8'));const words=$('main').text().toLocaleLowerCase('tr-TR').match(/[\p{L}\p{N}]+/gu)||[];return {file,grams:new Set(words.slice(0,-2).map((w,i)=>words.slice(i,i+3).join(' ')))};});
const similar=[];
for(let i=0;i<pages.length;i++)for(let j=i+1;j<pages.length;j++){const a=pages[i],b=pages[j];const overlap=[...a.grams].filter(x=>b.grams.has(x)).length;const score=overlap/(a.grams.size+b.grams.size-overlap);if(score>=.8)similar.push({a:a.file,b:b.file,similarity:Math.round(score*100)});}
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/content-similarity.json',JSON.stringify(similar,null,2));console.log(`${pages.length} landing pages: ${similar.length} pairs >=80% word-trigram similarity (editorial review, not an indexing verdict).`);
