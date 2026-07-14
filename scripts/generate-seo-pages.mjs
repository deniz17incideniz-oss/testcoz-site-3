import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const SITE = "https://testcoz.pro";
const ADSENSE_SNIPPET =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1287455375559097" crossorigin="anonymous"></script>';

const context = { window: {}, URLSearchParams };
vm.createContext(context);
for (const file of [
  "js/utils.js",
  "data/catalog.js",
  ...fs.readdirSync("data/tests").filter((name) => name.endsWith(".js")).sort().map((name) => `data/tests/${name}`),
]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context);
}

const catalog = context.window.TESTCOZ_CATALOG;
const tests = context.window.TESTCOZ_TESTS || [];
const subjectDir = path.resolve("ders");
const guideDir = path.resolve("rehber");
fs.mkdirSync(subjectDir, { recursive: true });
fs.mkdirSync(guideDir, { recursive: true });

const esc = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
const cap = (value) => value.charAt(0).toLocaleUpperCase("tr-TR") + value.slice(1);

const guideLinks = [
  ["ilkokulda-duzenli-test-cozme.html", "İlkokulda Düzenli Test Çözme"],
  ["yanlis-sorulardan-ogrenme-yontemi.html", "Yanlışlardan Öğrenme"],
  ["kolay-orta-zor-test-sistemi-nedir.html", "Kolay-Orta-Zor Sistem"],
  ["veliler-icin-test-takip-onerileri.html", "Veliler İçin Takip"],
];

function header(prefix = "", active = "") {
  const nav = [
    [`${prefix}index.html`, "Ana Sayfa", active === "home"],
    [`${prefix}sinif-1.html`, "Sınıflar", active === "classes"],
    [`${prefix}rehber/ilkokulda-duzenli-test-cozme.html`, "Rehber", active === "guide"],
    [`${prefix}veli.html`, "Veliler", active === "parents"],
    [`${prefix}hakkimizda.html`, "Hakkımızda", active === "about"],
    [`${prefix}iletisim.html`, "İletişim", active === "contact"],
  ];
  return `<header class="site-header"><div class="header-inner"><a href="${prefix}index.html" class="logo"><span class="logo-icon">T</span><span class="logo-text">Test<span>Çöz</span></span></a><nav class="main-nav">${nav.map(([href, label, isActive]) => `<a href="${href}"${isActive ? ' class="active"' : ""}>${label}</a>`).join("")}</nav><button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menüyü aç veya kapat" aria-expanded="false"><span></span><span></span><span></span></button></div></header><nav class="mobile-nav" id="mobileMenu"><a href="${prefix}index.html">Ana Sayfa</a>${[1, 2, 3, 4].map((level) => `<a href="${prefix}sinif-${level}.html">${level}. Sınıf</a>`).join("")}<a href="${prefix}rehber/ilkokulda-duzenli-test-cozme.html">Rehber</a><a href="${prefix}veli.html">Veliler</a><a href="${prefix}hakkimizda.html">Hakkımızda</a><a href="${prefix}iletisim.html">İletişim</a></nav>`;
}

function footer(prefix = "") {
  return `<footer class="site-footer"><div class="container"><div class="footer-grid"><div class="footer-brand"><a href="${prefix}index.html" class="logo"><span class="logo-icon">T</span><span class="logo-text">Test<span>Çöz</span></span></a><p>Türkiye Yüzyılı Maarif Modeli konu yapısını temel alan açıklamalı ilkokul testleri.</p></div><div class="footer-col"><h4>Sınıflar</h4><ul>${[1, 2, 3, 4].map((level) => `<li><a href="${prefix}sinif-${level}.html">${level}. Sınıf</a></li>`).join("")}</ul></div><div class="footer-col"><h4>Rehber</h4><ul>${guideLinks.map(([href, label]) => `<li><a href="${prefix}rehber/${href}">${label}</a></li>`).join("")}</ul></div><div class="footer-col"><h4>Sayfalar</h4><ul><li><a href="${prefix}hakkimizda.html">Hakkımızda</a></li><li><a href="${prefix}iletisim.html">İletişim</a></li><li><a href="${prefix}veli.html">Veliler İçin</a></li><li><a href="${prefix}gizlilik-politikasi.html">Gizlilik Politikası</a></li><li><a href="${prefix}kullanim-sartlari.html">Kullanım Şartları</a></li></ul></div></div><div class="footer-bottom"><p>© 2026 testcoz.pro. Tüm hakları saklıdır.</p><div class="footer-bottom-links"><a href="${prefix}gizlilik-politikasi.html">Gizlilik</a><a href="${prefix}kullanim-sartlari.html">Şartlar</a><a href="${prefix}iletisim.html">İletişim</a></div></div></div></footer>`;
}

function page({ title, description, canonical, prefix = "", active = "", body }) {
  return `<!DOCTYPE html><html lang="tr"><head>${ADSENSE_SNIPPET}<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${esc(title)}</title><meta name="description" content="${esc(description)}"/><meta name="robots" content="index, follow"/><link rel="canonical" href="${canonical}"/><meta property="og:type" content="website"/><meta property="og:url" content="${canonical}"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(description)}"/><meta name="twitter:card" content="summary"/><meta name="twitter:title" content="${esc(title)}"/><meta name="twitter:description" content="${esc(description)}"/><link rel="icon" href="${prefix}logo.png"/><link rel="stylesheet" href="${prefix}css/style.css"/></head><body>${header(prefix, active)}<main>${body}</main>${footer(prefix)}<script src="${prefix}js/main.js"></script></body></html>`;
}

