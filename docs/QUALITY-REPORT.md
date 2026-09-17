# TestÇöz kalite ve yayın öncesi raporu

Tarih: 17 Eylül 2026. Başlangıç commit'i: `222d17718503e787eafa991961a46bb81d3da6d8`.
Çalışma dalı: `improve/quality-and-learning`. Değişiklikler yereldir; GitHub'a gönderilmedi, Vercel'e yayımlanmadı.

## 1. Tespit edilen ana problemler

- 372 testin landing açıklamaları aynı genel şablona dayanıyordu. Sekiz rehbere de aynı uzun ek bölümler basılıyordu.
- Kayıt ve giriş sitemap'teydi; eski bağımsız test ekranlarının bazılarında canonical/description eksikti. İlk taramada altı SEO hatası ve iki sitemap kapsam uyarısı vardı.
- Ana sayfada kanıtlanmış bir AI hizmeti yerine kurallı öneri sistemi bulunmasına rağmen AI ağırlıklı sunum vardı.
- Soru normalleştirici görsel kotasını doldurmak için dekoratif kart üretiyordu. Bazı gerçek çizimler yanlış veya yetersiz çiziliyordu; davranış kartlarında İngilizce `correct` / `wrong` anahtarları gösteriliyordu.
- Telefon zorunluydu. Bozuk URL kodlu oturum çerezi hata verebiliyordu. Panelin bazı sunucu verileri HTML olarak kaçışsız yerleştiriliyordu; çıkışta HTTP başarısızlığı kontrol edilmiyordu.
- 5.138 bağımlılık dosyası Git takibindeydi. İki bağımlılık ağacında da yüksek önem seviyesinde paket uyarıları vardı. İş akışı, dosya adlarını kabuk koduna doğrudan yerleştiriyordu.

## 2. Değiştirilen dosyalar ve mimari

Statik HTML + JavaScript, mevcut API yolları, Sheets sütunları, Vercel yapılandırması, test URL'leri ve publisher kimliği korundu. `sources/` değişmedi.

Başlıca kaynaklar:

- `data/topic-meta.mjs`: konu açıklaması, beceriler, öğrenci/veli ipuçları. Resmî öğrenme çıktısı kodu üretilmez.
- `scripts/generate-test-assets.mjs`, `scripts/render-learning-visual.mjs`: landing sayfaları ve özgün SVG çizimleri.
- `scripts/generate-seo-pages.mjs`: sınıf/ders sayfaları, mevcut sekiz rehber ve yeni rehber dizini; sitemap/robots.
- `scripts/finalize-pages.mjs`: kalıcı ortak erişilebilirlik, navigasyon, schema ve indeksleme kuralları. `npm run generate` zincirinin son adımıdır.
- `index.html`, `css/style.css`, `js/main.js`, `js/test-runner.js`: tasarım ve test deneyimi.
- `kayit.html`, `gizlilik-politikasi.html`, `hakkimizda.html`, `iletisim.html`, `js/register.js`, `js/panel.js`, `api/register.js`, `api/_lib/security.js`: güven, veri minimizasyonu ve dar kapsamlı güvenlik düzeltmeleri.
- `scripts/audit-site.mjs`, `scripts/audit-question-quality.mjs`, `scripts/validate-auth.mjs`, `qa/`, `playwright.config.mjs`: tekrar çalıştırılabilir kontroller.
- `.github/workflows/main.yml`, `automation/generate-test.js`, kilit dosyaları ve `.gitignore`: güvenli otomasyon, bağımlılık kurulumu ve Git temizliği.

Üretilen sayfalar kaynak betiklerden yeniden üretildi. Bağımlılıklar yalnız Git takibinden çıkarıldı; uygulama kaynakları topluca silinmedi. Tam dosya listesi: `docs/changed-files.txt`.

## 3. Tasarım ve öğrenme deneyimi

Mavi/amber marka korundu. Daha sade hero, iki belirgin eylem, gerçek ders sayıları, öğrenme adımları, daha okunaklı seçenekler, klavye odağı, menüde Escape desteği ve ortak footer eklendi. Mobil kartlar ve breadcrumb taşması kontrol edildi. Profesyonel 404 sayfası eklendi.

Seçenek işaretlemek artık sorunun DOM'unu yeniden oluşturup klavye odağını kaybettirmiyor. Soruyu Geç seçili cevabı temizleyerek boş bırakıyor. Sonuçlar doğru/yanlış/boş ve yüzdeyi koruyor; Yanlışlarını Öğren bağlantısı ilgili bölüme odaklanıyor. Yanlış sorunun görseli de açıklamada gösteriliyor. Hata bildirim bağlantısı sınıf/ders/konu/seviye/test/soru bilgilerini e-postaya hazırlar; kendi kendine mesaj göndermez.

## 4. SEO ve editoryal içerik

