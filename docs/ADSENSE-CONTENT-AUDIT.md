# AdSense içerik denetimi — 20 Eylül 2026

## Kapsam

| Ölçüm | Sonuç |
|---|---:|
| HTML sayfası | 422 |
| Indexlenebilir sayfa | 398 |
| Sitemap URL'si | 398 |
| İnce içerik adayı (120 kelimeden az) | 0 |
| Orphan indexlenebilir sayfa | 0 |
| Yüksek benzerlikli landing çifti (>= %80) | 0 |
| Tekrarlanan uzun paragraf | Son site audit'iyle ölçülür |

Google, AdSense'e bağlanan sayfalarda özgün ve kullanıcıya yararlı içerik ile açık navigasyon beklediğini belirtir. Google Search politikaları da sıralama amacıyla çok sayıda düşük değerli ve birbirine benzeyen sayfa üretimini scaled content abuse kapsamında değerlendirir. Bu denetim bu iki riski ayrı ayrı ölçer:

- [AdSense için sayfa hazırlığı](https://support.google.com/adsense/answer/7299563?hl=en)
- [Google Search spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies)

## Özgünlük ve şablon riski

Test landing sayfaları yalnız başlık ve CTA'dan oluşmaz. Her sayfada konu özeti, test bilgileri, beceriler, öğrenme hedefleri, sık yapılan hatalar, hazırlık önerisi, gerçek örnek soru, test sonrası öneri, veli önerisi, ilgili seviyeler ve breadcrumb bulunur.

2. ve 3. sınıfta ortak ad taşıyan ders konuları sınıfın gerçek öğrenme derinliğine göre ayrıştırıldı. Fen Bilimleri canlılar ve yaşam alanı sayfaları ile geometri konularının ilk ve ikinci bölümleri farklı beceri ve çalışma önerileri kullanır. Benzerlik taramasındaki 43 yüksek benzerlikli çift son turda 0'a indi. Bu ölçüm editoryal destek aracıdır; tek başına arama motoru veya AdSense kararı değildir.

## Soru içeriği

- 372 testte 3.720 soru bulunur.
- Aynı test içinde birebir tekrar yoktur.
- 972 soru görsel içerir; eksik dosya veya eksik alt metin yoktur.
- Yapısal doğrulayıcı boş soru, boş seçenek, tekrarlanan seçenek, geçersiz cevap indeksi, boş açıklama, bozuk görsel ve yinelenen soru kimliğini blocker kabul eder.
- Gemini paketindeki 110 soru yeniden değerlendirildi: 86 matematiksel/editoryal doğrulama, 72 runtime entegrasyonu, 21 red ve 3 kayıp görsel nedeniyle bekleyen sonuç elde edildi.

Otomatik uyarılar akademik onay yerine geçmez. Kısa açıklama, zorluk ayrımı, çeldirici niteliği ve yaş düzeyi adayları uzman örneklemesi için korunur; sayı düşürmek amacıyla doğru sorular değiştirilmez.

## Görsel içerik

Mevcut 972 görsel soru nicelik ve teknik çeşitlilik açısından yeni toplu görsel üretimini gerektirmiyor. Görseller responsive olarak üretiliyor, sabit boyut ve cevap vermeyen alternatif metin taşıyor. Otomatik kontroller bozuk görsel bulmadı. Kart türü görsellerin pedagojik değeri için 756 aday uzman örneklemesine açık kaldığından, tüm görsellerin uzman onayı aldığı iddia edilmez. Kayıp Gemini görselleri tahmin edilerek yeniden oluşturulmadı.

## Rehber ve güven içeriği

- Sekiz çalışma rehberi ile rehber indeks sayfası bulunur.
- Hakkımızda, İletişim, Gizlilik Politikası ve Kullanım Şartları footer'dan erişilebilir.
- Yeni İçerik Yaklaşımımız sayfası soru hazırlama, zorluk, açıklama, görsel, kaynak ve hata bildirimi süreçlerini yapılan işlerle sınırlı biçimde açıklar.
- MEB onayı veya öğretmen onayı varmış gibi bir iddia kullanılmaz.

## Noindex kararı

Kayıt, giriş, panel, runtime ve kişisel test sayfaları arama için bağımsız içerik değeri üretmediğinden noindex kalır. Ana sınıf navigasyonunda yer almayan 4. sınıf Hayat Bilgisi ders sayfası ile 12 eski test landing sayfası noindex yapıldı ve sitemap'ten çıkarıldı. URL'ler silinmedi.

## Sonuç

Teknik içerik gate'i PASS: thin page 0, orphan 0, sitemap/index eşleşmesi tam, güven sayfaları mevcut ve yüksek benzerlik kümesi kalmadı. Pedagojik uzman örneklemesi ayrı bir editoryal gate olarak devam eder.
