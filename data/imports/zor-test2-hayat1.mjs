// The six source groups are shifted by one or two catalogue topics. Keep the
// source IDs while assigning each group to its actual subject matter.
const solutions={
 'BENVEO':[
  'Selam vermek ve adını söylemek tanışmayı başlatır. Arkadaşından kaçmak veya onu görmezden gelmek iletişim kurmayı engeller.',
  'El kaldırmak öğretmene söz istediğini gösterir. Bağırmak diğer öğrencilerin dinlemesini zorlaştırır.',
  'Sıra ve pano bütün sınıfın kullandığı eşyalardır. Onları dikkatli kullanmak herkesin yararlanmasını sağlar.',
  'Sınıfın temizliği ortak sorumluluktur. Çöpü kutuya atmak sınıfı temiz tutar; yere bırakmak arkadaşların çalışma alanını kirletir.',
  'Ders programındaki kitap ve defterleri seçmek gerekli malzemeleri taşımayı sağlar. Her oyuncağı çantaya koymak bu amaca hizmet etmez.',
  'Sabun ve su ellerdeki kiri uzaklaştırmaya yardım eder. Tuvaletten sonra elleri yıkamak ortak alanların temiz kullanılmasının bir parçasıdır.',
  'Teneffüste sıraya ve oyun kurallarına uymak arkadaşların güvenle oynamasını sağlar. İtmek yaralanmaya neden olabilir.',
  'Törende oyun ve sohbet bırakılır; marş dinlenir veya birlikte okunur. Böylece herkes törene saygıyla katılır.',
  'Kalem kutusu ve defter öğrenciye ait kişisel eşyalardır. Tahta ve koridor herkesin kullandığı okul alanlarıdır.',
  'Yanlışlıkla çarptığında özür dilemek davranışını fark ettiğini ve arkadaşının duygusunu önemsediğini gösterir.'
 ],
 'SAĞLIĞ':[
  'Kardeş aynı ailede büyüyen yakın aile bireyidir. Teyze ve dayı daha geniş akrabalık çevresindedir.',
  'Oyuncakları toplamak yaşına uygun bir ev sorumluluğudur. Ocak kullanmak yetişkin desteği gerektirir.',
  'Aileyle ilgili bir kararda çocukların da düşüncesinin dinlenmesi ortak yaşamı kolaylaştırır. Tek kişinin konuşması diğerlerini dışarıda bırakır.',
  'Ailece oyun için herkesin sevdiği bir oyunu konuşup sırayla seçmek adil bir karardır. Bir kişinin fikrini her zaman dayatmak değildir.',
  'Evde bir işi paylaşırken herkes yapabileceği bir görev üstlenebilir. Sofrayı birlikte hazırlamak yardımlaşmaya örnektir.',
  'Bir aile üyesi yorgun olduğunda yardım teklif etmek onun emeğine saygı gösterir. Bütün işleri ona bırakmak yükünü artırır.',
  'Babanın babasına dede denir. Amca babanın erkek kardeşi, dayı annenin erkek kardeşidir.',
  'Birbirini dinlemek ve yardımlaşmak aile içindeki anlaşmazlıkları konuşarak çözmeye yardımcı olur.',
  'Birlikte yaşayan kişiler aynı evi paylaştıkları için ortak alanları özenle kullanmalıdır. Bu, başkalarının da rahat etmesini sağlar.',
  'Evde biri konuşurken sözünü bitirmesini beklemek dinlediğimizi gösterir. Sözü kesmek düşüncesini anlatmasını zorlaştırır.'
 ],
 'AILEMV':[
  'Kahvaltı sabah yapılan ilk ana öğündür. Güne başlarken düzenli ve çeşitli beslenmeye yardım eder.',
  'Cips ve şekerli içecekleri sürekli seçmek dengeli beslenmenin yerini alamaz. Taze meyve, süt ve yoğurt daha çeşitli beslenmenin parçalarıdır.',
  'Banyo yapmak vücudun temizliğine yardım eder. Ne zaman yıkanacağı kişiye, etkinliğe ve gereksinime göre değişir; sabit bir haftalık sayı gerekmez.',
  'Oyun ve tuvalet sonrasında eller kirlenebilir. Su ve sabunla yıkamak elleri temizlemek için uygun adımdır.',
  'Diş fırçası ağızla temas eden kişisel bakım eşyasıdır. Başkalarıyla ortak kullanılmaz.',
  'Hastalıkta doktor muayene eder. İlaç gerektiğinde uygun tedaviyi sağlık çalışanı belirler.',
  'Meyve ve sebzeyi akan su altında yıkamak yüzeydeki kir ve kalıntıları uzaklaştırmaya yardım eder.',
  'Soğuk havaya uygun katmanlı giysiler vücut ısısını korumaya yardımcı olur. Giysi seçimi tek başına hastalığı kesin olarak önlemez.',
  'Düzenli uyku ve yeterli dinlenme günlük yaşamı destekler. Soru kesin bir saat sayısı vermediği için düzenli uyku alışkanlığı seçilir.',
  'Süt, kalsiyum içeren içeceklerden biridir. Çay ve gazoz bu seçenekler arasında aynı nedenle seçilmez; dengeli beslenmede tek bir içeceği aşırı tüketmek gerekmez.'
 ],
 'DOĞAVE':[
  'Türkiye Cumhuriyeti’nin kuruluşunda Mustafa Kemal Atatürk öncü olmuştur. Diğer iki seçenek farklı tarihî kişilerdir.',
  'Türk bayrağında kırmızı zemin üzerinde beyaz ay ve yıldız bulunur. Diğer seçenekler bu renk ve şekilleri birlikte göstermez.',
  'Atatürk 1881 yılında Selanik’te doğmuştur. Ankara, Anıtkabir’in bulunduğu kenttir.',
  'Ankara’daki Anıtkabir, Atatürk’ün kabrinin bulunduğu anıttır. Diğer yerler İstanbul’daki saraylardır.',
  'İstiklal Marşı Türkiye’nin millî marşıdır. Diğer marşların adları millî marşın adı değildir.',
  'Türkiye’nin başkenti Ankara’dır. İzmir ve Antalya Türkiye’de şehirlerdir ama başkent değildir.',
  '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı çocuklarla birlikte kutlanan millî bayramdır. Ramazan Bayramı dinî bayramdır.',
  'Başka ülkeden gelen insanlar da saygılı davranılmayı hak eder. Kökeni nedeniyle biriyle alay etmek doğru değildir.',
  'Ramazan Bayramı dinî bayramdır. Zafer Bayramı millî bayramdır; Spor Bayramı bu seçeneklerde dinî bayram değildir.',
  'Törende marşı dinlemek veya söylemek ve başkalarını rahatsız etmemek ortak simgelere saygıyı gösterir.'
 ],
 'BILIM,':[
  'Ağaç büyüyen ve yaşamsal gereksinimleri olan bir bitkidir. Araba ve taş canlı değildir.',
  'Bitkinin suya ve ışığa gereksinimi vardır. Çikolata bitki için gerekli bir kaynak değildir.',
  'Soğuk günlerde uygun bir yerde su ve hayvanlara uygun yiyecek bulundurmak sokak hayvanlarına yardımcı olabilir.',
  'Çöpü uygun kutuya atmak çevreyi temiz tutar. Geri dönüştürülebilen maddeleri ayrı toplamak yeniden kullanılmalarına yardım eder.',
  'Güneş, gündüz Dünya’ya ışık ve ısı sağlayan gök cismidir. Ay Güneş’ten aldığı ışığı yansıtır.',
  'İlkbaharda havalar genellikle ısınır ve birçok ağaç çiçek açar. Kar örtüsü ve yaprak dökümü diğer mevsimlerle ilişkilidir.',
  'Deprem sırasında çök, kapan, tutun hareketi başı ve gövdeyi korumak için uygulanır; sarsıntı bitince güvenli çıkış yönergeleri izlenir.',
  'Kâğıt yapımı için kullanılan eski defter ve gazeteler uygun kâğıt geri dönüşüm kutusuna ayrılır. Cam ve plastik farklı kutulara gider.',
  'Buluttan yere su damlaları düşmesi yağmuru gösterir. Karlı hava için kar taneleri görülmesi gerekir.',
  'Musluk açık kaldığında kullanılmayan su akıp gider. Fırçalama sırasında kapatmak israfı azaltır.'
 ]
};
const schoolFix={3:['Sınıfı temiz tutmak için hangisini yapmalıyız?','Çöpleri kutuya atmalıyız.','Çöpleri sıranın altına saklamalıyız.','Çöpleri arkadaşımızın masasına bırakmalıyız.']};
const familyFix={
 3:['Ailece oyun seçerken herkesin fikrini dinlemek neden önemlidir?','Birlikte karar verebilmek için','Oyunu hiç oynamamak için','Yalnız bir kişi konuşsun diye'],
 4:['Akşam evde sofrayı hazırlarken hangi davranış yardımlaşmaya örnektir?','Yapabileceğimiz bir görevi üstlenmek','Bütün işleri bir kişiye bırakmak','Eşyaları bilerek dağıtmak'],
 5:['Bir aile üyesi ev işlerinden yorulduğunu söylüyor. Ona nasıl destek olabiliriz?','Yapabileceğimiz bir işte yardım teklif ederek','Onu dinlemeden oyun oynayarak','Tüm işleri yine ona bırakarak'],
 8:['Evde hepimizin kullandığı masaya nasıl davranmalıyız?','Özenli ve temiz kullanmalıyız.','Üzerini bilerek çizmeliyiz.','Yalnız kendi eşyalarımızı önemsemeliyiz.'],
 9:['Bir aile üyemiz bize düşüncesini anlatırken ne yapmalıyız?','Sözünü bitirince kendi düşüncemizi söylemeliyiz.','Sürekli sözünü kesmeliyiz.','Onu hiç dinlememeliyiz.']
};
const scienceArt=[
 ['Bir öğrenci resim yaparken çizdiği ağacın yapraklarını yeşil, gövdesini kahverengi boyuyor. Hangi araç boyama için kullanılır?','Boya kalemi','Termometre','Cetvel','Boya kalemi çizimi renklendirir; termometre sıcaklık, cetvel uzunluk ölçer.'],
 ['Bir arkadaşımız yaptığı resmi sınıfta gösterirken nasıl davranmalıyız?','Resmini dikkatle inceleyip olumlu bir yorum söylemeliyiz.','Resmi izinsiz karalamalıyız.','Arkadaşımızı konuşturmamalıyız.','Başkasının çalışmasına özen göstermek, onu dinlemek ve izin almadan değiştirmemek saygılı davranıştır.'],
 ['Öğretmen bitkinin bir hafta içindeki büyümesini gözlemlememizi istiyor. Değişimi görmek için ne yapmalıyız?','Aynı bitkiye farklı günlerde bakıp gördüklerimizi kaydetmeliyiz.','Sadece ilk gün bakmalıyız.','Bitkiyi hiç görmeden boyunu tahmin etmeliyiz.','Aynı bitkiyi zaman içinde gözlemleyip kayıt tutmak ilk ve son durumu karşılaştırmayı sağlar.'],
 ['Bir çocuk yağmur sesini dinleyip bu sesi ritimle taklit ediyor. Hangi sanat çalışmasını yapıyor?','Müzik','Heykel','Fotoğraf','Sesleri ritimle düzenlemek müzik etkinliğidir; heykel ve fotoğraf seslerle yapılmaz.'],
 ['Sınıfta bir tabletle çekilen çiçek fotoğrafına bakıyoruz. Fotoğrafla ilgili hangi ifade doğrudur?','Tablet görüntüyü kaydetmeye yarayan bir teknoloji aracıdır.','Tablet çiçeğin yaşaması için gereken sudur.','Fotoğraf çekmek çiçeği büyütür.','Tablet fotoğraf çekip kaydedebilir. Çiçeğin büyümesi için gerekli suyun yerini tutmaz.'],
 ['Bir kalemle kâğıda aynı şekli üç kez çizerek küçük bir örüntü yapıyoruz. Hangisi örüntüyü anlatır?','Şeklin belirli bir sırayla tekrarlanması','Şeklin tamamen silinmesi','Kâğıdın hiç kullanılmaması','Aynı biçimin sıralı olarak yeniden çizilmesi örüntüdür. Şekli silmek tekrar oluşturmaz.'],
 ['Bir öğrenci gördüğü taşın rengini ve büyüklüğünü defterine yazıyor. Hangi beceriyi kullanıyor?','Gözlem yapma','Tahminini gerçek sanma','Defterini saklama','Renk ve büyüklük taşta görülen özelliklerdir. Bunları yazmak gözlem sonucunu kaydetmektir.'],
 ['Sınıf gösterisinde arkadaşımız şarkı söylerken hangi davranış uygundur?','Şarkısını dinleyip bitince alkışlamak','Sözünü kesip sahneye koşmak','Onu duymamak için bağırmak','Dinlemek ve gösteri sonunda alkışlamak emeğe saygıdır; bağırmak gösteriyi bozar.'],
 ['Bir robot oyuncağın hareket etmesi için pili takılıyor. Pilin görevi nedir?','Oyuncağa çalışması için enerji sağlamak','Oyuncağın rengini değiştirmek','Oyuncağı kâğıda çevirmek','Pil elektrik enerjisi sağlar. Oyuncağın hareket etmesine yardım eder; rengini veya maddesini değiştirmez.'],
 ['Bir öğrenci kendi çizdiği resmi panoya asmak istiyor. Önce hangisini yapmalıdır?','Öğretmeninden izin alıp uygun yere asmalıdır.','Başkasının resmini sökmelidir.','Resmi arkadaşının defterine yapıştırmalıdır.','Ortak panoyu kullanırken izin istemek ve uygun yer seçmek hem çalışmasını hem başkalarının işlerini korur.']
];
function setRow(q,row,index){const choices=row.slice(1,4),shift=index%3;Object.assign(q,{question:row[0],choices:[...choices.slice(3-shift),...choices.slice(0,3-shift)],correctAnswer:shift,explanation:row[4]});}
function patch(q,row){q.question=row[0];q.choices=row.slice(1);q.correctAnswer=0;}
export function repairHayat1(tests,catalog,changes){
 const map={'sagligim-ve-guvenligim':'ailem-ve-toplum','ailem-ve-toplum':'sagligim-ve-guvenligim','yasadigim-yer-ve-ulkem':'bilim-teknoloji-ve-sanat','doga-ve-cevre':'yasadigim-yer-ve-ulkem','bilim-teknoloji-ve-sanat':'doga-ve-cevre'};
 const topics=catalog.grades[1].subjects.find(s=>s.id==='hayat-bilgisi').topics;
 for(const t of tests.filter(t=>t.classLevel===1&&t.subject==='hayat-bilgisi')){
  const from=t.topic,to=map[from]||from,topic=topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`1-sinif-hayat-bilgisi-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q),group=q.id.split('-')[3];
   if(group==='BENVEO'&&schoolFix[i])patch(q,schoolFix[i]);
   if(group==='SAĞLIĞ'&&familyFix[i])patch(q,familyFix[i]);
   if(group==='AILEMV'&&i===2)q.question='Vücudumuzu temiz tutmak için hangi davranış uygundur?';
   if(group==='AILEMV'&&i===7)q.question='Soğuk havada dışarı çıkarken ısınmamıza yardımcı olacak giysi seçimi hangisidir?';
   if(group==='AILEMV'&&i===8)q.question='Günlük yaşamımızda dinlenmek için hangi uyku alışkanlığı uygundur?';
   if(group==='AILEMV'&&i===9)q.question='Kalsiyum içeren içeceklerden hangisi seçeneklerde yer alır?';
   if(group==='DOĞAVE'&&i===0)q.question='Türkiye Cumhuriyeti’nin kurucusu kimdir?';
   if(group==='BILIM,'&&i===4){q.question='Dünya’yı gündüz aydınlatan gök cismi hangisidir?';q.choices=['Ay','Güneş','Bulut'];q.correctAnswer=1;}
   if(group==='BILIM,'&&i===6)q.question='Sarsıntı sırasında, güvenli bir iç mekânda kendimizi korumak için hangi hareketi yapmalıyız?';
   if(group==='YAŞADI')setRow(q,scienceArt[i],i);
   else q.explanation=solutions[group][i];
   changes.push({id:q.id,reasons:['verified_hayat_topic_and_explanation'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
