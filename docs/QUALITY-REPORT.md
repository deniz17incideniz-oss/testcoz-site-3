# Final quality pass — 20 Eylül 2026

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

Downloads klasöründe bulunan iki Gemini ZIP'i aynı SHA-256 değerine sahip özdeş kopyalardır. Yol geçişi kontrolünden sonra tek paket olarak incelendi: 11 Markdown / 110 soru. Paketteki 110 görsel referansının dosyaları ZIP içinde yoktur. Soruların 86'sı matematiksel ve editoryal olarak yeniden doğrulandı; bunların 72'si açıklamalı native biçimde runtime'a alındı. 21 soru yanlış anahtar, belirsiz kök veya eksik görsel nedeniyle reddedildi; gerekli görseli bulunmayan 3 soru manuel incelemede kaldı. Kaynak Markdown runtime'a bağlanmadı, ZIP repository'ye eklenmedi ve eksik görsele bağlı soru kullanılmadı. Ayrıntı [Gemini import raporundadır](GEMINI-IMPORT.md).

Bu tur doğrulanan 72 Gemini sorusu, 4. sınıf zor matematik testlerindeki zayıf soruların yerine geçti; toplam soru/test/URL sayısı değişmedi. Bankada 3.720 soru ve 972 görsel vardır. Kaynak dağılımı 3.648 native + 72 `gemini-vetted`; sınıf dağılımı 630 / 780 / 1.020 / 1.290 sorudur. [Konu kapsamı](QUESTION-COVERAGE.md) ve [kalite raporu](QUESTION-QUALITY.md) ayrıntılıdır. 175 exact grup/205 tekrar adayı vardır; bunların hiçbiri aynı test içinde değildir. 55 sayı-normalize benzer kalıp grubu bulunur. Bunlar otomatik editoryal adaylardır, akademik hata sayısı değildir.

**Açık kalite sorunu:** belirgin jenerik 4. sınıf sözel çeldiricileri konu verileriyle değiştirildi; buna rağmen otomatik tarama 53 zayıf çeldirici, 580 kısa açıklama, 232 zorluk ayrımı adayı, 28 uzun birinci sınıf kökü ve 756 kart tipi görsel için uzman incelemesi istiyor. Bu sayılar örtüşebilir ve false positive içerebilir. Bankanın tümü öğretmen/müfredat editörü onayı almış sayılmaz.

## SEO / Broken links

422 HTML, 398 indexlenebilir URL. Otomatik tarama title, description, canonical, H1, yerel href/src, publisher ve sitemap eşleşmesini kontrol eder. Runtime/auth/kişisel sayfalar noindex; public landing sayfaları indexlenebilir. Canonical ve sitemap production domainini kullanır. Sitemap'teki 398 adres yerel HTTP üzerinden redirectsiz 200 döndü.

İçerik benzerliği taraması 373 test HTML dosyasında %80 ve üzeri benzer çift bulmadı; önceki ölçüm 43 idi. Site denetiminde tekrarlanan uzun paragraf sayısı 24'tür. Her landing konu özeti, beceriler, öğrenme hedefleri, sık hatalar, hazırlık, test sonrası öneri, veli önerisi ve o testten gerçek örnek içerir; sınıf ve zorluk odağı ayrıca ayrıştırılır. Bu ölçüm editoryal destek aracıdır ve tek başına indexleme kararı değildir.

## UX / Accessibility

Önceki yanlış/boş inceleme, görseller, hata bildirim mailto'su ve isteğe bağlı kayıt korunur. Yeni devam bağlantıları yalnız mevcut testlerden seçilir; zor seviyede üst seviye bağlantısı gösterilmez. Çift tıklamanın iki soru ilerletmesine karşı koruma eklendi. Kişisel veri hata bildirimi bağlantısına konmaz; gönderim kullanıcının e-posta uygulamasında yapılır.

Sekiz hedef genişlik: 320, 360, 375, 390, 430, 768, 1024, 1440. Axe WCAG A/AA otomatik testi tam erişilebilirlik sertifikası değildir. Ekran görüntüleri `outputs/` altında; home desktop/mobile, sınıf, ders, landing, soru, sonuç ve yanlış inceleme kontrol edilir.

## Performance / Lighthouse

[Son ölçümler](lighthouse/README.md). Dört hedef: ana sayfa, ders, landing, runtime test. Yerel mobil ölçüm production ölçümü değildir; AdSense engellenmez. Son tur performans puanları 75 / 77 / 88 / 97'dir; erişilebilirlik dört örnekte 100'dür. Public sayfaların tümü hedefe ulaşmadığı için performans gate'i açık kalır. Üçüncü taraf yükü ve çalışma ortamı sonuçları etkiler.

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

## Doğrulama kaydı — 20 Eylül 2026

- `npm ci --ignore-scripts`: PASS; npm audit: 0 açık.
- `npm test`: PASS (372 test/3.720 soru, auth fixture, bağlantı, SEO ve secret taraması).
- `npm run test:browser`: PASS, 24/24; sekiz genişlik, beş sonuç uç durumu, dört sınıf kolay/zor, boş/yanlış inceleme, geçersiz parametre, gerçek 404, yeniden başlatma, devam bağlantıları, çift tıklama, auth UI, screenshot ve 398 sitemap HTTP yanıtı.
- Generator tekrar çalıştırıldı: kaynak ve HTML farkı yok; PASS.
- `git diff --cached --check`: PASS; HTML farkları ve kaynak değişiklikleri incelendi.
- Önceki `35b2ca2` commit'i ve yedek etiketi yerelde korunur.
- Test yüklemesi seçili sınıf/ders bankasıyla sınırlandı; ilk boya sırasında açılır test açıklaması ve soru alanı için sabit yer ayrıldı.