421 HTML sayfası tarandı. 410 indekslenebilir sayfa ve sitemap'te 410 URL var. Eksik title/description/canonical, tekrarlanan title/description, H1 sayısı, sitemap canonical/noindex uyuşmazlığı ve yerel kaynak/link kontrolleri hatasız.

Konu odaklı metinler, gerçek bankadan seviyeye ait örnek soru, çözüm, tahmini süre ve diğer seviyelere bağlantılar eklendi. İlgili konunun aynı seviyeleri arasında ortak açıklamalar hâlâ vardır; bütün sayfaların birbirinden tamamen farklı olduğu iddia edilmez. `outputs/site-audit.json` uzun tekrarlanan paragrafları ayrıca listeler.

Ders girişleri yaklaşık 250–500 kelime hedefindedir. Mevcut sekiz rehber korundu, ortak uzun dolgu bölümleri çıkarıldı ve hepsine erişen bir dizin eklendi. BreadcrumbList ve rehber Article verileri görünür içerikten oluşturulur; uzman adı, başarı vaadi veya uydurma yayın tarihi eklenmez.

Kayıt/giriş/panel, dinamik sınıf/konu/test ekranları ve eski bağımsız quizler noindex/follow; URL'leri erişilebilir kalır. Arama giriş noktaları statik ders/test sayfalarıdır. Robots CSS/JS/görselleri engellemez.

## 5. AdSense

`ca-pub-1287455375559097` ve ads.txt satırı korundu. Tekrarlanan reklam betiği kontrolü eklendi. Kayıt, giriş, panel, test çözme ve noindex yardımcı ekranlarından reklam betiği kaldırıldı. İçerik sayfalarındaki mevcut betik korundu; yeni reklam kutusu veya takip aracı eklenmedi.

Gizlilik metninde reklam betiği bulunması ve ağ isteği yapabilmesi açıklandı. Bu değişiklikler AdSense onayı veya hukuki uygunluk garantisi değildir. Hesabın çocuklara yönelik işlem ayarı, reklam izinleri ve gerekli rıza düzeni bu çalışma sırasında doğrulanmadı.

## 6. Performans

Harici Google Fonts istekleri kaldırıldı; sistem fontları kullanılıyor. Normalleştiricideki gereksiz dekoratif görsel üretimi durduruldu. Sorularda artık 972 kaynak tanımlı SVG kullanılıyor; eski görsel dosyaları URL kırmamak için silinmedi. Örnek soru görselleri lazy loading kullanıyor.

Yedi büyük eski PNG (yaklaşık 0,5–1,1 MB) bulundu; metin tabanlı referans taramasında kullanım bulunmadı. Dinamik/haricî kullanım kesin dışlanamadığından dosyalar silinmedi veya URL'leri değiştirilmedi. Üretim Core Web Vitals için saha verisi ölçülmedi.

Son yerel Lighthouse mobil simülasyonu: Performance **96**, Accessibility **100**, Best Practices **77**, SEO **100**. AdSense betiği bu ölçümde etkin kaldı. Best Practices hedefi karşılanmadı: üçüncü taraf reklam çerezi ve tarayıcı Issues uyarıları raporlandı. Önceki koşuda performans 82 idi; bu nedenle tek koşu canlı performans garantisi sayılmaz. Ham ölçüm: `outputs/lighthouse-home.json`.

## 7. Güvenlik ve çocuk gizliliği

Telefon ön ve arka uçta isteğe bağlı veli bilgisi oldu; mevcut 10 Sheets sütunu korundu. Veli e-postası ve takma ad açıklamaları eklendi. scrypt, HttpOnly/Secure/SameSite çerezleri ve session API korundu. Bozuk çerez güvenli reddediliyor, oturum süresi doğrulaması sıkılaştırıldı. Panelde HTML kaçışı ve başarısız çıkış kontrolü eklendi.

Otomasyon girdileri kod içine yerleştirilmek yerine ortam değişkenlerinden okunuyor; dosya kimliği/adı doğrulanıyor. `git add .` yerine yalnız test çıktıları ekleniyor. Her iki paket ağacının güncel denetiminde bilinen açık sayısı sıfır. Gerçek .env veya özel anahtar eklenmedi.

Mevcut bellekte tutulan rate limit, farklı Vercel örnekleri arasında ortak değildir. Sheets'e eşzamanlı aynı e-posta kaydı ve yoğun kullanım ölçeği ayrıca değerlendirilmelidir. Bunlar auth altyapısı yeniden yazılmadan bırakıldı.

## 8. Bağlantılar

İlk kontrolde mevcut dosyalara giden kırık HTML bağlantısı bulunmadı; dolayısıyla uydurma bir “kırık link düzeltme sayısı” verilmez. Denetleyicinin kökten başlayan yolları çözme hatası düzeltildi. JS'deki sabit yönlendirmeler ve sitemap hedefleri de taranıyor; dinamik olarak hesaplanan her URL'nin statik analizle kanıtlandığı iddia edilmez. Ana dört sınıf akışı tarayıcıda ayrıca doğrulandı.

