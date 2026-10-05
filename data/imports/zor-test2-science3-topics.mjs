// The supplied grade-three science groups for motion, living things and matter
// are cyclically assigned to the wrong catalogue headings. The light/sound group
// has no grade-three destination in this catalogue, so it becomes earth science.
const earth=[
 ['Yağmurdan sonra eğimli bir yoldaki toprağın dereye taşındığı görülüyor. Bu olayda toprağı taşıyan nedir?','Akan su','Güneş ışığı','Yolun rengi','Yağmur suyu eğim boyunca akarken gevşek toprağı da sürükler.'],
 ['Bir öğrenci aynı büyüklükteki iki taşı inceliyor: biri pürüzlü, diğeri düzdür. Hangi gözlem taşların bir özelliğini karşılaştırır?','Yüzeylerinin farklı olması','İkisinin de yarın yağmur yağdırması','İkisinin aynı yerde bulunması','Pürüzlü ve düz oluşları dokunma veya görmeyle gözlenebilen yüzey özellikleridir.'],
 ['Bir akarsu kenarında büyük taşların yanında küçük, yuvarlak çakıllar görülüyor. Hangisi çakılların yuvarlaklaşmasını açıklayabilir?','Suyla taşınırken başka taşlara sürtünmeleri','Her gün boyanmaları','Güneşin onları bir anda eritmesi','Suyla sürüklenen parçalar çarpışıp sürtünerek köşelerini kaybedebilir.'],
 ['Bir öğrenci toprak örneğinde küçük taşlar ve kurumuş yaprak parçaları görüyor. Bu gözlemden hangisi çıkarılabilir?','Toprak farklı parçalar içerebilir.','Toprak yalnız sudan oluşur.','Bütün topraklar aynı renktedir.','Örnekte taş ve yaprak parçaları birlikte görülmüştür; bu, toprağın birden çok tür parça içerebildiğini gösterir.'],
 ['Yağmurdan sonra bir çukurda biriken su birkaç güneşli günün ardından azalıyor. Suyun azalmasına hangi olay katkıda bulunur?','Buharlaşma','Taşların çoğalması','Gölgenin uzaması','Güneşin ısıttığı suyun bir kısmı buharlaşarak havaya karışır.'],
 ['İki bardaktan birinde kum, diğerinde kil vardır. İkisine aynı miktarda su dökülürse suyun geçişini karşılaştırmak için ne ölçülmelidir?','Alttan çıkan su miktarı','Bardakların rengi','Öğrencilerin boyu','Aynı su verildiğinde alttan geçen su miktarı, iki malzemenin suyu geçirme farkını gösterir.'],
 ['Bir tepede bitki örtüsü kaldırıldıktan sonra yağmurla daha çok toprak sürükleniyor. Bitkilerin hangi bölümü toprağı tutmaya yardım eder?','Kökleri','Çiçeklerinin rengi','Yapraklarının gölgesi','Kökler toprağın içinde yayılır ve toprağın yerinde kalmasına yardım eder.'],
 ['Bir yer bilimci aynı kayacı büyüteçle ve çıplak gözle inceliyor. Büyüteçle neyi daha kolay fark edebilir?','Küçük tanecikleri','Kayanın gelecekteki tam ağırlığını','Kayanın sesini','Büyüteç küçük ayrıntıları daha büyük gösterir; kayacın tanecikleri daha belirgin görülebilir.'],
 ['Bir derede taşınan kum, suyun yavaşladığı geniş bir bölümde dibe çöküyor. Bu kum için hangi ifade uygundur?','Su yavaşlayınca birikmiştir.','Kum bir anda suya dönüşmüştür.','Kum gökyüzüne çıkmıştır.','Akıntı zayıfladığında taşıdığı kumun bir kısmı dibe çöküp birikir.'],
 ['Bir öğrenci dağ, dere ve yolun bulunduğu bir çizim yapıyor. Hangisi insan eliyle yapılmış bir unsur olarak gösterilir?','Yol','Dağ','Dere','Dağ ve dere doğal oluşumlardır; yol insanlar tarafından yapılır.']
];
function setRow(q,row,index){const choices=row.slice(1,4),shift=index%3;Object.assign(q,{question:row[0],choices:[...choices.slice(3-shift),...choices.slice(0,3-shift)],correctAnswer:shift,explanation:row[4]});}
export function repairScience3Topics(tests,catalog,changes){
 const map={'canlilar-dunyasina-yolculuk':'hareketi-kesfediyorum','hareketi-kesfediyorum':'canlilar-dunyasina-yolculuk','yer-bilimciler-is-basinda':'maddeyi-taniyalim-karistirip-ayiralim','maddeyi-taniyalim-karistirip-ayiralim':'yer-bilimciler-is-basinda'};
 for(const t of tests.filter(t=>t.classLevel===3&&t.subject==='fen-bilimleri'&&map[t.topic])){
  const from=t.topic,to=map[from],topic=catalog.grades[3].subjects.find(s=>s.id==='fen-bilimleri').topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`3-sinif-fen-bilimleri-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q);
   if(from==='maddeyi-taniyalim-karistirip-ayiralim')setRow(q,earth[i],i);
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   changes.push({id:q.id,reasons:['verified_grade_three_science_topic_reassignment'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
