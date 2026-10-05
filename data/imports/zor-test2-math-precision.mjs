// Individually checked source defects. Preserve IDs; log every change in the importer.
const repairs = {
 'T2-G4-MATE-DOĞALS-10': {
  question:'Kütüphaneye 325 sayfalık 48 roman ve 140 sayfalık 115 şiir kitabı gelmiştir. Hangi kitap türünün toplam sayfa sayısı daha fazladır ve aradaki fark kaç sayfadır?',
  choices:['Romanlar 1.000 sayfa fazla','Romanlar 500 sayfa fazla','Şiir kitapları 1.000 sayfa fazla','Şiir kitapları 500 sayfa fazla'],correctAnswer:3,
  explanation:'Romanların toplamı 325 × 48 = 15.600, şiir kitaplarının toplamı 140 × 115 = 16.100 sayfadır. Şiir kitapları 16.100 − 15.600 = 500 sayfa daha fazladır.'
 },
 'T2-G4-MATE-TOPLAM-05': {
  question:'972 sayfalık bir kitabı 36 günde, her gün eşit sayıda sayfa okuyarak bitirmeyi planlayan Ayşe, ilk 10 gün planladığından günde 5 sayfa az okumuştur. Kalan 26 gün boyunca her gün aynı sayıda sayfa okumaya çalışacaktır; son gün daha az okuyabilir. Kitabı zamanında bitirebilmesi için günlük hedefi en az kaç tam sayfa olmalıdır?',
  explanation:'İlk plan 972 ÷ 36 = 27 sayfadır. İlk 10 günde 10 × 22 = 220 sayfa okunur; 752 sayfa kalır. Günde 28 sayfa ile 26 × 28 = 728 sayfa okunabilir ve kitap bitmez. Günde 29 sayfalık hedef yeterlidir; son gün daha az okunur.'
 },
 'T2-G4-MATE-TOPLAM-06': {
  question:'Bir paketteki vidaların toplam kütlesi 855 gramdır; ambalajın kütlesi bu değere dahil değildir. Her vida 15 gramdır. Aynı içerikteki 45 paket sipariş edilirse toplam kaç vida gönderilir?',
  explanation:'Bir pakette 855 ÷ 15 = 57 vida vardır. 45 pakette 57 × 45 = 2.565 vida bulunur.'
 },
 'T2-G4-MATE-ÇARPMA-03': {
  correctAnswer:2,
  explanation:'Domates ve biber 5/12 + 3/12 = 8/12 yer kaplar; 4/12 kalır. Kalanın yarısı 2/12, bunun 1/12 eksiği salatalık alanı olan 1/12’dir. Patlıcan alanı 4/12 − 1/12 = 3/12 olur.'
 },
 'T2-G4-MATE-ÇARPMA-07': {
  question:'Duvarlarının toplam alanı birbirine eşit olan üç odanın birincisinin 8/8’i, ikincisinin 5/8’i, üçüncüsünün 2/8’i boyanmıştır. Boyanan toplam alan, bir odanın duvar alanının kaç katıdır?',
  explanation:'Bir odanın duvar alanı ortak bütün olarak alınır. Boyanan miktar 8/8 + 5/8 + 2/8 = 15/8’dir. Odaların duvar alanları eşit olduğu için bu kesirler aynı bütüne göre toplanabilir.'
 },
 'T2-G4-MATE-ÇARPMA-09': {
  question:'Bir su deposunun kapasitesinin 17/20’si doludur. Depodan toplam kapasitenin 9/20’si kadar su kullanılıp toplam kapasitenin 3/20’si kadar su ekleniyor. Depoyu tamamen doldurmak için kapasitesinin kaçta kaçı kadar su gerekir?',
  explanation:'Bütün kesirler deponun toplam kapasitesine göredir. Son doluluk 17/20 − 9/20 + 3/20 = 11/20 olur. Eksik miktar 20/20 − 11/20 = 9/20’dir.'
 },
 'T2-G4-MATE-BÖLME-04': {
  correctAnswer:0,
  explanation:'Süreleri saniyeye çevirelim: 1. yarış 3.600 + 900 + 40 = 4.540 saniye, 2. yarış 4.500 saniye, 3. yarış 5.100 + 10 = 5.110 saniyedir. Dolayısıyla kısa süreden uzuna sıra 2 < 1 < 3 olur.'
 },
 'T2-G4-MATE-BÖLME-05': {
  question:'14 Haziran günü saat 09.00’da başlayan bir etkinlikten tam 8 hafta 4 gün sonra saat yine 09.00 olacaktır. O günün tarihi nedir? Haziran 30, temmuz 31 gündür.',
  choices:['12 Ağustos','11 Ağustos','10 Ağustos','13 Ağustos'],correctAnswer:3,
  explanation:'8 hafta 4 gün = 60 gündür. 14 Haziran’dan 14 Temmuz’a 30 gün geçer. Kalan 30 günün 17’siyle 31 Temmuz’a, 13’üyle 13 Ağustos’a ulaşılır. Başlangıç günü fazladan bir gün sayılmaz.'
 },
 'T2-G4-MATE-BÖLME-10': {
  question:'Bir otoparkta ilk 1 saat ücretsizdir. 1 saati aşan ve 3 saati geçmeyen parklar için toplam ücret 40 TL’dir. 3 saatten sonraki her başlayan saat için 15 TL eklenir. Saat 11.45’te girip 16.20’de çıkan araç kaç TL öder?',
  explanation:'Araç 4 saat 35 dakika kalmıştır. İlk 3 saat için toplam 40 TL alınır. Sonraki 1 saat 35 dakika, başlayan saat kuralıyla 2 saat sayılır. Ücret 40 + 2 × 15 = 70 TL’dir.'
 },
 'T2-G4-MATE-KESIRL-06': {
  question:'Dört bayrak direği bir dörtgenin köşelerindedir. Ardışık direklerin arasındaki dört kenarın her biri 5 metredir; iki köşegenin uzunlukları da eşittir. Bu dörtgenin en özel adı nedir?',
  explanation:'Dört eş kenarlı dörtgen eşkenar dörtgendir. Köşegenleri de eşitse açıları diktir ve en özel adı karedir. Kare, dikdörtgenin ve eşkenar dörtgenin de özel bir türüdür.'
 },
 'T2-G4-MATE-GEOMET-02': {
  correctAnswer:2,
  explanation:'Bahçenin çevresi 2 × (45 + 25) = 140 metredir. Kapı boşluğu her sırada 4 metre olduğundan bir sırada 136 metre, üç sırada 408 metre tel kullanılır. Bedel 408 × 12 = 4.896 TL olur.'
 },
 'T2-G4-MATE-UZUNLU-09': {
  question:'3 metre uzunluğundaki kalastan 40 santimetrelik parçalar kesiliyor. Artan kısa parça kullanılmayacaktır. Her kesim 2 dakika sürerse elde edilebilecek en fazla sayıda 40 santimetrelik parçayı kesmek toplam kaç dakika sürer?',
  explanation:'300 santimetreden 7 tane 40 santimetrelik parça elde edilir ve 20 santimetre artar. Son 40 santimetrelik parçayı artan 20 santimetreden ayırmak için de kesim gerekir. Bu nedenle 7 kesim yapılır: 7 × 2 = 14 dakika.'
 },
 'T2-G4-MATE-ÇEVREÖ-09': {
  question:'Bir kantinde hafta boyunca 405 tost satılmıştır. Cuma 120, salı 45, çarşamba salıdan 35 fazla tost satılmıştır. Pazartesi ve perşembe satışları eşittir. Pazartesi kaç tost satılmıştır?',
  choices:['75','80','85','90'],correctAnswer:1,
  explanation:'Çarşamba 45 + 35 = 80 tost satılır. Bilinen üç günün toplamı 120 + 45 + 80 = 245’tir. Pazartesi ve perşembeye 405 − 245 = 160 tost kalır. Eşit paylaşıldığında pazartesi 160 ÷ 2 = 80 tost satılmıştır.'
 },
 'T2-G4-MATE-ZAMANÖ-10': {
  question:'Altı basamaklı 3A4.B7C sayısında A, B ve C küçükten büyüğe ardışık çift rakamlardır. C = 6 olduğuna göre A × B kaçtır?',
  explanation:'6 ile biten üç ardışık çift rakam 2, 4 ve 6’dır. A = 2 ve B = 4 olduğundan A × B = 2 × 4 = 8 olur.'
 }
};
export function repairMathPrecision(q) {
 const patch=repairs[q.id];
 if(!patch)return false;
 Object.assign(q,structuredClone(patch));
 return true;
}
