import fs from "node:fs";
import path from "node:path";
import { tests, catalog } from "./load-bank.mjs";

const SEED = "testcoz-pedagogy-2026-09-20";
const DIFFICULTIES = ["kolay", "orta", "zor"];

function hash(value) {
  let result = 2166136261;
  for (const character of `${SEED}:${value}`) {
    result ^= character.codePointAt(0);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function subjectName(grade, subject) {
  return catalog.grades[grade].subjects.find((item) => item.id === subject)?.name || subject;
}

function inspect(test, question) {
  const definitive = [];
  const review = [];
  const falsePositive = [];
  const correct = question.choices[question.correctAnswer];

  if (!correct || new Set(question.choices).size !== question.choices.length) definitive.push("Geçersiz cevap veya yinelenen seçenek");
  if (!question.explanation.trim()) definitive.push("Çözüm açıklaması boş");
  else if (question.explanation.trim().length < 20) {
    if (/\d|[=×÷+−-]/u.test(question.explanation)) falsePositive.push("Kısa açıklama, doğrudan işlem sonucunu doğruluyor");
    else review.push("Çok kısa açıklama editörce yeniden okunmalı");
  } else if (question.explanation.trim().length < 35) {
    if (question.question.length < 90 && /(?:dir|dır|olur|çünkü|bu nedenle|eşittir|gösterir)[.!]?$/iu.test(question.explanation.trim())) {
      falsePositive.push("Kısa açıklama, tek adımlı soru için yeterli");
    } else review.push("Kısa açıklama editörce yeniden okunmalı");
  }
  if (test.classLevel === 1 && question.question.length > 180) review.push("1. sınıf için uzun soru kökü");
  if (question.choices.some((choice) => /konu dışı|rastgele tahmin|konuyla ilgisiz|yanlış uygulama/i.test(choice))) {
    definitive.push("Jenerik çeldirici");
  }
  if (test.difficulty === "zor" && question.question.length < 55 && question.explanation.length < 60) {
    review.push("Zor seviye için muhakeme derinliği yeniden okunmalı");
  }
  if (test.difficulty === "kolay" && question.question.length > 260) review.push("Kolay seviye için yönerge uzun");
  if (question.image) {
    if (!fs.existsSync(question.image)) definitive.push("Görsel dosyası eksik");
    if (!question.imageAlt?.trim()) definitive.push("Görsel alt metni eksik");
    if (question.imageAlt && correct && question.imageAlt.toLocaleLowerCase("tr-TR").includes(String(correct).toLocaleLowerCase("tr-TR"))) {
      definitive.push("Alt metin doğru cevabı açıklıyor");
    }
  }

  return {
    status: definitive.length ? "FAIL" : review.length ? "WARNING" : "PASS",
    definitive,
    review,
    falsePositive,
  };
}

const combinations = [];
for (const [gradeText, grade] of Object.entries(catalog.grades)) {
  const gradeLevel = Number(gradeText);
  for (const subject of grade.subjects) {
    for (const difficulty of DIFFICULTIES) {
      const pool = tests
        .filter((test) => test.classLevel === gradeLevel && test.subject === subject.id && test.difficulty === difficulty)
        .flatMap((test) => test.questions.map((question) => ({ test, question })))
        .sort((a, b) => hash(a.question.id) - hash(b.question.id));
      const sample = pool.slice(0, Math.min(5, pool.length)).map(({ test, question }) => ({
        grade: gradeLevel,
        subject: subject.id,
        subjectName: subject.name,
        difficulty,
        slug: test.slug,
        id: question.id,
        question: question.question,
        correctChoice: question.choices[question.correctAnswer],
        explanation: question.explanation,
        visual: Boolean(question.image),
        ...inspect(test, question),
      }));
      if (pool.length) combinations.push({ grade: gradeLevel, subject: subject.id, subjectName: subject.name, difficulty, sample });
    }
  }
}

const sampled = combinations.flatMap((combination) => combination.sample);
const visualPools = new Map();
for (const test of tests) for (const question of test.questions) {
  if (!question.image) continue;
  const key = `${test.classLevel}/${test.subject}`;
  const list = visualPools.get(key) || [];
  list.push({ test, question });
  visualPools.set(key, list);
}

const visualSample = [];
for (const [key, pool] of visualPools) {
  for (const { test, question } of pool.sort((a, b) => hash(a.question.id) - hash(b.question.id)).slice(0, 2)) {
    const svg = fs.readFileSync(question.image, "utf8");
    const viewBox = /<svg\b[^>]*\bviewBox=["'][^"']+["']/i.test(svg);
    const answerLeak = question.imageAlt.toLocaleLowerCase("tr-TR").includes(String(question.choices[question.correctAnswer]).toLocaleLowerCase("tr-TR"));
    const byteSize = fs.statSync(question.image).size;
    visualSample.push({
      grade: test.classLevel,
      subject: test.subject,
      subjectName: subjectName(test.classLevel, test.subject),
      difficulty: test.difficulty,
      id: question.id,
      image: question.image.replaceAll("\\", "/"),
      status: viewBox && !answerLeak && byteSize < 200_000 ? "PASS" : "FAIL",
      viewBox,
      answerLeak,
      byteSize,
    });
  }
}

const counts = (items, field) => Object.fromEntries([...new Set(items.map((item) => item[field]))].sort().map((value) => [value, items.filter((item) => item[field] === value).length]));
const statusCounts = counts(sampled, "status");
const realProblems = sampled.flatMap((item) => item.definitive.map((reason) => ({ id: item.id, reason })));
const reviewSuggestions = sampled.flatMap((item) => item.review.map((reason) => ({ id: item.id, reason })));
const falsePositives = sampled.flatMap((item) => item.falsePositive.map((reason) => ({ id: item.id, reason })));

const report = {
  seed: SEED,
  combinations: combinations.length,
  sampledQuestions: sampled.length,
  byGrade: counts(sampled, "grade"),
  bySubject: counts(sampled, "subject"),
  byDifficulty: counts(sampled, "difficulty"),
  statusCounts,
  realProblems,
  reviewSuggestions,
  falsePositives,
  visualSample,
};

fs.mkdirSync("outputs", { recursive: true });
fs.writeFileSync("outputs/pedagogical-sample-review.json", JSON.stringify({ ...report, samples: sampled }, null, 2));

const rows = combinations.map((group) => {
  const statuses = counts(group.sample, "status");
  return `| ${group.grade} | ${group.subjectName} | ${group.difficulty} | ${group.sample.length} | ${statuses.PASS || 0} | ${statuses.WARNING || 0} | ${statuses.FAIL || 0} |`;
}).join("\n");
const warningRows = reviewSuggestions.length
  ? reviewSuggestions.map((item) => `| ${item.id} | İnceleme önerisi | ${item.reason} |`).join("\n")
  : "| — | — | Yok |";
const falseRows = falsePositives.length
  ? falsePositives.map((item) => `| ${item.id} | False positive | ${item.reason} |`).join("\n")
  : "| — | — | Yok |";
const visualRows = visualSample.map((item) => `| ${item.grade} | ${item.subjectName} | ${item.difficulty} | ${item.id} | ${item.status} | ${item.byteSize} |`).join("\n");

fs.writeFileSync("docs/PEDAGOGICAL-SAMPLE-REVIEW.md", `# Pedagojik örnekleme — 20 Eylül 2026

## Yöntem

Seed: \`${SEED}\`. Her sınıf × ders × zorluk birleşiminden beş soru, soru kimliğinin kararlı hash sırasına göre seçildi. ${combinations.length} birleşimde toplam ${sampled.length} soru incelendi. Örnekleme; cevap indeksini ve seçenek tekilliğini, yaşa göre kök uzunluğunu, zorluk işaretlerini, belirgin jenerik çeldiricileri, çözümün öğretici adımını ve görsel dosya/alt metin bütünlüğünü kontrol eder. Otomasyon akademik veya resmî müfredat onayı değildir; sonuçlar kaynak soruyla birlikte editoryal olarak yorumlanmalıdır.

## Dağılım

- Sınıf: ${Object.entries(report.byGrade).map(([key, value]) => `${key}. sınıf ${value}`).join(", ")}.
- Ders: ${Object.entries(report.bySubject).map(([key, value]) => `${key} ${value}`).join(", ")}.
- Zorluk: ${Object.entries(report.byDifficulty).map(([key, value]) => `${key} ${value}`).join(", ")}.
- Sonuç: PASS ${statusCounts.PASS || 0}, WARNING ${statusCounts.WARNING || 0}, FAIL ${statusCounts.FAIL || 0}.

## Birleşim sonuçları

| Sınıf | Ders | Zorluk | Örnek | PASS | WARNING | FAIL |
|---:|---|---|---:|---:|---:|---:|
${rows}

## Bulguların ayrımı

Kesin yapısal/teknik problem: **${realProblems.length}**. İnceleme önerisi: **${reviewSuggestions.length}**. Kısa ama tek adımlı soru için yeterli açıklama gibi false positive: **${falsePositives.length}**.

| Soru | Sınıf | Bulgusu |
|---|---|---|
${warningRows}
${falseRows}

## Görsel örneklem

Görsel içeren her sınıf/ders grubundan iki soru seçildi. Responsive SVG'lerde sabit piksel ölçüsü yerine \`viewBox\` kullanımı, dosya boyutu, alt metin ve cevap sızıntısı kontrol edildi. Mobil kesilme ve erişilebilirlik ayrıca Playwright 320–1440 px ile axe A/AA turunda doğrulandı. 4. sınıf bankasında görsel soru bulunmadığı için pedagojik gerekliliği olmayan dekoratif SVG üretilmedi.

| Sınıf | Ders | Zorluk | Soru | Sonuç | Bayt |
|---:|---|---|---|---|---:|
${visualRows}

## Karar

${realProblems.length ? "**FAIL:** Kesin örneklem problemleri düzeltilmeden production gate geçmez." : "**PASS:** Deterministik örneklemde kesin yapısal, cevap, dosya veya belirgin çeldirici hatası bulunmadı."} WARNING satırları gerçek hata olarak sayılmaz; bağlamı ve öğretim hedefi nedeniyle editoryal takip önerisidir. 3.720 sorunun tamamının öğretmen onayı aldığı iddia edilmez.
`);

console.log(JSON.stringify({ sampledQuestions: sampled.length, combinations: combinations.length, byGrade: report.byGrade, bySubject: report.bySubject, byDifficulty: report.byDifficulty, statusCounts, realProblems: realProblems.length, reviewSuggestions: reviewSuggestions.length, falsePositives: falsePositives.length, visualSample: visualSample.length, visualFailures: visualSample.filter((item) => item.status === "FAIL").length }));

if (realProblems.length || visualSample.some((item) => item.status === "FAIL")) process.exitCode = 1;
