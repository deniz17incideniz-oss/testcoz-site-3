import crypto from "node:crypto";
import register from "../api/register.js";
import login from "../api/login.js";
import session from "../api/session.js";
import logout from "../api/logout.js";

const { privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "test@example.iam.gserviceaccount.com";
process.env.GOOGLE_SHEETS_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" });
process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "test-sheet";
process.env.GOOGLE_SHEETS_REGISTER_SHEET_NAME = "Kayitlar";
process.env.JWT_SECRET = "test-secret-that-is-longer-than-thirty-two-characters";

let rows = [];
global.fetch = async (url, options = {}) => {
  if (String(url).includes("oauth2.googleapis.com")) return new Response(JSON.stringify({ access_token: "token" }), { status: 200 });
  if (options.method === "POST") {
    const values = JSON.parse(options.body).values;
    rows.push(...values);
    return new Response("{}", { status: 200 });
  }
  return new Response(JSON.stringify({ values: rows }), { status: 200 });
};

function response() {
  const output = { headers: {} };
  return { output, res: { setHeader(name, value) { output.headers[name] = value; }, status(code) { output.status = code; return this; }, json(data) { output.data = data; return this; } } };
}
async function call(handler, { method = "POST", body = {}, cookie = "", ip = crypto.randomUUID() } = {}) {
  const { output, res } = response();
  await handler({ method, body, headers: { origin: "https://testcoz.pro", "x-forwarded-for": ip, cookie }, socket: {} }, res);
  return output;
}
function assert(value, message) { if (!value) throw new Error(message); }

const registration = await call(register, { body: { studentName: "Test Öğrencisi", classLevel: "4", dailyGoal: 20, phone: "05551112233", email: "test@example.com", password: "Guvenli123", consent: true, website: "", startedAt: Date.now() - 3000 } });
assert(registration.status === 201, "Geçerli kayıt başarısız.");
assert(rows.length === 2 && rows[0].length === 10, "Google Sheets sütunları eksik.");
assert(rows[1][6].startsWith("scrypt$") && !rows[1][6].includes("Guvenli123"), "Şifre güvenli hashlenmedi.");

const duplicate = await call(register, { body: { studentName: "Test", classLevel: "4", dailyGoal: 20, phone: "05551112233", email: "TEST@example.com", password: "Guvenli123", consent: true, website: "", startedAt: Date.now() - 3000 } });
assert(duplicate.status === 409, "Tekrarlanan e-posta engellenmedi.");
const badLogin = await call(login, { body: { email: "test@example.com", password: "Yanlis123" } });
assert(badLogin.status === 401, "Yanlış şifre kabul edildi.");
const goodLogin = await call(login, { body: { email: "test@example.com", password: "Guvenli123" } });
assert(goodLogin.status === 200 && String(goodLogin.headers["Set-Cookie"]).includes("HttpOnly"), "Güvenli giriş çerezi oluşturulmadı.");
const cookie = String(goodLogin.headers["Set-Cookie"]).split(";")[0];
const activeSession = await call(session, { method: "GET", cookie });
assert(activeSession.status === 200 && activeSession.data.user.classLevel === "4", "Panel oturumu okunamadı.");
const signedOut = await call(logout, { cookie });
assert(signedOut.status === 200 && String(signedOut.headers["Set-Cookie"]).includes("Max-Age=0"), "Çıkış çerezi temizlenmedi.");
console.log("✓ Kayıt, şifre hashleme, giriş, oturum ve çıkış doğrulandı.");
