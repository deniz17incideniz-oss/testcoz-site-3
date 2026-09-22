import { diagnoseSheetsRead, getPrivateKeyDiagnostics, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { rateLimited } from "./_lib/security.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Yalnızca GET isteği kabul edilir." });
  if (req.query?.sheets === "read") {
    if (process.env.VERCEL_ENV !== "preview") return res.status(404).json({ success: false });
    if (rateLimited(req, 5)) return res.status(429).json({ success: false });
    return res.status(200).json(await diagnoseSheetsRead());
  }
  const { missing, invalid } = getSheetsConfigurationIssues();
  const secret = process.env.JWT_SECRET;
  if (!secret) missing.push("JWT_SECRET");
  else if (secret.length < 32) invalid.push("JWT_SECRET");
  return res.status(200).json({
    success: true,
    configured: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    privateKeyFormat: getPrivateKeyDiagnostics(),
    sheets: {
      register: process.env.GOOGLE_SHEETS_REGISTER_SHEET_NAME || "Kayitlar",
      results: process.env.GOOGLE_SHEETS_RESULTS_SHEET_NAME || "TestSonuclari",
      weaknesses: process.env.GOOGLE_SHEETS_WEAKNESSES_SHEET_NAME || "OgrenciEksikleri",
      personalTests: process.env.GOOGLE_SHEETS_PERSONAL_TESTS_SHEET_NAME || "KisiselTestler"
    }
  });
}
