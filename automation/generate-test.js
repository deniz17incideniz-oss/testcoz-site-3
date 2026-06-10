const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// ─── CLI Argümanları ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const docxPath = args[0];
const outputPath = args[1];

if (!docxPath || !outputPath) {
  console.error('Kullanım: node generate-test.js <docx-dosyası> <çıktı-html>');
  process.exit(1);
}

// ─── Dosya adından meta çıkar ─────────────────────────────────────────────────
function parseFilename(filename) {
  // Örnek: 4-matematik-zaman-olcme-test-3-zor.docx
  const base = path.basename(filename, path.extname(filename));
  const parts = base.split('-');

  const meta = {
    sinif: '',
    ders: '',
    konu: '',
    testNo: '',
    zorluk: '',
    slug: base
  };

  // İlk kısım sınıf numarası olabilir
  if (/^\d+$/.test(parts[0])) {
    meta.sinif = parts[0];
    parts.shift();
  }

  // Son kısım zorluk olabilir (kolay/orta/zor)
  const zorluklar = ['kolay', 'orta', 'zor'];
  if (zorluklar.includes(parts[parts.length - 1])) {
    meta.zorluk = parts.pop();
  }

  // "test" kelimesinden öncesi konu, sonraki numara test no
  const testIdx = parts.indexOf('test');
  if (testIdx !== -1) {
    meta.ders = parts[0] ? capitalize(parts[0]) : '';
    meta.konu = parts.slice(1, testIdx).map(capitalize).join(' ');
    meta.testNo = parts[testIdx + 1] || '1';
  } else {
    meta.ders = parts[0] ? capitalize(parts[0]) : '';
    meta.konu = parts.slice(1).map(capitalize).join(' ');
  }

  return meta;
}

function capitalize(s) {
  if (!s) return '';
  const map = {
    'matematik': 'Matematik', 'turkce': 'Türkçe', 'fen': 'Fen Bilimleri',
    'sosyal': 'Sosyal Bilgiler', 'ingilizce': 'İngilizce', 'din': 'Din Kültürü',
    'fizik': 'Fizik', 'kimya': 'Kimya', 'biyoloji': 'Biyoloji',
    'tarih': 'Tarih', 'cografya': 'Coğrafya', 'edebiyat': 'Edebiyat',
  };
  return map[s.toLowerCase()] || (s.charAt(0).toUpperCase() + s.slice(1));
}

// ─── DOCX Parse ──────────────────────────────────────────────────────────────
async function parseDocx(filePath) {
  // mammoth HTML çıktısı al – stil bilgisini de alıyoruz
  const htmlResult = await mammoth.convertToHtml({ path: filePath }, {
    styleMap: [
      "b => b",
      "i => i",
      "u => u",
    ]
  });

  // Raw text de al (cevap anahtarı için)
  const textResult = await mammoth.extractRawText({ path: filePath });

  return {
    html: htmlResult.value,
    text: textResult.value,
    messages: htmlResult.messages
  };
}

// ─── HTML'den Bölümleri Ayır ─────────────────────────────────────────────────
function splitSections(rawHtml, rawText) {
  // Text üzerinden bölümleri bul
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l);

  // Bölüm başlıklarını tespit et (büyük/küçük harf duyarsız)
  const cevapIdx = lines.findIndex(l =>
    /^(cevap\s*(anahtarı|kağıdı|anahtar)|cevaplar|answers)/i.test(l)
  );
  const cozumIdx = lines.findIndex(l =>
    /^(çözümler|çözüm|açıklamalar|açıklama|solutions)/i.test(l)
  );

  let soruLines, cevapLines, cozumLines;

  if (cevapIdx > -1 && cozumIdx > -1) {
    soruLines  = lines.slice(0, cevapIdx);
    cevapLines = lines.slice(cevapIdx + 1, cozumIdx);
    cozumLines = lines.slice(cozumIdx + 1);
  } else if (cevapIdx > -1) {
    soruLines  = lines.slice(0, cevapIdx);
    cevapLines = lines.slice(cevapIdx + 1);
    cozumLines = [];
  } else {
    // Bölüm ayrımı yoksa tümünü soru kabul et, cevap yok
    soruLines  = lines;
    cevapLines = [];
    cozumLines = [];
  }

  return { soruLines, cevapLines, cozumLines };
}

