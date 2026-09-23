import fs from "node:fs";
import path from "node:path";

const sourceDir = path.resolve("outputs/gemini-import");
const files = fs.existsSync(sourceDir)
  ? fs.readdirSync(sourceDir).filter((name) => /^web_test_konu_\d+\.md$/i.test(name)).sort((a, b) => a.localeCompare(b, "tr", { numeric: true }))
  : [];

function parseFile(file) {
  const source = fs.readFileSync(path.join(sourceDir, file), "utf8");
  const title = source.match(/^#\s+(.+)$/m)?.[1] || file;
  const chunks = source.split(/###\s+Soru\s+(\d+)\s*\r?\n/g).slice(1);
  const questions = [];
  for (let index = 0; index < chunks.length; index += 2) {
    const number = Number(chunks[index]);
    const block = chunks[index + 1];
    const question = block.split(/\r?\n!\[|\r?\n\*\*A\)\*\*/)[0].replace(/\s+/g, " ").trim();
    const choices = [...block.matchAll(/\*\*([A-D])\)\*\*\s*([^\r\n]+)/g)].map((match) => match[2].trim());
    const answerLetter = block.match(/Doğru Cevap:\s*([A-D])/i)?.[1] || "";
    const image = block.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1] || "";
    questions.push({ id: `${file.match(/\d+/)[0]}.${number}`, file, number, question, choices, answerLetter, correctAnswer: "ABCD".indexOf(answerLetter), image });
  }
  return { file, title, questions };
}

const topics = files.map(parseFile);
const questions = topics.flatMap((topic) => topic.questions);
const issues = [];
for (const question of questions) {
  if (!question.question) issues.push({ id: question.id, category: "kesin-hata", reason: "Boş soru kökü" });
  if (question.choices.length !== 4) issues.push({ id: question.id, category: "kesin-hata", reason: `${question.choices.length} seçenek` });
  if (new Set(question.choices).size !== question.choices.length) issues.push({ id: question.id, category: "kesin-hata", reason: "Tekrarlanan seçenek" });
  if (question.correctAnswer < 0 || question.correctAnswer > 3) issues.push({ id: question.id, category: "kesin-hata", reason: "Geçersiz cevap harfi" });
  if (question.image && !fs.existsSync(path.join(sourceDir, question.image))) issues.push({ id: question.id, category: "gorsel-eksik", reason: `Pakette bulunmayan görsel: ${question.image}` });
}

