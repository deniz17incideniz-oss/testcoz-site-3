# Lighthouse

Yerel mobil ölçüm; production ölçümü değildir. AdSense yükleyicisi engellenmedi. Ağ koşulları sonuçları etkiler.

| Sayfa | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| / | 92 | 100 | 77 | 100 |
| /ders/1-sinif-matematik.html | 88 | 100 | 77 | 100 |
| /tests/1-sinif-matematik-sayilar-ve-nicelikler-kolay-test-1.html | 85 | 100 | 77 | 100 |
| /test.html?sinif=1&ders=matematik&konu=sayilar-ve-nicelikler&zorluk=kolay&test=1 | 97 | 100 | 100 | 63 |

Tam kanıt: outputs/lighthouse-summary.json. npm run lighthouse ile yeniden üretilebilir.

Runtime SEO 63: bilinçli noindex nedeniyle; public landing sayfaları SEO 100. Public Best Practices 77: üçüncü taraf reklam çerezleri/Issues bulguları. Performance >=90 hedefi ders ve landing için son koşuda karşılanmadı; ölçümler reklam ağı ve CPU yüküne duyarlıdır.
