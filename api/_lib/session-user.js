import { findUser, getRows } from "./sheets.js";
import { cookieValue, verifySession } from "./security.js";

export async function requireSessionUser(req, res) {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    res.status(503).json({ success: false, message: "Oturum hizmeti yapılandırması eksik veya geçersiz." });
    return null;
  }
  const data = verifySession(cookieValue(req, "testcoz_session"), secret);
  if (!data) {
    res.status(401).json({ success: false, message: "Bu işlem için giriş yapmalısınız." });
    return null;
  }
  const { rows } = await getRows();
  const row = findUser(rows, String(data.sub).toLowerCase());
  if (!row || String(row[9] || "").toLocaleLowerCase("tr-TR") !== "aktif") {
    res.status(401).json({ success: false, message: "Oturum bulunamadı." });
    return null;
  }
  return {
    email: String(data.sub).toLowerCase(),
    studentName: row[1] || "",
    classLevel: String(row[2] || "").replace(/\D/g, ""),
    dailyGoal: Number(row[3]) || 0
  };
}
