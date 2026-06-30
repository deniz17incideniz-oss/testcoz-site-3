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
          { id: "turkce", name: "Türkçe", icon: "📖", description: "İlk okuma yazma, dinleme, konuşma ve metin çalışmaları.", topics: ["Güzel Davranışlarımız", "Mustafa Kemal'den Atatürk'e", "Çevremizdeki Yaşam", "Yol Arkadaşımız Kitaplar", "Yeteneklerimizi Keşfediyoruz", "Minik Kâşifler", "Atalarımızın İzleri", "Sorumluluklarımızın Farkındayız"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, işlemler, ölçme, konum, şekiller ve veri.", topics: ["Sayılar ve Nicelikler", "Uzunluk ve Kütle Ölçme", "Paralarımız", "Toplama ve Çıkarma", "Konum ve Eş Nesneler", "Geometrik Şekiller", "Veriye Dayalı Araştırma"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Kendimiz, okulumuz, ailemiz, ülkemiz ve çevremiz.", topics: ["Ben ve Okulum", "Sağlığım ve Güvenliğim", "Ailem ve Toplum", "Yaşadığım Yer ve Ülkem", "Doğa ve Çevre", "Bilim, Teknoloji ve Sanat"] }
        ]
      },
      2: {
        name: "2. Sınıf",
        description: "Temel becerilerini geliştir, yeni konular öğren.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Okuma, dinleme, konuşma, yazma ve söz varlığı.", topics: ["Değerlerimizle Varız", "Atatürk ve Çocuk", "Doğada Neler Oluyor?", "Okuma Serüvenimiz", "Yeteneklerimizi Tanıyoruz", "Mucit Çocuk", "Kültür Hazinemiz", "Haklarımızı Biliyoruz"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, işlemler, ölçme, geometri ve veri.", topics: ["Sayılar ve Nicelikler (1)", "Sayılar ve Nicelikler (2)", "İşlemlerden Cebirsel Düşünmeye", "Nesnelerin Geometrisi (1)", "Nesnelerin Geometrisi (2)", "Veriye Dayalı Araştırma"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Okul, sağlık, aile, ülke, doğa, bilim ve sanat.", topics: ["Ben ve Okulum", "Sağlığım ve Güvenliğim", "Ailem ve Toplum", "Yaşadığım Yer ve Ülkem", "Doğa ve Çevre", "Bilim, Teknoloji ve Sanat"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Günlük yaşam bağlamlarında temel iletişim.", topics: ["School Life", "Classroom Life", "Personal Life", "Family Life", "Homes, Houses and Neighbourhoods", "Life in the City and the World"] }
        ]
      },
      3: {
        name: "3. Sınıf",
        description: "Bilgilerini derinleştir, problem çözme gücünü artır.",
        subjects: [
          { id: "turkce", name: "Türkçe", icon: "📖", description: "Metinleri anlama, anlatma, yazma ve söz varlığı.", topics: ["Değerlerimizle Yaşıyoruz", "Atatürk ve Kahramanlarımız", "Doğayı Tanıyoruz", "Bilgi Hazinemiz", "Yeteneklerimizi Kullanıyoruz", "Bilim Yolculuğu", "Millî Kültürümüz", "Hak ve Sorumluluklarımız"] },
          { id: "matematik", name: "Matematik", icon: "📐", description: "Sayılar, işlemler, ölçme, geometri ve veri.", topics: ["Sayılar ve Nicelikler (1)", "Sayılar ve Nicelikler (2)", "İşlemlerden Cebirsel Düşünmeye", "Nesnelerin Geometrisi (1)", "Nesnelerin Geometrisi (2)", "Veriye Dayalı Araştırma"] },
          { id: "hayat-bilgisi", name: "Hayat Bilgisi", icon: "🏡", description: "Okul, sağlık, aile, ülke, doğa, bilim ve sanat.", topics: ["Ben ve Okulum", "Sağlığım ve Güvenliğim", "Ailem ve Toplum", "Yaşadığım Yer ve Ülkem", "Doğa ve Çevre", "Bilim, Teknoloji ve Sanat"] },
          { id: "fen-bilimleri", name: "Fen Bilimleri", icon: "🔬", description: "Bilimsel süreç, canlılar, Dünya, madde, hareket ve elektrik.", topics: ["Bilimsel Keşif Yolculuğu", "Canlılar Dünyasına Yolculuk", "Yer Bilimciler İş Başında", "Maddeyi Tanıyalım, Karıştırıp Ayıralım", "Hareketi Keşfediyorum", "Yaşamımızı Kolaylaştıran Elektrik", "Toprağı Tanıyorum, Tarımı Keşfediyorum", "Canlıların Yaşam Alanlarına Yolculuk"] },
          { id: "ingilizce", name: "İngilizce", icon: "🇬🇧", description: "Günlük yaşam bağlamlarında temel iletişim.", topics: ["School Life", "Classroom Life", "Personal Life", "Family Life", "Homes, Houses and the Neighbourhood", "Life in the City and the World"] }
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