### 19 maddelik checklist

| Gate | Durum | Kanıt / sınır |
|---|---|---|
| Git repo clean | PASS | Commit sonrası çalışma ağacı temiz; uzak dal doğrulandı |
| No secrets | PASS | Desen taraması ve diff; gerçek anahtar bulunmadı |
| Broken links = 0 | PASS | 422 HTML tarandı |
| Test data valid | PASS | 372 test, 3.720 soru; pedagojik onay değil |
| Browser tests pass | PASS | 24/24 |
| Mobile tests pass | PASS | 320/360/375/390/430/768/1024/1440 |
| Auth UI pass | PASS | Fixture ile; gerçek Sheets hesabı değil |
| SEO audit pass | PASS | Tekil metadata/canonical, H1, noindex kontrolü |
| Sitemap pass | PASS | 398 yerel URL, redirectsiz 200 |
| robots.txt pass | PASS | Public kaynaklar açık; doğru sitemap |
| ads.txt pass | PASS | Korunan publisher ile eşleşir |
| Lighthouse acceptable | FAIL | Son dürüst yerel ölçüm: ana sayfa 75, ders 77, landing 88, runtime 97. Public sayfaların tümü hedefi karşılamıyor; AdSense engellenmedi veya geciktirilmedi. Erişilebilirlik 100. |
| GitHub pushed | PASS | codex/final-quality-pass ve pre-final-quality-pass uzak sunucuda |
| CI passed | PASS | `1821622` içerik commit'i: Actions run 35511582666 başarılı |
| Vercel preview passed | MANUAL | Yeni yöntem sayfası, gizlilik, noindex ve Gemini sorusu geçti; gerçek hesapla kalıcı kayıt/API kontrolü tamamlanmadı |
| Production deployed | MANUAL | İçerik gate'i açık; main merge yapılmadı |
| Production smoke test passed | MANUAL | Yeni sürüm production'da değil |
| AdSense manual settings reviewed | MANUAL | Hesap ayarları doğrulanmadı |
| Search Console manual submission ready | MANUAL | Yerel sitemap hazır; yeni sürüm yayınlanmadan gönderilmez |

Lighthouse'ın public sayfalardaki Best Practices 77 puanı üçüncü taraf çerez/Issues bulgularını içerir; reklam engelleyerek skor yükseltilmedi. Runtime testin noindex olması bilinçli olduğundan SEO 63 bir public landing SEO hatası olarak yorumlanmamalıdır.

## GitHub ve deployment kanıtı

- [Draft PR #2](https://github.com/deniz17incideniz-oss/testcoz-site-3/pull/2).
- İçerik commit'i: `1821622a2f0035ee9deea145e76946ed240813be`.
- [Başarılı CI](https://github.com/deniz17incideniz-oss/testcoz-site-3/actions/runs/35511582666): Quality checks run 12 success.
- [Vercel deployment](https://vercel.com/deniz17incideniz-4044s-projects/testcoz-site-3/8Q5XxNZvcgjk5FwXmfwRyfCj1nZB): Ready.
- [Preview](https://testcoz-site-3-git-codex-9d74f3-deniz17incideniz-4044s-projects.vercel.app): İçerik Yaklaşımımız ve güncel gizlilik sayfası açıldı; 4. sınıf zor Kesirler testinde entegre Gemini sorusu yüklendi. Eski 4. sınıf Hayat Bilgisi landing örneğinde `noindex, follow` ve reklamsız head doğrulandı.
- Production değişmedi. https://testcoz.pro üzerinde ana sayfa, sınıf, ders, landing, runtime, ads.txt, robots, sitemap ve dört kurumsal sayfa HTTPS/200. Ana sayfa hâlâ eski sürüm; bu sonuç yeni deployment smoke testi değildir.
- Canlı ads.txt doğru publisher satırını döndürdü; mevcut ana sayfada tek AdSense yükleyicisi var.

Son karar: **NOT READY FOR ADSENSE REVIEW**. Teknik dal ve draft PR güncel; yapısal testler, CI ve public preview akışları başarılı. Bankanın uzman incelemesi, public Lighthouse performans hedefi, TFAT/CMP hesap ayarları ve gerçek preview API/kalıcı kayıt doğrulaması açık. Bu koşullarda main merge / production yapılmadı.

### Preview takip kontrolü

Tarayıcı önizlemede yeni İçerik Yaklaşımımız sayfası, 20 Eylül tarihli gizlilik metni ve 4. sınıf zor Kesirler runtime akışı açıldı. İlk runtime sorusu yeniden doğrulanan Gemini paketinden geldi; seçenekler ve sayfa başlığı doğru yüklendi. Eski 4. sınıf Hayat Bilgisi landing örneğinde noindex ve AdSense loader kaldırma kuralı doğrulandı. Gerçek kullanıcı hesabı oluşturulmadı.

Kalıcı sonuç kaydı önceki preview üzerinde başarıyla doğrulanmadı. Kod artık virgülle ayrılmış tam `ALLOWED_ORIGINS` listesiyle belirli preview origin'lerini kabul eder; production origin'leri varsayılan olarak korunur, uzak HTTP ve benzer görünümlü saldırgan origin testleri reddedilir. Vercel preview ortamına aktif hostname eklenmeden POST akışı PASS sayılmaz; tüm `vercel.app` alanlarına genel izin verilmedi.

Production'da HTTP ve HTTPS ads.txt istekleri doğru publisher satırıyla 200 döndü; robots.txt ve sitemap.xml 200'dür. Yeni İçerik Yaklaşımımız sayfasının production'da 404 dönmesi, bu dalın henüz production'a alınmadığını doğrular.