const gradeContent = {
  1: {
    intro: "1. sınıf, öğrencinin okuma yazma, temel sayı algısı, okul kuralları ve günlük yaşam becerileriyle tanıştığı çok özel bir dönemdir. Bu seviyede hazırlanan testlerin amacı çocuğu zorlamak değil; kısa, anlaşılır ve dikkat geliştirici sorularla öğrenilen kavramları güvenli biçimde pekiştirmektir.",
    focus: "Türkçe dersinde sesleri tanıma, kelime kurma ve dinlediğini anlama; Matematikte sayma, karşılaştırma, toplama-çıkarma mantığı ve örüntüler; Hayat Bilgisinde okul, aile, güvenlik ve çevre bilinci; İngilizcede ise temel selamlaşma ve günlük sözcükler öne çıkar.",
    study: "Bu yaş grubunda çalışma süresi kısa tutulmalı, önce kolay testlerle güven duygusu oluşturulmalı, ardından orta seviye sorularla dikkat artırılmalıdır. Yanlış yapılan sorular hemen not edilip çocuğa küçük ipuçlarıyla tekrar düşündürülmelidir.",
    parent: "Veliler yalnızca doğru sayısına değil, çocuğun soruyu dinleme, görseli inceleme ve seçenekleri karşılaştırma davranışına da bakmalıdır. Düzenli fakat baskısız tekrar, 1. sınıfta öğrenme isteğini canlı tutar.",
  },
  2: {
    intro: "2. sınıf, öğrencinin okuma hızını artırdığı, temel işlemleri daha bilinçli kullandığı ve günlük yaşamla bağlantılı soruları anlamaya başladığı bir geçiş dönemidir. Bu sınıfta testler, önceki yıl kazanılan temel becerileri sağlamlaştırırken yeni konulara düzenli hazırlık sağlar.",
    focus: "Türkçe dersinde okuduğunu anlama, söz varlığı ve yazım kuralları; Matematikte ritmik sayma, eldeli işlemler, problem çözme ve ölçme; Hayat Bilgisinde sağlıklı yaşam, kaynak kullanımı ve toplum kuralları; İngilizcede kısa ifadeler ve temel kelime grupları çalışılır.",
    study: "Öğrencinin önce konu özetini okuyup kolay test çözmesi, ardından orta seviyede farklı soru kalıplarıyla karşılaşması önerilir. Zor testler günlük çalışmanın sonunda değil, öğrenci konuyu rahatça anlatabildiğinde kullanılmalıdır.",
    parent: "Veliler, öğrencinin hangi soru türünde duraksadığını gözlemleyerek kısa tekrarlar planlayabilir. Hata yapılan soruların açıklamasını birlikte okumak, çocuğun eksik konuyu fark etmesini kolaylaştırır.",
  },
  3: {
    intro: "3. sınıf, öğrencinin bilgiyi yalnızca hatırlamakla kalmayıp farklı durumlarda kullanmaya başladığı bir seviyedir. Matematik problemleri daha çok adım içerir, Türkçe metinleri uzar, Fen Bilimleri gözlem ve neden-sonuç ilişkilerini öne çıkarır.",
    focus: "Bu sınıfta Türkçe okuma-anlama, ana fikir ve metin yorumlama; Matematik doğal sayılar, dört işlem ve ölçme; Hayat Bilgisi hak, sorumluluk ve çevre bilinci; Fen Bilimleri varlıklar, kuvvet, madde ve doğa olayları; İngilizce ise günlük iletişim ifadeleriyle desteklenir.",
    study: "3. sınıf öğrencileri için düzenli tekrar çok değerlidir. Kolay testler temel kavramı tazeler, orta testler bilgiyi farklı örneklerde kullandırır, zor testler ise verilen bilgiyi ayırt etme ve mantık yürütme becerisini geliştirir.",
    parent: "Veliler, yanlış soruların hangi düşünme basamağında oluştuğunu anlamaya çalışmalıdır. İşlem hatası, dikkat hatası ve kavram eksikliği birbirinden ayrıldığında çalışma planı daha verimli olur.",
  },
  4: {
    intro: "4. sınıf, ilkokulun son basamağı olduğu için öğrencinin hem temel bilgileri pekiştirdiği hem de daha planlı çalışmayı öğrendiği bir dönemdir. Bu seviyede sorular; işlem becerisi, okuduğunu yorumlama, grafik-veri okuma, fen ve sosyal bilgilerde neden-sonuç ilişkisi kurma gibi alanları destekler.",
    focus: "Türkçe dersinde metin türleri, yazım, noktalama ve anlam ilişkileri; Matematikte doğal sayılar, kesirler, ölçme, geometri ve veri; Fen Bilimlerinde madde, kuvvet, Dünya ve canlılar; Sosyal Bilgilerde kültür, vatandaşlık ve çevre; İngilizcede günlük iletişim kalıpları çalışılır.",
    study: "Öğrenci önce kolay testle konunun temelini kontrol etmeli, orta testte bilgiyi farklı problem durumlarına taşımalı, zor testte ise dikkat ve yorum becerisini ölçmelidir. Test sonunda yanlış ve boş soruların açıklaması okunmadan yeni teste geçilmemelidir.",
    parent: "Veliler 4. sınıfta yalnızca sonuç puanını değil, öğrencinin zamanı kullanma, yönerge okuma ve seçenek eleme alışkanlıklarını da takip etmelidir. Bu beceriler ortaokula geçişte güçlü bir temel oluşturur.",
  },
};

const subjectFocus = {
  turkce: {
    purpose: "Türkçe dersinin amacı öğrencinin okuduğunu, dinlediğini ve gördüğü bilgiyi anlamlı biçimde yorumlamasını desteklemektir.",
    skills: "Metin anlama, ana fikir bulma, söz varlığını geliştirme, yazım kurallarını fark etme, noktalama işaretlerini doğru kullanma ve kendini açık ifade etme becerileri öne çıkar.",
    tip: "Türkçe testlerine başlamadan önce metin dikkatle okunmalı, soru kökü tekrar incelenmeli ve seçeneklerdeki küçük anlam farkları karşılaştırılmalıdır.",
  },
  matematik: {
    purpose: "Matematik dersinin amacı öğrencinin sayılar, işlemler, ölçme, geometri ve problem çözme alanlarında düzenli düşünme becerisi kazanmasını sağlamaktır.",
    skills: "İşlem yapma, veriyi düzenleme, problemde verilen ve istenen bilgiyi ayırma, tahmin etme, karşılaştırma ve günlük yaşam durumlarını matematiksel olarak yorumlama becerileri gelişir.",
    tip: "Matematik testlerinde önce kolay sorularla işlem basamakları pekiştirilmeli, orta ve zor testlerde problem cümlesindeki ipuçları alt alta yazılarak çözüm düşünülmelidir.",
  },
  "hayat-bilgisi": {
    purpose: "Hayat Bilgisi dersi öğrencinin okul, aile, sağlık, güvenlik, çevre ve toplumsal yaşamla ilgili temel farkındalıklarını güçlendirir.",
    skills: "Sorumluluk alma, güvenli davranışları seçme, kaynakları bilinçli kullanma, çevresini gözlemleme ve günlük yaşam sorunlarına uygun çözümler üretme becerileri desteklenir.",
    tip: "Bu derste test çözerken öğrencinin kendi yaşamından örnek vermesi, kavramları ezberlemek yerine davranışlarla ilişkilendirmesine yardımcı olur.",
  },
  "fen-bilimleri": {
    purpose: "Fen Bilimleri dersi öğrencinin merak etme, gözlem yapma, neden-sonuç ilişkisi kurma ve doğadaki olayları açıklama becerisini geliştirir.",
    skills: "Canlılar, madde, kuvvet, enerji, Dünya ve çevre konularında gözleme dayalı düşünme; deney sonucunu yorumlama ve günlük yaşamla bağlantı kurma becerileri öne çıkar.",
    tip: "Fen testlerinde kavramın tanımını bilmek kadar örneği doğru sınıflandırmak da önemlidir. Öğrenci soruda verilen durumun hangi kavrama karşılık geldiğini düşünmelidir.",
  },
  "sosyal-bilgiler": {
    purpose: "Sosyal Bilgiler dersi öğrencinin birey, toplum, kültür, çevre, üretim ve vatandaşlık konularında bilinçli kararlar vermesini destekler.",
    skills: "Hak ve sorumlulukları ayırt etme, tarihî ve kültürel değerleri tanıma, harita ve çevre bilgisini yorumlama, kaynak kullanımını değerlendirme becerileri gelişir.",
    tip: "Sosyal Bilgiler testlerinde kavramlar günlük yaşam örnekleriyle düşünülmeli, soru kökündeki zaman, yer ve kişi bilgileri dikkatle incelenmelidir.",
  },
  ingilizce: {
    purpose: "İngilizce dersi öğrencinin temel kelimeleri, kısa kalıpları ve günlük iletişim ifadelerini eğlenceli tekrarlarla tanımasını sağlar.",
    skills: "Selamlaşma, sayılar, renkler, sınıf eşyaları, aile, hayvanlar ve günlük cümle kalıplarını anlama; görsel ile kelimeyi eşleştirme becerileri desteklenir.",
    tip: "İngilizce testlerinde öğrencinin kelimeyi sesli tekrar etmesi, görseli dikkatle incelemesi ve seçenekleri anlam ilişkisine göre elemesi yararlıdır.",
  },
};

