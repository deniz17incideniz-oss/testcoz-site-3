// Each entry explains the actual language cue; no generic answer-only fallback.
const groups = {
 'T2-G1-INGI-GREETI': [
 'Hello, karşılaşınca söylenen merhaba ifadesidir. Goodbye ayrılırken, good night uyumadan önce kullanılır.',
 'Morning sabah demektir. Good morning, sabah selamlaşırken söylenen günaydın ifadesidir.',
 'One bir, two iki, three üç demektir. Diğer diziler dört veya daha büyük sayılardan başlar.',
 'What is your name kişinin adını sorar. My name is Can cümlesi adım Can anlamına gelir; yaş veya sağlık bildirmez.',
 'How are you, nasıl olduğunu sorar. I am fine, thank you; iyiyim, teşekkür ederim anlamına gelir.',
 'Görselde beş elma vardır. İngilizcede beş sayısına five denir; three üç, four dört demektir.',
 'Uyumadan önce iyi geceler denir. İngilizcede bu ifade good night biçimindedir; morning sabahı anlatır.',
 'Stand ayağa kalkmak, up yukarı anlamını taşır. Stand up yönergesi ayağa kalkmayı ister; sit down oturmayı ister.',
 'Seven yedi demektir. I am seven cümlesi kişinin yedi yaşında olduğunu bildirir.',
 'Goodbye ayrılırken kullanılan hoşça kal ifadesidir. Stand up ve sit down sınıf içi hareket yönergeleridir.'
 ],
 'T2-G1-INGI-NUMBER': [
 'Görseldeki güneş sarı renkle çizilmiştir. Sarının İngilizcesi yellow, mavinin blue, kırmızının red sözcüğüdür.',
 'Bag çanta demektir. Eraser silgi, pencil kurşun kalemdir; bunlar çantanın içine konabilen eşyalardır.',
 'Soruda mavi renk sorulmaktadır. Blue mavi, pink pembe, green yeşil anlamına gelir.',
 'Book kitap demektir. It is a book, bu bir kitaptır anlamındadır; desk sıra, board tahta demektir.',
 'İlkbahardaki yeşil yapraklar için green kullanılır. White beyaz, black siyah demektir.',
 'Pencil kurşun kalemdir. Silgi eraser, defter notebook sözcükleriyle anlatılır.',
 'Red kırmızı anlamına gelir. Sarı yellow, yeşil green olarak söylenir.',
 'Eraser, kurşun kalem yazısını silmeye yarayan silgidir. Pen kalem, ruler cetvel anlamına gelir.',
 'Open açmak, your book senin kitabın demektir. Yönerge kitabını aç anlamına gelir.',
 'White beyaz demektir. Black siyah, orange turuncu anlamındadır.'
 ],
 'T2-G1-INGI-COLOUR': [
 'Miyavlama kediye ait sestir; cat kedi demektir. Dog köpek, bird kuştur.',
 'Eye göz demektir; eyes çoğul biçimidir. İki gözden söz edildiği için eyes kullanılır.',
 'Köpeğin İngilizcesi dog sözcüğüdür. Fish balık, cow inek anlamına gelir.',
 'Ear kulak demektir. İşitme organı kulaktır; nose burun, head baş anlamına gelir.',
 'Bird kuş demektir. Verilen seçeneklerde uçabilen hayvan kuştur; frog kurbağa, cat kedidir.',
 'Nose burun anlamındadır; kokuları burunla algılarız. Mouth ağız, hand el demektir.',
 'Fish balık demektir. Verilen seçeneklerde suda yaşayan hayvan balıktır; monkey maymun, elephant fildir.',
 'Touch dokunmak, head baş anlamındadır. Touch your head, başına dokun yönergesidir.',
 'Frog kurbağa demektir. Snake yılan, horse at anlamındadır; vıraklama kurbağaya ait ipucudur.',
 'Mouth ağız demektir. Ear kulak, eye göz anlamındadır.'
 ],
 'T2-G1-INGI-CLASSR': [
 'Ball top demektir. Ayakla vurularak oynanan yuvarlak oyuncak toptur; doll bebek, kite uçurtmadır.',
 'Apple elma demektir. Orange portakal, lemon limon anlamındadır.',
 'Doll oyuncak bebek anlamına gelir. Teddy bear oyuncak ayı, block blok demektir.',
 'Banana muz demektir. Apple elma, cherry kiraz anlamına gelir.',
 'Kite uçurtmadır. Uçurtma bir ipe bağlı olarak rüzgârla yükselir; train tren, car arabadır.',
 'Orange portakal anlamına gelir. Apple elma, melon kavun demektir.',
 'Teddy bear oyuncak ayı demektir. Ball top, car araba anlamına gelir.',
 'Lemon limon demektir. Banana muz, apple elma anlamındadır.',
 'Car araba demektir. Kite uçurtma, doll oyuncak bebektir; tekerlekle ilerleyen seçenek arabadır.',
 'Like sevmek, apples elmalar demektir. I like apples cümlesi elmayı severim anlamını taşır.'
 ],
 'T2-G2-INGI-SCHOOL': [
 'Good morning sabah verilen selamdır. Karşılık olarak aynı selam kullanılır; good night geceye, goodbye ayrılışa aittir.',
 'Görselde elma kırmızı çizilmiştir. Kırmızı red, mavi blue, sarı yellow olarak söylenir.',
 'Blue mavi, yellow sarı boyadır. Bu iki boya karıştırıldığında yeşil elde edilir; yeşilin İngilizcesi green sözcüğüdür.',
 'Name ad demektir. Soru adı öğrenmek istediği için My name is Ayşe yanıtı uygundur; diğerleri durum veya yaş bildirir.',
 'Five beş, four dört demektir. 5 + 4 = 9 olduğundan İngilizce nine yanıtı gerekir.',
 'How are you, nasılsın anlamına gelir. What is this nesneyi, how old are you yaşı sorar.',
 'One, two, three sayıları 1, 2, 3’tür. Sonraki sayı 4, yani four olur; ardından five gelir.',
 'Soruda sarı renk tarif ediliyor. Yellow sarı, green yeşil, white beyaz demektir.',
 'How old are you yaş sorusudur. Parantezde 7 verildiği için seven kullanılır.',
 'Leave school okuldan ayrılmak demektir. Ayrılırken goodbye söylenir; hello ve good morning karşılaşma selamlarıdır.'
 ],
 'T2-G2-INGI-CLASSR': [
 'Woof woof havlama sesidir. Dog köpek anlamına gelir; cat miyavlayan kedi, bird kuştur.',
 'Görselde maymunun elinde muz vardır. Bananas muzlar, fish balık, cheese peynir demektir.',
 'See görmek, eyes gözler demektir. Görme gözlerle gerçekleşir; ears kulaklar, nose burundur.',
 'Touch dokunmak, nose burun demektir. Buruna dokunan çocuğu anlatan seçenek yönergeye uyar.',
 'Frog kurbağa, jump zıplamak demektir. Kurbağa zıplayabilir; read okumak, fly uçmaktır.',
 'Dentist diş hekimidir. Open your mouth ağzını aç demektir; mouth ağız anlamındadır.',
 'Fly uçmak anlamına gelir. Seçeneklerde uçabilen hayvan bird, yani kuştur; cow inek, fish balıktır.',
 'Hands ellerdir. Ellerimizde bulunan parmaklara fingers denir; toes ayak parmakları, heads başlar demektir.',
 'Fish balık, sea deniz anlamındadır. Balığın sudaki hareketi swim, yani yüzmektir.',
 'NOT sözcüğü olmayanı sorar. Horse at, cat kedi olduğundan hayvandır; book bir kitap, yani eşyadır.'
 ],
 'T2-G2-INGI-PERSON': [
 'Sit down oturmak anlamına gelir. Sit on the chair sandalyeye oturmayı anlatır; stand up ayağa kalkmaktır.',
 'Pencil kurşun kalem demektir. Sorudaki yazı yazmaya yarayan nesne bu sözcükle adlandırılır.',
 'Snowing kar yağıyor demektir. Bu bağlamda cold, yani soğuk hava uygundur; hot sıcak anlamındadır.',
 'Rainy yağmurlu demektir. Umbrella şemsiyedir ve yağmurdan korunmayı sağlar; sunglasses güneş gözlüğüdür.',
 'Book kitap demektir. Open your book kitabını aç anlamına gelir; defter notebook, silgi eraser olarak söylenir.',
 'Wind rüzgâr demektir. Ağaçları sallayan rüzgâr görüldüğü için windy, yani rüzgârlı hava anlatılır.',
 'Yazıdaki yanlışları silmek için eraser, yani silgi gerekir. Desk sıra, apple elmadır.',
 'Board yazı tahtasıdır. Öğretmen tahta kalemiyle tahtaya yazar; chair sandalye, window pencere anlamındadır.',
 'Sun shines güneş parlıyor demektir. Bu hava sunny, yani güneşli olarak anlatılır.',
 'Close kapatmak, door kapı, please lütfen demektir. Birlikte kapıyı kapat, lütfen anlamını verir.'
 ],
 'T2-G2-INGI-FAMILY': [
 'Sleep uyumak, bed yatak demektir. Yatak bulunan ve uyunan oda bedroom, yani yatak odasıdır.',
 'Cooking food yemek pişirmek demektir. Bunun için kullanılan oda kitchen, yani mutfaktır.',
 'Fruit meyve demektir. Banana muz olduğu için meyvedir; table masa, car arabadır.',
 'Soruda kanepenin oturma odasında olduğu belirtilir. Living room oturma odasıdır; bathroom banyo, bedroom yatak odasıdır.',
 'Sea deniz demektir. Ship gemidir ve denizde yol alır; plane uçak, car arabadır.',
 'Apple elma demektir. Orange portakal, lemon limon anlamına gelir.',
 'Sky gökyüzüdür. Plane uçak anlamındadır ve gökyüzünde yol alır; train tren, bus otobüstür.',
 'Lemon limon, yellow sarı demektir. Red kırmızı, blue mavi anlamındadır.',
 'Bathroom banyo demektir. Bu soru kişisel temizlik için kullanılan banyo lavabosunu anlatır.',
 'Railways demiryolları anlamına gelir. Train tren demektir ve raylarda ilerler; bike bisiklet, car arabadır.'
 ],
 'T2-G2-INGI-HOMES,': [
 'Bed yatak, wardrobe gardırop demektir. Bu eşyalar yatak odasını, yani bedroom sözcüğünü işaret eder.',
 null,null,
 'Soruda banyo lavabosunda el yıkama anlatılır. Bathroom banyo, bedroom yatak odası, living room oturma odasıdır.',
 'Sofa kanepe, on üstünde demektir. Oturulacak yer on the sofa, yani kanepenin üstüdür.',
 'Cold soğuk, fridge buzdolabı demektir. Sütü soğuk tutmak için buzdolabına koyarız.',
 'Cook yemek pişirmek, oven fırın anlamındadır. Bu iki ipucu kitchen, yani mutfağı anlatır.',
 'Grow büyümek veya yetişmek anlamındadır. Bahçede yetişebilen seçenek tree, yani ağaçtır; diğerleri eşyadır.',
 'Dark karanlık, turn on açmak demektir. Işık için lamp, yani lamba açılır; chair sandalye, carpet halıdır.',
 'Where nerede demektir ve yer sorar. Where are the books, kitaplar nerede anlamındadır; diğer sorular renk ve yaş sorar.'
 ],
 'T2-G2-INGI-LIFEIN': [
 'Borrow ödünç almak, storybook hikâye kitabı demektir. Kitap ödünç alınan yer library, yani kütüphanedir.',
 'Bread ekmek demektir. Bakery ekmek satılan fırındır; hospital hastane, library kütüphanedir.',
 null,
 'Doctor doktor, sick people hasta insanlar demektir. Doktorların hastalara yardım ettiği yer hospital, yani hastanedir.',
 'Swings salıncaklar demektir. Çocukların salıncakta oynadığı yer playground, yani oyun alanıdır.',
 'Get on a bus otobüse binmek demektir. Otobüsü beklediğimiz yer bus stop, yani otobüs durağıdır.',
 'Lions aslanlar, zebras zebralar demektir. Bu hayvanları görmek için zoo, yani hayvanat bahçesi ziyaret edilebilir.',
 'Send a letter mektup göndermek demektir. Bunun için post office, yani postane kullanılır.',
 null,null
 ]
};
export function repairExplanation(q) {
 const match=q.id.match(/^(.*)-(\d+)$/),text=groups[match?.[1]]?.[Number(match?.[2])-1];
 if(!text)return false;
 q.explanation=text;
 // Explicit disambiguation; no image exists for these source questions.
 if(q.id==='T2-G2-INGI-PERSON-02')q.question='I write with a pencil. What is in my hand?';
 if(q.id==='T2-G2-INGI-FAMILY-04')q.question='There is a sofa in our living room. Where is the sofa?';
 if(q.id==='T2-G2-INGI-FAMILY-09')q.question='This room has a bath and a sink. We wash our face here. What room is it?';
 if(q.id==='T2-G2-INGI-HOMES,-04')q.question='This room has a toilet, a bath and a sink. Which room is it?';
 if(q.id==='T2-G2-INGI-CLASSR-04')q.question='Which sentence describes the action in the instruction "Touch your nose!"?';
 if(q.id==='T2-G2-INGI-SCHOOL-07')q.question='Complete the number sequence: One, two, three, ________, five.';
 if(q.id==='T2-G1-INGI-CLASSR-03')q.question='İnsan biçimindeki oyuncak bebek İngilizcede nasıl adlandırılır?';
 return true;
}
