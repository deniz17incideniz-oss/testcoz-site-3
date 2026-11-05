# Canlıdaki kritik sağlık soruları için dar düzeltme

`main` üzerindeki 2. ve 3. sınıf Hayat Bilgisi Sağlığım ve Güvenliğim zor Test 1 sorularından üçer tanesinde ilaç, trafik veya kaskla ilgisiz cevap/sonuç bağlantıları tespit edildi. 3. sınıf orta Test 1'in 6. sorusunda trafik güvenliği yerine beslenme doğru cevap olarak gösteriliyordu. Canlıdaki 2. sınıf zor Test 1'in 3. sorusu 5 Kasım 2026 tarihinde tarayıcıda doğrudan gözlendi.

Bu değişiklik yalnız aşağıdaki yedi kimliği yeniden yazar; soru sayısı, konular ve yollar değişmez:

- `2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1-soru-3`, `-soru-7`, `-soru-10`
- `3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1-soru-3`, `-soru-7`, `-soru-10`
- `3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1-soru-6`

İlaç soruları yetişkine haber verme ve başka kişiye ait ilacı kullanmama; trafik soruları geçiş güvenliği; iki son soru ise sağlık ve kişisel güvenlik hakkında bağlamı açık durumlar içerir. İlgisiz iki eski görsel bağlantısı kaldırılmış, dosyalar silinmemiştir. Yedi sorunun tamamı tek tek yeniden yazıldı ve üç seçenekli olarak incelendi; diğer seçenek sayıları mekanik olarak değiştirilmedi. Önceki içerik Git geçmişinde ve PR #5 değişiklik günlüğünde bulunur.

Soru kaynaklarına müdahale etmeden `zy-safety-hotfix.js` katmanı yüklenir; Test 2 dışarıda tutulur. Üretim süreçleri de aynı veriyi kullanır. Ayrı karşılaştırma 520 testte 5.200 kalıcı kimliği ve diğer 5.193 kaydı doğrular. Paket kilidi mevcut PR #5 ile aynı güvenlik güncellemelerine getirildi; clean `npm ci` ve `npm audit` sıfır bilinen açık gösterdi. Otomatik testler, kısmi tarayıcı denemesi ve bu dar düzeltme tüm bankanın eğitim kalitesini veya AdSense uygunluğunu belgelemez.

PR #5 hâlâ daha geniş çalışma olarak korunur; ana dala bu düzeltme alındıktan sonra üretici ve yükleyici birleşimi ayrıca doğrulanmalıdır. Hedef tüm PR #5'i bu düzeltmeyle birleştirmek değildir.
