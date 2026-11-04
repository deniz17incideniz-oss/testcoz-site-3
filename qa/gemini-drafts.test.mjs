import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateDraft,textWithFallback} from '../scripts/gemini-drafts.mjs';

const item=()=>({question:'Bir örnek soru?',choices:['Bir','İki','Üç'],correctAnswer:'İki',explanation:'İşlem adımlarını açıklayan yeterli uzunlukta örnek bir açıklama.',subSkill:'Örnek beceri',questionType:'problem',imageBrief:'',imageAlt:''});
test('accepts a complete draft without treating it as editorial approval',()=>assert.equal(validateDraft({questions:[item()]},1,3).questions.length,1));
test('rejects duplicate choices and a missing answer',()=>{const q=item();q.choices=['Bir','Bir','Üç'];assert.throws(()=>validateDraft({questions:[q]},1,3));});
test('rejects orphan image brief',()=>{const q=item();q.imageBrief='Bir üçgen.';assert.throws(()=>validateDraft({questions:[q]},1,3));});
test('rejects an unresolved self-reported option error',()=>{const q=item();q.explanation='Soruda hata olmaması için bir seçeneği değiştirelim. Diğer bütün sonuçlar eşittir.';assert.throws(()=>validateDraft({questions:[q]},1,3),/unresolved/);});
test('rejects the self-correction observed in a multiplication or division explanation',()=>{const q=item();q.explanation='Ancak seçeneklerde düzeltme yaparsak, sonuç farklı olacak şekilde yeniden yazabiliriz.';assert.throws(()=>validateDraft({questions:[q]},1,3),/unresolved/);});
test('rejects repeated questions',()=>assert.throws(()=>validateDraft({questions:[item(),item()]},2,3)));
test('falls back once after 503 and records the actual model',async()=>{const calls=[];const r=await textWithFallback(async model=>{calls.push(model);if(calls.length===1)throw Object.assign(new Error('unavailable'),{httpStatus:503});return ['draft'];},'gemini-3.1-flash-lite');assert.deepEqual(calls,['gemini-3.1-flash-lite','gemini-3.5-flash-lite']);assert.equal(r.model,'gemini-3.5-flash-lite');});
test('does not retry quota errors or override a chosen model',async()=>{for(const [status,override] of [[429,false],[503,true]]){let calls=0;await assert.rejects(textWithFallback(async()=>{calls++;throw Object.assign(new Error('error'),{httpStatus:status});},'gemini-3.1-flash-lite',override));assert.equal(calls,1);}});
