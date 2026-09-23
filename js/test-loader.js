(function () {
  const params=new URLSearchParams(location.search),grade=params.get('sinif'),subject=params.get('ders');
  const allowed={1:['matematik','turkce','hayat-bilgisi'],2:['matematik','turkce','hayat-bilgisi','ingilizce'],3:['matematik','turkce','hayat-bilgisi','fen-bilimleri','ingilizce'],4:['matematik','turkce','hayat-bilgisi','fen-bilimleri','sosyal-bilgiler','ingilizce']};
  const files=allowed[grade]?.includes(subject)?(grade==='4'?['data/tests/4-tum-dersler.js',...(subject==='matematik'?['data/tests/4-matematik-zaman-olcme.js','data/tests/4-z-gemini-vetted.js']:[])]:['data/tests/'+grade+'-'+subject+'.js']):[];
  function load(src){return new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=src;script.onload=resolve;script.onerror=reject;document.body.appendChild(script);});}
  (async()=>{try{for(const file of files)await load(file);await load('js/test-runner.js');}catch{document.getElementById('testTitle').textContent='Test yüklenemedi';document.getElementById('testSubtitle').textContent='Bağlantını kontrol edip sayfayı yeniden açabilirsin.';}})();
})();
