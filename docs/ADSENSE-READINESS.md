# AdSense readiness — 20 Eylül 2026

AdSense onayı Google'ın incelemesine bağlıdır; bu rapor onay garantisi vermez. Durum değerleri PASS, WARNING, FAIL ve MANUAL olarak kullanılır.

| Alan | Durum | Kanıt / işlem |
|---|---|---|
| 1. Site ownership | PASS | Production alan adı, AdSense client ve ads.txt publisher aynı hesaba işaret ediyor |
| 2. AdSense code | PASS | Indexlenebilir içerik sayfalarında resmi async loader; noindex runtime/auth sayfalarında loader yok |
| 3. ads.txt | PASS | `google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0` |
| 4. Original content | PASS | Özgün soru bankası, açıklamalar, rehberler ve içerik yöntemi |
| 5. Thin/templated risk | PASS | 398 indexlenebilir sayfa; thin 0, orphan 0, >=%80 benzer çift 0 |
| 6. Navigation | PASS | Ana sayfa → sınıf → ders → konu/test; rehber ve güven sayfaları footer'dan erişilebilir |
| 7. Privacy | PASS | Gerçek auth, Google Sheets ve AdSense kullanımı açıklanıyor; politika 20 Eylül 2026'da güncellendi |
| 8. Child-directed treatment | MANUAL | Site sahibi hukuki sınıflandırmayı yapmalı ve Google tarafında TFAT/site treatment ayarını doğrulamalı |
| 9. CMP/consent | MANUAL | EEA/UK/İsviçre için Google-certified, TCF uyumlu bölgesel mesaj AdSense hesabında yayınlanmalı |
| 10. Ad placement | WARNING | Kodda manuel reklam kutusu yok; Auto Ads formatları hesap panelinden test butonlarından uzak tutulmalı |
| 11. Performance | FAIL | Son dürüst yerel public ölçümler 75 / 77 / 88; hedef bütün public örneklerde karşılanmadı ve reklam kaynaklı üçüncü taraf yükü sürüyor |
| 12. Mobile | PASS | 320–1440 px hedeflerinde yatay taşma kontrolü |
| 13. Trust | PASS | Hakkımızda, İçerik Yaklaşımımız, İletişim, Gizlilik ve Şartlar mevcut |
| 14. Policy risks | WARNING | Pedagojik uzman örneklemesi ve çocuk reklam sınıflandırması tamamlanmadı |
| 15. Manual dashboard actions | MANUAL | AdSense Privacy & messaging, yaş işlemi, Auto Ads formatları ve site review hesabı gerektirir |

## Resmî Google dayanakları

- [AdSense site bağlantısı ve inceleme](https://support.google.com/adsense/answer/7584263?hl=en)
- [AdSense için özgün içerik ve navigasyon](https://support.google.com/adsense/answer/7299563?hl=en)
- [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en)
- [Yaş kısıtlı reklam isteği ve TFAT](https://support.google.com/adsense/answer/9007197?hl=en)
- [Çocuklara yönelik site bildirimi](https://support.google.com/webmasters/answer/3221080?hl=en)
- [EEA, UK ve İsviçre için sertifikalı CMP gereksinimi](https://support.google.com/adsense/answer/13554020?hl=en)
- [Google CMP yönetimi](https://support.google.com/adsense/answer/7670013?hl=en)
- [ads.txt taranabilirliği](https://support.google.com/adsense/answer/7679060?hl=en)
- [Yanlış tıklamayı önleyen reklam yerleşimi](https://support.google.com/adsense/answer/10025624?hl=en)

## Çocuklara yönelik işlem

Google'ın güncel dokümanında eski TFCD ve TFUA sinyalleri deprecated, güncel birleşik sinyal TFAT olarak açıklanır. `TFAT=1` çocuk işlemini uygular; kişiselleştirilmiş reklam ve yeniden pazarlama devre dışı kalır ve çocuklara yönelik reklam korumaları uygulanır. Hukuki yaş sınıflandırması kod tarafından tahmin edilemez. Site düzeyi işaretleme ve AdSense hesap ayarı doğrulanmadan bu gate PASS sayılmaz.

## CMP ve bölgesel rıza

Türkiye ana hedef olsa da site dünya çapında erişilebilir. Google, EEA, UK ve İsviçre'de kişiselleştirilmiş reklam için Google-certified ve IAB TCF ile entegre CMP ister. Sahte bir yerel cookie banner eklenmedi. AdSense Privacy & messaging alanındaki bölgesel mesaj yayınlanıp doğrulanmalıdır.

## Reklam deneyimi

Test runtime, kayıt, giriş ve panel sayfalarında AdSense loader bulunmaz. Manuel reklam kutusu, popup veya interstitial eklenmedi. Auto Ads açıksa overlay, vignette, anchor ve sayfa içi formatlar çocukların “Teste Başla”, cevap, “Geç”, “Sonraki” ve “Yanlışlarını Öğren” kontrolleriyle karışmayacak şekilde hesap panelinde sınanmalıdır.

## Yayın kararı

Mevcut durumda **NOT READY FOR ADSENSE REVIEW**. Teknik içerik, sitemap, navigasyon, ads.txt ve publisher kontrolleri geçiyor. Production sürümü bu dalı içermiyor; Lighthouse public performans gate'i, pedagojik uzman örneklemesi, TFAT/site treatment ve CMP hesabı doğrulaması açık.
