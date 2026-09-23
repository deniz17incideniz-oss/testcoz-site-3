# Gemini soru paketi denetimi

Downloads klasöründeki iki ZIP aynı SHA-256 değerine sahiptir; tek kaynak paket olarak değerlendirildi. Paket güvenli yol kontrolünden geçti ve 11 Markdown içinde 110 soru içeriyor. Pakette referans verilen görsel dosyalarının hiçbiri ZIP içinde bulunmuyor.

| Sonuç | Sayı |
|---|---:|
| Native bankaya kabul edilen | 86 |
| Runtime bankasına entegre edilen | 72 |
| Açıklaması yeniden yazılan | 72 |
| Kesin reddedilen | 24 |
| Manuel/uzman incelemesi bekleyen | 0 |
| Eksik görsel referansı | 110 |
| Yeni üretilen SVG | 0 |
| Eksik görsel nedeniyle reddedilen | 5 |

Kabul yalnız sorunun metin, seçenek ve cevap anahtarının matematiksel olarak yeniden hesaplanmasıyla verildi. Kaynak görsel olmadan çözülemeyen, cevabı belirsiz veya anahtarı uyuşmayan soru kabul edilmedi. Kabul edilen soruların görsel referansları kullanılmadı; metni kendi başına yeterli olanlar açıklamalı native soru biçimine dönüştürülür.

## Kesin reddedilenler

- **1.10:** A, B ve C için başlangıç değeri verilmediği için birden fazla ardışık çift üçlüsü mümkün.
- **3.10:** Romanların sayfa toplamı şiir kitaplarından fazla değil; soru kökü ve anahtar uyuşmuyor.
- **3.5:** Doğru fark 8.392; kaynak anahtarı 8.652 ve seçeneklerin hiçbiri doğru değil.
- **4.5:** Kalan sayfa sayısı 26 güne tam bölünmüyor; seçenek/yuvarlama kuralı belirtilmeden tek cevap yok.
- **4.7:** 648 ÷ 24 = 27 olmasına karşın kaynak anahtarı 28'i gösteriyor.
- **4.8:** 8A4 sayısında A için birden fazla değer bulunuyor; değerler toplamı seçeneklerle uyuşmuyor.
- **4.10:** Koşulları sağlayan en büyük A + B değeri 16; kaynak anahtarı 15'i gösteriyor.
- **6.3:** Kalan alanın hesabı patlıcan için 3/12 sonucunu veriyor; kaynak anahtarı 1/12'yi gösteriyor.
- **7.4:** Süreler 4.500, 4.540 ve 5.110 saniyedir; doğru sıra 2 < 1 < 3 iken kaynak anahtarı farklıdır.
- **7.5:** Tarih aralığında başlangıç gününün sayılıp sayılmadığı belirtilmediği için iki sonuç mümkün.
- **7.10:** Ücretlendirmede başlayan saatin yukarı yuvarlanıp yuvarlanmadığı belirtilmemiş.
- **8.2:** Katlama adımları ve kaynak görsel olmadan oluşan şekil belirlenemiyor.
- **8.3:** Simetri sonucu yazı tipine bağlı; kaynak görsel pakette yok.
- **8.9:** İkizkenar üçgende hangi iki kenarın eş olduğu açık yazılmadığı için akıl yürütme gereksiz belirsiz.
- **9.1:** Birleştirme kenarı ve yerleşim görsel olmadan belirlenemiyor.
- **9.2:** Üç tel sırasının her birinde 4 metrelik kapı boşluğu bırakılırsa maliyet 4.896 TL'dir; kaynak anahtarı 4.752 TL'yi gösteriyor.
- **9.10:** Üç karenin yan yana yerleşimi ve ortak kenarları görsel olmadan belirlenemiyor.
- **10.2:** 14.250 kg yazımı ondalık/binlik ayırıcı bakımından bağlama göre belirsiz.
- **10.9:** Kalan parçanın sayılıp sayılmadığı ile kesim sayısı ipucu birbiriyle uyuşmuyor.
- **11.3:** Grafik birimi ile kitap farkı karışıyor; görsel olmadan 'birim' yorumu belirsiz.
- **11.9:** Veriler Pazartesi ve Perşembe için 77,5 sonucunu veriyor; doğal sayı satış bağlamıyla uyuşmuyor.
- **8.8:** Kaynak çizim pakette bulunmadığı için şeklin kenarları ve istenen uzunluk doğrulanamıyor.
- **8.10:** Kaynak çizim pakette bulunmadığı için geometrik yerleşim ve doğru seçenek doğrulanamıyor.
- **9.7:** Kaynak çizim pakette bulunmadığı için alan yerleşimi ve ortak kenarlar doğrulanamıyor.

## Sınırlar

Kayıp çizime bağlı 8.8, 8.10 ve 9.7 RED olarak reddedildi. Metin, özgün görseli tahmin etmeden tek başına yeterli olmadığı için runtime bankasına alınmadı. Kaynak Markdown dosyaları runtime'a bağlanmaz ve ZIP repository'ye kopyalanmaz. Ayrıntılı soru/uyarı listesi Git dışı `outputs/gemini-import-audit.json` dosyasındadır.
