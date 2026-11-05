// Seven individually reviewed safety corrections. IDs and routes remain unchanged.
(function(){
  const patches=[
  {
    "slug": "2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 2,
    "question": "Merve evde üzerinde adı yazan bir ilaç kutusu buldu. Kendini yorgun hissettiği için ilacı içmeyi düşünüyor. Ne yapmalıdır?",
    "choices": [
      "Kutudaki miktarın yarısını içmelidir.",
      "İlacı arkadaşına verip önce onun denemesini istemelidir.",
      "İlacı kullanmadan güvendiği bir yetişkine haber vermelidir."
    ],
    "correctAnswer": 2,
    "explanation": "Yanlış ilaç veya doz sağlığa zarar verebilir. Çocuklar ilaç kullanmadan önce yetişkin ve sağlık uzmanı desteği almalıdır."
  },
  {
    "slug": "2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 6,
    "question": "Yaya ışığı yeşile döndü. Karşıya geçmeye hazırlanan çocuk, bir aracın geçide doğru yaklaştığını görüyor. Ne yapmalıdır?",
    "choices": [
      "Yola çıkmadan güvenli geçişi bekleyip trafiği kontrol etmelidir.",
      "Yeşil yandığı için araca bakmadan koşmalıdır.",
      "Park etmiş araçların arasından yola çıkmalıdır."
    ],
    "correctAnswer": 0,
    "explanation": "Yeşil ışıkta da araçların durumuna dikkat etmek ve güvenli geçişten emin olmak gerekir."
  },
  {
    "slug": "2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 9,
    "question": "Bora öksürürken mendilini kullandı. Sonra ellerini sabunla yıkadı. Bu davranışların ortak amacı nedir?",
    "choices": [
      "Damlacıkların ve mikropların çevreye yayılmasını azaltmak",
      "Uyku süresini uzatmak",
      "Yemeklerin daha hızlı pişmesini sağlamak"
    ],
    "correctAnswer": 0,
    "explanation": "Öksürürken ağız ve burnu kapatmak ile el yıkamak, mikropların çevreye yayılmasını azaltmaya yardımcı olur."
  },
  {
    "slug": "3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 2,
    "question": "Bir arkadaşın kendine ait ilacı sana verip baş ağrın için kullanmanı öneriyor. En uygun karar hangisidir?",
    "choices": [
      "Arkadaşımın kullandığı miktarı içmek",
      "İlacı ikiye bölüp denemek",
      "İlacı kullanmayıp durumumu güvendiğim bir yetişkine söylemek"
    ],
    "correctAnswer": 2,
    "explanation": "Başkasına verilen ilacın uygunluğu ve dozu farklı olabilir. İlaç kullanmadan önce yetişkin ve sağlık uzmanı desteği gerekir."
  },
  {
    "slug": "3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 6,
    "question": "Elif yalnızca kraker içeren beslenme çantasına seçenek eklemek istiyor. Hangisi farklı besinler içeren bir öğün oluşturmaya daha çok yardımcı olur?",
    "choices": [
      "Meyve ve peynirli sandviç eklemek",
      "Yalnızca ikinci bir paket kraker eklemek",
      "Yalnızca şekerli içecek eklemek"
    ],
    "correctAnswer": 0,
    "explanation": "Farklı besinler eklemek, yalnızca krakerden oluşan öğüne çeşitlilik kazandırmaya yardımcı olur."
  },
  {
    "slug": "3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1",
    "index": 9,
    "question": "Tanımadığın biri okuldan ailene haber vermeden kendisiyle gitmeni istiyor. Hangi adımlar daha uygundur?",
    "choices": [
      "Gitmeyip güvenli bir yerde öğretmene veya güvendiğim bir yetişkine haber vermek",
      "Kişi acele ettiğini söylediği için onunla hemen gitmek",
      "Nereye gittiğimi öğretmenimden gizlemek"
    ],
    "correctAnswer": 0,
    "explanation": "Tanımadığın kişiyle gitmeden güvenli bir yerde kalıp güvendiğin bir yetişkine durumu anlatmalısın."
  },
  {
    "slug": "3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1",
    "index": 5,
    "question": "Bir yaya, geçitte yeşil ışığı bekledikten sonra çevresindeki araçları da kontrol ediyor. Bu davranışın amacı nedir?",
    "choices": [
      "Dengeli besin alımını sağlamak",
      "Dişleri temizlemek",
      "Karşıya güvenli geçişe yardımcı olmak"
    ],
    "correctAnswer": 2,
    "explanation": "Yaya ışığı ve araç kontrolü karşıya geçerken trafik durumunu değerlendirmeye yardımcı olur."
  }
];
  for(const patch of patches){
    const test=(window.TESTCOZ_TESTS||[]).find(t=>t.slug===patch.slug);
    if(!test)continue;
    const question=test.questions[patch.index];
    if(!question)throw new Error('Missing reviewed safety question: '+patch.slug);
    Object.assign(question,{question:patch.question,choices:patch.choices,options:patch.choices.slice(),correctAnswer:patch.correctAnswer,explanation:patch.explanation,image:null,visual:null,hasVisual:false});
    delete question.imageAlt;
  }
})();
