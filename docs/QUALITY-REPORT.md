# Final quality pass — 18 Eylül 2026

## Executive summary

Durum: PARTIAL. `35b2ca2` korundu; başlangıç etiketi `pre-final-quality-pass`, çalışma dalı `codex/final-quality-pass`. Statik mimari, URL'ler, 372 test, API/Sheets sözleşmesi ve publisher korundu. Yeni framework veya yeni izleme servisi yok.

Teknik iyileştirmeler uygulanmış olsa da tüm bankanın pedagojik kalite gate'i geçmedi. Bu nedenle production'a otomatik geçiş önerilmez ve bu rapor yayın onayı değildir.

## Before / After

| Alan | Önce | Bu tur |
|---|---|---|
| 4. sınıf geometri | Cevabı soru içinde veren aynı kalıp | 30 farklı soru, düzeye göre tanıma/uygulama/muhakeme, adımlı çözüm |
| Seçenekler | 4. sınıf üreticisinde doğru şık sürekli ilk sırada | Kararlı seçenek döndürme, doğru indeks yeniden hesaplanır |
| Sonuç | Tekrar ve ders bağlantısı | Benzer test, üst seviye, konu, ders ve ana sayfa bağlantıları |
| Mobil test | Uzun amaç paneli sorudan önce | Kısa açılır açıklama; soru daha erken görünür |
| Ana sayfa | Yinelenen kartlar ve öneri bölümleri | 3 avantaj, 3 adım, 2 rehber ve tek öneri alanı |
| Audit | Yapısal test, temel SEO | Tekil soru ID, tam sayı cevap indeksi, duplicate canonical, secret taraması, konu kapsamı ve benzerlik raporu |
| CI | DOCX otomasyonu | Ayrı PR kalite workflow'u; üretim tutarlılığı, veri/auth/link/SEO ve tarayıcı kontrolü |

## Changed files

Kaynaklar: `data/tests/4-tum-dersler.js`, `js/test-runner.js`, `index.html`; bunlardan etkilenen landing sayfaları generator ile üretildi. Denetimler `scripts/`, tarayıcı akışları `qa/`, CI `.github/workflows/quality.yml`, raporlar `docs/` altında. `git diff pre-final-quality-pass --stat` bu turun kesin listesini verir. Önceki commit'teki node_modules temizliği korunur.

## Question bank work / Gemini integration

Gemini dosyaları workspace içinde bulunamadı. Kullanıcının eklerinde eşleşen ZIP/MD bulunmadı; soru eklenmedi ve Gemini entegrasyonu yapılmış gibi gösterilmedi.

Bu tur 30 geometri sorusu düzeltildi; soru silinmedi. 3.720 soru yapısal olarak denetlenir, 972'si görsellidir. [Konu kapsamı](QUESTION-COVERAGE.md) ve [kalite raporu](QUESTION-QUALITY.md) ayrıntılıdır. 1.543 editoryal uyarı, 184 aynı soru grubu/215 tekrar adayı ve 55 benzer kalıp grubu vardır. Bunlar otomatik işaretlerdir; akademik hata sayısı değildir. Toplu silme yapılmadı. 1. sınıf İngilizce katalogda var fakat altı konunun testi yok; yeni ders icat edilmedi. 4. sınıf eski Hayat Bilgisi bankası korunur.

**Açık kalite sorunu:** 4. sınıf sözel üreticisindeki genel çeldiriciler ve yalnız sayıları büyüten bazı matematik kalıpları hâlâ yeniden yazılmalıdır. 30 sorudaki iyileştirme bütün bankanın zorluk ayrımının tamamlandığı anlamına gelmez.

## SEO / Broken links

421 HTML, 410 indexlenebilir URL. Otomatik tarama title, description, canonical, H1, yerel href/src, publisher ve sitemap eşleşmesini kontrol eder. Runtime/auth/kişisel sayfalar noindex; public landing sayfaları indexlenebilir. Canonical ve sitemap production domainini kullanır. Sitemap'teki 410 adres yerel HTTP üzerinden redirectsiz 200 döndü.

