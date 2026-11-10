// Authored repairs: retain test routes and question IDs. Not a certification of the full bank.
// Each row: prompt, correct answer, plausible distractors, explanation.
export const repairs = [];
import {naturalNumbersEasy,naturalNumbersMedium} from './natural-numbers-repairs.mjs';
import {fractionsEasy,fractionsMedium} from './fractions-repairs.mjs';
import {additionEasy,additionMedium} from './addition-repairs.mjs';
import {subtractionEasy,subtractionMedium} from './subtraction-repairs.mjs';
import {geminiMultiplicationEasy} from './gemini-multiplication-repairs.mjs';
import {divisionEasy,divisionMedium} from './gemini-division-repairs.mjs';
import {multiplicationMedium} from './gemini-multiplication-medium.mjs';
import {lengthEasy,lengthMedium} from './gemini-length-repairs.mjs';
import {schoolEasy,schoolMedium} from './gemini-school-repairs.mjs';
import {safetyEasy} from './gemini-safety-repairs.mjs';
import {safetyMediumOne,safetyEasyTwo} from './gemini-safety-more-repairs.mjs';
import {safetyMediumTwo,placeEasyOne} from './gemini-community-safety-repairs.mjs';
import {placeMediumOne,placeEasyTwo} from './gemini-community-more-repairs.mjs';
import {safetyHardTwo,safetyHardThree} from './gemini-hard-safety-repairs.mjs';
function test(grade, subject, topic, difficulty, number, rows, reason) {
  rows.forEach((row,index)=>repairs.push({slug:`${grade}-sinif-${subject}-${topic}-${difficulty}-test-${number}`,index, row, reason}));
}
test(4, 'matematik', 'dogal-sayilar', 'kolay', 1, naturalNumbersEasy, 'replace_repeated_place_value_template_with_varied_fundamentals');
test(4, 'matematik', 'dogal-sayilar', 'orta', 1, naturalNumbersMedium, 'replace_repeated_place_value_template_with_varied_application');
test(4, 'matematik', 'toplama', 'kolay', 1, additionEasy, 'replace_repeated_addition_template_with_varied_explained_questions');
test(4, 'matematik', 'toplama', 'orta', 1, additionMedium, 'replace_repeated_addition_template_with_varied_applications');
test(4,'matematik','carpma','kolay',1,geminiMultiplicationEasy,'reviewed_gemini_draft_replaces_repeated_multiplication_template');
test(4,'matematik','bolme','kolay',1,divisionEasy,'reviewed_gemini_draft_replaces_repeated_division_template');
test(4,'matematik','bolme','orta',1,divisionMedium,'reviewed_gemini_draft_replaces_repeated_division_template');
test(1,'hayat-bilgisi','ben-ve-okulum','kolay',1,schoolEasy,'reviewed_gemini_grade_one_school_questions');
test(1,'hayat-bilgisi','ben-ve-okulum','orta',1,schoolMedium,'reviewed_gemini_grade_one_school_questions');
// Revised from a Gemini draft; checked against official first-aid guidance.
repairs.push({slug:'1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1',index:0,row:[
 'Okul bahçesinde düşen arkadaşın yaralandı. Ne yapmalısın?',
 'Öğretmene hemen haber vermeliyim.',
 'Arkadaşımı hemen koşmaya zorlamalıyım.',
 'Onu görmezden gelip oyunuma dönmeliyim.',
 'Yaralanan arkadaşın için hemen bir yetişkine haber ver. Etrafta tehlike yoksa onu gereksiz yere hareket ettirmeye çalışma.'
],reason:'reviewed_gemini_grade_one_school_hard_candidate',metadata:{subSkill:'Yaralanmada yardım isteme',questionType:'cikarim'}});
test(1,'hayat-bilgisi','sagligim-ve-guvenligim','kolay',1,safetyEasy,'reviewed_gemini_grade_one_safety_questions');
test(1,'hayat-bilgisi','sagligim-ve-guvenligim','orta',1,safetyMediumOne,'reviewed_gemini_grade_one_safety_questions');
test(2,'hayat-bilgisi','sagligim-ve-guvenligim','kolay',1,safetyEasyTwo,'reviewed_gemini_grade_two_safety_questions');
test(2,'hayat-bilgisi','sagligim-ve-guvenligim','orta',1,safetyMediumTwo,'reviewed_gemini_grade_two_safety_questions');
test(1,'hayat-bilgisi','yasadigim-yer-ve-ulkem','kolay',1,placeEasyOne,'reviewed_gemini_grade_one_community_questions');
test(1,'hayat-bilgisi','yasadigim-yer-ve-ulkem','orta',1,placeMediumOne,'reviewed_gemini_grade_one_community_questions');
test(2,'hayat-bilgisi','yasadigim-yer-ve-ulkem','kolay',1,placeEasyTwo,'reviewed_gemini_grade_two_community_questions');
test(2,'hayat-bilgisi','sagligim-ve-guvenligim','zor',1,safetyHardTwo,'reviewed_gemini_grade_two_safety_questions');
test(3,'hayat-bilgisi','sagligim-ve-guvenligim','zor',1,safetyHardThree,'reviewed_gemini_grade_three_safety_questions');
// Individually rewritten after identifying an incorrect grade label and generic wording.
for(const [topic,difficulty,index,row,subSkill] of [
 ['sagligim-ve-guvenligim','kolay',6,['Yaya geçidine gelen Deniz, ışığın kırmızı olduğunu görüyor. Güvenli geçiş için ne yapmalıdır?','Kaldırımda bekleyip yeşil ışıkta yolu kontrol etmek','Kırmızı ışıkta araçların arasından geçmek','Geçidin yanında yola koşmak','Kırmızı yaya ışığında kaldırımda beklenir. Yeşil yandığında da geçmeden önce araçların durduğunu kontrol etmek güvenliğe yardımcı olur.'],'Yaya güvenliği'],
 ['ailem-ve-toplum','kolay',6,['Apartmandaki ortak oyun alanını kullanan çocuklar hangi davranışla başkalarının hakkına saygı gösterir?','Oyundan sonra alanı temiz bırakmak','Oyuncakları başkaları kullanamasın diye saklamak','Çöpleri oyun alanında bırakmak','Ortak alanı temiz bırakmak, alanı daha sonra kullanacak kişilerin de yararlanmasına yardımcı olur.'],'Ortak alanların kullanımı'],
 ['ailem-ve-toplum','orta',3,['Ece evde sofrayı hazırlamayı üstlendi. Oyun oynamak da istiyor. Hem sorumluluğunu yerine getirmek hem oyun oynamak için ne yapabilir?','Sofrayı hazırladıktan sonra oyun oynayabilir','Görevini haber vermeden bırakabilir','Sofrayı başkasının hazırlamasını bekleyebilir','Üstlendiği görevi tamamlamak aile içindeki iş bölümüne katkı sağlar; ardından oyununa zaman ayırabilir.'],'Ailede sorumluluk'],
 ['yasadigim-yer-ve-ulkem','kolay',6,['Bir müzeyi gezen öğrencilerden hangisi tarihî eserin korunmasına yardımcı olur?','Eserlere dokunmadan görevlilerin uyarılarına uyan öğrenci','Eserin üzerine adını yazan öğrenci','Eserden küçük bir parça koparan öğrenci','Müzedeki kurallara uymak ve eserlere zarar vermemek, tarihî eserlerin gelecek kuşaklara ulaşmasına yardımcı olur.'],'Tarihî eserleri koruma'],
 ['yasadigim-yer-ve-ulkem','orta',3,['Mahallesindeki tarihî çeşmenin üzerine yazı yazıldığını gören Selin ne yapabilir?','Çeşmeye dokunmadan durumu bir yetişkine veya ilgili görevlilere bildirebilir','Yazıyı çoğaltıp arkadaşlarına gösterebilir','Çeşmeden bir parça koparabilir','Tarihî yapılara zarar vermemek ve görülen zararı sorumlu kişilere bildirmek, ortak kültürel mirasın korunmasına katkı sağlar.'],'Kültürel mirası koruma'],
 ['doga-ve-cevre','kolay',6,['Parkta bir kuş yuvası gören çocuk, canlıların yaşam alanını korumak için ne yapmalıdır?','Yuvaya dokunmadan uzaktan gözlemlemelidir','Yuvayı yerinden indirip eve götürmelidir','Yuvaya taş atmalıdır','Yuvaya dokunmadan gözlem yapmak, kuşların barındığı alana zarar vermemeye yardımcı olur.'],'Canlıların yaşam alanları'],
 ['doga-ve-cevre','orta',3,['Okul bahçesine dikilen genç fidanın büyümesine yardımcı olmak isteyen öğrenciler ne yapabilir?','Fidanın ihtiyacına göre sulanmasına yardımcı olabilirler','Dallarını oyun için koparabilirler','Toprağını dağıtıp köklerini açıkta bırakabilirler','Fidanlar büyümek için uygun koşullara ve suya ihtiyaç duyar. Dallarını ve köklerini korumak da bitkiye zarar vermemeye yardımcı olur.'],'Bitkileri koruma'],
 ['bilim-teknoloji-ve-sanat','kolay',6,['Mert bir elektrikli cihazın kablosunun hasarlı olduğunu fark etti. Ne yapmalıdır?','Cihaza dokunmadan durumu bir yetişkine bildirmelidir','Hasarlı kabloyu elle düzeltmeye çalışmalıdır','Cihazı kullanmaya devam etmelidir','Hasarlı elektrik kablosu tehlikeli olabilir. Cihaza dokunmadan bir yetişkine haber vermek güvenli bir davranıştır.'],'Teknoloji araçlarında güvenlik'],
 ['bilim-teknoloji-ve-sanat','orta',3,['Bir öğrenci sunumunda internetten bulduğu bir görseli kullanmak istiyor. Hangi davranış daha uygundur?','Kullanım iznini kontrol edip kaynağını belirtmek','Görseli kendisi çizmiş gibi göstermek','Kaynağı saklayıp her görselin serbest olduğunu varsaymak','Bir görselin kullanım koşullarını kontrol etmek ve kaynağını belirtmek, başkalarının emeğine saygı göstermeye yardımcı olur.'],'Dijital içerik ve kaynak']
]) repairs.push({slug:`3-sinif-hayat-bilgisi-${topic}-${difficulty}-test-1`,index,row,reason:'reviewed_grade_three_topic_questions',metadata:{subSkill,questionType:'cikarim'}});
// Rebuild the remaining questions in this test after identifying mismatched causes,
// repeated water scenarios and visuals that disclosed or contradicted answers.
for(const [index,row,subSkill] of [
 [0,['Piknikten sonra yerde ambalajlar kaldığını gören çocuklar çevreyi korumak için ne yapabilir?','Ambalajları toplayıp uygun atık kutusuna bırakabilirler','Ambalajları rüzgârın taşımasını bekleyebilirler','Ambalajları çalıların arasına saklayabilirler','Atıkları yerde bırakmamak çevrenin kirlenmesini azaltmaya yardımcı olur. Toplanan ambalajlar uygun kutulara bırakılmalıdır.'],'Çevre temizliği'],
 [1,['Sınıfta kâğıt ve plastik için ayrı atık kutuları var. Boş bir kâğıt kutu hangi kutuya atılmalıdır?','Kâğıt atık kutusuna','Plastik atık kutusuna','Genel çöp kutusuna','Atığın yapıldığı malzeme belirlenir; kâğıt kutu, bunun için ayrılmış kâğıt atık kutusuna bırakılır.'],'Atıkları ayırma'],
 [2,['Parkta bir musluğun açık kaldığını ve suyun boşa aktığını gören Deniz ne yapabilir?','Güvenliyse musluğu kapatıp durumu bir görevliye bildirebilir','Musluğu daha fazla açıp uzaklaşabilir','Suyu boşa akmaya bırakıp kimseye haber vermeyebilir','Güvenliyse musluğu kapatmak gereksiz su kaybını durdurur; görevliye haber vermek sorunun incelenmesine yardımcı olur.'],'Su kaynaklarını koruma'],
 [4,['Bir çocuk parkta tanımadığı bir sıvının yere döküldüğünü görüyor. Ne yapmalıdır?','Sıvıya dokunmadan güvenilir bir yetişkine veya görevliye haber vermelidir','Sıvıyı eliyle temizlemelidir','Sıvının ne olduğunu anlamak için koklamalıdır','Tanımadığı bir maddeye dokunmamak ve durumu yetişkine bildirmek, olası bir tehlikeden uzak durmaya yardımcı olur.'],'Güvenli yardım isteme'],
 [5,['Bir göletin çevresindeki bitkiler ve canlılar neden korunmalıdır?','Çünkü gölet ve çevresi canlılar için yaşam alanıdır','Çünkü her gölette yalnızca bir tür canlı yaşar','Çünkü canlılar suya ve barınağa ihtiyaç duymaz','Gölet ve çevresi farklı canlılara su, besin ve barınak sağlayabilir. Bu alanı korumak yaşam koşullarını korumaya yardımcı olur.'],'Yaşam alanlarını koruma'],
 [6,['Gündüz, güneş ışığıyla yeterince aydınlanan boş bir sınıfta lambalar yanıyor. Gereksiz enerji kullanımını azaltmak için ne yapılabilir?','Lambalar kapatılabilir','Lambalara ek olarak diğer ışıklar da açılabilir','Pencereler kapatılıp ışıklar açık bırakılabilir','Yeterli gün ışığı varsa ve sınıfta kimse yoksa lambaları kapatmak gereksiz elektrik tüketimini azaltır.'],'Elektrik tasarrufu'],
 [7,['Sağlam bir karton kutuyu hemen çöpe atmak yerine kalemlerini düzenlemek için kullanan öğrenci ne yapmış olur?','Kutuyu yeniden kullanmış olur','Kutuyu mutlaka yeni bir ürüne dönüştürmüş olur','Kutunun neden yapıldığını değiştirmiş olur','Sağlam bir eşyayı başka bir amaçla yeniden kullanmak, onu hemen atmak yerine daha uzun süre değerlendirmektir.'],'Yeniden kullanım'],
 [8,['Bir sınıfta pazartesi 12, salı 7 yaprak kâğıt atıldı. Salı günü kaç yaprak daha az kâğıt atılmıştır?','5 yaprak','7 yaprak','12 yaprak','İki gün arasındaki fark 12 − 7 = 5 yapraktır. Ölçüm, farkı gösterir; tek başına azalmanın nedenini açıklamaz.'],'Çevre verisini karşılaştırma'],
 [9,['Evi okula yakın olan bir öğrenci, güvenli bir yürüyüş yolu ve yetişkininin uygun bulduğu koşullar varsa yürümeyi seçiyor. Bu seçim nasıl bir katkı sağlayabilir?','Araç kullanımını azaltarak hava kirliliğinin azalmasına katkı sağlayabilir','Yürümek tüm hava kirliliğini tek başına bitirir','Yürümek havayı temizlemek için çevredeki araçları hemen durdurur','Güvenli koşullarda kısa mesafede araç yerine yürümek, araçtan kaynaklanan emisyonların azalmasına katkı sağlayabilir; tek başına bütün kirliliği ortadan kaldırmaz.'],'Ulaşım ve çevre']
]) repairs.push({slug:'3-sinif-hayat-bilgisi-doga-ve-cevre-orta-test-1',index,row,reason:'reviewed_grade_three_environment_test',metadata:{subSkill,questionType:'cikarim'}});
// Individually reviewed P0/P1 repairs in grade 3 medium; untouched records keep their original choices.
for(const [index,row,subSkill,questionType] of [
 [1,['Bisiklete binmeden önce İpek kaskının kayışını bağlıyor; Can ise kayışı açık bırakıyor. Hangisi kaskı daha güvenli kullanır?', 'İpek', 'Can', 'İkisi de', 'Kaskın başa uygun oturması ve kayışının bağlanması düşme durumunda başı korumaya yardımcı olur.'],'Kask kullanımı','gorsel-okuma'],
 [4,['Hangi durumda 112 Acil Çağrı Merkezi aranmalıdır?', 'Binada görülen yangın için acil yardım gerektiğinde', 'Bir oyunun kuralları merak edildiğinde', 'Okul çantasındaki kalem bulunamadığında', '112, yangın gibi acil durumlarda yardım istemek için kullanılır; gereksiz çağrılar yardım ulaşmasını geciktirebilir.'],'Acil yardım','cikarim'],
 [7,['Ece bir ilaç bulunca yetişkine haber veriyor. Arda ise ilacı izinsiz kullanıyor. Hangi davranış ilaçların yanlış kullanımını önlemeye yardımcı olur?', 'Ece’nin yetişkine haber vermesi', 'Arda’nın ilacı izinsiz kullanması', 'İkisinin de ilacı denemesi', 'İlaçlar yanlış kullanıldığında zarar verebilir. Çocuklar ilaç kullanmadan önce yetişkin ve sağlık uzmanı desteği almalıdır.'],'İlaç güvenliği','gorsel-okuma'],
 [3,['Okulda koridordaki kırık camı gören bir öğrenci ne yapmalıdır?', 'Camdan uzak durup bir yetişkine haber vermelidir.', 'Camları çıplak elle toplamalıdır.', 'Camın üstünden koşmalıdır.', 'Kırık cam kesebilir. Öğrencinin camdan uzak durup bir yetişkine haber vermesi yardım alınmasını sağlar.'],'Kesici maddelerden korunma','cikarim'],
 [5,['Bir yaya, geçitte yeşil ışığı bekledikten sonra çevresindeki araçları da kontrol ediyor. Bu davranışın amacı nedir?', 'Karşıya güvenli geçişe yardımcı olmak', 'Dengeli besin alımını sağlamak', 'Dişleri temizlemek', 'Yaya ışığı ve araç kontrolü karşıya geçerken trafik durumunu değerlendirmeye yardımcı olur.'],'Yaya güvenliği','cikarim'],
 [8,['Dengeli beslenmek isteyen Ece, çantasında yalnızca bisküvi olduğunu fark ediyor. Çeşitliliği artırmak için hangisini ekleyebilir?', 'Meyve ve peynirli sandviç', 'Yalnızca ikinci bir paket bisküvi', 'Yalnızca şekerli içecek', 'Meyve ve peynirli sandviç eklemek, yalnızca bisküvi içeren öğüne farklı besinler katar.'],'Dengeli beslenme','cikarim'],
 [9,['Zeynep kendi diş fırçasını kullanıyor, Arda ise arkadaşının fırçasını kullanıyor. Kişisel temizlik için hangi davranış uygundur?', 'Zeynep’in kendi fırçasını kullanması', 'Arda’nın arkadaşının fırçasını kullanması', 'İkisinin aynı fırçayı paylaşması', 'Diş fırçası kişisel bir eşyadır. Kendi fırçasını kullanmak ağız hijyenine özen göstermeye yardımcı olur.'],'Kişisel temizlik','gorsel-okuma']
]) repairs.push({slug:'3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1',index,row,reason:'reviewed_gemini_grade_three_safety_medium_p0',metadata:{subSkill,questionType}});
for(const [slug,skills] of [
 ['2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1',['Kask kullanımı','Kaygan alan güvenliği','İlaç güvenliği','Acil yardımda konum','Dengeli beslenme','Yaralanmada yardım','Yaya güvenliği','Servis güvenliği','Elektrik güvenliği','Solunum hijyeni']],
 ['3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1',['Elektrik güvenliği','Emniyet kemeri','İlaç güvenliği','Acil yardımda konum','Bisiklet güvenliği','Yaya güvenliği','Dengeli beslenme','Yaralanmada yardım','Solunum hijyeni','Güvenli yardım isteme']]
]) for(const [index,subSkill] of skills.entries()) {
 const repair=repairs.find(p=>p.slug===slug&&p.index===index);
 if(!repair)throw new Error(`Missing safety repair ${slug}/${index}`);
 repair.metadata={subSkill,questionType:index===1?'gorsel-okuma':'cikarim'};
}
for(const [slug,skills] of [
 ['1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-orta-test-1',['Çevrede yön bulma','Ortak alanları koruma','Yardımlaşma','Kütüphane kitaplarına özen','Park güvenliği','Bayrağımızı tanıma','Tarihî yapıları koruma','Krokiyi tanıma','Kişisel bilgi güvenliği','Parktaki bitkileri koruma']],
 ['2-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1',['Ortak alanlar','Ortak eşyalara özen','Krokiyi tanıma','Meclisin bulunduğu şehri tanıma','Kütüphaneyi tanıma','Acil yardım','Tarihî yapıları koruma','Yön levhaları','Ortak alanlara özen','Bayrağımızı tanıma']]
]) for(const [index,subSkill] of skills.entries()) {
 const repair=repairs.find(p=>p.slug===slug&&p.index===index);
 if(!repair)throw new Error(`Missing community repair ${slug}/${index}`);
 repair.metadata={subSkill,questionType:index===1?'gorsel-okuma':'cikarim'};
}
for(const [slug,skills] of [
 ['2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1',['Bisiklet güvenliği','Kask kullanımı','Yaralanmada yardım','El temizliği','Evde güvenlik','Yaya güvenliği','Acil yardım','Elektrik güvenliği','Düzenli uyku','İlaç güvenliği']],
 ['1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1',['Ülkemizi tanıma','Çevre temizliği','Ortak alanlar','Başkentimizi tanıma','Krokiyi tanıma','Bayrağımızı tanıma','Kayıp eşya','Ortak eşyalara özen','Kişisel bilgi güvenliği','Sağlık hizmetleri']]
]) for(const [index,subSkill] of skills.entries()) {
 const repair=repairs.find(p=>p.slug===slug&&p.index===index);
 if(!repair)throw new Error(`Missing repair ${slug}/${index}`);
 repair.metadata={subSkill,questionType:index===1?'gorsel-okuma':'cikarim'};
}
for(const [slug,skills] of [
 ['1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1',['Yaralanmada yardım','El temizliği','Yaya güvenliği','Mutfak güvenliği','Solunum hijyeni','Kişisel bilgi güvenliği','İlaç güvenliği','Servis güvenliği','Kesici maddelerden korunma','Diş temizliği']],
 ['2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1',['Sağlıklı ara öğün','Servis güvenliği','El temizliği','Kesici maddelerden korunma','Diş temizliği','Güvenli yardım isteme','Elektrik güvenliği','Oyun güvenliği','Dengeli beslenme','Yaya güvenliği']]
]) for(const [index,subSkill] of skills.entries()) {
 const repair=repairs.find(p=>p.slug===slug&&p.index===index);
 if(!repair)throw new Error(`Missing safety repair ${slug}/${index}`);
 repair.metadata={subSkill,questionType:index===1?'gorsel-okuma':'cikarim'};
}
for(const [slug,skills] of [
 ['1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1',['Yardımlaşma','Okulda güvenli davranış','Yardım isteme','Okul bölümlerini tanıma','Yardımlaşma','Ortak eşyalara özen','Derse hazırlanma','Söz isteme','Farklılıklara saygı','Paylaşma']],
 ['1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1',['Trafik güvenliği','El temizliği','Kişisel sınırlar','Güvenli yardım isteme','Diş temizliği','Elektrik güvenliği','Dengeli beslenme','Yaralanmada yardım','Çevre temizliği','Güvenli ortak alanlar']]
]) for(const [index,subSkill] of skills.entries()) {
 const repair=repairs.find(p=>p.slug===slug&&p.index===index);
 if(!repair)throw new Error(`Missing grade-one repair ${slug}/${index}`);
 repair.metadata={subSkill,questionType:index===1?'gorsel-okuma':'cikarim'};
}
const schoolSkills=[['Okula hazırlık','eslestirme'],['Okulda güvenli davranış','cikarim'],['Okul çalışanlarını tanıma','eslestirme'],['Okul bölümlerini tanıma','eslestirme'],['Yardım isteme','cikarim'],['Ortak alanları tanıma','eslestirme'],['Ortak eşyalara özen','cikarim'],['Söz isteme','cikarim'],['Dinleme','cikarim'],['Anlaşmazlığı çözme','cikarim']];
for(const [index,[subSkill,questionType]] of schoolSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing school repair ${index}`);
 repair.metadata={subSkill,questionType};
}
for(const [difficulty,rows,skills] of [
 ['kolay',lengthEasy,[['Metre santimetre dönüşümü','islem'],['Uzunluk problemi','problem'],['Kalan uzunluk','problem'],['Uygun birimi seçme','eslestirme'],['Çevre uzunluğu','islem'],['Milimetre santimetre dönüşümü','problem'],['Metre santimetre eşitliği','eslestirme'],['Eş parçalara ayırma','problem'],['Uzunluğu tahmin etme','problem'],['Boy uzunluğu problemi','problem']]],
 ['orta',lengthMedium,[['Kalan uzunluk','problem'],['Kilometre metre dönüşümü','problem'],['Çevre ve milimetre dönüşümü','problem'],['Gidiş dönüş mesafesi','problem'],['Eş parçalara ayırma','problem'],['Milimetre santimetre dönüşümü','problem'],['Boy uzunluğu problemi','problem'],['Çevre uzunluğu','problem'],['Kilometre metre dönüşümü','problem'],['Kalan uzunluk','problem']]]
]) {
 test(4,'matematik','uzunluk-olcme',difficulty,1,rows,'reviewed_gemini_draft_replaces_repeated_length_template');
 for(const [index,[subSkill,questionType]] of skills.entries()) {
  const repair=repairs.find(p=>p.slug===`4-sinif-matematik-uzunluk-olcme-${difficulty}-test-1`&&p.index===index);
  if(!repair)throw new Error(`Missing length repair ${difficulty}/${index}`);
  repair.metadata={subSkill,questionType};
 }
}
const divisionMediumSkills=[['Gruplama problemi','problem'],['Kalanı yorumlama','problem'],['Bölüneni bulma','islem'],['Gereksiz bilgiyi ayırma','problem'],['Bölümleri karşılaştırma','karsilastirma'],['Bölüneni bulma','islem'],['Eşit gruplama','problem'],['Basamak ve bölme','islem'],['Gruplama problemi','problem'],['Kalanı yorumlama','problem']];
for(const [index,[subSkill,questionType]] of divisionMediumSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-bolme-orta-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing medium division repair ${index}`);
 repair.metadata={subSkill,questionType};
}
test(4,'matematik','carpma','orta',1,multiplicationMedium,'reviewed_gemini_draft_replaces_repeated_multiplication_template');
const multiplicationMediumSkills=[['Eş gruplarla çarpma','problem'],['50 ile zihinden çarpma','islem'],['Üç basamaklı sayıyla çarpma','problem'],['İki basamaklı sayılarla çarpma','problem'],['Çarpımları karşılaştırma','karsilastirma'],['Çarpımı basamaklara ayırma','islem'],['Eksik çarpanı bulma','islem'],['Çarpımı tahmin etme','islem'],['Eş gruplarla çarpma','problem'],['Çarpımı karşılaştırma','karsilastirma']];
for(const [index,[subSkill,questionType]] of multiplicationMediumSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-carpma-orta-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing medium multiplication repair ${index}`);
 repair.metadata={subSkill,questionType};
}
const divisionSkills=[['Gruplama problemi','problem'],['Çeyreği bulma','islem'],['Bölüneni bulma','islem'],['Bölümleri karşılaştırma','karsilastirma'],['Eşit paylaştırma','problem'],['Kalanı yorumlama','islem'],['Eşit paylaştırma','problem'],['Gruplama problemi','problem'],['Zihinden bölme','islem'],['Kalanı yorumlama','problem']];
for(const [index,[subSkill,questionType]] of divisionSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-bolme-kolay-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing division repair ${index}`);
 repair.metadata={subSkill,questionType};
}
const multiplicationSkills=[['Eş gruplarla çarpma','problem'],['10 ile çarpma','islem'],['Çarpmanın değişme özelliği','eslestirme'],['Çarpımı basamaklara ayırma','islem'],['100 ile çarpma problemi','problem'],['Eş gruplarda işlemi seçme','problem'],['Eksik çarpanı bulma','islem'],['Çarpımı tahmin etme','islem'],['10 ile çarpma problemi','problem'],['Çarpımı basamaklara ayırma','islem']];
for(const [index,[subSkill,questionType]] of multiplicationSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-carpma-kolay-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing multiplication repair ${index}`);
 repair.metadata={subSkill,questionType};
}
for (const [difficulty,rows,skills] of [
 ['kolay',subtractionEasy,[['Basamaklarına göre çıkarma','islem'],['Çıkarma stratejisi','islem'],['Kalan miktar problemi','problem'],['Zihinden çıkarma','islem'],['Eksilen çıkan fark','islem'],['Fark problemi','problem'],['Eksik çıkanı bulma','islem'],['Zihinden çıkarma','islem'],['Kalan mesafe problemi','problem'],['Çıkarmayı toplamayla kontrol','islem']]],
 ['orta',subtractionMedium,[['Çıkarma stratejisi','islem'],['Fark problemi','problem'],['Eksik çıkanı bulma','islem'],['İki adımlı çıkarma problemi','problem'],['Hedefe kalan miktar','problem'],['Farkı tahmin etme','islem'],['Eksileni bulma','islem'],['Farktaki değişim','islem'],['İki adımlı problem','problem'],['Çıkarmayı toplamayla kontrol','islem']]]
]) {
 test(4,'matematik','cikarma',difficulty,1,rows,'replace_repeated_subtraction_template_with_varied_explained_questions');
 for(const [index,[subSkill,questionType]] of skills.entries()) {
  const repair=repairs.find(p=>p.slug===`4-sinif-matematik-cikarma-${difficulty}-test-1`&&p.index===index);
  if(!repair)throw new Error(`Missing subtraction repair ${difficulty}/${index}`);
  repair.metadata={subSkill,questionType};
 }
}
const additionMediumSkills = [['Eldeli toplama','islem'],['Toplama problemi','problem'],['Toplamada uygun gruplama','islem'],['Eksik toplananı bulma','islem'],['Üç sayıyla toplama problemi','problem'],['Toplamı tahmin etme','islem'],['Eksik toplananı bulma','islem'],['Toplamdaki değişim','islem'],['Üç sayıyla toplama problemi','problem'],['Toplamayı çıkarma ile kontrol','islem']];
for (const [index,[subSkill,questionType]] of additionMediumSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-toplama-orta-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing medium addition repair ${index}`);
 repair.metadata={subSkill,questionType};
}
const additionSkills = [['Basamaklarına göre toplama','islem'],['Eldeli toplama','islem'],['Toplama problemi','problem'],['Zihinden toplama','islem'],['Toplamada değişme özelliği','karsilastirma'],['Eksik toplananı bulma','islem'],['Toplama problemi','problem'],['Toplamada uygun gruplama','islem'],['Yüzlük ekleme','islem'],['Toplama problemi','problem']];
for (const [index,[subSkill,questionType]] of additionSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-toplama-kolay-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing addition repair ${index}`);
 repair.metadata={subSkill,questionType};
}
for(const [difficulty,rows] of [['kolay',fractionsEasy],['orta',fractionsMedium]]) {
  test(4,'matematik','kesirler',difficulty,1,rows,'replace_repeated_fraction_template_with_varied_explained_questions');
  const skills=difficulty==='kolay'
    ? [['Kesri modelden yazma','eslestirme'],['Kesri modelden yazma','eslestirme'],['Birim kesir','eslestirme'],['Eş paydalı kesirleri karşılaştırma','karsilastirma'],['Birim kesir','eslestirme'],['Denk kesirler','karsilastirma'],['Bütüne eşit kesir','eslestirme'],['Çokluğun birim kesrini bulma','problem'],['Çokluğun kesrini bulma','problem'],['Kalan parçayı bulma','problem']]
    : [['Denk kesirler','eslestirme'],['Eş paydalı kesirleri karşılaştırma','karsilastirma'],['Çokluğun kesrini bulma','problem'],['Kalan kısmı kesirle gösterme','problem'],['Denk kesirlerle karşılaştırma','karsilastirma'],['Çokluğun kalanını bulma','problem'],['Bileşik kesri tam sayılı kesre dönüştürme','eslestirme'],['Çokluğun kalanını bulma','problem'],['Birim kesirden bütünü bulma','problem'],['Denk kesirleri karşılaştırma','karsilastirma']];
  for(const [index,[subSkill,questionType]] of skills.entries()) {
    const repair=repairs.find(p=>p.slug===`4-sinif-matematik-kesirler-${difficulty}-test-1`&&p.index===index);
    if(!repair)throw new Error(`Missing fraction repair ${difficulty}/${index}`);
    repair.metadata={subSkill,questionType};
  }
}
const naturalNumberSkills = [
 ['Basamak değeri','islem'], ['Sayıyı rakamlarla yazma','eslestirme'], ['Sayı bölükleri','eslestirme'],
 ['Sayı çözümleme','eslestirme'], ['Doğal sayıları karşılaştırma','karsilastirma'], ['Karşılaştırma işaretleri','karsilastirma'],
 ['Rakamlarla sayı oluşturma','siralama'], ['Ardışık doğal sayılar','islem'], ['Sayı örüntüleri','oruntu'], ['Basamak değerleriyle toplama','problem']
];
for (const [index, [subSkill, questionType]] of naturalNumberSkills.entries()) {
  const repair = repairs.find(p => p.slug === '4-sinif-matematik-dogal-sayilar-kolay-test-1' && p.index === index);
  if (!repair) throw new Error(`Missing natural numbers repair ${index}`);
  repair.metadata = {subSkill, questionType};
}
const naturalNumberMediumSkills = [
 ['Basamak değeri','islem'], ['Sayıyı rakamlarla yazma','eslestirme'], ['Sayı çözümleme','eslestirme'],
 ['En yakın bine yuvarlama','islem'], ['Doğal sayıları karşılaştırma','karsilastirma'], ['Rakamlarla en büyük sayıyı oluşturma','siralama'],
 ['Ardışık doğal sayılar','islem'], ['Sayı örüntüleri','oruntu'], ['Sayı bölükleri','eslestirme'], ['Basamaklara göre sayı oluşturma','eslestirme']
];
for (const [index,[subSkill,questionType]] of naturalNumberMediumSkills.entries()) {
 const repair=repairs.find(p=>p.slug==='4-sinif-matematik-dogal-sayilar-orta-test-1'&&p.index===index);
 if(!repair)throw new Error(`Missing medium natural numbers repair ${index}`);
 repair.metadata={subSkill,questionType};
}
const english = {
 'school-life': [
 ['The school library opens after lunch. Lunch ends at one. When can Ece visit the library?','After one.','Before lunch.','During lunch.','After, sonra demektir. Kütüphane öğle yemeğinden sonra açıldığı için saat birden sonra gidilebilir.'],
 ['Our class has art on Monday and music on Tuesday. Today is Tuesday. Which lesson do we have?','Music.','Art.','Both art and music.','Today is Tuesday ifadesi salı gününü seçmemizi ister. Programda salı günü music, yani müzik vardır; art pazartesidir.'],
 ['Mina wants to read a story at school. The books are in the library, and the balls are in the playground. Where should she go?','To the library.','To the playground.','To the canteen.','Mina öykü okumak istiyor. Books ve library bilgileri birlikte kullanılır: Kitaplar kütüphanededir; oyun alanı bu ihtiyacı karşılamaz.'],
 ['School plan: first reading, then lunch, finally games. Which activity comes between reading and games?','Lunch.','Reading.','Games.','First ilk, then sonra, finally en son demektir. Reading ile games arasındaki etkinlik lunch, yani öğle yemeğidir.'],
 ['Efe says, "I cannot find my classroom." Which question asks for the information he needs?','Where is my classroom?','When is lunch?','What is your name?','Efe sınıfının yerini bulamıyor. Where yer sorar; when zaman, what is your name ise ad sorar.'],
 ['The bell rings. The children stop playing and go to their classroom. What do they do after playing?','They go to the classroom.','They start playing.','They go home.','After playing, oyundan sonra demektir. Metinde çocuklar oyunu bırakıp sınıfa gidiyor; eve gittikleri söylenmiyor.'],
 ['Ada has a sandwich but no water. She says, "I am thirsty." What does she need?','A drink.','Another sandwich.','A new notebook.','Thirsty susamış demektir. Ada’nın yiyeceği var ama suyu yok; bu iki bilgi bir içeceğe ihtiyaç duyduğunu gösterir.'],
 ['Our school garden is closed today. We can read in the library. Which plan is possible today?','Reading in the library.','Playing in the garden.','Having lunch in the garden.','Closed kapalı demektir. Bahçedeki iki etkinlik yapılamaz; metin kütüphanede okumaya izin verildiğini söyler.'],
 ['The teacher says, "Bring your pencils tomorrow." What should the children put in their school bags?','Pencils.','Paint brushes.','Story books.','Bring, getir demektir. Öğretmen özellikle pencils istediği için çantaya kalem koymak yönergeyi karşılar.'],
 ['We have a break before the last lesson. We go home after that lesson. What happens last?','We go home.','We have a break.','We start the last lesson.','Before önce, after sonra demektir. Sıra teneffüs, son ders, eve gitme biçimindedir; en son eve gidilir.']
 ],
 'classroom-life': [
 ['The board is dirty. The teacher wants to write a new word. Which instruction helps?','Clean the board, please.','Close the book, please.','Open the window, please.','Dirty kirli demektir. Yeni sözcüğü yazabilmek için tahtayı temizlemek gerekir; clean the board bu işi ister.'],
 ['Ali asks, "May I use your ruler?" Ece agrees. What does she say?','Yes. Here you are.','No, I need it.','It is under the desk.','Agrees kabul ediyor demektir. Here you are, al buyur anlamıyla cetveli uzatırken söylenir. İkinci cevap reddeder, üçüncü yalnız yer bildirir.'],
 ['Classroom note: red pencils are in the box; blue pencils are on the desk. Where should I look for a blue pencil?','On the desk.','In the box.','Under the desk.','Önce istenen rengi seç: blue. Notta mavi kalemler on the desk, yani sıranın üstündedir; kutudakiler kırmızıdır.'],
 ['First open your notebook. Then write your name. What must you do before writing?','Open your notebook.','Close your notebook.','Read your name aloud.','Before writing yazmadan önce demektir. First ile verilen ilk adım defteri açmaktır; adını okumak yönergede yoktur.'],
 ['There are three pencils on the desk. Ece puts one in her bag. How many pencils stay on the desk?','Two.','Three.','Four.','Stay kalmak demektir. Sıradaki üç kalemden biri çantaya gidince 3 − 1 = 2 kalır. Two iki demektir.'],
 ['The teacher says, "Listen, then repeat." Eren starts speaking before listening. Which step did he miss?','Listen.','Repeat.','Write.','Then, sonra demektir. Önce listen yani dinle, sonra repeat yani tekrar et deniyor. Eren ilk adım olan dinlemeyi atlamıştır.'],
 ['A classroom note says, "The bag is under the chair. The book is in the bag." Where is the book?','In the bag under the chair.','On the chair next to the bag.','Under the bag on the desk.','İki yer bilgisini birleştir: Kitap çantanın içinde, çanta sandalyenin altında. On üstünde, under altında, in içinde anlamındadır.'],
 ['I need to draw a straight line, but I have only a pencil. What else should I ask for?','A ruler.','An eraser.','A sharpener.','Straight line düz çizgi demektir. Çizgiyi düz çizmek için ruler yani cetvel gerekir; silgi siler, kalemtıraş kalemi açar.'],
 ['Teacher: "Please close the door, but keep the window open." Which action follows both instructions?','Close the door and leave the window open.','Open the door and close the window.','Close both the door and the window.','But iki yönergeyi ayırır: Kapı kapatılmalı, pencere açık kalmalı. İki koşulu da yalnız ilk ifade sağlar.'],
 ['Sena cannot hear the teacher. Which sentence asks the teacher to say the words again?','Can you repeat that, please?','Can I open my book, please?','Can I clean the board, please?','Repeat tekrar etmek demektir. Sena duyamadığı sözlerin yeniden söylenmesini istiyor; diğer cümleler kitap ve tahta için izin ister.']
 ],
 'personal-life': [
 ['Deniz says, "I am nine. My brother is seven." Who is older?','Deniz.','His brother.','They are the same age.','Older yaşça büyük demektir. Nine 9, seven 7 olduğuna göre Deniz daha büyüktür; yaşları eşit değildir.'],
 ['Lina washes her face before breakfast and brushes her teeth after breakfast. What does she do last?','She brushes her teeth.','She washes her face.','She has breakfast.','Before ve after sözcükleri sırayı verir: yüzünü yıkama, kahvaltı, diş fırçalama. Son etkinlik diş fırçalamadır.'],
 ['Mert likes apples but does not like bananas. Which snack does he choose from these fruits?','An apple.','A banana.','Both fruits.','Likes seviyor, does not like sevmiyor demektir. Mert elmayı sevdiğini, muzu sevmediğini söylediği için elmayı seçer.'],
 ['I have a new friend. I know her name, but I do not know her age. Which question should I ask?','How old are you?','What is your name?','How are you?','Age yaş demektir. How old are you yaş sorar. Adını zaten biliyoruz; How are you ise nasıl olduğunu sorar.'],
 ['Elif says, "I can swim, but I cannot ride a bike." Which activity can she do?','Swimming.','Riding a bike.','Both activities.','Can yapabilmek, cannot yapamamak demektir. Elif yüzebilir; bisiklet sürme becerisinin olmadığını söylüyor.'],
 ['Can is thirsty after playing. He has water and a sandwich. Which one helps with his thirst?','Water.','The sandwich.','Neither of them.','Thirst susuzluktur. Water su demektir ve içecek ihtiyacını karşılar; sandwich bir yiyecektir.'],
 ['Ece gets up at seven. Ada gets up at eight. Who gets up first?','Ece.','Ada.','They get up together.','Gets up uyanıp kalkmak demektir. Seven 7, eight 8 olduğundan Ece bir saat önce kalkar.'],
 ['Arda says, "I feel sad because I lost my toy." Why is Arda sad?','He cannot find his toy.','He has a new toy.','He found his toy.','Lost kaybetti demektir. Because nedeni bildirir: Arda oyuncağını kaybettiği için üzgün; found ise buldu anlamına gelir.'],
 ['Duru likes drawing and reading. She does not like singing. Which pair matches her likes?','Drawing and reading.','Reading and singing.','Drawing and singing.','Likes sevdiği etkinlikleri gösterir. İki sevdiği etkinlik resim çizme ve okumadır; singing şarkı söylemedir ve sevmiyor.'],
 ['My daily plan is: get dressed, have breakfast, leave home. I have finished breakfast. What comes next?','Leave home.','Get dressed.','Have breakfast again.','Next sıradaki demektir. Verilen planda kahvaltıdan sonra leave home, yani evden çıkma vardır; giyinme daha önce yapılmıştır.']
 ],
 'family-life': [
 ['Ada says, "Mert is my brother. Our mother is Zeynep." Who is Zeynep to Mert?','His mother.','His sister.','His aunt.','Our mother ikimizin annesi demektir. Ada ile Mert kardeştir; Zeynep Mert’in de annesidir.'],
 ['My father has one sister. Her name is Ece. Ece is my _____.','aunt','mother','grandmother','Babanın kız kardeşi Türkçede hala, İngilizcede aunt olur. Mother anne, grandmother büyükanne demektir.'],
 ['Ali and his sister set the table. Their father cooks. Who prepares the food?','Their father.','Ali.','His sister.','Set the table sofrayı kurmak, cooks yemek pişirmek demektir. Yemeği hazırlayan babalarıdır; kardeşler sofrayı kuruyor.'],
 ['My grandmother is my mother’s mother. Who is my mother’s father?','My grandfather.','My brother.','My son.','Mother’s father annemin babasıdır; grandfather büyükbaba demektir. Brother erkek kardeş, son erkek evlattır.'],
 ['Eren is ten. His sister is eight. Their baby brother is one. Who is the youngest?','The baby brother.','Eren.','The sister.','Youngest en küçük demektir. Ten 10, eight 8, one 1 olduğundan en küçük kardeş bir yaşındaki bebektir.'],
 ['Family note: Mum reads. Dad draws. Deniz helps Dad. What does Deniz help with?','Drawing.','Reading.','Cooking.','Dad draws, baba resim çiziyor demektir. Deniz babasına yardım ettiği için çizime yardım eder; okumayı anne yapıyor.'],
 ['A: "Is Can your brother?" B: "No, he is my cousin." Which sentence is true?','Can is B’s cousin.','Can is B’s brother.','Can is B’s father.','No yanıtından sonra doğru ilişki açıklanıyor: cousin kuzen demektir. Soruda brother denmesi onun kardeş olduğu anlamına gelmez.'],
 ['First the family cooks dinner. Then they eat together. Finally they wash the dishes. What do they do just before washing the dishes?','They eat together.','They cook dinner.','They go shopping.','Just before hemen önce demektir. Sıra yemek hazırlama, birlikte yeme, bulaşıkları yıkamadır. Yıkamadan hemen önce birlikte yerler.'],
 ['Ece says, "My sister likes chess. I like chess too." Which activity can they both enjoy?','Playing chess.','Playing tennis.','Singing songs.','Too burada ben de anlamındadır. Ece ve kız kardeşi satrancı sevdiklerini söylüyor; başka bir ortak ilgi verilmemiştir.'],
 ['My uncle has a daughter, Ela. Ela and I visit our grandmother together. Who is Ela to me?','My cousin.','My aunt.','My mother.','Uncle amca veya dayı, daughter kız evlat demektir. Amcanın veya dayının kızı kişinin cousin, yani kuzenidir.']
 ],
 'homes-houses-and-the-neighbourhood': [
 ['The shop is between our house and the park. What is next to both places?','The shop.','The school.','The library.','Between arasında demektir. Düzen ev–dükkân–park olduğundan hem eve hem parka komşu olan yer dükkândır.'],
 ['The red ball is under the chair. The blue ball is on the chair. Which ball must I look down to find?','The red ball.','The blue ball.','Both balls.','Under altında, on üstünde demektir. Sandalyenin altına bakınca kırmızı top bulunur; mavi top üstündedir.'],
 ['Our house has a kitchen, a bedroom and a bathroom. I want to sleep. Which room should I choose?','The bedroom.','The bathroom.','The kitchen.','Sleep uyumak demektir. Bedroom yatak odasıdır; bathroom banyo, kitchen mutfaktır. Uyuma amacıyla eşleşen oda yatak odasıdır.'],
 ['My keys are on the kitchen table. I am in the bedroom. Where should I go to get the keys?','To the kitchen.','To the bathroom.','To the garden.','Anahtarların yeri kitchen table, mutfak masasıdır. Bulunduğumuz yatak odasından mutfağa gitmeliyiz.'],
 ['The sofa is in the living room. The bed is upstairs. Where can the family sit on the sofa?','In the living room.','In the upstairs bedroom.','In the garden.','Sofa kanepe demektir. Kanepenin bulunduğu living room oturma odasıdır; upstairs bilgisi yatağın yerini anlatır.'],
 ['There is a bakery next to our house and a park opposite it. Where can we buy bread near home?','At the bakery.','At the park.','At home.','Bakery ekmek satılan fırındır. Park yakın olsa da ekmek almak için gereken yer fırındır; near home eve yakın demektir.'],
 ['I am downstairs. My room is upstairs. What should I do to reach my room?','Go up the stairs.','Go down the stairs.','Stay downstairs.','Downstairs alt kat, upstairs üst kat demektir. Alt kattan üst kata ulaşmak için merdivenden çıkılır: go up the stairs.'],
 ['Our neighbour’s door is blue. Our door is green. I want to visit our neighbour. Which door should I use?','The blue door.','The green door.','Both doors.','Neighbour komşu demektir. Komşunun kapısı blue, bizimki green; ziyaret için mavi kapıya gidilir.'],
 ['A cat is in the garden, behind the tree. Where should I look for it?','Behind the tree in the garden.','In front of the house.','Under the kitchen table.','Behind arkasında demektir. Bahçedeki ağacın arkasını bulmak hem garden hem behind the tree bilgisini kullanır.'],
 ['Our street has a school but no library. I need to borrow a book from a library. Can I find that place on our street?','No, there is no library.','Yes, there is a library.','Yes, every school is a library.','No library bu sokakta kütüphane olmadığını söyler. Okul bulunması sokakta ayrı bir kütüphane bulunduğunu göstermez.']
 ],
 'life-in-the-city-and-the-world': [
 ['I need bread and medicine. First I visit the bakery. Where should I go next?','To the pharmacy.','To the bakery again.','To the playground.','Bread ekmek, medicine ilaçtır. Ekmek fırından alındıktan sonra ilaç için pharmacy yani eczaneye gidilir.'],
 ['The museum opens at nine and closes at five in the afternoon. Can we enter at ten in the morning?','Yes, it is open.','No, it has not opened yet.','No, it closes at nine.','Saat 10, açılış saati 9 ile öğleden sonra 5 arasındadır. Open açık, closed kapalı demektir; bu saat aralığında müze açıktır.'],
 ['The bus goes to the library. The train goes to the airport. I want to borrow books. Which vehicle should I take?','The bus.','The train.','Either vehicle.','Borrow books kitap ödünç almak demektir. Bu amaç için library gerekir; kütüphaneye giden araç otobüstür.'],
 ['The market is on the left. The park is on the right. Where should I turn to buy fruit?','Left.','Right.','Back.','Fruit meyvedir ve verilen yerlerden marketten alınır. Market solda olduğundan left yönüne dönülür.'],
 ['The library is opposite the park. I stand at the library entrance and look across the street. What can I see?','The park.','Inside the library.','The airport.','Opposite karşısında, across the street sokağın karşısı demektir. Kütüphanenin karşısındaki yer parktır.'],
 ['We want to see old objects and learn about the past. Which city place fits our plan?','A museum.','A supermarket.','A bus stop.','Old objects eski nesneler, the past geçmiş demektir. Bunları inceleyip geçmişi öğrenebileceğimiz yer museum yani müzedir.'],
 ['A visitor asks, "Where is the station?" Which answer gives a place instead of a time?','Next to the hospital.','At eight o’clock.','On Monday morning.','Where yer sorar. Next to the hospital hastanenin yanında demektir; diğer iki cevap zaman bildirir.'],
 ['We finish our picnic in the city park. There is an empty bottle on our table. What helps keep the park clean?','Put the bottle in the proper bin.','Leave the bottle on the table.','Hide the bottle under a tree.','Keep clean temiz tutmak demektir. Şişeyi uygun toplama kutusuna koymak atığı toplar; masada bırakmak veya saklamak temizlemez.'],
 ['The bus arrives at the bus stop. People wait there to travel. Where should we wait for the bus?','At the bus stop.','On the road in front of cars.','Inside the museum.','Bus stop otobüs durağıdır. Metin yolcuların burada beklediğini söylüyor; araçların önünde yol üzerinde beklenmez.'],
 ['Our city library is closed on Sunday. Today is Saturday, and it is open. When can we visit: today or tomorrow?','Today.','Tomorrow.','Both days.','Saturday cumartesi, Sunday pazardır. Bugün açık, yarın kapalı olduğuna göre today yani bugün gidilebilir.']
 ]
};
for(const [topic,rows] of Object.entries(english)) test(3,'ingilizce',topic,'zor',2,rows,'topic_alignment_evidence_and_distractors');

test(3,'fen-bilimleri','bilimsel-kesif-yolculugu','zor',2,[
 ['Ece aynı saksıdaki filizin boyunu pazartesi 4 cm, cuma 6 cm ölçtü. Hangi cümle doğrudan ölçümlere dayanır?','Filiz iki ölçüm arasında 2 cm uzamıştır.','Filiz yalnız geceleri büyümüştür.','Filiz her gün tam 2 cm uzamıştır.','İki ölçüm arasındaki fark 6 − 4 = 2 cm’dir. Ölçümler büyümenin günün hangi saatinde veya her gün ne kadar olduğunu göstermez.'],
 ['İki eş saksıdaki aynı tür bitkinin su ihtiyacı araştırılacak. Biri aydınlık, diğeri karanlık yere konup farklı miktarda sulanıyor. Deneydeki sorun nedir?','Hem ışık hem su değiştiği için sonucu yalnız suya bağlayamayız.','Saksıların eş olması karşılaştırmayı engeller.','Aynı tür bitki kullanmak sonucu geçersiz kılar.','Bir etkenin etkisini araştırırken diğer koşullar aynı tutulur. Hem su hem ışık değişirse büyüme farkının hangisinden kaynaklandığı ayırt edilemez.'],
 ['Deniz kapalı kutuyu sallayınca ses duydu ve “İçinde taş var.” dedi. Hangisi gözlem, hangisi tahmindir?','Ses duymak gözlem, taş olduğunu söylemek tahmindir.','Taş olduğunu söylemek gözlem, ses duymak tahmindir.','İkisi de kutunun içindekini kesin olarak gösterir.','Ses duyularla fark edilmiştir. Kutunun içi görülmediği için taş düşüncesi tahmindir; başka bir nesne de ses çıkarabilir.'],
 ['Bir öğrenci yağmur ölçümlerini karşılaştırıyor. İlk gün 3, ikinci gün 5, üçüncü gün 2 birim ölçüyor. Hangi sonuç verilerle desteklenir?','En fazla yağmur ikinci gün ölçülmüştür.','Her gün bir önceki günden fazla yağmur yağmıştır.','İlk ve üçüncü günün ölçümü aynıdır.','5, hem 3’ten hem 2’den büyüktür. Üçüncü gün ölçüm düştüğünden sürekli artış yoktur; 3 ile 2 de eşit değildir.'],
 ['Bir çocuk yaprağın rengini ve yüzeyinin pürüzünü karşılaştıracak. Hangi yöntem bu iki özelliğe uygundur?','Renge bakmak, güvenli yaprağın yüzeyine dokunmak.','Yalnız yaprağın çıkardığı sesi dinlemek.','Yalnız yaprağın uzunluğunu ölçmek.','Renk görmeyle, pürüz dokunmayla incelenir. Ses veya uzunluk ölçümü bu iki özellik hakkında yeterli bilgi vermez.'],
 ['Mina “Bence bu oyuncak araba halıda daha az ilerler.” dedi. Sonra aynı arabayı eş biçimde halıda ve düz zeminde denedi. İlk cümlesi nedir?','Deneyden önce kurduğu bir tahmin.','Ölçümle doğrulanmış sonuç.','Arabanın ölçülmüş uzunluğu.','Bence sözü ve deneyin daha sonra yapılması, cümlenin tahmin olduğunu gösterir. Sonuca ulaşmak için iki zemindeki ilerleme karşılaştırılmalıdır.'],
 ['İki çocuk aynı masayı ölçtü. Biri kendi karışıyla 8, diğeri cetvelle 120 cm buldu. Sonuçları doğrudan karşılaştırmak neden zordur?','Farklı ölçü birimleri kullanılmıştır.','İki ölçüm de sayıyla yazılmıştır.','Aynı masa ölçülmüştür.','Karış kişiye göre değişir; santimetre standart birimdir. Ölçümleri karşılaştırmak için aynı birim kullanılmalıdır.'],
 ['Bir araştırmada çocukların sevdiği meyveler sorulacak. Hangi soru yönlendirmeden tercihlerini öğrenir?','En sevdiğin meyve hangisidir?','Elma çok güzel, sen de elmayı seçersin değil mi?','Herkes muz seçti, sen de muz seçer misin?','İlk soru belirli bir cevabı övmeden veya başkalarının seçimini dayatmadan sorar. Diğerleri çocuğu belirli bir meyveye yönlendirir.'],
 ['Eren üç gün aynı saatte gökyüzünü çizdi. Çizimlerine tarih eklemesi neyi kolaylaştırır?','Hangi gözlemin hangi güne ait olduğunu karşılaştırmayı.','Havanın ertesi gün kesin nasıl olacağını bilmeyi.','Bulutların rengini değiştirmeyi.','Tarih, kayıtları sıralamayı ve günleri karşılaştırmayı sağlar. Üç çizim gelecek hava durumunu kesin olarak söylemez veya havayı değiştirmez.'],
 ['İki grubun aynı deneydeki ölçümleri farklı çıktı. Sonucu araştırmak için ilk olarak ne yapılmalıdır?','Araçları ve uygulanan adımları karşılaştırıp ölçümü tekrarlamak.','İstenen sonucu veren grubu doğru kabul etmek.','Farklı çıkan bütün ölçümleri silmek.','Ölçüm farkı araçtan veya uygulamadan kaynaklanabilir. Adımları kontrol ederek tekrarlamak kanıtı sınar; hoşumuza giden sonucu seçmek araştırma değildir.']
 ],'scientific_inquiry_topic_and_reasoning');

test(3,'ingilizce','family-life','kolay',1,[
 ['“This is my mother.” cümlesinde tanıtılan aile üyesi kimdir?','Anne','Baba','Kız kardeş','Büyükbaba','Mother anne demektir. Father baba, sister kız kardeş, grandfather büyükbabadır. This is ile bir kişi tanıtılır.'],
 ['“My brother is Can.” cümlesinde Can’ın akrabalığı nedir?','Erkek kardeş','Kız kardeş','Anne','Büyükanne','Brother erkek kardeş demektir. Kişi Can’ın kendi erkek kardeşi olduğunu söylüyor. Sister kız kardeş için kullanılır.'],
 ['Aile notu: “Mum: Ayla. Dad: Cem.” Cem için hangi İngilizce sözcük kullanılır?','Dad','Mum','Sister','Grandmother','Notta Cem’in yanında Dad yazıyor. Dad baba, Mum anne demektir; bu iki sözcük aile içinde sık kullanılır.'],
 ['“She is my sister.” cümlesinin Türkçesi hangisidir?','O benim kız kardeşim.','O benim erkek kardeşim.','O benim annem.','O benim büyükannem.','Sister kız kardeş demektir. She kadın veya kız için kullanılan o zamiridir; my ise benim anlamındadır.'],
 ['“Grandmother” ve “grandfather” sözcükleri hangi çifti anlatır?','Büyükanne ve büyükbaba','Anne ve baba','Kız kardeş ve erkek kardeş','Teyze ve amca','Grandmother büyükanne, grandfather büyükbabadır. Mother ve father sözcüklerinin başındaki grand-, önceki kuşağı belirtir.'],
 ['“I help my father.” cümlesinde çocuk kime yardım eder?','Babasına','Annesine','Kız kardeşine','Büyükannesine','Help yardım etmek, my father babam demektir. Cümle babaya yardım etmeyi anlatır; diğer aile üyelerini söylemez.'],
 ['Hangi eşleştirmede aile üyesinin anlamı doğru verilmiştir?','Sister — kız kardeş','Mother — erkek kardeş','Father — büyükanne','Brother — anne','Sister kız kardeştir. Diğer eşleştirmelerde mother anne, father baba ve brother erkek kardeş olmalıydı.'],
 ['“Who is he?” sorusuna aile üyesini tanıtan cevap hangisidir?','He is my father.','He is happy.','He is at home.','He is ten.','Who kim sorusudur. He is my father kişinin babamız olduğunu belirtir; diğerleri duygu, yer ve yaş bildirir.'],
 ['“My aunt visits us.” cümlesindeki aunt hangi aile üyesi olabilir?','Teyze','Dede','Erkek kardeş','Baba','Aunt teyze veya hala anlamındadır. Visits us bizi ziyaret eder demektir. Seçeneklerde aunt ile eşleşen kişi teyzedir.'],
 ['“My family” ifadesi aşağıdakilerden hangisini anlatır?','Ailem','Sınıfım','Bahçem','Kitabım','Family aile demektir. My family benim ailem anlamına gelir; class sınıf, garden bahçe, book kitaptır.']
 ],'family_test1_distractors_language_and_explanations');
test(3,'ingilizce','family-life','orta',1,[
 ['“This is my mother. Her name is Aylin.” metnine göre Aylin kimdir?','Konuşanın annesi','Konuşanın kız kardeşi','Konuşanın teyzesi','Konuşanın büyükannesi','Her name is onun adı demektir. Önce tanıtılan kişi mother, yani anne olduğu için Aylin annenin adıdır.'],
 ['“My sister reads. My brother draws.” metninde kim resim çizer?','Erkek kardeş','Kız kardeş','Anne','Baba','Draws resim çizer, reads okur demektir. Draws eylemini yapan kişi brother yani erkek kardeştir.'],
 ['“My parents” ifadesindeki parents hangi iki kişiyi birlikte anlatır?','Mother and father','Sister and brother','Aunt and uncle','Grandmother and grandfather','Parents anne ve babayı birlikte adlandırır. Kardeşler veya büyük ebeveynler için aynı sözcük kullanılmaz.'],
 ['“Ece is my cousin, not my sister.” cümlesine göre Ece kimdir?','Kuzen','Kız kardeş','Anne','Hala','Not my sister kız kardeşim değil demektir. Cümlede doğru ilişki cousin yani kuzen olarak verilir.'],
 ['“Dad is in the kitchen. Mum is in the garden.” metnine göre anne nerede?','In the garden.','In the kitchen.','In the bedroom.','At school.','Mum anne demektir; anne garden yani bahçededir. Kitchen mutfaktır ve babanın bulunduğu yeri anlatır.'],
 ['“My brother is six. I am eight.” Konuşan kişi için hangisi doğrudur?','Kardeşinden iki yaş büyüktür.','Kardeşinden iki yaş küçüktür.','Kardeşiyle aynı yaştadır.','Kardeşinden altı yaş büyüktür.','Eight 8, six 6 demektir. 8 − 6 = 2 olduğu için konuşan kişi kardeşinden iki yaş büyüktür.'],
 ['“We eat dinner together.” aile cümlesindeki together neyi belirtir?','Birlikte yemek yediklerini','Ayrı ayrı yemek yediklerini','Yemek pişirmediklerini','Yalnız kahvaltı yaptıklarını','Together birlikte anlamındadır. Eat dinner akşam yemeği yemek demektir; cümle aile üyelerinin birlikte yediğini söyler.'],
 ['“My mother’s brother is visiting.” cümlesinde ziyaret eden kimdir?','Dayı','Dede','Baba','Erkek kardeş','Mother’s brother annemin erkek kardeşi demektir; Türkçede dayıdır. İngilizcede bu aile üyesi uncle olarak adlandırılır.'],
 ['Anne “Please help me set the table.” diyor. Hangi eylem bu isteğe uygundur?','Sofraya tabak koymak','Oyuncakları bahçeye taşımak','Kitabı kapatmak','Pencereyi açmak','Set the table sofrayı kurmak demektir. Tabak koymak sofra hazırlamanın parçasıdır; diğer eylemler istenen işle ilgili değildir.'],
 ['“I love my little sister.” cümlesinde little sister nasıl tanımlanır?','Küçük kız kardeş','Büyük kız kardeş','Küçük erkek kardeş','Büyük erkek kardeş','Little küçük, sister kız kardeş demektir. İki sözcük birlikte okunmalıdır; yalnız little sözcüğü kardeşin kız olduğunu söylemez.']
 ],'family_test1_distractors_language_and_explanations');
test(3,'ingilizce','family-life','zor',1,[
 ['“Ece is my sister. Ece has a brother, and that is me.” Bu sözleri söyleyen kişi Ece’nin nesidir?','Erkek kardeşi','Babası','Kuzeni','Büyükbabası','İlk cümle Ece’nin konuşanın kız kardeşi olduğunu, ikinci cümle konuşanın onun brother yani erkek kardeşi olduğunu açıkça belirtir.'],
 ['“My aunt has a son, Can. Can is eight.” Konuşan kişi Can’ı nasıl tanıtır?','He is my cousin.','He is my uncle.','He is my father.','He is my grandfather.','Aunt teyze veya hala, son erkek evlat demektir. Teyze veya halanın oğlu cousin yani kuzen olur; yaşı bu ilişkiyi değiştirmez.'],
 ['“Mum reads after dinner. Dad reads before dinner.” Hangisi yemek yedikten sonra okur?','Mum','Dad','Both parents','Neither parent','After sonra, before önce demektir. Anne yemekten sonra, baba yemekten önce okur; soruda after dinner isteniyor.'],
 ['“My sister is ten. My brother is seven. I am nine.” Yaşı en büyük olan kimdir?','The sister','The brother','The speaker','All three are the same age','Ten 10, seven 7, nine 9 demektir. En büyük sayı 10 olduğundan kız kardeş yaşça en büyüktür.'],
 ['“Grandma has two children: my mum and my uncle.” Grandma’nın çocukları hangi ikilidir?','Mother and uncle','Mother and cousin','Father and brother','Sister and grandfather','My mum annem, my uncle dayım demektir. Metinde büyükannenin iki çocuğu bu kişiler olarak sayılıyor; kuzen onun torunu olabilir.'],
 ['“Eren draws with Dad. Ela reads with Mum.” Eren ve Ela aynı etkinliği mi yapıyor?','Hayır; Eren resim çiziyor, Ela okuyor.','Evet; ikisi de okuyor.','Evet; ikisi de resim çiziyor.','Hayır; Eren okuyor, Ela resim çiziyor.','Draws çiziyor, reads okuyor demektir. With kiminle yaptığını bildirir; farklı eylemler olduğu için aynı etkinlik değildir.'],
 ['“We first wash the fruit, then cut it, and finally eat it.” Aile meyveyi yemeden hemen önce ne yapar?','Keser','Yıkar','Satın alır','Sular','First–then–finally sırası yıkama, kesme, yeme biçimindedir. Hemen önceki adım kesmedir; yıkamak daha önce yapılır.'],
 ['“My brother likes football, but I like chess.” Ortak bir oyun seçmek için hangi bilgi henüz verilmemiştir?','İkisinin de sevdiği bir oyun','Erkek kardeşin sevdiği oyun','Konuşanın sevdiği oyun','İki kişinin farklı oyun sevdiği','Metin birinin futbolu, diğerinin satrancı sevdiğini söyler. İkisinin de sevdiği bir oyun belirtilmediği için ortak tercih ayrıca sorulmalıdır.'],
 ['“This is not my mother. She is my father’s sister.” Tanıtılan kişi kimdir?','Hala','Anne','Büyükanne','Kız kardeş','Father’s sister babanın kız kardeşidir; Türkçede hala, İngilizcede aunt denir. Not my mother ifadesi anne seçeneğini de eler.'],
 ['“Our family is at home. Dad is cooking; my sister and I are setting the table.” Hangisi metinden çıkarılabilir?','Aile üyeleri yemek hazırlığında farklı işler yapıyor.','Herkes aynı anda yemek pişiriyor.','Kız kardeş evde değil.','Baba sofrayı tek başına kuruyor.','Baba yemek pişiriyor, iki kardeş sofrayı kuruyor. Böylece farklı görevleri paylaşıyorlar; herkesin aynı işi yaptığı söylenemez.']
 ],'family_test1_distractors_language_and_explanations');

test(1,'turkce','mustafa-kemalden-ataturke','zor',2,[
 ['“Ece, Atatürk’ün resmini çizdi. Resmi sınıf panosuna astı.” Ece resmi nereye astı?','Sınıf panosuna','Çantasına','Kitabına','İkinci cümlede resmin sınıf panosuna asıldığı söyleniyor. Çanta veya kitap hakkında bilgi verilmemiş.'],
 ['“Ali, Atatürk’le ilgili kitabı açtı. Önce resimlere baktı, sonra metni okudu.” Ali metni okumadan önce ne yaptı?','Resimlere baktı.','Kitabı kapattı.','Resmi boyadı.','Önce sözcüğü sırayı gösterir. Ali önce resimlere bakmış, daha sonra metni okumuştur.'],
 ['“Sınıfımız bayram için bayraklarla süslendi.” Cümlede süslenen yer neresidir?','Sınıf','Bahçe','Ev','Sınıfımız sözcüğü süslenen yeri bildirir. Bahçe veya ev cümlede geçmiyor.'],
 ['“Duru, Atatürk hakkında merak ettiği soruyu öğretmenine sordu.” Duru kime soru sordu?','Öğretmenine','Arkadaşına','Kardeşine','Cümledeki öğretmenine sözcüğü kime sorusunu cevaplar. Soruyu soran kişi ise Duru’dur.'],
 ['“Atatürk kitap okumayı severdi.” Bu cümlede hangi etkinlikten söz ediliyor?','Kitap okumaktan','Top oynamaktan','Resim çizmekten','Kitap okumayı ifadesi sevilen etkinliği bildirir. Diğer etkinliklerle ilgili bilgi yoktur.'],
 ['“Bayramda şiir okudum. Arkadaşlarım beni alkışladı.” Bu metin için uygun başlık hangisidir?','Bayram Şiirim','Kayıp Kalemim','Orman Gezisi','Metnin olayı bayramda şiir okumaktır. Başlık ana olayı anlatmalı; kalem kaybı veya gezi metinde yoktur.'],
 ['“Öğretmen, Atatürk’ün çocuklara verdiği değeri anlattı. Ece dikkatle dinledi.” Dinleyen kimdir?','Ece','Atatürk','Öğretmen','Ece dikkatle dinledi cümlesinde dinleme işini Ece yapıyor. Öğretmen ise anlatan kişidir.'],
 ['“Önce bayrağı çizdim. Sonra kırmızıya boyadım.” Boyamadan önce yapılan iş hangisidir?','Çizmek','Silmek','Kesmek','Önce bayrağı çizdim ifadesi ilk işi belirtir. Sonra sözcüğü boyamanın çizimden sonra yapıldığını gösterir.'],
 ['“Anıtkabir gezisinden sonra gördüklerimi aileme anlattım.” Çocuk ne zaman anlatmıştır?','Geziden sonra','Geziden önce','Geziye gitmeden','Gezisinden sonra sözcükleri anlatmanın zamanını verir. Önce veya gitmeden denirse sıra değişir.'],
 ['“Bayram gelince çok sevindim.” Bu cümlede hangi duygu vardır?','Sevinç','Korku','Öfke','Sevindim sözcüğü mutluluk ve sevinç bildirir. Korku veya öfke anlatan bir sözcük kullanılmamış.']
 ],'turkish_theme_alignment_and_age_appropriate_reading');

// Preserve existing illustration slots with question-specific evidence, never the answer key.
export const visualEvidence = {
 '3-sinif-ingilizce-school-life-zor-test-2:3': ['School plan',{first:'Reading',second:'Lunch',third:'Games'}],
 '3-sinif-ingilizce-classroom-life-zor-test-2:2': ['Pencil locations',{first:'Red pencils: in the box',second:'Blue pencils: on the desk'}],
 '3-sinif-ingilizce-classroom-life-zor-test-2:6': ['Classroom note',{first:'Bag: under the chair',second:'Book: in the bag'}],
 '3-sinif-ingilizce-family-life-zor-test-2:5': ['Family activities',{first:'Mum: reading',second:'Dad: drawing',third:'Deniz: helping Dad'}]
};

const precise = [
 ['1-sinif-turkce-guzel-davranislarimiz-zor-test-2',8,['“Yaşlı komşumuzun poşetini taşıdım.” cümlesinde yaşlı yerine hangi sözcük gelirse anlam değişmez?','İhtiyar','Genç','Hasta','Yaşlı ile ihtiyar aynı anlama gelir. Genç karşıt anlamlıdır; hasta ise kişinin yaşını değil sağlığını anlatır.']],
 ['1-sinif-turkce-cevremizdeki-yasam-zor-test-2',0,['“Bahçedeki çiçekleri suladım” cümlesi bir işi haber veriyor. Sonuna hangi işaret gelir?','Nokta (.)','Soru işareti (?)','Virgül (,)','Bu cümle soru sormuyor veya seslenmiyor; yapılan işi haber veriyor. Bu nedenle sonuna nokta konur. Her cümle noktayla bitmez: Soru cümlesinde soru işareti kullanılır.']],
 ['1-sinif-matematik-geometrik-sekiller-zor-test-2',9,['Zeynep dört eşit çubukla kapalı bir şekil yaptı. Köşeleri kitabın köşeleri gibi diktir. Hangi şekli yaptı?','Kare','Üçgen','Çember','Dört eşit kenarı ve dört dik köşesi olan şekil karedir. Üçgenin üç kenarı vardır; çemberin düz kenarı ve köşesi yoktur.']],
 ['1-sinif-matematik-sayilar-ve-nicelikler-zor-test-2',6,['16’dan başlayıp geriye birer sayıyoruz: 16, …, 14. Boş yere hangi sayı gelir?','15','17','13','Geriye birer sayarken her adımda 1 çıkarılır: 16 − 1 = 15, sonra 15 − 1 = 14. 17 ileri sayarken gelir.']],
 ['1-sinif-matematik-veriye-dayali-arastirma-zor-test-2',7,['Kitap tablosu: Ece 4, Can 6 kitap okumuş. Can, Ece’den kaç kitap fazla okumuş?','2','10','4','Tablodaki iki sayının farkı soruluyor: 6 − 4 = 2. 10 ise iki çocuğun toplamıdır, fazla okunan miktar değildir.']],
 ['1-sinif-matematik-veriye-dayali-arastirma-zor-test-2',8,['Oyun oyları: Saklambaç 5, körebe 3. Körebeye 2 oy daha gelirse ne olur?','Oylar eşit olur.','Körebe daha fazla olur.','Saklambaç 2 oy önde kalır.','Körebenin yeni oyu 3 + 2 = 5 olur. Saklambaç da 5 oy aldığı için iki oy sayısı eşitlenir.']],
 ['3-sinif-fen-bilimleri-maddeyi-taniyalim-karistirip-ayiralim-zor-test-2',6,['Deneyde demir çivi ile cam bilye suyun dibine indi; boş plastik kap suyun üstünde kaldı. Bu gözleme göre hangisi doğrudur?','Bu deneyde çivi ve bilye battı, boş kap yüzdü.','Bütün metal ve plastik eşyalar yüzer.','Bütün yuvarlak nesneler suyun üstünde kalır.','Gözlem yalnız denenen nesneler için sonuç verir. Nesnenin malzemesi, biçimi ve içindeki hava davranışı etkileyebilir; bütün eşyalara kesin genelleme yapılamaz.']],
 ['4-sinif-fen-bilimleri-aydinlatma-ve-ses-teknolojileri-zor-test-2',1,['Bir odadaki ampul değiştirilince aynı aydınlık daha az elektrikle sağlanıyor. Bu değişimin yararı hangisidir?','Aydınlatma için harcanan enerji azalır.','Oda mutlaka daha karanlık olur.','Elektrik tüketimi tamamen sıfır olur.','Işık artık hiçbir yöne yayılmaz.','Aydınlık aynı kaldığı hâlde daha az elektrik kullanılıyorsa enerji tasarrufu sağlanır. Daha az tüketmek, hiç enerji tüketmemek anlamına gelmez.']],
 ['4-sinif-sosyal-bilgiler-bilim-teknoloji-ve-toplum-zor-test-2',2,['Bir sokakta mumla çalışan fenerler yerine elektrikli lambalar kullanılmaya başlanıyor. Bu değişim doğrudan hangi ihtiyaca yöneliktir?','Aydınlatma','Ulaşım aracı üretme','Yiyecek saklama','Haber gönderme','Fener ve lamba karanlıkta çevreyi görmeye yarar. Araç değişse de karşılanan temel ihtiyaç aydınlatmadır; diğer ihtiyaçlar için farklı araçlar gerekir.']]
];
for(const [slug,index,row] of precise)repairs.push({slug,index,row,reason:'verified_ambiguity_topic_or_factual_overclaim'});

test(2,'ingilizce','classroom-life','zor',2,[
 ['“Open your book. Read page two.” Önce ne yapmalısın?','Kitabı açmak','Kitabı kapatmak','Deftere yazmak','Open aç demektir. İkinci yönerge ikinci sayfayı okumaktır; okuyabilmek için önce kitabı açarsın.'],
 ['Sınıf kartı: “Pencil: red. Book: blue.” What colour is the book?','Blue','Red','Yellow','Kartta book yanında blue yazıyor; kitap mavidir. Red kalemin rengidir, kitabın değil.'],
 ['“I write with a pencil.” cümlesindeki çocuk ne kullanıyor?','A pencil','A ruler','An eraser','Write yazmak demektir; with a pencil kalemle anlamındadır. Ruler cetvel, eraser silgidir.'],
 ['Teacher: “Stand up, please.” Hangi öğrenci yönergeyi uygular?','Ayağa kalkan','Yerine oturan','Kitabını kapatan','Stand up ayağa kalk demektir. Sit down otur anlamındadır ve ters davranışı ister.'],
 ['“My book is in my bag.” Kitabı bulmak için nereye bakılır?','Çantanın içine','Çantanın altına','Masanın üstüne','In içinde demektir. Cümle kitabın çantanın içinde olduğunu söyler; alt veya üst konumu verilmemiştir.'],
 ['“Please be quiet. Listen to the story.” Ne yapman bekleniyor?','Sessizce dinlemek','Yüksek sesle şarkı söylemek','Arkadaşınla konuşmak','Be quiet sessiz ol, listen dinle demektir. İki yönerge birlikte öyküyü sessizce dinlemeyi ister.'],
 ['“I have two pencils. You have one.” İkisinin toplam kaç kalemi var?','Three','Two','One','Two 2, one 1 demektir. Toplam 2 + 1 = 3 kalemdir; İngilizce üç sözcüğü three olur.'],
 ['“Close the window, not the door.” Hangisi kapatılmalı?','Window','Door','Both','Window pencere, door kapıdır. Not the door kapıyı değil demektir; bu yüzden yalnız pencere kapatılır.'],
 ['Teacher: “Show me your notebook.” Öğretmen hangi eşyayı görmek istiyor?','Defter','Kitap','Kalem kutusu','Show me bana göster demektir. Notebook defterdir; book kitap, pencil case kalem kutusudur.'],
 ['“First draw a circle. Then colour it.” Hangisi ikinci iş?','Boyamak','Çember çizmek','Kâğıdı katlamak','Then sonra anlamındadır ve ikinci işi başlatır. Önce çember çizilir, sonra colour yani boyama yapılır.']
 ],'grade2_english_topic_mismatch');
test(2,'ingilizce','personal-life','zor',2,[
 ['“My name is Ada. I am seven.” How old is Ada?','Seven','Ada','Eight','How old yaş sorar. Metinde yaş seven yani 7 olarak verilmiş; Ada kişinin adıdır.'],
 ['“I like milk. I do not like tea.” Hangi içecek seviliyor?','Milk','Tea','Both','Like seviyorum, do not like sevmiyorum demektir. Sevilen içecek milk yani süttür; tea çaydır.'],
 ['“I am cold.” diyen çocuğa hangi eşya uygun olur?','A coat','An ice cream','A fan','Cold üşümüş veya soğuk demektir. Coat monttur ve ısınmaya yardımcı olur; dondurma ve vantilatör aynı ihtiyacı karşılamaz.'],
 ['“I wash my hands before lunch.” Eller ne zaman yıkanır?','Yemekten önce','Yemekten sonra','Uyurken','Before önce demektir. Lunch öğle yemeğidir; el yıkama bu yemekten önce yapılır.'],
 ['“My hair is brown. My eyes are blue.” What is blue?','My eyes','My hair','Both','Eyes gözler, hair saçtır. Blue gözleri, brown saçı tanımlıyor; rengi doğru isimle eşleştirmek gerekir.'],
 ['Kişi kartı: “Name: Ece. Age: eight.” Which question asks for eight?','How old are you?','What is your name?','How are you?','Eight kartta age yani yaş bilgisidir. How old yaş sorar; name adı, how are you nasıl olduğunu sorar.'],
 ['“I can jump. I cannot fly.” Çocuk hangisini yapabilir?','Jump','Fly','Both','Can yapabilirim, cannot yapamam demektir. Yapabildiği hareket jump yani zıplamaktır.'],
 ['“I get up, then wash my face.” Hangisi önce yapılır?','Kalkmak','Yüz yıkamak','Yatmak','Get up kalkmak demektir. Then sözcüğü yüz yıkamanın daha sonra olduğunu gösterir.'],
 ['“I am happy. Today is my birthday.” Mutlu olmasının metindeki nedeni nedir?','Doğum günü olması','Oyuncağını kaybetmesi','Hasta olması','Birthday doğum günü demektir. Metin mutlulukla birlikte bu bilgiyi veriyor; kayıp veya hastalık anlatılmıyor.'],
 ['“I have a blue hat and red shoes.” What colour are the shoes?','Red','Blue','Green','Shoes ayakkabılar demektir. Red shoes kırmızı ayakkabılardır; blue şapkanın rengidir.']
 ],'grade2_english_topic_mismatch');
test(2,'ingilizce','family-life','zor',2,[
 ['“This is my mum. Her name is Eda.” Who is Eda?','My mother','My sister','My grandmother','Mum anne demektir. İkinci cümle annenin adının Eda olduğunu söyler; mother aynı aile üyesini belirtir.'],
 ['“My dad is tall. My brother is short.” Who is short?','My brother','My dad','Both','Short kısa, tall uzun demektir. Brother erkek kardeştir ve kısa olduğu belirtilen kişidir.'],
 ['“I have one sister and one brother.” Kaç kardeşten söz ediliyor?','Two','One','Three','One sister bir kız kardeş, one brother bir erkek kardeştir. 1 + 1 = 2; two iki demektir.'],
 ['“My grandmother reads. My grandfather sleeps.” Kim okuyor?','Grandmother','Grandfather','Both','Reads okuyor, sleeps uyuyor demektir. Okuyan grandmother yani büyükannedir; grandfather büyükbabadır.'],
 ['“She is my sister.” cümlesini hangi Türkçe ifade karşılar?','O benim kız kardeşim.','O benim erkek kardeşim.','O benim babam.','Sister kız kardeş demektir. She kız veya kadın için kullanılır; brother erkek kardeştir.'],
 ['“My mother is in the garden. My father is at home.” Who is in the garden?','My mother','My father','Both','Garden bahçe demektir. Cümle annenin bahçede, babanın evde olduğunu söylüyor. İki yer bilgisini ayrı takip et.'],
 ['“I help my dad. We set the table.” Birlikte ne yapıyorlar?','Sofrayı kuruyorlar.','Kitap okuyorlar.','Top oynuyorlar.','Set the table sofrayı kurmak demektir. We biz anlamıyla çocuk ve babasının birlikte yaptığı işi gösterir.'],
 ['“Ali is my brother. He is six.” Altı yaşındaki kimdir?','Ali','Konuşan kişi','Anne','He bir önceki cümlede tanıtılan Ali’yi gösterir. Six 6 demektir; konuşanın yaşı söylenmiyor.'],
 ['“Mum and Dad are here. My sister is at school.” Kim okulda?','My sister','Mum','Dad','At school okulda demektir ve kız kardeş için söyleniyor. Here burada anlamındadır; anne ve baba buradadır.'],
 ['“This is my family: Mum, Dad and me.” Kaç kişi sayılmıştır?','Three','Two','Four','Mum anne, Dad baba, me ben demektir. Sayılan üç kişi vardır; three üç anlamına gelir.']
 ],'grade2_english_topic_mismatch');

const shortRepairs = [
 ['homes-houses-and-neighbourhoods',1,['“The cat is under the bed.” Kedi nerede?','Yatağın altında','Yatağın üstünde','Kapının önünde','Under altında, bed yatak demektir. Yer bildiren iki sözcük birlikte kedinin konumunu anlatır.']],
 ['homes-houses-and-neighbourhoods',2,['“We eat in the kitchen.” Aile nerede yemek yiyor?','Mutfakta','Banyoda','Yatak odasında','Kitchen mutfak demektir. Eat yemek yemek anlamındadır; cümlede yer olarak mutfak verilmiştir.']],
 ['life-in-the-city-and-the-world',2,['“I buy apples at the market.” Elma almak için nereye gidiliyor?','Market','Library','Hospital','Buy satın almak demektir. Metin elmaların marketten alındığını söyler; library kütüphane, hospital hastanedir.']],
 ['life-in-the-city-and-the-world',8,['“The park is next to the school.” Park neyin yanında?','School','Hospital','Bakery','Next to yanında demektir. Cümlede bu ilişki school yani okul ile kurulmuştur; diğer yerler söylenmiyor.']],
 ['life-in-the-city-and-the-world',9,['“The bus goes to the museum.” Otobüsün gittiği yer neresi?','Museum','Library','Market','Goes to bir yere gider demektir. Verilen hedef museum yani müzedir; kütüphane veya market değildir.']]
];
for(const [topic,index,row] of shortRepairs)repairs.push({slug:`2-sinif-ingilizce-${topic}-zor-test-2`,index,row,reason:'off_topic_translation_template'});
Object.assign(visualEvidence,{
 '3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1:1':['İki öğrencinin kask kullanımı',{first:'İpek: kaskının kayışını bağlıyor',second:'Can: kask kayışını açık bırakıyor'}],
 '3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1:7':['İlaç kutusu bulan iki öğrenci',{first:'Ece: bir yetişkine haber veriyor',second:'Arda: ilacı izinsiz kullanıyor'}]
});
Object.assign(visualEvidence,{
 '3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1:9':['İki öğrencinin diş fırçası kullanımı',{first:'Zeynep: kendi diş fırçasını kullanıyor',second:'Arda: arkadaşının fırçasını kullanıyor'}]
});
Object.assign(visualEvidence,{
 '2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1:1':['Kaygan zemindeki iki öğrenci',{first:'Ela: uzak durup yetişkine haber veriyor',second:'Can: suyun üzerinden koşuyor'}],
 '3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1:1':['Servisteki iki öğrenci',{first:'Efe: emniyet kemerini takıyor',second:'Duru: kemerini çıkarmış'}]
});
Object.assign(visualEvidence,{
 '1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-orta-test-1:1':['Parktaki iki öğrenci',{first:'Ece: çöpünü kutuya atıyor',second:'Mert: çöpünü bankta bırakıyor'}],
 '2-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1:1':['Kütüphanedeki iki öğrenci',{first:'Deniz: kitabı özenle kullanıyor',second:'Bora: sayfaları yırtıyor'}]
});
Object.assign(visualEvidence,{
 '2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1:1':['Bisiklet kullanan iki öğrenci',{first:'Ela: kaskını takıp kayışını bağlıyor',second:'Can: kaskını takmıyor'}],
 '1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1:1':['Parktaki iki öğrenci',{first:'Ece: çöpünü kutuya atıyor',second:'Ali: çöpünü yere bırakıyor'}]
});
Object.assign(visualEvidence,{
 '1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1:1':['El temizliği',{first:'Elif: sabun ve su kullanıyor',second:'Can: peçeteyle siliyor'}],
 '2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1:1':['Servisteki iki öğrenci',{first:'Ayşe: emniyet kemerini takıyor',second:'Eren: kemerini takmıyor'}]
});
Object.assign(visualEvidence,{
 '1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1:1':['Koridordaki iki öğrenci',{first:'Mert: yavaş yürüyor',second:'Ada: koşuyor'}],
 '1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1:1':['İki öğrencinin davranışı',{first:'Ece: yemekten önce ellerini yıkıyor',second:'Bora: ellerini yıkamadan yemek yiyor'}]
});
Object.assign(visualEvidence,{
 '2-sinif-ingilizce-classroom-life-zor-test-2:1':['Classroom colours',{first:'Pencil: red',second:'Book: blue'}],
 '2-sinif-ingilizce-personal-life-zor-test-2:5':['About Ece',{first:'Name: Ece',second:'Age: eight'}]
});

const explanationEvidence={
 'school-life':['Where yer sorar. It is next to the classroom, sınıfın yanında demektir ve kütüphanenin yerini bildirir; selamlaşma veya renk söylemek yer sorusunu cevaplamaz.','School okul demektir. Okul sözcüğü bir yerin adıdır; sınıf eşyası veya farklı bir yer adıyla yapılan eşleştirme doğru olmaz.','Reads a book kitap okuyor, in the library kütüphanede demektir. Emma’nın yaptığı iş okumaktır; uyuduğu veya eve gittiği söylenmiyor.'],
 'classroom-life':['What is this, bu nedir demektir. It is a ruler bir cetvel olduğunu söyler; kişinin nasıl olduğu veya selamlaşma sözleri nesnenin adını vermez.','Pencil kurşun kalem, board tahta, classroom sınıf demektir. Bu eşleştirmede pencil ile kurşun kalem aynı nesneyi adlandırır.','Puts his notebook on the desk, defterini sıranın üstüne koyar demektir. Eylem defteri yerleştirmektir; metin kaybetme veya uyumadan söz etmez.'],
 'personal-life':['How old are you yaşını sorar. I am eight years old sekiz yaşındayım demektir; renk veya selamlaşma sözü yaş bilgisi vermez.','Happy mutlu demektir. Toothbrush diş fırçası, bathroom banyodur; bunlar happy sözcüğünün karşılığı değildir.','Washes her hands before lunch, öğle yemeğinden önce ellerini yıkar demektir. Washes eylem, hands yıkanan şey, before lunch zaman bilgisidir.'],
 'family-life':['Who is she, o kim sorusudur. She is my sister onun kız kardeş olduğunu bildirir; selamlaşma veya bir renk söylemek kişiyi tanıtmaz.','Mother anne demektir. Family photo aile fotoğrafı, living room oturma odasıdır; mother sözcüğünün anlamı bu nesne veya yer adları değildir.','Helps his father set the table, babasına sofrayı kurarken yardım eder demektir. Jack’in işi sofra hazırlığıdır; metin uyuduğunu veya çantasını kaybettiğini söylemez.'],
 'homes-houses-and-neighbourhoods':['Where is the cat kedinin yerini sorar. It is under the table masanın altında demektir ve yer bildirir; selam veya renk cevabı bu bilgiyi vermez.','Kitchen mutfak demektir. Sofa kanepe, bedroom yatak odasıdır; mutfak sözcüğü kitchen ile eşleşir.','Sees a bakery next to her house, evinin yanında bir fırın görür demektir. Next to iki yerin yan yana olduğunu anlatır; metinde uyuma veya eve dönme eylemi yoktur.'],
 'life-in-the-city-and-the-world':['Where do you live nerede yaşıyorsun demektir. I live in Türkiye, Türkiye’de yaşıyorum anlamıyla istenen yeri bildirir; selamlaşma veya renk belirtme yeterli olmaz.','Bus otobüs demektir. City map şehir haritası, city centre şehir merkezidir; bunlar bir ulaşım aracı olan bus ile aynı anlamda değildir.','Finds the museum on the city map, şehir haritasında müzeyi bulur demektir. Alex’in yaptığı iş harita üzerinde yer bulmaktır; metin uyuduğunu söylemez.']
};
const readingRepairs={
 'school-life':[
 ['“Emma reads a book in the library.” Metinde yapılan iş ve yer hangisidir?','Kitap okuma — kütüphane','Kitap okuma — oyun alanı','Oyun oynama — kütüphane','Yemek yeme — yemekhane','Reads a book kitap okuyor, in the library kütüphanede demektir. Doğru cevap hem işi hem yeri birlikte karşılamalıdır.'],
 ['“Emma wants a storybook. She goes to the library and reads.” Emma neden kütüphaneye gitmiştir?','Öykü kitabı okumak için','Bahçede oynamak için','Öğle yemeği yemek için','Sınıfı temizlemek için','İlk cümlede storybook istediği, son cümlede okuduğu belirtilir. Bu bilgiler kütüphaneye kitap okumak için gittiğini gösterir.']],
 'classroom-life':[
 ['“Tom puts his notebook on the desk.” Ne, nereye konuyor?','Defter — sıranın üstüne','Defter — çantanın içine','Kitap — sıranın altına','Kalem — kutunun içine','Notebook defter, on the desk sıranın üstü demektir. Hem nesne hem konum doğru eşleştirilmelidir.'],
 ['“Tom needs his notebook. It is in his bag. He takes it out and puts it on the desk.” Defterin yeri nasıl değişti?','Çantadan sıranın üstüne geldi.','Sıradan çantaya girdi.','Sıradan pencereye geldi.','Çantadan yere düştü.','Başlangıçta in his bag çantanın içinde, sonunda on the desk sıranın üstündedir. Takes it out dışarı çıkarmayı anlatır.']],
 'personal-life':[
 ['“Mia washes her hands before lunch.” Ne, ne zaman yapılır?','El yıkama — yemekten önce','El yıkama — yemekten sonra','Diş fırçalama — yemekten önce','Yüz yıkama — uykudan sonra','Washes her hands el yıkamak, before lunch öğle yemeğinden önce demektir. Eylem ve zaman birlikte okunmalıdır.'],
 ['“Mia plays outside. Her hands get dirty. She washes them before lunch.” Mia neden ellerini yıkar?','Dışarıda oynarken elleri kirlendiği için','Ellerinin temiz kalmasını istemediği için','Öğle yemeğini bitirdiği için','Uyumaya gittiği için','Her hands get dirty elleri kirlenir demektir. Ardından yıkama, kirlenmeyle ilişkilidir; before lunch yemeğin henüz başlamadığını gösterir.']],
 'family-life':[
 ['“Jack helps his father set the table.” Hangi yardım yapılıyor?','Babasıyla sofrayı hazırlama','Annesiyle kitap okuma','Kardeşiyle oyun oynama','Büyükannesiyle bahçe sulama','His father babası, set the table sofrayı kurmak demektir. Hem kişi hem iş doğru eşleştirilmelidir.'],
 ['“Dad cooks dinner. Jack puts plates on the table. Then they eat together.” Jack hangi görevi üstlenmiştir?','Sofrayı hazırlama','Yemek pişirme','Bulaşık yıkama','Alışveriş yapma','Puts plates on the table masaya tabak koyar demektir. Bu sofra hazırlığıdır; yemeği pişiren kişi Dad olarak belirtilmiştir.']],
 'homes-houses-and-neighbourhoods':[
 ['“Lily sees a bakery next to her house.” Fırının yeri nedir?','Evin yanında','Evin içinde','Okulun altında','Parkın karşısında','Bakery fırın, next to her house evinin yanında demektir. Next to ile inside veya opposite aynı yer ilişkisini anlatmaz.'],
 ['“Lily needs bread. There is a bakery next to her house. She walks there.” Lily nereye ve neden gider?','Ekmek almak için fırına','Kitap almak için kütüphaneye','İlaç almak için eczaneye','Oynamak için parka','Needs bread ekmek ihtiyacını bildirir. Bakery fırındır; there önceki cümledeki fırını gösterir. İhtiyaç ile yer birleştirilir.']],
 'life-in-the-city-and-the-world':[
 ['“Alex finds the museum on the city map.” Alex neyi hangi araçla buluyor?','Müzeyi — şehir haritasıyla','Otobüsü — takvimle','Okulu — sözlükle','Parkı — saatle','Museum müze, city map şehir haritasıdır. Finds bulur demektir; doğru cevap bulunan yer ile kullanılan kaynağı eşleştirir.'],
 ['“Alex wants to visit the museum. He cannot find it. He looks at the city map.” Harita hangi soruna yardımcı olur?','Müzenin yerini bulmaya','Müzenin rengini değiştirmeye','Müze biletini ödemeye','Müzedeki nesneleri temizlemeye','Cannot find it onu bulamıyor demektir. Harita yerleri gösterir; Alex’in müzenin yerini bulmasına yardımcı olur, ödeme aracı değildir.']]
};
for(const grade of [2,3])for(const [baseTopic,e]of Object.entries(explanationEvidence)){
 if(grade===3&&baseTopic==='family-life')continue; // already fully repaired above
 const topic=grade===3&&baseTopic==='homes-houses-and-neighbourhoods'?'homes-houses-and-the-neighbourhood':baseTopic;
 for(const [index,explanation]of [[2,e[0]],[6,e[1]],[7,e[0]],[8,e[2]]])repairs.push({slug:`${grade}-sinif-ingilizce-${topic}-kolay-test-1`,index,fields:{explanation},reason:'question_specific_language_evidence'});
 for(const [difficulty,index,row]of [['orta',9,readingRepairs[baseTopic][0]],['zor',2,readingRepairs[baseTopic][1]]])repairs.push({slug:`${grade}-sinif-ingilizce-${topic}-${difficulty}-test-1`,index,row:[`${grade}. sınıf İngilizce ${difficulty} — ${row[0]}`,...row.slice(1)],reason:'replace_unsupported_main_idea_with_text_evidence'});
}

const scienceRows=[
 ['bilimsel-kesif-yolculugu',['Bir filizin büyümesini karşılaştırmak isteyen çocuk hangi kaydı tutmalıdır?','Her gün aynı yöntemle ölçülen boy ve tarih','Yalnız saksının rengi','Yalnız tohumun satın alındığı yer','Her gün farklı cetvelle tahmin edilen boy','Boy ve tarih büyümenin zaman içindeki değişimini gösterir. Aynı yöntemle ölçmek sonuçları karşılaştırmayı kolaylaştırır.']],
 ['canlilar-dunyasina-yolculuk',['Bir bitki ve bir kedinin ortak canlılık özelliği hangisidir?','Büyüme ve gelişme','Yürüyerek yer değiştirme','Aynı tür besinleri yeme','Aynı büyüklüğe ulaşma','Hem bitki hem kedi büyür ve gelişir. Bitki yürümez; canlıların beslenme biçimi ve ulaştığı büyüklük aynı olmak zorunda değildir.']],
 ['yer-bilimciler-is-basinda',['Yağmurdan sonra bir yamaçtan dereye toprak taşındı. Bu olayı açıklayan ilişki hangisidir?','Akan su toprağı sürükledi.','Toprak yağmurla yok oldu.','Dere toprağı hiç etkilemedi.','Yağmur bütün taşları eritti.','Yüzeyden akan su toprağı başka yere taşır. Toprak yok olmaz; bir yerde azalırken başka yerde birikebilir.']],
 ['maddeyi-taniyalim-karistirip-ayiralim',['İri çakıl ile ince kum karışımını ayırırken hangi farktan yararlanılır?','Tane büyüklüğü','İkisinin aynı kapta olması','İkisinin kuru olması','Karışımın toplam miktarı','Uygun elek ince kumu geçirir, iri çakılları tutar. Bu yöntem tanecik büyüklüğü farkına dayanır.']],
 ['hareketi-kesfediyorum',['Kaleci kendisine gelen topu tutup durduruyor. Kuvvetin hangi etkisi gözleniyor?','Hareketi durdurma','Topun kütlesini artırma','Topu sürekli hızlandırma','Topun malzemesini değiştirme','Top hareket ederken kalecinin etkisiyle durur. Bu, kuvvetin hareketi durdurabildiğini gösterir; kütle veya malzeme değişimi gözlenmez.']],
 ['yasamimizi-kolaylastiran-elektrik',['Bir el feneri uygun pili bitince ışık vermiyor. Aynı tür yeni pil takılınca çalışıyor. Hangi ilişki desteklenir?','Fener çalışmak için pilden enerji alır.','Fener yalnız güneş ışığında çalışır.','Pilin rengi ışığın tek nedenidir.','Fener elektrik kullanmaz.','Pil değişince fenerin çalışması, gerekli enerjinin pilden sağlandığını destekler. Renk veya güneş koşulu değişken olarak verilmemiştir.']],
 ['topragi-taniyorum-tarimi-kesfediyorum',['Bitki kökleri bulunan bir yamaçta yağmurla daha az toprak taşınıyor. Köklerin etkisi ne olabilir?','Toprağın tutulmasına yardımcı olur.','Yağmurun yağmasını durdurur.','Topraktaki bütün suyu yok eder.','Toprağı tamamen taşa çevirir.','Kökler toprak parçalarının tutulmasına yardımcı olur; böylece akan suyun taşıdığı miktar azalabilir. Yağışı durdurmaz veya toprağı taşa dönüştürmez.']],
 ['canlilarin-yasam-alanlarina-yolculuk',['Bir kuşun yaşadığı ağaç kesilince yuvası da kayboluyor. Hangi ihtiyaç doğrudan etkilenmiştir?','Barınma','Tüy rengini değiştirme','Kanat sayısını artırma','Günün uzunluğunu değiştirme','Yuva kuşun barınma ve yavrularını koruma alanıdır. Ağacın kesilmesi bu alanı ortadan kaldırır; diğer seçenekler barınma ihtiyacı değildir.']]
];
for(const [topic,row]of scienceRows)repairs.push({slug:`3-sinif-fen-bilimleri-${topic}-orta-test-1`,index:7,row,reason:'replace_generic_model_and_distractors'});
repairs.push({slug:'2-sinif-hayat-bilgisi-bilim-teknoloji-ve-sanat-zor-test-2',index:9,row:['Geri dönüşüm afişinde “Atıkları ayır” yazıyor. Hangi çizim bu mesajı açıklar?','Kâğıt ve camı ayrı kutulara koyan çocuk','Bütün atıkları tek kutuya atan çocuk','Aynı atıkları kutudan yere döken çocuk','Atıkları ayırmak, türlerine göre ayrı toplamak demektir. Kâğıt ve camın farklı kutulara konması hem başlığın anlamını gösterir hem izlenecek davranışı açıklar.'],reason:'replace_generic_distractor_with_relevant_actions'});

import {schoolRepairs} from './school-repairs.mjs';
for (const [difficulty, rows] of Object.entries(schoolRepairs)) test(3,'hayat-bilgisi','ben-ve-okulum',difficulty,1,rows,'Repeated cross-grade behavior templates replaced with distinct school scenarios, evidence-based explanations and three choices.');

import {scienceRepairs,scienceVisuals,scienceInferenceRepairs} from './science-repairs.mjs';
for(const [topic,row] of Object.entries(scienceInferenceRepairs))repairs.push({slug:`3-sinif-fen-bilimleri-${topic}-orta-test-1`,index:0,row,reason:'The keyed prediction did not follow from the observation; replace with an evidence-bounded conclusion.'});
for(const [topic,rows] of Object.entries(scienceRepairs)) {
 test(3,'fen-bilimleri',topic,'zor',1,rows,'Replace generic or unsupported science inference with topic-specific evidence, plausible alternatives and an explained answer.');
 if(topic==='hareketi-kesfediyorum') {
  const skills=[['Kuvvetin farklı etkilerini karşılaştırma','cikarim'],['Yön ve hız bilgisini ayırt etme','cikarim'],['Eşit sürelerde alınan yolu karşılaştırma','gorsel-okuma'],['Sallanma ve dönme hareketlerini ayırt etme','karsilastirma'],['Kontrollü denemede zemin etkisini yorumlama','cikarim'],['Hız ve yön değişimini ayırt etme','gorsel-okuma'],['İtme ve çekmeyi karşılaştırma','siralama'],['Kuvvetin biçim ve hareket etkilerini karşılaştırma','cikarim'],['Eşit aralıklarda alınan yolu karşılaştırma','gorsel-okuma'],['Çarpışma sonrası yön değişimini yorumlama','gorsel-okuma']];
  for(const [index,[subSkill,questionType]] of skills.entries()) {
   const repair=repairs.find(p=>p.slug==='3-sinif-fen-bilimleri-hareketi-kesfediyorum-zor-test-1'&&p.index===index);
   if(!repair) throw new Error(`Missing motion repair ${index}`);
   repair.metadata={subSkill,questionType};
  }
 }
 for(const [n,index] of [2,5,8,9].entries()) {
  const [title,first,second]=scienceVisuals[topic][n];
  visualEvidence[`3-sinif-fen-bilimleri-${topic}-zor-test-1:${index}`]=[title,{first,second}];
 }
}
