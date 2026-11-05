import fs from 'node:fs';
import assert from 'node:assert/strict';
import {tests} from './load-bank.mjs';
// Historical snapshot of the unreviewed migration, retained as evidence.
const log=JSON.parse(fs.readFileSync('data/imports/grade-choice-change-log.json','utf8'));
assert.equal(log.count,2312);
const editorial=JSON.parse(fs.readFileSync('data/imports/adsense-repair-change-log.json','utf8'));
const allowedReviews=new Map([
 ['reviewed_gemini_grade_one_school_questions',new Set(['1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1','1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1'])],
 ['reviewed_gemini_grade_one_safety_questions',new Set(['1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1','1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1'])],
 ['reviewed_gemini_grade_two_safety_questions',new Set(['2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1','2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1','2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1'])],
 ['reviewed_gemini_grade_three_safety_medium_p0',new Set(['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1'])],
 ['reviewed_gemini_grade_three_safety_questions',new Set(['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1'])],
 ['reviewed_gemini_grade_one_community_questions',new Set(['1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1','1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-orta-test-1'])],
 ['reviewed_gemini_grade_two_community_questions',new Set(['2-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1'])]
]);
const reviewed=new Map(editorial.changes.filter(change=>allowedReviews.has(change.reason)).map(change=>[change.id,change]));
const historicalIds=new Set(log.changes.map(entry=>entry.id));
for(const [id,change] of reviewed){
 assert.ok(historicalIds.has(id),`Reviewed choice record is not in historical migration: ${id}`);
 assert.ok(allowedReviews.get(change.reason)?.has(change.test),`Unexpected reviewed test: ${id}`);
 if(change.reason==='reviewed_gemini_grade_three_safety_medium_p0')assert.ok([4,6,9,10].includes(Number(id.split('-').at(-1))),`Unexpected reviewed question: ${id}`);
 assert.equal(change.after.choices.length,3,`Reviewed question must have three choices: ${id}`);
}
const questions=new Map(tests.flatMap(t=>t.questions.map(q=>[q.id,q])));
for(const entry of log.changes){
 const q=questions.get(entry.id);
 assert.ok(q,`Missing question ${entry.id}`);
 const review=reviewed.get(entry.id);
 if(review){
  assert.deepEqual(review.before.choices,entry.before.choices,`Reviewed source does not match historical choices: ${entry.id}`);
  assert.equal(review.before.correctAnswer,entry.before.correctAnswer,`Reviewed source answer mismatch: ${entry.id}`);
  assert.deepEqual(Array.from(q.choices),review.after.choices,`Reviewed choices mismatch: ${entry.id}`);
  assert.equal(q.correctAnswer,review.after.correctAnswer,`Reviewed answer mismatch: ${entry.id}`);
 } else {
  assert.deepEqual(Array.from(q.choices),entry.before.choices,`Unreviewed choice removal: ${entry.id}`);
  assert.equal(q.correctAnswer,entry.before.correctAnswer,`Changed answer index: ${entry.id}`);
 }
}
console.log(`Choice history verified: ${log.count-reviewed.size} unchanged, ${reviewed.size} individually reviewed replacements.`);
