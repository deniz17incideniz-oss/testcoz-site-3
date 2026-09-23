import crypto from "node:crypto";
import register from "../api/register.js";
import login from "../api/login.js";
import session from "../api/session.js";
import logout from "../api/logout.js";
import authStatus from "../api/auth-status.js";
import { originAllowed } from "../api/_lib/security.js";
import { classifySheetsError } from "../api/_lib/sheets.js";

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

const permissionFailure = await classifySheetsError(new Response(JSON.stringify({ error: { status: "PERMISSION_DENIED", message: "Sensitive upstream detail", errors: [{ reason: "forbidden" }] } }), { status: 403 }));
assert(permissionFailure.code === "SHEET_PERMISSION_DENIED" && permissionFailure.diagnostic.googleStatus === "PERMISSION_DENIED" && !JSON.stringify(permissionFailure.diagnostic).includes("Sensitive"), "Sheets permission hatası güvenli sınıflandırılmadı.");
const rangeFailure = await classifySheetsError(new Response(JSON.stringify({ error: { status: "INVALID_ARGUMENT", message: "Unable to parse range" } }), { status: 400 }));
assert(rangeFailure.code === "SHEET_RANGE_INVALID", "Sheets range hatası sınıflandırılmadı.");

const configuredStatus = await call(authStatus, { method: "GET" });
assert(configuredStatus.status === 200 && configuredStatus.data.configured === true, "Auth yapılandırması geçerli görünmüyor.");

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
assert(signedOut.status === 200 && /^testcoz_session=; Path=\/; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT$/.test(String(signedOut.headers["Set-Cookie"])), "Çıkış çerezi temizlenmedi.");
const sessionAfterLogout = await call(session, { method: "GET" });
assert(sessionAfterLogout.status === 401, "Çıkış sonrası tarayıcı oturumu devam ediyor.");

const validPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
process.env.GOOGLE_SHEETS_PRIVATE_KEY = "not-a-private-key";
const invalidKeyStatus = await call(authStatus, { method: "GET" });
assert(invalidKeyStatus.data.configured === false && invalidKeyStatus.data.invalid.includes("GOOGLE_SHEETS_PRIVATE_KEY"), "Bozuk private key algılanmadı.");
const unavailableLogin = await call(login, { body: { email: "test@example.com", password: "Guvenli123" } });
assert(unavailableLogin.status === 503, "Bozuk yapılandırma 503 döndürmedi.");
process.env.GOOGLE_SHEETS_PRIVATE_KEY = validPrivateKey;

const validJwtSecret = process.env.JWT_SECRET;
delete process.env.JWT_SECRET;
const missingJwtStatus = await call(authStatus, { method: "GET" });
assert(missingJwtStatus.data.configured === false && missingJwtStatus.data.missing.includes("JWT_SECRET"), "Eksik JWT_SECRET algılanmadı.");
process.env.JWT_SECRET = validJwtSecret;

console.log("✓ Kayıt, yapılandırma, şifre hashleme, giriş, oturum ve çıkış doğrulandı.");

const optionalPhone = await call(register, { body: { studentName: "Takma ad", classLevel: "1", dailyGoal: 10, email: "guardian@example.com", password: "Guvenli123", consent: true, startedAt: Date.now()-3000 } });
assert(optionalPhone.status === 201 && rows.at(-1).length === 10 && rows.at(-1)[4] === "", "Telefonsuz kayıt ve sütun uyumu başarısız.");
const malformed = await call(session, { method: "GET", cookie: "testcoz_session=%invalid" });
assert(malformed.status === 401, "Bozuk çerez güvenli biçimde reddedilmedi.");
const foreignOrigin = response();
await login({method:"POST",headers:{origin:"https://attacker.example"},body:{}}, foreignOrigin.res);
assert(foreignOrigin.output.status === 403, "Yabancı origin reddedilmedi.");
process.env.ALLOWED_ORIGINS = "https://preview.testcoz.example,http://localhost:4173,https://bad path.example";
assert(originAllowed({ headers: { origin: "https://testcoz.pro" } }), "Üretim origin'i reddedildi.");
assert(originAllowed({ headers: { origin: "https://preview.testcoz.example" } }), "Tanımlı preview origin'i reddedildi.");
assert(originAllowed({ headers: { origin: "http://localhost:4173" } }), "Tanımlı yerel origin reddedildi.");
assert(!originAllowed({ headers: { origin: "https://testcoz.pro.evil.example" } }), "Benzer görünümlü saldırgan origin kabul edildi.");
assert(!originAllowed({ headers: { origin: "http://preview.testcoz.example" } }), "Güvensiz uzak HTTP origin kabul edildi.");
delete process.env.ALLOWED_ORIGINS;
console.log("✓ İsteğe bağlı telefon, bozuk çerez ve origin kontrolleri doğrulandı.");
