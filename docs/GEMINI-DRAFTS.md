# Gemini ile soru ve görsel taslakları

Bu araç yalnız editör incelemesine yönelik taslak üretir. Siteyi, soru bankasını veya PR'ı otomatik olarak değiştirmez. API kullanımı ve görsel üretimi, seçilen model ve hesap kotasına göre ücretlendirilir. Küçük bir denemeyle başlayın; Google AI Studio kullanım ve faturalandırma ekranlarını kontrol edin. Öğrenci hesap bilgilerini, sonuçlarını, kişisel bilgileri veya API anahtarını istemlere koymayın.

Windows'ta anahtarı kullanıcı ortam değişkeni olarak kaydettikten sonra yeni bir PowerShell penceresinde, ya da var olan pencerede `GEMINI_API_KEY` değerini kullanıcı ortamından içeri alarak çalıştırın. Anahtarı terminal komutuna, dosyaya, depoya veya sohbete yazmayın.

```powershell
$env:GEMINI_API_KEY = [Environment]::GetEnvironmentVariable('GEMINI_API_KEY', 'User')
node scripts/gemini-drafts.mjs questions 4 matematik carpma kolay 10
```

Sınıf 1–3 için 3, sınıf 4 için 4 seçenek istenir. Seçilen konu ve seviye editör tarafından mevcut bankayla ve güncel öğretim programıyla eşleştirilmelidir. Çıktı `outputs/gemini-drafts/` altında, Git tarafından izlenmeyen bir JSON dosyasıdır. Konu ve ders alanlarında bankadaki kısa adresler kullanılır.

Görsel üretilmesi gereken bir taslak sorusu varsa, dosya yolu ve soru numarası kullanılır:

```powershell
node scripts/gemini-drafts.mjs image outputs/gemini-drafts/DOSYA.json 1
```

Görseller ayrı API çağrılarıdır ve ek maliyet oluşturabilir. Görselin veri, sayı, nesne sayısı ve soruyla tutarlılığı elle incelenmelidir. Görseldeki sayı, grafik veya metne otomatik olarak güvenilmez. Şema doğrulaması doğru cevap, uygun çeldirici, seviye veya pedagojik kaliteyi kanıtlamaz. Gerekli düzeltmeler editör tarafından mevcut kaynak ve üretici süreci üzerinden yapılır; görsel açıklaması ve erişilebilir alternatif metin de doğrulanır. İlgili testin önce/sonra kayıtları ve kimlikleri korunur.

Varsayılan modeller `gemini-3.1-flash-lite` ve `gemini-3.1-flash-image` olup hesap/ülke/kota uygunluğu değişebilir. Gerekirse `TESTCOZ_GEMINI_TEXT_MODEL` veya `TESTCOZ_GEMINI_IMAGE_MODEL` ortam değişkeniyle değiştirilebilir. Bağlantının gerçekleştiği ancak gerçek API isteğiyle doğrulanabilir.

Kaynaklar: https://ai.google.dev/gemini-api/docs/api-key, https://ai.google.dev/gemini-api/docs/structured-output, https://ai.google.dev/gemini-api/docs/image-generation, https://ai.google.dev/gemini-api/docs/pricing
