import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {repairs,visualEvidence} from '../data/editorial-repairs.mjs';
import {gradeChoices} from '../data/choice-policy.mjs';

const ctx={window:{},URLSearchParams}; vm.createContext(ctx);
for(const file of ['data/test-normalizer.js',...fs.readdirSync('data/tests').filter(f=>f.endsWith('.js')&&f!=='zz-editorial-repairs.js').sort().map(f=>'data/tests/'+f)]) vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const bank=ctx.window.TestCozTestNormalizer.normalizeAllTests(ctx.window.TESTCOZ_TESTS);
const changes=[],patches=[],seen=new Set();
const baseline=JSON.parse(fs.readFileSync('data/imports/adsense-repair-baseline.json','utf8'));
const digest=q=>crypto.createHash('sha256').update(JSON.stringify([q.question,q.choices,q.correctAnswer,q.explanation,q.image??null])).digest('hex');
for(const p of repairs){
 const t=bank.find(t=>t.slug===p.slug); assert.ok(t,p.slug);
 const q=t.questions[p.index],key=`${p.slug}:${p.index}`;
 assert.ok(q,key); assert.ok(!seen.has(key),`Duplicate repair ${key}`); seen.add(key);
 assert.equal(q.id,baseline[key]?.id,`Source question ID changed: ${key}`);
 assert.equal(digest(q),baseline[key]?.sha256,`Source question changed; review repair before applying: ${key}`);
 const row=p.row||[q.question,...q.choices.slice(q.correctAnswer),...q.choices.slice(0,q.correctAnswer),q.explanation];
 const [question,...rest]=row,explanation=rest.pop(),choices=rest;
 assert.ok(choices.length===(t.classLevel<=3?3:4)||choices.length===q.choices.length,`Invalid authored choice count: ${key}`); assert.equal(new Set(choices).size,choices.length,key);
 assert.ok((p.fields?.explanation || explanation).length>40,key);
 const shift=p.index%choices.length;
 const rotated=[...choices.slice(choices.length-shift),...choices.slice(0,choices.length-shift)];
 let fields={question,choices:rotated,options:rotated,correctAnswer:shift,explanation,skill:t.topicName,subSkill:'Verilen bilgileri ilişkilendirerek gerekçe kurma',questionType:'metin-anlama',cognitiveLevel:t.difficulty==='kolay'?'anlama':t.difficulty==='orta'?'uygulama':'yorumlama',tags:[t.subject,t.topic,'editorial-2026-10']};
 if(p.fields)fields={...p.fields};
 const remove=[];
 if(q.image&&!p.fields){
  const evidence=visualEvidence[key];
  if(evidence){fields.visual={type:'cards',title:evidence[0],data:evidence[1]};fields.imageAlt=Object.values(evidence[1]).join('. ');}
  else {assert.equal(t.testNumber,1,`Test 2 visual requires an authored replacement: ${key}`);remove.push('image','imageAlt','visual');fields.hasVisual=false;}
 }
 const before=structuredClone(q);Object.assign(q,fields);for(const name of remove)delete q[name];
 patches.push({slug:p.slug,index:p.index,fields,remove});
 changes.push({id:q.id,test:p.slug,reason:p.reason,before,after:structuredClone(q)});
}
assert.equal(seen.size,Object.keys(baseline).length,'Repair baseline contains stale entries');
const choiceChanges=[];
for(const t of bank)for(const [index,q]of t.questions.entries()){
 const fields=gradeChoices(t,q);if(!fields)continue;
 const before={choices:q.choices.slice(),correctAnswer:q.correctAnswer};
 assert.equal(fields.choices[fields.correctAnswer],q.choices[q.correctAnswer],`Answer changed: ${q.id}`);
 Object.assign(q,fields);
 const existing=patches.find(p=>p.slug===t.slug&&p.index===index);
 if(existing)Object.assign(existing.fields,fields);else patches.push({slug:t.slug,index,fields,remove:[]});
 choiceChanges.push({id:q.id,test:t.slug,before,after:{choices:q.choices.slice(),correctAnswer:q.correctAnswer}});
}
for(const change of changes)change.after=structuredClone(bank.find(t=>t.slug===change.test).questions.find(q=>q.id===change.id));
fs.writeFileSync('data/imports/grade-choice-change-log.json',JSON.stringify({scope:'Structural choice-count correction; no semantic or difficulty certification',count:choiceChanges.length,changes:choiceChanges},null,2)+'\n');
const generated=`// Generated from data/editorial-repairs.mjs; do not edit.\n(function(){const patches=${JSON.stringify(patches)};for(const p of patches){const t=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===p.slug);if(!t)continue;const q=t.questions[p.index];Object.assign(q,p.fields);for(const key of p.remove)delete q[key];}})();\n`;
fs.writeFileSync('data/tests/zz-editorial-repairs.js',generated);
const groups=new Map();
for(const p of patches.filter(p=>p.slug.endsWith('-test-1'))){
 const t=bank.find(t=>t.slug===p.slug),key=`${t.classLevel}-${t.subject}`;
 if(!groups.has(key))groups.set(key,[]);groups.get(key).push(p);
}
for(const [key,subset] of groups) {
 const code=`// Generated Test 1 fixes for ${key}.\n(function(){const patches=${JSON.stringify(subset)};for(const p of patches){const t=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===p.slug);if(!t)continue;const q=t.questions[p.index];Object.assign(q,p.fields);for(const key of p.remove)delete q[key];}})();\n`;
 fs.writeFileSync(`data/runtime/editorial-${key}.js`,code);
}
fs.writeFileSync('data/imports/adsense-repair-change-log.json',JSON.stringify({scope:'Authored repairs; no whole-bank editorial certification',count:changes.length,changes},null,2)+'\n');
console.log(`Editorial repairs: ${changes.length} questions in ${new Set(changes.map(c=>c.test)).size} tests`);

// Derive browser coverage from the same repair groups as the server bank.
const manifest={};
for(const key of groups.keys()){const [grade,...parts]=key.split('-');(manifest[grade]??=[]).push(parts.join('-'));}
const loader=fs.readFileSync('js/test-loader.js','utf8');
assert.equal((loader.match(/const test1Repairs=/g)||[]).length,1);
fs.writeFileSync('js/test-loader.js',loader.replace(/const test1Repairs=.+?;/, 'const test1Repairs='+JSON.stringify(manifest)+';'));