function topicText(topic, subject) {
  const focus = subjectFocus[subject.id] || subjectFocus.turkce;
  return `${topic.name} konusu, ${subject.name} dersindeki temel kazanımları günlük örneklerle pekiştirmeyi amaçlar. Öğrenci bu başlıkta kavramı tanımayı, soruda verilen ipuçlarını seçmeyi ve doğru cevaba adım adım ulaşmayı çalışır. ${focus.tip}`;
}

function classPage(level, grade) {
  const visibleSubjects = grade.subjects.filter((subject) => level !== 4 || subject.id !== "hayat-bilgisi");
  const content = gradeContent[level];
  const cards = visibleSubjects.map((subject) => `<article class="subject-card static-subject-card"><div class="subject-icon" aria-hidden="true">${subject.icon}</div><div class="subject-info"><h3>${esc(subject.name)}</h3><p>${esc(subject.description)}</p><span class="subject-topic-count">${subject.topics.length} konu</span><a class="btn btn-primary btn-sm" href="ders/${level}-sinif-${subject.id}.html">Konuları İncele</a></div></article>`).join("");
  const subjectList = visibleSubjects.map((subject) => `<li><strong>${esc(subject.name)}:</strong> ${esc(subject.description)} Bu derste öğrencinin seviyesine uygun konu kartları ve varsa kolay, orta, zor test bağlantıları yer alır.</li>`).join("");
  const others = [1, 2, 3, 4].map((gradeLevel) => `<a class="class-card${gradeLevel === level ? " is-active" : ""}" href="sinif-${gradeLevel}.html"><div class="class-card-title">${gradeLevel}. Sınıf</div><div class="class-card-subtitle">Dersleri görüntüle</div></a>`).join("");
  return page({
    title: `${grade.name} Dersleri, Konuları ve Açıklamalı Testleri | testcoz.pro`,
    description: `${grade.name} için Türkçe, Matematik ve diğer temel derslerde konu açıklamaları, çalışma önerileri ve seviyeli testler.`,
    canonical: `${SITE}/sinif-${level}.html`,
    active: "classes",
    body: `<div class="container"><nav class="breadcrumb"><a href="index.html">Ana Sayfa</a><span>›</span><span>${grade.name}</span></nav></div><section class="page-hero"><div class="container"><h1>${grade.name} Dersleri</h1><p>${esc(grade.description)}</p></div></section><section class="section"><div class="container"><div class="study-content class-content"><h2>${grade.name} için düzenli çalışma rehberi</h2><p>${esc(content.intro)}</p><h3>Bu sınıfta hangi dersler var?</h3><p>${esc(content.focus)}</p><ul>${subjectList}</ul><h3>Nasıl çalışılmalı?</h3><p>${esc(content.study)}</p><ol><li>Önce konu kartındaki açıklamayı okuyun.</li><li>Kolay testle temel kavramı kontrol edin.</li><li>Orta testte bilgiyi farklı soru kalıplarında deneyin.</li><li>Zor testleri yorumlama ve dikkat çalışması olarak kullanın.</li><li>Yanlış ve boş soruların açıklamasını incelemeden yeni teste geçmeyin.</li></ol><h3>Veliler için not</h3><p>${esc(content.parent)}</p></div><h2 style="margin:36px 0 28px">Dersler</h2><div class="subject-grid static-subject-grid">${cards}</div></div></section><section class="section-sm bg-gray"><div class="container"><h2 style="text-align:center;margin-bottom:24px">Diğer Sınıflar</h2><div class="class-grid">${others}</div></div></section>`,
  });
}

function subjectPage(level, grade, subject) {
  const focus = subjectFocus[subject.id] || subjectFocus.turkce;
  const topicCards = subject.topics.map((topic, index) => {
    const available = tests
      .filter((test) => test.classLevel === level && test.subject === subject.id && test.topic === topic.id)
      .sort((a, b) => ["kolay", "orta", "zor"].indexOf(a.difficulty) - ["kolay", "orta", "zor"].indexOf(b.difficulty));
    const actions = available.length
      ? available.map((test) => `<a class="difficulty-link badge-${test.difficulty}" href="../${test.pageUrl}">${cap(test.difficulty)}<small>10 Soru</small></a>`).join("")
      : `<div class="topic-explanation"><strong>Çalışma önerisi:</strong> ${esc(topicText(topic, subject))}</div>`;
    return `<article class="topic-card topic-card-with-levels"><div class="topic-card-left"><div class="topic-num">${index + 1}</div><div class="topic-info"><h3>${esc(topic.name)}</h3><p>${esc(topicText(topic, subject))}</p></div></div><div class="difficulty-actions">${actions}</div></article>`;
  }).join("");
  return page({
    prefix: "../",
    active: "classes",
    title: `${grade.name} ${subject.name} Konuları ve Seviyeli Testleri | testcoz.pro`,
    description: `${grade.name} ${subject.name} dersi için konu açıklamaları, çalışma önerileri, kolay, orta ve zor seviyeli açıklamalı testler.`,
    canonical: `${SITE}/ders/${level}-sinif-${subject.id}.html`,
    body: `<div class="container"><nav class="breadcrumb"><a href="../index.html">Ana Sayfa</a><span>›</span><a href="../sinif-${level}.html">${grade.name}</a><span>›</span><span>${esc(subject.name)}</span></nav></div><section class="page-hero"><div class="container"><h1>${grade.name} ${esc(subject.name)} Konuları</h1><p>${esc(subject.description)}</p></div></section><section class="section"><div class="container"><div class="study-content subject-content"><h2>${grade.name} ${esc(subject.name)} dersi nasıl çalışılır?</h2><p>${esc(focus.purpose)} ${grade.name} seviyesinde bu amaç, kısa açıklamalar, seviyeli testler ve sonuç ekranındaki çözüm notlarıyla desteklenir.</p><h3>Bu derste hangi beceriler gelişir?</h3><p>${esc(focus.skills)} Öğrenci her testte yalnızca doğru cevabı bulmaya değil, sorunun ne istediğini anlamaya ve seçenekleri bilinçli karşılaştırmaya yönlendirilir.</p><h3>Konular nasıl ilerlemeli?</h3><p>Önce konu başlığındaki açıklama okunmalı, ardından kolay testle temel kavram kontrol edilmelidir. Orta test öğrencinin bilgiyi farklı örneklerde kullanmasına yardım eder. Zor test ise dikkat, yorumlama ve problem çözme becerisini ölçer.</p><h3>Veliler için kısa öneri</h3><p>Veliler test sonucunda yalnızca başarı yüzdesine bakmak yerine yanlış yapılan soru türlerini incelemelidir. Aynı hata birkaç kez tekrarlanıyorsa önce konu açıklamasına dönmek, sonra benzer sorularla kısa tekrar yapmak daha sağlıklı olur.</p><p class="study-note">${esc(focus.tip)}</p></div><h2 style="margin:36px 0 28px">Konu Testleri</h2><div class="topic-list">${topicCards}</div></div></section>`,
  });
}

