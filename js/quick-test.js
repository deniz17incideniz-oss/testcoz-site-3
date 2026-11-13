(function () {
  const form=document.getElementById('quick-test');
  if(!form || !window.TESTCOZ_CATALOG || !window.TESTCOZ_QUICK_TESTS) return;
  const grade=form.elements.grade, subject=form.elements.subject, topic=form.elements.topic, test=form.elements.test;
  const add=(select,value,label)=>select.add(new Option(label,value));
  function reset(select,label){select.replaceChildren();add(select,'',label);select.disabled=true;}
  function subjects(){reset(subject,'Ders seç');reset(topic,'Konu seç');reset(test,'Test seç');const item=window.TESTCOZ_CATALOG.grades[grade.value];if(!item)return;item.subjects.forEach(s=>add(subject,s.id,s.name));subject.disabled=false;}
  function topics(){reset(topic,'Konu seç');reset(test,'Test seç');const item=window.TESTCOZ_CATALOG.grades[grade.value]?.subjects.find(s=>s.id===subject.value);if(!item)return;item.topics.filter(t=>window.TESTCOZ_QUICK_TESTS.some(x=>x.classLevel===Number(grade.value)&&x.subject===subject.value&&x.topic===t.id)).forEach(t=>add(topic,t.id,t.name));topic.disabled=false;}
  function tests(){reset(test,'Test seç');const entries=window.TESTCOZ_QUICK_TESTS.filter(x=>x.classLevel===Number(grade.value)&&x.subject===subject.value&&x.topic===topic.value);for(const x of entries){const name=({kolay:'Kolay',orta:'Orta',zor:'Zor'})[x.difficulty]||x.difficulty;add(test,JSON.stringify([x.difficulty,x.testNumber]),`${name} Test ${x.testNumber}`);}test.disabled=entries.length===0;}
  grade.addEventListener('change',subjects);subject.addEventListener('change',topics);topic.addEventListener('change',tests);
  form.addEventListener('submit',function(e){e.preventDefault();if(!form.reportValidity())return;const [zorluk,number]=JSON.parse(test.value);const params=new URLSearchParams({sinif:grade.value,ders:subject.value,konu:topic.value,zorluk,test:String(number)});location.href='test.html?'+params.toString();});
  form.hidden=false;
  form.closest(".quick-section").hidden=false;
})();
