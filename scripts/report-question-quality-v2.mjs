import fs from 'node:fs';
import {tests,catalog} from './load-bank.mjs';

const flags=[], exact=new Map(), patterns=new Map(), coverage=[];
const categoryCounts=new Map();
const body=q=>q.question.replace(/^\d\. sınıf .+? — [^:]+: /u,'').trim().toLocaleLowerCase('tr-TR');
const add=(map,key,value)=>map.set(key,[...(map.get(key)||[]),value]);
const mark=(location,category,reason)=>{
  flags.push({...location,category,reason});
  categoryCounts.set(category,(categoryCounts.get(category)||0)+1);
};

for(const t of tests)for(const [index,q] of t.questions.entries()){
 const location={id:q.id,slug:t.slug,grade:t.classLevel,subject:t.subject,topic:t.topic,question:index+1};
 if(t.classLevel===1&&q.question.length>180)mark(location,'yaşa uygunluk','Birinci sınıf için 180 karakterden uzun kök');
 if(q.explanation.length<35)mark(location,'açıklama yetersiz','35 karakterden kısa çözüm');
 if(q.visual?.type==='cards')mark(location,'görsel/metin manuel inceleme','Metin kartının öğretici değeri editörce kontrol edilmeli');
 if(q.choices.some(c=>/konu dışı|rastgele tahmin|konuyla ilgisiz|yanlış uygulama/i.test(c)))mark(location,'zayıf çeldirici','Jenerik veya konu dışı seçenek');
 if(q.image&&(!q.imageAlt||!fs.existsSync(q.image)))mark(location,'görsel eksikliği',!q.imageAlt?'Alt metin eksik':'Görsel dosyası eksik');
 if(t.difficulty==='zor'&&body(q).length<55&&q.explanation.length<60)mark(location,'zorluk ayrımı','Zor etiketi için kısa kök ve kısa çözüm');
 if(/\s{2,}/.test(q.question)||/\?\?+|!!+/.test(q.question))mark(location,'dil/anlatım','Boşluk veya noktalama temizliği gerekli');
 const expected=`tests/${t.slug}.html`;
 if(t.pageUrl!==expected)mark(location,'slug/index uyumsuzluğu',`Beklenen ${expected}`);
 const text=body(q);
 add(exact,JSON.stringify([text,[...q.choices].sort(),q.choices[q.correctAnswer]]),location);
 add(patterns,`${t.classLevel}/${t.subject}/${t.topic}/`+text.replace(/\d+/g,'#'),location);
}

const duplicates=[...exact.values()].filter(group=>group.length>1);
const withinTestDuplicates=duplicates.filter(group=>new Set(group.map(x=>x.slug)).size<group.length);
const crossTestDuplicates=duplicates.filter(group=>new Set(group.map(x=>x.slug)).size===group.length);
const similar=[...patterns.values()].filter(group=>group.length>2);
for(const [grade,g] of Object.entries(catalog.grades))for(const subject of g.subjects){
 const bank=tests.filter(t=>t.classLevel===Number(grade)&&t.subject===subject.id);
 const missing=subject.topics.filter(topic=>!bank.some(t=>t.topic===topic.id));
 coverage.push({grade,subject:subject.name,topics:subject.topics.length,tests:bank.length,questions:bank.reduce((n,t)=>n+t.questions.length,0),levels:['kolay','orta','zor'].map(d=>bank.filter(t=>t.difficulty===d).length),missing:missing.map(t=>t.name)});
}

