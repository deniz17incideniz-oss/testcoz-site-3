import crypto from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(crypto.scrypt);
const attempts = new Map();

export function clean(value, maxLength) { return String(value || "").replace(/[<>\u0000-\u001F]/g, "").trim().slice(0, maxLength); }
export function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value); }
export function validPhone(value) { return /^0?5\d{9}$/.test(String(value).replace(/\D/g, "")); }
export function bodyTooLarge(req) { return Number(req.headers["content-length"] || 0) > 20000 || JSON.stringify(req.body || {}).length > 20000; }
export function originAllowed(req) { const origin=req.headers.origin; return !origin || ["https://testcoz.pro","https://www.testcoz.pro"].includes(origin); }
export function rateLimited(req, limit=8, windowMs=15*60*1000) { const ip=String(req.headers["x-forwarded-for"]||req.socket?.remoteAddress||"unknown").split(",")[0].trim(); const now=Date.now(); const recent=(attempts.get(ip)||[]).filter(t=>now-t<windowMs); if(recent.length>=limit)return true; recent.push(now);attempts.set(ip,recent);return false; }
export async function hashPassword(password) { const salt=crypto.randomBytes(16).toString("hex"); const hash=await scrypt(password,salt,64,{N:16384,r:8,p:1,maxmem:64*1024*1024}); return `scrypt$${salt}$${Buffer.from(hash).toString("hex")}`; }
export async function verifyPassword(password, stored) { const [kind,salt,hex]=String(stored||"").split("$"); if(kind!=="scrypt"||!salt||!hex)return false; const expected=Buffer.from(hex,"hex"); const actual=Buffer.from(await scrypt(password,salt,expected.length,{N:16384,r:8,p:1,maxmem:64*1024*1024})); return expected.length===actual.length&&crypto.timingSafeEqual(expected,actual); }
function b64(value){return Buffer.from(typeof value==="string"?value:JSON.stringify(value)).toString("base64url");}
export function signSession(email,secret){const now=Math.floor(Date.now()/1000),header=b64({alg:"HS256",typ:"JWT"}),payload=b64({sub:email,iat:now,exp:now+7*24*60*60});const unsigned=`${header}.${payload}`,sig=crypto.createHmac("sha256",secret).update(unsigned).digest("base64url");return `${unsigned}.${sig}`;}
export function verifySession(token,secret){try{const [header,payload,sig]=String(token||"").split(".");if(!header||!payload||!sig)return null;const expected=crypto.createHmac("sha256",secret).update(`${header}.${payload}`).digest();const actual=Buffer.from(sig,"base64url");if(expected.length!==actual.length||!crypto.timingSafeEqual(expected,actual))return null;const data=JSON.parse(Buffer.from(payload,"base64url").toString("utf8"));if(!data.sub||data.exp<Math.floor(Date.now()/1000))return null;return data;}catch{return null;}}
export function cookieValue(req,name){const cookies=String(req.headers.cookie||"").split(";");for(const part of cookies){const [key,...rest]=part.trim().split("=");if(key===name)return decodeURIComponent(rest.join("="));}return "";}
export function sessionCookie(token){return `testcoz_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`;}
export function clearSessionCookie(){return "testcoz_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";}
