# Soru kalite raporu

- Yapısal kapsam: 5200 soru, 520 test; 964 görselli soru.
- Kaynak dağılımı: native 3828, matematiksel ve editoryal olarak yeniden doğrulanan Gemini 72.
- Sınıf dağılımı: 1. sınıf 1080, 2. sınıf 1040, 3. sınıf 1360, 4. sınıf 1720.
- Otomatik uyarı alan benzersiz soru: 1569; toplam uyarı olayı: 1682.
- Aynı kök/seçenek/cevap: 132 grup / 138 fazla örnek. Aynı test içi: 0; farklı testlere yayılan: 132.
- Konu içinde sayıları kaldırınca benzer kök: 55 grup. Bunlar editoryal adaydır; tek başına hata veya silme gerekçesi değildir.

## Kontrol sınıfları

| Kontrol | Otomatik sonuç | Yorum |
|---|---:|---|
| Geçerli cevap indeksi | Ayrı npm test kontrolü | İndeks geçerliliği tek doğru seçenek bulunduğunu kanıtlamaz |
| Anlamsal olarak tek doğru cevap | TAMAMLANMADI | Seçeneklerin anlamı soru bazında incelenmelidir |
| Hesaplama hatası | MANUEL | Gemini kabul listesi yeniden hesaplandı; native bankanın akademik doğruluğu öğretmen onayı ister |
| Görsel-metne uyum | 719 aday | Kart tipi görseller için editör kontrolü; eksik dosya/alt metin 0 |
| Duplicate soru | 0 aynı test içi grup | Farklı testlerdeki 132 grup olası ortak şablon/false positive içerir |
| Benzer soru | 55 grup | Sayısal kalıp sezgisi |
| Zayıf çeldirici | 0 | Açık jenerik ifadeler aranır |
| Zorluk ayrımı | 253 aday | Kısa zor kök + kısa çözüm sezgisi |
| Yaşa uygunluk | 29 aday | Birinci sınıf uzun kök sezgisi |
| Dil/anlatım | 1 aday | Çift boşluk ve tekrarlı noktalama |
| Açıklama yetersiz | 680 | Kısa çözüm sezgisi; kısa ama yeterli çözümler false positive olabilir |
| Görsel eksikliği | 0 | Dosya ve alt metin kontrolü |
| Kazanım dışı içerik | MANUEL | Resmî kazanım kodu iddiası yok; öğretmen/müfredat editörü gerekir |
| Slug/index uyumsuzluğu | 0 | Banka slug'ı ile landing yolu eşleştirilir |

## Değişiklik kaydı

Güncel düzeltmeler ve önce/sonra değerleri `data/imports/adsense-repair-change-log.json` içinde tutulur. Bu rapor otomatik taramadır; geçmiş turlardaki işlemleri güncel kontrol gibi sunmaz.

## Sınırlar ve false positive ayrımı

Otomasyon seçenek sayısı, indeks, dosya, slug ve belirgin metin kalıplarını kesin denetler. Akademik doğruluk, yaş düzeyi, müfredat kapsamı, güçlü çeldirici ve görselin pedagojik değeri için uzman kararı gerekir. Farklı sınıf/düzeylerde geçen aynı kısa tanım veya işlem, tekrar raporunda görünebilir fakat bağlamı incelenmeden silinmez. Ayrıntılı konumlar `outputs/question-quality-final.json` dosyasındadır.
