import { getSheetsConfigurationIssues } from "./_lib/sheets.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Yalnızca GET isteği kabul edilir." });
  const { missing, invalid } = getSheetsConfigurationIssues();
  const secret = process.env.JWT_SECRET;
  if (!secret) missing.push("JWT_SECRET");
  else if (secret.length < 32) invalid.push("JWT_SECRET");
  return res.status(200).json({ success: true, configured: missing.length === 0 && invalid.length === 0, missing, invalid });
}