const guides = [
  {
    slug: "ilkokulda-duzenli-test-cozme.html",
    title: "İlkokulda Düzenli Test Çözme Alışkanlığı Nasıl Kazandırılır?",
    description: "İlkokul öğrencileri için düzenli, baskısız ve verimli test çözme alışkanlığı oluşturma önerileri.",
    links: [["../sinif-1.html", "1. sınıf dersleri"], ["../sinif-4.html", "4. sınıf dersleri"]],
    sections: [
      ["Düzenli tekrar neden önemlidir?", "İlkokulda öğrenilen bilgiler kısa sürede unutulabilir; çünkü çocuklar aynı anda okuma, yazma, dikkat, işlem ve yönerge takip etme gibi birçok beceriyi geliştirir. Düzenli test çözme, bu bilgilerin küçük aralıklarla tekrar edilmesini sağlar. Burada amaç çocuğu sürekli sınav havasına sokmak değildir. Amaç, öğrenilen konunun hatırlanıp hatırlanmadığını görmek, eksik kalan noktayı fark etmek ve öğrencinin kendi ilerlemesini görmesine yardım etmektir."],
      ["Kısa süre, yüksek dikkat", "İlkokul öğrencileri için uzun çalışma oturumları çoğu zaman verimli değildir. 10 soruluk kısa testler, dikkat dağılmadan tamamlanabildiği için daha sağlıklı geri bildirim verir. Öğrenci testi bitirdiğinde hemen sonuç ekranını görür, yanlışlarını inceler ve öğrenme döngüsü tamamlanır. Bu yapı özellikle 1 ve 2. sınıfta çalışma isteğini korumaya yardımcı olur."],
      ["Kolaydan zora ilerlemek", "Öğrenci bir konuya önce kolay testle başladığında temel kavramı kontrol eder. Orta seviye, bilgiyi farklı örneklerde kullanmasını sağlar. Zor seviye ise yorumlama, dikkat ve problemde verilen bilgileri ayırt etme becerilerini destekler. Bu sıralama öğrencinin başarısızlık hissi yaşamadan ilerlemesine yardım eder."],
      ["Yanlış soruların değeri", "Yanlış yapılan sorular yalnızca puan kaybı değildir; öğrencinin hangi basamakta zorlandığını gösteren küçük işaretlerdir. Bir çocuk işlem sonucunu doğru bulup soru kökünü yanlış okumuş olabilir. Başka bir öğrenci ise kavramı bilmesine rağmen seçenekleri karşılaştırırken acele etmiş olabilir. Bu yüzden açıklamaları okumak, yeni test çözmek kadar önemlidir."],
      ["Veliler nasıl destek olabilir?", "Veliler günlük hedefi çocuğun yaşına uygun tutmalı ve doğru sayısından çok öğrenme davranışına odaklanmalıdır. Çocuğa ‘kaç doğru yaptın?’ yerine ‘hangi soru seni düşündürdü?’ diye sormak daha yapıcıdır. Böylece öğrenci hatasını saklamak yerine açıklamaya ve anlamaya daha açık hale gelir."],
      ["Haftalık küçük plan", "Haftada birkaç gün seçilen tek bir konu üzerinde kısa test çözmek yeterlidir. Örneğin bir gün Türkçe okuma-anlama, başka bir gün Matematik problem çözme, hafta sonunda ise yanlış soruların tekrar incelenmesi planlanabilir. Bu plan sade olduğunda sürdürülebilir olur."],
      ["testcoz.pro nasıl yardımcı olur?", "testcoz.pro’da sınıf, ders ve konu yapısı açık biçimde ayrılır. Öğrenci önce sınıfını seçer, sonra ders ve konu başlığına ulaşır. Kolay, orta ve zor testlerle konuyu farklı seviyelerde dener. Sonuç ekranında doğru, yanlış ve boş sayısını görerek hangi konuda tekrar yapması gerektiğini daha net fark eder."],
    ],
  },
  {
    slug: "1-sinif-ogrencisi-nasil-calisir.html",
    title: "1. Sınıf Öğrencisi Evde Nasıl Çalışmalı?",
    description: "1. sınıf öğrencileri için okuma yazma, temel matematik ve günlük tekrar sürecini destekleyen öneriler.",
    links: [["../sinif-1.html", "1. sınıf testleri"], ["../ders/1-sinif-matematik.html", "1. sınıf Matematik"]],
    sections: [
      ["1. sınıfta çalışma farklıdır", "1. sınıf öğrencisi için çalışma, yetişkinlerin anladığı anlamda uzun süre masa başında kalmak değildir. Bu dönemde çocuk harfleri, sesleri, sayıları, yönergeleri ve okul düzenini aynı anda öğrenir. Bu yüzden çalışma kısa, somut ve anlaşılır olmalıdır. Bir test ya da etkinlik çocuğun kendini başarısız hissetmesine değil, öğrendiği küçük parçaları fark etmesine yardım etmelidir."],
      ["Okuma yazma süreci", "Okuma yazma öğrenirken öğrencinin harfi tanıması, sesi ayırt etmesi, heceyi kurması ve kelimeyi anlamlandırması gerekir. Testlerde kısa cümleler, görseller ve açık seçenekler kullanmak bu süreci destekler. Çocuk soruyu yüksek sesle okuyamıyorsa bir yetişkin yönergeyi okuyabilir; önemli olan çocuğun cevabı düşünerek seçmesidir."],
      ["Matematikte somut örnekler", "1. sınıf Matematikte sayılar, nesnelerle ve günlük yaşamla bağlantılı olduğunda daha iyi anlaşılır. Kalemleri saymak, oyuncakları gruplamak, paraları tanımak veya kısa toplama-çıkarma durumları kurmak çocuğun soyut işlemi somutlaştırmasına yardım eder. Testler bu deneyimi düzenli sorulara dönüştürür."],
      ["Çalışma süresi nasıl olmalı?", "Bu yaşta 10-15 dakikalık kısa çalışmalar çoğu zaman yeterlidir. Bir test çözüldükten sonra hemen ikinci teste geçmek yerine yanlışlara bakmak, kısa mola vermek ve gerekirse konuya dönmek daha sağlıklıdır. Çocuk yorulduğunda dikkat hataları artar ve gerçek öğrenme düzeyini görmek zorlaşır."],
      ["Yanlışlar nasıl konuşulmalı?", "Yanlış cevap verildiğinde ‘dikkat etmedin’ demek yerine ‘bu soruda neyi düşündün?’ diye sormak daha öğreticidir. Çocuk düşünme yolunu anlattığında hata genellikle kendiliğinden görünür. Açıklama metni birlikte okunabilir ve benzer bir örnek kurulabilir."],
      ["Velinin rolü", "Velinin görevi sürekli kontrol etmek değil, çocuğun düzenli ve güvenli şekilde deneme yapmasını sağlamaktır. Küçük başarıları fark etmek, yanlış soruyu sakin biçimde incelemek ve çalışma sonunda olumlu geri bildirim vermek öğrenme isteğini korur."],
      ["testcoz.pro’da 1. sınıf", "1. sınıf sayfasında Türkçe, Matematik, Hayat Bilgisi ve İngilizce dersleri ayrı ayrı listelenir. Ders kartlarından konu sayfalarına gidilebilir. Testler kayıt zorunluluğu olmadan çözülebilir; isteğe bağlı kayıt ise günlük hedef ve öğrenci paneli gibi ek özellikler için kullanılabilir."],
    ],
  },
  {
    slug: "2-sinifta-konu-tekrari-neden-onemli.html",
    title: "2. Sınıfta Konu Tekrarı Neden Önemlidir?",
    description: "2. sınıfta kalıcı öğrenme için konu tekrarı, yanlış analizi ve seviyeli test kullanımı önerileri.",
    links: [["../sinif-2.html", "2. sınıf testleri"], ["../ders/2-sinif-turkce.html", "2. sınıf Türkçe"]],
    sections: [
      ["2. sınıfta temel genişler", "2. sınıf öğrencisi artık okuma yazmayı daha akıcı kullanmaya başlar; ancak bu durum her konunun tamamen oturduğu anlamına gelmez. Matematikte işlemler çeşitlenir, Türkçe metinleri uzar, Hayat Bilgisi günlük yaşamla daha fazla bağlantı kurar. Konu tekrarı, yeni bilgilerin önceki bilgilerle bağlanmasını sağlar."],
      ["Unutmadan tekrar etmek", "Tekrar yalnızca sınavdan önce yapılan bir çalışma değildir. Öğrenci konuyu öğrendikten birkaç gün sonra kısa bir test çözdüğünde bilginin ne kadar kalıcı olduğunu görür. Eğer çok yanlış varsa bu başarısızlık değil, tekrar zamanının geldiğini gösteren yararlı bir işarettir."],
      ["Okuduğunu anlama", "2. sınıfta birçok hata işlemden değil, soru kökünü eksik okumaktan kaynaklanır. Öğrenci soruda ne istendiğini tam anlamadan seçeneklere geçerse doğru bilgiyi bilse bile yanlış cevap verebilir. Bu yüzden test çözmeden önce soruyu yavaş okuma alışkanlığı önemlidir."],
      ["Matematikte işlem basamakları", "Toplama, çıkarma, çarpma hazırlığı, ölçme ve problem çözme konularında öğrencinin işlem basamaklarını takip etmesi gerekir. Yanlış sorularda yalnızca sonuca bakmak yerine hangi basamakta hata yapıldığını bulmak daha değerlidir."],
      ["Kolay, orta ve zor testlerin kullanımı", "Kolay testler konunun temelini yoklar. Orta testler aynı bilgiyi farklı ifadelerle sorar. Zor testler ise öğrencinin dikkatini ve yorum becerisini ölçer. Bu üç basamak birlikte kullanıldığında öğrenci yalnızca ezber yapmaz, bilgiyi farklı durumlarda kullanmayı öğrenir."],
      ["Veliler için takip önerisi", "Haftalık küçük bir çizelgeyle hangi dersin çalışıldığı, hangi testte zorlanıldığı ve hangi konunun tekrar edildiği not alınabilir. Bu takip çocuğu baskılamak için değil, çalışma düzenini görünür kılmak için kullanılmalıdır."],
      ["testcoz.pro’da tekrar planı", "2. sınıf sayfasındaki ders kartları üzerinden Türkçe, Matematik, Hayat Bilgisi ve İngilizce konularına ulaşılabilir. Her konu kartındaki açıklamalar öğrencinin ne çalışacağını anlamasına yardım eder. Test bitimindeki açıklamalar tekrarın en önemli parçasıdır."],
    ],
  },
  {
    slug: "3-sinif-fen-bilimleri-nasil-calisilir.html",
    title: "3. Sınıf Fen Bilimleri Nasıl Çalışılır?",
    description: "3. sınıf Fen Bilimleri için gözlem, neden-sonuç ilişkisi, kavram tekrarı ve test çözme önerileri.",
    links: [["../sinif-3.html", "3. sınıf testleri"], ["../ders/3-sinif-fen-bilimleri.html", "3. sınıf Fen Bilimleri"]],
    sections: [
      ["Fen merakla başlar", "3. sınıf Fen Bilimleri, öğrencinin çevresindeki olayları daha dikkatli gözlemlemesini sağlar. Bitkiler, hayvanlar, kuvvet, madde, ışık ve ses gibi konular yalnızca tanım ezberleyerek öğrenilmez. Öğrenci günlük yaşamda gördüğü örneklerle kavram arasında bağ kurduğunda bilgi kalıcı hale gelir."],
      ["Kavramı örnekle düşünmek", "Bir kavramı öğrenirken öğrenciden sadece tanımı söylemesini istemek yeterli değildir. Örneğin kuvvet konusu çalışılırken itme ve çekme davranışlarını evdeki kapı, oyuncak veya çanta örnekleriyle ilişkilendirmek daha anlaşılırdır. Test soruları bu örnekleri farklı biçimde karşısına çıkarır."],
      ["Neden-sonuç ilişkisi", "Fen sorularında sık görülen güçlüklerden biri olayın nedenini ve sonucunu ayırt etmektir. Öğrenci ‘ne oldu?’, ‘neden oldu?’ ve ‘sonuç ne?’ sorularını ayrı ayrı düşündüğünde daha doğru cevap verir. Bu alışkanlık zor testlerde özellikle önemlidir."],
      ["Görselleri dikkatle incelemek", "Fen Bilimleri testlerinde görsel, tablo veya kısa deney açıklaması bulunabilir. Öğrenci görsele yalnızca bakmakla kalmamalı, oradaki küçük ayrıntıları da soru köküyle ilişkilendirmelidir. Yanlışların bir kısmı görseldeki ipucunun kaçırılmasından kaynaklanır."],
      ["Kolaydan zora çalışma", "Önce kolay testle temel kavramlar kontrol edilmeli, orta testte örnekler çeşitlenmeli, zor testte ise yorum gerektiren sorular çözülmelidir. Zor testte yapılan yanlışlar konuya geri dönmek için güçlü bir rehberdir."],
      ["Evde küçük gözlemler", "Fen çalışması her zaman deney seti gerektirmez. Gölgeyi gözlemek, suyun hâl değişimini konuşmak, bitkinin büyümesini takip etmek veya mıknatısla hangi nesnelerin çekildiğini denemek öğrencinin derse ilgisini artırır."],
      ["testcoz.pro’da Fen Bilimleri", "3. sınıf Fen Bilimleri konu sayfasında her başlık kısa açıklamalarla listelenir. Öğrenci konu kartını okuyarak neyi öğreneceğini görür, ardından uygun seviyedeki testleri çözerek bilgisini ölçer. Sonuç ekranındaki açıklamalar eksik kalan kavramı bulmayı kolaylaştırır."],
    ],
  },
  {
    slug: "4-sinif-matematik-problemleri-nasil-cozulur.html",
    title: "4. Sınıf Matematik Problemleri Nasıl Çözülür?",
    description: "4. sınıf Matematik problemlerinde verilen-istenen bilgiyi ayırma, işlem seçme ve kontrol etme rehberi.",
    links: [["../sinif-4.html", "4. sınıf testleri"], ["../ders/4-sinif-matematik.html", "4. sınıf Matematik"]],
    sections: [
      ["Problem çözme bir okuma becerisidir", "4. sınıf Matematikte problem çözme yalnızca işlem bilmek değildir. Öğrenci önce metni anlamalı, verilen bilgileri seçmeli, isteneni belirlemeli ve uygun işlemi planlamalıdır. Birçok yanlış, işlem bilgisinden değil soru kökünü hızlı geçmekten kaynaklanır."],
      ["Verilen ve istenen bilgiyi ayırmak", "Problemi çözerken önce verilen sayılar ve bilgiler not alınmalıdır. Sonra sorunun tam olarak ne istediği yazılmalıdır. Bu küçük adım, öğrencinin gereksiz bilgileri ayıklamasına ve doğru işlem yolunu seçmesine yardım eder."],
      ["İşlem seçimi", "Toplama, çıkarma, çarpma ve bölme işlemleri günlük problemlerde farklı anlamlara gelir. Artma, birleşme, eksilme, paylaşma, gruplama ve karşılaştırma ifadeleri işlem seçimi için ipucu verir. Öğrenci bu ipuçlarını fark ettiğinde problem daha anlaşılır hale gelir."],
      ["Tahmin ve kontrol", "Sonucu bulduktan sonra ‘bu cevap mantıklı mı?’ diye sormak çok değerlidir. Tahmin, özellikle büyük sayılarla yapılan işlemlerde hatayı erken fark etmeyi sağlar. Kontrol alışkanlığı, zor testlerde öğrencinin güvenini artırır."],
      ["Kesir, ölçme ve zaman problemleri", "4. sınıfta kesirler, uzunluk, kütle, sıvı ölçme ve zaman ölçme problemleri daha fazla dikkat gerektirir. Birim dönüşümleri, saat-dakika ilişkisi ve parça-bütün düşüncesi öğrencinin adım adım ilerlemesini ister."],
      ["Yanlış analizinin önemi", "Yanlış yapılan bir problemde yalnızca doğru cevabı görmek yeterli değildir. Öğrenci hangi bilgiyi yanlış seçtiğini, hangi işlemi gereksiz yaptığını veya sonucu kontrol edip etmediğini incelemelidir. Açıklamalı testler bu nedenle değerlidir."],
      ["testcoz.pro’da 4. sınıf Matematik", "4. sınıf Matematik sayfasında doğal sayılar, işlemler, kesirler, ölçme, geometri ve veri konuları yer alır. Kolay testler temel işlemleri, orta testler problem uygulamalarını, zor testler ise yorumlama ve dikkat becerisini ölçmek için kullanılabilir."],
    ],
  },
  {
    slug: "veliler-icin-test-takip-onerileri.html",
    title: "Veliler İçin Test Takip Önerileri",
    description: "Velilerin ilkokul test sonuçlarını doğru yorumlaması, yanlışları izlemesi ve günlük hedef belirlemesi için öneriler.",
    links: [["../veli.html", "Veliler için bilgiler"], ["../sinif-1.html", "Sınıf sayfaları"]],
    sections: [
      ["Takip baskı anlamına gelmez", "Velinin test takibi, çocuğu sürekli kontrol etmek veya yalnızca puana odaklanmak anlamına gelmemelidir. Doğru takip, öğrencinin hangi konuda zorlandığını görmesine ve küçük adımlarla ilerlemesine yardım eder. Çocuk takip edildiğini değil, desteklendiğini hissetmelidir."],
      ["Doğru sayısından fazlası", "Bir testteki doğru sayısı önemli bir göstergedir; fakat tek başına yeterli değildir. Öğrenci aynı soru türünde sürekli hata yapıyorsa konu eksik olabilir. Farklı konularda küçük dikkat hataları varsa çalışma ortamı veya süre kullanımı gözden geçirilebilir."],
      ["Yanlışları sınıflandırmak", "Yanlışlar işlem hatası, okuma hatası, dikkat hatası ve kavram eksikliği olarak ayrılabilir. Bu ayrım yapıldığında tekrar planı daha doğru kurulur. Her yanlış için uzun açıklama yapmak yerine çocuğun kendi düşünme yolunu anlatması istenebilir."],
      ["Günlük hedef belirlemek", "Günlük hedef çok yüksek olduğunda çocuk kısa sürede yorulur. İlkokul için az ama düzenli soru çözmek daha değerlidir. 10 soruluk bir test, yanlışların incelenmesiyle birlikte yeterli bir çalışma oturumu olabilir."],
      ["Olumlu geri bildirim", "Çocuk hata yaptığında cesaretini kaybetmemelidir. ‘Bu soruda acele etmişsin, birlikte tekrar bakalım’ gibi sakin ifadeler öğrenmeyi destekler. Başarı yalnızca yüksek puan değil, önceki hatayı fark edip düzeltme davranışıdır."],
      ["Kayıt ve gizlilik", "testcoz.pro’da testleri kayıt olmadan çözmek mümkündür. İsteğe bağlı kayıt günlük soru hedefi ve öğrenci paneli gibi özellikler için kullanılabilir. Kayıt yapılırsa bilgiler gizlilik politikası kapsamında işlenir; veliler düzeltme veya silme talepleri için iletişim adresini kullanabilir."],
      ["Haftalık değerlendirme", "Haftanın sonunda hangi derslerde ilerleme olduğu, hangi konuların tekrar istediği ve hangi test seviyesinin uygun olduğu kısa bir notla değerlendirilebilir. Bu notlar çocuğun kendi gelişimini görmesine de yardım eder."],
    ],
  },
  {
    slug: "yanlis-sorulardan-ogrenme-yontemi.html",
    title: "Yanlış Sorulardan Öğrenme Yöntemi",
    description: "Yanlış yapılan soruları puan kaybı yerine öğrenme fırsatına dönüştürmek için uygulanabilir yöntemler.",
    links: [["../sinif-2.html", "2. sınıf testleri"], ["../sinif-4.html", "4. sınıf testleri"]],
    sections: [
      ["Yanlış soru neden değerlidir?", "Yanlış yapılan soru, öğrencinin hangi düşünme basamağında zorlandığını gösterir. Bu nedenle yanlışlar saklanacak ya da hızla geçilecek bir bölüm değildir. Doğru incelendiğinde yanlış soru, bir sonraki çalışmanın en açık yol haritası olur."],
      ["Önce soru köküne dönmek", "Öğrenci yanlış cevap verdiğinde ilk adım soru kökünü tekrar okumaktır. Soru ‘hangisi değildir’ mi diyor, yoksa doğru seçeneği mi istiyor? Birçok hata, öğrencinin konuyu bilmemesinden değil, yönergeyi hızlı geçmesinden kaynaklanır."],
      ["Cevabı değil düşünme yolunu konuşmak", "Yetişkin doğru cevabı hemen söylemek yerine öğrencinin nasıl düşündüğünü dinlemelidir. ‘Bu seçeneği neden seçtin?’ sorusu çocuğun kendi hatasını fark etmesini sağlar. Bu yaklaşım, açıklama metninin daha anlamlı okunmasına da yardım eder."],
      ["Hata türünü belirlemek", "Yanlışın işlem hatası mı, kavram eksikliği mi, dikkat hatası mı olduğu belirlenmelidir. Her hata türünün çözümü farklıdır. İşlem hatası için kısa pratik, kavram eksikliği için konuya dönüş, dikkat hatası için yavaş okuma alışkanlığı gerekir."],
      ["Boş bırakılan sorular", "Boş sorular da yanlışlar kadar öğreticidir. Öğrenci bazen soruyu anlamadığı için, bazen de emin olmadığı için boş bırakır. Boş soruda önce hangi kelime veya bilgi onu durdurdu, bunu bulmak gerekir."],
      ["Tekrar testi ne zaman çözülmeli?", "Yanlış açıklaması okunduktan hemen sonra aynı seviyede yeni test çözmek yerine kısa bir ara vermek ve benzer bir örnek üzerinde düşünmek daha verimlidir. Sonraki gün kısa tekrar, bilginin kalıcılığını artırır."],
      ["testcoz.pro sonuç ekranı", "Test sonunda doğru, yanlış, boş sayısı ve başarı yüzdesi görünür. Yanlış yapılan sorularda kullanıcının verdiği cevap, doğru cevap ve kısa açıklama yer alır. Bu yapı, öğrencinin yalnızca sonucu değil, hatanın nedenini de görmesini sağlar."],
    ],
  },
  {
    slug: "kolay-orta-zor-test-sistemi-nedir.html",
    title: "Kolay, Orta ve Zor Test Sistemi Nedir?",
    description: "Seviyeli test sisteminin ilkokul öğrencilerinde güven, tekrar, yorumlama ve problem çözme becerilerini nasıl desteklediğini açıklar.",
    links: [["../sinif-3.html", "3. sınıf testleri"], ["../ders/4-sinif-matematik.html", "4. sınıf Matematik"]],
    sections: [
      ["Seviyeli test neden kullanılır?", "Her öğrenci bir konuyu aynı hızda öğrenmez. Bazı öğrenciler temel kavramı hemen kavrar, bazıları daha fazla örneğe ihtiyaç duyar. Kolay, orta ve zor test sistemi bu farkları dikkate alır. Öğrenci aynı konuyu üç farklı derinlikte deneyerek hem güven kazanır hem de gelişmesi gereken alanları görür."],
      ["Kolay testlerin görevi", "Kolay testler temel kavramı ve ilk öğrenmeyi kontrol eder. Bu sorular öğrencinin konuya ısınmasını sağlar. Kolay testte çok sayıda yanlış varsa orta veya zor seviyeye geçmeden önce konu açıklamasına dönmek daha sağlıklı olur."],
      ["Orta seviye neyi ölçer?", "Orta seviye testler bilgiyi farklı örneklerde kullanmayı ister. Öğrenci kavramı tanır; fakat artık onu yeni bir cümle, görsel, problem veya tablo içinde yorumlaması gerekir. Bu seviye öğrenmenin gerçekten yerleşip yerleşmediğini gösterir."],
      ["Zor testlerin amacı", "Zor testler öğrenciyi korkutmak için değildir. Bu testler daha dikkatli okuma, seçenekleri eleme, birden fazla bilgiyi birleştirme ve problem çözme becerisini destekler. Zor testte yapılan yanlışlar gelişim için güçlü ipuçları verir."],
      ["Hangi sırayla çözülmeli?", "Genel öneri kolaydan orta ve zora ilerlemektir. Ancak öğrenci konuya çok hâkimse doğrudan orta testle başlayabilir. Yine de yanlışlar arttığında kolay seviyeye dönmek, eksik temeli görmek için yararlıdır."],
      ["Veliler nasıl yorumlamalı?", "Kolay testte başarı yüksek, orta testte düşüş varsa öğrenci bilgiyi farklı bağlamlarda kullanmaya çalışmalıdır. Zor testte düşüş normaldir; burada amaç yorumlama becerisini geliştirmektir. Her seviye ayrı bir geri bildirim verir."],
      ["testcoz.pro’daki yapı", "testcoz.pro’da konu sayfalarında uygun testler kolay, orta ve zor olarak listelenir. Her test 10 sorudan oluşur. Sonuç ekranındaki açıklamalar sayesinde öğrenci seviyeler arasında bilinçli ilerleyebilir ve yalnızca puana değil öğrenme sürecine odaklanabilir."],
    ],
  },
];

