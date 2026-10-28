import crypto from 'node:crypto';
import { SheetsServiceError } from './sheets.js';
// K stores an account session version. Logout invalidates all devices.
export function sessionVersionMatches(data, row) {
  return typeof (data.sv ?? '') === 'string' && (data.sv ?? '') === String(row[10] || '');
}
export async function revokeAccountSessions(rows, row, ctx) {
  const heading = rows[0]?.[10];
  if (heading && heading !== 'Oturum Sürümü') throw new SheetsServiceError('SESSION_COLUMN_CONFLICT');
  if (!heading && rows.some(r => r[10])) throw new SheetsServiceError('SESSION_COLUMN_CONFLICT');
  const index = rows.indexOf(row);
  if (index < 1) throw new SheetsServiceError('SESSION_USER_NOT_FOUND');
  const sheet = `'${ctx.sheetName.replace(/'/g, "''")}'`;
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(ctx.spreadsheetId)}/values:batchUpdate`, {
    method: 'POST', headers: ctx.headers,
    body: JSON.stringify({valueInputOption: 'RAW', data: [
      {range: `${sheet}!K1`, values: [['Oturum Sürümü']]},
      {range: `${sheet}!K${index + 1}`, values: [[crypto.randomUUID()]]}
    ]})
  });
  if (!response.ok) throw new SheetsServiceError('SESSION_REVOKE_FAILED', 502);
}
