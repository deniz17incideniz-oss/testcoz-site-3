// A structural ledger for independent review; this script never judges pedagogy.
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {tests} from './load-bank.mjs';

const ledgerArg=process.argv.indexOf('--ledger');
if(ledgerArg!==-1&&!process.argv[ledgerArg+1])throw new Error('Missing ledger path');
const path=ledgerArg===-1?'data/imports/editorial-independent-review.json':process.argv[ledgerArg+1];
const log=JSON.parse(fs.readFileSync('data/imports/adsense-repair-change-log.json','utf8'));
const questions=new Map(tests.flatMap(t=>t.questions.map(q=>[q.id,{q,t}])));
const digest=(q,t)=>crypto.createHash('sha256').update(JSON.stringify({
 test:t.slug,grade:t.classLevel,subject:t.subject,topic:t.topic,difficulty:t.difficulty,testNumber:t.testNumber,
 question:q.question,choices:Array.from(q.choices),correctAnswer:q.correctAnswer,
 explanation:q.explanation,image:q.image||null,visual:q.visual||null,imageAlt:q.imageAlt||null
})).digest('hex');
assert.equal(new Set(log.changes.map(x=>x.id)).size,log.changes.length,'Duplicate editorial IDs');
for(const c of log.changes){const item=questions.get(c.id);assert.ok(item,`Missing question: ${c.id}`);assert.equal(digest(item.q,item.t),digest(c.after,item.t),`Effective question differs from editorial record: ${c.id}`);}
if(process.argv.includes('--initialize')){
 const ledger={scope:'Independent editorial review; no automatic pedagogical approval',records:log.changes.map(c=>({id:c.id,content_sha256:digest(c.after,questions.get(c.id).t),status:'NOT_REVIEWED',evidence:''}))};
 fs.writeFileSync(path,JSON.stringify(ledger,null,2)+'\n',{flag:'wx'});
}
const ledger=JSON.parse(fs.readFileSync(path,'utf8'));
assert.ok(Array.isArray(ledger.records));
const records=new Map(ledger.records.map(r=>[r.id,r]));
assert.equal(records.size,ledger.records.length,'Duplicate review IDs');
assert.equal(records.size,log.changes.length,'Review ledger does not cover the current editorial log');
const counts={VERIFIED:0,NEEDS_REVISION:0,REJECTED:0,NOT_REVIEWED:0};
for(const c of log.changes){
 const r=records.get(c.id);assert.ok(r,`Review status missing: ${c.id}`);
 assert.equal(r.content_sha256,digest(c.after,questions.get(c.id).t),`Stale review after content change: ${c.id}`);
 assert.ok(Object.hasOwn(counts,r.status),`Invalid review status: ${c.id}`);
 assert.equal(typeof r.evidence,'string',`Invalid evidence: ${c.id}`);
 if(r.status!=='NOT_REVIEWED')assert.ok(r.evidence.trim().length>=20,`Review needs substantive evidence: ${c.id}`);
 counts[r.status]++;
}
console.log(JSON.stringify({scope:'Coverage and content fingerprints only; no semantic certification',records:records.size,counts}));