## 9. Test edilen akışlar

- 372 test / 3.720 soru: şema, seçenekler, cevap indeksi, açıklama ve görsel dosyası kontrolleri.
- Dört sınıfta ana sayfa → Matematik → ilk konu / kolay → 10 soru → 7 doğru, 2 yanlış, 1 boş → %70 → üç soruyu inceleme → yeniden başlatma.
- 320, 375, 390, 430 ve 768 px: temsilî sayfalarda yatay taşma ve mobil menü.
- Kayıt → giriş → boş panel → çıkış: tarayıcıda açıkça tanımlı API test yanıtlarıyla. Gerçek Sheets entegrasyonu ayrıca mevcut backend testlerinde taklit servisle sınandı; canlı hesap oluşturulmadı.
- Temsilî ana sayfa, ders, landing, kayıt, giriş, 404 ve test ekranında axe WCAG A/AA otomatik kontrolü: sıfır ihlal. Bu tam WCAG sertifikası değildir.
- Son bütünleşik tarayıcı koşusu: 11/11 geçti.
- Ortak son işlem betiği tekrar çalıştırıldığında çıktı değişmiyor; üretim kalıcılığı kontrol edildi.
- 972 aktif SVG üzerinde metin taşması bulunmadı. Korunan eski/kullanılmayan dokuz SVG için taşma uyarısı kayıtlı; aktif sorular bunları kullanmıyor.
- Canlı mevcut sürümde ana sayfa, ads.txt, robots.txt, sitemap.xml, gizlilik, iletişim, hakkımızda, test, giriş, kayıt ve panel: HTTP 200. Yeni sürümün canlı doğrulaması değildir.

## 10. Bilerek değiştirilmemiş veya tamamlanmamış alanlar

Soru bankası topluca yazılmadı. Bir ölçme sorusunun cevabı/açıklaması ve birkaç ifade–görsel uyumsuzluğu düzeltildi. Bütün soruların tek doğru cevap, yaşa uygunluk ve müfredat eşleştirmesi uzman tarafından onaylanmış değildir.

Kalite taraması 1.373 soruyu kısa açıklama, uzun birinci sınıf sorusu veya metin kartı gibi ölçütlerle editöre işaretledi. Bu sayı doğrulanmış hatalı soru sayısı değildir. 54 sınıf/ders/seviye örneği de raporda bulunur: `outputs/question-quality.json`. Özellikle kalan metin kartları ile kavramsal/yaşa uygunluk incelemesi sürmelidir.

Google hesabı ayarları, resmî MEB eşleştirmesi, e-posta kutusunun mesaj alması, veri saklama/silme operasyonu, canlı Vercel env ve gerçek cihaz testleri doğrulanmadı. Mail adresi mevcut siteden korundu; çalışır kutu olduğu ileri sürülmez.

## 11. Site sahibinin yayın öncesi işleri

1. Dalı inceleyip Vercel Preview'da kendi test hesabıyla kayıt/giriş/sonuç kaydı/panel/çıkış ve veri silme talebini doğrulayın; ardından üretime alın.
2. İçerik kalite raporundaki işaretleri öğretmen/editörle gözden geçirin; güncel sınıf/ders müfredat kapsamını doğrulayın. Resmî MEB kodu ancak kaynağı doğrulanınca eklenmeli.
3. İletişim kutusuna bir deneme bildirimi gönderip alınabildiğini kontrol edin; KVKK metinlerindeki veri sorumlusu, saklama ve başvuru süreçlerini gerçek işleyişe göre netleştirin.
4. Google reklam ayarlarını çocuklara yönelik kapsam ve geçerli rıza gereksinimleri açısından kontrol edin; test/hesap sayfalarının reklam dışı kaldığını yayımdan sonra yeniden doğrulayın.
5. Search Console'da sitemap'i gönderin; URL denetimi, mobil gerçek cihaz ve canlı PageSpeed ölçümünü tamamlayın.

## AdSense başvurusundan önce yapılması gereken manuel kontroller

- [ ] Çocuklara yönelik işlem işaretlemesi ve reklam/rıza ayarları Google hesabında doğrulandı.
- [ ] Editoryal örnekler ve kalite uyarıları gözden geçirildi; doğrulanmayan müfredat/uzman iddiası yok.
- [ ] İletişim, gizlilik, veri silme başvurusu ve canlı hesap akışı çalışıyor.
- [ ] ads.txt publisher eşleşiyor; mobilde reklam ile test düğmesi karışmıyor.
- [ ] Canlı sitemap/canonical/noindex ve mobil performans kontrol edildi.

Kaynaklar: [Google çocuklara yönelik işlem ayarı](https://support.google.com/adsense/answer/3248194?hl=en), [Google noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Google sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
