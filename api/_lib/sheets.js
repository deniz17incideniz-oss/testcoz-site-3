import * as crypto from "node:crypto";

const REQUIRED_SHEETS_ENV = [
  "GOOGLE_SHEETS_CLIENT_EMAIL",
  "GOOGLE_SHEETS_PRIVATE_KEY",
  "GOOGLE_SHEETS_SPREADSHEET_ID",
  "GOOGLE_SHEETS_REGISTER_SHEET_NAME"
];

export class SheetsServiceError extends Error {
  constructor(code, status = 503) { super(code); this.name = "SheetsServiceError"; this.code = code; this.status = status; }
}

// Never retain Google's free-text message, request URL, or credential metadata.
export async function classifySheetsError(response) {
  const body = await response.json().catch(() => ({}));
  const error = body.error || {};
  const reasons = [...(error.errors || []), ...(error.details || [])].map(item => item.reason);
  const disabled = reasons.some(reason => ["SERVICE_DISABLED", "accessNotConfigured"].includes(reason));
  const rangeInvalid = response.status === 400 && /unable to parse range|invalid range/i.test(String(error.message || ""));
  const code = disabled ? "SHEETS_API_DISABLED" : response.status === 403 ? "SHEET_PERMISSION_DENIED" : response.status === 404 ? "SPREADSHEET_NOT_FOUND" : rangeInvalid ? "SHEET_RANGE_INVALID" : "SHEET_READ_REJECTED";
  const allowedStatuses = ["PERMISSION_DENIED", "NOT_FOUND", "INVALID_ARGUMENT", "RESOURCE_EXHAUSTED", "UNAUTHENTICATED", "INTERNAL", "UNAVAILABLE"];
  const allowedReasons = ["SERVICE_DISABLED", "accessNotConfigured", "forbidden", "notFound", "badRequest", "ACCESS_TOKEN_SCOPE_INSUFFICIENT", "RATE_LIMIT_EXCEEDED"];
  const diagnostic = { code, httpStatus: response.status, googleStatus: allowedStatuses.includes(error.status) ? error.status : "UNKNOWN", reason: reasons.find(reason => allowedReasons.includes(reason)) || "UNSPECIFIED" };
  console.error("sheets diagnostic:", JSON.stringify(diagnostic));
  const failure = new SheetsServiceError(code, 502);
  failure.diagnostic = diagnostic;
  return failure;
}

