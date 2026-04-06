/* ============================================================
   TestÇöz — Ana JavaScript Dosyası
   Sınıf, Ders ve Konu Verileri + Sayfa Mantığı
   ============================================================ */

/* ===== SITE DATA ===== */
const SITE_DATA = {
  classes: {
    1: {
      name: "1. Sınıf",
      fullName: "Birinci Sınıf",
      emoji: "🌱",
      description: "Temel kavramları eğlenceli sorularla pekiştir.",
      subjects: [
        {
          id: "matematik",
          name: "Matematik",
          icon: "🔢",
          description: "100'e kadar sayılar, toplama, çıkarma ve temel geometri konularını keşfet.",
          topics: [
            { id: "sayilar",   name: "Sayılar (1–100)",       desc: "100'e kadar sayılar, sıralama ve karşılaştırma",      difficulties: ["kolay", "orta"] },
            { id: "toplama",   name: "Toplama İşlemi",         desc: "Tek ve iki basamaklı sayılarda toplama",               difficulties: ["kolay", "orta"] },
            { id: "cikarma",   name: "Çıkarma İşlemi",         desc: "Tek ve iki basamaklı sayılarda çıkarma",               difficulties: ["kolay", "orta"] },
            { id: "sekiller",  name: "Temel Şekiller",          desc: "Kare, daire, üçgen ve dikdörtgen",                     difficulties: ["kolay"] },
            { id: "olcme",     name: "Ölçme",                   desc: "Uzunluk, ağırlık ve saat okuma temelleri",              difficulties: ["kolay", "orta"] },
            { id: "problemler",name: "Problemler",               desc: "Günlük hayattan basit matematik problemleri",           difficulties: ["kolay", "orta"] },
          ]
        },
        {
          id: "turkce",
          name: "Türkçe",
          icon: "📖",
          description: "Okuma, yazma, kelime bilgisi ve anlama becerilerini geliştir.",
          topics: [
            { id: "sesler",    name: "Sesler ve Harfler",       desc: "Seslerin tanınması ve harflerle eşleştirilmesi",       difficulties: ["kolay"] },
            { id: "hece",      name: "Hece ve Kelime",           desc: "Hece yapısı ve kelime oluşturma",                     difficulties: ["kolay", "orta"] },
            { id: "okuma",     name: "Okuma Anlama",             desc: "Kısa metinlerin okunup kavranması",                   difficulties: ["kolay", "orta"] },
            { id: "yazim",     name: "Yazım Kuralları",           desc: "Büyük harf kullanımı ve noktalama temel kuralları",   difficulties: ["kolay"] },
          ]
        },
        {
          id: "hayat-bilgisi",
          name: "Hayat Bilgisi",
          icon: "🌍",
          description: "Kendim, ailem, okulum ve çevrem hakkında temel bilgiler.",
          topics: [
            { id: "aile",      name: "Aile ve Birey",            desc: "Aile üyeleri, roller ve sorumluluklar",               difficulties: ["kolay"] },
            { id: "okul",      name: "Okul Hayatı",              desc: "Okul kuralları, arkadaşlık ve uyum",                  difficulties: ["kolay"] },
            { id: "saglik",    name: "Sağlık ve Hijyen",          desc: "Kişisel temizlik, sağlıklı beslenme",                 difficulties: ["kolay"] },
            { id: "cevrem",    name: "Çevrem",                   desc: "Yakın çevre, doğa ve hayvanlar",                      difficulties: ["kolay", "orta"] },
          ]
        },
        {
          id: "ingilizce",
          name: "İngilizce",
          icon: "🌐",
          description: "Temel İngilizce kelimeler ve basit ifadeler.",
          topics: [
            { id: "colors",    name: "Renkler (Colors)",          desc: "Temel renk kelimelerini öğren",                      difficulties: ["kolay"] },
            { id: "numbers",   name: "Sayılar (Numbers)",         desc: "1'den 20'ye kadar İngilizce sayılar",                difficulties: ["kolay"] },
            { id: "greetings", name: "Selamlaşma (Greetings)",    desc: "Hello, goodbye, how are you?",                       difficulties: ["kolay"] },
          ]
        }
      ]
    },
    2: {
      name: "2. Sınıf",
      fullName: "İkinci Sınıf",
      emoji: "🌿",
      description: "Temel becerileri derinleştir ve yeni konular keşfet.",
      subjects: [
        {
          id: "matematik",
          name: "Matematik",
          icon: "🔢",
          description: "500'e kadar sayılar, çarpma ve bölmeye giriş, ölçme birimleri.",
          topics: [
            { id: "sayilar",     name: "Sayılar (1–500)",        desc: "500'e kadar sayılar ve basamak değerleri",            difficulties: ["kolay", "orta"] },
            { id: "toplama",     name: "Toplama İşlemi",          desc: "Üç basamaklı sayılarla toplama",                      difficulties: ["kolay", "orta", "zor"] },
            { id: "cikarma",     name: "Çıkarma İşlemi",          desc: "Üç basamaklı sayılarla çıkarma",                      difficulties: ["kolay", "orta", "zor"] },
            { id: "carpma",      name: "Çarpma (Giriş)",          desc: "2, 3, 4 ve 5 ile çarpım tablosu",                     difficulties: ["kolay", "orta"] },
            { id: "geometri",    name: "Geometri",                desc: "Çokgenler ve simetri",                                difficulties: ["kolay", "orta"] },
            { id: "olcme",       name: "Ölçme Birimleri",         desc: "Metre, santimetre, kilogram, litre",                  difficulties: ["kolay", "orta"] },
            { id: "problemler",  name: "Problemler",               desc: "Dört işlemli kelime problemleri",                     difficulties: ["kolay", "orta", "zor"] },
          ]
        },
        {
          id: "turkce",
          name: "Türkçe",
          icon: "📖",
          description: "Kelime dağarcığı, metin anlama ve yazım kuralları.",
          topics: [
            { id: "anlama",      name: "Okuma Anlama",            desc: "Metin okuma ve içerik kavrama",                       difficulties: ["kolay", "orta"] },
            { id: "kelime",      name: "Kelime Bilgisi",           desc: "Eş anlamlı ve zıt anlamlı kelimeler",                difficulties: ["kolay", "orta"] },
            { id: "cumle",       name: "Cümle Çalışmaları",        desc: "Cümle kurma ve düzenleme",                            difficulties: ["kolay", "orta"] },
            { id: "yazim",       name: "Yazım ve Noktalama",        desc: "Yazım kuralları ve noktalama işaretleri",             difficulties: ["kolay", "orta"] },
          ]
        },
        {
          id: "hayat-bilgisi",
          name: "Hayat Bilgisi",
          icon: "🌍",
          description: "Toplumsal yaşam, doğa ve vatandaşlık kavramları.",
          topics: [
            { id: "toplum",      name: "Toplum Hayatı",            desc: "Komşuluk, yardımlaşma, kurallar",                    difficulties: ["kolay", "orta"] },
            { id: "dogal",       name: "Doğal Ortamlar",           desc: "Hava, iklim ve mevsimler",                            difficulties: ["kolay", "orta"] },
            { id: "saglik",      name: "Sağlıklı Yaşam",           desc: "Spor, beslenme ve sağlık alışkanlıkları",             difficulties: ["kolay"] },
          ]
        },
        {
          id: "ingilizce",
          name: "İngilizce",
          icon: "🌐",
          description: "Temel kelime grupları ve basit cümle yapıları.",
          topics: [
            { id: "family",      name: "Aile (Family)",            desc: "Aile üyelerini İngilizce söyleme",                    difficulties: ["kolay"] },
            { id: "animals",     name: "Hayvanlar (Animals)",       desc: "Temel hayvan isimleri",                              difficulties: ["kolay"] },
            { id: "classroom",   name: "Sınıf (Classroom)",         desc: "Okul nesneleri ve sınıf ifadeleri",                  difficulties: ["kolay", "orta"] },
          ]
        }
      ]
    },
    3: {
      name: "3. Sınıf",
      fullName: "Üçüncü Sınıf",
      emoji: "🌳",
      description: "Daha karmaşık konular ve problem çözme becerileri.",
      subjects: [
        {
          id: "matematik",
          name: "Matematik",
          icon: "🔢",
          description: "Dört işlem, kesirler, geometri ve ölçme konuları.",
          topics: [
            { id: "sayilar",     name: "Sayılar (1–1000)",        desc: "Binlik basamak, sayı doğrusu ve karşılaştırma",       difficulties: ["kolay", "orta"] },
            { id: "carpma",      name: "Çarpma İşlemi",           desc: "Tam çarpım tablosu ve çarpma algoritması",            difficulties: ["kolay", "orta", "zor"] },
            { id: "bolme",       name: "Bölme İşlemi",             desc: "Bölme kavramı ve kısa bölme",                         difficulties: ["kolay", "orta", "zor"] },
            { id: "kesir",       name: "Kesirler",                 desc: "Kesir kavramı, basit kesirler",                       difficulties: ["kolay", "orta"] },
            { id: "geometri",    name: "Geometri",                 desc: "Çokgenler, açılar ve alan kavramı",                   difficulties: ["kolay", "orta"] },
            { id: "problemler",  name: "Problem Çözme",            desc: "Çok adımlı kelime problemleri",                       difficulties: ["orta", "zor"] },
          ]
        },
        {
          id: "turkce",
          name: "Türkçe",
          icon: "📖",
          description: "Metin türleri, dil bilgisi ve yazma becerileri.",
          topics: [
            { id: "metin",       name: "Metin Türleri",            desc: "Hikâye, şiir ve bilgi metinleri",                     difficulties: ["kolay", "orta"] },
            { id: "dilbilgisi",  name: "Dil Bilgisi",              desc: "İsim, sıfat, fiil ve zamir",                          difficulties: ["orta"] },
            { id: "yazim",       name: "Yazım Kuralları",           desc: "İmla kılavuzu ve noktalama",                          difficulties: ["kolay", "orta"] },
          ]
        },
        {
          id: "fen-bilimleri",
          name: "Fen Bilimleri",
          icon: "🔬",
          description: "Canlılar, madde, enerji ve çevre konuları.",
          topics: [
            { id: "canlilar",    name: "Canlılar Dünyası",         desc: "Hayvanlar, bitkiler ve yaşam alanları",               difficulties: ["kolay", "orta"] },
            { id: "madde",       name: "Madde ve Özellikleri",      desc: "Katı, sıvı ve gaz halleri",                           difficulties: ["kolay", "orta"] },
            { id: "kuvvet",      name: "Kuvvet ve Hareket",         desc: ["Çekme, itme kuvvetleri ve basit makineler"].join(""), difficulties: ["orta"] },
          ]
        },
        {
          id: "hayat-bilgisi",
          name: "Hayat Bilgisi",
          icon: "🌍",
          description: "Dün, bugün ve yarın; milli değerler ve doğa.",
          topics: [
            { id: "tarih",       name: "Geçmiş ve Bugün",          desc: "Atatürk, milli bayramlar ve semboller",               difficulties: ["kolay", "orta"] },
            { id: "enerji",      name: "Enerji Tasarrufu",          desc: "Elektrik, su ve doğal kaynakların korunması",         difficulties: ["kolay"] },
          ]
        },
        {
          id: "ingilizce",
          name: "İngilizce",
          icon: "🌐",
          description: "Basit diyaloglar, soru cümleleri ve günlük ifadeler.",
          topics: [
            { id: "daily",       name: "Günlük Rutin",              desc: "I wake up, I eat breakfast… Daily routine",          difficulties: ["kolay", "orta"] },
            { id: "food",        name: "Yiyecekler (Food)",          desc: "Favori yiyecekler ve içecekler",                     difficulties: ["kolay"] },
            { id: "questions",   name: "Soru Cümleleri",             desc: "What, Where, Who, How old...?",                      difficulties: ["orta"] },
          ]
        }
      ]
    },
    4: {
      name: "4. Sınıf",
      fullName: "Dördüncü Sınıf",
      emoji: "🎓",
      description: "İlkokulun son yılı — sınavlara güvenle hazırlan.",
      subjects: [
        {
          id: "matematik",
          name: "Matematik",
          icon: "🔢",
          description: "Büyük sayılar, kesirler, ondalık sayılar ve veri.",
          topics: [
            { id: "buyuk-sayilar",  name: "Büyük Sayılar",        desc: "Milyona kadar sayılar ve basamak değerleri",          difficulties: ["kolay", "orta"] },
            { id: "dortislem",      name: "Dört İşlem",            desc: "Bileşik işlem problemleri",                           difficulties: ["orta", "zor"] },
            { id: "kesirler",       name: "Kesirler",               desc: "Denk kesirler, toplama ve çıkarma",                   difficulties: ["orta", "zor"] },
            { id: "ondalik",        name: "Ondalık Sayılar",        desc: "Ondalık gösterim ve işlemler",                        difficulties: ["orta", "zor"] },
            { id: "alan-cevre",     name: "Alan ve Çevre",          desc: "Dikdörtgen, kare ve karmaşık şekiller",               difficulties: ["kolay", "orta", "zor"] },
            { id: "veri",           name: "Veri ve Grafik",         desc: "Tablo okuma, sütun ve çizgi grafikler",               difficulties: ["kolay", "orta"] },
            { id: "problemler",     name: "Problem Çözme",          desc: "TEOG tipi kelime problemleri",                        difficulties: ["orta", "zor"] },
          ]
        },
        {
          id: "turkce",
          name: "Türkçe",
          icon: "📖",
          description: "İleri okuma anlama, dil bilgisi ve yazılı anlatım.",
          topics: [
            { id: "anlama",      name: "Okuma Anlama",             desc: "Ana fikir, destekleyici fikir ve yorum",               difficulties: ["orta", "zor"] },
            { id: "dilbilgisi",  name: "Dil Bilgisi",              desc: "Eylem çekimleri, tümce ögeleri",                       difficulties: ["orta", "zor"] },
            { id: "anlatim",     name: "Yazılı Anlatım",            desc: "Paragraf, kompozisyon ve yazma teknikleri",            difficulties: ["orta", "zor"] },
          ]
        },
        {
          id: "fen-bilimleri",
          name: "Fen Bilimleri",
          icon: "🔬",
          description: "Sinir sistemi, elektrik, ışık ve çevre konuları.",
          topics: [
            { id: "insan",       name: "İnsan Vücudu",             desc: "Organ sistemleri ve fonksiyonları",                   difficulties: ["kolay", "orta"] },
            { id: "elektrik",    name: "Elektrik",                 desc: "Basit elektrik devreleri ve güvenlik",                 difficulties: ["orta"] },
            { id: "isik",        name: "Işık ve Ses",              desc: "Işığın yayılması, yansıma ve ses dalgaları",           difficulties: ["orta", "zor"] },
          ]
        },
        {
          id: "sosyal-bilgiler",
          name: "Sosyal Bilgiler",
          icon: "🗺️",
          description: "Coğrafya, tarih, vatandaşlık ve kültürel miras.",
          topics: [
            { id: "cografya",    name: "Türkiye Coğrafyası",        desc: "Bölgeler, iklim ve doğal yapı",                      difficulties: ["kolay", "orta"] },
            { id: "tarih",       name: "Tarih ve Miras",             desc: "Osmanlı ve Cumhuriyet dönemi",                       difficulties: ["kolay", "orta"] },
            { id: "yonetim",     name: "Yönetim ve Demokrasi",       desc: "Devlet yapısı, haklar ve sorumluluklar",             difficulties: ["kolay", "orta"] },
          ]
        },
        {
          id: "ingilizce",
          name: "İngilizce",
          icon: "🌐",
          description: "Zaman kalıpları, soru yapıları ve serbest konuşma.",
          topics: [
            { id: "present",     name: "Geniş Zaman",               desc: "Simple present tense kullanımı",                     difficulties: ["kolay", "orta"] },
            { id: "pasttime",    name: "Geçmiş Zaman",               desc: "Simple past tense — I went, I saw…",                difficulties: ["orta"] },
            { id: "hobbies",     name: "Hobiler (Hobbies)",           desc: "I like, I love, I enjoy…",                          difficulties: ["kolay", "orta"] },
          ]
        }
      ]
    }
  }
};

