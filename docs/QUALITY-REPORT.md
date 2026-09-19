# Final quality pass — 19 Eylül 2026

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

Downloads klasöründe bulunan iki Gemini ZIP'i aynı SHA-256 değerine sahip özdeş kopyalardır. Yol geçişi kontrolünden sonra tek paket olarak incelendi: 11 Markdown / 110 soru. Paketteki 110 görsel referansının dosyaları ZIP içinde yoktur. Soruların 33'ü matematiksel olarak yeniden hesaplanıp açıklamalı native biçime dönüştürüldü; 18'i yanlış anahtar, belirsiz kök veya eksik görsel nedeniyle kesin reddedildi; 59'u öğretmen/editör incelemesine bırakıldı. Kaynak Markdown runtime'a bağlanmadı, ZIP repository'ye eklenmedi ve eksik görsele bağlı soru kullanılmadı. Ayrıntı [Gemini import raporundadır](GEMINI-IMPORT.md).

Bu tur doğrulanan 33 Gemini sorusu, beş 4. sınıf zor matematik testindeki zayıf soruların yerine geçti; toplam soru/test/URL sayısı değişmedi. Bankada 3.720 soru ve 972 görsel vardır. Kaynak dağılımı 3.687 native + 33 `gemini-vetted`; sınıf dağılımı 630 / 780 / 1.020 / 1.290 sorudur. [Konu kapsamı](QUESTION-COVERAGE.md) ve [kalite raporu](QUESTION-QUALITY.md) ayrıntılıdır. 184 exact grup/215 tekrar adayı vardır; bunların hiçbiri aynı test içinde değildir. 55 sayı-normalize benzer kalıp grubu bulunur. Bunlar otomatik editoryal adaylardır, akademik hata sayısı değildir.

**Açık kalite sorunu:** belirgin jenerik 4. sınıf sözel çeldiricileri konu verileriyle değiştirildi; buna rağmen otomatik tarama 53 zayıf çeldirici, 596 kısa açıklama, 252 zorluk ayrımı adayı, 28 uzun birinci sınıf kökü ve 756 kart tipi görsel için uzman incelemesi istiyor. Bu sayılar örtüşebilir ve false positive içerebilir. Bankanın tümü öğretmen/müfredat editörü onayı almış sayılmaz.

## SEO / Broken links

421 HTML, 410 indexlenebilir URL. Otomatik tarama title, description, canonical, H1, yerel href/src, publisher ve sitemap eşleşmesini kontrol eder. Runtime/auth/kişisel sayfalar noindex; public landing sayfaları indexlenebilir. Canonical ve sitemap production domainini kullanır. Sitemap'teki 410 adres yerel HTTP üzerinden redirectsiz 200 döndü.

İçerik benzerliği taraması 373 test HTML dosyasında 38 çifti %80 ve üzeri kelime üçlüsü benzerliğiyle işaretledi; önceki ölçüm 57 idi. Tekrarlanan uzun paragraf sayısı 44'ten 25'e düştü. Her landing konu özeti, beceriler, öğrenme hedefleri, sık hatalar, hazırlık, test sonrası öneri, veli önerisi ve o testten gerçek örnek içerir; sınıf ve zorluk odağı ayrıca ayrıştırılır. Kalan 38 çift editoryal adaydır ve otomatik indexleme kararı değildir.

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

Production yalnız teknik ve içerik gate'leri geçerse uygundur. Bu tur soru kalitesi gate'i açık olduğundan otomatik main merge yapılmaz. PR #2 draft olarak açıldı. Vercel deployment Ready; tarayıcıda public sayfalar ve test sonucu doğrulandı. API/kalıcı kayıt ve metin dosyası kontrolleri tamamlanmadı.

- Editör: tekrarlar, çeldiriciler, zorluk ve yaş/müfredat uygunluğu.
- Site sahibi: gerçek test hesabıyla kayıt, giriş, sonuç kaydı, kişisel test, panel ve çıkış; iletişim kutusunun erişilebilirliği.
- Gizlilik: veri sorumlusu, saklama süreleri, veri silme operasyonu ve rıza süreçleri.
- Google: çocuklara yönelik ayarlar, Search Console sitemap/URL inspection, uygun zamanda AdSense review.

## Son gate kaydı

Test, CI, preview ve yayın durumu kesin sonuçlar alındığında burada güncellenir. MANUAL veya FAIL olan işlem yapılmış kabul edilmez.

## Doğrulama kaydı — 18 Eylül 2026

- `npm ci --ignore-scripts`: PASS; npm audit: 0 açık.
- `npm test`: PASS (372 test/3.720 soru, auth fixture, bağlantı, SEO ve secret taraması).
- `npm run test:browser`: PASS, 24/24; sekiz genişlik, beş sonuç uç durumu, dört sınıf kolay/zor, boş/yanlış inceleme, geçersiz parametre, gerçek 404, yeniden başlatma, devam bağlantıları, çift tıklama, auth UI, screenshot ve 410 sitemap HTTP yanıtı.
- Generator tekrar çalıştırıldı: kaynak ve HTML farkı yok; PASS.
- `git diff --cached --check`: PASS; HTML farkları ve kaynak değişiklikleri incelendi.
- Önceki `35b2ca2` commit'i ve yedek etiketi yerelde korunur.
- Test yüklemesi seçili sınıf/ders bankasıyla sınırlandı; ilk boya sırasında açılır test açıklaması ve soru alanı için sabit yer ayrıldı.

### 19 maddelik checklist