// ─── Soruları Parse Et ───────────────────────────────────────────────────────
function parseSorular(lines) {
  const sorular = [];
  let currentSoru = null;

  for (const line of lines) {
    // Soru başlangıcı: "1.", "1 -", "1)" gibi
    const soruMatch = line.match(/^(\d{1,2})[.\-\)]\s*(.*)/);
    // Şık: "A)", "A.", "(A)", "A-" gibi
    const sikMatch  = line.match(/^([A-Ea-e])[.\)\-\s]\s*(.*)/);

    if (soruMatch) {
      if (currentSoru) sorular.push(currentSoru);
      currentSoru = {
        no: parseInt(soruMatch[1]),
        metin: soruMatch[2],
        siklar: {}
      };
    } else if (sikMatch && currentSoru) {
      const harf = sikMatch[1].toUpperCase();
      currentSoru.siklar[harf] = sikMatch[2];
    } else if (currentSoru && !sikMatch) {
      // Soru metninin devamı (alt satır)
      if (Object.keys(currentSoru.siklar).length === 0) {
        currentSoru.metin += '\n' + line;
      } else {
        // Son şıkın devamı
        const lastHarf = Object.keys(currentSoru.siklar).pop();
        if (lastHarf) currentSoru.siklar[lastHarf] += ' ' + line;
      }
    }
  }

  if (currentSoru) sorular.push(currentSoru);
  return sorular;
}

// ─── Cevap Anahtarını Parse Et ───────────────────────────────────────────────
function parseCevaplar(lines) {
  const cevaplar = {};

  for (const line of lines) {
    // "1. A", "1 - A", "1) A", "1.A" formatları
    const m = line.match(/(\d{1,2})[.\)\-\s]+([A-Ea-e])/i);
    if (m) {
      cevaplar[parseInt(m[1])] = m[2].toUpperCase();
    }
  }

  return cevaplar;
}

// ─── Çözümleri Parse Et ──────────────────────────────────────────────────────
function parseCozumler(lines) {
  const cozumler = {};
  let currentNo = null;
  let currentText = [];

  for (const line of lines) {
    const soruMatch = line.match(/^(\d{1,2})[.\-\)]\s*(.*)/);
    if (soruMatch) {
      if (currentNo !== null) {
        cozumler[currentNo] = currentText.join('\n').trim();
      }
      currentNo = parseInt(soruMatch[1]);
      currentText = soruMatch[2] ? [soruMatch[2]] : [];
    } else if (currentNo !== null) {
      currentText.push(line);
    }
  }

  if (currentNo !== null) {
    cozumler[currentNo] = currentText.join('\n').trim();
  }

  return cozumler;
}

