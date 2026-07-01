/* 4. sınıf ders testleri — görselsiz, genişletilebilir ortak veri üreticisi. */
(function () {
  const levels=["kolay","orta","zor"], tests=[];
  function q(text,choices,correct,explanation){return {question:text,choices,correctAnswer:choices.indexOf(correct),explanation,image:null};}
  function add(subject,subjectName,topic,topicName,difficulty,questions){
    const slug="4-sinif-"+subject+"-"+topic+"-"+difficulty+"-test-1";
    questions.forEach((x,i)=>{x.id=i+1;x.question="4. sınıf "+subjectName+" "+difficulty+" — "+topicName+": "+x.question;});
    tests.push({classLevel:4,subject,subjectName,topic,topicName,difficulty,testNumber:1,slug,pageUrl:"tests/"+slug+".html",questions});
  }
  function verbal(c,difficulty){
    const e=c.example, f=c.fact, w=c.wrong, a=c.action, r=c.result, term=c.term, meaning=c.meaning;
    const sets={
      kolay:[
        q("“"+term+"” ne demektir?",[meaning,"Konuyla ilgisiz bilgi","Rastgele tahmin","Yanlış uygulama"],meaning,"Doğru anlam: "+meaning+"."),
        q("Hangisi doğru bir örnektir?",[e,w,"Kuralı yok saymak","Konuyu değiştirmek"],e,"Doğru örnek “"+e+"” ifadesidir."),
        q("Aşağıdaki bilgilerden hangisi doğrudur?",[f,w,"Her durum aynıdır.","Kanıta gerek yoktur."],f,f),
        q("Hangisi yanlış bir uygulamadır?",[w,e,a,"Kurala uygun davranmak"],w,"Yanlış uygulama “"+w+"” ifadesidir."),
        q("“"+a+"” davranışının sonucu hangisidir?",[r,"Bilginin kaybolması","Konunun değişmesi","Çalışmanın yarım kalması"],r,"Beklenen sonuç: "+r+"."),
        q("Bu konuyla ilgili anahtar kavram hangisidir?",[term,"rastlantı","ilgisizlik","belirsizlik"],term,"Anahtar kavram “"+term+"”dir."),
        q("Doğru bilgi ile örnek hangi seçenekte birlikte verilmiştir?",[f+" — "+e,w+" — "+e,f+" — "+w,"Konu dışı — "+w],f+" — "+e,"Bilgi ve uygun örnek doğru eşleştirilmiştir."),
        q("Bu konuda yapılması gereken davranış hangisidir?",[a,w,"Bilgiyi gizlemek","Kuralları önemsememek"],a,"Uygun davranış “"+a+"”dır."),
        q("Hangi sonuç olumlu ve konuya uygundur?",[r,"Sorunun büyümesi","Kaynakların boşa kullanılması","Yanlış bilginin yayılması"],r,"Olumlu sonuç “"+r+"”dır."),
        q("Konuyu en iyi özetleyen ifade hangisidir?",[f,w,"Yalnız ayrıntılar önemlidir.","Her cevap tahminle bulunur."],f,"Ana düşünce doğru bilgide verilmiştir.")],
      orta:[
        q("“"+e+"” örneğinden hangi sonuca ulaşılır?",[f,w,"Konu hakkında sonuç çıkarılamaz.","Bütün kurallar geçersizdir."],f,"Örnek, doğru bilgiyi destekler."),
        q("Bir öğrenci “"+w+"” diyor. Bu ifade nasıl düzeltilmelidir?",[f,"Aynı bırakılmalıdır.","Konu dışı bilgi eklenmelidir.","Kanıtlar silinmelidir."],f,"Yanlış ifade doğru bilgiyle düzeltilir."),
        q("“"+term+"” kavramı ile “"+meaning+"” arasında nasıl bir ilişki vardır?",["Kavram ve anlam ilişkisi","Neden ve ilgisiz sonuç","İki zıt yanlış","Başlık ve sayfa numarası"],"Kavram ve anlam ilişkisi","İkinci ifade kavramın anlamını verir."),
        q("Doğru uygulama sırası hangisidir?",[a+" → "+r,w+" → "+r,r+" → "+a,"Konu dışı işlem → "+w],a+" → "+r,"Doğru davranış uygun sonucu doğurur."),
        q("Hangisi verilen kurala uygun değildir?",[w,e,a,f],w,"Kurala uymayan seçenek “"+w+"”dır."),
        q("Bir açıklamayı güçlendiren kanıt hangisidir?",[e,w,"Kişisel ve ilgisiz görüş","Ölçülmemiş tahmin"],e,"Konuya uygun örnek açıklamayı destekler."),
        q("“"+a+"” neden yapılmalıdır?",[r,"Yanlış bilgiyi artırmak","Sorunu gizlemek","Konuyu dağıtmak"],r,"Davranışın amacı olumlu sonuca ulaşmaktır."),
        q("Hangi karşılaştırma doğrudur?",[e+" doğrudur; "+w+" yanlıştır.",w+" doğrudur; "+e+" yanlıştır.","İki ifade de yanlıştır.","İki ifade konu dışıdır."],e+" doğrudur; "+w+" yanlıştır.","Örnek doğru, karşıt uygulama yanlıştır."),
        q("Bu konuda karar verirken önce neye bakılmalıdır?",[f,w,"Rastgele seçime","Konu dışı ayrıntıya"],f,"Karar doğru bilgiye dayanmalıdır."),
        q("En uygun çıkarım hangisidir?",[a+" yapıldığında "+r+".",w+" her zaman yararlıdır.","Kuralların etkisi yoktur.","Örnekler bilgi vermez."],a+" yapıldığında "+r+".","Davranış ile sonucu doğru ilişkilendirir.")],
      zor:[
        q("Bir durum hem “"+e+"” hem “"+a+"” içeriyor. En kapsamlı sonuç hangisidir?",[f+" Böylece "+r+".",w,"Konu değişmiştir.","Hiçbir sonuç çıkarılamaz."],f+" Böylece "+r+".","Bilgi, örnek ve sonuç birlikte değerlendirilmiştir."),
        q("Hangisi gerekçesiyle birlikte doğrudur?",[a+"; çünkü "+r+".",w+"; çünkü doğrudur.","Kural yoktur; çünkü örnek vardır.","Kanıt gereksizdir; çünkü tahmin yeterlidir."],a+"; çünkü "+r+".","Davranış ve gerekçesi uyumludur."),
        q("“"+w+"” görüşünün hatası nedir?",[f+" bilgisiyle çelişmesi","Çok fazla kanıt içermesi","Doğru örnek vermesi","Olumlu sonuç göstermesi"],f+" bilgisiyle çelişmesi","Yanlış görüş temel bilgiyle çelişir."),
        q("Yeni bir durumda uygulanabilecek en iyi ilke hangisidir?",[f,w,"Her koşulda rastgele davranmak","Sonucu kanıtsız değiştirmek"],f,"Doğru bilgi yeni durumlara aktarılabilir."),
        q("Bir sorun “"+a+"” yoluyla çözülüyor. Çözümün başarılı olduğunu ne gösterir?",[r,w,"Sorunun büyümesi","Bilginin azalması"],r,"Başarı uygun sonuçla anlaşılır."),
        q("Hangi seçenek neden-sonuç ilişkisini ters kurmuştur?",[r+" olduğu için "+a,w+" olduğu için sorun büyüdü",a+" yapıldığı için "+r,f+" olduğu için doğru karar verildi"],r+" olduğu için "+a,"Bu seçenekte sonuç nedenmiş gibi verilmiştir."),
        q("Kavram haritasının merkezine hangisi yazılmalıdır?",[term,w,"Konu dışı ayrıntı","Rastgele sayı"],term,"Bütün bilgiler anahtar kavramla ilişkilidir."),
        q("İki görüşten hangisi kanıta daha uygundur?",["“"+f+"” diyen öğrenci","“"+w+"” diyen öğrenci","Kanıt kullanmayan öğrenci","Konuyu değiştiren öğrenci"],"“"+f+"” diyen öğrenci","Doğru bilgi kanıtlarla uyumludur."),
        q("Uygulama geliştirilmek istenirse ne yapılmalıdır?",[a+" ve sonucu değerlendirmek",w,"Kuralları kaldırmak","Yanlış bilgiyi çoğaltmak"],a+" ve sonucu değerlendirmek","Uygulama sonuçları değerlendirilerek geliştirilir."),
        q("Konuyla ilgili genel yargı hangisidir?",[f+" Uygun davranış "+r+".",w,"Örnekler gereksizdir.","Her yanlış sonuç doğrudur."],f+" Uygun davranış "+r+".","Bilgi ve sonuç birlikte doğru bir genel yargı oluşturur.")]
    };
    return sets[difficulty];
  }

  const verbalSubjects={
    turkce:{name:"Türkçe",topics:{
      "okuma-anlama":{name:"Okuma Anlama",term:"ana fikir",meaning:"metnin vermek istediği temel düşünce",fact:"Başlık, konu ve ana fikir metinle uyumlu olmalıdır.",example:"Metindeki olayları oluş sırasına göre anlatmak",wrong:"Metinde olmayan bilgiyi varmış gibi söylemek",action:"metni dikkatle okuyup önemli ayrıntıları belirlemek",result:"metni doğru anlamak"},
      "soz-varligi":{name:"Söz Varlığı",term:"eş anlamlı",meaning:"yazılışları farklı, anlamları aynı veya yakın sözcükler",fact:"Sözcüğün anlamı cümledeki kullanımına göre belirlenebilir.",example:"cevap — yanıt",wrong:"uzun — kısa sözcüklerini eş anlamlı saymak",action:"bilinmeyen sözcüğün anlamını sözlükten kontrol etmek",result:"sözcükleri doğru anlamda kullanmak"},
      "cumle-bilgisi":{name:"Cümle Bilgisi",term:"cümle",meaning:"duygu, düşünce veya yargı bildiren söz dizisi",fact:"Kurallı cümlede yüklem genellikle sondadır.",example:"Çocuklar bahçede neşeyle oynadı.",wrong:"Bahçede neşeyle çocuklar.",action:"sözcükleri anlamlı ve kurallı sıraya koymak",result:"açık ve anlaşılır cümle kurmak"},
      "yazim-kurallari":{name:"Yazım Kuralları",term:"özel ad",meaning:"tek bir varlığı karşılayan ad",fact:"Kişi ve yer adları büyük harfle başlar.",example:"Ankara Türkiye'nin başkentidir.",wrong:"ayşe pazartesi günü izmire gitti.",action:"özel adları ve cümle başlangıçlarını büyük harfle yazmak",result:"yazım yanlışlarını önlemek"},
      "noktalama-isaretleri":{name:"Noktalama İşaretleri",term:"soru işareti",meaning:"soru bildiren cümlelerin sonuna konan işaret",fact:"Tamamlanmış cümlelerin sonunda uygun noktalama işareti bulunur.",example:"Bugün bizimle gelir misin?",wrong:"Eyvah, otobüsü kaçırdık.",action:"cümlenin anlamına uygun noktalama işaretini seçmek",result:"metnin doğru ve kolay okunmasını sağlamak"}}},
    "hayat-bilgisi":{name:"Hayat Bilgisi",topics:{
      "birey-ve-toplum":{name:"Birey ve Toplum",term:"sorumluluk",meaning:"kişinin üzerine düşen görevi yerine getirmesi",fact:"Farklılıklara saygı toplumsal uyumu güçlendirir.",example:"Grup çalışmasında görevini zamanında tamamlamak",wrong:"Arkadaşının düşüncesiyle alay etmek",action:"hakları kullanırken başkalarının haklarına saygı göstermek",result:"adil ve huzurlu bir ortam oluşturmak"},
      "saglikli-yasam":{name:"Sağlıklı Yaşam",term:"dengeli beslenme",meaning:"farklı besin gruplarından yeterli miktarda tüketme",fact:"Uyku, hareket, temizlik ve beslenme sağlığı birlikte etkiler.",example:"Kahvaltıda yumurta, peynir, sebze ve ekmek tüketmek",wrong:"Her öğünde yalnız şekerli yiyecek yemek",action:"düzenli hareket edip kişisel temizliğe dikkat etmek",result:"beden ve zihin sağlığını korumak"},
      "guvenli-yasam":{name:"Güvenli Yaşam",term:"acil durum",meaning:"hızlı ve doğru davranmayı gerektiren tehlikeli durum",fact:"Tehlike anında sakin kalıp güvenilir yetişkinden yardım istenir.",example:"Yaya geçidinde ışıkları kontrol ederek karşıya geçmek",wrong:"Tanımadığı kişinin aracına binmek",action:"riskleri önceden fark edip güvenlik kurallarına uymak",result:"kazaları ve zararları azaltmak"},
      "doga-ve-cevre":{name:"Doğa ve Çevre",term:"geri dönüşüm",meaning:"atıkların yeniden kullanılabilir maddeye dönüştürülmesi",fact:"Doğal kaynakları ölçülü kullanmak çevreyi korur.",example:"Kâğıt, cam ve plastiği ayrı kutulara atmak",wrong:"Atıkları dereye bırakmak",action:"su ve elektriği gereksiz yere kullanmamak",result:"kaynakları gelecek kuşaklara aktarmak"}}},
    "fen-bilimleri":{name:"Fen Bilimleri",topics:{
      "yer-kabugu-ve-dunyanin-hareketleri":{name:"Yer Kabuğu ve Dünya'nın Hareketleri",term:"dönme",meaning:"Dünya'nın kendi ekseni çevresindeki hareketi",fact:"Dünya'nın kendi ekseni etrafında dönmesi gece ve gündüzü oluşturur.",example:"Güneş'in gün içinde farklı konumlarda görünmesi",wrong:"Mevsimlerin Dünya'nın günlük dönüşüyle oluştuğunu söylemek",action:"Dünya'nın hareketlerini model üzerinde incelemek",result:"günlük ve yıllık değişimleri açıklamak"},
      "besinlerimiz":{name:"Besinlerimiz",term:"besin içeriği",meaning:"besinlerde bulunan protein, karbonhidrat, yağ, vitamin, su ve mineraller",fact:"Farklı besin içerikleri vücutta farklı görevler üstlenir.",example:"Büyüme için protein içeren besinler tüketmek",wrong:"Sağlık için yalnız tek tür besin yemek",action:"taze ve çeşitli besinleri uygun miktarda seçmek",result:"dengeli ve sağlıklı beslenmek"},
      "kuvvetin-etkileri":{name:"Kuvvetin Etkileri",term:"kuvvet",meaning:"cisimlere uygulanan itme veya çekme",fact:"Kuvvet cismin hızını, yönünü veya şeklini değiştirebilir.",example:"Frene basınca bisikletin yavaşlaması",wrong:"Kuvvetin hareket üzerinde etkisi olmadığını söylemek",action:"itme ve çekmenin etkilerini güvenli deneyle gözlemek",result:"hareket değişikliklerini açıklamak"},
      "maddenin-ozellikleri":{name:"Maddenin Özellikleri",term:"madde",meaning:"kütlesi ve hacmi olan varlık",fact:"Maddeler hâl, sertlik, esneklik ve suda yüzme gibi özelliklerle tanınabilir.",example:"Suyun bulunduğu kabın şeklini alması",wrong:"Bütün maddelerin aynı özellikte olduğunu söylemek",action:"maddeleri gözlenebilir özelliklerine göre sınıflandırmak",result:"uygun kullanım alanını belirlemek"},
      "aydinlatma-ve-ses-teknolojileri":{name:"Aydınlatma ve Ses Teknolojileri",term:"ışık kirliliği",meaning:"gereksiz ve yanlış yönlendirilmiş yapay ışık",fact:"Uygun aydınlatma göz sağlığını korur ve enerji tasarrufu sağlar.",example:"Çalışma masasını yeterli ve doğru yönden aydınlatmak",wrong:"Gereksiz lambaları gece boyunca açık bırakmak",action:"ışık ve ses araçlarını amacına uygun kullanmak",result:"sağlığı ve çevreyi korumak"},
      "insan-ve-cevre":{name:"İnsan ve Çevre",term:"çevre kirliliği",meaning:"doğal ortamın zararlı atık ve etkilerle bozulması",fact:"İnsan faaliyetleri çevreyi olumlu veya olumsuz etkileyebilir.",example:"Ağaçlandırma çalışmasına katılmak",wrong:"Pilleri evsel atıklarla birlikte çöpe atmak",action:"atıkları azaltıp canlıların yaşam alanlarını korumak",result:"sürdürülebilir bir çevre oluşturmak"},
      "basit-elektrik-devreleri":{name:"Basit Elektrik Devreleri",term:"kapalı devre",meaning:"elektrik akımının kesintisiz dolaşabildiği devre",fact:"Pil, ampul, kablo ve anahtar basit devrenin elemanlarıdır.",example:"Kablolar doğru bağlanınca ampulün yanması",wrong:"Devrede bağlantı olmadan ampulün yanacağını söylemek",action:"devre elemanlarını doğru ve güvenli biçimde bağlamak",result:"çalışan bir elektrik devresi kurmak"}}},
    "sosyal-bilgiler":{name:"Sosyal Bilgiler",topics:{
      "birey-ve-toplum":{name:"Birey ve Toplum",term:"kimlik",meaning:"kişiyi tanımlayan özelliklerin bütünü",fact:"İlgi, yetenek ve özellikler bireyden bireye farklılık gösterebilir.",example:"Farklı düşünceleri saygıyla dinlemek",wrong:"Herkesin aynı yeteneğe sahip olduğunu düşünmek",action:"kendi özelliklerini tanıyıp farklılıklara saygı göstermek",result:"öz güveni ve toplumsal uyumu geliştirmek"},
      "kultur-ve-miras":{name:"Kültür ve Miras",term:"kültürel miras",meaning:"geçmiş kuşaklardan kalan ortak değerler",fact:"Sözlü tarih geçmişle ilgili bilgi edinme yollarından biridir.",example:"Aile büyüğünden geçmiş bayramları dinleyip kaydetmek",wrong:"Tarihî eserleri korumamak",action:"kültürel değerleri araştırıp özenle korumak",result:"geçmiş ile gelecek arasında bağ kurmak"},
      "insanlar-yerler-ve-cevreler":{name:"İnsanlar, Yerler ve Çevreler",term:"kroki",meaning:"bir yerin kuş bakışı ve kabataslak çizimi",fact:"Yönler ve semboller çevremizdeki yerleri tarif etmeyi kolaylaştırır.",example:"Okulun yerini krokide sembolle göstermek",wrong:"Kuzey ile güneyi aynı yön saymak",action:"yön ve konum bilgilerini doğru kullanmak",result:"çevrede güvenli biçimde yol bulmak"},
      "bilim-teknoloji-ve-toplum":{name:"Bilim, Teknoloji ve Toplum",term:"teknoloji",meaning:"insan ihtiyaçlarına çözüm üreten araç ve yöntemler",fact:"Teknolojik ürünler zaman içinde ihtiyaçlara göre değişir.",example:"İnternette kişisel bilgileri paylaşmamak",wrong:"Her internet bilgisini doğru kabul etmek",action:"teknolojiyi güvenli, bilinçli ve ölçülü kullanmak",result:"yarar sağlarken risklerden korunmak"},
      "uretim-dagitim-ve-tuketim":{name:"Üretim, Dağıtım ve Tüketim",term:"ihtiyaç",meaning:"yaşamı sürdürmek için gerekli olan şey",fact:"Bilinçli tüketici ihtiyaçlarını önceliklendirip bütçesini planlar.",example:"Alışverişten önce ihtiyaç listesi hazırlamak",wrong:"Son kullanma tarihine bakmadan ürün almak",action:"ürünün fiyatını, kalitesini ve etiketini incelemek",result:"kaynakları bilinçli kullanmak"},
      "etkin-vatandaslik":{name:"Etkin Vatandaşlık",term:"katılım",meaning:"ortak karar ve çalışmalara sorumlulukla dahil olma",fact:"Çocukların hakları yanında sorumlulukları da vardır.",example:"Sınıf başkanlığı seçiminde oy kullanmak",wrong:"Ortak kuralları yalnız başkalarının görevi saymak",action:"görüşünü saygıyla paylaşarak ortak kararlara katılmak",result:"demokratik yaşamı güçlendirmek"},
      "kuresel-baglantilar":{name:"Küresel Bağlantılar",term:"ülke",meaning:"sınırları ve yönetimi olan bağımsız toprak bütünü",fact:"Ülkeler kültür, ürün ve bilgi alışverişi yapar.",example:"Farklı ülkelerin çocuk oyunlarını karşılaştırmak",wrong:"Bütün kültürlerin tamamen aynı olduğunu söylemek",action:"farklı kültürleri merak edip saygıyla tanımak",result:"dünya kültürleriyle olumlu bağ kurmak"}}},
    ingilizce:{name:"İngilizce",topics:{
      "classroom-rules":{name:"Classroom Rules",term:"Be quiet, please.",meaning:"Lütfen sessiz ol.",fact:"We use classroom rules to learn safely and respectfully.",example:"Raise your hand before speaking.",wrong:"Run and shout during the lesson.",action:"follow the teacher's instructions",result:"create a safe classroom"},
      nationality:{name:"Nationality",term:"nationality",meaning:"milliyet",fact:"We ask “Where are you from?” to learn someone's country.",example:"I am from Türkiye. I am Turkish.",wrong:"I am Türkiye years old.",action:"use country and nationality words correctly",result:"introduce people clearly"},
      "cartoon-characters":{name:"Cartoon Characters",term:"can",meaning:"-ebilmek, yapabilmek",fact:"We use “can” and “can't” to talk about abilities.",example:"The hero can fly but can't swim.",wrong:"She can to jump high.",action:"describe a character's abilities",result:"make correct ability sentences"},
      "free-time":{name:"Free Time",term:"free time",meaning:"boş zaman",fact:"We use like and dislike to talk about favourite activities.",example:"I like riding my bike after school.",wrong:"I likes play chess.",action:"tell friends about favourite activities",result:"communicate likes and dislikes"},
      "my-day":{name:"My Day",term:"quarter past",meaning:"çeyrek geçiyor",fact:"Daily routines are often told with clock times.",example:"I get up at seven o'clock.",wrong:"I breakfast at eight o'clock.",action:"put daily activities in time order",result:"describe a daily routine clearly"},
      "fun-with-science":{name:"Fun with Science",term:"experiment",meaning:"deney",fact:"Simple science instructions use action words such as mix, pour and observe.",example:"Pour the water and observe the colour.",wrong:"Drink the experiment mixture.",action:"follow safe experiment instructions",result:"observe changes safely"}}}
  };
  Object.keys(verbalSubjects).forEach(subject=>{const s=verbalSubjects[subject];Object.keys(s.topics).forEach(topic=>levels.forEach(d=>add(subject,s.name,topic,s.topics[topic].name,d,verbal(s.topics[topic],d))))});

  function numQ(text,answer,step,explanation){const a=Number(answer), choices=[a,a+step,a-step,a+2*step].map(String);return q(text,choices,String(a),explanation||("Doğru sonuç "+a+"dır."));}
  const mathNames={"dogal-sayilar":"Doğal Sayılar",toplama:"Toplama",cikarma:"Çıkarma",carpma:"Çarpma",bolme:"Bölme",kesirler:"Kesirler","geometrik-cisimler":"Geometrik Cisimler","uzunluk-olcme":"Uzunluk Ölçme","cevre-olcme":"Çevre Ölçme","alan-olcme":"Alan Ölçme",tartma:"Tartma","sivi-olcme":"Sıvı Ölçme",veri:"Veri"};
  function math(topic,difficulty){const k={kolay:1,orta:2,zor:3}[difficulty], out=[];for(let i=1;i<=10;i++){
    if(topic==="dogal-sayilar"){const n=12000+k*7000+i*431, ans=Math.floor(n/100)%10*100;out.push(numQ(n+" sayısının yüzler basamağındaki rakamın basamak değeri kaçtır?",ans,100,"Yüzler basamağındaki rakam 100 ile çarpılır."));}
    else if(topic==="toplama"){const a=1200*k+i*137,b=600*k+i*83;out.push(numQ(a+" + "+b+" işleminin sonucu kaçtır?",a+b,10,"Toplananlar basamaklarına göre toplanır."));}
    else if(topic==="cikarma"){const b=350*k+i*47,a=b+900*k+i*61;out.push(numQ(a+" − "+b+" işleminin sonucu kaçtır?",a-b,10,"Eksilen sayıdan çıkan sayı çıkarılır."));}
    else if(topic==="carpma"){const a=12*k+i,b=3+k+(i%4);out.push(numQ(a+" × "+b+" işleminin sonucu kaçtır?",a*b,b,"Çarpma, eşit grupların toplamını kısa yoldan bulur."));}
    else if(topic==="bolme"){const b=2+k+(i%4),ans=8*k+i,a=b*ans;out.push(numQ(a+" ÷ "+b+" işleminin sonucu kaçtır?",ans,1,"Bölüm "+ans+"dir; çünkü "+ans+" × "+b+" = "+a+"."));}
    else if(topic==="kesirler"){const den=4+(i%3),whole=den*(3*k+i),pay=1+(i%(den-1)),ans=whole/den*pay;out.push(numQ(whole+" sayısının "+pay+"/"+den+"'ü kaçtır?",ans,whole/den,"Önce sayı paydaya bölünür, sonra pay ile çarpılır."));}
    else if(topic==="uzunluk-olcme"){const m=3*k+i,cm=25*(i%4);out.push(numQ(m+" m "+cm+" cm kaç santimetredir?",m*100+cm,25,"1 metre 100 santimetredir."));}
    else if(topic==="cevre-olcme"){const a=4*k+i,b=3*k+(i%5)+1;out.push(numQ("Kenarları "+a+" cm ve "+b+" cm olan dikdörtgenin çevresi kaç santimetredir?",2*(a+b),2,"Dikdörtgenin çevresi 2 × (uzun kenar + kısa kenar)dır."));}
    else if(topic==="alan-olcme"){const a=3*k+i,b=2+k+(i%4);out.push(numQ("Kenarları "+a+" birim ve "+b+" birim olan dikdörtgen kaç birimkaredir?",a*b,b,"Alan, iki kenar uzunluğunun çarpımıdır."));}
    else if(topic==="tartma"){const kg=2*k+i,g=250*(i%4);out.push(numQ(kg+" kg "+g+" g kaç gramdır?",kg*1000+g,250,"1 kilogram 1000 gramdır."));}
    else if(topic==="sivi-olcme"){const l=2*k+i,ml=250*(i%4);out.push(numQ(l+" L "+ml+" mL kaç mililitredir?",l*1000+ml,250,"1 litre 1000 mililitredir."));}
    else if(topic==="veri"){const a=5*k+i,b=7*k+2*i,c=4*k+3*i;out.push(numQ("Bir tabloda pazartesi "+a+", salı "+b+", çarşamba "+c+" kitap okunmuştur. Toplam kaç kitap okunmuştur?",a+b+c,2,"Üç güne ait veriler toplanır."));}
    else if(topic==="geometrik-cisimler"){const shapes=["Küp","Kare prizma","Dikdörtgenler prizması","Üçgen prizma"],correct=shapes[i%4];out.push(q(i+" numaralı kartta adı verilen geometrik cisim hangisidir: “"+correct+"”?",[correct,"Küre","Silindir","Koni"],correct,"Doğru geometrik cisim “"+correct+"”dir."));}
  }return out;}
  Object.keys(mathNames).forEach(topic=>levels.forEach(d=>add("matematik","Matematik",topic,mathNames[topic],d,math(topic,d))));
  window.TESTCOZ_TESTS=(window.TESTCOZ_TESTS||[]).concat(tests);
})();