export async function diagnoseSheetsRead() {
  const report = { oauth: "NOT_TESTED", metadata: "NOT_TESTED", registerRead: "NOT_TESTED" };
  try {
    const ctx = await context();
    report.oauth = "PASS";
    report.spreadsheetIdFormat = /^[A-Za-z0-9_-]+$/.test(ctx.spreadsheetId) ? "VALID" : "INVALID";
    const base = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}`;
    let metadata;
    try { metadata = await fetch(`${base}?fields=spreadsheetId,properties.title,sheets.properties.title`, { headers: ctx.headers }); }
    catch { throw new SheetsServiceError("SHEET_READ_NETWORK", 502); }
    if (!metadata.ok) throw await classifySheetsError(metadata);
    const data = await metadata.json();
    report.metadata = "PASS";
    const titles = new Set((data.sheets || []).map(sheet => sheet.properties?.title));
    const names = { register: ctx.sheetName, results: process.env.GOOGLE_SHEETS_RESULTS_SHEET_NAME || "TestSonuclari", weaknesses: process.env.GOOGLE_SHEETS_WEAKNESSES_SHEET_NAME || "OgrenciEksikleri", personalTests: process.env.GOOGLE_SHEETS_PERSONAL_TESTS_SHEET_NAME || "KisiselTestler" };
    report.tabs = Object.fromEntries(Object.entries(names).map(([key, name]) => [key, titles.has(name.trim()) ? "EXISTS" : "MISSING"]));
    let values;
    try { values = await fetch(`${base}/values/${encodeURIComponent(ctx.range)}?majorDimension=ROWS`, { headers: ctx.headers }); }
    catch { throw new SheetsServiceError("SHEET_READ_NETWORK", 502); }
    if (!values.ok) throw await classifySheetsError(values);
    const rows = (await values.json()).values || [];
    const expected = ["Kayıt Tarihi", "Öğrenci Adı", "Sınıf", "Günlük Soru Hedefi", "İletişim Numarası", "E-posta", "Şifre Hash", "KVKK Onayı", "Kayıt Kaynağı", "Kullanıcı Durumu"];
    report.registerRead = "PASS";
    report.registerHeaders = !rows.length ? "EMPTY" : expected.every((title, index) => rows[0][index] === title) ? "MATCH" : "MISMATCH";
  } catch (error) {
    report.error = error instanceof SheetsServiceError ? error.code : "DIAGNOSTIC_FAILED";
    if (error.diagnostic) report.evidence = error.diagnostic;
  }
  return report;
}

function normalizePrivateKey(rawValue) {
  let value = String(rawValue || "").trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
  if (value.startsWith("{") && value.includes("private_key")) {
    try {
      const parsed = JSON.parse(value);
      if (parsed?.private_key) value = String(parsed.private_key);
    } catch {
      const match = value.match(/"private_key"\s*:\s*"([^"]+)"/);
      if (match) value = match[1];
    }
  }
  const labeled = value.match(/private_key\s*[:=]\s*["']?([\s\S]*?)["']?\s*$/i);
  if (labeled && labeled[1].includes("BEGIN PRIVATE KEY")) value = labeled[1];
  value = value.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
  const begin = value.indexOf("-----BEGIN PRIVATE KEY-----");
  const endMarker = "-----END PRIVATE KEY-----";
  const end = value.indexOf(endMarker);
  if (begin >= 0 && end >= begin) value = value.slice(begin, end + endMarker.length);
  return value.trim();
}

export function getSheetsConfigurationIssues() {
  const missing = REQUIRED_SHEETS_ENV.filter((name) => !String(process.env[name] || "").trim());
  const invalid = [];
  const email = String(process.env.GOOGLE_SHEETS_CLIENT_EMAIL || "").trim();
  if (email && !/^[^\s@]+@[^\s@]+\.iam\.gserviceaccount\.com$/i.test(email)) invalid.push("GOOGLE_SHEETS_CLIENT_EMAIL");
  if (process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    try { crypto.createPrivateKey(normalizePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY)); }
    catch { invalid.push("GOOGLE_SHEETS_PRIVATE_KEY"); }
  }
  return { missing, invalid };
}

export function getPrivateKeyDiagnostics() {
  const raw = String(process.env.GOOGLE_SHEETS_PRIVATE_KEY || "");
  const normalized = normalizePrivateKey(raw);
  const trimmed = raw.trim();
  return {
    exists: Boolean(raw.trim()),
    rawLooksJson: trimmed.startsWith("{") && raw.includes("private_key"),
    rawHasExtraQuotes: (trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'")),
    rawHasPrivateKeyLabel: /private_key\s*[:=]/i.test(raw),
    rawHasBeginMarker: raw.includes("-----BEGIN PRIVATE KEY-----"),
    rawHasEndMarker: raw.includes("-----END PRIVATE KEY-----"),
    rawHasEscapedNewlines: raw.includes("\\n"),
    rawHasRealNewlines: raw.includes("\n") || raw.includes("\r"),
    normalizedHasBeginMarker: normalized.includes("-----BEGIN PRIVATE KEY-----"),
    normalizedHasEndMarker: normalized.includes("-----END PRIVATE KEY-----")
  };
}

export function sheetsConfigured() {
  const issues = getSheetsConfigurationIssues();
  return issues.missing.length === 0 && issues.invalid.length === 0;
}

function settings(sheetNameOverride) {
  const issues = getSheetsConfigurationIssues();
  if (issues.missing.length) throw new SheetsServiceError("MISSING_ENV");
  if (issues.invalid.includes("GOOGLE_SHEETS_PRIVATE_KEY")) throw new SheetsServiceError("INVALID_PRIVATE_KEY");
  if (issues.invalid.length) throw new SheetsServiceError("INVALID_ENV");
  return {
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL.trim(),
    privateKey: normalizePrivateKey(process.env.GOOGLE_SHEETS_PRIVATE_KEY),
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID.trim(),
    sheetName: String(sheetNameOverride || process.env.GOOGLE_SHEETS_REGISTER_SHEET_NAME).trim()
  };
}

function b64(value) { return Buffer.from(value).toString("base64url"); }

async function accessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64(JSON.stringify({ iss: clientEmail, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const unsigned = `${header}.${claim}`;
  let signature;
  try { signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), privateKey).toString("base64url"); }
  catch { throw new SheetsServiceError("INVALID_PRIVATE_KEY"); }
  let response;
  try {
    response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` })
    });
  } catch { throw new SheetsServiceError("GOOGLE_AUTH_NETWORK", 502); }
  if (!response.ok) throw new SheetsServiceError("GOOGLE_AUTH_REJECTED", 502);
  const data = await response.json().catch(() => ({}));
  if (!data.access_token) throw new SheetsServiceError("GOOGLE_AUTH_TOKEN_MISSING", 502);
  return data.access_token;
}

async function context(sheetNameOverride) {
  const cfg = settings(sheetNameOverride);
  const token = await accessToken(cfg.clientEmail, cfg.privateKey);
  const range = `'${cfg.sheetName.replace(/'/g, "''")}'!A:Z`;
  return { ...cfg, range, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };
}

export async function getRows() {
  const ctx = await context();
  let response;
  try { response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}/values/${encodeURIComponent(ctx.range)}?majorDimension=ROWS`, { headers: ctx.headers }); }
  catch { throw new SheetsServiceError("SHEET_READ_NETWORK", 502); }
  if (!response.ok) throw await classifySheetsError(response);
  const data = await response.json().catch(() => ({}));
  return { rows: data.values || [], ctx };
}

export async function getRowsFromSheet(sheetName) {
  const ctx = await context(sheetName);
  let response;
  try { response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}/values/${encodeURIComponent(ctx.range)}?majorDimension=ROWS`, { headers: ctx.headers }); }
  catch { throw new SheetsServiceError("SHEET_READ_NETWORK", 502); }
  if (!response.ok) throw await classifySheetsError(response);
  const data = await response.json().catch(() => ({}));
  return { rows: data.values || [], ctx };
}

export async function appendRows(ctx, values) {
  let response;
  try { response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}/values/${encodeURIComponent(ctx.range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, { method: "POST", headers: ctx.headers, body: JSON.stringify({ values }) }); }
  catch { throw new SheetsServiceError("SHEET_WRITE_NETWORK", 502); }
  if (!response.ok) throw new SheetsServiceError("SHEET_WRITE_REJECTED", 502);
}

export function findUser(rows, email) {
  return rows.find((row, index) => index > 0 && String(row[5] || "").trim().toLowerCase() === email) || null;
}
