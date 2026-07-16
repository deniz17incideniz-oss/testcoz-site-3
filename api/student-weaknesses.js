import { getRowsFromSheet, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { requireSessionUser } from "./_lib/session-user.js";

const WEAKNESSES_SHEET = process.env.GOOGLE_SHEETS_WEAKNESSES_SHEET_NAME || "OgrenciEksikleri";
const RESULTS_SHEET = process.env.GOOGLE_SHEETS_RESULTS_SHEET_NAME || "TestSonuclari";

function summarize(rows, email) {
  const map = new Map();
  for (const row of rows.slice(1)) {
    if (String(row[1] || "").toLowerCase() !== email) continue;
    const key = [row[3], row[4], row[5], row[7]].join("|");
    const item = map.get(key) || { subject: row[3], topic: row[4], skill: row[5], subSkill: row[6], questionType: row[7], wrongCount: 0, blankCount: 0, weight: 0 };
    item.wrongCount += Number(row[8]) || 0;
    item.blankCount += Number(row[9]) || 0;
    item.weight += Number(row[10]) || 0;
    map.set(key, item);
  }
  return [...map.values()].sort((a, b) => b.weight - a.weight).slice(0, 8);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Yalnızca GET isteği kabul edilir." });
  const issues = getSheetsConfigurationIssues();
  if (!process.env.JWT_SECRET || issues.missing.length || issues.invalid.length) return res.status(503).json({ success: false, message: "Öneri hizmeti yapılandırması eksik veya geçersiz." });
  try {
    const user = await requireSessionUser(req, res);
    if (!user) return;
    const weaknessSheet = await getRowsFromSheet(WEAKNESSES_SHEET);
    const resultSheet = await getRowsFromSheet(RESULTS_SHEET);
    const weaknesses = summarize(weaknessSheet.rows, user.email);
    const recentTests = resultSheet.rows.slice(1).filter((row) => String(row[1] || "").toLowerCase() === user.email).slice(-5).reverse().map((row) => ({
      date: row[0], classLevel: row[3], subject: row[4], topic: row[5], difficulty: row[6], testSlug: row[7],
      correctCount: Number(row[8]) || 0, wrongCount: Number(row[9]) || 0, blankCount: Number(row[10]) || 0, percentage: Number(row[11]) || 0
    }));
    return res.status(200).json({ success: true, user, weaknesses, recentTests, hasEnoughData: weaknesses.length > 0 });
  } catch (error) {
    console.error("student-weaknesses api error:", error?.code || error?.name || "UNKNOWN");
    return res.status(error?.status || 500).json({ success: false, message: "Öneriler alınamadı." });
  }
}
