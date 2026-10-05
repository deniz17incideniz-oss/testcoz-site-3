// Three social-studies groups were assigned to the next catalogue heading.
// Move their useful material and replace a few questions that do not fit the destination.
const geography={
  2:['Bir krokide okul parkın kuzeyinde, kütüphane parkın güneyindedir. Okuldan kütüphaneye doğru hangi yönde gidilir?','Güney','Kuzey','Doğu','Batı','Okul parkın kuzeyindedir; kütüphane parkın güneyindedir. Okuldan kütüphaneye giderken güneye ilerlenir.'],
  3:['Bir öğrenci haritada kuzeye bakarken sağ elinin gösterdiği yön hangisidir?','Doğu','Batı','Güney','Kuzey','Kuzeye dönük durduğumuzda sağ taraf doğuyu, sol taraf batıyı gösterir.'],
  5:['Bir bölgede dere yatağına ev yapıldığında hangi doğal olayın zararı artabilir?','Sel','Kuraklık','Çığ','Deprem','Yağışla yükselen dere suyu yatağına taşabilir. Bu alandaki yapıların selden etkilenme olasılığı artar.'],
  8:['Bir öğrenci yaşadığı yerin doğal ve beşerî unsurlarını ayırıyor. Hangisi doğal unsurdur?','Dağ','Köprü','Okul','Yol','Dağ doğada oluşur; köprü, okul ve yol insanlar tarafından yapılmıştır.'],
  9:['Bir kroki çizilirken sınıftaki kapı ve pencere neden yerlerine göre gösterilir?','Konumlarını bulmayı kolaylaştırmak için','Duvar rengini değiştirmek için','Sınıfın saatini ayarlamak için','Pencereleri büyütmek için','Kroki nesnelerin birbirine göre konumunu gösterir; bu yüzden kapı ve pencerenin yeri önemlidir.']
};
const individual={
  3:['Bir öğrenci kendisini tanıtırken “Resim yapmayı seviyorum, fakat müzik çalışırken daha çok zorlanıyorum.” diyor. Bu söz hangi özelliğini anlatır?','İlgi ve becerilerini','Kimlik numarasını','Yaşadığı bölgenin iklimini','Ülkenin komşularını','Resim ve müzikle ilgili deneyimi, öğrencinin ilgilerini ve zorlandığı alanı anlatır.'],
  8:['Aynı sınıftaki iki çocuk farklı oyunlardan hoşlanıyor. Birlikte oyun seçerken ne yapmaları uygundur?','Birbirlerini dinleyip ortak bir oyun belirlemeleri','Birinin diğerini zorlaması','Farklı tercihi olanı dışlamaları','Oynamadan kavga etmeleri','Tercihler farklı olabilir. İki çocuğun birbirini dinlemesi ortak bir seçim yapmalarını sağlar.']
};
function setRow(q,row,index){const choices=row.slice(1,5),shift=index%4;Object.assign(q,{question:row[0],choices:[...choices.slice(4-shift),...choices.slice(0,4-shift)],correctAnswer:shift,explanation:row[5]});}
export function repairSocial4(tests,catalog,changes){
 const map={'birey-ve-toplum':'insanlar-yerler-ve-cevreler','kultur-ve-miras':'birey-ve-toplum','insanlar-yerler-ve-cevreler':'kultur-ve-miras'};
 for(const t of tests.filter(t=>t.classLevel===4&&t.subject==='sosyal-bilgiler'&&map[t.topic])){
  const from=t.topic,to=map[from],topic=catalog.grades[4].subjects.find(s=>s.id==='sosyal-bilgiler').topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`4-sinif-sosyal-bilgiler-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q);
   const row=(from==='birey-ve-toplum'?geography:from==='kultur-ve-miras'?individual:{} )[i];
   if(row)setRow(q,row,i);
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   changes.push({id:q.id,reasons:['verified_social_studies_topic_reassignment'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
