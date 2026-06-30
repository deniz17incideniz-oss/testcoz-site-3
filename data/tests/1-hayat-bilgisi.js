/* 1. sınıf Hayat Bilgisi testleri — Türkiye Yüzyılı Maarif Modeli tema kapsamı.
   Görsel tanımları ortak üretim betiğiyle özgün SVG dosyalarına dönüştürülür. */
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
    "ben-ve-okulum": {
      name: "Ben ve Okulum", hero: "Elif", place: "sınıf", focus: "okul kurallarına uymak",
      action: "söz almak için parmak kaldırmak", wrong: "arkadaşının sözünü kesmek",
      reason: "herkesin birbirini rahatça dinleyebilmesi", result: "sınıfta düzenli bir konuşma ortamı oluşur",
      responsibility: "kullandığı sınıf araçlarını yerine koymak", helper: "öğretmen",
      resource: "okul krokisi", rule: "koridorda sakin yürümek",
      sequence: ["Ders araçlarını hazırlamak", "Öğretmeni dikkatle dinlemek", "Etkinliği tamamlayıp araçları toplamak"],
      problem: "Yeni öğrenci sınıfını bulamıyor", solution: "ona sınıfın yerini nazikçe göstermek",
      inference: "Elif okuluna ve arkadaşlarına karşı özenlidir", title: "Okulumda Güzel Bir Gün"
    },
    "sagligim-ve-guvenligim": {
      name: "Sağlığım ve Güvenliğim", hero: "Mert", place: "ev", focus: "sağlıklı ve güvenli davranmak",
      action: "yemekten önce ellerini sabunla yıkamak", wrong: "ıslak zeminde koşmak",
      reason: "mikroplardan korunmak ve kazaları önlemek", result: "bedenini ve çevresindekileri korur",
      responsibility: "tehlikeli bir durumu hemen bir yetişkine bildirmek", helper: "güvendiği bir yetişkin",
      resource: "acil durum kartı", rule: "tanımadığı kişilere kişisel bilgi vermemek",
      sequence: ["Tehlikeyi fark etmek", "Tehlikeden uzaklaşmak", "Güvenilir bir yetişkinden yardım istemek"],
      problem: "Mutfakta yere su dökülmüş", solution: "koşmadan uzaklaşıp bir yetişkine haber vermek",
      inference: "Mert sağlığını ve güvenliğini önemser", title: "Önce Sağlık ve Güvenlik"
    },
    "ailem-ve-toplum": {
      name: "Ailem ve Toplum", hero: "Duru", place: "mahalle", focus: "aile ve toplum içinde yardımlaşmak",
      action: "evde yaşına uygun bir görevi üstlenmek", wrong: "ortak işleri hep başkasına bırakmak",
      reason: "işlerin paylaşılınca daha kolay tamamlanması", result: "ailede ve çevrede dayanışma güçlenir",
      responsibility: "sofrayı hazırlarken ailesine yardım etmek", helper: "aile büyüğü",
      resource: "mahalle duyuru panosu", rule: "ortak alanları temiz kullanmak",
      sequence: ["Yapılacak işi belirlemek", "Görevleri adil biçimde paylaşmak", "İşi birlikte tamamlamak"],
      problem: "Yaşlı komşu ağır poşetlerini taşımakta zorlanıyor", solution: "bir yetişkinle birlikte yardım önermek",
      inference: "Duru çevresindeki insanların ihtiyaçlarını önemser", title: "Birlikte Daha Güçlüyüz"
    },
    "yasadigim-yer-ve-ulkem": {
      name: "Yaşadığım Yer ve Ülkem", hero: "Arda", place: "şehir meydanı", focus: "yaşadığı yeri ve ülkesini tanımak",
      action: "Türk bayrağına saygılı davranmak", wrong: "tarihî bir yapının duvarını çizmek",
      reason: "ortak değerleri ve kültürel mirası korumak", result: "yaşadığı yere ait değerleri gelecek için korur",
      responsibility: "millî bayram törenini dikkatle izlemek", helper: "belediye görevlisi",
      resource: "Türkiye haritası", rule: "tarihî ve ortak alanlara zarar vermemek",
      sequence: ["Haritada yaşadığı şehri bulmak", "Şehrin önemli yerlerini öğrenmek", "Öğrendiklerini sınıfta paylaşmak"],
      problem: "Bir ziyaretçi müzenin yolunu soruyor", solution: "bildiği yönü nazikçe tarif etmek",
      inference: "Arda ülkesinin değerlerine saygı duyar", title: "Yaşadığım Yer, Güzel Ülkem"
    },
    "doga-ve-cevre": {
      name: "Doğa ve Çevre", hero: "Selin", place: "park", focus: "doğayı ve çevreyi korumak",
      action: "atıkları uygun geri dönüşüm kutusuna atmak", wrong: "çöpleri çimlerin üzerine bırakmak",
      reason: "canlıların temiz ve sağlıklı bir çevrede yaşayabilmesi", result: "park daha temiz ve canlılar için güvenli olur",
      responsibility: "suyu gereksiz yere açık bırakmamak", helper: "park görevlisi",
      resource: "geri dönüşüm işaretleri", rule: "bitkilere ve hayvanlara zarar vermemek",
      sequence: ["Atığın türünü belirlemek", "Uygun kutuyu bulmak", "Atığı doğru kutuya bırakmak"],
      problem: "Parkta susuz kalmış bir fidan görülüyor", solution: "bir yetişkinle birlikte fidana uygun miktarda su vermek",
      inference: "Selin doğal kaynakları bilinçli kullanır", title: "Doğayı Koruyan Minik Eller"
    },
    "bilim-teknoloji-ve-sanat": {
      name: "Bilim, Teknoloji ve Sanat", hero: "Kerem", place: "atölye", focus: "üretirken meraklı ve dikkatli olmak",
      action: "tableti belirlenen süre ve amaç için kullanmak", wrong: "elektronik aracı izinsiz açmak",
      reason: "araçlardan güvenli ve yararlı biçimde faydalanmak", result: "yeni bilgiler öğrenir ve özgün bir ürün oluşturur",
      responsibility: "kullandığı sanat ve teknoloji araçlarını özenle korumak", helper: "atölye öğretmeni",
      resource: "deney ve sanat malzemeleri", rule: "teknolojik araçları yetişkin yönlendirmesiyle kullanmak",
      sequence: ["Yapacağı ürünü tasarlamak", "Uygun araç ve malzemeleri seçmek", "Ürününü tamamlayıp tanıtmak"],
      problem: "Makas ve kablolar çalışma alanında karışık duruyor", solution: "araçlara dokunmadan öğretmene haber vermek",
      inference: "Kerem merakını güvenli ve üretken biçimde kullanır", title: "Düşün, Tasarla, Üret"
    }
  };

  function easy(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında " + t.action + ". Bu davranış hangisine örnektir?", [t.focus, t.wrong, "kuralları önemsememek", "sorumluluktan kaçmak"], t.focus, t.action + ", " + t.focus + " için uygun bir davranıştır."),
      q("Görselde " + t.name + " konusuyla ilgili iki davranış var. Güvenli ve doğru olan hangisidir?", [t.action, t.wrong, "uyarıları dinlememek", "eşyaları izinsiz almak"], t.action, "Doğru seçenek “" + t.action + "” davranışıdır.", visual("Doğru davranışı seç", { correct: t.action, wrong: t.wrong })),
      q(t.hero + " için aşağıdakilerden hangisi yaşına uygun bir sorumluluktur?", [t.responsibility, "bütün işleri başkasına yaptırmak", "tehlikeli araçları tek başına kullanmak", "kuralları istediği zaman değiştirmek"], t.responsibility, "“" + t.responsibility + "” yaşına uygun ve yerine getirilebilir bir sorumluluktur."),
      q(t.name + " etkinliğinde yapılacak işler hangi sırayla başlamalıdır?", [t.sequence[0], t.sequence[1], t.sequence[2], t.result], t.sequence[0], "Etkinliğin ilk adımı “" + t.sequence[0] + "”dır."),
      q("Görselde " + t.hero + "ın yararlanabileceği bir bilgi kaynağı gösteriliyor. Bu kaynak hangisidir?", [t.resource, "oyuncak kutusu", "boş kâğıt", "kapalı perde"], t.resource, "“" + t.resource + "” konuyla ilgili bilgi edinmeye yardımcı olur.", visual("Bilgi kaynağını tanı", { source: t.resource, topic: t.name })),
      q(t.hero + " neden " + t.action + " davranışını seçmelidir?", [t.reason, "daha çok gürültü yapmak", "işleri geciktirmek", "başkalarını üzmek"], t.reason, "Bu davranışın amacı " + t.reason + "tır."),
      q(t.name + " konusunda uyulması gereken doğru kural hangisidir?", [t.rule, t.wrong, "uyarıları görmezden gelmek", "ortak eşyalara zarar vermek"], t.rule, "“" + t.rule + "” herkes için yararlı ve doğru bir kuraldır."),
      q(t.name + " konusunda görselde dört davranış kartı vardır. Hangisi olumlu bir seçimdir?", [t.solution, t.wrong, "yardım isteğini küçümsemek", "sorunu saklamak"], t.solution, "Soruna uygun olumlu seçim “" + t.solution + "”dır.", visual("Olumlu seçim kartları", { problem: t.problem, solution: t.solution })),
      q(t.hero + " doğru davranışı seçtiğinde hangi sonuç ortaya çıkar?", [t.result, "sorun büyür", "kurallar gereksiz olur", "çevresindekiler zarar görür"], t.result, "Doğru davranışın olumlu sonucu “" + t.result + "” ifadesidir."),
      q("Görseldeki başlıklardan hangisi " + t.name + " konusundaki bu olaya en uygundur?", [t.title, "Kayıp Oyuncak", "Uykulu Bir Sabah", "Yağmurlu Pencere"], t.title, "“" + t.title + "” başlığı konuyu ve olumlu davranışı en iyi yansıtır.", visual("Uygun başlığı bul", { title: t.title, hero: t.hero, place: t.place }))
    ];
  }

  function medium(t) {
    return [
      q(t.hero + " bir sorunla karşılaşınca önce durumu değerlendirdi, sonra " + t.solution + " yolunu seçti. Bu davranıştan hangisi çıkarılabilir?", [t.inference, t.hero + " kuralları önemsemez", t.hero + " sorunu büyütmek ister", t.hero + " çevresini dinlemez"], t.inference, "Sorunu düşünüp uygun çözümü seçmesi, " + t.inference.toLocaleLowerCase("tr-TR") + " sonucunu destekler."),
      q("Görselde " + t.name + " etkinliğinin adımları verilmiştir. İkinci yapılması gereken hangisidir?", [t.sequence[1], t.sequence[0], t.sequence[2], t.wrong], t.sequence[1], "İlk adımdan sonra “" + t.sequence[1] + "” yapılır.", visual("Etkinlik sırası", { first: t.sequence[0], second: t.sequence[1], third: t.sequence[2] })),
      q("“" + t.problem + ".” Bu durumda en uygun çözüm hangisidir?", [t.solution, t.wrong, "hiçbir şey olmamış gibi davranmak", "sorunu başkasına yüklemek"], t.solution, "Sorunu güvenli ve saygılı biçimde çözen seçenek “" + t.solution + "”dır."),
      q(t.name + " konusunda hem haklara hem sorumluluklara uygun davranış hangisidir?", [t.responsibility, t.wrong, "yalnız kendi isteğini düşünmek", "ortak kuralları yok saymak"], t.responsibility, "Haklarımızı kullanırken sorumluluklarımızı da yerine getirmeliyiz."),
      q("Görselde " + t.hero + " “Bir sorun olduğunda kimden yardım isteyebilirim?” diye soruyor. En uygun cevap hangisidir?", [t.helper, "tanımadığı biri", "hiç kimse", "yalnızca yaşıtı"], t.helper, "Böyle bir durumda " + t.helper + " güvenli ve uygun yardım kaynağıdır.", visual("Yardım isteyelim", { question: "Kimden yardım istemeliyim?", answer: t.helper })),
      q(t.hero + " “" + t.rule + "” kuralına uyarsa bunun en önemli nedeni ne olur?", [t.reason, "daha hızlı yorulmak", "çevresini rahatsız etmek", "işini yarım bırakmak"], t.reason, "Kuralın amacı " + t.reason + "tır."),
      q(t.hero + " hem " + t.action + " hem de " + t.responsibility + " davranışlarını gösteriyor. Bu iki davranışın ortak yönü nedir?", [t.focus, t.wrong, "başkalarına zarar vermek", "kurallardan kaçmak"], t.focus, "İki davranış da " + t.focus + " düşüncesini destekler."),
      q(t.name + " konusunda görselde bir doğru, bir yanlış seçim gösteriliyor. Yanlış seçimin yerine hangisi yapılmalıdır?", [t.solution, t.wrong, "uyarıyı gizlemek", "yardımı reddetmek"], t.solution, "Yanlış davranış yerine soruna uygun çözüm uygulanmalıdır.", visual("Seçimini düzelt", { wrong: t.wrong, better: t.solution })),
      q(t.hero + "ın davranışı sonunda " + t.result + ". Bu sonuç hangi davranışla doğrudan ilişkilidir?", [t.action, t.wrong, "kuralları unutmak", "sorunu saklamak"], t.action, "Olumlu sonucu doğuran davranış “" + t.action + "”dır."),
      q("Görselde “" + t.action + " → " + t.result + "” bağlantısı verilmiştir. Bu olayın ana düşüncesi hangisidir?", [t.focus + " olumlu sonuçlar doğurur", t.wrong + " her zaman doğrudur", "Kuralların hiçbir yararı yoktur", "Sorumluluklar başkasına aittir"], t.focus + " olumlu sonuçlar doğurur", "Davranış ve sonucu birlikte değerlendirildiğinde ana düşünce, " + t.focus + " olumlu sonuçlar doğurmasıdır.", visual("Davranış ve sonuç", { action: t.action, result: t.result }))
    ];
  }

  function hard(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında “" + t.problem.toLocaleLowerCase("tr-TR") + "” durumuyla karşılaştı. Önce tehlike veya ihtiyacı fark etti, sonra " + t.solution + ". Buna göre hangisi kesinlikle söylenebilir?", [t.inference, t.hero + " düşünmeden davranmıştır", t.hero + " sorunu görmezden gelmiştir", t.hero + " yalnız kendi isteğini önemsemiştir"], t.inference, "Durumu değerlendirip uygun çözümü seçmesi, " + t.inference.toLocaleLowerCase("tr-TR") + " olduğunu gösterir."),
      q(t.name + " olayının ilk ve son adımı görselde var. Araya hangi adım gelmelidir?", [t.sequence[1], t.sequence[0], t.sequence[2], t.wrong], t.sequence[1], "Doğru sıra içinde eksik olan orta adım “" + t.sequence[1] + "”dır.", visual("Eksik adımı tamamla", { first: t.sequence[0], middle: "?", third: t.sequence[2] })),
      q(t.hero + " hem " + t.wrong + " davranışını görüyor hem de bunun bir soruna yol açabileceğini düşünüyor. En doğru karar hangisidir?", [t.solution, "aynı davranışı yapmak", "sorunu saklamak", "uyarıyı önemsememek"], t.solution, "Riskli veya yanlış durum karşısında güvenli çözüm seçilmelidir."),
      q(t.name + " konusunda bir davranışın doğru sayılması için hem güvenli hem de sorumlu olması gerekiyor. Bu iki koşulu birlikte sağlayan seçenek hangisidir?", [t.responsibility, t.wrong, "izinsiz araç kullanmak", "ortak alanı kirletmek"], t.responsibility, "“" + t.responsibility + "” hem güvenli hem sorumlu bir davranıştır."),
      q("Görselde " + t.hero + "ın önünde iki yol var: “" + t.action + "” ve “" + t.wrong + "”. İlk yolu seçmesinin en güçlü gerekçesi hangisidir?", [t.reason, "daha çok sorun çıkarmak", "kuralları geçersiz kılmak", "sorumluluğu başkasına bırakmak"], t.reason, "Doğru seçimin temel gerekçesi " + t.reason + "tır.", visual("İki yol, bir karar", { right: t.action, wrong: t.wrong, reason: t.reason })),
      q("Karışık verilen adımlar doğru sıraya konacaktır: “" + t.sequence[2] + " / " + t.sequence[0] + " / " + t.sequence[1] + "”. Doğru sıra hangisidir?", [t.sequence[0] + " → " + t.sequence[1] + " → " + t.sequence[2], t.sequence[2] + " → " + t.sequence[1] + " → " + t.sequence[0], t.sequence[1] + " → " + t.sequence[0] + " → " + t.sequence[2], t.sequence[0] + " → " + t.sequence[2] + " → " + t.sequence[1]], t.sequence[0] + " → " + t.sequence[1] + " → " + t.sequence[2], "İşler başlangıç, uygulama ve tamamlama sırasıyla yapılmalıdır."),
      q(t.hero + " “" + t.rule + "” kuralını uyguluyor; çünkü amacı " + t.reason + ". Burada kural ile hangi bilgi arasında neden-sonuç ilişkisi vardır?", ["Kuralın uygulanması ile amacı arasında", "İki ilgisiz eşya arasında", "Yalnız yer adları arasında", "Soru ile başlık arasında"], "Kuralın uygulanması ile amacı arasında", "Kural uygulanır ve bunun sonucunda amaçlanan yarar sağlanır."),
      q("Görselde " + t.resource + ", " + t.helper + " ve " + t.responsibility + " bilgileri var. " + t.hero + " sorunu çözmek için bunları hangi sırayla değerlendirmelidir?", ["Durumu anlamak, uygun kaynağı kullanmak, sorumluluğunu yerine getirmek", "Sorumluluğu unutmak, kaynağı saklamak, yardım istememek", "Önce zarar vermek, sonra kuralı okumak", "Hiç düşünmeden rastgele seçim yapmak"], "Durumu anlamak, uygun kaynağı kullanmak, sorumluluğunu yerine getirmek", "Bilinçli çözüm; durumu anlamayı, kaynağı doğru kullanmayı ve sorumluluk almayı gerektirir.", visual("Çözüm araçları", { source: t.resource, helper: t.helper, responsibility: t.responsibility })),
      q("“" + t.action + " yararlıdır; ancak bunu yaparken " + t.rule + " kuralı da unutulmamalıdır.” Bu cümle hangi düşünceyi vurgular?", ["Doğru davranışın kurallarla birlikte uygulanmasını", "Kuralların gereksiz olduğunu", "Her işin tek başına yapılmasını", "Sorumlulukların ertelenmesini"], "Doğru davranışın kurallarla birlikte uygulanmasını", "Yararlı bir davranış bile güvenlik ve sorumluluk kurallarıyla birlikte uygulanmalıdır."),
      q("Görseldeki olay “" + t.problem + "” diye başlıyor ve “" + t.result + "” diye bitiyor. Bu sonuca ulaşmak için en uygun ara adım hangisidir?", [t.solution, t.wrong, "sorunu büyütmek", "yardım kaynaklarından uzaklaşmak"], t.solution, "Başlangıçtaki sorunu olumlu sonuca bağlayan ara adım “" + t.solution + "”dır.", visual("Sorundan çözüme", { problem: t.problem, solution: t.solution, result: t.result }))
    ];
  }

  const builders = { kolay: easy, orta: medium, zor: hard };
  const tests = [];
  Object.keys(themes).forEach(function (topic) {
    const theme = themes[topic];
    difficulties.forEach(function (difficulty) {
      const slug = "1-sinif-hayat-bilgisi-" + topic + "-" + difficulty + "-test-1";
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
        subject: "hayat-bilgisi",
        subjectName: "Hayat Bilgisi",
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