İçerik benzerliği taraması 373 tests HTML dosyasında 57 çifti %80 ve üzeri kelime üçlüsü benzerliğiyle işaretledi. Bu indexleme kararı değildir; özellikle aynı konunun düzey sayfaları editoryal inceleme ister. 44 uzun paragraf birden fazla sayfada tekrarlanır. Konu metadata sistemi ve gerçek örnek soru kullanımı önceki commit'ten korunur; thin content riskinin tamamen bittiği ileri sürülmez.

## UX / Accessibility

Önceki yanlış/boş inceleme, görseller, hata bildirim mailto'su ve isteğe bağlı kayıt korunur. Yeni devam bağlantıları yalnız mevcut testlerden seçilir; zor seviyede üst seviye bağlantısı gösterilmez. Çift tıklamanın iki soru ilerletmesine karşı koruma eklendi. Kişisel veri hata bildirimi bağlantısına konmaz; gönderim kullanıcının e-posta uygulamasında yapılır.

Sekiz hedef genişlik: 320, 360, 375, 390, 430, 768, 1024, 1440. Axe WCAG A/AA otomatik testi tam erişilebilirlik sertifikası değildir. Ekran görüntüleri `outputs/` altında; home desktop/mobile, sınıf, ders, landing, soru, sonuç ve yanlış inceleme kontrol edilir.

## Performance / Lighthouse

[Son ölçümler](lighthouse/README.md). Dört hedef: ana sayfa, ders, landing, runtime test. Yerel mobil ölçüm production ölçümü değildir; AdSense engellenmez. İlk koşuda performans 74–85 aralığındaydı; üçüncü taraf yükü ve çalışma ortamı etkilidir. Lighthouse ile tarayıcı testlerinin aynı sunucuyu paylaşması bir koşuyu bağlantı hatasıyla bozdu; ayrı port ve sahipli sunucu yaşam döngüsüyle düzeltildi. Başarısız koşu PASS sayılmaz.

## Security / Privacy

scrypt, imzalı oturum, HttpOnly/Secure/SameSite=Lax, payload sınırı, honeypot, e-posta çakışması ve origin kontrolü korunur. Telefon isteğe bağlı veli alanıdır. `.env.example` gerçek secret içermez. Secret taraması PEM gövdesi ve yaygın anahtar desenlerini arar; anahtar etiketleri veya test fixture'ları gerçek secret sayılmaz. Diff incelemesiyle birlikte kullanılır, mutlak güvenlik garantisi değildir.

Rate limit süreç belleğindedir; birden fazla serverless instance için merkezi kota değildir. Google Sheets'te eşzamanlı duplicate-email yarışını tamamen önleyen bir transaction yoktur. Üretim origin kısıtı preview üzerinde oturum açma POST'unu engelleyebilir; tüm vercel.app alanlarını güvenilir saymak için gevşetilmedi. Canlı env, gerçek hesap ve veri silme süreci ayrıca doğrulanmalıdır.

## AdSense readiness

Publisher `pub-1287455375559097` / client `ca-pub-1287455375559097` korundu. ads.txt ve HTML eşleşmesi, duplicate loader, robots ve reklamsız runtime/auth sayfaları denetlenir. Yeni reklam alanı veya yanıltıcı buton eklenmedi. Onay garantisi yoktur; içerik kalitesi nedeniyle başvuruya tamamen hazır denemez.

MANUAL ACTION REQUIRED: çocuklara yönelik işlem ayarı, hesap/ülke bazlı rıza ve AdSense inceleme talebi. Google'ın [resmî açıklaması](https://support.google.com/adsense/answer/3248194?hl=en) site düzeyindeki ayarı ve reklam birimi işaretlemesini ayrı ele alır. Dashboard ayarı koddan yapılmış gibi gösterilmedi.

## Tests

`npm ci`, `npm test`, `npm run audit:questions`, `node scripts/audit-content-similarity.mjs`, `npm run test:browser`, `npm run lighthouse`. Auth UI açıkça tanımlanan API fixture'larıyla, backend testleri taklit Sheets servisiyle çalışır. Gerçek kullanıcı veya gerçek sonuç kaydı oluşturulmadı. Nihai sonuçlar aşağıdaki yayın kaydında tutulur.

