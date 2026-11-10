// Individually reviewed first-grade health and safety corrections.
(function(){
  const slug='1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1';
  const patches=[
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
