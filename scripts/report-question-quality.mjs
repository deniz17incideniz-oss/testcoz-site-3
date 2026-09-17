import fs from 'node:fs';
import {tests,catalog} from './load-bank.mjs';
const flags=[],exact=new Map(),patterns=new Map(),coverage=[];
const body=q=>q.question.replace(/^\d\. sınıf .+? — [^:]+: /u,'').trim().toLocaleLowerCase('tr-TR');
const add=(map,key,id)=>map.set(key,[...(map.get(key)||[]),id]);
for(const t of tests)for(const q of t.questions){
 const reasons=[];
 if(t.classLevel===1&&q.question.length>180)reasons.push('Uzun birinci sınıf soru kökü');
 if(q.explanation.length<35)reasons.push('Kısa açıklama');
 if(q.visual?.type==='cards')reasons.push('Metin kartının öğretici değeri');
 if(q.choices.some(c=>/konu dışı|rastgele tahmin|konuyla ilgisiz|yanlış uygulama/i.test(c)))reasons.push('Zayıf çeldirici');
 if(reasons.length)flags.push({id:q.id,reasons});
 const text=body(q);add(exact,JSON.stringify([text,[...q.choices].sort(),q.choices[q.correctAnswer]]),q.id);
 add(patterns,`${t.classLevel}/${t.subject}/${t.topic}/`+text.replace(/\d+/g,'#'),q.id);
}
const duplicates=[...exact.values()].filter(a=>a.length>1),similar=[...patterns.values()].filter(a=>a.length>2);
for(const [grade,g] of Object.entries(catalog.grades))for(const subject of g.subjects){
 const bank=tests.filter(t=>t.classLevel===Number(grade)&&t.subject===subject.id);
 const missing=subject.topics.filter(topic=>!bank.some(t=>t.topic===topic.id));
 coverage.push({grade,subject:subject.name,topics:subject.topics.length,tests:bank.length,questions:bank.reduce((n,t)=>n+t.questions.length,0),levels:['kolay','orta','zor'].map(d=>bank.filter(t=>t.difficulty===d).length),missing:missing.map(t=>t.name)});
}
const questions=tests.flatMap(t=>t.questions),visual=questions.filter(q=>q.image).length;
const report={tests:tests.length,questions:questions.length,visual,flagged:flags.length,exactDuplicateGroups:duplicates.length,exactDuplicateExcess:duplicates.reduce((n,a)=>n+a.length-1,0),similarPatternGroups:similar.length,flags,duplicates,similar,coverage};
fs.mkdirSync('outputs',{recursive:true});fs.writeFileSync('outputs/question-quality-final.json',JSON.stringify(report,null,2));
fs.writeFileSync('docs/QUESTION-COVERAGE.md',`# Soru kapsamı\n\nKaynak: data/catalog.js ve normalize edilmiş native banka. Resmî müfredat onayı değildir.\n\n| Sınıf | Ders | Katalog konusu | Test | Soru | Kolay / Orta / Zor test | Eksik konu |\n|---|---|---:|---:|---:|---|---|\n${coverage.map(r=>`| ${r.grade} | ${r.subject} | ${r.topics} | ${r.tests} | ${r.questions} | ${r.levels.join(' / ')} | ${r.missing.join(', ')||'—'} |`).join('\n')}\n\n4. sınıf Hayat Bilgisi mevcut eski katalog/bankada korunur; güncel sınıf menüsünde gösterilmez. Yeni ders veya resmî kazanım kodu eklenmedi.\n`);
fs.writeFileSync('docs/QUESTION-QUALITY.md',`# Soru kalite raporu\n\nGemini dosyaları workspace içinde bulunamadı. İlgili kullanıcı eklerinde de eşleşen MD/ZIP yok.\n\n- Yapısal doğrulama kapsamı: ${questions.length} soru, ${tests.length} test. Akademik doğruluk onayı değildir.\n- Bu tur eklenen: 0. Düzeltilen: 30 geometri sorusu (eski cevap ifşa eden kalıpların yerine).\n- Çıkarılan soru: 0; slug, test sayısı ve on soruluk yapı korundu.\n- Görselli soru: ${visual}. Bu tur yeni görsel: 0.\n- Otomatik editoryal uyarı: ${flags.length} soru.\n- Öneklerden arındırılmış aynı kök/seçenek/cevap: ${duplicates.length} grup, ilk örnekler dışındaki ${report.exactDuplicateExcess} tekrar adayı.\n- Konu içinde sayıları kaldırınca benzer kök: ${similar.length} grup. Bu bir benzerlik sezgisidir; aynı isim veya matematiksel yapı için tam anlamsal çözümleme değildir.\n\n## Yapılan editoryal değişiklik\n\n4. sınıf geometri kolay düzeyde yüz/köşe/ayrıt tanıma, orta düzeyde özelliklerin kullanımı, zor düzeyde tel uzunluğu, birleştirilen küpler ve malzeme kısıtı içerir. Çözümler işlem adımlarını açıklar. 4. sınıf üreticisinde doğru cevabın sürekli A olması engellendi; metne bağlı kararlı seçenek döndürme uygulanır.\n\n## Yayın öncesi editör incelemesi\n\nMevcut bankanın tamamında pedagojik kalite gate'i henüz geçmedi. Özellikle 4. sınıf sözel üreticisindeki genel çeldiriciler, yalnız sayı büyüten matematik şablonları ve metin kartları yeniden yazılmalı. Toplu silme yapılmadı; tekrar adayları öğrenme hedefi ve seçenekleriyle karşılaştırılmadan kaldırılmamalı. Zorluk etiketleri tek başına bilişsel kalite kanıtı değildir.\n\nTekrar/uyarı kimlikleri outputs/question-quality-final.json dosyasında; npm run audit:questions ile yeniden üretilebilir. Bu rapor bitmiş öğretmen kontrolü veya AdSense kabul garantisi değildir.\n`);
console.log(JSON.stringify({...report,flags:undefined,duplicates:undefined,similar:undefined,coverage:undefined}));
await import('./report-topic-coverage.mjs');