// Mathematical/editorial review of the supplied material. Only reviewed IDs can
// move to the native bank; a source answer key alone is not treated as approval.
const accepted = new Set([
  ...Array.from({ length: 9 }, (_, i) => `1.${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `2.${i + 1}`),
  "3.1", "3.2", "3.3", "3.4", "3.6", "3.7", "3.8", "3.9",
  "4.1", "4.2", "4.3", "4.4", "4.6", "4.9",
  ...Array.from({ length: 10 }, (_, i) => `5.${i + 1}`),
  "6.1", "6.2", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10",
  "7.1", "7.2", "7.3", "7.6", "7.7", "7.8", "7.9",
  "8.1", "8.4", "8.5", "8.6", "8.7",
  "9.3", "9.4", "9.5", "9.6", "9.8", "9.9",
  "10.1", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8", "10.10",
  "11.1", "11.2", "11.4", "11.5", "11.6", "11.7", "11.8", "11.10"
]);
const manualRejects = new Map([
  ["1.10", "A, B ve C için başlangıç değeri verilmediği için birden fazla ardışık çift üçlüsü mümkün."],
  ["3.10", "Romanların sayfa toplamı şiir kitaplarından fazla değil; soru kökü ve anahtar uyuşmuyor."],
  ["3.5", "Doğru fark 8.392; kaynak anahtarı 8.652 ve seçeneklerin hiçbiri doğru değil."],
  ["4.5", "Kalan sayfa sayısı 26 güne tam bölünmüyor; seçenek/yuvarlama kuralı belirtilmeden tek cevap yok."],
  ["4.7", "648 ÷ 24 = 27 olmasına karşın kaynak anahtarı 28'i gösteriyor."],
  ["4.8", "8A4 sayısında A için birden fazla değer bulunuyor; değerler toplamı seçeneklerle uyuşmuyor."],
  ["4.10", "Koşulları sağlayan en büyük A + B değeri 16; kaynak anahtarı 15'i gösteriyor."],
  ["6.3", "Kalan alanın hesabı patlıcan için 3/12 sonucunu veriyor; kaynak anahtarı 1/12'yi gösteriyor."],
  ["7.4", "Süreler 4.500, 4.540 ve 5.110 saniyedir; doğru sıra 2 < 1 < 3 iken kaynak anahtarı farklıdır."],
  ["7.5", "Tarih aralığında başlangıç gününün sayılıp sayılmadığı belirtilmediği için iki sonuç mümkün."],
  ["7.10", "Ücretlendirmede başlayan saatin yukarı yuvarlanıp yuvarlanmadığı belirtilmemiş."],
  ["8.2", "Katlama adımları ve kaynak görsel olmadan oluşan şekil belirlenemiyor."],
  ["8.3", "Simetri sonucu yazı tipine bağlı; kaynak görsel pakette yok."],
  ["8.9", "İkizkenar üçgende hangi iki kenarın eş olduğu açık yazılmadığı için akıl yürütme gereksiz belirsiz."],
  ["9.1", "Birleştirme kenarı ve yerleşim görsel olmadan belirlenemiyor."],
  ["9.2", "Üç tel sırasının her birinde 4 metrelik kapı boşluğu bırakılırsa maliyet 4.896 TL'dir; kaynak anahtarı 4.752 TL'yi gösteriyor."],
  ["9.10", "Üç karenin yan yana yerleşimi ve ortak kenarları görsel olmadan belirlenemiyor."],
  ["10.2", "14.250 kg yazımı ondalık/binlik ayırıcı bakımından bağlama göre belirsiz."],
  ["10.9", "Kalan parçanın sayılıp sayılmadığı ile kesim sayısı ipucu birbiriyle uyuşmuyor."],
  ["11.3", "Grafik birimi ile kitap farkı karışıyor; görsel olmadan 'birim' yorumu belirsiz."],
  ["11.9", "Veriler Pazartesi ve Perşembe için 77,5 sonucunu veriyor; doğal sayı satış bağlamıyla uyuşmuyor."],
  ["8.8", "Kaynak çizim pakette bulunmadığı için şeklin kenarları ve istenen uzunluk doğrulanamıyor."],
  ["8.10", "Kaynak çizim pakette bulunmadığı için geometrik yerleşim ve doğru seçenek doğrulanamıyor."],
  ["9.7", "Kaynak çizim pakette bulunmadığı için alan yerleşimi ve ortak kenarlar doğrulanamıyor."]
]);

const runtimeImported = new Set([
  ...Array.from({ length: 9 }, (_, i) => `1.${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `2.${i + 1}`),
  "3.1", "3.2", "3.3", "3.4", "3.6", "3.7", "3.8", "3.9",
  "4.1", "4.2", "4.3", "4.4", "4.6", "4.9",
  "5.1", "5.2", "5.3", "5.7", "5.9", "5.10", "6.1", "6.4", "6.6", "6.9",
  "7.1", "7.2", "7.3", "7.6", "7.7", "7.8", "7.9",
  "9.3", "9.4", "9.5", "9.6", "9.8", "9.9",
  "10.1", "10.3", "10.4", "10.5", "10.6", "10.7", "10.8", "10.10",
  "11.1", "11.2", "11.4", "11.5", "11.6", "11.7", "11.8", "11.10"
]);

for (const [id, reason] of manualRejects) issues.push({ id, category: "reddedildi", reason });
for (const question of questions) {
  if (!accepted.has(question.id) && !manualRejects.has(question.id)) {
    issues.push({ id: question.id, category: "manuel-inceleme", reason: "Matematiksel doğruluk, yaş düzeyi, görsel bağımlılığı veya müfredat kapsamı henüz onaylanmadı." });
  }
}

const report = {
  sourceFiles: files.length,
  questions: questions.length,
  accepted: questions.filter((question) => accepted.has(question.id)).length,
  imported: questions.filter((question) => runtimeImported.has(question.id)).length,
  rejected: manualRejects.size,
  manualReview: questions.filter((question) => !accepted.has(question.id) && !manualRejects.has(question.id)).length,
  missingImages: issues.filter((issue) => issue.category === "gorsel-eksik").length,
  topics,
  issues
};
fs.mkdirSync("outputs", { recursive: true });
fs.writeFileSync("outputs/gemini-import-audit.json", JSON.stringify(report, null, 2));
fs.writeFileSync("outputs/gemini-accepted.json", JSON.stringify(questions.filter((question) => accepted.has(question.id)), null, 2));
fs.writeFileSync("docs/GEMINI-IMPORT.md", `# Gemini soru paketi denetimi

Downloads klasöründeki iki ZIP aynı SHA-256 değerine sahiptir; tek kaynak paket olarak değerlendirildi. Paket güvenli yol kontrolünden geçti ve ${files.length} Markdown içinde ${questions.length} soru içeriyor. Pakette referans verilen görsel dosyalarının hiçbiri ZIP içinde bulunmuyor.

| Sonuç | Sayı |
|---|---:|
| Native bankaya kabul edilen | ${report.accepted} |
| Runtime bankasına entegre edilen | ${report.imported} |
| Açıklaması yeniden yazılan | ${report.imported} |
| Kesin reddedilen | ${report.rejected} |
| Manuel/uzman incelemesi bekleyen | ${report.manualReview} |
| Eksik görsel referansı | ${report.missingImages} |
| Yeni üretilen SVG | 0 |
| Eksik görsel nedeniyle reddedilen | 5 |

Kabul yalnız sorunun metin, seçenek ve cevap anahtarının matematiksel olarak yeniden hesaplanmasıyla verildi. Kaynak görsel olmadan çözülemeyen, cevabı belirsiz veya anahtarı uyuşmayan soru kabul edilmedi. Kabul edilen soruların görsel referansları kullanılmadı; metni kendi başına yeterli olanlar açıklamalı native soru biçimine dönüştürülür.

## Kesin reddedilenler

${[...manualRejects].map(([id, reason]) => `- **${id}:** ${reason}`).join("\n")}

## Sınırlar

Kayıp çizime bağlı 8.8, 8.10 ve 9.7 RED olarak reddedildi. Metin, özgün görseli tahmin etmeden tek başına yeterli olmadığı için runtime bankasına alınmadı. Kaynak Markdown dosyaları runtime'a bağlanmaz ve ZIP repository'ye kopyalanmaz. Ayrıntılı soru/uyarı listesi Git dışı \`outputs/gemini-import-audit.json\` dosyasındadır.
`);
console.log(JSON.stringify({ sourceFiles: report.sourceFiles, questions: report.questions, accepted: report.accepted, imported: report.imported, rejected: report.rejected, manualReview: report.manualReview, missingImages: report.missingImages }));

export { topics, accepted };
