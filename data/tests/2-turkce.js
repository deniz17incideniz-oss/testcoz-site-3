/* 2. sınıf Türkçe testleri — Türkiye Yüzyılı Maarif Modeli tema kapsamı.
   Sorular ortak test motorunda çalışır; görseller üretim betiğiyle SVG'ye dönüştürülür. */
(function () {
  const difficulties = ["kolay", "orta", "zor"];

  function visual(title, data) {
    return { type: "cards", title: title, data: data };
  }

  function q(question, choices, correct, explanation, picture) {
    const correctAnswer = choices.indexOf(correct);
    if (correctAnswer < 0) throw new Error("Doğru cevap seçeneklerde yok: " + question);
    return { question: question, choices: choices, correctAnswer: correctAnswer, explanation: explanation, image: null, visual: picture || null };
  }

  const themes = {
    "degerlerimizle-variz": {
      name: "Değerlerimizle Varız", hero: "Ada", place: "sınıf kitaplığı", object: "hikâye kitapları", objectAcc: "hikâye kitaplarını",
      action: "kitapları arkadaşlarıyla adil biçimde paylaştı", result: "her grup okuyacağı kitaba ulaştı",
      value: "dayanışma", opposite: "bencillik", word: "dayanışma", syllables: "da-ya-nış-ma",
      near: "yardımlaşma", title: "Birlikte Okuyan Sınıf", detail: "kitap sayısı az olan gruba kendi kitabını verdi",
      order: ["Gruplar kitapları saydı", "Ada paylaşım önerisi sundu", "Kitaplar gruplara eşitçe dağıtıldı"],
      quote: "Herkesin okuyabilmesi için paylaşalım.", reason: "herkesin etkinliğe eşit biçimde katılması",
      inference: "Ada adaletli ve yardımsever davranmıştır", responsibility: "ortak eşyaları özenli kullanmak"
    },
    "ataturk-ve-cocuk": {
      name: "Atatürk ve Çocuk", hero: "Ege", place: "okul sergisi", object: "Atatürk'e ait bilgi kartları", objectAcc: "Atatürk'e ait bilgi kartlarını",
      action: "Atatürk'ün çocuklarla ilgili sözlerini dikkatle okudu", result: "çocuklara duyduğu güveni daha iyi anladı",
      value: "çocuklara değer vermek", opposite: "çocukların düşüncelerini küçümsemek", word: "lider", syllables: "li-der",
      near: "önder", title: "Atatürk'ün Çocuklara Güveni", detail: "23 Nisan'ın çocuklara armağan edildiğini öğrendi",
      order: ["Ege sergiyi gezdi", "Bilgi kartlarını not aldı", "Öğrendiklerini sınıfta anlattı"],
      quote: "Çocuklar geleceğin umududur.", reason: "Atatürk'ün çocuklara verdiği önemi öğrenmek",
      inference: "Ege tarihini merak eden dikkatli bir öğrencidir", responsibility: "millî değerlere saygılı davranmak"
    },
    "dogada-neler-oluyor": {
      name: "Doğada Neler Oluyor?", hero: "Nehir", place: "okul bahçesi", object: "mevsim gözlem kartları", objectAcc: "mevsim gözlem kartlarını",
      action: "ağaçtaki değişimleri bir hafta boyunca gözlemledi", result: "hava ile bitkiler arasındaki ilişkiyi fark etti",
      value: "doğayı gözlemlemek", opposite: "çevredeki değişimleri önemsememek", word: "mevsim", syllables: "mev-sim",
      near: "yılın dönemi", title: "Bahçedeki Değişimin İzinde", detail: "soğuyan havada yaprakların sarardığını yazdı",
      order: ["Nehir gözlem yapacağı ağacı seçti", "Değişimleri tarihleriyle kaydetti", "Notlarını karşılaştırıp sonuç çıkardı"],
      quote: "Yapraklar geçen haftadan daha sarı.", reason: "doğadaki değişimin nedenini anlamak",
      inference: "Nehir sabırlı ve dikkatli bir gözlemcidir", responsibility: "gözlem yaparken canlılara zarar vermemek"
    },
    "okuma-seruvenimiz": {
      name: "Okuma Serüvenimiz", hero: "Can", place: "kütüphane", object: "öykü kitabı", objectAcc: "öykü kitabını",
      action: "okuduğu bölümün önemli yerlerini küçük notlarla belirledi", result: "öykünün olay sırasını daha kolay anlattı",
      value: "anlayarak okumak", opposite: "metni düşünmeden geçmek", word: "okur", syllables: "o-kur",
      near: "kitap okuyucusu", title: "Can'ın Okuma Haritası", detail: "kahramanın sorununu ve çözümünü ayrı ayrı yazdı",
      order: ["Can kitabın başlığını inceledi", "Metni dikkatle okudu", "Ana düşünceyi kendi sözleriyle anlattı"],
      quote: "Bu bölümde kahraman önemli bir karar verdi.", reason: "metni doğru anlayıp yorumlamak",
      inference: "Can okuma sürecini planlayan bilinçli bir okurdur", responsibility: "ödünç aldığı kitabı temiz ve zamanında teslim etmek"
    },
    "yeteneklerimizi-taniyoruz": {
      name: "Yeteneklerimizi Tanıyoruz", hero: "Selin", place: "müzik odası", object: "ritim ve nota kartları", objectAcc: "ritim ve nota kartlarını",
      action: "zorlandığı ritmi küçük bölümlere ayırarak çalıştı", result: "ezgiyi arkadaşlarıyla uyum içinde çaldı",
      value: "azimle çalışmak", opposite: "ilk denemede vazgeçmek", word: "beceri", syllables: "be-ce-ri",
      near: "yetenek", title: "Ritmi Adım Adım Öğrenmek", detail: "her provadan sonra geliştireceği bölümü belirledi",
      order: ["Selin ritmi dinledi", "Zor bölümleri tekrar etti", "Grup gösterisine katıldı"],
      quote: "Çalıştıkça daha iyi yapıyorum.", reason: "yeteneğini düzenli çalışmayla geliştirmek",
      inference: "Selin kendi gelişimini izleyen kararlı bir öğrencidir", responsibility: "çalışırken arkadaşlarının emeğine saygı duymak"
    },
    "mucit-cocuk": {
      name: "Mucit Çocuk", hero: "Aras", place: "tasarım atölyesi", object: "geri dönüşüm malzemeleri", objectAcc: "geri dönüşüm malzemelerini",
      action: "kalemleri düzenleyen bir kutu tasarladı", result: "masadaki araçlar kolayca bulunur hâle geldi",
      value: "üreterek çözüm bulmak", opposite: "sorunu görüp hiçbir şey denememek", word: "tasarım", syllables: "ta-sa-rım",
      near: "planlanmış ürün", title: "Aras'ın Düzenleyici Kutusu", detail: "ilk model devrilince tabanını genişletti",
      order: ["Aras masadaki sorunu belirledi", "Çözümünü çizip model yaptı", "Modeli deneyerek geliştirdi"],
      quote: "İlk denemem çalışmadı ama nedenini bulabilirim.", reason: "günlük bir soruna kullanışlı çözüm üretmek",
      inference: "Aras hatalarından öğrenen yaratıcı bir çocuktur", responsibility: "araçları güvenli ve amacına uygun kullanmak"
    },
    "kultur-hazinemiz": {
      name: "Kültür Hazinemiz", hero: "Zeynep", place: "yerel kültür müzesi", object: "geleneksel eşya kartları", objectAcc: "geleneksel eşya kartlarını",
      action: "eşyaların geçmişte nasıl kullanıldığını rehberden dinledi", result: "kültürel mirasın günlük yaşamla bağını öğrendi",
      value: "kültürel mirası korumak", opposite: "eski eserleri değersiz görmek", word: "kültür", syllables: "kül-tür",
      near: "ortak yaşam birikimi", title: "Geçmişten Gelen İzler", detail: "el dokuması kilimdeki motiflerin anlamını öğrendi",
      order: ["Zeynep eserleri dikkatle inceledi", "Rehbere sorular sordu", "Öğrendiklerini sınıf panosunda paylaştı"],
      quote: "Bu motif ailelerin birlik olmasını anlatıyor.", reason: "geçmişten gelen değerleri tanıyıp korumak",
      inference: "Zeynep kültürel mirasa ilgi ve saygı duyar", responsibility: "müzedeki eserlere dokunmadan incelemek"
    },
    "haklarimizi-biliyoruz": {
      name: "Haklarımızı Biliyoruz", hero: "Mina", place: "sınıf toplantısı", object: "görüş kartları", objectAcc: "görüş kartlarını",
      action: "konuşma sırası geldiğinde düşüncesini açıkça söyledi", result: "farklı görüşler dinlenerek ortak karar alındı",
      value: "haklara saygı göstermek", opposite: "yalnız kendi görüşünü doğru saymak", word: "adalet", syllables: "a-da-let",
      near: "hakkaniyet", title: "Herkesin Sözü Değerli", detail: "kendi önerisinden farklı olan görüşü de dikkatle dinledi",
      order: ["Sınıf sorunu belirledi", "Herkes sırayla görüşünü açıkladı", "Öneriler değerlendirilip karar verildi"],
      quote: "Benim konuşma hakkım olduğu gibi arkadaşlarımın da var.", reason: "herkesin görüşünü özgürce ve saygıyla paylaşabilmesi",
      inference: "Mina haklarla sorumlulukları birlikte düşünür", responsibility: "kendi hakkını kullanırken başkasının hakkını engellememek"
    }
  };

  function easy(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında " + t.action + ". Bu davranışın temelinde hangi düşünce vardır?", [t.value, t.opposite, "acele etmek", "konuyu değiştirmek"], t.value, "Davranış, “" + t.value + "” düşüncesini açıkça gösterir."),
      q("Görselde " + t.name + " temasına ait sözcük kartları vardır. Temayla en yakından ilgili sözcük hangisidir?", [t.word, "rastlantı", "sessizlik", "uzaklık"], t.word, "“" + t.word + "” sözcüğü temanın içeriğiyle doğrudan ilişkilidir.", visual("Tema sözcükleri", { word: t.word, value: t.value, object: t.object })),
      q("“" + t.word + "” sözcüğü hangi seçenekte doğru hecelenmiştir?", [t.syllables, t.word, t.word.split("").join("-"), t.word + "-lik"], t.syllables, "Doğru heceleme “" + t.syllables + "” biçimindedir."),
      q(t.name + " temasındaki seçeneklerden hangisi tamamlanmış ve anlamlı bir cümledir?", [t.hero + " " + t.objectAcc + " dikkatle inceledi.", t.place + " içindeki", "özenli " + t.object, t.reason + " için"], t.hero + " " + t.objectAcc + " dikkatle inceledi.", "Tamamlanmış cümle bir yargı bildirir."),
      q(t.name + " olayının üç adımı görselde verilmiştir. İlk adım hangisidir?", [t.order[0], t.order[1], t.order[2], t.result], t.order[0], "Olay “" + t.order[0] + "” adımıyla başlar.", visual("Olay sırası", { first: t.order[0], second: t.order[1], third: t.order[2] })),
      q("“" + t.quote + "” cümlesinin sonuna hangi noktalama işareti getirilmelidir?", ["Nokta (.)", "Soru işareti (?)", "Virgül (,)", "Kısa çizgi (-)"], "Nokta (.)", "Cümle bir düşünce bildirir ve noktayla tamamlanır."),
      q(t.hero + " ile ilgili metinde hangi ayrıntı açıkça verilmiştir?", [t.detail, "erkenden uyudu", "oyuncağını kaybetti", "başka şehre gitti"], t.detail, "Metindeki belirgin ayrıntı “" + t.detail + "” ifadesidir."),
      q(t.name + " temasındaki görselde hangi sözcük çifti anlam bakımından birbirine yakındır?", [t.word + " — " + t.near, t.word + " — " + t.opposite, "uzun — kısa", "erken — geç"], t.word + " — " + t.near, "“" + t.word + "” ile “" + t.near + "” bu metinde yakın anlamlıdır.", visual("Yakın anlamlı sözcükler", { first: t.word, second: t.near })),
      q(t.hero + " adlı öğrencinin davranışının sonucu hangisidir?", [t.result, t.opposite, t.reason, "olay yarım kalmıştır"], t.result, "Metinde davranışın sonucu “" + t.result + "” olarak verilmiştir."),
      q(t.name + " metni için görseldeki başlıklardan hangisi en uygundur?", [t.title, "Beklenmeyen Yağmur", "Kayıp Anahtar", "Sessiz Sokak"], t.title, "“" + t.title + "” olayın konusunu en iyi özetler.", visual("Başlık seçelim", { title: t.title, hero: t.hero, place: t.place }))
    ];
  }

  function medium(t) {
    return [
      q(t.hero + " önce durumu dikkatle inceledi, sonra " + t.action + ". Bu bilgilerden hangi sonuca ulaşılır?", [t.inference, t.hero + " gelişigüzel davranmıştır", t.hero + " hiçbir çözüm aramamıştır", t.hero + " olaydan habersizdir"], t.inference, "Davranış ve süreç, " + t.inference.toLocaleLowerCase("tr-TR") + " sonucunu destekler."),
      q(t.name + " görselinde " + t.hero + " adlı öğrencinin yaptığı işler sıralanıyor. İkinci adım hangisidir?", [t.order[1], t.order[0], t.order[2], t.result], t.order[1], "Üç adımlı olayın ortasında “" + t.order[1] + "” vardır.", visual("Önce, sonra, en son", { first: t.order[0], second: t.order[1], third: t.order[2] })),
      q("Karışık sözcüklerle anlamlı cümle kurulacaktır: “" + t.objectAcc + " / " + t.hero + " / dikkatle / inceledi”. Doğru cümle hangisidir?", [t.hero + " " + t.objectAcc + " dikkatle inceledi.", t.objectAcc + " inceledi " + t.hero + " dikkatle.", "Dikkatle " + t.hero + " inceledi " + t.objectAcc + ".", "İnceledi dikkatle " + t.objectAcc + "."], t.hero + " " + t.objectAcc + " dikkatle inceledi.", "Sözcükler anlamlı ve kurallı bir cümle oluşturacak sıraya konmuştur."),
      q("Metinde geçen “" + t.word + "” sözcüğünün bu bağlamdaki anlamına en yakın ifade hangisidir?", [t.near, t.opposite, "bir sayı adı", "yalnızca bir renk"], t.near, "Metnin bağlamında “" + t.word + "”, “" + t.near + "” anlamına yakındır."),
      q("Konuşma balonunda “" + t.quote + "” yazıyor. Bu sözün söylenme amacı nedir?", [t.reason, t.opposite, "konuyu dağıtmak", "kimseyi dinlememek"], t.reason, "Sözün anlamı, amacın " + t.reason + " olduğunu gösterir.", visual("Konuşma balonu", { speaker: t.hero, text: t.quote })),
      q(t.hero + " neden " + t.action + "?", [t.reason, "zamanı boşa geçirmek", "başkalarını üzmek", "olayı gizlemek"], t.reason, "Davranışın metindeki nedeni “" + t.reason + "”dır."),
      q(t.hero + " ile ilgili hangi cümle soru bildirir?", [t.hero + " " + t.objectAcc + " ne zaman inceledi?", t.hero + " görevini tamamladı.", t.place + " bugün çok sakindi.", t.result + "."], t.hero + " " + t.objectAcc + " ne zaman inceledi?", "Bilgi istemek için kurulan cümlenin sonunda soru işareti bulunur."),
      q(t.name + " görselinde olumlu ve olumsuz iki davranış karşılaştırılıyor. Olumlu olan hangisidir?", [t.value, t.opposite, "söz kesmek", "sorumluluğu ertelemek"], t.value, "Tema içinde olumlu davranış “" + t.value + "”dır.", visual("Davranışları karşılaştır", { positive: t.value, negative: t.opposite })),
      q("“" + t.detail + "” ayrıntısı " + t.hero + " adlı öğrenci hakkında en çok neyi gösterir?", [t.inference, "uyuduğunu", "yolunu kaybettiğini", "konuyu anlamadığını"], t.inference, "Bu ayrıntı " + t.inference.toLocaleLowerCase("tr-TR") + " düşüncesini destekler."),
      q("Görselde “" + t.action + " → " + t.result + "” ilişkisi verilmiştir. Metnin ana düşüncesi hangisidir?", [t.value + " olumlu sonuçlar doğurur", t.opposite + " işleri kolaylaştırır", "Hiçbir davranış sonuç vermez", "Yalnız çalışmak gerekir"], t.value + " olumlu sonuçlar doğurur", "Davranış ile sonucu birlikte değerlendiren ana düşünce doğru seçenekte verilmiştir.", visual("Ana düşünce kartı", { action: t.action, result: t.result }))
    ];
  }

  function hard(t) {
    return [
      q(t.hero + ", " + t.place + " ortamındaki bir sorunu fark etti; kimse söylemeden " + t.action + " ve sonunda " + t.result + ". Buna göre hangisi kesinlikle söylenebilir?", [t.inference, t.hero + " yalnız ödül istemiştir", t.hero + " sorunu önemsememiştir", t.hero + " işi yarım bırakmıştır"], t.inference, "Sorunu fark edip çözüm üretmesi, " + t.inference.toLocaleLowerCase("tr-TR") + " olduğunu gösterir."),
      q(t.name + " olayının başı ve sonu görselde verilmiştir. Araya hangi cümle gelmelidir?", [t.order[1], t.order[0], t.order[2], t.opposite], t.order[1], "Başlangıç ile son arasındaki doğru geçiş “" + t.order[1] + "”dir.", visual("Eksik adımı bul", { first: t.order[0], middle: "?", third: t.order[2] })),
      q("“" + t.detail + ". Ardından " + t.result + ".” metninin hem konusunu hem sonucunu yansıtan başlık hangisidir?", [t.title, "Unutulan Çanta", "Uzun Bir Yol", "Yağmurlu Pencere"], t.title, "Metnin içeriğini en kapsamlı yansıtan başlık “" + t.title + "”dır."),
      q("“" + t.word + "” sözcüğünün anlamını bilmeyen bir öğrenci, metindeki hangi ipucundan yararlanabilir?", [t.action + " ifadesinden", t.opposite + " ifadesinden", "yalnız nokta işaretinden", "sayfa numarasından"], t.action + " ifadesinden", "Sözcüğün geçtiği davranış ve olay bağlamı anlamı bulmaya yardım eder."),
      q("Görselde " + t.hero + " “" + t.quote + "” diyor. Bu sözden sonra hangi davranış anlamlı olur?", [t.action, t.opposite, "konuşmayı yarıda kesmek", "araçları dağıtmak"], t.action, "Sözü davranışa dönüştüren uygun adım “" + t.action + "”dır.", visual("Söz ve davranış", { text: t.quote, action: t.action })),
      q(t.name + " metnine göre hangi seçenekte neden ve sonuç doğru sırayla verilmiştir?", [t.reason + " için " + t.action, t.result + " için " + t.opposite, t.opposite + " olduğu için " + t.result, "Neden olmadan " + t.action], t.reason + " için " + t.action, "Doğru seçenekte önce amaç, ardından bu amaca uygun davranış verilmiştir."),
      q(t.hero + " “" + t.action + "; çünkü amacı " + t.reason + "ti.” diyor. “Çünkü” hangi iki bilgiyi bağlıyor?", ["Davranış ile nedenini", "İki ilgisiz nesneyi", "Yalnız yer adlarını", "Başlık ile sayfa numarasını"], "Davranış ile nedenini", "“Çünkü” sözcüğü davranışı onun nedeni ile bağlar."),
      q("Görselde üç sorumluluk kartı vardır. Hangisi " + t.hero + " adlı öğrencinin durumuna en uygundur?", [t.responsibility, t.opposite, "başkasının sözünü kesmek", "işini yarım bırakmak"], t.responsibility, "Duruma uygun sorumluluk “" + t.responsibility + "”tır.", visual("Sorumluluk kartları", { responsibility: t.responsibility, value: t.value, opposite: t.opposite })),
      q("“" + t.hero + " " + t.action + " mı” sözünün soru olması için sonuna hangi işaret gelmelidir?", ["Soru işareti (?)", "Nokta (.)", "Virgül (,)", "İki nokta (: )"], "Soru işareti (?)", "“Mı” soru ekiyle kurulan cümlenin sonunda soru işareti kullanılır."),
      q("Görselde “" + t.order[0] + " → " + t.order[1] + " → " + t.order[2] + "” sırası vardır. Olaydan çıkarılabilecek en kapsamlı sonuç hangisidir?", [t.value + " ve planlı davranmak amaca ulaştırır", t.opposite + " her zaman yararlıdır", "İlk adım atlanmalıdır", "Sonuç nedenlerden önce gelir"], t.value + " ve planlı davranmak amaca ulaştırır", "Bütün adımlar olumlu değerin ve planlı davranmanın iyi sonuca ulaştırdığını gösterir.", visual("Olaydan sonuç çıkar", { first: t.order[0], second: t.order[1], third: t.order[2], result: t.result }))
    ];
  }

  const builders = { kolay: easy, orta: medium, zor: hard };
  const tests = [];
  Object.keys(themes).forEach(function (topic) {
    const theme = themes[topic];
    difficulties.forEach(function (difficulty) {
      const slug = "2-sinif-turkce-" + topic + "-" + difficulty + "-test-1";
      const questions = builders[difficulty](theme).map(function (question, index) {
        question.id = index + 1;
        if (question.visual) {
          question.image = "images/tests/" + slug + "-soru-" + (index + 1) + ".svg";
          question.imageAlt = question.visual.title;
        }
        return question;
      });
      tests.push({
        classLevel: 2,
        subject: "turkce",
        subjectName: "Türkçe",
        topic: topic,
        topicName: theme.name,
        difficulty: difficulty,
        testNumber: 1,
        slug: slug,
        pageUrl: "tests/" + slug + ".html",
        questions: questions
      });
    });
  });

  window.TESTCOZ_TESTS = (window.TESTCOZ_TESTS || []).concat(tests);
})();
