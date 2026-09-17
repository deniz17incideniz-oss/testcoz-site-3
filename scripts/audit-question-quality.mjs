import fs from 'node:fs';import vm from 'node:vm';
const ctx={window:{},URLSearchParams};vm.createContext(ctx);
for(const file of ['js/utils.js','data/catalog.js','data/test-normalizer.js',...fs.readdirSync('data/tests').filter(f=>f.endsWith('.js')).map(f=>'data/tests/'+f)])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const tests=ctx.window.TestCozTestNormalizer.normalizeAllTests(ctx.window.TESTCOZ_TESTS);
const flags=[],sample=[],seen=new Set();
for(const t of tests){
 const group=`${t.classLevel}/${t.subject}/${t.difficulty}`;
 if(!seen.has(group)){seen.add(group);sample.push({group,test:t.slug,question:t.questions[0]});}
 t.questions.forEach((q,i)=>{
  const reasons=[];
  if(t.classLevel===1&&q.question.length>180)reasons.push('1. sınıf için uzun soru kökü; editör incelemeli');
  if(q.explanation.length<35)reasons.push('Kısa açıklama; gerekçe yeterliliği incelenmeli');
  if(q.visual?.type==='cards')reasons.push('Çizim yerine metin kartı: öğretici görsel gereksinimi incelenmeli');
  if(reasons.length)flags.push({test:t.slug,question:i+1,reasons});
 });
}
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/question-quality.json',JSON.stringify({note:'Heuristic flags, not correctness or expert approval. Structural validation runs separately.',tests:tests.length,questions:tests.reduce((s,t)=>s+t.questions.length,0),flaggedQuestions:flags.length,flags,sample},null,2));
console.log(`Question audit: ${tests.length} tests, ${flags.length} questions flagged for editorial review; ${sample.length} stratified samples saved.`);
