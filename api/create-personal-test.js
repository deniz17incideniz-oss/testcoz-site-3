import crypto from "node:crypto";
import { appendRows, getRowsFromSheet, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { originAllowed, rateLimited } from "./_lib/security.js";
import { requireSessionUser } from "./_lib/session-user.js";
import { loadTests, pickPersonalQuestions, publicQuestion } from "./_lib/test-data.js";

const WEAKNESSES_SHEET = process.env.GOOGLE_SHEETS_WEAKNESSES_SHEET_NAME || "OgrenciEksikleri";
const PERSONAL_SHEET = process.env.GOOGLE_SHEETS_PERSONAL_TESTS_SHEET_NAME || "KisiselTestler";
const HEADERS = ["Oluşturulma Tarihi", "Kullanıcı E-posta", "Kişiye Özel Test ID", "Sınıf", "Ders", "Hedef Konular", "Hedef Skill'ler", "Seçilen Soru ID'leri", "Durum"];

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Yalnızca POST isteği kabul edilir." });
  if (!originAllowed(req)) return res.status(403).json({ success: false, message: "İsteğe izin verilmedi." });
  if (rateLimited(req, 12, 15 * 60 * 1000)) return res.status(429).json({ success: false, message: "Çok fazla işlem yapıldı. Lütfen daha sonra tekrar deneyin." });
  const issues = getSheetsConfigurationIssues();
  if (!process.env.JWT_SECRET || issues.missing.length || issues.invalid.length) return res.status(503).json({ success: false, message: "Kişiye özel test hizmeti yapılandırması eksik veya geçersiz." });
  try {
    const user = await requireSessionUser(req, res);
    if (!user) return;
    const weaknessSheet = await getRowsFromSheet(WEAKNESSES_SHEET);
    const userWeaknessRows = weaknessSheet.rows.slice(1).filter((row) => String(row[1] || "").toLowerCase() === user.email);
    if (!userWeaknessRows.length) return res.status(409).json({ success: false, message: "Henüz kişiye özel test oluşturmak için yeterli çözüm geçmişi yok. Önce birkaç konu testi çözerek eksiklerini belirleyebilirsin." });
    const selected = pickPersonalQuestions(loadTests().tests, userWeaknessRows, user.classLevel);
    if (selected.length < 10) return res.status(409).json({ success: false, message: "Kişiye özel test için yeterli soru bulunamadı." });
    const id = `kisisel-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
    const topics = [...new Set(selected.map((item) => item.test.topic))].join(", ");
    const skills = [...new Set(selected.map((item) => item.question.skill))].join(", ");
    const questionIds = selected.map((item) => item.question.id);
    const sheet = await getRowsFromSheet(PERSONAL_SHEET);
    await appendRows(sheet.ctx, sheet.rows.length ? [[new Date().toISOString(), user.email, id, `${user.classLevel}. Sınıf`, "karma", topics, skills, questionIds.join(","), "Aktif"]] : [HEADERS, [new Date().toISOString(), user.email, id, `${user.classLevel}. Sınıf`, "karma", topics, skills, questionIds.join(","), "Aktif"]]);
    return res.status(201).json({ success: true, message: "Kişiye özel test hazırlandı.", testId: id, redirectUrl: `kisisel-test.html?id=${encodeURIComponent(id)}`, questions: selected.map((item) => publicQuestion(item.question)) });
  } catch (error) {
    console.error("create-personal-test api error:", error?.code || error?.name || "UNKNOWN");
    return res.status(error?.status || 500).json({ success: false, message: "Kişiye özel test oluşturulamadı." });
  }
}
