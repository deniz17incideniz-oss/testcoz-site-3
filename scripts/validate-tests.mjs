import fs from "node:fs";
import vm from "node:vm";

const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync("data/tests/4-matematik-zaman-olcme.js", "utf8"), context);

const tests = context.window.TESTCOZ_TESTS || [];
const required = ["classLevel", "subject", "topic", "difficulty", "testNumber", "questions", "pageUrl"];
const difficulties = new Set(["kolay", "orta", "zor"]);

if (tests.length !== 3) throw new Error("Üç örnek test bulunmalı.");
for (const test of tests) {
  for (const field of required) if (!(field in test)) throw new Error(`Eksik test alanı: ${field}`);
  if (!difficulties.has(test.difficulty)) throw new Error(`Geçersiz zorluk: ${test.difficulty}`);
  if (!fs.existsSync(test.pageUrl)) throw new Error(`Test sayfası bulunamadı: ${test.pageUrl}`);
  if (test.questions.length !== 10) throw new Error(`${test.difficulty} testi 10 soru içermiyor.`);
  for (const [index, question] of test.questions.entries()) {
    for (const field of ["question", "choices", "correctAnswer", "explanation"]) {
      if (!(field in question)) throw new Error(`${test.difficulty} ${index + 1}. soruda ${field} eksik.`);
    }
    if (!Array.isArray(question.choices) || question.choices.length < 2) throw new Error("Şık yapısı geçersiz.");
    if (question.correctAnswer < 0 || question.correctAnswer >= question.choices.length) throw new Error("Doğru cevap indeksi geçersiz.");
    if (!question.explanation.trim()) throw new Error("Çözüm açıklaması boş bırakılamaz.");
  }
}

console.log("✓ 3 test ve 30 soru doğrulandı.");
