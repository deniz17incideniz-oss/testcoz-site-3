import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

let cache;

export function loadTests() {
  if (cache) return cache;
  const root = process.cwd();
  const context = { window: {}, URLSearchParams };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "js/utils.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "data/catalog.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(root, "data/test-normalizer.js"), "utf8"), context);
  for (const file of fs.readdirSync(path.join(root, "data/tests")).filter((name) => name.endsWith(".js")).sort()) {
    vm.runInContext(fs.readFileSync(path.join(root, "data/tests", file), "utf8"), context);
  }
  const tests = context.window.TestCozTestNormalizer.normalizeAllTests(context.window.TESTCOZ_TESTS || []);
  const questions = new Map();
  const testsBySlug = new Map();
  for (const test of tests) {
    testsBySlug.set(test.slug, test);
    for (const question of test.questions) questions.set(question.id, { test, question });
  }
  cache = { tests, testsBySlug, questions };
  return cache;
}

export function publicQuestion(question) {
  return {
    id: question.id,
    question: question.question,
    choices: question.choices,
    options: question.options || question.choices,
    image: question.image || null,
    imageAlt: question.imageAlt || "",
    difficulty: question.difficulty,
    skill: question.skill,
    subSkill: question.subSkill,
    questionType: question.questionType,
    cognitiveLevel: question.cognitiveLevel,
    estimatedTimeSeconds: question.estimatedTimeSeconds,
    hasVisual: question.hasVisual,
    tags: question.tags
  };
}

export function computeResult(test, submittedAnswers = []) {
  const answers = Array.isArray(submittedAnswers) ? submittedAnswers : [];
  const wrongQuestionIds = [];
  const blankQuestionIds = [];
  const wrongSkills = [];
  const blankSkills = [];
  const wrongQuestionTypes = [];
  const blankQuestionTypes = [];
  let correctCount = 0;

  test.questions.forEach((question, index) => {
    const answer = answers[index];
    if (answer === null || answer === undefined || answer === "") {
      blankQuestionIds.push(question.id);
      blankSkills.push(question.skill);
      blankQuestionTypes.push(question.questionType);
      return;
    }
    if (Number(answer) === Number(question.correctAnswer)) correctCount += 1;
    else {
      wrongQuestionIds.push(question.id);
      wrongSkills.push(question.skill);
      wrongQuestionTypes.push(question.questionType);
    }
  });

  return {
    correctCount,
    wrongCount: wrongQuestionIds.length,
    blankCount: blankQuestionIds.length,
    percentage: Math.round((correctCount / test.questions.length) * 100),
    wrongQuestionIds,
    blankQuestionIds,
    wrongSkills: [...new Set(wrongSkills)],
    blankSkills: [...new Set(blankSkills)],
    wrongQuestionTypes: [...new Set(wrongQuestionTypes)],
    blankQuestionTypes: [...new Set(blankQuestionTypes)]
  };
}

export function pickPersonalQuestions(tests, weaknessRows, classLevel) {
  const weaknessText = weaknessRows.map((row) => row.join(" ").toLocaleLowerCase("tr-TR")).join(" ");
  const preferred = tests
    .filter((test) => !classLevel || String(test.classLevel) === String(classLevel))
    .flatMap((test) => test.questions.map((question) => ({ test, question })))
    .map((item) => {
      const haystack = `${item.test.subject} ${item.test.topic} ${item.question.skill} ${item.question.subSkill} ${item.question.questionType} ${item.question.tags.join(" ")}`.toLocaleLowerCase("tr-TR");
      const score = haystack.split(/\s+/).reduce((sum, part) => sum + (part.length > 3 && weaknessText.includes(part) ? 1 : 0), 0)
        + (item.question.hasVisual ? 0.25 : 0)
        + (item.question.difficulty === "orta" ? 0.2 : item.question.difficulty === "zor" ? 0.1 : 0);
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const used = new Set();
  for (const item of preferred) {
    if (selected.length >= 10) break;
    if (used.has(item.question.id)) continue;
    selected.push(item);
    used.add(item.question.id);
  }
  return selected;
}
