import { findUser, getRows, getSheetsConfigurationIssues } from "./_lib/sheets.js";
import { bodyTooLarge, clean, originAllowed, rateLimited, sessionCookie, signSession, validEmail, verifyPassword } from "./_lib/security.js";

function reply(res, status, message) {
  return res.status(status).json({ success: status >= 200 && status < 300, message });
}

function logConfigurationIssues(issues) {
  for (const name of issues.missing) console.error("Missing environment variable:", name);
  for (const name of issues.invalid) {
    if (name === "GOOGLE_SHEETS_PRIVATE_KEY") console.error("Invalid GOOGLE_SHEETS_PRIVATE_KEY format");
    else console.error("Invalid environment variable:", name);
  }
}

export default async function handler(req, res) {
  console.info("login api started");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") return reply(res, 405, "Yalnızca POST isteği kabul edilir.");
  if (!originAllowed(req)) return reply(res, 403, "İsteğe izin verilmedi.");
  if (bodyTooLarge(req)) return reply(res, 413, "Gönderilen veri çok büyük.");
  if (rateLimited(req, 10)) return reply(res, 429, "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.");

  const email = clean(req.body?.email, 120).toLowerCase();
  const password = String(req.body?.password || "");
  if (!email || !password || !validEmail(email) || password.length > 128) return reply(res, 400, "E-posta veya şifre hatalı.");

  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    console.error(secret ? "Invalid environment variable: JWT_SECRET" : "Missing environment variable: JWT_SECRET");
    return reply(res, 503, "Giriş hizmeti yapılandırması eksik veya geçersiz.");
  }
  console.info("jwt secret exists");
  const issues = getSheetsConfigurationIssues();
  if (issues.missing.length || issues.invalid.length) {
    logConfigurationIssues(issues);
    return reply(res, 503, "Giriş hizmeti yapılandırması eksik veya geçersiz.");
  }
  console.info("env check passed");
  console.info("sheets client created");

  try {
    console.info("sheet read started");
    const { rows } = await getRows();
    const user = findUser(rows, email);
    if (!user || String(user[9] || "").toLocaleLowerCase("tr-TR") !== "aktif") return reply(res, 401, "E-posta veya şifre hatalı.");
    console.info("password compare started");
    if (!(await verifyPassword(password, user[6]))) return reply(res, 401, "E-posta veya şifre hatalı.");
    res.setHeader("Set-Cookie", sessionCookie(signSession(email, secret)));
    return reply(res, 200, "Giriş başarılı. Öğrenci paneline yönlendiriliyorsunuz.");
  } catch (error) {
    console.error("login api error:", error?.code || error?.name || "UNKNOWN");
    return reply(res, error?.status || 500, "Giriş işlemi sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
  }
}
