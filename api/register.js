import { appendRows, findUser, getRows } from "./_lib/sheets.js";
import { bodyTooLarge, clean, hashPassword, originAllowed, rateLimited, validEmail, validPhone } from "./_lib/security.js";

function reply(res,status,message){res.status(status).json({success:status>=200&&status<300,message});}
export default async function handler(req,res){
  res.setHeader("Cache-Control","no-store");res.setHeader("X-Content-Type-Options","nosniff");
  if(req.method!=="POST")return reply(res,405,"Yalnızca POST isteği kabul edilir.");
  if(!originAllowed(req))return reply(res,403,"İsteğe izin verilmedi.");
  if(bodyTooLarge(req))return reply(res,413,"Gönderilen veri çok büyük.");
  if(rateLimited(req))return reply(res,429,"Çok fazla deneme yapıldı. Lütfen daha sonra tekrar deneyin.");
  const body=req.body||{};if(clean(body.website,100))return reply(res,400,"Form doğrulanamadı.");
  const startedAt=Number(body.startedAt);if(!Number.isFinite(startedAt)||Date.now()-startedAt<2000||Date.now()-startedAt>3600000)return reply(res,400,"Form doğrulanamadı.");
  const studentName=clean(body.studentName,80),classLevel=clean(body.classLevel,1),dailyGoal=Number(body.dailyGoal),phone=clean(body.phone,24),email=clean(body.email,120).toLowerCase(),password=String(body.password||"");
  if(!studentName||!["1","2","3","4"].includes(classLevel)||!Number.isInteger(dailyGoal)||dailyGoal<5||dailyGoal>200||!phone||!email||password.length<8||password.length>128||body.consent!==true)return reply(res,400,"Lütfen tüm zorunlu alanları doğru biçimde doldurun.");
  if(!validEmail(email))return reply(res,400,"Lütfen geçerli bir e-posta adresi girin.");
  if(!validPhone(phone))return reply(res,400,"Lütfen geçerli bir iletişim numarası girin.");
  try{const {rows,ctx}=await getRows();if(findUser(rows,email))return reply(res,409,"Bu e-posta ile daha önce kayıt oluşturulmuş.");const passwordHash=await hashPassword(password),row=[new Date().toISOString(),studentName,`${classLevel}. Sınıf`,dailyGoal,phone,email,passwordHash,"Kabul edildi","Web","Aktif"],headers=["Kayıt Tarihi","Öğrenci Adı","Sınıf","Günlük Soru Hedefi","İletişim Numarası","E-posta","Şifre Hash","KVKK Onayı","Kayıt Kaynağı","Kullanıcı Durumu"];await appendRows(ctx,rows.length?[row]:[headers,row]);return reply(res,201,"Kayıt başarıyla alındı. Artık giriş yapabilirsiniz.");}
  catch{return reply(res,500,"Kayıt sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");}
}
