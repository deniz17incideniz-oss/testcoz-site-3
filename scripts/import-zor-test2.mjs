import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {duplicateReplacements,englishDuplicates} from '../data/imports/zor-test2-corrections.mjs';
import {finalVisuals} from '../data/imports/zor-test2-visuals.mjs';
import {repairEditorial} from '../data/imports/zor-test2-editorial.mjs';
import {repairExplanation} from '../data/imports/zor-test2-explanations.mjs';
import {repairEnglish4} from '../data/imports/zor-test2-english4.mjs';
import {repairScienceTemplate} from '../data/imports/zor-test2-science-repairs.mjs';
import {repairMathPrecision} from '../data/imports/zor-test2-math-precision.mjs';
import {repairMath4Topics} from '../data/imports/zor-test2-math4-topics.mjs';
import {repairHayat1} from '../data/imports/zor-test2-hayat1.mjs';
import {repairTurkce1} from '../data/imports/zor-test2-turkce1.mjs';
import {repairEnglish1} from '../data/imports/zor-test2-english1.mjs';
import {repairHayat23} from '../data/imports/zor-test2-hayat23.mjs';
import {repairMath1} from '../data/imports/zor-test2-math1.mjs';
import {repairSocial4} from '../data/imports/zor-test2-social4.mjs';
import {repairScience3Topics} from '../data/imports/zor-test2-science3-topics.mjs';
const raw=fs.readFileSync('data/imports/zor-test2-final.md','utf8').replace(/\r/g,'');
const records=raw.split(/^final_id: /m).slice(1).map(part=>{
 const chunk=part.split(/^---$/m)[0],r={final_id:chunk.split('\n')[0].trim()};
 const fields=[...chunk.matchAll(/^(source_type|source_id|classLevel|subject_id|subject_name|topic_name|difficulty|testNumber|question|options|correct_answer|explanation|visual_required|visual_type|visual_brief|image_alt):[ \t]*(.*)$/gm)];
 fields.forEach((m,i)=>r[m[1]]=(m[2]+'\n'+chunk.slice(m.index+m[0].length,fields[i+1]?.index??chunk.length)).trim());return r;
});
if(records.length!==1300)throw new Error('Expected 1300 source records');
const ctx={window:{},URLSearchParams};vm.createContext(ctx);for(const f of ['js/utils.js','data/catalog.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx);
const normalize=s=>s.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[’']/g,'').replace(/\s+/g,' ').trim();
const seen=new Set(),bank=new Map(),changes=[];let tr=0,en=0,vi=0;
const translations={'Kalem':'Pencil','Toprak':'Soil','Deniz':'Sea','Ağaç':'Tree','Ateş':'Fire','Kuş':'Bird','Güneş':'Sun','Kedi':'Cat','Defter':'Notebook','Masa':'Table','Dağ':'Mountain','Kitap':'Book','Muz':'Banana','Elma':'Apple','Köpek':'Dog','Öğrenci':'Student','Armut':'Pear','Kapı':'Door','Öğretmen':'Teacher','Göl':'Lake','Ev':'House','Yıldız':'Star','Su':'Water','Silgi':'Eraser','Çanta':'Bag','Pencere':'Window','Hava':'Air'};
for(const r of records){
 const grade=Number(r.classLevel[0]),g=ctx.window.TESTCOZ_CATALOG.grades[grade],subject=g.subjects.find(s=>normalize(s.name)===normalize(r.subject_name)),topic=subject?.topics.find(t=>normalize(t.name)===normalize(r.topic_name));if(!topic)throw new Error('Unmapped '+r.final_id);
 const slug=`${grade}-sinif-${subject.id}-${topic.id}-zor-test-2`;
 if(!bank.has(slug))bank.set(slug,{classLevel:grade,subject:subject.id,subjectName:subject.name,topic:topic.id,topicName:topic.name,difficulty:'zor',testNumber:2,slug,pageUrl:`tests/${slug}.html`,questions:[]});
 const t=bank.get(slug),q={id:r.final_id,question:r.question,choices:[...r.options.matchAll(/^[ABCD]: (.*)$/gm)].map(m=>m[1]),correctAnswer:'ABCD'.indexOf(r.correct_answer),explanation:r.explanation,image:null,source:'zor-test2-final',sourceId:r.source_id==='null'?null:r.source_id,sourceType:r.source_type};
 const original=structuredClone(q),reasons=[],key=normalize(r.question);
 if(seen.has(key)){
  const english=subject.id==='ingilizce',row=(english?englishDuplicates[en++]:duplicateReplacements[tr++]);if(!row)throw new Error('Missing duplicate replacement '+r.final_id);
  const count=grade===4?4:3;q.question=row[0];q.choices=row.slice(1,count+1);q.correctAnswer=0;
  q.explanation=english?`Doğru yanıt “${row[1]}” ifadesidir. ${row[0]} sorusundaki ipuçları bu seçeneği gösterir.`:row[count+1];
  const shift=t.questions.length%count;q.choices=[...q.choices.slice(count-shift),...q.choices.slice(0,count-shift)];q.correctAnswer=shift;reasons.push('exact_duplicate');
 } else if(r.question.startsWith('What is the correct translation')){
  const word=r.question.match(/'([^']+)'/)[1];q.choices=q.choices.map(c=>translations[c]||c);q.explanation=`“${word}” sözcüğünün İngilizce karşılığı “${translations[word]}”dır.`;
  if(q.choices[q.correctAnswer]!==translations[word])throw new Error('Translation answer '+r.final_id);reasons.push('untranslated_answer');
 }
 seen.add(key);
 if(!reasons.includes('exact_duplicate')&&q.question.includes('kelimelerin ortak özelliğidir?')){
  const index=q.choices.findIndex(c=>c.includes('varlıkları tanımlayan isimler'));if(index<0)throw new Error('noun answer');
  if(q.correctAnswer!==index){q.correctAnswer=index;reasons.push('noun_answer');}
  const match=q.explanation.match(/doğru cevap ([ABCD]) seçeneğidir/);if(match&&match[1]!=='ABCD'[index]){q.explanation=q.explanation.replace(/doğru cevap [ABCD] seçeneğidir/,`doğru cevap ${'ABCD'[index]} seçeneğidir`);reasons.push('stale_answer_letter');}
 }
 if(r.visual_required==='YES'){
  const [kind,title,extra={}]=finalVisuals[vi++];q.visual={type:'finalDiagram',title,data:{kind,...extra}};q.image=`images/tests/${slug}-soru-${t.questions.length+1}.svg`;q.imageAlt=title;
 }
 if(repairEditorial(t,q,t.questions.length)) reasons.push('topic_and_context_repair');
 if(repairExplanation(q)) reasons.push('specific_explanation_and_clarity');
 if(repairScienceTemplate(t,q,t.questions.length)) reasons.push('science_topic_repair');
 if(repairMathPrecision(q)) reasons.push('verified_math_answer_or_ambiguity');
 if(repairTurkce1(t,q,t.questions.length)) reasons.push('turkish_topic_and_explanation_repair');
 if(reasons.length)changes.push({id:r.final_id,reasons,before:original,after:structuredClone(q)});
 t.questions.push(q);
}
if(vi!==35||tr!==duplicateReplacements.length||en!==englishDuplicates.length||bank.size!==130)throw new Error(`Mapping counts: ${vi}/${tr}/${en}/${bank.size}`);
repairEnglish4([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairMath4Topics([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairHayat1([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairEnglish1([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairHayat23([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairMath1([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairSocial4([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
repairScience3Topics([...bank.values()],ctx.window.TESTCOZ_CATALOG,changes);
fs.writeFileSync('data/tests/zor-test2-final.js','// Imported final bank; reproducible with npm run import:zor-test2.\n(function(){ window.TESTCOZ_TESTS = window.TESTCOZ_TESTS || []; window.TESTCOZ_TESTS.push(...'+JSON.stringify([...bank.values()],null,2)+'); })();\n');
fs.writeFileSync('data/imports/zor-test2-change-log.json',JSON.stringify({sourceSha256:crypto.createHash('sha256').update(raw).digest('hex'),changes},null,2)+'\n');
console.log(JSON.stringify({tests:bank.size,questions:records.length,visuals:vi,duplicateCorrections:tr+en,changedQuestions:new Set(changes.map(c=>c.id)).size,changeEvents:changes.length}));
