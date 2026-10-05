import fs from 'node:fs';
import assert from 'node:assert/strict';
import {tests,catalog} from './load-bank.mjs';
const bank=tests.filter(t=>t.testNumber===2),ids=new Set(),texts=new Set();
assert.equal(bank.length,130);
for(const [g,v] of Object.entries(catalog.grades))for(const s of v.subjects)for(const topic of s.topics){const found=bank.filter(t=>t.classLevel===Number(g)&&t.subject===s.id&&t.topic===topic.id);assert.equal(found.length,1,`${g}/${s.id}/${topic.id}`);}
let visuals=0;
for(const t of bank){assert.equal(t.difficulty,'zor');assert.equal(t.questions.length,10);assert.equal(t.pageUrl,`tests/${t.slug}.html`);assert.ok(fs.existsSync(t.pageUrl));
 const html=fs.readFileSync(t.pageUrl,'utf8');assert.ok(html.includes(`https://testcoz.pro/${t.pageUrl}`));assert.ok(html.includes('test=2'));
 for(const q of t.questions){assert.ok(!ids.has(q.id),q.id);ids.add(q.id);const text=q.question.toLocaleLowerCase('tr-TR').replace(/\s+/g,' ').trim();assert.ok(!texts.has(text),`Duplicate: ${q.id}`);texts.add(text);assert.equal(q.choices.length,t.classLevel<=3?3:4);assert.equal(new Set(q.choices).size,q.choices.length,q.id);assert.ok(Number.isInteger(q.correctAnswer)&&q.correctAnswer>=0&&q.correctAnswer<q.choices.length,q.id);assert.ok(q.explanation.trim(),q.id);if(q.image){visuals++;assert.ok(q.image.startsWith('images/tests/'));assert.ok(fs.existsSync(q.image),q.id);const svg=fs.readFileSync(q.image,'utf8');assert.ok(svg.includes('<svg'));assert.ok(!/watermark|https?:\/\/(?!www.w3.org)/i.test(svg),q.id);assert.ok(q.imageAlt);}}
}
assert.equal(ids.size,1300);assert.equal(visuals,35);
const usedImages=new Set(bank.flatMap(t=>t.questions.map(q=>q.image).filter(Boolean)));
const generatedImages=fs.readdirSync('images/tests').filter(name=>name.includes('zor-test-2')&&name.endsWith('.svg')).map(name=>`images/tests/${name}`);
assert.deepEqual(new Set(generatedImages),usedImages,'Unused or missing Test 2 SVG');
assert.deepEqual([1,2,3,4].map(g=>bank.filter(t=>t.classLevel===g).flatMap(t=>t.questions).length),[270,260,340,430]);
console.log('✓ Zor Test 2: 130 topics/pages, 1300 questions, 35 local SVGs; coverage, IDs, text, choices, keys and paths PASS');
