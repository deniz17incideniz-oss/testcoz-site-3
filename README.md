# TestÇöz

1–4. sınıflar için ders, konu ve zorluk seviyesine göre çalışan statik test platformu. Proje ek bir derleme adımı gerektirmez ve Vercel tarafından doğrudan yayınlanabilir.

## Yerel kontrol

```bash
npm test
```

Bu komut test şemasını, her testte tam 10 soru bulunmasını ve yerel HTML bağlantılarını denetler.

## Yeni test ekleme

1. `data/tests/` içinde sınıf, ders ve konuyu anlatan bir JavaScript dosyası oluşturun. `1-matematik.js` ve `4-matematik-zaman-olcme.js` dosyaları örnek olarak kullanılabilir.
2. Dosyadaki her test nesnesinde şu alanları kullanın:

```js
{
  classLevel: 4,
  subject: "matematik",
  topic: "zaman-olcme",
  difficulty: "kolay", // kolay | orta | zor
  testNumber: 1,
  slug: "4-sinif-matematik-zaman-olcme-kolay-test-1",
  pageUrl: "tests/4-sinif-matematik-zaman-olcme-kolay-test-1.html",
  questions: [
    {
      question: "Soru metni",
      choices: ["A seçeneği", "B seçeneği", "C seçeneği", "D seçeneği"],
      correctAnswer: 1, // choices dizisinde 0'dan başlayan indeks
      explanation: "Kısa ve anlaşılır çözüm.",
      image: null // İsteğe bağlı: "images/soru-gorseli.png"
    }
  ]
}
```

3. Yeni veri dosyasını `konu.html` ve `test.html` sayfalarında, mevcut test veri dosyasının yanına bir `<script src="..."></script>` etiketiyle ekleyin.
4. Ders veya konu katalogda yoksa `data/catalog.js` dosyasına ekleyin. Konu kimliği Türkçe başlıktan otomatik üretilir.
5. Statik test sayfaları veya görseller üretim betiğine bağlıysa önce `npm run generate`, ardından `npm test` çalıştırın ve sınıf → ders → konu → test bağlantısını tarayıcıda kontrol edin.

`image` doluysa soru görseli yalnızca ilgili soruda, metnin hemen üzerinde gösterilir. Sonuç ekranı doğru, yanlış, boş/geçilen sayıları; başarı yüzdesini ve yalnız yanlış veya boş bırakılan soruların çözümlerini otomatik üretir.

## Google Sheets kayıt bağlantısı

`/api/register` Vercel Serverless Function olarak çalışır. Google Cloud'da Sheets API etkinleştirilmeli, bir servis
hesabı oluşturulmalı ve hedef tablo bu hesabın e-posta adresiyle düzenleyici olarak paylaşılmalıdır. Vercel proje
ayarlarına `.env.example` içindeki değişkenler eklenir. `JWT_SECRET` en az 32 karakterlik rastgele bir değer olmalıdır.
Gerçek anahtarlar repoya veya frontend koduna yazılmaz.

Tabloda `Kayitlar` adlı sayfa bulunmalıdır. İlk kayıt sırasında 10 sütun başlığı otomatik eklenir. Şifreler backend'de
salt kullanılan scrypt ile hashlenir; giriş oturumu HttpOnly JWT çereziyle yönetilir. Google Sheets daha sonra Dosya →
İndir → Microsoft Excel yoluyla `.xlsx` olarak dışa aktarılabilir.
