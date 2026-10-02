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

## Kalite araçları ve üretim kaynakları

```sh
npm ci
npm run generate
npm test
npm run test:browser
 npm run audit:release-content
node scripts/audit-question-quality.mjs
```

Tarayıcı testlerinden önce `npx playwright install chromium` çalıştırın. Önizleme: `node scripts/preview-server.mjs` (yalnız yerel statik sunucu; gerçek backend içermez).

Sınıf/ders/rehber sayfalarının kaynağı `scripts/generate-seo-pages.mjs`; test landing/SVG kaynağı `scripts/generate-test-assets.mjs`; editoryal notlar `data/topic-meta.mjs` içindedir. Ortak kurallar `scripts/finalize-pages.mjs` ile en son uygulanır. Üretilen HTML'yi elle değiştirerek kalıcı düzenleme yapmayın.

Denetim raporları `outputs/` altında oluşur ve Git'e girmez. Yayın öncesi sınırlar ve manuel kontroller: `docs/QUALITY-REPORT.md`.

`npm run audit:release-content` ayrı bir yayın kapısıdır: Zor Test 2'de çözüm anlatmayan açıklamaları, tekrarlanan içerik kalıplarını ve katalogdaki eksik Test 1 kapsamını raporlar. Başarısızken yapısal testlerin geçmesi yayın onayı değildir. Bu kontrol tüm soruların anlamsal doğruluğunu otomatik olarak kanıtlamaz.

`npm run generate`, Test 2 verisini sınıf/ders bazında `data/runtime/` altında üretir; tarayıcı yalnız seçilen ders paketini yükler. Aynı adım SVG ölçülerini çıkarır; soru, yanlış inceleme ve kişisel test görselleri gerçek en/boy oranını kullanır. Kaynak soru dosyaları ve mevcut Test 1 içerikleri bu işlemle değiştirilmez.

Ek denetimler: `npm run audit:questions` konu/seviye kapsamı ve tekrar adaylarını üretir; `npm run audit:secrets` credential desenlerini denetler. `node scripts/audit-content-similarity.mjs` landing benzerliğini raporlar. `npm run lighthouse` dört yerel mobil sayfayı ayrı sunucuda ölçer; AdSense engellenmez. Lighthouse ile tarayıcı testlerini sırayla çalıştırın. Raporlar akademik veya politika onayı değildir.

## Zor Test 2 import

`npm run import:zor-test2` converts the preserved final source into `data/tests/zor-test2-final.js`. The checked-in change log records only proven duplicate/answer corrections. Source and visual provenance: `data/imports/README.md`.

Run `npm run generate`, then the regular checks. The additional validator requires 130 topics, 1300 questions, 35 SVGs, 10 questions per test, 3 options in grades 1–3 and 4 in grade 4. Existing Test 1 data is preserved. The legacy grade 4 Life Skills pages retain the existing noindex policy.
