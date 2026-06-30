/* 2. sınıf Hayat Bilgisi testleri — Türkiye Yüzyılı Maarif Modeli konu kapsamı. */
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
      name: "Ben ve Okulum", hero: "Eylül", place: "sınıf", focus: "okul yaşamına etkin ve sorumlu katılmak",
      action: "grup çalışmasında görevleri arkadaşlarıyla adil biçimde paylaştı", wrong: "bütün kararları tek başına vermek",
      reason: "her öğrencinin çalışmaya katkı sunabilmesi", result: "grup görevini zamanında ve uyum içinde tamamladı",
      responsibility: "sınıf başkanlığı seçiminde kurallara uygun oy kullanmak", helper: "öğretmen veya okul rehberlik görevlisi",
      resource: "okul krokisi ve duyuru panosu", rule: "farklı görüşleri söz kesmeden dinlemek",
      sequence: ["Yapılacak görevi birlikte belirlemek", "Görevleri yeteneklere göre paylaşmak", "Çalışmayı kontrol edip sunmak"],
      problem: "Grup çalışmasında iki öğrenci aynı görevi istiyor", solution: "öğrencileri dinleyip görevleri adil biçimde yeniden paylaşmak",
      inference: "Eylül iş birliğine önem veren adaletli bir öğrencidir", title: "Birlikte Başaran Sınıf"
    },
    "sagligim-ve-guvenligim": {
      name: "Sağlığım ve Güvenliğim", hero: "Bora", place: "okul ve ev", focus: "sağlıklı seçimler yapıp risklerden korunmak",
      action: "beslenme çantasına farklı besin gruplarından yiyecekler koydu", wrong: "ilaçları yetişkine sormadan kullanmak",
      reason: "bedenin ihtiyaç duyduğu besinleri dengeli biçimde almak", result: "gün boyunca daha zinde ve dikkatli kaldı",
      responsibility: "acil durumda adresini ve güvenilir kişileri bilmek", helper: "güvendiği yetişkin ve gerektiğinde 112",
      resource: "acil durum bilgi kartı", rule: "trafikte yaya geçidi ve ışıkları kullanmak",
      sequence: ["Tehlikeyi fark edip sakin kalmak", "Güvenli bir yere geçmek", "Uygun kişiden veya kurumdan yardım istemek"],
      problem: "Bisiklet yoluna çıkmadan önce kaskının bağı gevşek görünüyor", solution: "yola çıkmadan kaskı uygun biçimde düzeltmek",
      inference: "Bora sağlığını korurken olası riskleri de düşünür", title: "Sağlıklı ve Güvenli Seçimler"
    },
    "ailem-ve-toplum": {
      name: "Ailem ve Toplum", hero: "İpek", place: "aile ve mahalle", focus: "ailede ve toplumda dayanışma göstermek",
      action: "aile toplantısında herkesin görüşünü dinleyerek görev çizelgesi hazırladı", wrong: "ortak sorumlulukları sürekli başkasına bırakmak",
      reason: "işlerin adil paylaşılması ve herkesin dinlenmesi", result: "ev işleri düzenli yürüdü ve aile bireyleri birbirine zaman ayırdı",
      responsibility: "yaşına uygun ev görevini zamanında yerine getirmek", helper: "aile büyüğü veya mahalledeki yetkili",
      resource: "aile görev çizelgesi ve mahalle duyuruları", rule: "ortak alanlarda başkalarının haklarına saygı göstermek",
      sequence: ["İhtiyacı veya sorunu belirlemek", "Yapılacakları birlikte planlamak", "Görevleri tamamlayıp sonucu değerlendirmek"],
      problem: "Mahalle parkındaki banklardan biri zarar görmüş", solution: "zarar vermeden durumu bir yetişkine ve ilgili görevliye bildirmek",
      inference: "İpek ailesi ve çevresi için sorumluluk alan duyarlı bir çocuktur", title: "Paylaşınca Kolaylaşan İşler"
    },
    "yasadigim-yer-ve-ulkem": {
      name: "Yaşadığım Yer ve Ülkem", hero: "Deniz", place: "yaşadığı ilçe", focus: "yakın çevresini ve ülkesinin ortak değerlerini tanımak",
      action: "ilçedeki tarihî yapıları ve kamu kurumlarını kroki üzerinde işaretledi", wrong: "tarihî bir eserin üzerine yazı yazmak",
      reason: "yaşadığı yerin geçmişini ve sunduğu hizmetleri öğrenmek", result: "çevresini tanıtan anlaşılır bir gezi rotası hazırladı",
      responsibility: "millî günlerde ortak değerlere saygılı davranmak", helper: "belediye, müze veya danışma görevlisi",
      resource: "Türkiye haritası, kroki ve yön levhaları", rule: "kültürel ve tarihî alanları korumak",
      sequence: ["Gidilecek yerleri haritada belirlemek", "Uygun ve güvenli rotayı çizmek", "Rotadaki önemli yerleri tanıtmak"],
      problem: "Şehre yeni gelen bir aile hastanenin yerini bulamıyor", solution: "bildiği doğru yönü tarif edip gerekirse bir görevliye yönlendirmek",
      inference: "Deniz yaşadığı çevreyi tanıyan ve ortak mirası koruyan bir çocuktur", title: "Haritadaki Evimiz Türkiye"
    },
    "doga-ve-cevre": {
      name: "Doğa ve Çevre", hero: "Toprak", place: "okul bahçesi ve park", focus: "doğal kaynakları bilinçli kullanıp çevreyi korumak",
      action: "sınıfın atıklarını türlerine göre ayıran kutular hazırladı", wrong: "kullanılabilir kâğıtları çöpe atmak",
      reason: "atıkların yeniden değerlendirilmesi ve kaynakların korunması", result: "sınıfta çöpe giden atık miktarı azaldı",
      responsibility: "su ve elektriği gereksiz yere kullanmamak", helper: "çevre görevlisi veya güvendiği yetişkin",
      resource: "geri dönüşüm sembolleri ve gözlem tablosu", rule: "canlıların yaşam alanlarını bozmamak",
      sequence: ["Atığın türünü belirlemek", "Uygun geri dönüşüm kutusunu seçmek", "Sonuçları gözlem tablosuna kaydetmek"],
      problem: "Parkta musluk açık kalmış ve su boşa akıyor", solution: "güvenliyse musluğu kapatıp bir görevliye haber vermek",
      inference: "Toprak kaynakları koruyan çevre bilincine sahip bir öğrencidir", title: "Daha Az Atık, Daha Temiz Dünya"
    },
    "bilim-teknoloji-ve-sanat": {
      name: "Bilim, Teknoloji ve Sanat", hero: "Lina", place: "bilim ve sanat atölyesi", focus: "merakını güvenli, yaratıcı ve planlı biçimde kullanmak",
      action: "ışığı yönlendiren karton bir model tasarlayıp denemeler yaptı", wrong: "elektronik aracı izin almadan sökmek",
      reason: "bir fikrin işe yarayıp yaramadığını güvenli deneylerle görmek", result: "ilk modeldeki sorunu bulup daha iyi çalışan yeni model yaptı",
      responsibility: "dijital içerik kullanırken kaynak ve süre kurallarına uymak", helper: "öğretmen veya atölye sorumlusu",
      resource: "tasarım çizimi, güvenli malzemeler ve gözlem notları", rule: "araçları yönergelerine ve yetişkin rehberliğine göre kullanmak",
      sequence: ["Çözülecek soruyu belirlemek", "Fikri çizip güvenli bir model yapmak", "Modeli deneyip geliştirmek"],
      problem: "Deney sırasında kullanılan pil ısınmaya başlıyor", solution: "pile dokunmadan deneyi durdurup öğretmene haber vermek",
      inference: "Lina bilimsel merakını güvenlik ve yaratıcılıkla birleştirir", title: "Fikirden Çalışan Modele"
    }
  };

  function easy(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında " + t.action + ". Bu davranış hangisine örnektir?", [t.focus, t.wrong, "kuralları önemsememek", "sorumluluktan kaçmak"], t.focus, "Davranış, " + t.focus + " için uygun bir örnektir."),
      q(t.name + " görselinde doğru ve yanlış iki davranış vardır. Doğru olan hangisidir?", [t.action, t.wrong, "uyarıları dinlememek", "başkasının hakkını engellemek"], t.action, "Doğru ve yararlı davranış “" + t.action + "” seçeneğidir.", visual("Doğru davranışı seç", { correct: t.action, wrong: t.wrong })),
      q(t.hero + " için aşağıdakilerden hangisi yaşına uygun bir sorumluluktur?", [t.responsibility, "bütün görevleri başkasına bırakmak", "tehlikeli araçları tek başına kullanmak", "kuralları istediği gibi değiştirmek"], t.responsibility, "“" + t.responsibility + "” yaşına uygun bir sorumluluktur."),
      q(t.name + " etkinliğinde ilk yapılması gereken hangisidir?", [t.sequence[0], t.sequence[1], t.sequence[2], t.result], t.sequence[0], "Etkinlik “" + t.sequence[0] + "” adımıyla başlar."),
      q(t.name + " görselinde kullanılabilecek bir bilgi kaynağı verilmiştir. Bu kaynak hangisidir?", [t.resource, "boş oyuncak kutusu", "kapalı perde", "kullanılmayan etiket"], t.resource, "“" + t.resource + "” konuyla ilgili bilgi edinmeye yardım eder.", visual("Bilgi kaynakları", { source: t.resource, topic: t.name })),
      q(t.hero + " neden " + t.action + " davranışını seçmiştir?", [t.reason, "işleri zorlaştırmak", "başkalarını üzmek", "sorunu gizlemek"], t.reason, "Davranışın amacı " + t.reason + "tır."),
      q("2. sınıf " + t.name + " konusunda uyulması gereken doğru kural hangisidir?", [t.rule, t.wrong, "uyarıları görmezden gelmek", "ortak eşyalara zarar vermek"], t.rule, "“" + t.rule + "” güvenli ve saygılı bir kuraldır."),
      q(t.name + " görselindeki soruna uygun çözüm hangisidir?", [t.solution, t.wrong, "yardım istememek", "sorunu büyütmek"], t.solution, "Soruna uygun çözüm “" + t.solution + "”dır.", visual("Sorun ve çözüm", { problem: t.problem, solution: t.solution })),
      q(t.hero + " doğru davranışı seçtiğinde hangi sonuç ortaya çıkmıştır?", [t.result, "sorun büyümüştür", "kurallar gereksiz olmuştur", "çalışma yarım kalmıştır"], t.result, "Metindeki olumlu sonuç “" + t.result + "” ifadesidir."),
      q(t.name + " olayı için en uygun başlık hangisidir?", [t.title, "Kayıp Oyuncak", "Yağmurlu Pencere", "Sessiz Bir Gece"], t.title, "“" + t.title + "” başlığı olayın konusunu en iyi yansıtır.", visual("Uygun başlığı bul", { title: t.title, hero: t.hero, place: t.place }))
    ];
  }

  function medium(t) {
    return [
      q(t.hero + " bir sorunu fark edip durumu değerlendirdikten sonra " + t.solution + " yolunu seçti. Bu davranıştan hangi sonuç çıkarılır?", [t.inference, t.hero + " kuralları önemsemez", t.hero + " sorunu büyütmek ister", t.hero + " çevresini dinlemez"], t.inference, "Sorunu düşünüp uygun çözüm seçmesi, " + t.inference.toLocaleLowerCase("tr-TR") + " sonucunu destekler."),
      q(t.name + " görselindeki üç adımın ikincisi hangisidir?", [t.sequence[1], t.sequence[0], t.sequence[2], t.wrong], t.sequence[1], "İlk adımdan sonra “" + t.sequence[1] + "” yapılır.", visual("Etkinlik sırası", { first: t.sequence[0], second: t.sequence[1], third: t.sequence[2] })),
      q("“" + t.problem + ".” Bu durumda en güvenli ve uygun çözüm hangisidir?", [t.solution, t.wrong, "hiçbir şey olmamış gibi davranmak", "sorunu başkasına yüklemek"], t.solution, "Güvenli ve sorumlu çözüm doğru seçenekte verilmiştir."),
      q("2. sınıf " + t.name + " konusunda hem haklara hem sorumluluklara uygun davranış hangisidir?", [t.responsibility, t.wrong, "yalnız kendi isteğini düşünmek", "ortak kuralları yok saymak"], t.responsibility, "Haklar kullanılırken sorumluluklar da yerine getirilmelidir."),
      q(t.name + " konuşma kartında “Kimden yardım isteyebilirim?” sorusu vardır. En uygun cevap hangisidir?", [t.helper, "tanımadığı biri", "hiç kimse", "yalnızca yaşıtı"], t.helper, "Bu durumda güvenli yardım kaynağı “" + t.helper + "”dır.", visual("Yardım kaynakları", { question: "Kimden yardım istemeliyim?", answer: t.helper })),
      q(t.hero + " “" + t.rule + "” kuralına uyarsa bunun en önemli nedeni ne olur?", [t.reason, "daha çok sorun çıkarmak", "çevresini rahatsız etmek", "işini geciktirmek"], t.reason, "Kuralın temel amacı " + t.reason + "tır."),
      q(t.action + " ile " + t.responsibility + " davranışlarının ortak yönü nedir?", [t.focus, t.wrong, "başkalarına zarar vermek", "kurallardan kaçmak"], t.focus, "İki davranış da " + t.focus + " düşüncesini destekler."),
      q(t.name + " görselindeki yanlış davranışın yerine hangisi yapılmalıdır?", [t.solution, t.wrong, "uyarıyı gizlemek", "yardımı reddetmek"], t.solution, "Yanlış seçim yerine güvenli ve uygun çözüm uygulanmalıdır.", visual("Seçimini düzelt", { wrong: t.wrong, better: t.solution })),
      q(t.result + " sonucu hangi davranışla doğrudan ilişkilidir?", [t.action, t.wrong, "kuralları unutmak", "sorunu saklamak"], t.action, "Olumlu sonucu doğuran davranış “" + t.action + "”dır."),
      q(t.name + " görselinde “" + t.action + " → " + t.result + "” bağlantısı vardır. Ana düşünce hangisidir?", [t.focus + " olumlu sonuçlar doğurur", t.wrong + " her zaman doğrudur", "Kuralların hiçbir yararı yoktur", "Sorumluluklar yalnız yetişkinlere aittir"], t.focus + " olumlu sonuçlar doğurur", "Davranış ve sonuç birlikte değerlendirildiğinde ana düşünce doğru seçenekte verilir.", visual("Davranış ve sonuç", { action: t.action, result: t.result }))
    ];
  }

  function hard(t) {
    return [
      q(t.hero + ", " + t.place + " ortamında “" + t.problem.toLocaleLowerCase("tr-TR") + "” durumuyla karşılaştı. Durumu değerlendirdikten sonra " + t.solution + ". Buna göre hangisi kesinlikle söylenebilir?", [t.inference, t.hero + " düşünmeden davranmıştır", t.hero + " sorunu görmezden gelmiştir", t.hero + " yalnız kendi isteğini önemsemiştir"], t.inference, "Uygun çözümü seçmesi, " + t.inference.toLocaleLowerCase("tr-TR") + " olduğunu gösterir."),
      q(t.name + " olayının ilk ve son adımı görselde verilmiştir. Araya hangisi gelmelidir?", [t.sequence[1], t.sequence[0], t.sequence[2], t.wrong], t.sequence[1], "Doğru sıra içindeki orta adım “" + t.sequence[1] + "”dır.", visual("Eksik adımı tamamla", { first: t.sequence[0], middle: "?", third: t.sequence[2] })),
      q(t.hero + " “" + t.wrong + "” davranışının bir soruna yol açabileceğini düşünüyor. En doğru kararı hangisidir?", [t.solution, "aynı davranışı yapmak", "sorunu gizlemek", "uyarıyı önemsememek"], t.solution, "Riskli veya yanlış durumda güvenli çözüm seçilmelidir."),
      q(t.name + " konusunda bir davranış hem güvenli hem sorumlu olmalıdır. İki koşulu birlikte sağlayan hangisidir?", [t.responsibility, t.wrong, "izinsiz araç kullanmak", "ortak alana zarar vermek"], t.responsibility, "Doğru seçenek hem güvenli hem sorumlu bir davranıştır."),
      q(t.name + " karar görselinde “" + t.action + "” ve “" + t.wrong + "” yolları vardır. Doğru yolun en güçlü gerekçesi hangisidir?", [t.reason, "daha çok sorun çıkarmak", "kuralları geçersiz kılmak", "sorumluluğu başkasına bırakmak"], t.reason, "Doğru seçimin temel gerekçesi " + t.reason + "tır.", visual("İki yol, bir karar", { right: t.action, wrong: t.wrong, reason: t.reason })),
      q("Karışık verilen adımlar doğru sıraya konacaktır: “" + t.sequence[2] + " / " + t.sequence[0] + " / " + t.sequence[1] + "”. Doğru sıra hangisidir?", [t.sequence[0] + " → " + t.sequence[1] + " → " + t.sequence[2], t.sequence[2] + " → " + t.sequence[1] + " → " + t.sequence[0], t.sequence[1] + " → " + t.sequence[0] + " → " + t.sequence[2], t.sequence[0] + " → " + t.sequence[2] + " → " + t.sequence[1]], t.sequence[0] + " → " + t.sequence[1] + " → " + t.sequence[2], "Adımlar başlangıç, uygulama ve sonuç sırasıyla dizilmelidir."),
      q(t.hero + " “" + t.rule + "” kuralını uyguluyor; çünkü amacı " + t.reason + ". Burada neden-sonuç ilişkisi hangisidir?", ["Kuralın uygulanması ile amacı arasında", "İki ilgisiz eşya arasında", "Yalnız yer adları arasında", "Başlık ile sayfa arasında"], "Kuralın uygulanması ile amacı arasında", "Kural uygulanır ve amaçlanan yarar bunun sonucunda sağlanır."),
      q(t.name + " çözüm görselindeki " + t.resource + ", " + t.helper + " ve sorumluluk bilgileri nasıl kullanılmalıdır?", ["Durumu anlamak, uygun kaynağı kullanmak ve sorumluluk almak", "Kaynağı saklamak ve yardım istememek", "Önce zarar vermek, sonra düşünmek", "Rastgele bir seçim yapmak"], "Durumu anlamak, uygun kaynağı kullanmak ve sorumluluk almak", "Bilinçli çözüm bilgi, yardım ve sorumluluğu birlikte kullanır.", visual("Çözüm araçları", { source: t.resource, helper: t.helper, responsibility: t.responsibility })),
      q("“" + t.action + " yararlıdır; ancak " + t.rule + " kuralı da unutulmamalıdır.” cümlesi neyi vurgular?", ["Doğru davranışın kurallarla birlikte uygulanmasını", "Kuralların gereksiz olduğunu", "Her işin tek başına yapılmasını", "Sorumlulukların ertelenmesini"], "Doğru davranışın kurallarla birlikte uygulanmasını", "Yararlı davranışlar güvenlik ve sorumluluk kurallarıyla uygulanmalıdır."),
      q(t.name + " görselindeki olay “" + t.problem + "” diye başlıyor ve “" + t.result + "” diye bitiyor. Uygun ara adım hangisidir?", [t.solution, t.wrong, "sorunu büyütmek", "yardım kaynaklarından uzaklaşmak"], t.solution, "Sorunu olumlu sonuca bağlayan ara adım doğru çözümdür.", visual("Sorundan çözüme", { problem: t.problem, solution: t.solution, result: t.result }))
    ];
  }

  const builders = { kolay: easy, orta: medium, zor: hard };
  const tests = [];
  Object.keys(themes).forEach(function (topic) {
    const theme = themes[topic];
    difficulties.forEach(function (difficulty) {
      const slug = "2-sinif-hayat-bilgisi-" + topic + "-" + difficulty + "-test-1";
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
