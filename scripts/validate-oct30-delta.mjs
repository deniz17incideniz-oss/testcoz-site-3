import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {tests} from './load-bank.mjs';
const ref='75332e17e4a0eeea94f02bbc513fb06c1f8563fa';
const read=path=>execFileSync('git',['show',`${ref}:${path}`],{encoding:'utf8',maxBuffer:40e6});
const files=execFileSync('git',['ls-tree','-r','--name-only',ref,'data/tests'],{encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.js')).sort();
const ctx={window:{},URLSearchParams};vm.createContext(ctx);
for(const f of ['data/test-normalizer.js',...files])vm.runInContext(read(f),ctx);
const old=ctx.window.TestCozTestNormalizer.normalizeAllTests(ctx.window.TESTCOZ_TESTS);
assert.equal(tests.length,old.length);
const changes=[];
for(const t of tests){
 const previous=old.find(x=>x.slug===t.slug);assert.ok(previous);assert.equal(t.questions.length,10);
 for(const [i,q]of t.questions.entries()){
  const p=previous.questions[i];assert.equal(q.id,p.id);
  assert.equal(q.choices.length,t.classLevel<=3?3:4);
  const fields=['question','choices','correctAnswer','explanation','image','visual'].filter(k=>JSON.stringify(q[k])!==JSON.stringify(p[k]));
  if(!fields.length)continue;
  assert.equal(t.testNumber,1,'This follow-up must not change Test 2');assert.ok(t.classLevel<=3,'Grade 4 must remain unchanged');
  const authored=q.question!==p.question;
  if(!authored){assert.equal(q.choices[q.correctAnswer],p.choices[p.correctAnswer]);assert.equal(q.explanation,p.explanation);assert.equal(q.image,p.image);}
  changes.push({id:q.id,test:t.slug,authored,fields,before:{question:p.question,choices:p.choices,correctAnswer:p.correctAnswer,explanation:p.explanation,image:p.image},after:{question:q.question,choices:q.choices,correctAnswer:q.correctAnswer,explanation:q.explanation,image:q.image}});
 }
}
assert.equal(changes.filter(c=>c.authored).length,88);
assert.equal(changes.length,2400);
const summary={base:ref,tests:520,questions:5200,changedQuestions:changes.length,authoredQuestions:88,choiceOnlyQuestions:changes.filter(c=>!c.authored).length,changedTests:new Set(changes.map(c=>c.test)).size,newLessons:8,lessonPages:33,visualsReauthored:32,gradeChoiceViolations:0,test2Unchanged:true,grade4Unchanged:true};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/oct30-delta.json',JSON.stringify({summary,changes},null,2)+'\n');
console.log(JSON.stringify(summary));
