(function () {
  const visualSlots = new Set([1, 2, 5, 8, 10]);
  const questionTypes = ["problem", "gorsel-okuma", "tablo-yorumlama", "metin-anlama", "islem", "karsilastirma", "siralama", "cikarim", "eslestirme", "oruntu"];

  function ascii(value) {
    return String(value || "")
      .toLocaleLowerCase("tr-TR")
      .replace(/['’]/g, "")
      .replace(/ı/g, "i").replace(/ğ/g, "g").replace(/ş/g, "s")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c").replace(/ö/g, "o").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function inferQuestionType(question, subject) {
    const text = String(question.question || "").toLocaleLowerCase("tr-TR");
    if (question.visual || question.image || text.includes("görsel")) return "gorsel-okuma";
    if (text.includes("tablo") || text.includes("grafik")) return "tablo-yorumlama";
    if (text.includes("örüntü") || text.includes("sıradaki")) return "oruntu";
    if (text.includes("sıra") || text.includes("önce") || text.includes("sonra")) return "siralama";
    if (text.includes("hangisi doğrudur") || text.includes("sonuca")) return "cikarim";
    if (subject === "turkce" || subject === "ingilizce") return "metin-anlama";
    if (/[+\-×÷=]/.test(text) || text.includes("kaç")) return "problem";
    return "karsilastirma";
  }

  function cognitiveLevel(type, difficulty) {
    if (difficulty === "zor") return "problem-cozme";
    if (["cikarim", "tablo-yorumlama", "gorsel-okuma"].includes(type)) return "yorumlama";
    if (difficulty === "orta") return "uygulama";
    return "anlama";
  }

  function ensureVisual(test, question, index) {
    if (question.visual || question.image || !visualSlots.has(index + 1)) return;
    question.visual = {
      type: "cards",
      title: `${test.topicName || test.topic} çalışma kartı`,
      data: {
        konu: test.topicName || test.topic,
        seviye: test.difficulty,
        beceri: question.skill || "dikkatli okuma"
      }
    };
  }

  function normalizeQuestion(test, question, index) {
    const slug = test.slug || `${test.classLevel}-sinif-${test.subject}-${test.topic}-${test.difficulty}-test-${test.testNumber || 1}`;
    ensureVisual(test, question, index);
    if (!question.id || Number.isInteger(question.id)) question.id = `${slug}-soru-${index + 1}`;
    if (!question.options) question.options = Array.isArray(question.choices) ? question.choices.slice() : [];
    if (!question.difficulty) question.difficulty = test.difficulty;
    if (!question.skill) question.skill = test.topicName || test.topic || "Konu becerisi";
    if (!question.subSkill) question.subSkill = question.visual || question.image ? "Görsel destekli yorumlama" : "Dikkatli okuma ve seçenek karşılaştırma";
    if (!question.questionType) question.questionType = inferQuestionType(question, test.subject);
    if (!question.cognitiveLevel) question.cognitiveLevel = cognitiveLevel(question.questionType, test.difficulty);
    if (!question.estimatedTimeSeconds) question.estimatedTimeSeconds = test.difficulty === "zor" ? 110 : test.difficulty === "orta" ? 85 : 65;
    if (question.visual && !question.image) question.image = `images/tests/${slug}-soru-${index + 1}.svg`;
    if (question.image && !question.imageAlt) question.imageAlt = question.visual?.title || `${test.topicName || test.topic} soru görseli`;
    question.hasVisual = Boolean(question.image || question.visual);
    if (!Array.isArray(question.tags) || !question.tags.length) {
      question.tags = [ascii(test.subject), ascii(test.topic), ascii(question.skill), question.questionType, question.cognitiveLevel].filter(Boolean);
    }
    return question;
  }

  function normalizeTest(test) {
    if (!test.slug) test.slug = `${test.classLevel}-sinif-${test.subject}-${test.topic}-${test.difficulty}-test-${test.testNumber || 1}`;
    if (!test.testNumber) test.testNumber = 1;
    if (!test.pageUrl) test.pageUrl = `tests/${test.slug}.html`;
    test.questions = (test.questions || []).map((question, index) => normalizeQuestion(test, question, index));
    return test;
  }

  function normalizeAllTests(tests) {
    return (tests || []).map(normalizeTest);
  }

  window.TestCozTestNormalizer = { normalizeAllTests, normalizeTest };
})();
