import { appendRows, getRowsFromSheet, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { bodyTooLarge, originAllowed, rateLimited } from "./_lib/security.js";
import { requireSessionUser } from "./_lib/session-user.js";
import { computeResult, loadTests } from "./_lib/test-data.js";

const RESULTS_SHEET = process.env.GOOGLE_SHEETS_RESULTS_SHEET_NAME || "TestSonuclari";
const WEAKNESSES_SHEET = process.env.GOOGLE_SHEETS_WEAKNESSES_SHEET_NAME || "OgrenciEksikleri";
const RESULT_HEADERS = ["Tarih", "Kullanıcı E-posta", "Öğrenci Adı", "Sınıf", "Ders", "Konu", "Zorluk", "Test Slug", "Doğru Sayısı", "Yanlış Sayısı", "Boş Sayısı", "Başarı Yüzdesi", "Yanlış Soru ID'leri", "Boş Soru ID'leri", "Zorlanılan Skill'ler", "Zorlanılan QuestionType'lar"];
const WEAKNESS_HEADERS = ["Son Güncelleme", "Kullanıcı E-posta", "Sınıf", "Ders", "Konu", "Skill", "SubSkill", "QuestionType", "Hata Sayısı", "Boş Sayısı", "Ağırlık Puanı", "Son Çözülen Test"];

function reply(res, status, payload) {
  return res.status(status).json({ success: status >= 200 && status < 300, ...payload });
}

function configurationReady() {
  const issues = getSheetsConfigurationIssues();
  const missing = issues.missing.slice();
  const invalid = issues.invalid.slice();
  if (!process.env.JWT_SECRET) missing.push("JWT_SECRET");
  else if (process.env.JWT_SECRET.length < 32) invalid.push("JWT_SECRET");
  return { ready: missing.length === 0 && invalid.length === 0, missing, invalid };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return reply(res, 405, { message: "Yalnızca POST isteği kabul edilir." });
  if (!originAllowed(req)) return reply(res, 403, { message: "İsteğe izin verilmedi." });
  if (bodyTooLarge(req)) return reply(res, 413, { message: "Gönderilen veri çok büyük." });
  if (rateLimited(req, 30, 15 * 60 * 1000)) return reply(res, 429, { message: "Çok fazla işlem yapıldı. Lütfen daha sonra tekrar deneyin." });
  const cfg = configurationReady();
  if (!cfg.ready) {
    console.error("save-test-result configuration error:", [...cfg.missing, ...cfg.invalid].join(","));
    return reply(res, 503, { message: "Sonuç kaydı hizmeti yapılandırması eksik veya geçersiz." });
  }

  try {
    const user = await requireSessionUser(req, res);
    if (!user) return;
    const { testsBySlug, questions } = loadTests();
    const testSlug = String(req.body?.testSlug || "").trim();
    let test = testsBySlug.get(testSlug);
    if (!test && req.body?.personalTestId && Array.isArray(req.body?.questionIds)) {
      const picked = req.body.questionIds.map((id) => questions.get(String(id))).filter(Boolean);
      if (picked.length === 10) {
        test = {
          classLevel: Number(user.classLevel),
          subject: "karma",
          topic: "kisisel-calisma",
          difficulty: "orta",
          slug: String(req.body.personalTestId).slice(0, 120),
          questions: picked.map((item) => item.question)
        };
      }
    }
    if (!test) return reply(res, 400, { message: "Test bilgisi doğrulanamadı." });

    const result = computeResult(test, req.body?.answers);
    const now = new Date().toISOString();
    const resultRow = [
      now, user.email, user.studentName, `${user.classLevel}. Sınıf`, test.subject, test.topic, test.difficulty, test.slug,
      result.correctCount, result.wrongCount, result.blankCount, result.percentage,
      result.wrongQuestionIds.join(","), result.blankQuestionIds.join(","),
      [...new Set(result.wrongSkills.concat(result.blankSkills))].join(", "),
      [...new Set(result.wrongQuestionTypes.concat(result.blankQuestionTypes))].join(", ")
    ];
    const resultSheet = await getRowsFromSheet(RESULTS_SHEET);
    await appendRows(resultSheet.ctx, resultSheet.rows.length ? [resultRow] : [RESULT_HEADERS, resultRow]);

    const weaknessRows = [];
    test.questions.forEach((question) => {
      const isWrong = result.wrongQuestionIds.includes(question.id);
      const isBlank = result.blankQuestionIds.includes(question.id);
      if (!isWrong && !isBlank) return;
      weaknessRows.push([
        now, user.email, `${user.classLevel}. Sınıf`, test.subject, test.topic, question.skill, question.subSkill, question.questionType,
        isWrong ? 1 : 0, isBlank ? 1 : 0, (isWrong ? 2 : 0) + (isBlank ? 3 : 0), test.slug
      ]);
    });
    if (weaknessRows.length) {
      const weaknessSheet = await getRowsFromSheet(WEAKNESSES_SHEET);
      await appendRows(weaknessSheet.ctx, weaknessSheet.rows.length ? weaknessRows : [WEAKNESS_HEADERS, ...weaknessRows]);
    }

    return reply(res, 200, { message: "Sonuçlarınız kaydedildi. Eksiklerinize göre öneriler panelinizde güncellendi.", result });
  } catch (error) {
    console.error("save-test-result api error:", error?.code || error?.name || "UNKNOWN");
    return reply(res, error?.status || 500, { message: "Sonuç kaydedilemedi. Test çözme deneyiminiz etkilenmez." });
  }
}
