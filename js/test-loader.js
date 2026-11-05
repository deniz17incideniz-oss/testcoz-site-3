(function () {
  const params=new URLSearchParams(location.search),grade=params.get('sinif'),subject=params.get('ders');
  const allowed={1:['matematik','turkce','hayat-bilgisi','ingilizce'],2:['matematik','turkce','hayat-bilgisi','ingilizce'],3:['matematik','turkce','hayat-bilgisi','fen-bilimleri','ingilizce'],4:['matematik','turkce','hayat-bilgisi','fen-bilimleri','sosyal-bilgiler','ingilizce']};
  const files=allowed[grade]?.includes(subject)?(grade==='4'?['data/tests/4-tum-dersler.js',...(subject==='matematik'?['data/tests/4-matematik-zaman-olcme.js','data/tests/4-z-gemini-vetted.js']:[])]:['data/tests/'+grade+'-'+subject+'.js']):[];
  if(allowed[grade]?.includes(subject)) files.push('data/runtime/zor-test2-'+grade+'-'+subject+'.js');
  const test1Repairs={"1":["hayat-bilgisi"],"2":["hayat-bilgisi","ingilizce"],"3":["ingilizce","fen-bilimleri","hayat-bilgisi"],"4":["matematik"]};
  if((params.get('test')||'1')==='1' && test1Repairs[grade]?.includes(subject)) files.push('data/runtime/editorial-'+grade+'-'+subject+'.js');
  if(files.length) files.unshift('data/runtime/image-dimensions.js');
  function load(src){return new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src=src;
    const timer=setTimeout(()=>{script.onload=null;script.onerror=null;script.remove();reject(new Error('Script loading timed out'));},15000);
    script.onload=()=>{clearTimeout(timer);resolve();};
    script.onerror=()=>{clearTimeout(timer);script.remove();reject(new Error('Script loading failed'));};
    document.body.appendChild(script);
  });}
  (async()=>{try{for(const file of files)await load(file);await load('js/test-runner.js');}catch{
    document.getElementById('testTitle').textContent='Test yüklenemedi';
    const subtitle=document.getElementById('testSubtitle');subtitle.setAttribute('role','alert');
    subtitle.textContent='Bağlantını kontrol edip yeniden deneyebilirsin. ';
    const retry=document.createElement('button');retry.type='button';retry.className='btn btn-outline';retry.textContent='Yeniden Dene';
    retry.addEventListener('click',()=>location.reload());subtitle.appendChild(retry);
  }})();
})();
