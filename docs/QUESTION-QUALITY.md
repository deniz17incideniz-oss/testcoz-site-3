# Soru kalite raporu

- Yapısal kapsam: 3720 soru, 372 test; 972 görselli soru.
- Kaynak dağılımı: native 3648, matematiksel ve editoryal olarak yeniden doğrulanan Gemini 72.
- Sınıf dağılımı: 1. sınıf 630, 2. sınıf 780, 3. sınıf 1020, 4. sınıf 1290.
- Otomatik uyarı alan benzersiz soru: 1529; toplam uyarı olayı: 1649.
- Aynı kök/seçenek/cevap: 175 grup / 205 fazla örnek. Aynı test içi: 0; farklı testlere yayılan: 175.
- Konu içinde sayıları kaldırınca benzer kök: 55 grup. Bunlar editoryal adaydır; tek başına hata veya silme gerekçesi değildir.

## Kontrol sınıfları

| Kontrol | Otomatik sonuç | Yorum |
|---|---:|---|
| Tek doğru cevap / geçerli indeks | PASS | Yapısal doğrulayıcı bütün soruları kontrol eder |
| Hesaplama hatası | MANUEL | Gemini kabul listesi yeniden hesaplandı; native bankanın akademik doğruluğu öğretmen onayı ister |
| Görsel-metne uyum | 756 aday | Kart tipi görseller için editör kontrolü; eksik dosya/alt metin 0 |
| Duplicate soru | 0 aynı test içi grup | Farklı testlerdeki 175 grup olası ortak şablon/false positive içerir |
| Benzer soru | 55 grup | Sayısal kalıp sezgisi |
| Zayıf çeldirici | 53 | Açık jenerik ifadeler aranır |
| Zorluk ayrımı | 232 aday | Kısa zor kök + kısa çözüm sezgisi |
| Yaşa uygunluk | 28 aday | Birinci sınıf uzun kök sezgisi |
| Dil/anlatım | 0 aday | Çift boşluk ve tekrarlı noktalama |
| Açıklama yetersiz | 580 | Kısa çözüm sezgisi; kısa ama yeterli çözümler false positive olabilir |
| Görsel eksikliği | 0 | Dosya ve alt metin kontrolü |
| Kazanım dışı içerik | MANUEL | Resmî kazanım kodu iddiası yok; öğretmen/müfredat editörü gerekir |
| Slug/index uyumsuzluğu | 0 | Banka slug'ı ile landing yolu eşleştirilir |

## Bu turdaki değişiklik

4. sınıf geometrinin 30 soruluk üç seviyesi önceki turda yeniden yazıldı. Bu tur Downloads içindeki özdeş iki Gemini ZIP'i güvenli biçimde denetlendi: 110 sorudan 33'ü yeniden hesaplanıp açıklamalı native biçime dönüştürüldü, 18'i kesin reddedildi, 59'u öğretmen/editör incelemesine bırakıldı. Eksik kaynak görsellere bağlı hiçbir soru eklenmedi. 4. sınıf sözel üreticisindeki açık jenerik çeldiriciler konu verileriyle değiştirildi. Soru sayısı, URL'ler ve her testteki 10 soru yapısı korundu.

## Sınırlar ve false positive ayrımı

Otomasyon seçenek sayısı, indeks, dosya, slug ve belirgin metin kalıplarını kesin denetler. Akademik doğruluk, yaş düzeyi, müfredat kapsamı, güçlü çeldirici ve görselin pedagojik değeri için uzman kararı gerekir. Farklı sınıf/düzeylerde geçen aynı kısa tanım veya işlem, tekrar raporunda görünebilir fakat bağlamı incelenmeden silinmez. Ayrıntılı konumlar `outputs/question-quality-final.json` dosyasındadır.
