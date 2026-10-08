// Grades 2 and 3 repeat the same one-topic-shift present in grade 1.
// Only the safety group has no matching destination source and needs new items.
const art2=[
 ['Sınıf gazetesi hazırlayan iki öğrenciden Ece metni yazıyor, Deniz çizimleri yapıyor. Bu çalışmada hangi iki beceri birlikte kullanılır?','Yazma ve çizim','Yalnız koşma','Yalnız sayı sayma','Gazetenin metni yazma, görselleri çizim becerisi gerektirir. İki görev birlikte ürünü oluşturur.'],
 ['Bir öğrenci kâğıt köprünün kaç silgi taşıyacağını merak ediyor. Tahminini denedikten sonra hangisini kaydetmelidir?','Gerçekten taşıdığı silgi sayısını','Arkadaşının doğum gününü','Silgilerin satın alındığı dükkânı','Deney sonucu köprünün taşıdığı gerçek silgi sayısıdır. Başka bilgiler soruyu cevaplamaz.'],
 ['İki arkadaş aynı şarkıyı biri hızlı, diğeri yavaş tempoda söylüyor. Hangi özellik değişmiştir?','Söyleme hızı','Şarkının sözcükleri','Şarkıyı söyleyen kişi sayısı','Aynı şarkının tempoları farklıdır. Sözcükler ve kişi sayısı değiştiği söylenmemiştir.'],
 ['Bir tabletle fotoğraf çekmeden önce arkadaşımızın yüzünün görünmesini istiyoruz. Ne yapmalıyız?','Arkadaşımızdan izin istemeliyiz.','Fotoğrafı izinsiz paylaşmalıyız.','Fotoğrafı onun yerine gizlice çekmeliyiz.','Birinin fotoğrafını çekmeden ve paylaşmadan önce izin istemek onun seçimine saygı gösterir.'],
 ['Sınıfta iki öğrenci aynı nesneyi farklı açılardan çizdi. Resimleri farklı çıktı. Hangi açıklama uygundur?','Nesneye farklı yerlerden bakmış olabilirler.','Nesne mutlaka ikiye bölünmüştür.','İkisi de hiç bakmamıştır.','Bakış yeri değişince aynı nesnenin görünen bölümleri farklı olabilir.'],
 ['Bir büyüteçle yaprağı inceleyen çocuk küçük çizgileri daha belirgin görüyor. Büyüteç hangi işe yarar?','Küçük ayrıntıları daha büyük göstermeye','Yaprağı anında büyütmeye','Yaprağa yeni çizgiler eklemeye','Büyüteç görüntüyü büyük gösterir. Yaprağın gerçek boyunu veya çizgilerini değiştirmez.'],
 ['Bir sınıf robot oyuncağın önce ileri, sonra sola gitmesini istiyor. İstenen sırayı hangi yönerge verir?','Önce ileri git, sonra sola dön.','Yalnız sola dön.','Önce geri git, sonra dur.','Verilen iki adımda önce ileri hareket, ardından sola dönüş vardır. Sıra önemlidir.'],
 ['Bir öğrenci deneyini anlatırken “İlk denemede olmadı, ikinci denemede kâğıt uçak daha uzağa gitti.” diyor. Ne karşılaştırmıştır?','İki denemenin uçuş uzaklığını','İki arkadaşın adını','Kâğıdın fiyatını','Uçağın ne kadar uzağa gittiğini iki denemede karşılaştırmıştır. İsim ve fiyat sonucu açıklamaz.'],
 ['Bir resimde mavi deniz, yeşil kıyı var. Resmi anlatırken hangisi gözlediği renklere dayanır?','Deniz mavi, kıyı yeşil görünüyor.','Yarın mutlaka yağmur yağacak.','Ressamın en sevdiği yemek çorbadır.','İlk cümle resimde görülen renkleri söyler. Diğerleri resimden çıkarılamaz.'],
 ['Sınıfta geri dönüşümle ilgili afiş hazırlayan çocuk, mesajın anlaşılmasını istiyor. Hangisi yardımcı olur?','Kısa bir başlıkla uygun bir çizimi birlikte kullanmak','Yazıları okunamayacak kadar küçük yapmak','Afişte konu dışı sözcükler kullanmak','Kısa başlık ve konuyla ilgili çizim, afişin ne anlattığını daha açık gösterir.']
];
const art3=[
 ['Üç öğrenci aynı bitkinin fotoğrafını pazartesi, çarşamba ve cuma çekiyor. Gelişimi karşılaştırmak için fotoğrafları nasıl kullanmalıdır?','Tarih sırasına koyup görülen değişimi not ederek','Tarihleri silip rastgele sıralayarak','Yalnız ilk fotoğrafa bakarak','Aynı bitkinin farklı günlerdeki görüntüleri tarih sırasıyla karşılaştırılırsa değişim görülebilir.'],
 ['Bir öğrenci kâğıttan iki farklı uçak yapıyor. İkisinin uçuşunu adil karşılaştırmak için hangi koşulu aynı tutmalıdır?','İkisini de aynı yerden ve aynı yöntemle fırlatmak','Birini içeride, diğerini rüzgârda uçurmak','Birini hiç fırlatmamak','Fırlatma yeri ve yöntemi aynı olursa gözlenen uzaklık farkı tasarımlarla daha anlamlı karşılaştırılır.'],
 ['Bir afişte çizilen ampulün altında “Gereksiz yere açık bırakma” yazıyor. Görsel ile metin birlikte neyi anlatır?','Elektriği dikkatli kullanmayı','Ampulün yiyecek olduğunu','Bütün odaların karanlık kalması gerektiğini','Ampul elektrikle ilgilidir. Yazı gereksiz kullanımın azaltılmasını ister.'],
 ['Bir öğrenci bir deneyde yalnız su miktarını değiştirip aynı tohumları eş saksılara ekiyor. Hangi soruyu araştırıyor olabilir?','Su miktarı filizlenmeyi etkiler mi?','Saksı rengi hangisine daha çok yakışır?','Tohumların adları değişir mi?','Değiştirilen koşul su miktarıdır. Bu koşulun filizlenmeye etkisi karşılaştırılabilir.'],
 ['Müzik çalışmasında bir ritim “vur, bekle, vur, vur” biçiminde tekrar ediyor. Sonraki dört adım nasıl olmalıdır?','Vur, bekle, vur, vur','Bekle, vur, bekle, vur','Vur, vur, bekle, bekle','Ritim dört adımlık aynı düzeni tekrarlar. Yeni bölüm ilk dört adımla aynı olmalıdır.'],
 ['Bir arkadaşımız tasarladığı oyunun kurallarını açıklıyor. Oyuna başlamadan önce hangi soru eksik bir kuralı netleştirir?','“Sıra değişince kim başlayacak?”','“Dün ne yedin?”','“Çantanın rengi ne?”','Sıra değişiminin nasıl yapılacağı oyun kuralının parçasıdır. Diğer sorular oyunu açıklamaz.'],
 ['Bir çizimi tablete kaydeden Ada daha sonra açıp düzeltti. Bu örnekte teknolojinin hangi yararı görülür?','Çalışmayı saklayıp yeniden düzenlemeyi sağlaması','Çizimi kendiliğinden bitirmesi','Bütün fikirleri aynı yapması','Dijital kayıt önceki çalışmanın tekrar açılmasını ve düzenlenmesini sağlar. Fikri otomatik üretmez.'],
 ['Öğrenciler köprü modeli yaparken önce çizim hazırlıyor, sonra malzemeyi seçiyor, en son deniyor. Hangi adım denemeden hemen önce gelir?','Malzeme seçimi','Çizimi hazırlama','Sonucu yazma','Sıra çizim, malzeme seçimi, denemedir. Bu yüzden denemeden önceki adım malzeme seçimidir.'],
 ['Bir öğrenci “Kâğıt uçağımın kanatlarını değiştirdim; daha uzağa uçtu.” diyor. Hangisi gözlem, hangisi yorumdur?','Daha uzağa uçması gözlem; bunun kanat değişiminden kaynaklandığı yorumu','İkisi de kesin kanıttır.','Kâğıdın rengi gözlem; uzaklık önemsizdir.','Uçuş uzaklığı gözlenebilir. Nedenin yalnız kanat olduğunu kesinleştirmek için başka koşullar da kontrol edilmelidir.'],
 ['Bir sınıf gösterisinde öğrenciler kendi çizimlerini panoya asıyor. Arkadaşının çalışmasını kullanmak isteyen çocuk ne yapmalıdır?','Önce arkadaşından izin istemelidir.','İsmini silip kendi adını yazmalıdır.','Resmi habersiz götürmelidir.','Çalışma arkadaşına aittir. İzin istemek emeğine ve kararına saygı gösterir.']
];
function setRow(q,row,index){const options=row.slice(1,4),shift=index%3;Object.assign(q,{question:row[0],choices:[...options.slice(3-shift),...options.slice(0,3-shift)],correctAnswer:shift,explanation:row[4]});}
export function repairHayat23(tests,catalog,changes){
 const map={'sagligim-ve-guvenligim':'ailem-ve-toplum','ailem-ve-toplum':'sagligim-ve-guvenligim','yasadigim-yer-ve-ulkem':'bilim-teknoloji-ve-sanat','doga-ve-cevre':'yasadigim-yer-ve-ulkem','bilim-teknoloji-ve-sanat':'doga-ve-cevre'};
 for(const t of tests.filter(t=>[2,3].includes(t.classLevel)&&t.subject==='hayat-bilgisi')){
  const from=t.topic,to=map[from]||from,topic=catalog.grades[t.classLevel].subjects.find(s=>s.id==='hayat-bilgisi').topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`${t.classLevel}-sinif-hayat-bilgisi-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q);
   if(from==='yasadigim-yer-ve-ulkem')setRow(q,(t.classLevel===2?art2:art3)[i],i);
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   changes.push({id:q.id,reasons:['verified_hayat_topic_reassignment'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
