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
  if (!response.ok) throw new SheetsServiceError("SHEET_READ_REJECTED", 502);
  const data = await response.json().catch(() => ({}));
  return { rows: data.values || [], ctx };
}

export async function getRowsFromSheet(sheetName) {
  const ctx = await context(sheetName);
  let response;
  try { response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}/values/${encodeURIComponent(ctx.range)}?majorDimension=ROWS`, { headers: ctx.headers }); }
  catch { throw new SheetsServiceError("SHEET_READ_NETWORK", 502); }
  if (!response.ok) throw new SheetsServiceError("SHEET_READ_REJECTED", 502);
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
