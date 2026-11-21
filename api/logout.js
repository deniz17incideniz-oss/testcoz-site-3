import {clearSessionCookie, cookieValue, originAllowed, verifySession} from './_lib/security.js';
import {findUser, getRows} from './_lib/sheets.js';
import {revokeAccountSessions, sessionVersionMatches} from './_lib/session-version.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({success:false,message:'Yalnızca POST isteği kabul edilir.'});
  if (!originAllowed(req)) return res.status(403).json({success:false,message:'İsteğe izin verilmedi.'});
  const token = cookieValue(req, 'testcoz_session');
  const secret = process.env.JWT_SECRET;
  if (token && (!secret || secret.length < 32)) return res.status(503).json({success:false,message:'Oturum hizmeti şu anda kullanılamıyor.'});
  const data = token ? verifySession(token, secret) : null;
  try {
    if (data) {
      const {rows, ctx} = await getRows();
      const row = findUser(rows, data.sub.toLowerCase());
      // An old token must not revoke a fresh session.
      if (row && sessionVersionMatches(data, row)) await revokeAccountSessions(rows, row, ctx);
    }
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({success:true,message:'Tüm cihazlardaki oturumlar kapatıldı.'});
  } catch (error) {
    console.error('logout api error:', error?.code || error?.name || 'UNKNOWN');
    // Retain the cookie on failure to allow a durable-revocation retry.
    return res.status(503).json({success:false,message:'Çıkış tamamlanamadı. Lütfen tekrar deneyin.'});
  }
}
