import fs from "node:fs";
import vm from "node:vm";

const context = { window: {}, URLSearchParams };
vm.createContext(context);
vm.runInContext(fs.readFileSync("js/utils.js", "utf8"), context);
vm.runInContext(fs.readFileSync("data/catalog.js", "utf8"), context);
for (const file of fs.readdirSync("data/tests").filter((name) => name.endsWith(".js")).sort()) {
  vm.runInContext(fs.readFileSync(`data/tests/${file}`, "utf8"), context);
}

const tests = context.window.TESTCOZ_TESTS || [];
const required = ["classLevel", "subject", "topic", "difficulty", "testNumber", "questions", "pageUrl"];
const difficulties = new Set(["kolay", "orta", "zor"]);
const questionTexts = new Set();
const slugs = new Set();

if (tests.length !== 48) throw new Error(`Toplam 48 test bulunmalı; bulunan: ${tests.length}.`);

for (const test of tests) {
  for (const field of required) {
    if (!(field in test)) throw new Error(`Eksik test alanı: ${field}`);
  }
  if (!difficulties.has(test.difficulty)) throw new Error(`Geçersiz zorluk: ${test.difficulty}`);
  const grade = context.window.TESTCOZ_CATALOG.grades[test.classLevel];
  const subject = grade && grade.subjects.find((item) => item.id === test.subject);
  const topic = subject && subject.topics.find((item) => item.id === test.topic);
  if (!topic) throw new Error(`Katalogda karşılığı olmayan test: ${test.slug}`);
  if (!fs.existsSync(test.pageUrl)) throw new Error(`Test sayfası bulunamadı: ${test.pageUrl}`);
  if (test.questions.length !== 10) throw new Error(`${test.slug} testi 10 soru içermiyor.`);
  if (test.slug) {
    if (slugs.has(test.slug)) throw new Error(`Tekrarlanan test slugı: ${test.slug}`);
    if (!/^[a-z0-9-]+$/.test(test.slug)) throw new Error(`SEO uyumsuz test slugı: ${test.slug}`);
    slugs.add(test.slug);
  }
  if (test.classLevel === 1 && test.questions.filter((question) => question.image).length < 3) {
    throw new Error(`${test.slug} en az 3 görselli soru içermeli.`);
  }
  for (const [index, question] of test.questions.entries()) {
    for (const field of ["question", "choices", "correctAnswer", "explanation"]) {
      if (!(field in question)) throw new Error(`${test.slug} ${index + 1}. soruda ${field} eksik.`);
    }
    if (!Array.isArray(question.choices) || question.choices.length < 2) throw new Error("Şık yapısı geçersiz.");
    if (test.classLevel === 1 && question.choices.length !== 4) throw new Error(`${test.slug} ${index + 1}. soruda 4 şık olmalı.`);
    if (new Set(question.choices).size !== question.choices.length) throw new Error(`${test.slug} ${index + 1}. soruda tekrarlanan şık var.`);
    if (question.correctAnswer < 0 || question.correctAnswer >= question.choices.length) throw new Error("Doğru cevap indeksi geçersiz.");
    if (!question.explanation.trim()) throw new Error("Çözüm açıklaması boş bırakılamaz.");
    if (question.image && !fs.existsSync(question.image)) throw new Error(`Soru görseli bulunamadı: ${question.image}`);
    const normalizedQuestion = question.question.trim().toLocaleLowerCase("tr-TR");
    if (questionTexts.has(normalizedQuestion)) throw new Error(`Tekrarlanan soru metni: ${question.question}`);
    questionTexts.add(normalizedQuestion);
  }
}

function validateGroup(classLevel, subject, expectedTests, expectedTopics) {
  const group = tests.filter((test) => test.classLevel === classLevel && test.subject === subject);
  if (group.length !== expectedTests) throw new Error(`${classLevel}. sınıf ${subject} için ${expectedTests} test bulunmalı.`);
  if (new Set(group.map((test) => test.topic)).size !== expectedTopics) {
    throw new Error(`${classLevel}. sınıf ${subject} için ${expectedTopics} konu bulunmalı.`);
  }
}

validateGroup(1, "matematik", 21, 7);
validateGroup(1, "turkce", 24, 8);

console.log(`✓ ${tests.length} test ve ${tests.reduce((sum, test) => sum + test.questions.length, 0)} soru doğrulandı.`);
