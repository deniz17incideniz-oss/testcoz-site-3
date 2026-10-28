import assert from 'node:assert/strict';
import fs from 'node:fs';
import {load} from 'cheerio';
import {tests,catalog} from './load-bank.mjs';
import {inspectSemanticRisk} from './semantic-risks.mjs';
import {getLesson} from '../data/learning-lessons.mjs';
import {repairs} from '../data/editorial-repairs.mjs';

assert.ok(inspectSemanticRisk({subject:'matematik'},{question:'12 × 3 işleminin sonucu nedir?',choices:['35','36'],correctAnswer:0,explanation:'12 × 3 = 35.'}).some(x=>x.code==='arithmetic_mismatch'));
assert.ok(inspectSemanticRisk({subject:'ingilizce',topic:'family-life'},{question:'What is the weather like?',choices:['Sunny','Rainy'],correctAnswer:0,explanation:'Cevap metinde açıkça verilmiştir.'}).some(x=>x.code==='family_topic_mismatch'));
assert.ok(inspectSemanticRisk({}, {question:'Örnek',choices:['A','B'],correctAnswer:0,explanation:'Cevap metinde açıkça verilmiştir.'}).some(x=>x.code==='generic_explanation'));

for(const p of repairs){
 const t=tests.find(t=>t.slug===p.slug),q=t.questions[p.index];
 if(p.row)assert.equal(q.question,p.row[0],`Repair not used by runtime bank: ${p.slug}/${p.index}`);
 if(p.row)assert.equal(q.choices[q.correctAnswer],p.row[1],q.id);
 if(p.fields)for(const [key,value]of Object.entries(p.fields))assert.deepEqual(q[key],value,q.id);
 assert.deepEqual(q.options,q.choices,q.id);
 assert.deepEqual(inspectSemanticRisk(t,q),[],`Repaired question has semantic pattern risk: ${q.id}`);
}
let lessons=0;
for(const [g,grade]of Object.entries(catalog.grades))for(const s of grade.subjects){
 const $=load(fs.readFileSync(`ders/${g}-sinif-${s.id}.html`,'utf8'));
 for(const topic of s.topics){
  const lesson=getLesson(topic.id),card=$(`[id="${topic.id}"]`);
  assert.equal(card.length,1,topic.id);
  for(const field of ['example','solution','mistake','practice'])assert.ok(card.text().includes(lesson[field]),`${topic.id}/${field}`);
  lessons++;
 }
}
for(const t of tests){
 const $=load(fs.readFileSync(t.pageUrl,'utf8'));
 assert.equal($('.sample-question').length,2,t.slug);
 assert.ok($(`a[href$="#${t.topic}"]`).length,t.slug);
 assert.ok(!$('main').text().includes('bilgisini zor düzeydeki soruda kullanır'),t.slug);
 for(const q of t.questions.filter(q=>q.image)){
  const svg=fs.readFileSync(q.image,'utf8');
  assert.ok(/viewBox="0 0 \d+ \d+"/.test(svg),q.id);
  assert.ok(!/=\"(?:NaN|undefined)\"|<script\b|<foreignObject\b/i.test(svg),q.id);
 }
}
console.log(`Content regressions PASS: ${repairs.length} repaired records, ${lessons} topic lessons, ${tests.length} landing pages and all referenced SVGs. This is not whole-bank editorial approval.`);
