import crypto from "node:crypto";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map();

function reply(res, status, message) {
  res.status(status).json({ ok: status >= 200 && status < 300, message });
}

function clean(value, maxLength) {
  return String(value || "").replace(/[<>\u0000-\u001F]/g, "").trim().slice(0, maxLength);
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

async function accessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({ iss: clientEmail, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const unsigned = `${header}.${claim}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), privateKey).toString("base64url");
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }) });
  if (!response.ok) throw new Error("Google authorization failed");
  return (await response.json()).access_token;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "POST") return reply(res, 405, "Yalnızca POST isteği kabul edilir.");

  const origin = req.headers.origin;
  if (origin && !["https://testcoz.pro", "https://www.testcoz.pro"].includes(origin)) return reply(res, 403, "İsteğe izin verilmedi.");
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const recent = (attempts.get(ip) || []).filter((time) => Date.now() - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return reply(res, 429, "Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.");
  recent.push(Date.now()); attempts.set(ip, recent);

  const body = req.body || {};
  if (clean(body.website, 100)) return reply(res, 400, "Form doğrulanamadı.");
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2000 || Date.now() - startedAt > 3600000) return reply(res, 400, "Form doğrulanamadı.");

  const studentName = clean(body.studentName, 80);
  const classLevel = clean(body.classLevel, 1);
  const dailyGoal = Number(body.dailyGoal);
  const phone = clean(body.phone, 24);
  const email = clean(body.email, 120).toLowerCase();
  const consent = body.consent === true;
  if (!studentName || !["1", "2", "3", "4"].includes(classLevel) || !Number.isInteger(dailyGoal) || dailyGoal < 5 || dailyGoal > 200 || !phone || !email || !consent) return reply(res, 400, "Lütfen tüm zorunlu alanları doldurun.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return reply(res, 400, "Lütfen geçerli bir e-posta adresi girin.");
  if (!/^0?5\d{9}$/.test(phone.replace(/\D/g, ""))) return reply(res, 400, "Lütfen geçerli bir iletişim numarası girin.");

  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_REGISTER_SHEET_NAME || "Kayitlar";
  if (!clientEmail || !privateKey || !spreadsheetId) return reply(res, 503, "Kayıt sistemi yapılandırılıyor. Lütfen daha sonra tekrar deneyin.");

  try {
    const token = await accessToken(clientEmail, privateKey);
    const range = `'${sheetName.replace(/'/g, "''")}'!A:G`;
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
    const list = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}?majorDimension=ROWS`, { headers });
    if (!list.ok) throw new Error("Sheet read failed");
    const rows = (await list.json()).values || [];
    if (rows.some((row, index) => index > 0 && String(row[5] || "").trim().toLowerCase() === email)) return reply(res, 409, "Bu e-posta ile kayıt mevcut.");
    const row = [new Date().toISOString(), studentName, `${classLevel}. Sınıf`, dailyGoal, phone, email, "Kabul edildi"];
    const values = rows.length ? [row] : [["Kayıt Tarihi", "Öğrenci Adı", "Sınıf", "Günlük Soru Hedefi", "İletişim Numarası", "E-posta", "KVKK/Onay Durumu"], row];
    const append = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, { method: "POST", headers, body: JSON.stringify({ values }) });
    if (!append.ok) throw new Error("Sheet append failed");
    return reply(res, 201, "Kayıt başarıyla alındı. Giriş yaparak öğrenci paneline devam edebilirsiniz.");
  } catch {
    return reply(res, 500, "Kayıt sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
  }
}
