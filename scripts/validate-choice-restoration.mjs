import fs from 'node:fs';
import assert from 'node:assert/strict';
import {tests} from './load-bank.mjs';
// Historical snapshot of the unreviewed migration, retained as evidence.
const log=JSON.parse(fs.readFileSync('data/imports/grade-choice-change-log.json','utf8'));
assert.equal(log.count,2312);
const questions=new Map(tests.flatMap(t=>t.questions.map(q=>[q.id,q])));
for(const entry of log.changes){
 const q=questions.get(entry.id);
 assert.ok(q,`Missing question ${entry.id}`);
 assert.deepEqual(Array.from(q.choices),entry.before.choices,`Unreviewed choice removal: ${entry.id}`);
 assert.equal(q.correctAnswer,entry.before.correctAnswer,`Changed answer index: ${entry.id}`);
}
console.log(`Unreviewed choice migration reversed: ${log.count} records match historical choices and answer indices.`);
