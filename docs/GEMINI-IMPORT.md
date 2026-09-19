# Gemini soru paketi denetimi

Downloads klasöründeki iki ZIP aynı SHA-256 değerine sahiptir; tek kaynak paket olarak değerlendirildi. Paket güvenli yol kontrolünden geçti ve 11 Markdown içinde 110 soru içeriyor. Pakette referans verilen görsel dosyalarının hiçbiri ZIP içinde bulunmuyor.

| Sonuç | Sayı |
|---|---:|
| Native bankaya kabul edilen | 33 |
| Kesin reddedilen | 18 |
| Manuel/uzman incelemesi bekleyen | 59 |
| Eksik görsel referansı | 110 |

Kabul yalnız sorunun metin, seçenek ve cevap anahtarının matematiksel olarak yeniden hesaplanmasıyla verildi. Kaynak görsel olmadan çözülemeyen, cevabı belirsiz veya anahtarı uyuşmayan soru kabul edilmedi. Kabul edilen soruların görsel referansları kullanılmadı; metni kendi başına yeterli olanlar açıklamalı native soru biçimine dönüştürülür.

## Kesin reddedilenler

- **1.10:** A, B ve C için başlangıç değeri verilmediği için birden fazla ardışık çift üçlüsü mümkün.
- **3.10:** Romanların sayfa toplamı şiir kitaplarından fazla değil; soru kökü ve anahtar uyuşmuyor.
- **3.5:** Doğru fark 8.392; kaynak anahtarı 8.652 ve seçeneklerin hiçbiri doğru değil.
- **4.5:** Kalan sayfa sayısı 26 güne tam bölünmüyor; seçenek/yuvarlama kuralı belirtilmeden tek cevap yok.
- **4.7:** 648 ÷ 24 = 27 olmasına karşın kaynak anahtarı 28'i gösteriyor.
- **4.8:** 8A4 sayısında A için birden fazla değer bulunuyor; değerler toplamı seçeneklerle uyuşmuyor.
- **4.10:** Koşulları sağlayan en büyük A + B değeri 16; kaynak anahtarı 15'i gösteriyor.
- **7.5:** Tarih aralığında başlangıç gününün sayılıp sayılmadığı belirtilmediği için iki sonuç mümkün.
- **7.10:** Ücretlendirmede başlayan saatin yukarı yuvarlanıp yuvarlanmadığı belirtilmemiş.
- **8.2:** Katlama adımları ve kaynak görsel olmadan oluşan şekil belirlenemiyor.
- **8.3:** Simetri sonucu yazı tipine bağlı; kaynak görsel pakette yok.
- **8.9:** İkizkenar üçgende hangi iki kenarın eş olduğu açık yazılmadığı için akıl yürütme gereksiz belirsiz.
- **9.1:** Birleştirme kenarı ve yerleşim görsel olmadan belirlenemiyor.
- **9.10:** Üç karenin yan yana yerleşimi ve ortak kenarları görsel olmadan belirlenemiyor.
- **10.2:** 14.250 kg yazımı ondalık/binlik ayırıcı bakımından bağlama göre belirsiz.
- **10.9:** Kalan parçanın sayılıp sayılmadığı ile kesim sayısı ipucu birbiriyle uyuşmuyor.
- **11.3:** Grafik birimi ile kitap farkı karışıyor; görsel olmadan 'birim' yorumu belirsiz.
- **11.9:** Veriler Pazartesi ve Perşembe için 77,5 sonucunu veriyor; doğal sayı satış bağlamıyla uyuşmuyor.

## Sınırlar

Kalan 59 soru otomatik reddedilmiş sayılmaz. Öğretmen/editör onayı, yaş düzeyi ve gerekli özgün SVG üretimi tamamlanmadan runtime bankasına alınmaz. Kaynak Markdown dosyaları runtime'a bağlanmaz ve ZIP repository'ye kopyalanmaz. Ayrıntılı soru/uyarı listesi Git dışı `outputs/gemini-import-audit.json` dosyasındadır.
