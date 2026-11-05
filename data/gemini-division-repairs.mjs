// Gemini 3.5 Flash Lite draft, independently solved and edited. Correct answer first.
export const divisionEasy = [
 ['Bir çiftçi 48 kilogram elmayı, her birine 6 kilogram koyarak poşetlere dolduruyor. Kaç poşet kullanır?', '8', '6', '7', '9', 'Toplam 48 kilogramı her poşetteki 6 kilograma böleriz: 48 ÷ 6 = 8 poşet.'],
 ['36 sayısının çeyreğini bulmak için hangi işlem yapılır?', '36 ÷ 4', '36 × 4', '36 − 4', '36 + 4', 'Çeyrek dört eş parçadan biridir. 36’yı 4 eş parçaya ayırırız: 36 ÷ 4 = 9.'],
 ['Bir bölme işleminde bölen 7, bölüm 9 ve kalan 3 ise bölünen kaçtır?', '66', '63', '60', '70', 'Bölen ile bölüm çarpılıp kalan eklenir: 7 × 9 + 3 = 66. Kalan 3, bölen 7’den küçüktür.'],
 ['Hangi bölme işleminin sonucu diğerlerinden farklıdır?', '45 ÷ 5', '72 ÷ 9', '56 ÷ 7', '48 ÷ 6', '45 ÷ 5 = 9’dur. Diğer üç işlemin sonucu 8 olduğu için farklı olan 45 ÷ 5’tir.'],
 ['84 kitap, her rafta eşit sayıda kitap olacak şekilde 4 rafa yerleştiriliyor. Her rafta kaç kitap olur?', '21', '22', '24', '20', '84 kitabı 4 eş gruba ayırırız: 84 ÷ 4 = 21. Kontrol: 21 × 4 = 84.'],
 ['Hangi bölme işleminde kalan sıfır değildir?', '75 ÷ 6', '55 ÷ 5', '64 ÷ 4', '90 ÷ 3', '75 = 6 × 12 + 3 olduğundan kalan 3’tür. Diğer üç işlem kalansızdır.'],
 ['Kerem 60 lirasını 5 gün boyunca her gün eşit miktarda harcıyor ve parasının tamamı bitiyor. Günde kaç lira harcar?', '12', '10', '11', '15', '60 lira 5 güne eşit paylaştırılır: 60 ÷ 5 = 12 lira. Kontrol: 12 × 5 = 60.'],
 ['96 koltuk, her sırada 8 koltuk olacak şekilde dizilmiştir. Kaç sıra vardır?', '12', '10', '11', '14', '96 koltuğu sekizerli sıralara ayırırız: 96 ÷ 8 = 12 sıra.'],
 ['720 ÷ 9 işleminin sonucu kaçtır?', '80', '8', '70', '90', '72 ÷ 9 = 8’dir. 720, 72’nin on katı olduğundan 720 ÷ 9 = 80 olur.'],
 ['Zeynep’in 87 boncuğu var. Bir bilezik için 7 boncuk kullanırsa en fazla kaç tam bilezik yapar?', '12', '11', '13', '14', '87 = 7 × 12 + 3. Kalan 3 boncuk bir bilezik için yetmediğinden en fazla 12 tam bilezik yapılır.']
];

// The initial medium draft contained ambiguous and out-of-scope questions; edited after independent review.
export const divisionMedium = [
 ['96 öğrenci, her grupta 4 öğrenci olacak şekilde ayrılıyor. Kaç grup oluşur?', '24', '22', '26', '28', '96 ÷ 4 = 24. Kontrol için 24 gruptaki 4’er öğrenci sayılır: 24 × 4 = 96.'],
 ['87 litre süt, beşer litrelik bidonlara dolduruluyor. Tam dolu bidonlar doldurulduktan sonra kaç litre süt artar?', '2', '1', '3', '4', '5 × 17 = 85 litre tam bidonlara konur. 87 − 85 = 2 litre artar.'],
 ['Bir bölme işleminde bölen 7, bölüm 14 ve kalan 3’tür. Bölünen kaçtır?', '101', '95', '98', '104', 'Bölen ile bölüm çarpılır, kalan eklenir: 7 × 14 + 3 = 98 + 3 = 101. Kalan 3, bölen 7’den küçüktür.'],
 ['150 elma, her poşette 6 elma olacak şekilde paketleniyor. Her poşetin fiyatı 45 TL’dir. Kaç poşet hazırlanır?', '25', '20', '30', '35', 'Poşet sayısı için 150 ÷ 6 = 25 hesaplanır. Poşet fiyatı bu soruda gerekli değildir.'],
 ['Aşağıdaki işlemlerden hangisinin bölümü, diğer üç işlemin bölümünden farklıdır?', '360 ÷ 4', '480 ÷ 6', '400 ÷ 5', '240 ÷ 3', '360 ÷ 4 = 90’dır. Diğer üç işlemin sonucu 80 olduğu için farklı olan 360 ÷ 4’tür.'],
 ['Bir bölme işleminde bölen 5, bölüm 18 ve kalan 2’dir. Bölünen kaçtır?', '92', '90', '88', '95', '5 × 18 = 90. Kalan 2 eklenince bölünen 92 olur; 92 = 5 × 18 + 2.'],
 ['144 kalem, her kutuya 6 kalem konularak paketleniyor. Kaç kutu gerekir?', '24', '22', '23', '25', '144 ÷ 6 = 24. Kontrol: 24 kutunun her birindeki 6 kalem toplam 24 × 6 = 144 kalem eder.'],
 ['Birler basamağı 0 olan en küçük üç basamaklı sayı 5’e bölünürse bölüm kaç olur?', '20', '10', '100', '200', 'En küçük üç basamaklı sayı 100’dür ve birler basamağı 0’dır. 100 ÷ 5 = 20.'],
 ['420 fidan, her sırada 7 fidan olacak şekilde dikiliyor. Kaç sıra oluşur?', '60', '50', '70', '80', 'Fidanları yedişerli sıralara ayırırız: 420 ÷ 7 = 60. Kontrol: 60 × 7 = 420.'],
 ['232 kurabiye sekizerli paketlenirse kaç kurabiye artar?', '0', '2', '4', '6', '232 = 8 × 29. Bölme kalansız olduğu için paketlemeden sonra kurabiye artmaz.']
];
