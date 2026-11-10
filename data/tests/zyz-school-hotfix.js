// Individually reviewed corrections for four school-life questions; keep IDs and routes.
(function(){
  const slug='1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1';
  const patches=[
    {index:2,question:'Elif konuşmak istiyor. Arkadaşı henüz sözünü bitirmedi. Elif ne yapmalıdır?',choices:['Arkadaşının sözünü bitirmesini beklemelidir.','Arkadaşının sözünü kesmelidir.','Herkesten daha yüksek sesle konuşmalıdır.'],correctAnswer:0,explanation:'Arkadaşını dinleyip onun sözünü bitirmesini beklemek, herkesin kendini anlatmasına yardımcı olur.',subSkill:'Söz sırasına saygı'},
    {index:4,question:'Sınıfta söz almak isteyen Elif parmak kaldırıyor. Bu davranışın yararı nedir?',choices:['Herkesin sırayla konuşup birbirini dinlemesine yardımcı olur.','Arkadaşlarının hiç konuşmamasını sağlar.','Dersi hemen bitirir.'],correctAnswer:0,explanation:'Söz alarak konuşmak, konuşan kişinin dinlenmesini ve diğerlerinin de sırayla söz almasını kolaylaştırır.',subSkill:'Sınıfta iletişim'},
    {index:6,question:'Öğrenciler okul koridorunda neden koşmadan yürümelidir?',choices:['Çarpma ve düşme riskini azaltmaya yardımcı olmak için','Ders araçlarını daha hızlı toplamak için','Arkadaşlarının sözünü kesmek için'],correctAnswer:0,explanation:'Koridorda sakin yürümek, başkalarıyla çarpışma ve düşme riskini azaltmaya yardımcı olur.',subSkill:'Koridor güvenliği'},
    {index:9,question:'Okula yeni gelen Ece sınıfının yerini bulamıyor. Arkadaşı ona sınıfın yerini gösterirse neye yardımcı olur?',choices:['Ece’nin sınıfını bulmasına','Sınıftaki herkesin aynı anda konuşmasına','Ders araçlarının kendiliğinden toplanmasına'],correctAnswer:0,explanation:'Sınıfın yerini göstermek, Ece’nin aradığı sınıfa ulaşmasına yardımcı olur.',subSkill:'Okulda yardımlaşma'}
  ];
  const test=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===slug);
  if(!test)return;
  for(const patch of patches){
    const question=test.questions[patch.index];
    if(!question)throw new Error('Missing reviewed school question: '+slug);
    const {index,...fields}=patch;
    Object.assign(question,fields,{options:patch.choices.slice(),questionType:'cikarim',image:null,visual:null,hasVisual:false});
    delete question.imageAlt;
  }
})();