// ─── HTML Üret ───────────────────────────────────────────────────────────────
function generateHTML(meta, sorular, cevaplar, cozumler) {
  const toplamSoru = sorular.length;
  const baslik = [
    meta.sinif ? `${meta.sinif}. Sınıf` : '',
    meta.ders,
    meta.konu,
    meta.testNo ? `Test ${meta.testNo}` : '',
    meta.zorluk ? `(${capitalize2(meta.zorluk)})` : ''
  ].filter(Boolean).join(' – ');

  function capitalize2(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }

  // Soru HTML'leri
  const soruHTML = sorular.map(soru => {
    const sikHarfleri = Object.keys(soru.siklar);
    const siklerHTML = sikHarfleri.map(harf => `
      <div class="sik" data-soru="${soru.no}" data-sik="${harf}">
        <span class="sik-harf">${harf}</span>
        <span class="sik-metin">${escapeHtml(soru.siklar[harf])}</span>
      </div>`).join('');

    const metin = soru.metin
      .split('\n')
      .map(s => escapeHtml(s.trim()))
      .filter(s => s)
      .join('<br>');

    return `
    <div class="soru" id="soru-${soru.no}" data-no="${soru.no}">
      <div class="soru-metin"><strong>${soru.no}.</strong> ${metin}</div>
      <div class="siklar">${siklerHTML}</div>
    </div>`;
  }).join('\n');

  const cevapJSON = JSON.stringify(cevaplar);
  const cozumJSON = JSON.stringify(cozumler);

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(baslik)} | testcoz.pro</title>
  <style>
    :root {
      --primary: #4f46e5;
      --primary-light: #eef2ff;
      --success: #16a34a;
      --success-light: #dcfce7;
      --danger: #dc2626;
      --danger-light: #fee2e2;
      --gray: #6b7280;
      --border: #e5e7eb;
      --bg: #f9fafb;
      --card: #ffffff;
      --text: #111827;
      --text-secondary: #6b7280;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    header {
      background: var(--primary);
      color: #fff;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,.15);
    }

    header h1 { font-size: 1.1rem; font-weight: 700; line-height: 1.3; }
    header .badge {
      background: rgba(255,255,255,.2);
      padding: 4px 12px;
      border-radius: 20px;
      font-size: .8rem;
      white-space: nowrap;
    }

    .konteyner {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px 16px 80px;
    }

    .bilgi-bar {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      font-size: .85rem;
      color: var(--text-secondary);
    }
    .bilgi-bar span strong { color: var(--text); }

    .soru {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 14px;
      transition: box-shadow .2s;
    }
    .soru:hover { box-shadow: 0 2px 12px rgba(0,0,0,.06); }

    .soru-metin {
      font-size: .95rem;
      line-height: 1.65;
      margin-bottom: 14px;
      white-space: pre-wrap;
    }
    .soru-metin strong { font-size: 1rem; }

    .siklar { display: flex; flex-direction: column; gap: 8px; }

    .sik {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 14px;
      border: 2px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all .18s;
      user-select: none;
    }
    .sik:hover:not(.disabled) {
      border-color: var(--primary);
      background: var(--primary-light);
    }
    .sik.secili {
      border-color: var(--primary);
      background: var(--primary-light);
    }
    .sik.dogru {
      border-color: var(--success) !important;
      background: var(--success-light) !important;
    }
    .sik.yanlis {
      border-color: var(--danger) !important;
      background: var(--danger-light) !important;
    }
    .sik.disabled { cursor: default; pointer-events: none; }

    .sik-harf {
      font-weight: 700;
      font-size: .9rem;
      min-width: 20px;
      color: var(--primary);
    }
    .sik.dogru .sik-harf { color: var(--success); }
    .sik.yanlis .sik-harf { color: var(--danger); }

    .sik-metin { font-size: .9rem; line-height: 1.5; }

    .cozum-kutu {
      display: none;
      margin-top: 14px;
      padding: 12px 16px;
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      border-radius: 0 8px 8px 0;
      font-size: .88rem;
      line-height: 1.6;
      color: #78350f;
      white-space: pre-wrap;
    }
    .cozum-kutu.goster { display: block; }
    .cozum-baslik { font-weight: 700; margin-bottom: 6px; color: #92400e; }

    .alt-panel {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      background: var(--card);
      border-top: 1px solid var(--border);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      z-index: 100;
      box-shadow: 0 -2px 12px rgba(0,0,0,.06);
    }

    .sayac { display: flex; gap: 16px; font-size: .85rem; }
    .sayac-item { display: flex; align-items: center; gap: 5px; }
    .sayac-item .daire {
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: .8rem; color: #fff;
    }
    .d-daire { background: var(--success); }
    .y-daire { background: var(--danger); }
    .b-daire { background: var(--gray); }

    .btn-bitir {
      background: var(--primary);
      color: #fff;
      border: none;
      padding: 10px 24px;
      border-radius: 8px;
      font-size: .9rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .18s;
    }
    .btn-bitir:hover { background: #4338ca; }
    .btn-bitir:disabled {
      background: var(--gray);
      cursor: not-allowed;
    }

    .sonuc-bar {
      display: none;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      text-align: center;
    }
    .sonuc-bar.goster { display: block; }
    .sonuc-bar h2 { font-size: 1.15rem; margin-bottom: 14px; color: var(--primary); }
    .sonuc-satir { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
    .sonuc-item { text-align: center; }
    .sonuc-sayi { font-size: 1.8rem; font-weight: 800; }
    .sonuc-label { font-size: .78rem; color: var(--text-secondary); margin-top: 2px; }
    .s-d { color: var(--success); }
    .s-y { color: var(--danger); }
    .s-b { color: var(--gray); }

    @media (max-width: 600px) {
      header h1 { font-size: .95rem; }
      .soru { padding: 14px; }
      .sik { padding: 8px 12px; }
      .sayac { gap: 10px; }
      .btn-bitir { padding: 9px 18px; font-size: .85rem; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(baslik)}</h1>
    <span class="badge">${toplamSoru} Soru</span>
  </header>

  <div class="konteyner">
    <div class="bilgi-bar">
      ${meta.sinif ? `<span><strong>${meta.sinif}. Sınıf</strong></span>` : ''}
      ${meta.ders ? `<span>Ders: <strong>${escapeHtml(meta.ders)}</strong></span>` : ''}
      ${meta.konu ? `<span>Konu: <strong>${escapeHtml(meta.konu)}</strong></span>` : ''}
      ${meta.zorluk ? `<span>Zorluk: <strong>${escapeHtml(capitalize2(meta.zorluk))}</strong></span>` : ''}
    </div>

    <div id="sonucBar" class="sonuc-bar">
      <h2>Test Tamamlandı!</h2>
      <div class="sonuc-satir">
        <div class="sonuc-item"><div class="sonuc-sayi s-d" id="sdogru">0</div><div class="sonuc-label">Doğru</div></div>
        <div class="sonuc-item"><div class="sonuc-sayi s-y" id="syanlis">0</div><div class="sonuc-label">Yanlış</div></div>
        <div class="sonuc-item"><div class="sonuc-sayi s-b" id="sbos">0</div><div class="sonuc-label">Boş</div></div>
        <div class="sonuc-item"><div class="sonuc-sayi" id="snet" style="color:var(--primary)">0</div><div class="sonuc-label">Net</div></div>
      </div>
    </div>

    <div id="sorular">
${soruHTML}
    </div>
  </div>

  <div class="alt-panel">
    <div class="sayac">
      <div class="sayac-item">
        <div class="daire d-daire" id="cDogru">0</div>
        <span>Doğru</span>
      </div>
      <div class="sayac-item">
        <div class="daire y-daire" id="cYanlis">0</div>
        <span>Yanlış</span>
      </div>
      <div class="sayac-item">
        <div class="daire b-daire" id="cBos">${toplamSoru}</div>
        <span>Boş</span>
      </div>
    </div>
    <button class="btn-bitir" id="btnBitir" onclick="testiBitir()">Testi Bitir</button>
  </div>

  <script>
    const CEVAPLAR = ${cevapJSON};
    const COZUMLER = ${cozumJSON};
    const TOPLAM = ${toplamSoru};

    const secimler = {}; // {soruNo: 'A'}
    let bitti = false;

    // Şık tıklama
    document.querySelectorAll('.sik').forEach(el => {
      el.addEventListener('click', function() {
        if (bitti) return;
        const no = parseInt(this.dataset.soru);
        const sik = this.dataset.sik;

        // Aynı şıka tekrar tıklarsa seçimi kaldır
        if (secimler[no] === sik) {
          delete secimler[no];
          this.classList.remove('secili');
        } else {
          // Önceki seçimi kaldır
          document.querySelectorAll(\`.sik[data-soru="\${no}"]\`).forEach(s => s.classList.remove('secili'));
          secimler[no] = sik;
          this.classList.add('secili');
        }
        sayaciGuncelle();
      });
    });

    function sayaciGuncelle() {
      const cevaplanan = Object.keys(secimler).length;
      document.getElementById('cBos').textContent = TOPLAM - cevaplanan;
    }

    function testiBitir() {
      if (bitti) return;
      bitti = true;

      let dogru = 0, yanlis = 0, bos = 0;

      for (let i = 1; i <= TOPLAM; i++) {
        const secilen = secimler[i];
        const dogruCevap = CEVAPLAR[i];
        const soruEl = document.getElementById('soru-' + i);

        // Tüm şıkları disable et
        soruEl.querySelectorAll('.sik').forEach(s => s.classList.add('disabled'));

        if (!secilen) {
          bos++;
        } else if (secilen === dogruCevap) {
          dogru++;
          soruEl.querySelector(\`.sik[data-sik="\${secilen}"]\`).classList.add('dogru');
          soruEl.querySelector(\`.sik[data-sik="\${secilen}"]\`).classList.remove('secili');
        } else {
          yanlis++;
          // Seçilen yanlış
          soruEl.querySelector(\`.sik[data-sik="\${secilen}"]\`).classList.add('yanlis');
          soruEl.querySelector(\`.sik[data-sik="\${secilen}"]\`).classList.remove('secili');
          // Doğru cevabı yeşil göster
          if (dogruCevap) {
            soruEl.querySelector(\`.sik[data-sik="\${dogruCevap}"]\`)?.classList.add('dogru');
          }
          // Çözümü göster (sadece yanlış yapılan sorularda)
          if (COZUMLER[i]) {
            let cozumEl = soruEl.querySelector('.cozum-kutu');
            if (!cozumEl) {
              cozumEl = document.createElement('div');
              cozumEl.className = 'cozum-kutu';
              const safeText = String(COZUMLER[i]).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
              cozumEl.innerHTML = '<div class=\'cozum-baslik\'>📝 Çözüm</div>' + safeText;
              soruEl.appendChild(cozumEl);
            }
            cozumEl.classList.add('goster');
          }
        }
      }

      // Sayaçları güncelle
      document.getElementById('cDogru').textContent = dogru;
      document.getElementById('cYanlis').textContent = yanlis;
      document.getElementById('cBos').textContent = bos;

      // Sonuç barı
      const net = (dogru - yanlis * 0.25).toFixed(2);
      document.getElementById('sdogru').textContent = dogru;
      document.getElementById('syanlis').textContent = yanlis;
      document.getElementById('sbos').textContent = bos;
      document.getElementById('snet').textContent = net;
      document.getElementById('sonucBar').classList.add('goster');

      document.getElementById('btnBitir').disabled = true;
      document.getElementById('btnBitir').textContent = 'Test Bitti';

      // Sonuç barına kaydır
      document.getElementById('sonucBar').scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>`;

  function capitalize2(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Ana Akış ─────────────────────────────────────────────────────────────────
async function main() {
  console.log(`📄 Dosya: ${docxPath}`);

  if (!fs.existsSync(docxPath)) {
    console.error(`❌ Dosya bulunamadı: ${docxPath}`);
    process.exit(1);
  }

  // Meta
  const meta = parseFilename(docxPath);
  console.log(`📌 Meta: ${JSON.stringify(meta)}`);

  // Parse
  const { html, text, messages } = await parseDocx(docxPath);
  if (messages.length > 0) {
    console.log('⚠️  Mammoth uyarıları:', messages.slice(0, 3).map(m => m.message).join(', '));
  }

  // Bölümleri ayır
  const { soruLines, cevapLines, cozumLines } = splitSections(html, text);

  // Soruları parse et
  const sorular = parseSorular(soruLines);
  console.log(`✅ ${sorular.length} soru parse edildi`);

  if (sorular.length === 0) {
    console.error('❌ Hiç soru parse edilemedi! DOCX formatını kontrol edin.');
    console.log('--- İlk 20 satır ---');
    console.log(soruLines.slice(0, 20).join('\n'));
    process.exit(1);
  }

  // Cevapları parse et
  const cevaplar = parseCevaplar(cevapLines);
  console.log(`✅ ${Object.keys(cevaplar).length} cevap parse edildi`);

  // Çözümleri parse et
  const cozumler = parseCozumler(cozumLines);
  console.log(`✅ ${Object.keys(cozumler).length} çözüm parse edildi`);

  // Cevap anahtarı eşleştir (eksik soruları kontrol et)
  const eksikCevap = sorular.filter(s => !cevaplar[s.no]);
  if (eksikCevap.length > 0) {
    console.warn(`⚠️  Cevabı olmayan sorular: ${eksikCevap.map(s => s.no).join(', ')}`);
  }

  // Çözüm kutularını HTML soru içine göm
  // (generate sırasında cozumler JSON olarak aktarılır, JS runtime'da kullanılır)

  // HTML üret
  const htmlContent = generateHTML(meta, sorular, cevaplar, cozumler);

  // Çıktı klasörünü oluştur
  const outDir = path.dirname(outputPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  console.log(`✅ HTML oluşturuldu: ${outputPath}`);

  // Çözüm div'lerini her soru bloğuna ekle (placeholder olarak - JS runtime'da gösterilecek)
  // COZUMLER JSON zaten script içinde mevcut, JS ile yönetiliyor
  // Statik olarak da ekle: soru kapanışından önce data-cozum attribute ekle
  let output = htmlContent;
  for (const soru of sorular) {
    const cozum = cozumler[soru.no];
    if (!cozum) continue;
    const placeholder = `id="soru-${soru.no}"`;
    const replacement = `id="soru-${soru.no}" data-cozum="evet"`;
    output = output.replace(placeholder, replacement);
  }

  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`✅ Final HTML kaydedildi: ${outputPath}`);
}

main().catch(err => {
  console.error('❌ Hata:', err.message);
  process.exit(1);
});