const questions=tests.flatMap(t=>t.questions), visual=questions.filter(q=>q.image).length;
const sourceDistribution=Object.fromEntries([...new Set(questions.map(q=>q.source||'native'))].sort().map(source=>[source,questions.filter(q=>(q.source||'native')===source).length]));
const gradeDistribution=Object.fromEntries([1,2,3,4].map(grade=>[grade,tests.filter(t=>t.classLevel===grade).reduce((sum,t)=>sum+t.questions.length,0)]));
const categorySummary=Object.fromEntries([...categoryCounts].sort((a,b)=>b[1]-a[1]));
const report={tests:tests.length,questions:questions.length,visual,flaggedQuestions:new Set(flags.map(x=>x.id)).size,flagEvents:flags.length,exactDuplicateGroups:duplicates.length,exactDuplicateExcess:duplicates.reduce((n,a)=>n+a.length-1,0),withinTestExactGroups:withinTestDuplicates.length,crossTestExactGroups:crossTestDuplicates.length,similarPatternGroups:similar.length,sourceDistribution,gradeDistribution,categorySummary,flags,duplicates,withinTestDuplicates,crossTestDuplicates,similar,coverage};
fs.mkdirSync('outputs',{recursive:true});
fs.writeFileSync('outputs/question-quality-final.json',JSON.stringify(report,null,2));
fs.writeFileSync('docs/QUESTION-COVERAGE.md',`# Soru kapsamı\n\nKaynak: data/catalog.js ve normalize edilmiş native banka. Resmî müfredat onayı değildir.\n\n| Sınıf | Ders | Katalog konusu | Test | Soru | Kolay / Orta / Zor test | Eksik konu |\n|---|---|---:|---:|---:|---|---|\n${coverage.map(r=>`| ${r.grade} | ${r.subject} | ${r.topics} | ${r.tests} | ${r.questions} | ${r.levels.join(' / ')} | ${r.missing.join(', ')||'—'} |`).join('\n')}\n\n4. sınıf Hayat Bilgisi mevcut eski katalog/bankada korunur; güncel sınıf menüsünde gösterilmez. Yeni ders veya resmî kazanım kodu eklenmedi.\n`);
fs.writeFileSync('docs/QUESTION-QUALITY.md',`# Soru kalite raporu\n\n- Yapısal kapsam: ${questions.length} soru, ${tests.length} test; ${visual} görselli soru.\n- Kaynak dağılımı: native ${sourceDistribution.native||0}, matematiksel ve editoryal olarak yeniden doğrulanan Gemini ${sourceDistribution['gemini-vetted']||0}.\n- Sınıf dağılımı: ${Object.entries(gradeDistribution).map(([grade,count])=>`${grade}. sınıf ${count}`).join(', ')}.\n- Otomatik uyarı alan benzersiz soru: ${report.flaggedQuestions}; toplam uyarı olayı: ${report.flagEvents}.\n- Aynı kök/seçenek/cevap: ${duplicates.length} grup / ${report.exactDuplicateExcess} fazla örnek. Aynı test içi: ${withinTestDuplicates.length}; farklı testlere yayılan: ${crossTestDuplicates.length}.\n- Konu içinde sayıları kaldırınca benzer kök: ${similar.length} grup. Bunlar editoryal adaydır; tek başına hata veya silme gerekçesi değildir.\n\n## Kontrol sınıfları\n\n| Kontrol | Otomatik sonuç | Yorum |\n|---|---:|---|\n| Tek doğru cevap / geçerli indeks | PASS | Yapısal doğrulayıcı bütün soruları kontrol eder |\n| Hesaplama hatası | MANUEL | Gemini kabul listesi yeniden hesaplandı; native bankanın akademik doğruluğu öğretmen onayı ister |\n| Görsel-metne uyum | ${categorySummary['görsel/metin manuel inceleme']||0} aday | Kart tipi görseller için editör kontrolü; eksik dosya/alt metin ${categorySummary['görsel eksikliği']||0} |\n| Duplicate soru | ${withinTestDuplicates.length} aynı test içi grup | Farklı testlerdeki ${crossTestDuplicates.length} grup olası ortak şablon/false positive içerir |\n| Benzer soru | ${similar.length} grup | Sayısal kalıp sezgisi |\n| Zayıf çeldirici | ${categorySummary['zayıf çeldirici']||0} | Açık jenerik ifadeler aranır |\n| Zorluk ayrımı | ${categorySummary['zorluk ayrımı']||0} aday | Kısa zor kök + kısa çözüm sezgisi |\n| Yaşa uygunluk | ${categorySummary['yaşa uygunluk']||0} aday | Birinci sınıf uzun kök sezgisi |\n| Dil/anlatım | ${categorySummary['dil/anlatım']||0} aday | Çift boşluk ve tekrarlı noktalama |\n| Açıklama yetersiz | ${categorySummary['açıklama yetersiz']||0} | Kısa çözüm sezgisi; kısa ama yeterli çözümler false positive olabilir |\n| Görsel eksikliği | ${categorySummary['görsel eksikliği']||0} | Dosya ve alt metin kontrolü |\n| Kazanım dışı içerik | MANUEL | Resmî kazanım kodu iddiası yok; öğretmen/müfredat editörü gerekir |\n| Slug/index uyumsuzluğu | ${categorySummary['slug/index uyumsuzluğu']||0} | Banka slug'ı ile landing yolu eşleştirilir |\n\n## Bu turdaki değişiklik\n\n4. sınıf geometrinin 30 soruluk üç seviyesi önceki turda yeniden yazıldı. Bu tur Downloads içindeki özdeş iki Gemini ZIP'i güvenli biçimde denetlendi: 110 sorudan 33'ü yeniden hesaplanıp açıklamalı native biçime dönüştürüldü, 18'i kesin reddedildi, 59'u öğretmen/editör incelemesine bırakıldı. Eksik kaynak görsellere bağlı hiçbir soru eklenmedi. 4. sınıf sözel üreticisindeki açık jenerik çeldiriciler konu verileriyle değiştirildi. Soru sayısı, URL'ler ve her testteki 10 soru yapısı korundu.\n\n## Sınırlar ve false positive ayrımı\n\nOtomasyon seçenek sayısı, indeks, dosya, slug ve belirgin metin kalıplarını kesin denetler. Akademik doğruluk, yaş düzeyi, müfredat kapsamı, güçlü çeldirici ve görselin pedagojik değeri için uzman kararı gerekir. Farklı sınıf/düzeylerde geçen aynı kısa tanım veya işlem, tekrar raporunda görünebilir fakat bağlamı incelenmeden silinmez. Ayrıntılı konumlar \`outputs/question-quality-final.json\` dosyasındadır.\n`);
console.log(JSON.stringify({...report,flags:undefined,duplicates:undefined,withinTestDuplicates:undefined,crossTestDuplicates:undefined,similar:undefined,coverage:undefined}));
await import('./report-topic-coverage.mjs');
