/* 1. sınıf Türkçe testleri — Türkiye Yüzyılı Maarif Modeli tema kapsamı.
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
    "guzel-davranislarimiz": {
      name: "Güzel Davranışlarımız", hero: "Ece", place: "sınıf", object: "boya kalemleri", objectAcc: "boya kalemlerini",
      action: "kalemlerini arkadaşlarıyla paylaştı", result: "herkes resmini tamamladı",
      value: "paylaşmak", opposite: "yalnız bırakmak", word: "nezaket", syllables: "ne-za-ket",
      title: "Paylaşınca Çoğalan Sevinç", detail: "sarı kalemini Defne'ye verdi",
      order: ["Defne kalem aradı", "Ece kalemini verdi", "İki arkadaş resimlerini tamamladı"],
      quote: "Kalemimi kullanabilirsin.", reason: "arkadaşının resmini tamamlamasına yardım etmek",
      inference: "Ece yardımsever ve düşüncelidir", responsibility: "kullandığı kalemleri kutusuna yerleştirmek"
    },
    "mustafa-kemalden-ataturke": {
      name: "Mustafa Kemal'den Atatürk'e", hero: "Mert", place: "okul müzesi", object: "Atatürk fotoğrafları", objectAcc: "Atatürk fotoğraflarını",
      action: "fotoğrafların altındaki kısa bilgileri dikkatle okudu", result: "Atatürk'ün çocuklara verdiği değeri öğrendi",
      value: "öğrenmek", opposite: "önemsememek", word: "önder", syllables: "ön-der",
      title: "Atatürk'ü Tanıyorum", detail: "çocuklarla çekilmiş fotoğrafı inceledi",
      order: ["Sınıf müzeye girdi", "Mert bilgi kartlarını okudu", "Öğrendiklerini arkadaşlarına anlattı"],
      quote: "Atatürk çocukları çok severdi.", reason: "Atatürk'ün yaşamını daha yakından tanımak",
      inference: "Mert meraklı ve dikkatli bir öğrencidir", responsibility: "müzedeki eserlere zarar vermemek"
    },
    "cevremizdeki-yasam": {
      name: "Çevremizdeki Yaşam", hero: "Duru", place: "mahalle parkı", object: "küçük fidanlar", objectAcc: "küçük fidanları",
      action: "susuz kalan fidanları suladı", result: "fidanların toprağı nemlendi",
      value: "doğayı korumak", opposite: "çevreyi kirletmek", word: "çevre", syllables: "çev-re",
      title: "Parkın Küçük Koruyucusu", detail: "mavi kovayla üç fidana su verdi",
      order: ["Duru kuru toprağı gördü", "Kovasına su doldurdu", "Fidanları sırayla suladı"],
      quote: "Fidanlar susuz kalmasın.", reason: "bitkilerin yaşaması için suya ihtiyaç duyması",
      inference: "Duru doğaya karşı duyarlıdır", responsibility: "çöpleri uygun kutuya atmak"
    },
    "yol-arkadasimiz-kitaplar": {
      name: "Yol Arkadaşımız Kitaplar", hero: "Arda", place: "kütüphane", object: "masal kitabı", objectAcc: "masal kitabını",
      action: "kitabı sessizce okuyup yerine koydu", result: "yeni bir kahramanın öyküsünü öğrendi",
      value: "okumak", opposite: "kitabı yıpratmak", word: "kütüphane", syllables: "kü-tüp-ha-ne",
      title: "Kitaplarla Yolculuk", detail: "mavi kapaklı kitabı seçti",
      order: ["Arda raftan kitap seçti", "Okuma köşesinde kitabı okudu", "Kitabı aynı rafa bıraktı"],
      quote: "Bu masalı kardeşime de anlatacağım.", reason: "kitapların yeni bilgiler ve düşler sunması",
      inference: "Arda kitapları seven özenli bir okurdur", responsibility: "ödünç aldığı kitabı zamanında geri getirmek"
    },
    "yeteneklerimizi-kesfediyoruz": {
      name: "Yeteneklerimizi Keşfediyoruz", hero: "Selin", place: "sanat atölyesi", object: "ritim çubukları", objectAcc: "ritim çubuklarını",
      action: "duyduğu ezgiye uygun ritim tuttu", result: "arkadaşlarıyla uyumlu bir gösteri yaptı",
      value: "çalışmak", opposite: "hemen vazgeçmek", word: "yetenek", syllables: "ye-te-nek",
      title: "Ritmini Bulan Selin", detail: "önce yavaş, sonra hızlı ritim çaldı",
      order: ["Selin ritmi dinledi", "Çubuklarla prova yaptı", "Gösteriye arkadaşlarıyla katıldı"],
      quote: "Biraz daha çalışırsam başarabilirim.", reason: "sevdiği alandaki becerisini geliştirmek",
      inference: "Selin sabırlı ve öğrenmeye isteklidir", responsibility: "kullandığı araçları etkinlik sonunda toplamak"
    },
    "minik-kasifler": {
      name: "Minik Kâşifler", hero: "Kerem", place: "okul bahçesi", object: "büyüteç", objectAcc: "büyüteci",
      action: "yaprağın üzerindeki damarları inceledi", result: "yaprakların farklı çizgileri olduğunu fark etti",
      value: "merak etmek", opposite: "bakmadan karar vermek", word: "keşif", syllables: "ke-şif",
      title: "Büyüteç Altındaki Yaprak", detail: "iki farklı ağacın yapraklarını karşılaştırdı",
      order: ["Kerem iki yaprak buldu", "Yaprakları büyüteçle inceledi", "Farkları defterine çizdi"],
      quote: "Bu yaprağın çizgileri ötekinden farklı.", reason: "çevresindeki ayrıntıları araştırmak",
      inference: "Kerem gözlem yapan meraklı bir çocuktur", responsibility: "canlılara zarar vermeden gözlem yapmak"
    },
    "atalarimizin-izleri": {
      name: "Atalarımızın İzleri", hero: "Zeynep", place: "aile evi", object: "eski fotoğraf albümü", objectAcc: "eski fotoğraf albümünü",
      action: "büyükannesinin anlattığı aile öyküsünü dinledi", result: "geçmişteki bayram geleneklerini öğrendi",
      value: "geçmişe saygı duymak", opposite: "anlatılanları küçümsemek", word: "gelenek", syllables: "ge-le-nek",
      title: "Albümdeki Bayram", detail: "dedesi çocukken çekilen fotoğrafı gördü",
      order: ["Zeynep albümü açtı", "Büyükannesi fotoğrafı anlattı", "Zeynep öyküyü defterine yazdı"],
      quote: "Bu fotoğraf eski bir bayram sabahından.", reason: "ailesinin geçmişini ve geleneklerini tanımak",
      inference: "Zeynep geçmişini öğrenmeye önem verir", responsibility: "eski fotoğrafları özenle korumak"
    },
    "sorumluluklarimizin-farkindayiz": {
      name: "Sorumluluklarımızın Farkındayız", hero: "Can", place: "ev", object: "çalışma masası", objectAcc: "çalışma masasını",
      action: "ödevini bitirip masasını düzenledi", result: "ertesi gün aradığı araçları kolayca buldu",
      value: "sorumluluk almak", opposite: "görevini başkasına bırakmak", word: "görev", syllables: "gö-rev",
      title: "Can'ın Düzenli Günü", detail: "kitaplarını ders sırasına göre çantasına koydu",
      order: ["Can ödevini tamamladı", "Araçlarını masasına yerleştirdi", "Çantasını ertesi gün için hazırladı"],
      quote: "Görevlerimi zamanında yapmalıyım.", reason: "işlerini düzenli ve zamanında tamamlamak",
      inference: "Can görevlerini önemseyen düzenli bir çocuktur", responsibility: "kendi eşyalarını düzenli tutmak"
    }
  };

  function easy(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında " + t.action + ". Bu davranış en çok hangisini gösterir?", [t.value, t.opposite, "acele etmek", "saklanmak"], t.value, t.hero + ", yaptığı davranışla " + t.value + " değerini göstermiştir."),
      q("Görselde " + t.name + " temasına ait üç sözcük kartı var. Temayla en yakından ilgili sözcük hangisidir?", [t.word, "uyku", "gürültü", "boşluk"], t.word, "“" + t.word + "” sözcüğü bu temanın anlamıyla doğrudan ilişkilidir.", visual("Tema sözcükleri", { first: t.word, second: t.value, third: t.object })),
      q("“" + t.word + "” sözcüğü hangi seçenekte hecelerine doğru ayrılmıştır?", [t.syllables, t.word, t.word.split("").join("-"), t.word + "-ler"], t.syllables, "Sözcüğün doğru hecelenişi “" + t.syllables + "” biçimindedir."),
      q(t.name + " temasındaki seçeneklerden hangisi tamamlanmış bir cümledir?", [t.hero + " " + t.action + ".", t.place + " içinde", "renkli " + t.object, t.reason + " için"], t.hero + " " + t.action + ".", "Tamamlanmış cümle bir yargı bildirir ve noktayla biter."),
      q(t.name + " olayının üç adımı görselde karışık verilmiştir. İlk yapılması gereken hangisidir?", [t.order[0], t.order[1], t.order[2], t.result], t.order[0], "Olay " + t.order[0].toLocaleLowerCase("tr-TR") + " adımıyla başlar.", visual("Olay sırası", { first: t.order[0], second: t.order[1], third: t.order[2] })),
      q("“" + t.quote + "” cümlesinin sonuna hangi noktalama işareti gelmelidir?", ["Nokta (.)", "Soru işareti (?)", "Virgül (,)", "İki nokta (: )"], "Nokta (.)", "Bu cümle soru sormuyor; tamamlanmış bir düşünce bildirdiği için noktayla biter."),
      q(t.hero + ", yaptığı işin sonunda " + t.result + ". Bu cümlede anlatılan sonuç hangisidir?", [t.result, t.action, t.reason, t.opposite], t.result, "Metinde davranışın sonucu açıkça “" + t.result + "” sözleriyle verilmiştir."),
      q("Görseldeki iki davranıştan hangisi " + t.name + " temasına uygundur?", [t.action, t.opposite, "eşyaları dağıtmak", "söz kesmek"], t.action, "Temaya uygun olumlu davranış “" + t.action + "” seçeneğidir.", visual("Davranışları karşılaştır", { first: t.action, second: t.opposite })),
      q(t.hero + " ile ilgili kısa metinde hangi ayrıntı verilmiştir?", [t.detail, "eve erken döndü", "kırmızı şapka taktı", "oyuncağını kaybetti"], t.detail, "Metinde verilen tema ayrıntısı “" + t.detail + "” ifadesidir."),
      q("Görseldeki başlıklardan hangisi " + t.hero + " adlı öğrencinin yaşadığı olaya en uygundur?", [t.title, "Yağmurlu Bir Gün", "Kayıp Oyuncak", "Uzun Bir Yol"], t.title, "“" + t.title + "” başlığı olayın konusunu en iyi özetler.", visual("Başlık seçelim", { first: t.title, second: t.hero, third: t.place }))
    ];
  }

  function medium(t) {
    return [
      q(t.hero + " önce çevresini dikkatle inceledi, sonra " + t.action + ". Bu iki cümleden çıkarılabilecek en uygun düşünce hangisidir?", [t.inference, t.hero + " dikkatsiz davranmıştır", t.hero + " hiçbir şey yapmamıştır", t.hero + " bulunduğu yerden ayrılmıştır"], t.inference, "Dikkatle inceleyip olumlu bir iş yapması, " + t.inference.toLocaleLowerCase("tr-TR") + " sonucunu destekler."),
      q("Görselde " + t.hero + " adlı öğrencinin yaptığı işler sıralanıyor. İkinci adım hangisidir?", [t.order[0], t.order[1], t.order[2], t.result], t.order[1], "Üç adımlı olayın ortasındaki iş “" + t.order[1] + "”dir.", visual("Önce, sonra, en son", { first: t.order[0], second: t.order[1], third: t.order[2] })),
      q(t.name + " temasında hangi cümlede sözcükler anlamlı ve doğru bir sıradadır?", [t.hero + " " + t.object + " ile ilgilendi.", t.object + " ilgilendi ile " + t.hero + ".", "İle ilgilendi " + t.hero + " " + t.object + ".", "İlgilendi " + t.object + " ile."], t.hero + " " + t.object + " ile ilgilendi.", "Türkçede anlamlı cümle, sözcüklerin uygun sırayla dizilmesiyle oluşur."),
      q("“" + t.syllables + "” biçiminde ayrılan sözcük kaç hecelidir?", ["1", "2", "3", "4"], String(t.syllables.split("-").length), "Tirelerle ayrılan her bölüm bir hecedir; toplam " + t.syllables.split("-").length + " hece vardır."),
      q("Konuşma balonunda “" + t.quote + "” yazıyor. Bu sözü söyleyen kişinin amacı ne olabilir?", [t.reason, t.opposite, "konuyu değiştirmek", "kimseyi dinlememek"], t.reason, "Sözün anlamı, kişinin amacının " + t.reason + " olduğunu gösterir.", visual("Konuşma balonu", { text: t.quote, speaker: t.hero })),
      q(t.hero + " neden " + t.action + "?", [t.reason, "zaman geçirmek", "bir şeyi saklamak", "başkasını üzmek"], t.reason, "Davranışın metindeki anlamlı nedeni “" + t.reason + "” seçeneğidir."),
      q(t.hero + " ile ilgili aşağıdaki cümlelerden hangisi soru bildirir?", [t.hero + " " + t.objectAcc + " ne zaman kullandı?", t.hero + " görevini tamamladı.", t.place + " bugün çok sakindi.", t.result + "."], t.hero + " " + t.objectAcc + " ne zaman kullandı?", "Bir şey öğrenmek amacıyla sorulan cümlenin sonunda soru işareti bulunur."),
      q("Görselde “" + t.value + "” ve “" + t.opposite + "” davranışları karşılaştırılıyor. Olumlu olan hangisidir?", [t.value, t.opposite, "acele etmek", "unutmak"], t.value, "Bu tema içinde olumlu ve örnek davranış “" + t.value + "”tır.", visual("Olumlu davranışı bul", { first: t.value, second: t.opposite })),
      q(t.hero + " adlı öğrencinin “" + t.detail + "” davranışı bize en çok neyi gösterir?", [t.inference, "uyuduğunu", "yolunu kaybettiğini", "oyun oynamadığını"], t.inference, "Verilen ayrıntı " + t.inference.toLocaleLowerCase("tr-TR") + " düşüncesini destekler."),
      q("Görseldeki metin kartında “" + t.action + "; bunun sonucunda " + t.result + ".” yazıyor. Metnin ana düşüncesi hangisidir?", [t.value + " güzel sonuçlar doğurur", t.opposite + " her zaman doğrudur", "Hiçbir iş sonuç vermez", "Yalnız çalışmak gerekir"], t.value + " güzel sonuçlar doğurur", "Davranış ve sonucu birlikte değerlendirildiğinde ana düşünce “" + t.value + " güzel sonuçlar doğurur” olur.", visual("Ana düşünce kartı", { first: t.action, second: t.result }))
    ];
  }

  function hard(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında bir sorun fark etti. Kimse söylemeden " + t.action + " ve sonunda " + t.result + ". Buna göre " + t.hero + " için hangisi kesinlikle söylenebilir?", [t.inference, "yalnızca ödül istemiştir", "sorunu görmezden gelmiştir", "işini yarım bırakmıştır"], t.inference, "Sorunu fark edip çözüm için davranması, " + t.inference.toLocaleLowerCase("tr-TR") + " olduğunu gösterir."),
      q(t.name + " olayının başı ve sonu görselde verilmiştir. Araya hangi cümle gelmelidir?", [t.order[1], t.order[0], t.order[2], t.opposite], t.order[1], "Başlangıç ile sonuç arasındaki doğru geçiş “" + t.order[1] + "”dir.", visual("Eksik adımı bul", { first: t.order[0], middle: "?", third: t.order[2] })),
      q("“" + t.detail + ". Ardından " + t.result + ".” metni için hem konuyu hem duyguyu yansıtan en uygun başlık hangisidir?", [t.title, "Sessiz Sokak", "Kırık Saat", "Kaybolan Top"], t.title, "Başlık metindeki olayla doğrudan ilgili olmalı; bunu sağlayan seçenek “" + t.title + "”dır."),
      q("Metinde geçen “" + t.word + "” sözcüğünün anlamına en yakın açıklama hangisidir?", [t.value + " ile ilgili bir kavram", "bir renk adı", "bir sayı adı", "yalnızca bir eşya adı"], t.value + " ile ilgili bir kavram", "Tema içinde “" + t.word + "” sözcüğü " + t.value + " düşüncesiyle ilişkilidir."),
      q("Görselde " + t.hero + " “" + t.quote + "” diyor. Bu sözden sonra en uygun davranış hangisi olur?", [t.action, t.opposite, "konuşmayı yarıda kesmek", "eşyaları dağıtmak"], t.action, "Sözü davranışa dönüştüren uygun adım “" + t.action + "” seçeneğidir.", visual("Söz ve davranış", { text: t.quote, action: t.action })),
      q("Karışık verilen sözlerle anlamlı bir cümle kurulacaktır: “" + t.objectAcc + " / " + t.hero + " / dikkatle / inceledi”. Doğru cümle hangisidir?", [t.hero + " " + t.objectAcc + " dikkatle inceledi.", t.objectAcc + " dikkatle " + t.hero + " inceledi.", "Dikkatle inceledi " + t.objectAcc + " " + t.hero + ".", "İnceledi " + t.hero + " dikkatle " + t.objectAcc + "."], t.hero + " " + t.objectAcc + " dikkatle inceledi.", "Sözcükler anlamlı bir yargı oluşturacak biçimde dizilmiştir."),
      q(t.hero + " " + t.action + "; çünkü amacı " + t.reason + "ti. Bu cümlede “çünkü” sözcüğü hangi iki bilgiyi bağlıyor?", ["Davranış ile nedenini", "İki ilgisiz eşyayı", "Yer ile zamanı", "Soru ile ünlemi"], "Davranış ile nedenini", "“Çünkü” sözcüğü yapılan davranışı onun nedeni ile bağlar."),
      q("Görselde üç bilgi kartı var. Hangisi " + t.hero + " adlı öğrencinin sorumluluğunu doğru anlatır?", [t.responsibility, t.opposite, "başkasının sözünü kesmek", "işini yarım bırakmak"], t.responsibility, "“" + t.responsibility + "” kişinin yerine getirmesi gereken uygun bir sorumluluktur.", visual("Sorumluluk kartları", { first: t.responsibility, second: t.opposite, third: t.value })),
      q("“" + t.hero + " " + t.action + " mi” sözünün soru cümlesi olması için sonuna hangi işaret konmalıdır?", ["Soru işareti (?)", "Nokta (.)", "Virgül (,)", "Kısa çizgi (-)"], "Soru işareti (?)", "“Mi” soru ekiyle kurulan bu cümlenin sonunda soru işareti kullanılmalıdır."),
      q("Görselde “" + t.order[0] + " → " + t.order[1] + " → " + t.order[2] + "” sırası verilmiştir. Bu olaydan çıkarılacak en kapsamlı sonuç hangisidir?", [t.value + " ve düzenli davranmak amaca ulaştırır", t.opposite + " işleri kolaylaştırır", "İlk adımı atlamak gerekir", "Sonuçlar nedenlerden önce gelir"], t.value + " ve düzenli davranmak amaca ulaştırır", "Olayın bütün adımları olumlu ve düzenli davranmanın iyi bir sonuca ulaştırdığını gösterir.", visual("Olaydan sonuç çıkar", { first: t.order[0], second: t.order[1], third: t.order[2], result: t.result }))
    ];
  }

  const builders = { kolay: easy, orta: medium, zor: hard };
  const tests = [];
  Object.keys(themes).forEach(function (topic) {
    const theme = themes[topic];
    difficulties.forEach(function (difficulty) {
      const slug = "1-sinif-turkce-" + topic + "-" + difficulty + "-test-1";
      const questions = builders[difficulty](theme).map(function (question, index) {
        question.id = index + 1;
        if (question.visual) {
          question.image = "images/tests/" + slug + "-soru-" + (index + 1) + ".svg";
          question.imageAlt = question.visual.title;
        }
        return question;
      });
      tests.push({
        classLevel: 1,
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
