# TestÇöz — AdSense reddi sonrası uygulama ve açık kapılar

Durum: **production ve yeniden AdSense başvurusu için hazır değil**. Bu belge, otomatik taramaları tüm içerik için insan editoryal onayı olarak göstermez.

## Yapılanlar

- 520 test, 5.200 soru, 130 konu ve test başına 10 soru korunarak 66 testte 229 soru kaydı değiştirildi. `data/imports/adsense-repair-change-log.json` her kaydın önce/sonra durumunu ve gerekçesini içerir. Kaynak bağımsızlığı için orijinal metin ve cevapların SHA-256 denetimi eklenmiştir.
- 3. sınıf İngilizce Zor Test 2'nin altı konusu ve 2. sınıfın konu dışı sınıf/kişisel/aile testleri bağlama uygun sorularla değiştirildi. Aile alanındaki 3. sınıf Test 1 sorunları, bilimsel keşif soruları ve tespit edilen belirli matematik/Türkçe/fen hataları düzeltildi.
- 130 konu için çözümlü örnek, sık karışıklık ve çalışma adımı içeren ders kartları, 520 test girişinde soruya dayalı örnekler ve gerçek editoryal sınırlara ilişkin açıklama eklendi. 19 ders sayfası ve 520 test sayfası kaynak üreticilerden yeniden üretildi.
- Eski 12 değil toplam 31 Test 1 metin kartı, değiştirilen sorularla ilgisini yitirdiği için sorudan çıkarıldı; Test 2'nin 35 görsel yuvası korunarak ilgili olanlar yeniden çizildi. Kullanılan toplam görsel 1.007'den 976'ya düştü. Depodaki dosyaların silinmesi veya ilgisiz görsellerin toptan kaldırılması yapılmadı.
- Sınırlı anlamsal tarama, örnek çözümleri, kaynak değişikliği kontrolü, SVG yapısı ve konu kartı kontrolleri; yerel tarayıcı testleri ve CI işi eklendi. Yerel tarayıcı paketi 80/80 geçti; son CSS iyileştirmesi ardından dört hedefli tarayıcı ve erişilebilirlik testi de geçti. Paket kilidindeki dört yüksek güvenlik açığı güncellenen bağımlılıklarla giderildi; `npm audit` sıfır bulgu döndürdü.

## Açık engeller

1. **İçerik:** Kapsamlı otomatik tarama 1.581 ayrı soru için 1.694 uyarı üretiyor; bunların 731'i görsel/metin inceleme, 680'i kısa açıklama, 253'ü zorluk ayrımı, 29'u yaş düzeyi adayıdır. Kategoriler örtüşür; bunlar doğrulanmış hata sayısı değildir. 136 farklı testler arası aynı soru/seçenek/cevap grubu ve 55 sayısal kalıp grubu incelenmelidir. 2. ve 3. sınıf Hayat Bilgisi Test 1'lerde aynı soru ve görsellerin sınıf etiketi değiştirilerek tekrarlanması gerçek bir örnektir. Test açılışları için 80% üçlü kelime benzerliği ölçümünde eski 10 çift yerine yeni üretimde 46 çift görülmektedir: içeriğin yerini alan kısa metinler mevcut gerçek tekrarları daha belirgin kılmıştır. Bu yükseliş giderilmeden duplicate riski çözülmüş sayılmaz.
2. **Oturum güvenliği:** Test fikstüründe çıkıştan önceki çerez çıkıştan sonra tekrar gönderilince HTTP 200 dönmektedir. Çerez tarayıcıdan silinse de yedi günlük imzalı oturum sunucuda iptal edilmemektedir. `npm run audit:session-revocation` bu nedenle FAIL. Kalıcı paylaşımlı iptal mekanizması ve veri geçişi, gerçek Sheets ortamında doğrulanmadan yayına alınmamalıdır.
3. **Çocuklara yönelik reklam:** 28 Ekim 2026'da Search Console testcoz.pro alanı çocuklara yönelik olarak etiketlenmemişti. AdSense tüm siteler ayarında kullanıcıya dayalı reklam ve birinci taraf çerezlerine izin veriliyordu. Avrupa rıza mesajı testcoz.pro için yayınlanmış görünüyordu. Yerel Lighthouse, reklam yükleyicisi açıkken üç herkese açık sayfada üçüncü taraf çerezini raporladı; bu bulgu çocuklara yönelik korumanın uygulanmış olduğunu göstermez. Çocuk etiketi, rıza ve gerçek reklam davranışı birlikte değerlendirilmedikçe yaşa uygun reklamların korunduğu söylenemez. Google mevcut belgesinde TFCD/TFUA yerine TFAT bildirimini tarif ediyor; site düzeyi için Search Console aracını gösteriyor.
4. **Üretim testleri:** Mevcut production'da kayıt/giriş/çıkış ve Sheets'e sonuç kaydetme gerçek bir kullanıcı oturumu ile bu turda doğrulanmamıştır. Yerel fikstürler gerçek Sheets kalıcılığının kanıtı değildir. Yeni dal için GitHub CI, Vercel Preview ve production kontrolleri ancak dal gönderilmesi ve uygun ortam erişimi ile doğrulanabilir.
5. **Ads.txt:** 28 Ekim'de canlı dosya HTTP 200 ve `google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0` döndürdü; AdSense sitesi paneli aynı anda “Bulunamadı” gösterdi. Panelin yeniden tarama durumunu izlemek gerekir; dosyanın canlı olması panel onayının kanıtı değildir.

## Soru bazında örnekler

- `T2-G3-INGI-FAMILY-01`: hava durumu sorusu yerine “Ada says, Mert is my brother. Our mother is Zeynep. Who is Zeynep to Mert?” aile ilişkisi sorusu.
- `T2-G3-FEN -BILIMS-01`: duyu organı ezberi yerine iki filiz ölçümünden doğrudan desteklenen sonucu ayırma.
- `T2-G1-MATE-UZUNLU-07`: “geriye sayarken 16'dan önce” ifadesi yerine açık `16, …, 14` sırası.
- `T2-G4-FEN -INSANV-02`: ampulü tek kişiye bağlayan aşırı basitleştirilmiş tarih iddiası yerine aynı aydınlıkta enerji tasarrufu karşılaştırması.

Kaynaklar: https://support.google.com/adsense/answer/3248194 ve https://support.google.com/adsense/answer/9007197 . Google kararı veya yasal uygunluk için garanti verilmez.

## Yerel Lighthouse örneği

Dört mobil sayfada ölçülen LCP sırasıyla 1,21 / 1,35 / 1,20 / 2,75 saniye; CLS 0 / 0 / 0 / 0,076. Bu yerel ölçümdür, canlı saha verisi değildir. Üç indexlenebilir sayfanın erişilebilirlik/SEO skoru 100/100, best-practices skoru üçüncü taraf çerez uyarısıyla 77'dir. Test uygulaması kasıtlı noindex olduğundan SEO skoru 63'tür. Ölçümler production sonucu veya AdSense onayı sayılmaz.
