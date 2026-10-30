import fs from 'node:fs';
import {tests,catalog} from './load-bank.mjs';
import {inspectSemanticRisk} from './semantic-risks.mjs';
const bankArg=process.argv.indexOf('--bank');
const bank=bankArg<0?tests:JSON.parse(fs.readFileSync(process.argv[bankArg+1],'utf8'));
const issues=bank.flatMap(t=>t.questions.flatMap(q=>inspectSemanticRisk(t,q).map(f=>({...f,id:q.id,test:t.slug,question:q.question,explanation:q.explanation}))));
const coverage=[];
for(const [g,grade]of Object.entries(catalog.grades))for(const s of grade.subjects)for(const topic of s.topics){
 const group=bank.filter(t=>t.classLevel===Number(g)&&t.subject===s.id&&t.topic===topic.id);
 coverage.push({grade:Number(g),subject:s.id,topic:topic.id,tests:group.length,questions:group.flatMap(t=>t.questions).length,flags:issues.filter(i=>group.some(t=>t.slug===i.test)).length});
}
const report={scope:'All questions scanned with explicit heuristics; semantic correctness, age, difficulty and visual relevance are NOT fully certified',questions:bank.flatMap(t=>t.questions).length,tests:bank.length,topicGroups:coverage.length,counts:Object.fromEntries([...new Set(issues.map(i=>i.code))].map(code=>[code,issues.filter(i=>i.code===code).length])),flaggedQuestions:new Set(issues.map(i=>i.id)).size,editorialGate:issues.length?'FAIL':'NO_PATTERN_HITS_NOT_CERTIFICATION',coverage,issues};
fs.mkdirSync('outputs',{recursive:true});
fs.writeFileSync(`outputs/semantic-risks${bankArg<0?'':'-before'}.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,issues:undefined,coverage:undefined}));
if(process.argv.includes('--strict')&&issues.length)process.exitCode=1;
