(function(){
  const form=document.getElementById("registerForm"), status=document.getElementById("registerStatus"), button=document.getElementById("registerButton");
  if(!form)return; const startedAt=Date.now();
  function show(message,type){status.textContent=message;status.className="form-status "+type;}
  form.addEventListener("submit",async function(event){
    event.preventDefault(); status.className="form-status";
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data.studentName||!data.classLevel||!data.dailyGoal||!data.phone||!data.email||!data.consent)return show("Lütfen tüm zorunlu alanları doldurun.","error");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))return show("Lütfen geçerli bir e-posta adresi girin.","error");
    if(!/^0?5\d{9}$/.test(data.phone.replace(/\D/g,"")))return show("Lütfen geçerli bir iletişim numarası girin.","error");
    const goal=Number(data.dailyGoal);if(!Number.isInteger(goal)||goal<5||goal>200)return show("Günlük soru hedefi 5 ile 200 arasında olmalıdır.","error");
    button.disabled=true;button.textContent="Kaydediliyor…";
    try{const response=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,dailyGoal:goal,consent:true,startedAt})});const result=await response.json();if(!response.ok)throw new Error(result.message||"Kayıt sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");show(result.message,"success");form.reset();}
    catch(error){show(error.message||"Kayıt sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyin.","error");}
    finally{button.disabled=false;button.textContent="Kayıt Ol";}
  });
})();
