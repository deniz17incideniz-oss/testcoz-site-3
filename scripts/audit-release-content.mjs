import fs from 'node:fs';
import {tests,catalog} from './load-bank.mjs';
const issues=[];
const generic=/Soruda verilen ipuçları incelendiğinde|ipuçları bu seçeneği gösterir|değerleri kullanılarak işlem yapıldığında|Problemdeki sayısal veriler hesaplandığında|verilen değerler bulunup toplandığında|İlgili konuya dair verilen en uygun|bilimsel veya olgusal olarak yanlış olduğu tespit edilir/;
for(const t of tests.filter(t=>t.testNumber===2)) for(const q of t.questions){
 const add=(category,reason)=>issues.push({id:q.id,test:t.slug,category,reason,question:q.question,explanation:q.explanation});
 if(generic.test(q.explanation)) add('generic_explanation','Çözüm adımları veya soruya özgü gerekçe yok.');
 if(/^Bir mağazada \d+ adet/.test(q.question)) add('synthetic_context','Nesne adlarıyla üretilmiş toplama kalıbı; konu ve bağlam incelemesi gerekli.');
 if(q.question.includes('kelimelerin ortak özelliğidir?')) add('repeated_noun_template','Farklı konu testlerinde tekrarlanan isim bulma kalıbı.');
}
const missing=[];
for(const [grade,g] of Object.entries(catalog.grades))for(const s of g.subjects)for(const topic of s.topics)for(const level of ['kolay','orta','zor']){
 if(!tests.some(t=>t.classLevel===Number(grade)&&t.subject===s.id&&t.topic===topic.id&&t.difficulty===level&&t.testNumber===1))missing.push({grade,subject:s.id,topic:topic.id,level});
}
const counts=Object.fromEntries([...new Set(issues.map(i=>i.category))].map(c=>[c,issues.filter(i=>i.category===c).length]));
const report={ready:issues.length===0&&missing.length===0,scope:'Explicit content-pattern checks, not complete semantic validation',counts,affectedQuestions:new Set(issues.map(i=>i.id)).size,missingTest1:missing,issues};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/release-content.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,issues:undefined,missingTest1:missing.length}));
if(!report.ready) process.exitCode=1;