/* ===== HELPERS ===== */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function slugify(str) {
  return str.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[çÇ]/g, 'c')
    .replace(/[şŞ]/g, 's')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const btn  = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    btn.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===== ACTIVE NAV LINK ===== */
function highlightActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });
}

/* ===== SINIF SAYFASI ===== */
function renderSinifPage() {
  const classId = parseInt(getParam('sinif'));
  if (!classId || !SITE_DATA.classes[classId]) {
    renderError('Sınıf bulunamadı.', 'Lütfen geçerli bir sınıf seçin.');
    return;
  }

  const cls = SITE_DATA.classes[classId];
  document.title = `${cls.name} Dersleri | TestÇöz`;

  // Breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) bc.innerHTML = `
    <a href="index.html">Ana Sayfa</a>
    <span class="breadcrumb-sep">›</span>
    <span class="breadcrumb-current">${cls.name}</span>
  `;

  // Page hero
  const ph = document.getElementById('pageHeroTitle');
  if (ph) ph.textContent = `${cls.name} Dersleri`;
  const ps = document.getElementById('pageHeroSub');
  if (ps) ps.textContent = cls.description;

  // Subject grid
  const grid = document.getElementById('subjectGrid');
  if (!grid) return;

  grid.innerHTML = cls.subjects.map(sub => `
    <a class="subject-card" href="konu.html?sinif=${classId}&ders=${sub.id}" aria-label="${sub.name} konularına git">
      <div class="subject-icon" role="img" aria-label="${sub.name}">${sub.icon}</div>
      <div class="subject-info">
        <h3>${sub.name}</h3>
        <p>${sub.description}</p>
        <span class="subject-topic-count">${sub.topics.length} Konu</span>
      </div>
    </a>
  `).join('');
}

/* ===== KONU SAYFASI ===== */
function renderKonuPage() {
  const classId  = parseInt(getParam('sinif'));
  const dersId   = getParam('ders');

  if (!classId || !dersId || !SITE_DATA.classes[classId]) {
    renderError('Sayfa bulunamadı.', 'Lütfen geçerli bir ders seçin.');
    return;
  }

  const cls  = SITE_DATA.classes[classId];
  const ders = cls.subjects.find(s => s.id === dersId);
  if (!ders) {
    renderError('Ders bulunamadı.', 'Bu ders mevcut değil.');
    return;
  }

  document.title = `${ders.name} — ${cls.name} | TestÇöz`;

  const bc = document.getElementById('breadcrumb');
  if (bc) bc.innerHTML = `
    <a href="index.html">Ana Sayfa</a>
    <span class="breadcrumb-sep">›</span>
    <a href="sinif.html?sinif=${classId}">${cls.name}</a>
    <span class="breadcrumb-sep">›</span>
    <span class="breadcrumb-current">${ders.name}</span>
  `;

  const ph = document.getElementById('pageHeroTitle');
  if (ph) ph.innerHTML = `${ders.icon} ${ders.name}`;
  const ps = document.getElementById('pageHeroSub');
  if (ps) ps.textContent = ders.description;

  const list = document.getElementById('topicList');
  if (!list) return;

  list.innerHTML = ders.topics.map((topic, i) => {
    const badges = topic.difficulties.map(d =>
      `<span class="badge badge-${d}">${capitalize(d)}</span>`
    ).join('');

    return `
      <a class="topic-card" href="test.html?sinif=${classId}&ders=${dersId}&konu=${topic.id}" aria-label="${topic.name} testine başla">
        <div class="topic-card-left">
          <div class="topic-num">${i + 1}</div>
          <div class="topic-info">
            <h4>${topic.name}</h4>
            <p>${topic.desc}</p>
          </div>
        </div>
        <div class="difficulty-badges">${badges}</div>
      </a>
    `;
  }).join('');
}

/* ===== TEST SAYFASI ===== */
function initTestPage() {
  const classId  = parseInt(getParam('sinif'));
  const dersId   = getParam('ders');
  const konuId   = getParam('konu');

  const bc = document.getElementById('breadcrumb');

  if (!classId || !dersId || !konuId || !SITE_DATA.classes[classId]) {
    if (bc) bc.innerHTML = `<a href="index.html">Ana Sayfa</a><span class="breadcrumb-sep">›</span><span class="breadcrumb-current">Test</span>`;
    return;
  }

  const cls  = SITE_DATA.classes[classId];
  const ders = cls.subjects.find(s => s.id === dersId);
  const konu = ders ? ders.topics.find(t => t.id === konuId) : null;

  document.title = `${konu ? konu.name : 'Test'} | TestÇöz`;

  if (bc) bc.innerHTML = `
    <a href="index.html">Ana Sayfa</a>
    <span class="breadcrumb-sep">›</span>
    <a href="sinif.html?sinif=${classId}">${cls.name}</a>
    <span class="breadcrumb-sep">›</span>
    <a href="konu.html?sinif=${classId}&ders=${dersId}">${ders ? ders.name : 'Ders'}</a>
    <span class="breadcrumb-sep">›</span>
    <span class="breadcrumb-current">${konu ? konu.name : 'Test'}</span>
  `;

  const testTitle = document.getElementById('testTitle');
  if (testTitle) testTitle.textContent = konu ? konu.name : 'Test';

  const testSubtitle = document.getElementById('testSubtitle');
  if (testSubtitle) testSubtitle.textContent = konu ? konu.desc : '';
}

/* ===== ERROR DISPLAY ===== */
function renderError(title, msg) {
  const main = document.querySelector('main') || document.body;
  main.innerHTML = `
    <div class="container" style="padding: 80px 20px; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
      <h2>${title}</h2>
      <p style="color: var(--text-muted); margin: 12px 0 28px;">${msg}</p>
      <a href="index.html" class="btn btn-primary">Ana Sayfaya Dön</a>
    </div>
  `;
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Gönderiliyor…';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Mesajınız Alındı';
      btn.style.background = 'var(--success)';
      btn.style.borderColor = 'var(--success)';
      form.reset();

      const notice = document.getElementById('formSuccess');
      if (notice) notice.style.display = 'block';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        if (notice) notice.style.display = 'none';
      }, 5000);
    }, 1200);
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveNav();

  const page = document.body.dataset.page;
  if (page === 'sinif')   renderSinifPage();
  if (page === 'konu')    renderKonuPage();
  if (page === 'test')    initTestPage();
  if (page === 'contact') initContactForm();
});