## Production deployment / Remaining manual actions

Production yalnız teknik ve içerik gate'leri geçerse uygundur. Bu tur soru kalitesi gate'i açık olduğundan otomatik main merge yapılmaz. PR/preview sonucu ayrıca kaydedilecektir.

- Editör: tekrarlar, çeldiriciler, zorluk ve yaş/müfredat uygunluğu.
- Site sahibi: gerçek test hesabıyla kayıt, giriş, sonuç kaydı, kişisel test, panel ve çıkış; iletişim kutusunun erişilebilirliği.
- Gizlilik: veri sorumlusu, saklama süreleri, veri silme operasyonu ve rıza süreçleri.
- Google: çocuklara yönelik ayarlar, Search Console sitemap/URL inspection, uygun zamanda AdSense review.

## Son gate kaydı

Test, CI, preview ve yayın durumu kesin sonuçlar alındığında burada güncellenir. MANUAL veya FAIL olan işlem yapılmış kabul edilmez.

## Doğrulama kaydı — 18 Eylül 2026

- `npm ci --ignore-scripts`: PASS; npm audit: 0 açık.
- `npm test`: PASS (372 test/3.720 soru, auth fixture, bağlantı, SEO ve secret taraması).
- `npm run test:browser`: PASS, 22/22; sekiz genişlik, dört sınıf kolay/zor, sonuç, boş/yanlış, yeniden başlatma, devam bağlantıları, çift tıklama, auth UI, screenshot ve 410 sitemap HTTP yanıtı.
- Generator tekrar çalıştırıldı: kaynak ve HTML farkı yok; PASS.
- `git diff --cached --check`: PASS; HTML farkları ve kaynak değişiklikleri incelendi.
- Önceki `35b2ca2` commit'i ve yedek etiketi yerelde korunur.
- Test yüklemesi seçili sınıf/ders bankasıyla sınırlandı; ilk boya sırasında açılır test açıklaması ve soru alanı için sabit yer ayrıldı.

### 19 maddelik checklist

| Gate | Durum | Kanıt / sınır |
|---|---|---|
| Git repo clean | MANUAL | Son commit sonrası doğrulanacak |
| No secrets | PASS | Desen taraması ve diff; gerçek anahtar bulunmadı |
| Broken links = 0 | PASS | 421 HTML tarandı |
| Test data valid | PASS | 372 test, 3.720 soru; pedagojik onay değil |
| Browser tests pass | PASS | 22/22 |
| Mobile tests pass | PASS | 320/360/375/390/430/768/1024/1440 |
| Auth UI pass | PASS | Fixture ile; gerçek Sheets hesabı değil |
| SEO audit pass | PASS | Tekil metadata/canonical, H1, noindex kontrolü |
| Sitemap pass | PASS | 410 yerel URL, redirectsiz 200 |
| robots.txt pass | PASS | Public kaynaklar açık; doğru sitemap |
| ads.txt pass | PASS | Korunan publisher ile eşleşir |
| Lighthouse acceptable | FAIL | Performance: ana sayfa 92, ders 88, landing 85, runtime 97. İki public sayfa 90 hedefinin altında; erişilebilirlik 100. |
| GitHub pushed | MANUAL | Gönderim sonucu bekleniyor |
| CI passed | MANUAL | PR sonrası kontrol edilecek |
| Vercel preview passed | MANUAL | Deployment sonucu bekleniyor |
| Production deployed | MANUAL | İçerik gate'i açık; main merge yapılmadı |
| Production smoke test passed | MANUAL | Yeni sürüm production'da değil |
| AdSense manual settings reviewed | MANUAL | Hesap ayarları doğrulanmadı |
| Search Console manual submission ready | MANUAL | Yerel sitemap hazır; yeni sürüm yayınlanmadan gönderilmez |

Lighthouse'ın public sayfalardaki Best Practices 77 puanı üçüncü taraf çerez/Issues bulgularını içerir; reklam engelleyerek skor yükseltilmedi. Runtime testin noindex olması bilinçli olduğundan SEO 63 bir public landing SEO hatası olarak yorumlanmamalıdır.
