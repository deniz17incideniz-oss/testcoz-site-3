import { findUser, getRows, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { cookieValue, verifySession } from "./_lib/security.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Yalnızca GET isteği kabul edilir." });

  const secret = process.env.JWT_SECRET;
  const issues = getSheetsConfigurationIssues();
  if (!secret || secret.length < 32 || issues.missing.length || issues.invalid.length) {
    console.error("session api configuration error");
    return res.status(503).json({ success: false, message: "Oturum hizmeti yapılandırması eksik veya geçersiz." });
  }
  const data = verifySession(cookieValue(req, "testcoz_session"), secret);
  if (!data) return res.status(401).json({ success: false, message: "Oturum bulunamadı." });

  try {
    const { rows } = await getRows();
    const user = findUser(rows, String(data.sub).toLowerCase());
    if (!user || String(user[9] || "").toLocaleLowerCase("tr-TR") !== "aktif") return res.status(401).json({ success: false, message: "Oturum bulunamadı." });
    return res.status(200).json({ success: true, user: { studentName: user[1], classLevel: String(user[2] || "").replace(/\D/g, ""), dailyGoal: Number(user[3]) || 0 } });
  } catch (error) {
    console.error("session api error:", error?.code || error?.name || "UNKNOWN");
    return res.status(error?.status || 500).json({ success: false, message: "Oturum bilgileri alınamadı." });
  }
}
