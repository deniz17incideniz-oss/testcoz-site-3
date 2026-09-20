# Lighthouse kök neden analizi — 20 Eylül 2026

Ölçüm `npm run lighthouse` ile yerel production benzeri sunucuda, mobil Lighthouse profili ve gerçek AdSense yükleyicisi açıkken yapıldı.

| Sayfa | Performance | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|
| Home | 75 | 1,1 sn | 1,2 sn | 1.260 ms | 0 |
| Lesson | 80 | 1,1 sn | 2,2 sn | 760 ms | 0 |
| Landing | 85 | 1,1 sn | 1,9 sn | 610 ms | 0 |
| Runtime | 98 | 1,4 sn | 2,3 sn | 50 ms | 0,076 |

## Kök nedenler

- **A — Kendi CSS/JS kodumuz:** Tek paylaşılan CSS dosyası 46,7 KB; sayfa türüne göre 32–39 KB kullanılmayan kural ve 310–760 ms render-blocking tahmini bildiriliyor. Dosyayı sayfa türlerine bölmek cache davranışını ve 398 sayfanın üretimini karmaşıklaştıracak; mevcut dosya küçük, sıkıştırılabilir ve kritik metin 1,1–1,4 saniyede görünüyor. Public sayfalardaki kendi JavaScript değerlendirmesi 6–10 ms. Runtime JavaScript'i 50 ms TBT ile 98 puan alıyor.
- **B — Görsel/font:** Büyük raster görsel, harici font veya font-display sorunu bulunmadı. SVG'ler responsive `viewBox` kullanıyor ve örneklemde 200 KB sınırının altında.
- **C — AdSense:** Public sayfalarda yaklaşık 249 KB ana AdSense aktarımı ile ek Google kalite istekleri var. Kullanılmayan JavaScript tahmininin 140–148 KB'si tamamen Google AdSense dosyalarından geliyor. Google betiklerinin ölçülen parse/değerlendirme süresi Home'da yaklaşık 1,0 sn, Lesson'da yaklaşık 0,8 sn, Landing'de yaklaşık 0,6 sn. Reklamsız runtime'ın 97 puanı ve 80 ms TBT'si bu ayrımı doğruluyor.
- **D — Diğer third-party:** AdSense'in çağırdığı Google reklam kalite/ölçüm uçları dışında bağımsız üçüncü taraf bulunmadı.

## Karar

Kendi kodundan gelen anlamlı, düşük riskli bir engelleyici bulunmadı. Paylaşılan CSS'in sayfa bazında bölünmesi bu stabilizasyon turunda orantısız değişiklik olur. AdSense yükleyicisi public/indexlenebilir sayfalarda bir kez, `async`, resmi URL ve doğru client kimliğiyle bulunuyor; auth, panel ve test runtime sayfalarında yok. Skoru yükseltmek için resmi yükleyici kaldırılmadı veya geciktirilmedi.
