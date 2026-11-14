// Individually reviewed first-grade health and safety corrections.
(function(){
  const slug='1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1';
  const patches=[
    {index:1,question:'Evde bir yetişkinle birliktesin. Tanımadığın biri kapıyı çalıyor. Ne yapmalısın?',choices:['Kapıyı açmadan yetişkine haber vermeliyim.','Kapıyı açıp içeri çağırmalıyım.','Kapıyı açıp dışarı çıkmalıyım.'],correctAnswer:0,explanation:'Tanımadığın biri kapıyı çaldığında kapıyı açmadan yanındaki yetişkine haber vermelisin.',subSkill:'Kapı güvenliği'},
    {index:5,question:'Yerde bir ilaç buldun. Ne yapmalısın?',choices:['İlacı almadan bir yetişkine haber vermeliyim.','İlacın tadına bakmalıyım.','İlacı arkadaşıma vermeliyim.'],correctAnswer:0,explanation:'İlaçları kendi başımıza kullanmak tehlikeli olabilir. Bulduğun ilacı almadan bir yetişkine haber vermelisin.',subSkill:'İlaç güvenliği'},
    {index:0,question:'Mutfak zemini ıslak. Ne yapmalısın?',choices:['Islak yerden uzak durup bir yetişkine haber vermeliyim.','Islak yerde koşmalıyım.','Suyla oynamalıyım.'],correctAnswer:0,explanation:'Islak zemin kaymaya neden olabilir. Islak yerden uzak durup bir yetişkine haber vermelisin.',subSkill:'Kaygan zemin güvenliği'},
    {index:2,question:'Arkadaşın bahçede düştü ve dizi kanıyor. Ne yapmalısın?',choices:['Bir öğretmene haber vermeliyim.','Onunla alay etmeliyim.','Yardım istemeden oyuna devam etmeliyim.'],correctAnswer:0,explanation:'Arkadaşın yaralandığında öğretmene haber vererek yardım almasını sağlayabilirsin.',subSkill:'Yaralanmada yardım isteme'},
    {index:3,question:'Topun yola kaçtı. Ne yapmalısın?',choices:['Yola çıkmadan bir yetişkinden yardım istemeliyim.','Hemen topun peşinden yola koşmalıyım.','Arabaların arasından geçmeliyim.'],correctAnswer:0,explanation:'Yola koşmak tehlikelidir. Yola çıkmadan bir yetişkinden yardım istemelisin.',subSkill:'Trafikte oyun güvenliği'},
    {index:7,question:'Yangından uzaklaşıp güvenli yere çıktın. Bir yetişkinle yardım çağırmak için hangi numarayı ararsın?',choices:['112','123','456'],correctAnswer:0,explanation:'Yangında güvenli yere çıkıp bir yetişkine haber ver. Güvenli bir yerden 112 aranarak yardım istenir.',subSkill:'Yangında yardım isteme'},
    {index:4,question:'Yemekten önce ellerimizi neden sabunla yıkarız?',choices:['Ellerimizdeki mikropları uzaklaştırmaya yardımcı olmak için','Ayakkabılarımızı temizlemek için','Okul çantamızı düzenlemek için'],correctAnswer:0,explanation:'Ellerimizi su ve sabunla yıkamak, ellerimizdeki mikropların uzaklaşmasına yardımcı olur.',subSkill:'El temizliği'},
    {index:6,question:'İnternette tanımadığın biri ev adresini soruyor. Ne yapmalısın?',choices:['Adresimi paylaşmayıp güvendiğim bir yetişkine haber vermeliyim.','Adresimi hemen göndermeliyim.','Ailemin telefonunu da göndermeliyim.'],correctAnswer:0,explanation:'Adres gibi kişisel bilgileri tanımadığın kişilerle paylaşmamak ve bir yetişkinden yardım istemek güvenliğine yardımcı olur.',subSkill:'Kişisel bilgileri koruma'},
    {index:8,question:'Dişlerini fırçalayan Ece hangi fırçayı kullanmalıdır?',choices:['Kendi diş fırçasını','Arkadaşının diş fırçasını','Kardeşinin kullandığı diş fırçasını'],correctAnswer:0,explanation:'Diş fırçası kişisel bir eşyadır. Başkasının fırçasını kullanmak yerine kendi fırçamızı kullanırız.',subSkill:'Kişisel temizlik'},
    {index:9,question:'Evde bir cihazın kablosunun yıprandığını gördün. Ne yapmalısın?',choices:['Cihaza dokunmadan bir yetişkine haber vermeliyim.','Kabloyu elimle düzeltmeye çalışmalıyım.','Cihazı kullanmaya devam etmeliyim.'],correctAnswer:0,explanation:'Yıpranmış kablo tehlikeli olabilir. Cihaza dokunmadan güvendiğin bir yetişkine haber vermelisin.',subSkill:'Elektrik güvenliği'}
  ];
  const test=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===slug);
  if(!test)return;
  for(const patch of patches){
    const question=test.questions[patch.index];if(!question)throw new Error('Missing first-grade safety question: '+slug);
    const {index,...fields}=patch;
    Object.assign(question,fields,{options:patch.choices.slice(),questionType:'cikarim',image:null,visual:null,hasVisual:false});
    delete question.imageAlt;
  }
})();

// A specific, age-appropriate hygiene scenario replaces an ambiguous generic safety sequence.
(function(){
  const slug='1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1';
  const test=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===slug);if(!test)return;
  const question=test.questions[1];if(!question)throw new Error('Missing first-grade medium safety question');
  const choices=['İkisinin de ellerini yıkamaması','Elif’in ellerini yıkaması','Can’ın ellerini peçeteyle silmesi','Elif’in ellerini yıkamaması'];
  Object.assign(question,{question:'Elif ellerini sabunla ovuşturup suyla duruluyor. Can ise yalnızca peçeteyle siliyor. Hangi davranış el temizliğine daha çok yardımcı olur?',choices,options:choices.slice(),correctAnswer:1,explanation:'Ellerini sabun ve suyla yıkamak, ellerdeki kirin ve mikropların azalmasına yardımcı olur.',subSkill:'El temizliği',questionType:'cikarim',image:null,visual:null,hasVisual:false});
  delete question.imageAlt;
})();