| Gate | Durum | Kanıt / sınır |
|---|---|---|
| Git repo clean | PASS | Commit sonrası çalışma ağacı temiz; uzak dal doğrulandı |
| No secrets | PASS | Desen taraması ve diff; gerçek anahtar bulunmadı |
| Broken links = 0 | PASS | 421 HTML tarandı |
| Test data valid | PASS | 372 test, 3.720 soru; pedagojik onay değil |
| Browser tests pass | PASS | 24/24 |
| Mobile tests pass | PASS | 320/360/375/390/430/768/1024/1440 |
| Auth UI pass | PASS | Fixture ile; gerçek Sheets hesabı değil |
| SEO audit pass | PASS | Tekil metadata/canonical, H1, noindex kontrolü |
| Sitemap pass | PASS | 410 yerel URL, redirectsiz 200 |
| robots.txt pass | PASS | Public kaynaklar açık; doğru sitemap |
| ads.txt pass | PASS | Korunan publisher ile eşleşir |
| Lighthouse acceptable | FAIL | Son dürüst yerel ölçüm: ana sayfa 65, ders 71, landing 70, runtime 96. Public sayfalarda TBT 1,76–3,79 sn; yaklaşık 147–151 KB kullanılmayan üçüncü taraf JS ve reklam kaynaklı best-practices bulguları var. AdSense engellenmedi veya geciktirilmedi. Erişilebilirlik 100. |
| GitHub pushed | PASS | codex/final-quality-pass ve pre-final-quality-pass uzak sunucuda |
| CI passed | PASS | 9654bcb kod commit'i: Actions run 35283370184 başarılı; rapor güncellemesinin yeni koşusu ayrıca kontrol edilir |
| Vercel preview passed | MANUAL | Public ekranlar ve puanlama geçti; kalıcı kayıt/API/dosya kontrolü tamamlanmadı |
| Production deployed | MANUAL | İçerik gate'i açık; main merge yapılmadı |
| Production smoke test passed | MANUAL | Yeni sürüm production'da değil |
| AdSense manual settings reviewed | MANUAL | Hesap ayarları doğrulanmadı |
| Search Console manual submission ready | MANUAL | Yerel sitemap hazır; yeni sürüm yayınlanmadan gönderilmez |

Lighthouse'ın public sayfalardaki Best Practices 77 puanı üçüncü taraf çerez/Issues bulgularını içerir; reklam engelleyerek skor yükseltilmedi. Runtime testin noindex olması bilinçli olduğundan SEO 63 bir public landing SEO hatası olarak yorumlanmamalıdır.

## GitHub ve deployment kanıtı

- [Draft PR #2](https://github.com/deniz17incideniz-oss/testcoz-site-3/pull/2).
- Kod commit'i: `9654bcbd02aca2ebe41aea260edd89c5315ec464`; önceki kaynak commit'i `880c5da`.
- [Başarılı CI](https://github.com/deniz17incideniz-oss/testcoz-site-3/actions/runs/35283370184): bütün adımlar success, kalite kanıtları artifact olarak yüklendi.
- [Vercel deployment](https://vercel.com/deniz17incideniz-4044s-projects/testcoz-site-3/92ktMizLAw7e1WtJMjTVhHix38ia): Ready.
- [Preview](https://testcoz-site-3-git-codex-9d74f3-deniz17incideniz-4044s-projects.vercel.app): ana sayfa, ads.txt, robots, sitemap ve API istekleri 302 ile Vercel SSO'ya yönlendi. Tarayıcı da giriş ekranı gösterdi. Koruma kapatılmadı; hesabın mevcut oturumuyla doğrulama gerekli.
- Production değişmedi. https://testcoz.pro üzerinde ana sayfa, sınıf, ders, landing, runtime, ads.txt, robots, sitemap ve dört kurumsal sayfa HTTPS/200. Ana sayfa hâlâ eski sürüm; bu sonuç yeni deployment smoke testi değildir.
- Canlı ads.txt doğru publisher satırını döndürdü; mevcut ana sayfada tek AdSense yükleyicisi var.

Son karar: **PARTIAL**. Teknik dal ve PR güncelleniyor; yapısal testler ve yerel akışlar başarılı. Bankanın uzman incelemesi, public Lighthouse performans hedefi ve yeni preview API/kalıcı kayıt doğrulaması açık. Bu koşullarda main merge / production yapılmadı.

### Preview takip kontrolü

SSO ekranından sonra tarayıcı önizlemeye erişti. Ana sayfa, 4. sınıf, matematik dersi, geometri landing, kayıt formu ve runtime ekranı açıldı; sınıf/ders/kayıt sayfalarında mobil yatay taşma yok, canonical production domaininde. 4. sınıf zor geometri akışında 1 doğru + 9 boş = %10 ve 9 boş soru açıklaması görüldü. Gerçek kullanıcı hesabı oluşturulmadı.

Kalıcı sonuç kaydı önceki preview üzerinde başarıyla doğrulanmadı. Kod artık virgülle ayrılmış tam `ALLOWED_ORIGINS` listesiyle belirli preview origin'lerini kabul eder; production origin'leri varsayılan olarak korunur, uzak HTTP ve benzer görünümlü saldırgan origin testleri reddedilir. Vercel preview ortamına aktif hostname eklenmeden POST akışı PASS sayılmaz; tüm `vercel.app` alanlarına genel izin verilmedi.

`c5d2345` rapor commit'inin [CI koşusu 35283610504](https://github.com/deniz17incideniz-oss/testcoz-site-3/actions/runs/35283610504) da bütün adımlarıyla başarılı; [Vercel build](https://vercel.com/deniz17incideniz-4044s-projects/testcoz-site-3/DF24NpnR4PhviGXBhS1wg6iCQ2yZ) başarılı. Bu son ek yalnız doğrulama kaydıdır; uygulama kodunu değiştirmez.
