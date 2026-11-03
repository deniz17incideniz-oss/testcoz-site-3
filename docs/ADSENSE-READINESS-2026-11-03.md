# AdSense hazırlığı — 3 Kasım 2026

Bu belge anlık bir çalışma kaydıdır. AdSense onayı veya hukukî uygunluk sertifikası değildir. Panel ve üretim durumu yeniden başvuru öncesinde yeniden kontrol edilmelidir.

## Doğrulanan hesap ve yayın durumu

- AdSense Sites ekranında testcoz.pro için “Müdahale edilmesi gerekiyor” ve “Düşük değere sahip içerik” gösterildi; son güncelleme 18 Ekim 2026. Politika merkezi ayrı olarak “Politika ihlali sorunu yok” diyor. Bu iki ekran farklı durumları gösterir; ikincisi sitenin reklam göstermeye hazır olduğu anlamına gelmez.
- Sites tablosunda ads.txt “Bulunamadı”. Aynı gün `https://testcoz.pro/ads.txt` HTTP 200 ile Google'ın panelde gösterdiği `google.com, pub-1287455375559097, DIRECT, f08c47fec0942fa0` satırını verdi; www adresi kök adrese yönlendi. Dosyanın erişilebilirliği panel tarayıcısının durumu güncellediğini kanıtlamaz.
- AdSense ana sayfasındaki ödeme kartı “Profiliniz tamamlandı” derken genel uyarı ödeme bilgileri eklenmesini de istiyor. Çelişki ödeme/etkinleştirme ekranından yeniden doğrulanmalı; kişisel veya finansal veri bu belgede tutulmaz.
- Gizlilik ve Mesajlaşma ekranında testcoz.pro için Avrupa tüzükleri mesajı “Yayınlandı”. Önizlemede izin ver, izin vermeyin ve seçenekleri yönet düğmeleri açık; gelir odaklı mesaj optimizasyonu da açık ve Google standart ya da sınırlı mesaj arasında seçim yapabildiğini belirtiyor. Gösterim sayısı 0 olarak görüldü. Mesaj metni hassas olabilecek veri işleme ve kesin konuma da atıf yapıyor; çocuklara yönelik işlem ve gerçek yayın davranışıyla uyumu ayrıca değerlendirilmeli. Bu panel durumu tek başına ziyaretçinin doğru mesajı gördüğünü veya tüm rıza kurallarının yerine getirildiğini kanıtlamaz.
- Search Console çocuklara yönelik değerlendirme ekranında hem alan adı mülkü hem `https://testcoz.pro/` mülkü “etiketlenmemiş” gösterdi. İlgili kullanıcı onayı ve Google ekranındaki sonuç görülmeden işaretlenmiş kabul edilmez. Site ağırlıklı olarak 1–4. sınıf öğrencilerine yöneliktir.
- Production `main` ve PR durumu her çalışma başında yeniden kontrol edilir. Bu belge yazılırken PR #5, önceden doğrulanan çalışmaları içeren taslak daldır; PR ve Preview başarısı canlı yayın kanıtı değildir.

## İçerik çalışması ve öncelik

1. Yanlış cevap, konu uyuşmazlığı, gerçekçi olmayan problem ve görsel uyuşmazlığını önce incele ve kanıtlanan hataları kaynakta düzelt.
2. Aynı testte tek kalıbın sayı değişimleriyle tekrarlandığı örnekleri incele. 4. sınıf Kesirler kolay ve orta Test 1'deki 20 kayıt bu çalışmada değiştirildi; aynı kimlik ve adresler korundu, konuya özgü kavramlar ve işlemli açıklamalar eklendi. Güncel otomatik taramada en az beş kaydı aynı sayısal kalıba düşen 28 test/grup örneği ve toplam 464 sayısal şablon grubu vardı. Bunlar tespit adayıdır; tümü onaylanmış hata sayısı değildir.
3. Kısa veya soru kökünü tekrarlayan açıklamaları tek tek değerlendir; öğrencinin çözüm yolunu görebildiği açıklamalar üret. Zor etiketini yalnız uzun metinle haklı gösterme.
4. Ders/konu sayfalarını örneklemle karşılaştır; gerçek çözümlü örnek, yaygın hata ve konuya özgü alıştırma bulunmasını değerlendir. Tek tip dolgu metni ekleme.
5. Soru metni, cevap anahtarı, çeldiriciler, görsel ve sınıf düzeyini bağımsız kontrol et; düzeltmelerin önce/sonra kaydını koru. Üç şık hedefi için eski seçenekleri mekanik olarak silme.

## Yayın ve yeniden değerlendirme sırası

1. PR #5 kapsamındaki değişiklikleri ve etkili soru bankasını editoryal olarak gözden geçir; gerçek hesaplı Preview kanıtını, değişen kod kapsamıyla birlikte değerlendir.
2. Generate, mevcut otomatik kontroller, kapsamlı tarayıcı testi, mobil/erişilebilirlik, bağlantı, sitemap ve canonical kontrollerini çalıştır; sonuçları gerçek commit ve ortama bağla.
3. Google hesabında çocuklara yönelik işleme, testcoz.pro için etkin rıza mesajının kapsamı ve gerçek gösterimi, ads.txt tarama durumu ve ödeme etkinleştirmesini doğrula. Uygulanabilir bölge ve yaş kurallarını değerlendir. Panelde ayar değişikliği veya kullanıcı bildirimi gerekiyorsa gerçek sonucu oku.
4. Yayın kapıları uygunsa mevcut PR'ı birleştir; Vercel production dağıtımını, canlı test akışını ve gerçek URL'leri kontrol et. Mevcut kullanıcı verilerini koru.
5. Ancak içerik, production ve hesap kapıları yeterli olduğunda site incelemesine hazır olup olmadığını değerlendir. Otomatik kontroller Google onayını garanti etmez; yapılmamış inceleme isteğini gönderilmiş sayma.

## Google'ın kaynakları

- Site hazırlığı ve yeniden inceleme: https://support.google.com/adsense/answer/12176698
- Yaşa yönelik işlem: https://support.google.com/adsense/answer/3248194 ve https://support.google.com/adsense/answer/9007197
- Avrupa bölgesinde rıza yönetimi: https://support.google.com/adsense/answer/13554116
- ads.txt taraması ve durum güncellemesi: https://support.google.com/adsense/answer/12171612