function guidePage(article) {
  const related = article.links.map(([href, label]) => `<a class="guide-related-link" href="${href}">${esc(label)}</a>`).join("");
  const sections = article.sections.map(([heading, text], index) => `<section><h2>${esc(heading)}</h2><p>${esc(text)}</p>${index === 2 ? "<h3>Uygulanabilir küçük adım</h3><p>Bugün tek bir konu seçip önce kısa açıklamayı okuyun, ardından 10 soruluk bir test çözün. Sonuç ekranında yanlış ve boş sorulara bakarak yarın hangi konuyu tekrar edeceğinizi belirleyin. Bu küçük adım, çalışmayı büyütmeden düzen kurmaya yardım eder; çocuk için hedef ulaşılabilir kaldığında öğrenme isteği de daha kolay korunur.</p>" : ""}</section>`).join("");
  const extraSections = `<section><h2>Sık yapılan küçük hatalar</h2><p>İlkokul düzeyinde öğrenciler çoğu zaman konuyu hiç bilmedikleri için değil, yönergeyi hızlı okudukları, görseldeki ayrıntıyı kaçırdıkları veya seçenekleri karşılaştırmadan cevap verdikleri için hata yapar. Bu nedenle testten sonra yalnızca doğru cevaba bakmak yeterli değildir. Öğrencinin soruyu nasıl okuduğunu, hangi seçeneği neden elediğini ve nerede duraksadığını konuşmak daha kalıcı bir öğrenme sağlar. Hata türü görüldüğünde çalışma da daha doğru planlanır.</p></section><section><h2>Haftalık çalışma planı nasıl kurulabilir?</h2><p>Basit bir haftalık plan çoğu zaman uzun listelerden daha etkilidir. Pazartesi tek konu açıklaması, salı kolay test, çarşamba yanlışların incelenmesi, perşembe orta test, hafta sonu ise kısa tekrar yapılabilir. Bu plan öğrencinin her gün aynı yoğunlukta çalışmasını gerektirmez; önemli olan konunun küçük parçalara ayrılmasıdır. Veliler bu süreçte süreyi, dikkat düzeyini ve öğrencinin hangi soru tipinde zorlandığını not edebilir.</p></section><section><h2>Öğrenciye uygun tempo</h2><p>Çalışma temposu öğrencinin yaşına, okuma hızına ve dikkat süresine göre ayarlanmalıdır. Bazı çocuklar bir testi hızlı tamamlar ama açıklamaları okumakta zorlanır; bazıları ise soruları yavaş çözer fakat hatasını daha iyi anlatır. Bu farklılıklar normaldir. Verimli çalışma, çocuğun kendi hızını görmesi ve küçük hedeflerle ilerlemesiyle oluşur. Bu nedenle süre tutmak yerine anlamaya, denemeye ve hatadan sonra tekrar düşünmeye alan açmak daha sağlıklı bir yaklaşımdır.</p></section><section><h2>Sonuç ekranı nasıl okunmalı?</h2><p>Başarı yüzdesi hızlı bir özet verir; fakat asıl değer yanlış ve boş soruların açıklamasındadır. Bir öğrenci yüksek doğru sayısına rağmen aynı kavramda tekrar hata yapıyorsa o konu güçlendirilmelidir. Başka bir öğrenci düşük puan alsa bile açıklamaları okuyup aynı hatayı tekrar etmiyorsa öğrenme gerçekleşiyor demektir. Bu yüzden sonuç ekranı bir bitiş noktası değil, bir sonraki çalışma için başlangıç noktası olarak görülmelidir.</p></section><section><h2>Kayıtsız erişim ve güvenli kullanım</h2><p>testcoz.pro’da testlere kayıt olmadan ulaşılabilir. İsteğe bağlı kayıt sistemi, günlük soru hedefi ve öğrenci paneli gibi ek özellikler için sunulur; test çözmek için zorunlu değildir. Veliler, çocuğun çalışma sürecini desteklerken kişisel bilgilerin paylaşımı konusunda bilinçli davranmalı ve gerektiğinde gizlilik politikası sayfasını incelemelidir. Böylece platform hem pratik çalışma hem de güvenli kullanım açısından daha anlaşılır hale gelir.</p></section>`;
  return page({
    prefix: "../",
    active: "guide",
    title: `${article.title} | testcoz.pro Rehber`,
    description: article.description,
    canonical: `${SITE}/rehber/${article.slug}`,
    body: `<div class="container"><nav class="breadcrumb"><a href="../index.html">Ana Sayfa</a><span>›</span><span>Rehber</span></nav></div><article class="section guide-article"><div class="container"><header class="guide-header"><span class="eyebrow">İlkokul çalışma rehberi</span><h1>${esc(article.title)}</h1><p>${esc(article.description)}</p></header><div class="study-content guide-body">${sections}${extraSections}<div class="guide-related"><h2>İlgili sayfalar</h2><div>${related}</div></div></div></div></article>`,
  });
}

