# AdSense final readiness — 20 Eylül 2026

## Production Readiness

**FAIL**

Kod, içerik ve güvenlik kontrolleri geçti: 372 test / 3.720 soru, 398 indexlenebilir URL, thin/orphan/broken URL 0, yüksek benzer landing çifti 0, 24/24 tarayıcı senaryosu, 270 soruluk pedagojik örneklemde gerçek problem 0, secret scan temiz, npm audit 0 ve generator iki çalıştırmada aynı hash. Head commit `0b68858a457897a260fbcc568c5180b8baf54783` için GitHub Actions SUCCESS ve Vercel Preview Ready.

Production gate'i kapatan tek teknik blocker Vercel'deki `GOOGLE_SHEETS_PRIVATE_KEY` değeridir. Değişken hem Preview hem Production'da var, ancak çalışma zamanındaki biçim kontrolünde geçersizdir; çekilen yapılandırmadaki değer yalnız 11 karakterdir ve PEM başlangıç/bitiş işaretlerini içermez. Bu nedenle gerçek kayıt, giriş, oturum, sonuç kaydı, panelde yeniden okuma ve çıkış zinciri çalıştırılamaz. PR #2 draft bırakılmış, merge ve production deployment yapılmamıştır. Mevcut canlı sürüm eski sürümdür; `icerik-yaklasimimiz.html` canlıda 404 ve sitemap 411 URL döndürür.

Preview `ALLOWED_ORIGINS`, yalnız `codex/final-quality-pass` dalının tam Vercel alias'ına bağlandı. Yeni deployment `Ready` oldu. Origin matrisi: production origin 200, exact preview 200; benzer görünümlü domain, başka Vercel domaini ve uzak HTTP origin 403.

## AdSense Review Readiness

**MANUAL BLOCKER**

Kod tarafı: `ads.txt` doğru publisher satırıyla PASS, publisher/client kimliği doğru, loader public/indexlenebilir sayfalarda bir kez ve `async`, auth/panel/runtime/noindex alanlarında reklamsız. Manuel ad slotu bulunmadığı için cevap seçenekleri veya test CTA'ları yanında kodla yerleştirilmiş reklam yok. Auto Ads'in gerçek yerleşimleri hesap panelinde kontrol edilmelidir.

Google'ın güncel resmi dokümanına göre eski TFCD/TFUA sinyalleri kullanımdan kaldırılmış ve yaş kısıtlı treatment için TFAT kullanılmaktadır. Hangi kullanıcı veya sitenin CHILD/TEEN treatment alacağı hukuki ve hesap düzeyi karardır; kodda tahmin edilmedi. EEA, Birleşik Krallık ve İsviçre'de kişiselleştirilmiş reklamlar için Google-certified ve IAB TCF ile entegre CMP gereklidir. Bu iki hesap ayarı ile Privacy & Messaging yayını AdSense panelinde doğrulanmadan review request gönderilmemelidir.

Resmî kaynaklar:

- [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263?hl=en)
- [Ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)
- [Tag an ad request for age restricted treatment](https://support.google.com/adsense/answer/9007197?hl=en)
- [Google consent management requirements](https://support.google.com/adsense/answer/13554020?hl=en)
- [Set up and manage your CMP](https://support.google.com/adsense/answer/7670013?hl=en-GB)

## Required account actions

1. Google Cloud'dan ilgili servis hesabının geçerli JSON/PEM private key değerini alın; Vercel'de `GOOGLE_SHEETS_PRIVATE_KEY` için Preview ve Production değerlerini değiştirin. Değer `-----BEGIN PRIVATE KEY-----` ve `-----END PRIVATE KEY-----` bloklarını içermelidir.
2. Yeni Preview deployment alın; kontrollü QA hesabıyla kayıt → giriş → session → test sonucu kaydı → reload → panel → logout zincirini çalıştırın. Silme API'si olmadığı için oluşturulan QA satırlarını yalnız QA e-postasına göre Google Sheets'ten elle silin.
3. AdSense'te sitenin doğru TFAT/site treatment kararını uygulayın.
4. Privacy & Messaging'de Google-certified CMP mesajını gereken bölgeler için yayınlayın.
5. Auto Ads önizlemesinde reklamların Teste Başla, cevap seçenekleri, Sonraki Soru ve Yanlışlarını Öğren kontrollerine yaklaşmadığını doğrulayın.
6. Production release sonrasında Search Console'a güncel sitemap'i gönderin; ana sayfa, bir sınıf, bir ders ve bir test landing URL'sini inceleyin.

Process-memory rate limit ve Google Sheets duplicate-email yarış koşulu mevcut düşük trafikli mimarinin non-blocking sınırlamalarıdır.
