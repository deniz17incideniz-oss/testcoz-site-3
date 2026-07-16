import { getRowsFromSheet, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { requireSessionUser } from "./_lib/session-user.js";
import { loadTests, publicQuestion } from "./_lib/test-data.js";

const PERSONAL_SHEET = process.env.GOOGLE_SHEETS_PERSONAL_TESTS_SHEET_NAME || "KisiselTestler";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Yalnızca GET isteği kabul edilir." });
  const issues = getSheetsConfigurationIssues();
  if (!process.env.JWT_SECRET || issues.missing.length || issues.invalid.length) return res.status(503).json({ success: false, message: "Kişiye özel test hizmeti yapılandırması eksik veya geçersiz." });
  try {
    const user = await requireSessionUser(req, res);
    if (!user) return;
    const id = String(req.query?.id || "").trim();
    if (!id) return res.status(400).json({ success: false, message: "Test ID eksik." });
    const sheet = await getRowsFromSheet(PERSONAL_SHEET);
    const row = sheet.rows.slice(1).find((item) => item[2] === id && String(item[1] || "").toLowerCase() === user.email && String(item[8] || "").toLowerCase() === "aktif");
    if (!row) return res.status(404).json({ success: false, message: "Kişiye özel test bulunamadı." });
    const questionIds = String(row[7] || "").split(",").map((value) => value.trim()).filter(Boolean);
    const { questions } = loadTests();
    const picked = questionIds.map((qid) => questions.get(qid)).filter(Boolean);
    return res.status(200).json({
      success: true,
      test: {
        id,
        slug: id,
        classLevel: user.classLevel,
        subject: "karma",
        topic: "kisisel-calisma",
        difficulty: "orta",
        title: "Eksiklerine Göre Kişiye Özel Test",
        questions: picked.map((item) => ({ ...publicQuestion(item.question), correctAnswer: item.question.correctAnswer, explanation: item.question.explanation }))
      }
    });
  } catch (error) {
    console.error("personal-test api error:", error?.code || error?.name || "UNKNOWN");
    return res.status(error?.status || 500).json({ success: false, message: "Kişiye özel test alınamadı." });
  }
}
