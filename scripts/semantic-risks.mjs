// Evidence-led triage, not a claim to understand or certify every question.
export function inspectSemanticRisk(t,q){
 const flags=[];
 const add=(code,reason)=>flags.push({code,reason});
 if(/correct translation for .+ in an English story/i.test(q.question))add('translation_template','Unrelated vocabulary template; inspect the topic and difficulty.');
 if(/^(Soruyla anlamlı biçimde eşleşen cevap doğru seçenektir|Cevap metinde açıkça verilmiştir|Soruya uygun bilgi doğru cevapta verilmiştir|Kelime ve anlamı doğru eşleştirilmiştir|Başlık cümledeki olayı yansıtır|Metnin temasıyla en yakın düşünce doğru seçenektedir)[.!]?$/u.test(q.explanation.trim()))add('generic_explanation','Explanation gives no question-specific evidence.');
 if(/Soru düzeltmesi:|sadece .+ soruluyor/.test(q.question))add('editorial_debris','Editing instructions remain in the student question.');
 if(t.subject==='ingilizce'&&t.topic==='family-life'&&!/mother|father|mum|mom|dad|sister|brother|aunt|uncle|cousin|family|grand|parents|aile|anne|baba|kardeş/iu.test(q.question+' '+q.choices.join(' ')))add('family_topic_mismatch','No family relationship or family situation in question or options.');
 if(q.choices.some(c=>/konu dışı|rastgele tahmin|konuyla ilgisiz|yanlış uygulama/u.test(c)))add('generic_distractor','Option can be rejected without using subject knowledge.');
 if(t.difficulty==='zor'&&/^(What is the correct translation|[“"].+[”"] kelimesinin Türkçe anlamı)/u.test(q.question))add('recall_only_hard','Direct translation needs difficulty review.');
 // Deliberately limited arithmetic coverage: only explicit one-operation questions.
 const m=q.question.match(/(?:^|[“"]|\s)(\d+)\s*([+×÷−])\s*(\d+)\s*(?:=\s*\?|işleminin sonucu)/u);
 if(m&&/^\d+(?:[.,]\d+)?$/.test(q.choices[q.correctAnswer]||'')){
  const a=Number(m[1]),b=Number(m[3]),expected={'+':()=>a+b,'×':()=>a*b,'÷':()=>a/b,'−':()=>a-b}[m[2]]();
  const actual=Number(q.choices[q.correctAnswer].replace(',','.'));
  if(Number.isFinite(expected)&&actual!==expected)add('arithmetic_mismatch',`Explicit operation yields ${expected}; keyed option is ${actual}.`);
 }
 return flags;
}