const subjectUrls = [];
for (const [key, grade] of Object.entries(catalog.grades)) {
  const level = Number(key);
  fs.writeFileSync(`sinif-${level}.html`, classPage(level, grade), "utf8");
  for (const subject of grade.subjects) {
    const name = `${level}-sinif-${subject.id}.html`;
    fs.writeFileSync(path.join(subjectDir, name), subjectPage(level, grade, subject), "utf8");
    subjectUrls.push(`${SITE}/ders/${name}`);
  }
}

const guideUrls = [];
for (const article of guides) {
  fs.writeFileSync(path.join(guideDir, article.slug), guidePage(article), "utf8");
  guideUrls.push(`${SITE}/rehber/${article.slug}`);
}

const coreUrls = [
  "",
  "hakkimizda.html",
  "iletisim.html",
  "gizlilik-politikasi.html",
  "kullanim-sartlari.html",
  "veli.html",
  "kayit.html",
  "giris.html",
  ...[1, 2, 3, 4].map((level) => `sinif-${level}.html`),
].map((url) => `${SITE}/${url}`);
const testUrls = tests.filter((test) => test.pageUrl).map((test) => `${SITE}/${test.pageUrl}`);
const sitemapUrls = [...new Set([...coreUrls, ...subjectUrls, ...testUrls, ...guideUrls])];
fs.writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
  "utf8",
);
fs.writeFileSync(
  "robots.txt",
  "User-agent: *\nAllow: /\nAllow: /ders/\nAllow: /rehber/\nAllow: /tests/\nAllow: /assets/\nAllow: /images/\n\nSitemap: https://testcoz.pro/sitemap.xml\n",
  "utf8",
);

console.log(`✓ 4 sınıf, ${subjectUrls.length} ders, ${guideUrls.length} rehber sayfası üretildi. Sitemap: ${sitemapUrls.length} URL.`);
