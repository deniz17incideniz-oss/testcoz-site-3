// The source's first-grade maths groups are shifted across topic headings.
// Keep useful questions, replace only material with no suitable catalogue topic.
const lengths=[
 ['Bir kalem 6 silgi boyunda, bir defter 9 silgi boyundadır. Hangisi daha uzundur?','Defter','Kalem','İkisi eşit','9 silgi boyu, 6 silgi boyundan fazladır; defter daha uzundur.'],
 ['Bir kurdele 12 karış, başka bir kurdele 8 karış uzunluğundadır. İlki kaç karış daha uzundur?','4 karış','8 karış','20 karış','12 − 8 = 4 karış fark vardır.'],
 ['Aynı masayı Ayşe 7, babası 5 karış ölçüyor. Masanın gerçek boyu değişmediğine göre kimin karışı daha kısadır?','Ayşe’nin','Babasının','İkisinin de eşittir','Aynı uzunluk kısa bir karışla daha çok kez ölçülür. Ayşe 7 karış saydığı için onun karışı daha kısadır.'],
 ['Bir çantanın kütlesi 2 kitap kadardır. Aynı kitaplardan 3 tane olan başka çanta için hangisi söylenir?','İkinci çanta daha ağırdır.','İlk çanta daha ağırdır.','İki çanta eşit ağırlıktadır.','Kitaplar eşse 3 kitaplık kütle 2 kitaplık kütleden büyüktür.'],
 ['Bir sıranın boyunu karışla ölçmek isteyen çocuk nereden başlamalıdır?','Sıranın bir ucundan','Sıranın ortasından','Sıranın dışından','Uzunluğu eksiksiz saymak için ölçmeye bir uçtan başlayıp karışları boşluk bırakmadan yerleştiririz.'],
 ['Bir ip 10 adım, başka bir ip 6 adım uzunluğundadır. İki ip aynı kişinin adımıyla ölçüldüyse hangisi daha kısadır?','6 adımlık ip','10 adımlık ip','İkisi eşittir','Ölçme birimi aynıysa 6 adım, 10 adımdan daha kısa bir uzunluğu gösterir.'],
 ['Bir elma ile bir portakal eşit kollu terazide dengede duruyor. Bu durumda kütleleri için ne söylenebilir?','Eşittir.','Elma daha ağırdır.','Portakal daha ağırdır.','Terazinin iki kefesi dengedeyse nesnelerin kütleleri eşittir.'],
 ['Bir kalem 4 ataş, silgi 2 ataş uzunluğundadır. Aynı ataş kullanıldıysa kalem silgiden kaç ataş daha uzundur?','2 ataş','4 ataş','6 ataş','4 − 2 = 2 ataş. Aynı ataş kullanıldığı için uzunluklar karşılaştırılabilir.'],
 ['Bir kutu 5 eş blok, diğeri 8 eş blok ağırlığındadır. Hangisi daha ağırdır?','8 blokluk kutu','5 blokluk kutu','İkisi eşit','Eş bloklarla ölçüldüğünde 8 blokluk kütle 5 blokluktan büyüktür.'],
 ['İki çocuk aynı masayı farklı büyüklükte karışlarla ölçüyor. Sonuçların farklı çıkmasının nedeni nedir?','Karış uzunlukları farklıdır.','Masa kendiliğinden uzamıştır.','Masanın rengi değişmiştir.','Standart olmayan karış ölçüsü kişiden kişiye değişir; aynı masa farklı sayıda karış gelebilir.']
];
const positions=[
 ['Kitap masanın üstünde, çanta masanın altında duruyor. Çanta kitaba göre nerededir?','Aşağıdadır.','Yukarıdadır.','Aynı yerdedir.','Çanta masanın altında, kitap üstündedir; çanta kitaba göre aşağıdadır.'],
 ['Yan yana duran üç kutudan kırmızı kutu solda, mavi kutu ortada, yeşil kutu sağdadır. Mavi kutunun sağında hangisi vardır?','Yeşil kutu','Kırmızı kutu','Hiçbiri','Sıra kırmızı, mavi, yeşildir; mavinin sağında yeşil vardır.'],
 ['İki aynı kalemden biri masanın sağında, diğeri solundadır. Kalemlerin hangi özelliği aynıdır?','Şekilleri','Konumları','Masaya uzaklıkları','Kalemler aynı olarak tanımlanmıştır, bu yüzden şekilleri eş; sağ ve sol konumları farklıdır.'],
 ['Ece kapının önünde, Can kapının arkasında bekliyor. Kapının arkasında kim vardır?','Can','Ece','İkisi de','Soruda Can’ın kapının arkasında olduğu açıkça söyleniyor.'],
 ['Üç eş fincandan biri diğerlerinin arasında duruyor. Ortadaki fincanın iki yanında kaç fincan vardır?','2','1','3','Üç fincanın ortasındaki seçilince solda bir, sağda bir fincan kalır: toplam 2.'],
 ['Bir oyuncak arabanın önünde bir top, arkasında bir küp vardır. Top arabaya göre nerededir?','Önündedir.','Arkasındadır.','Altındadır.','Konum soruda verilmiştir: top arabanın önünde durur.'],
 ['Aynı biçimdeki iki kaşık farklı renklere boyanmıştır. Hangi özellikleri yine eş kalır?','Biçimleri','Renkleri','Yerleri','Boyama yalnız rengi değiştirir; iki kaşığın biçimi aynı kalır.'],
 ['Bir sıra soldan sağa Ali, Ece, Can biçimindedir. Ece kimin arasındadır?','Ali ile Can’ın','Ali ile masanın','Can ile kapının','Sırada Ece’nin solunda Ali, sağında Can vardır.'],
 ['İki eş küpün biri kutunun içinde, diğeri kutunun dışındadır. Hangisi farklıdır?','Bulundukları yer','Şekilleri','Köşe sayıları','Küpler eş olduğundan şekilleri ve köşe sayıları aynıdır; konumları farklıdır.'],
 ['Kırmızı kitap mavi kitabın üstünde, sarı kitap mavi kitabın altındadır. En altta hangisi vardır?','Sarı kitap','Mavi kitap','Kırmızı kitap','Üstten alta kırmızı, mavi ve sarı sıralanır; en altta sarı kitap vardır.']
];
const data=[
 ['Bir sınıfta 6 çocuk elmayı, 4 çocuk muzu seviyor. Hangisini daha çok çocuk seviyor?','Elmayı','Muzu','İkisini eşit sayıda','Elmayı seçen 6 kişi, muzu seçen 4 kişidir; 6 büyüktür.'],
 ['Oy sayıları tabloda kedi 5, köpek 7 olarak yazıldı. Köpeğe kaç kişi daha fazla oy verdi?','2','5','12','Köpeğe 7, kediye 5 oy verilmiş; fark 7 − 5 = 2’dir.'],
 ['Bir çizelgede pazartesi 3, salı 6 kitap okunmuş. Hangi gün daha çok kitap okunmuş?','Salı','Pazartesi','İki gün eşit','Salı gününün 6 kitabı, pazartesinin 3 kitabından fazladır.'],
 ['Sınıfta 8 öğrenci kırmızı, 8 öğrenci mavi kalem seçti. Bu seçimler için hangisi doğrudur?','İki rengi seçenlerin sayısı eşittir.','Kırmızıyı daha çok seçtiler.','Maviyi daha çok seçtiler.','Her iki renk için de 8 öğrenci sayılmıştır; sayılar eşittir.'],
 ['Bir tabloda sabah 4, öğlen 5, akşam 2 bardak su içildiği yazıyor. En az bardak hangi vakitte içilmiştir?','Akşam','Sabah','Öğlen','Tablodaki en küçük sayı 2’dir ve akşam vaktine aittir.']
];
function setRow(q,row,index){const choices=row.slice(1,4),shift=index%3;Object.assign(q,{question:row[0],choices:[...choices.slice(3-shift),...choices.slice(0,3-shift)],correctAnswer:shift,explanation:row[4]});}
export function repairMath1(tests,catalog,changes){
 const map={'sayilar-ve-nicelikler':'geometrik-sekiller','uzunluk-ve-kutle-olcme':'sayilar-ve-nicelikler','paralarimiz':'uzunluk-ve-kutle-olcme','konum-ve-es-nesneler':'paralarimiz','geometrik-sekiller':'konum-ve-es-nesneler'};
 for(const t of tests.filter(t=>t.classLevel===1&&t.subject==='matematik')){
  const from=t.topic,to=map[from]||from,topic=catalog.grades[1].subjects.find(s=>s.id==='matematik').topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`1-sinif-matematik-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q);
   if(from==='paralarimiz')setRow(q,lengths[i],i);
   if(from==='geometrik-sekiller')setRow(q,positions[i],i);
   if(from==='veriye-dayali-arastirma'&&i<5)setRow(q,data[i],i);
   if(from==='sayilar-ve-nicelikler'&&i===6)setRow(q,['Görseldeki kafesin dış sınırı hangi şekle benzer?','Dikdörtgen','Üçgen','Çember','Kafesin dış sınırında karşılıklı kenarlar eşit, iki kenar uzun iki kenar kısadır; dikdörtgene benzer.'],i);
   if(from==='paralarimiz'&&i===0){q.visual={type:'finalDiagram',title:'Kalem ve defter ölçüleri',data:{kind:'table',rows:[['Kalem',6],['Defter',9]]}};q.imageAlt='Kalem 6, defter 9 eş silgi boyundadır';}
   if(from==='geometrik-sekiller'&&i===7){q.visual={type:'finalDiagram',title:'Soldan sağa sıra',data:{kind:'table',rows:[['Solda','Ali'],['Ortada','Ece'],['Sağda','Can']]}};q.imageAlt='Soldan sağa Ali, Ece ve Can sıralanmıştır';}
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   if(JSON.stringify(before)!==JSON.stringify(q))changes.push({id:q.id,reasons:['verified_first_grade_math_topic_and_context'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
