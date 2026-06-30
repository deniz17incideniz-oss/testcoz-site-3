import fs from "node:fs";
import vm from "node:vm";

const context = { window: {} };
vm.createContext(context);
for (const file of fs.readdirSync("data/tests").filter((name) => name.endsWith(".js")).sort()) {
  vm.runInContext(fs.readFileSync(`data/tests/${file}`, "utf8"), context);
}

const tests = context.window.TESTCOZ_TESTS || [];
const required = ["classLevel", "subject", "topic", "difficulty", "testNumber", "questions", "pageUrl"];
const difficulties = new Set(["kolay", "orta", "zor"]);
const questionTexts = new Set();

if (tests.length !== 24) throw new Error(`Toplam 24 test bulunmalı; bulunan: ${tests.length}.`);
const slugs = new Set();
for (const test of tests) {
  for (const field of required) if (!(field in test)) throw new Error(`Eksik test alanı: ${field}`);
  if (!difficulties.has(test.difficulty)) throw new Error(`Geçersiz zorluk: ${test.difficulty}`);
  if (!fs.existsSync(test.pageUrl)) throw new Error(`Test sayfası bulunamadı: ${test.pageUrl}`);
  if (test.questions.length !== 10) throw new Error(`${test.difficulty} testi 10 soru içermiyor.`);
  if (test.slug) {
    if (slugs.has(test.slug)) throw new Error(`Tekrarlanan test slugı: ${test.slug}`);
    if (!/^[a-z0-9-]+$/.test(test.slug)) throw new Error(`SEO uyumsuz test slugı: ${test.slug}`);
    slugs.add(test.slug);
  }
  if (test.classLevel === 1 && test.subject === "matematik" && test.questions.filter((question) => question.image).length < 3) {
    throw new Error(`${test.slug} en az 3 görselli soru içermeli.`);
  }
  for (const [index, question] of test.questions.entries()) {
    for (const field of ["question", "choices", "correctAnswer", "explanation"]) {
      if (!(field in question)) throw new Error(`${test.difficulty} ${index + 1}. soruda ${field} eksik.`);
    }
    if (!Array.isArray(question.choices) || question.choices.length < 2) throw new Error("Şık yapısı geçersiz.");
    if (test.classLevel === 1 && question.choices.length !== 4) throw new Error(`${test.slug} ${index + 1}. soruda 4 şık olmalı.`);
    if (question.correctAnswer < 0 || question.correctAnswer >= question.choices.length) throw new Error("Doğru cevap indeksi geçersiz.");
    if (!question.explanation.trim()) throw new Error("Çözüm açıklaması boş bırakılamaz.");
    if (question.image && !fs.existsSync(question.image)) throw new Error(`Soru görseli bulunamadı: ${question.image}`);
    const normalizedQuestion = question.question.trim().toLocaleLowerCase("tr-TR");
    if (questionTexts.has(normalizedQuestion)) throw new Error(`Tekrarlanan soru metni: ${question.question}`);
    questionTexts.add(normalizedQuestion);
  }
}

const firstGradeTests = tests.filter((test) => test.classLevel === 1 && test.subject === "matematik");
if (firstGradeTests.length !== 21) throw new Error("1. sınıf Matematik için 21 test bulunmalı.");
if (new Set(firstGradeTests.map((test) => test.topic)).size !== 7) throw new Error("1. sınıf Matematik için 7 konu bulunmalı.");
console.log(`✓ ${tests.length} test ve ${tests.reduce((sum, test) => sum + test.questions.length, 0)} soru doğrulandı.`);
