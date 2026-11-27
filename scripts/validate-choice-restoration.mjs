import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {tests} from './load-bank.mjs';
// Historical snapshot of the unreviewed migration, retained as evidence.
const log=JSON.parse(fs.readFileSync('data/imports/grade-choice-change-log.json','utf8'));
assert.equal(log.count,2312);
const editorial=JSON.parse(fs.readFileSync('data/imports/adsense-repair-change-log.json','utf8'));
const allowedReviews=new Map([
 ['reviewed_gemini_grade_one_school_questions',new Set(['1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1','1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1'])],
 ['reviewed_gemini_grade_one_school_hard_candidate',new Set(['1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1'])],
 ['reviewed_gemini_grade_one_safety_questions',new Set(['1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1','1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1'])],
 ['reviewed_gemini_grade_two_safety_questions',new Set(['2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1','2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1','2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1'])],
 ['reviewed_gemini_grade_three_safety_medium_p0',new Set(['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1'])],
 ['reviewed_gemini_grade_three_safety_questions',new Set(['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1'])],
 ['reviewed_grade_three_topic_questions',new Set(['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1',...['ailem-ve-toplum','yasadigim-yer-ve-ulkem','doga-ve-cevre','bilim-teknoloji-ve-sanat'].flatMap(topic=>['kolay','orta'].map(level=>`3-sinif-hayat-bilgisi-${topic}-${level}-test-1`))])],
 ['reviewed_grade_three_environment_test',new Set(['3-sinif-hayat-bilgisi-doga-ve-cevre-orta-test-1'])],
 ['reviewed_gemini_grade_one_community_questions',new Set(['1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1','1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-orta-test-1'])],
 ['reviewed_gemini_grade_two_community_questions',new Set(['2-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1'])]
]);
const reviewed=new Map(editorial.changes.filter(change=>allowedReviews.has(change.reason)).map(change=>[change.id,change]));
// Individually reviewed four-choice change: preserves option count and answer position.
const reviewedFourChoiceExpected=new Map([['3-sinif-ingilizce-family-life-orta-test-1-soru-3',{reason:'family_test1_distractors_language_and_explanations',correctAnswer:2}],['2-sinif-ingilizce-school-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['2-sinif-ingilizce-classroom-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['2-sinif-ingilizce-personal-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['2-sinif-ingilizce-family-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['2-sinif-ingilizce-homes-houses-and-neighbourhoods-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['2-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['3-sinif-ingilizce-school-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['3-sinif-ingilizce-classroom-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['3-sinif-ingilizce-personal-life-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['3-sinif-ingilizce-homes-houses-and-the-neighbourhood-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}],['3-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-9',{reason:'question_specific_language_evidence',correctAnswer:0}]]);
const reviewedFourChoiceIds=new Set(reviewedFourChoiceExpected.keys());
const reviewedFourChoice=new Map(editorial.changes.filter(change=>reviewedFourChoiceIds.has(change.id)).map(change=>[change.id,change]));
assert.equal(reviewedFourChoice.size,reviewedFourChoiceIds.size,'Missing reviewed four-choice record');
// Seven individually authored, four-option reading questions; exact old/new arrays are required.
const reviewedPassageTitlesExpected=new Map([
 ['2-sinif-ingilizce-personal-life-kolay-test-1-soru-10',{before:['My Healthy Day','A Rainy Night','The Lost Key','A Big Ocean'],after:['My Age and Hair','My School Bag','Food and Drinks','My Family']}],
 ['2-sinif-ingilizce-family-life-kolay-test-1-soru-10',{before:['My Happy Family','A Rainy Night','The Lost Key','A Big Ocean'],after:['My Mother','My Brother','My Classroom','My Dinner']}],
 ['2-sinif-ingilizce-homes-houses-and-neighbourhoods-kolay-test-1-soru-10',{before:['My Home and Street','A Rainy Night','The Lost Key','A Big Ocean'],after:['My Room and My Cat','At the School Library','My New Bike','A Day at the Zoo']}],
 ['2-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-10',{before:['Around My City','A Rainy Night','The Lost Key','A Big Ocean'],after:['Food and Drinks','My New Hat','My School','A Pet Cat']}],
 ['3-sinif-ingilizce-personal-life-kolay-test-1-soru-10',{before:['My Healthy Day','A Rainy Night','The Lost Key','A Big Ocean'],after:['Cold Weather and My Coat','A Hot Day','My New Desk','My Brother’s Birthday']}],
 ['3-sinif-ingilizce-homes-houses-and-the-neighbourhood-kolay-test-1-soru-10',{before:['My Home and Street','A Rainy Night','The Lost Key','A Big Ocean'],after:['Our Farm and Cows','My City Bus','At the Beach','My Classroom Books']}],
 ['3-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-10',{before:['Around My City','A Rainy Night','The Lost Key','A Big Ocean'],after:['At a Café','My School Library','My New Shoes','On the Farm']}]
]);
const reviewedPassageTitles=new Map(editorial.changes.filter(change=>reviewedPassageTitlesExpected.has(change.id)).map(change=>[change.id,change]));
assert.equal(reviewedPassageTitles.size,reviewedPassageTitlesExpected.size,'Missing reviewed passage title record');
const historicalIds=new Set(log.changes.map(entry=>entry.id));
for(const [id,change] of reviewedPassageTitles){assert.ok(historicalIds.has(id),`Missing historical passage: ${id}`);assert.ok(!reviewed.has(id)&&!reviewedFourChoice.has(id),`Overlapping review: ${id}`);assert.equal(change.reason,'restore_missing_reading_passage');assert.deepEqual(change.after.choices,reviewedPassageTitlesExpected.get(id).after);assert.equal(change.after.correctAnswer,0);}
for(const [id,change] of reviewedFourChoice){assert.ok(historicalIds.has(id),`Missing historical choice record: ${id}`);assert.equal(change.reason,reviewedFourChoiceExpected.get(id).reason);assert.equal(change.after.choices.length,4);assert.equal(change.after.correctAnswer,reviewedFourChoiceExpected.get(id).correctAnswer);}
const schoolSlug='1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1';
const schoolIndices=[2,4,6,9];
const schoolContext={window:{TESTCOZ_TESTS:[{slug:schoolSlug,questions:Array.from({length:10},()=>({}))}]}};
vm.runInNewContext(fs.readFileSync('data/tests/zyz-school-hotfix.js','utf8'),schoolContext);
const schoolReviewed=new Map(schoolIndices.map(index=>[`${schoolSlug}-soru-${index+1}`,schoolContext.window.TESTCOZ_TESTS[0].questions[index]]));
for(const [id,q] of schoolReviewed){assert.ok(historicalIds.has(id),`School hotfix missing historical entry: ${id}`);assert.ok(!reviewed.has(id),`Overlapping school editorial repair: ${id}`);assert.equal(q.choices.length,3);}
const safetySlug='1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1',safetyIndices=[0,1,2,3,4,5,6,7,8,9];
const safetyContext={window:{TESTCOZ_TESTS:[{slug:safetySlug,questions:Array.from({length:10},()=>({}))}]}};
vm.runInNewContext(fs.readFileSync('data/tests/zyz2-grade1-safety.js','utf8'),safetyContext);
const safetyReviewed=new Map(safetyIndices.map(index=>[`${safetySlug}-soru-${index+1}`,safetyContext.window.TESTCOZ_TESTS[0].questions[index]]));
for(const [id,q] of safetyReviewed){assert.ok(historicalIds.has(id),`Safety hotfix missing historical entry: ${id}`);assert.ok(!reviewed.has(id),`Overlapping safety editorial repair: ${id}`);assert.equal(q.choices.length,3);}
for(const [id,change] of reviewed){
 assert.ok(historicalIds.has(id),`Reviewed choice record is not in historical migration: ${id}`);
 assert.ok(allowedReviews.get(change.reason)?.has(change.test),`Unexpected reviewed test: ${id}`);
 if(change.reason==='reviewed_gemini_grade_three_safety_medium_p0')assert.ok([2,4,5,6,8,9,10].includes(Number(id.split('-').at(-1))),`Unexpected reviewed question: ${id}`);
 if(change.reason==='reviewed_gemini_grade_one_school_hard_candidate')assert.equal(Number(id.split('-').at(-1)),1,`Unexpected reviewed question: ${id}`);
 if(change.reason==='reviewed_grade_three_topic_questions')assert.equal(Number(id.split('-').at(-1)),change.test.includes('-kolay-')?7:4,`Unexpected reviewed question: ${id}`);
 if(change.reason==='reviewed_grade_three_environment_test')assert.ok([1,2,3,5,6,7,8,9,10].includes(Number(id.split('-').at(-1))),`Unexpected reviewed question: ${id}`);
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
 } else if(reviewedFourChoice.has(entry.id)) {
  const repair=reviewedFourChoice.get(entry.id);
  assert.equal(entry.before.choices.length,4,`Historical choice count changed: ${entry.id}`);
  assert.equal(entry.before.correctAnswer,reviewedFourChoiceExpected.get(entry.id).correctAnswer,`Historical answer position changed: ${entry.id}`);
  const subjectCorrections=new Map([['2-sinif-ingilizce-school-life-kolay-test-1-soru-9','She reads a book in the library.'],['2-sinif-ingilizce-classroom-life-kolay-test-1-soru-9','Tom puts his notebook on the desk.'],['2-sinif-ingilizce-personal-life-kolay-test-1-soru-9','Mia washes her hands before lunch.'],['2-sinif-ingilizce-family-life-kolay-test-1-soru-9','Jack helps his father set the table.'],['2-sinif-ingilizce-homes-houses-and-neighbourhoods-kolay-test-1-soru-9','Lily sees a bakery next to her house.'],['2-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-9','Alex finds the museum on the city map.'],['3-sinif-ingilizce-school-life-kolay-test-1-soru-9','Emma reads a book in the library.'],['3-sinif-ingilizce-classroom-life-kolay-test-1-soru-9','Tom puts his notebook on the desk.'],['3-sinif-ingilizce-personal-life-kolay-test-1-soru-9','Mia washes her hands before lunch.'],['3-sinif-ingilizce-homes-houses-and-the-neighbourhood-kolay-test-1-soru-9','Lily sees a bakery next to her house.'],['3-sinif-ingilizce-life-in-the-city-and-the-world-kolay-test-1-soru-9','Alex finds the museum on the city map.']]);
  if(subjectCorrections.has(entry.id)){assert.deepEqual(repair.after.choices.slice(1),entry.before.choices.slice(1),`Unrelated choices changed: ${entry.id}`);assert.equal(repair.after.choices[0],subjectCorrections.get(entry.id));}
  assert.deepEqual(Array.from(q.choices),repair.after.choices,`Reviewed four-choice answers mismatch: ${entry.id}`);
  assert.equal(q.correctAnswer,repair.after.correctAnswer,`Reviewed four-choice index mismatch: ${entry.id}`);
 } else if(reviewedPassageTitles.has(entry.id)) {
  const repair=reviewedPassageTitles.get(entry.id),expected=reviewedPassageTitlesExpected.get(entry.id);
  assert.deepEqual(entry.before.choices,expected.before,`Historical passage choices differ: ${entry.id}`);
  assert.equal(entry.before.correctAnswer,0,`Historical passage answer position differs: ${entry.id}`);
  assert.deepEqual(Array.from(q.choices),expected.after,`Reviewed passage choices differ: ${entry.id}`);
  assert.deepEqual(repair.after.choices,expected.after,`Passage log choices differ: ${entry.id}`);
  assert.equal(q.correctAnswer,0,`Reviewed passage answer position differs: ${entry.id}`);
 } else if(schoolReviewed.has(entry.id)) {
  const patch=schoolReviewed.get(entry.id);
  assert.deepEqual(Array.from(q.choices),Array.from(patch.choices),`School hotfix choices mismatch: ${entry.id}`);
  assert.equal(q.correctAnswer,patch.correctAnswer,`School hotfix answer mismatch: ${entry.id}`);
 } else if(safetyReviewed.has(entry.id)) {
  const patch=safetyReviewed.get(entry.id);
  assert.deepEqual(Array.from(q.choices),Array.from(patch.choices),`First-grade safety choices mismatch: ${entry.id}`);
  assert.equal(q.correctAnswer,patch.correctAnswer,`First-grade safety answer mismatch: ${entry.id}`);
 } else {
  assert.deepEqual(Array.from(q.choices),entry.before.choices,`Unreviewed choice removal: ${entry.id}`);
  assert.equal(q.correctAnswer,entry.before.correctAnswer,`Changed answer index: ${entry.id}`);
 }
}
console.log(`Choice history verified: ${log.count-reviewed.size-schoolReviewed.size-safetyReviewed.size-reviewedFourChoice.size-reviewedPassageTitles.size} unchanged, ${reviewed.size+schoolReviewed.size+safetyReviewed.size+reviewedFourChoice.size+reviewedPassageTitles.size} individually reviewed replacements.`);
