import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateDraft} from '../scripts/gemini-drafts.mjs';

const item=()=>({question:'Bir örnek soru?',choices:['Bir','İki','Üç'],correctAnswer:'İki',explanation:'İşlem adımlarını açıklayan yeterli uzunlukta örnek bir açıklama.',subSkill:'Örnek beceri',questionType:'problem',imageBrief:'',imageAlt:''});
test('accepts a complete draft without treating it as editorial approval',()=>assert.equal(validateDraft({questions:[item()]},1,3).questions.length,1));
test('rejects duplicate choices and a missing answer',()=>{const q=item();q.choices=['Bir','Bir','Üç'];assert.throws(()=>validateDraft({questions:[q]},1,3));});
test('rejects orphan image brief',()=>{const q=item();q.imageBrief='Bir üçgen.';assert.throws(()=>validateDraft({questions:[q]},1,3));});
test('rejects repeated questions',()=>assert.throws(()=>validateDraft({questions:[item(),item()]},2,3)));
