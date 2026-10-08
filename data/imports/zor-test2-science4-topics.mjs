// Source grade-four science tests are shifted one unit after the first topic.
// The original first group is mostly matter, while the catalogue needs a
// circuits group, so that destination receives concrete circuit questions.
const circuits=[
 ['Bir pil, kablo ve ampulle kurulan devrede ampul yanmıyor. Kablonun bir ucu pile değmiyorsa ne yapılmalıdır?','Kabloyu pilin kutbuna bağlamak','Pili masadan uzaklaştırmak','Ampulün camını boyamak','Kabloyu kesip atmak','Açık bağlantıda elektrik akımı dolaşamaz. Kablonun pile bağlanması devre yolunu tamamlar.'],
 ['Bir ampulün yanması için basit elektrik devresinde hangi parçalar arasında kesintisiz yol olmalıdır?','Pil, kablo ve ampul arasında','Yalnız pil ve masa arasında','Ampul ve pencere arasında','Kablo ve kâğıt arasında','Pil, kablo ve ampul uygun biçimde bağlanınca akımın dolaşabileceği kapalı yol oluşur.'],
 ['Aynı pil ve ampul kullanılan iki devreden birinde anahtar açık, diğerinde kapalıdır. Hangisinde ampul yanar?','Anahtarı kapalı olan devrede','Anahtarı açık olan devrede','İkisinde de kesinlikle yanmaz','Anahtarın konumu önemli değildir','Kapalı anahtar devre yolunu tamamlar. Açık anahtar akım yolunu keser.'],
 ['Bir devrede pilin görevi nedir?','Elektrik enerjisi sağlamak','Ampulün rengini değiştirmek','Kabloyu uzatmak','Anahtarın yerini göstermek','Pil, devrenin elektrik enerjisi kaynağıdır; ampul bu enerjiyle ışık verir.'],
 ['Devredeki anahtar kapatıldığında ampul yanıyor, açıldığında sönüyor. Anahtar hangi işi yapıyor?','Devreyi açıp kapatıyor.','Pili yeniliyor.','Kabloyu yalıtıyor.','Ampulü büyütüyor.','Anahtar kapalıyken akım yolu tamamlanır; açıkken yol kesilir.'],
 ['Ampul yuvasına gevşek takılmışsa sağlam pil ve kablolar olsa bile neden yanmayabilir?','Elektrik bağlantısı tamamlanmadığı için','Pil rengini kaybettiği için','Işık havada kaybolduğu için','Kablo ağır olduğu için','Ampulün metal temas noktaları yuvaya değmezse devrede kesinti olur.'],
 ['Basit bir devrede iki kablonun uçları birbirine değmiyor. Ampulün yanması için hangisi gereklidir?','Uçları uygun biçimde birleştirip devreyi tamamlamak','Kabloları birbirinden daha da ayırmak','Ampulü kâğıda sarmak','Pili ters çevirmeden çıkarmak','Kablo uçları arasında boşluk varsa kapalı yol oluşmaz. Uygun bağlantı yapıldığında yol tamamlanır.'],
 ['Bir çocuk devrede ampulü çıkarıp yerine plastik silgi koyuyor. Ampulün eski yerinde ışık görülür mü?','Hayır, silgi ışık veren ampul değildir.','Evet, silgi ampul gibi yanar.','Yalnız gündüz yanar.','Pilin rengi değişirse yanar.','Plastik silgi ampulün ışık üreten kısmına sahip değildir. Devre yolunda ışık kaynağı kalmaz.'],
 ['Bir devre şemasında pil, ampul ve anahtar sembolleri vardır. Semboller ne için kullanılır?','Devre parçalarını çizimde göstermek için','Pilin içini doldurmak için','Ampulü ısıtmak için','Anahtarı boyamak için','Şema, gerçek parçaları basit işaretlerle gösterir; bağlantıların izlenmesini kolaylaştırır.'],
 ['İki aynı ampulden biri sağlam devrede yanıyor, diğeri aynı koşullarda yanmıyor. Yerleri değiştirilince yanmayan ampul yine yanmıyor. Hangi parça sorunlu olabilir?','Yanmayan ampul','Her iki pil','Masa','Kâğıt','Aynı devreye takıldığında yalnız bir ampul çalışmıyorsa sorun o ampulde olabilir.']
];
const light=[['Bir okulda koridor lambaları kimse yokken açık bırakılıyor. Doğru aydınlatma ve tasarruf için ne yapılmalıdır?','Gereksiz lambaları kapatmak','Gündüz de bütün lambaları açmak','Işığı pencereden uzağa çevirmek','Ampulleri kırmak','Boş koridorda lambaları kapatmak gereksiz elektrik tüketimini azaltır.']];
const environment=[['Bir okulda kullanılmış piller için ayrı toplama kutusu bulunuyor. Piller neden bu kutuya atılmalıdır?','İçeriklerindeki maddelerin çevreye karışmasını önlemek için','Pilleri yiyeceklerle karıştırmak için','Pilleri toprağa gömmek için','Suyla yıkayıp lavaboya dökmek için','Atık piller ayrı toplanırsa içlerindeki maddelerin toprağa ve suya yayılması önlenebilir.']];
function setRow(q,row,index){const choices=row.slice(1,5),shift=index%4;Object.assign(q,{question:row[0],choices:[...choices.slice(4-shift),...choices.slice(0,4-shift)],correctAnswer:shift,explanation:row[5]});}
export function repairScience4Topics(tests,catalog,changes){
 const map={'yer-kabugu-ve-dunyanin-hareketleri':'basit-elektrik-devreleri','besinlerimiz':'yer-kabugu-ve-dunyanin-hareketleri','kuvvetin-etkileri':'besinlerimiz','maddenin-ozellikleri':'kuvvetin-etkileri','aydinlatma-ve-ses-teknolojileri':'maddenin-ozellikleri','insan-ve-cevre':'aydinlatma-ve-ses-teknolojileri','basit-elektrik-devreleri':'insan-ve-cevre'};
 for(const t of tests.filter(t=>t.classLevel===4&&t.subject==='fen-bilimleri')){
  const from=t.topic,to=map[from],topic=catalog.grades[4].subjects.find(s=>s.id==='fen-bilimleri').topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`4-sinif-fen-bilimleri-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q);
   if(from==='yer-kabugu-ve-dunyanin-hareketleri')setRow(q,circuits[i],i);
   if(from==='insan-ve-cevre'&&i===9)setRow(q,light[0],i);
   if(from==='basit-elektrik-devreleri'&&i===9)setRow(q,environment[0],i);
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   changes.push({id:q.id,reasons:['verified_grade_four_science_topic_reassignment'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
