/* TestÇöz sınıf, ders ve konu kataloğu.
   Sayfa yapısı bu tek kaynaktan üretilir. */
(function () {
  const commonDifficulties = ["kolay", "orta", "zor"];

  window.TESTCOZ_CATALOG = {
    grades: {
      1: {
        name: "1. Sınıf",
        description: "Temel kavramları eğlenceli etkinliklerle keşfet.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Sesler, heceler, kelimeler ve okuma anlama.", topics: ["Sesler ve Harfler", "Hece ve Kelime", "Okuma Anlama", "Yazım Kuralları"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, işlemler, şekiller ve ölçme.", topics: ["Sayılar ve Nicelikler", "Toplama İşlemi", "Çıkarma İşlemi", "Temel Şekiller", "Ölçme"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Kendimiz, okulumuz, ailemiz ve çevremiz.", topics: ["Ben ve Okulum", "Ailem ve Evim", "Sağlıklı Hayat", "Güvenli Hayat", "Doğa ve Çevre"] },
          { id: "fen-bilimleri", name: "Fen Bilimleri", icon: "🔬", description: "Doğayı gözlemlemeye hazırlayan temel kavramlar.", topics: ["Canlıları Tanıyalım", "Beş Duyumuz", "Çevremizdeki Maddeler"] },
          { id: "sosyal-bilgiler", name: "Sosyal Bilgiler", icon: "🌍", description: "Toplum yaşamına hazırlayan temel bilgiler.", topics: ["Birey ve Toplum", "Kültürümüz", "Çevremizi Tanıyalım"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Temel kelimeler ve günlük ifadeler.", topics: ["Greetings", "Numbers", "Colors", "School"] }
        ]
      },
      2: {
        name: "2. Sınıf",
        description: "Temel becerilerini geliştir, yeni konular öğren.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Akıcı okuma, kelime bilgisi ve yazma.", topics: ["Okuma Anlama", "Kelime Bilgisi", "Cümle Çalışmaları", "Yazım ve Noktalama"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, dört işleme giriş, geometri ve ölçme.", topics: ["Doğal Sayılar", "Toplama", "Çıkarma", "Çarpma", "Bölme", "Geometri", "Ölçme"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Okul, aile, sağlık ve yaşadığımız çevre.", topics: ["Ben ve Okulum", "Sağlığım ve Güvenliğim", "Ailem ve Toplum", "Yaşadığım Yer ve Ülkem", "Doğa ve Çevre"] },
          { id: "fen-bilimleri", name: "Fen Bilimleri", icon: "🔬", description: "Bilimsel merakı destekleyen başlangıç konuları.", topics: ["Canlılar", "Maddeyi Tanıyalım", "Dünya ve Gökyüzü"] },
          { id: "sosyal-bilgiler", name: "Sosyal Bilgiler", icon: "🌍", description: "Yakın çevre, kültür ve sorumluluklar.", topics: ["Birey ve Toplum", "Kültür ve Miras", "İnsanlar ve Çevre"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Basit ifadeler ve temel kelime grupları.", topics: ["Words", "Friends", "In the Classroom", "Numbers", "Colors"] }
        ]
      },
      3: {
        name: "3. Sınıf",
        description: "Bilgilerini derinleştir, problem çözme gücünü artır.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Metin anlama, dil bilgisi ve yazma.", topics: ["Okuma Anlama", "Söz Varlığı", "Cümle Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Dört işlem, kesirler, geometri ve ölçme.", topics: ["Doğal Sayılar", "Toplama", "Çıkarma", "Çarpma", "Bölme", "Kesirler", "Geometri", "Ölçme", "Veri"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Güvenli, sağlıklı ve sorumlu yaşam.", topics: ["Okulumuzda Hayat", "Evimizde Hayat", "Sağlıklı Hayat", "Güvenli Hayat", "Ülkemizde Hayat", "Doğada Hayat"] },
          { id: "fen-bilimleri", name: "Fen Bilimleri", icon: "🔬", description: "Dünya, canlılar, madde, kuvvet ve enerji.", topics: ["Gezegenimizi Tanıyalım", "Beş Duyumuz", "Kuvveti Tanıyalım", "Maddeyi Tanıyalım", "Işık ve Sesler", "Canlılar Dünyası", "Elektrikli Araçlar"] },
          { id: "sosyal-bilgiler", name: "Sosyal Bilgiler", icon: "🌍", description: "Birey, toplum, kültür ve çevre.", topics: ["Birey ve Toplum", "Kültür ve Miras", "İnsanlar, Yerler ve Çevreler", "Bilim, Teknoloji ve Toplum", "Etkin Vatandaşlık"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Günlük yaşamda kullanılan temel İngilizce.", topics: ["Greeting", "My Family", "People I Love", "Feelings", "Toys and Games", "My House"] }
        ]
      },
      4: {
        name: "4. Sınıf",
        description: "İlkokul kazanımlarını pekiştir ve sınavlara hazırlan.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Okuma, anlama, dil bilgisi ve yazılı anlatım.", topics: ["Okuma Anlama", "Söz Varlığı", "Cümle Bilgisi", "Yazım Kuralları", "Noktalama İşaretleri"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, işlemler, kesirler, geometri ve ölçme.", topics: ["Doğal Sayılar", "Toplama", "Çıkarma", "Çarpma", "Bölme", "Kesirler", "Geometrik Cisimler", "Uzunluk Ölçme", "Çevre Ölçme", "Alan Ölçme", "Zaman Ölçme", "Tartma", "Sıvı Ölçme", "Veri"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Günlük yaşam, toplum ve çevre bilgileri.", topics: ["Birey ve Toplum", "Sağlıklı Yaşam", "Güvenli Yaşam", "Doğa ve Çevre"] },
          { id: "fen-bilimleri", name: "Fen Bilimleri", icon: "🔬", description: "Dünya, besinler, kuvvet, madde ve elektrik.", topics: ["Yer Kabuğu ve Dünya'nın Hareketleri", "Besinlerimiz", "Kuvvetin Etkileri", "Maddenin Özellikleri", "Aydınlatma ve Ses Teknolojileri", "İnsan ve Çevre", "Basit Elektrik Devreleri"] },
          { id: "sosyal-bilgiler", name: "Sosyal Bilgiler", icon: "🌍", description: "Tarih, coğrafya, üretim ve vatandaşlık.", topics: ["Birey ve Toplum", "Kültür ve Miras", "İnsanlar, Yerler ve Çevreler", "Bilim, Teknoloji ve Toplum", "Üretim, Dağıtım ve Tüketim", "Etkin Vatandaşlık", "Küresel Bağlantılar"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Günlük iletişim ve temel dil becerileri.", topics: ["Classroom Rules", "Nationality", "Cartoon Characters", "Free Time", "My Day", "Fun with Science"] }
        ]
      }
    },
    difficulties: commonDifficulties
  };

  Object.values(window.TESTCOZ_CATALOG.grades).forEach(function (grade) {
    grade.subjects.forEach(function (subject) {
      subject.topics = subject.topics.map(function (topic) {
        return typeof topic === "string"
          ? { id: window.TestCozUtils.slugify(topic), name: topic, description: topic + " kazanımlarını pekiştir.", difficulties: commonDifficulties.slice() }
          : topic;
      });
    });
  });
})();
