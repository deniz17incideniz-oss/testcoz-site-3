import fs from 'node:fs';
import {tests,catalog} from './load-bank.mjs';
let out='\n## Konu ve seviye ayrıntısı\n\n| Sınıf | Ders | Konu | Kolay | Orta | Zor | Soru | Görselli soru |\n|---|---|---|---:|---:|---:|---:|---:|\n';
for(const [grade,g]of Object.entries(catalog.grades))for(const s of g.subjects)for(const topic of s.topics){const list=tests.filter(t=>t.classLevel===Number(grade)&&t.subject===s.id&&t.topic===topic.id);const qs=list.flatMap(t=>t.questions);out+=`| ${grade} | ${s.name} | ${topic.name} | ${['kolay','orta','zor'].map(d=>list.filter(t=>t.difficulty===d).length).join(' | ')} | ${qs.length} | ${qs.filter(q=>q.image).length} |\n`;}
fs.appendFileSync('docs/QUESTION-COVERAGE.md',out);
