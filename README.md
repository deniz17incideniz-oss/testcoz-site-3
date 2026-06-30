# TestÇöz

1–4. sınıflar için ders, konu ve zorluk seviyesine göre çalışan statik test platformu. Proje ek bir derleme adımı gerektirmez ve Vercel tarafından doğrudan yayınlanabilir.

## Yerel kontrol

```bash
npm test
```

Bu komut test şemasını, her testte tam 10 soru bulunmasını ve yerel HTML bağlantılarını denetler.

## Yeni test ekleme

1. `data/tests/` içinde sınıf, ders ve konuyu anlatan bir JavaScript dosyası oluşturun. Mevcut `4-matematik-zaman-olcme.js` dosyası doğrudan örnek olarak kullanılabilir.
2. Dosyadaki her test nesnesinde şu alanları kullanın:

```js
{
  classLevel: 4,
  subject: "matematik",
  topic: "zaman-olcme",
  difficulty: "kolay", // kolay | orta | zor
  testNumber: 1,
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
5. `npm test` çalıştırın ve sınıf → ders → konu → test bağlantısını tarayıcıda kontrol edin.

`image` doluysa soru görseli yalnızca ilgili soruda, metnin hemen üzerinde gösterilir. Sonuç ekranı doğru, yanlış, boş/geçilen sayıları; başarı yüzdesini ve her yanlış cevap için çözümü otomatik üretir.
