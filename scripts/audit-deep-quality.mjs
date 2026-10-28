import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
import {tests as current} from './load-bank.mjs';
const ref=process.argv[process.argv.indexOf('--ref')+1];
let tests=current;
if(process.argv.includes('--ref')){
 const read=p=>execFileSync('git',['show',`${ref}:${p}`],{encoding:'utf8',maxBuffer:30e6});
 const files=execFileSync('git',['ls-tree','-r','--name-only',ref,'data/tests'],{encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.js')).sort();
 const ctx={window:{},URLSearchParams};vm.createContext(ctx);
 for(const f of ['data/test-normalizer.js',...files])vm.runInContext(read(f),ctx);
 tests=ctx.window.TestCozTestNormalizer.normalizeAllTests(ctx.window.TESTCOZ_TESTS);
}
const clean=s=>s.toLocaleLowerCase('tr-TR').replace(/^\d\. sınıf\s+(kolay|orta|zor)\s*[:—-]\s*/u,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const groups=new Map(),numeric=new Map(),issues=[],records=[];
const add=(map,key,r)=>{if(!map.has(key))map.set(key,[]);map.get(key).push(r);};
for(const t of tests)for(const q of t.questions){
 const r={id:q.id,test:t.slug,grade:t.classLevel,subject:t.subject,topic:t.topic};
 const flag=(code,reason)=>issues.push({...r,code,reason});
 if(q.choices.length!==(t.classLevel<=3?3:4))flag('grade_choice_count',`Expected ${t.classLevel<=3?3:4}, received ${q.choices.length}; not an answer-correctness finding.`);
 if(/\b[12]\. sınıf/u.test(q.question.replace(/^\d\. sınıf\s+(?:kolay|orta|zor):\s*/u,''))&&t.classLevel===3)flag('embedded_grade','Grade-3 question contains another grade label.');
 if(/^(Davranış, .+ için uygun bir örnektir|Doğru ve yararlı davranış .+ seçeneğidir|.+ yaşına uygun bir sorumluluktur|.+ olumlu sonuçlar doğurur)[.!]?$/u.test(q.explanation))flag('explanation_restatement','Explanation repeats a value judgment without explaining the situation.');
 if(q.explanation.length<35)flag('short_explanation','Under 35 characters; review rather than automatic error.');
 const body=clean(q.question),options=q.choices.map(clean).sort();
 add(groups,JSON.stringify([body,options,clean(q.choices[q.correctAnswer])]),r);
 add(numeric,JSON.stringify([body.replace(/\d+/g,'#'),options.map(x=>x.replace(/\d+/g,'#'))]),r);
 const words=body.split(' '),grams=new Set(words.slice(0,-2).map((_,i)=>words.slice(i,i+3).join(' ')));
 records.push({...r,grams});
}
// Inverted trigram index avoids comparing unrelated short prompts.
const index=new Map(),pairs=[];
for(let i=0;i<records.length;i++){
 const a=records[i],candidates=new Map();
 for(const gram of a.grams)for(const j of index.get(a.subject+'|'+gram)||[])candidates.set(j,(candidates.get(j)||0)+1);
 if(a.grams.size>=8)for(const [j,overlap]of candidates){const b=records[j];if(b.grams.size<8)continue;const score=overlap/(a.grams.size+b.grams.size-overlap);if(score>=.8)pairs.push({a:b.id,b:a.id,score:Number(score.toFixed(3))});}
 for(const gram of a.grams)add(index,a.subject+'|'+gram,i);
}
const repeated=[...groups.values()].filter(g=>g.length>1),templates=[...numeric.values()].filter(g=>g.length>1);
const report={scope:'All questions, deterministic triage. No full semantic, difficulty, language or visual certification.',ref:process.argv.includes('--ref')?ref:'working-tree',summary:{tests:tests.length,questions:records.length,issues:issues.length,flaggedQuestions:new Set(issues.map(x=>x.id)).size,counts:Object.fromEntries([...new Set(issues.map(x=>x.code))].map(c=>[c,issues.filter(x=>x.code===c).length])),exactGroups:repeated.length,numericTemplateGroups:templates.length,nearPairs:pairs.length},issues,exactGroups:repeated,numericTemplateGroups:templates,nearPairs:pairs};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync(`outputs/deep-quality-${process.argv.includes('--ref')?ref:'current'}.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.summary));
