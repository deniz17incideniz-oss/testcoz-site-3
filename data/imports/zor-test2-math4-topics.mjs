// Source topics were shifted. Reassign intact groups where possible, and replace
// only the remaining off-topic items. The immutable source and change log retain provenance.
const explanations={
 'DOĞALS':[
 'Koltuk sayısı 35 × 24 = 840’tır. Öğrenci olmayan 840 − 340 = 500 kişi vardır. Gelir 500 × 125 + 340 × 85 = 62.500 + 28.900 = 91.400 TL olur.',
 'Bir ayda 145 × 42 = 6.090 palet taşınır. Her palette 24 koli olduğundan 6.090 × 24 = 146.160 koli taşınmıştır.',
 'Doğru işlem 345 × 42 = 14.490’dır. Kaydırma yapılmazsa 345 × 2 + 345 × 4 = 2.070 bulunur. Aradaki fark 14.490 − 2.070 = 12.420’dir.',
 'Gömlekler 185 × 75 = 13.875 TL, pantolonlar 240 × 45 = 10.800 TL tutar. Toplam 24.675 TL için 25.000 TL verildiğinde 325 TL para üstü alınır.',
 'Doğru çarpım 264 × 35 = 9.240’tır. Yanlış okunan sayılarla 464 × 38 = 17.632 bulunur. Fark 17.632 − 9.240 = 8.392’dir.',
 '45 günde 215 × 45 = 9.675 yumurta elde edilir. 30’lu 322 koli dolar ve 15 yumurta artar. Satılan kolilerin geliri 322 × 110 = 35.420 TL olur.',
 'Bir günde 675 × 14 = 9.450 metre koşulur. Nisanın 30 gününde 9.450 × 30 = 283.500 metre koşulmuştur.',
 'Kampanyalı satışların geliri 875 × 124 = 108.500 TL, diğer dönemin geliri 950 × 86 = 81.700 TL’dir. Kampanyalı dönemin geliri 26.800 TL fazladır.',
 'Şehir içi tutar 245 × 120 = 29.400 kuruş, şehir dışı tutar 180 × 450 = 81.000 kuruştur. Toplam 110.400 kuruş olur.',
 'Romanlar 325 × 48 = 15.600, şiir kitapları 140 × 115 = 16.100 sayfadır. Şiir kitaplarının toplamı 500 sayfa fazladır.'
 ],
 'TOPLAM':[
 '9 otobüs 9 × 42 = 378 öğrenci taşır ve yetmez. 10 otobüs 420 öğrenci taşıyabildiği için gereken en az sayı 10’dur.',
 'En küçük bölünen, kalan sıfırken 34 × 25 = 850’dir. Kalan en fazla 33 olabilir; en büyük bölünen 883’tür. Toplamları 850 + 883 = 1.733 olur.',
 '875 ÷ 18 işleminde bölüm 48, kalan 11’dir. Tam tenekelere 864 litre konur; satılamayan 11 litre kalır.',
 '560 gül ile 46 tam buket yapılır ve 8 gül artar. Gelir 46 × 150 + 8 × 15 = 6.900 + 120 = 7.020 TL’dir.',
 'Planlanan günlük sayı 972 ÷ 36 = 27’dir. İlk 10 günde 220 sayfa okununca 752 sayfa kalır. 26 × 28 = 728 yetmez; 26 × 29 = 754 yeter. Günlük hedef 29 sayfa olmalı, son gün kalan 27 sayfa okunmalıdır.',
 'Bir pakette 855 ÷ 15 = 57 vida bulunur. 45 paket 57 × 45 = 2.565 vida içerir.',
 '648 ÷ 24 = 27 ve kalan sıfırdır. Bütün kalemler 27 kutuya sığar; 15’lik kutu gerekmez.',
 '14’ün üç basamaklı katları arasında yüzler basamağı 8 ve birler basamağı 4 olan sayı 854’tür: 14 × 61 = 854. A yalnızca 5 olabilir; toplam da 5’tir.',
 'Dağıtılacak para 7.850 − 450 = 7.400 TL’dir. 7.400 ÷ 37 = 200 ve kalan sıfır olduğu için artan para yoktur.',
 '23 × 38 = 874’tür. Onlar basamağı 7 kalacak ve kalan çift olacak şekilde 874, 876 ve 878 yazılabilir. En büyük rakam toplamı 878 için 8 + 8 = 16’dır.'
 ],
 'ÇIKARM':[
 'Paydalar aynı olduğunda küçük pay daha küçük uzaklığı gösterir. Uzaklıklar 1/8, 3/8, 5/8, 7/8 olduğundan en yakından en uzağa Can, Ali, Veli, Cem sıralanır.',
 '17 ÷ 4 işleminde bölüm 4, kalan 1’dir. Bu nedenle 17/4 = 4 tam 1/4 olur ve dört tam dörtte bir diye okunur.',
 '2 tam, beşlik parçalardan 10 tanesidir. Buna 3 parça eklenince K noktası 13/5 olur.',
 '19 dilimde 3 tam pizza için 18 dilim ve ayrıca 1 dilim vardır. Her pizza 6 dilim olduğundan miktar 3 tam 1/6’dır.',
 '3 tam 2/5’ten 2 tam çıkınca 1 tam 2/5 kalır. Bir tam 5/5 olduğundan bileşik kesir 7/5’tir.',
 '1 tam 7/7, 2 tam 14/7 olur. 12/7 bu ikisinin arasındadır. 4/5 birden küçük, 8/8 bire eşit, 17/5 ise ikiden büyüktür.',
 'Yenen miktar 5/24 + 11/24 = 16/24, kalan 8/24’tür. Yarım 12/24 olduğundan kalan miktar yarımdan 12/24 − 8/24 = 4/24 eksiktir.',
 'Basit kesirde pay paydadan küçüktür: A + 4 < 9. A; 0, 1, 2, 3 veya 4 olabilir. Toplam 0 + 1 + 2 + 3 + 4 = 10’dur.',
 'İlk iki gün kitabın 2/10 + 5/10 = 7/10’u okunur. Kalan 3/10’dur. 120 ÷ 10 × 3 = 36 sayfa üçüncü gün okunmuştur.',
 'En büyük kesir için en büyük pay ve en küçük payda seçilir: 8/3. En küçük pozitif kesir için en küçük pay ve en büyük payda seçilir: 3/8.'
 ],
 'BÖLME':[
 'Molalar 2 × 25 = 50 dakikadır. Toplam süre 7 saat 35 dakika + 50 dakika = 8 saat 25 dakikadır. 22.45’e bu süre eklenince ertesi gün 07.10 olur.',
 '14 Mayıs 2023’e 3 yıl eklenince 14 Mayıs 2026, 8 ay eklenince 14 Ocak 2027 olur. 15 gün daha eklenince 29 Ocak 2027’ye ulaşılır.',
 'Şarkı 4 × 60 + 20 = 260 saniyedir. Kalan 260 − 135 = 125 saniye, yani 2 dakika 5 saniyedir.',
 'Birinci süre 4.540 saniye, ikinci 4.500 saniye, üçüncü 5.110 saniyedir. Kısadan uzuna sıralama 2 < 1 < 3 olur.',
 '8 hafta 4 gün toplam 60 gündür. 14 Haziran’dan 14 Temmuz’a 30 gün, oradan 13 Ağustos’a 30 gün geçer. Aranan tarih 13 Ağustos’tur.',
 '08.30’dan 17.45’e 9 saat 15 dakika geçer. Yemek molası olan 45 dakika çıkarılınca çalışma süresi 8 saat 30 dakika kalır.',
 '100 saat, 4 gün 4 saattir. Salıdan dört gün sonrası cumartesi, 14.20’den dört saat sonrası 18.20’dir.',
 'Dedenin 1968 yılındaki yaşı, verilen yıl farkıyla 1968 − 1957 = 11’dir. Dede torununun şu anki yaşını anlattığı için yanıt 11 olur.',
 'Yelkovan 9’da olduğunda dakika 45’tir; akrep 7 ile 8 arasındadır. Öğleden sonra saat 19.45’tir. 45 dakika sonra 20.30 olur.',
 'Kalınan süre 4 saat 35 dakikadır. İlk 3 saat için 40 TL, sonrasında başlayan 2 saat için 2 × 15 = 30 TL alınır. Toplam 70 TL olur.'
 ],
 'GEOMET':[
 'Karenin çevresi 48, dikdörtgenin çevresi 46 santimetredir. En uzun ortak sınır 12 santimetredir. Bu sınır toplam çevrede iki kez sayıldığından 48 + 46 − 24 = 70 santimetre kalır.',
 'Bahçenin çevresi 140 metredir. Kapı boşluğu çıkarılınca bir sırada 136 metre, üç sırada 408 metre tel gerekir. 408 × 12 = 4.896 TL ödenir.',
 'Karenin bir kenarı 8 metredir; alanı 64 metrekaredir. Her halı 2 × 4 = 8 metrekaredir. 64 ÷ 8 = 8 halı, kenarlar boyunca boşluksuz yerleştirilebilir.',
 'Karenin çevresi 4 × 16 = 64 santimetre, alanı 256 santimetrekaredir. Dikdörtgende kenarların toplamı 32 olduğundan uzun kenar 22’dir. Alanı 220, alan farkı 36 santimetrekaredir.',
 'Alanı 36 olan dikdörtgenler içinde en büyük çevre 1 ve 36 kenarlarıyla 74’tür. En küçük çevre 6 ve 6 kenarlarıyla 24’tür. Fark 74 − 24 = 50 birimdir.',
 'Duvarın alanı 3 × 5 = 15 metrekaredir. Pencere 1, kapı 2 metrekare yer kaplar. Boyanacak alan 15 − 1 − 2 = 12 metrekaredir.',
 'Her çentikte 4 santimetrelik düz kenar çıkar; yerine toplam 12 santimetrelik üç kenar gelir. Artış her çentikte 8, dört çentikte 32 santimetredir.',
 'Dikdörtgenin alanı 24 × 16 = 384, kesilen karenin alanı 64’tür. Kalan alan 320 santimetrekaredir. Karenin kenarı 8 olduğundan kısa kenardan 16 − 8 = 8 santimetre eksiktir.',
 'Çevresi 48 olan karenin kenarı 12, alanı 144’tür. Dikdörtgenin uzun kenarı 144 ÷ 8 = 18 birimdir.',
 'Karelerin kenarları 4, 8 ve 4 birimdir. Ayrı çevreler toplamı 64’tür. İki ortak sınırın her biri 4 birimdir; iki kez sayılan toplam 16 birim çıkarılınca 48 birim kalır.'
 ],
 'ALANÖL':[
 'İstanbul 145.650 + 85.400 = 231.050 TL’dir. İzmir 145.650 + 231.050 − 42.000 = 334.700 TL’dir. Üç şehrin toplamı 711.400 TL olur.',
 'İlk yarı sonunda 184.500 + 125.000 − 164.750 = 144.750 ürün vardır. Yeni üretimle 234.950 olur. Hedef 150.000 için 84.950 ürün satılmalıdır.',
 'Banka hesabı 18.250 + 5.400 = 23.650 TL’dir. Birikim toplamı 41.900 TL olur. Bilgisayar ve elde kalan para 43.700 TL olduğundan borç 43.700 − 41.900 = 1.800 TL’dir.',
 'A–C ve B–D mesafelerinin toplamında B–C bölümü iki kez sayılır. 450 + 520 − 780 = 190 kilometre, B–C mesafesidir.',
 'Satışlardan sonra 14.500 − 3.250 − 4.100 = 7.150 kilogram kalır. 5.000 kilogram satılacaksa 7.150 − 5.000 = 2.150 kilogram tohumluk ayrılmıştır.',
 '48.753 sayısında 4 ile 7 yer değiştirince 78.453 olur. İki işleme de aynı sayı eklendiğinden sonuç farkı 78.453 − 48.753 = 29.700’dür.',
 'Yük 3 × 4.500 + 12.850 = 26.350 kilogramdır. Görevli bunu 1.500 eksik, yani 24.850 bulmuştur. Hesapladığı boş kapasite 35.000 − 24.850 = 10.150 kilogramdır.',
 'İkinci aday 109.360, üçüncü aday 117.810 oy almıştır. Geçerli oy toplamı 124.560 + 109.360 + 117.810 = 351.730’dur. Geçersiz oy 400.000 − 351.730 = 48.270’dir.',
 'Toplam tüketim 85.400 − 48.300 = 37.100 litredir. İkinci günün fazlası olan 4.500 çıkarılınca iki eş günlük miktar toplamı 32.600 kalır. Birinci gün 16.300 litre kullanılmıştır.',
 'Fazlalık çıkarılınca iki küçük sayının toplamı 54.380 − 12.420 = 41.960 olur. Küçük sayı 20.980’dir; rakamlarının toplamı 2 + 0 + 9 + 8 + 0 = 19’dur.'
 ],
 'ZAMANÖ':[
 'İpuçları sırayla 8, 4, 7, 2, 1 ve 7 rakamlarını verir. Oluşan sayı 847.217’dir; sekiz yüz kırk yedi bin iki yüz on yedi diye okunur.',
 'En büyük çift sayı 985.310, en küçük tek sayı 103.589’dur. Binler bölükleri 985 ve 103’tür. Rakamlar toplamı 9 + 8 + 5 + 1 + 0 + 3 = 26 olur.',
 'Çözümlemeler K = 450.802, L = 450.082, M = 405.820 ve N = 458.020 sayılarını verir. Büyükten küçüğe N > K > L > M sıralanır.',
 'Numaralar 100 artıyor. 11.250 − 10.450 = 800 farkı için 8 artış gerekir. Başlangıç birinci kitap olduğundan aranan kitap dokuzuncudur.',
 'En büyük uygun sayı 98.710’dur: rakamları farklı, toplamları 25, ilk rakam tek ve son rakam çifttir. Yüzler basamağındaki 7’nin basamak değeri 700’dür.',
 'Bölükler yer değiştirince 517.248 elde edilir. On binler basamağının değeri 10.000, onlar basamağının değeri 40’tır. Toplamları 10.040’tır.',
 'En küçük sayıyı elde etmek için soldaki basamaklar küçük tutulur. Her çubuk en az bir boncuk alırken 24 boncukla en küçük düzen 1, 1, 1, 3, 9, 9 olur; sayı 111.399’dur.',
 '380.311 sayısında yüz binler ve yüzler basamakları 3’tür; ancak binler bölüğünün rakam toplamı 3 + 8 + 0 = 11 olur. Gerekli toplam 12 olmadığı için bu bilet uygun değildir.',
 'Binler basamağı 1 olduğu için onlarla birlikte ardışık tek rakamlar 1 ve 3 olur. En büyük uygun sayı 1.939’dur. Rakamlarının toplamı 1 + 9 + 3 + 9 = 22’dir.',
 'C = 6 ile biten üç ardışık çift rakam 2, 4 ve 6’dır. A × B = 2 × 4 = 8 olur.'
 ]};

// Each row contains stem, correct option, three distractors and its worked explanation.
const subtraction=[
 ['Bir kütüphanede 24.680 kitap vardır. 3.475 kitap başka okullara gönderiliyor, sonra 1.860 yeni kitap geliyor. Son durumda başlangıçtan kaç kitap eksiktir?','1.615','3.475','5.335','2.615','Gönderilen 3.475 kitaptan gelen 1.860 çıkarılır: net azalma 1.615 kitaptır.'],
 ['Bir çıkarma işleminde fark 18.750, çıkan 6.480’dir. Eksilen sayı kaçtır?','25.230','12.270','24.230','25.130','Eksilen = fark + çıkan olduğundan 18.750 + 6.480 = 25.230 olur.'],
 ['50.000 − 18.765 işleminin sonucuna 2.000 eklenirse kaç bulunur?','33.235','31.235','32.235','34.235','Önce 50.000 − 18.765 = 31.235, sonra 31.235 + 2.000 = 33.235 bulunur.'],
 ['Bir yolun 8.450 metresi yapılacaktır. İlk gün 2.375, ikinci gün 3.180 metre tamamlanıyor. Geriye kaç metre kalır?','2.895','3.895','2.995','5.555','Yapılan yol 2.375 + 3.180 = 5.555 metredir. Kalan 8.450 − 5.555 = 2.895 metredir.'],
 ['Bir çıkarma işleminde eksilen 300 artırılır, çıkan 120 azaltılırsa fark nasıl değişir?','420 artar.','180 artar.','420 azalır.','180 azalır.','Eksileni artırmak farkı 300, çıkanı azaltmak farkı 120 artırır. Toplam artış 420’dir.'],
 ['Bir ürünün etiket fiyatı 7.250 TL’dir. 875 TL indirimden sonra 6.000 TL ödenirse kaç TL borç kalır?','375 TL','1.250 TL','875 TL','1.875 TL','İndirimli fiyat 7.250 − 875 = 6.375 TL’dir. 6.000 TL ödeme sonrası 375 TL kalır.'],
 ['Ayşe 32.406 − 8.950 işlemini 24.456 buluyor. Doğru sonuç, Ayşe’nin bulduğundan ne kadar azdır?','1.000','100','900','10.000','Doğru sonuç 23.456’dır. 24.456 − 23.456 = 1.000 olduğu için Ayşe bin fazla bulmuştur.'],
 ['Bir depodan sabah 1.280, öğleden sonra sabahtan 350 fazla paket gönderiliyor. Başlangıçta 5.000 paket varsa kaç paket kalır?','2.090','2.440','3.370','1.740','Öğleden sonra 1.630, toplamda 2.910 paket gönderilir. 5.000 − 2.910 = 2.090 paket kalır.'],
 ['Farkı 4.875 olan iki sayıdan küçüğü 12.640’tır. Büyük sayıdan 2.500 çıkarılırsa kaç kalır?','15.015','17.515','10.140','14.015','Büyük sayı 12.640 + 4.875 = 17.515’tir. 2.500 çıkarılınca 15.015 kalır.'],
 ['Bir öğrenci 70.020 − 29.980 işlemini, önce 70.020 − 30.000 yaparak hesaplıyor. Sonuca hangi düzeltmeyi uygulamalıdır?','20 eklemelidir.','20 çıkarmalıdır.','200 eklemelidir.','200 çıkarmalıdır.','30.000, asıl çıkan sayıdan 20 fazladır. 20 fazla çıkarıldığı için bulunan sonuca 20 eklenmelidir.']
];
const solids=[
 ['Bir kutunun bütün yüzleri eş karelerden oluşur. Bu kutu için hangisi doğrudur?','6 yüzü ve 8 köşesi vardır.','8 yüzü ve 6 köşesi vardır.','6 yüzü ve 6 köşesi vardır.','4 yüzü ve 8 köşesi vardır.','Bütün yüzleri eş kare olan kutu küptür. Küpün 6 yüzü ve 8 köşesi bulunur.'],
 ['Bir öğrenci aynı büyüklükte iki küpü birer yüzleri tamamen çakışacak biçimde yapıştırıyor. Dışarıdan görülebilen toplam kare yüz sayısı kaçtır?','10','12','8','6','İki küpte toplam 12 yüz vardır. Yapıştırılan iki yüz içeride kalır; dışarıda 10 kare yüz görünür.'],
 ['Bir cismin iki düz yüzü daire biçimindedir ve bir eğri yüzeyi vardır. Hangi nesne bu cisme örnektir?','Düz kenarlı konserve kutusu','Oyun zarı','Futbol topu','Sivri külah','İki dairesel yüz ve bir eğri yüzey silindirin özellikleridir. Konserve kutusu silindire benzer.'],
 ['Bir kutunun yüz çiftleri 3 cm × 4 cm, 3 cm × 5 cm ve 4 cm × 5 cm dikdörtgenlerdir. Bu cismin adı nedir?','Dikdörtgenler prizması','Küp','Silindir','Küre','Verilen farklı kenar uzunlukları dikdörtgen yüzlü bir kutu oluşturur. Bütün kenarlar eşit olmadığı için küp değildir.'],
 ['Küp biçimindeki bir kutunun 12 ayrıtının her birine 4 cm kurdele yapıştırılıyor. Üst üste bindirme yapılmazsa toplam kaç cm kurdele gerekir?','48 cm','24 cm','36 cm','16 cm','Küpün 12 ayrıtı vardır. Her biri 4 cm olduğundan 12 × 4 = 48 cm kurdele gerekir.'],
 ['Bir küpün bütün yüzlerine birer çıkartma yapıştırılacak. Üç yüze çıkartma konduğuna göre kaç yüz kalmıştır?','3','5','4','2','Küpün 6 yüzünden 3’ü kaplandıysa 6 − 3 = 3 yüz kalır.'],
 ['Bir kutunun alt ve üst yüzleri eş kare, yan yüzleri dikdörtgendir. Yüksekliği kare kenarından farklıdır. En özel adı nedir?','Kare prizma','Küp','Küre','Koni','Kare tabanlı ve dikdörtgen yan yüzlü bu cisim kare prizmadır. Yüksekliği taban kenarına eşit olmadığı için küp değildir.'],
 ['Küre ile küpü karşılaştıran bir öğrenci hangi doğru sonuca ulaşır?','Küpün köşeleri vardır; kürenin köşesi yoktur.','İkisinin de 8 köşesi vardır.','Kürenin düz kare yüzleri vardır.','Küpün bütün yüzeyleri eğridir.','Küp düz kare yüzlere ve 8 köşeye sahiptir. Kürenin yüzeyi eğridir ve köşesi yoktur.'],
 ['Küp biçimindeki bir kutunun her köşesine bir boncuk takılıyor. İki ayrı kutu için kaç boncuk gerekir?','16','12','24','8','Bir küpte 8 köşe vardır. İki kutu için 2 × 8 = 16 boncuk gerekir.'],
 ['Bir cisim hem düz dairesel bir tabana hem de sivri bir tepeye sahiptir. Hangisi bu özellikleri taşır?','Koni','Silindir','Küre','Dikdörtgenler prizması','Koni bir dairesel tabana ve sivri bir tepeye sahiptir. Silindirin iki dairesel yüzü, kürenin ise düz tabanı yoktur.']
];
const perimeter=[
 ['Kısa kenarı 18 m, uzun kenarı kısa kenarından 7 m fazla olan bahçenin çevresi kaç metredir?','86','43','72','100','Uzun kenar 18 + 7 = 25 m’dir. Çevre 2 × (18 + 25) = 86 m olur.'],
 ['Çevresi 96 cm olan karenin bir kenarı 3 cm artırılıyor. Yeni çevre kaç santimetredir?','108','99','102','120','İlk kenar 96 ÷ 4 = 24 cm, yeni kenar 27 cm’dir. Yeni çevre 4 × 27 = 108 cm olur.'],
 ['Çevresi 74 cm olan dikdörtgenin kısa kenarı 15 cm’dir. Uzun kenarı kaç santimetredir?','22','37','29','44','Kısa ve uzun kenarın toplamı 74 ÷ 2 = 37 cm’dir. Uzun kenar 37 − 15 = 22 cm olur.'],
 ['Bir kenarı 35 m olan kare bahçenin çevresine, 4 m genişliğindeki kapı dışında bir sıra tel çekiliyor. Kaç metre tel gerekir?','136','140','144','132','Bahçe çevresi 4 × 35 = 140 m’dir. Kapı boşluğu çıkarılınca 136 m tel gerekir.'],
 ['Bir dikdörtgenin kısa kenarı 12 cm, uzun kenarı 20 cm’dir. Aynı çevreye sahip karenin bir kenarı kaç santimetredir?','16','32','14','18','Dikdörtgen çevresi 2 × (12 + 20) = 64 cm’dir. Karenin bir kenarı 64 ÷ 4 = 16 cm olur.'],
 ['Kenarları 14, 17 ve 19 cm olan üçgen çerçevenin çevresine iki kez şerit sarılıyor. Kaç santimetre şerit kullanılır?','100','50','86','114','Üçgenin çevresi 14 + 17 + 19 = 50 cm’dir. İki tur için 2 × 50 = 100 cm gerekir.'],
 ['Bir dikdörtgenin iki uzun kenarı 5’er cm artırılıp kısa kenarları değiştirilmezse çevresi nasıl değişir?','10 cm artar.','5 cm artar.','20 cm artar.','Değişmez.','Çevrede iki uzun kenar bulunur. Her biri 5 cm uzayınca toplam artış 10 cm olur.'],
 ['Kenarları 40 m ve 25 m olan dikdörtgen parkın etrafında 3 tur yürüyen biri kaç metre yürür?','390','195','260','400','Bir tur 2 × (40 + 25) = 130 m’dir. Üç tur 3 × 130 = 390 m olur.'],
 ['Çevresi 80 cm olan kare ile çevresi 80 cm olan bir dikdörtgen karşılaştırılıyor. Dikdörtgenin kısa kenarı 12 cm ise uzun kenarı kare kenarından kaç cm fazladır?','8','12','16','20','Karenin kenarı 20 cm’dir. Dikdörtgende uzun kenar 40 − 12 = 28 cm olur. Fark 8 cm’dir.'],
 ['Kenarları 6 cm ve 10 cm olan iki eş dikdörtgen, 6 cm’lik kenarları tamamen birleşecek şekilde yan yana konuyor. Oluşan büyük dikdörtgenin çevresi kaç santimetredir?','52','64','32','40','Yeni dikdörtgenin kenarları 6 cm ve 20 cm olur. Çevresi 2 × (6 + 20) = 52 cm’dir.']
];
const length={
 1:['Bir yolun 2 km 350 m’lik bölümü ve ardından 875 m’si yürünüyor. Toplam kaç metre yürünmüştür?','3.225','2.425','3.125','2.350','2 km 350 m = 2.350 m’dir. 875 m eklenince 3.225 m olur.'],
 2:['5 metre kurdele, her biri 25 cm olan parçalara ayrılıyor. Kaç parça elde edilir?','20','25','15','125','5 m = 500 cm’dir. 500 ÷ 25 = 20 parça elde edilir.'],
 3:['Bir koşucu 800 metrelik parkuru 4 kez dolaşıyor. 5 kilometreye ulaşması için kaç metre daha koşmalıdır?','1.800','3.200','1.200','2.800','Koşulan mesafe 4 × 800 = 3.200 m’dir. 5 km = 5.000 m olduğundan 1.800 m kalır.'],
 4:['Bir kalem 145 mm, başka bir kalem 12 cm uzunluğundadır. Uzun olan kalem kaç milimetre daha uzundur?','25','133','13','265','12 cm = 120 mm’dir. Fark 145 − 120 = 25 mm olur.'],
 6:['Uzunluğu 3 m 60 cm olan ipin önce 85 cm’si, sonra 1 m 25 cm’si kesiliyor. Kaç santimetre ip kalır?','150','210','160','235','İp 360 cm, kesilenler 85 + 125 = 210 cm’dir. Kalan 360 − 210 = 150 cm olur.'],
 7:['Haritadaki bir yürüyüş yolu üç bölümden oluşuyor: 750 m, 1 km 200 m ve 650 m. Yolun toplam uzunluğu hangisidir?','2 km 600 m','2 km 500 m','3 km 600 m','1 km 600 m','Toplam 750 + 1.200 + 650 = 2.600 m, yani 2 km 600 m’dir.'],
 9:['Bir rafın uzunluğu 120 cm’dir. Genişliği 18 cm olan 6 kutu yan yana dizilince rafta kaç santimetre boşluk kalır?','12','18','24','108','Kutular 6 × 18 = 108 cm yer kaplar. Boşluk 120 − 108 = 12 cm’dir.']
};
function setRow(q,row,i){const opts=row.slice(1,5),shift=i%4;Object.assign(q,{question:row[0],choices:[...opts.slice(4-shift),...opts.slice(0,4-shift)],correctAnswer:shift,explanation:row[5]});}
export function repairMath4Topics(tests,catalog,changes){
 const map={'dogal-sayilar':'carpma','carpma':'cikarma','cikarma':'kesirler','toplama':'bolme','bolme':'zaman-olcme','zaman-olcme':'dogal-sayilar','alan-olcme':'toplama','geometrik-cisimler':'alan-olcme','kesirler':'geometrik-cisimler'};
 for(const t of tests.filter(t=>t.classLevel===4&&t.subject==='matematik')){
  const from=t.topic,to=map[from]||from;
  if(['tartma','sivi-olcme','veri'].includes(from))continue;
  const topic=catalog.grades[4].subjects.find(s=>s.id==='matematik').topics.find(p=>p.id===to);
  if(!topic)throw new Error(`Unknown math topic ${to}`);
  t.topic=to;t.topicName=topic.name;t.slug=`4-sinif-matematik-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q),group=q.id.split('-')[3];
   if(from==='carpma')setRow(q,subtraction[i],i);
   else if(from==='kesirler')setRow(q,solids[i],i);
   else if(from==='cevre-olcme')setRow(q,perimeter[i],i);
   else if(from==='uzunluk-olcme'){
    if(length[i])setRow(q,length[i],i);
    else if(i===0)q.explanation='8 m = 800 cm, 3 m 15 cm = 315 cm’dir. Kalan 800 − 245 − 315 = 240 cm olur. 240 cm = 2.400 mm’dir.';
    else if(i===5)q.explanation='Ahmet 142 cm’dir. 180 mm = 18 cm olduğundan Kerem 160 cm, Can ise 160 − 5 = 155 cm’dir.';
   }else q.explanation=explanations[group][i];
   if(group==='GEOMET'){
    if(i===0)q.question='Bir kenarı 12 cm olan kare ile kenarları 8 cm ve 15 cm olan dikdörtgen, iç bölgeleri örtüşmeden kenarları boyunca birleştiriliyor. Ortak sınır uzunluğu olabildiğince büyük seçilirse oluşan şeklin çevresi en az kaç santimetredir?';
    if(i===6)q.question='Bir kenarı 20 cm olan karenin dört kenarının her birinin ortasından, içeri doğru uzanan 4 cm kenarlı bir kare kesiliyor. Birbirine değmeyen dört çentik oluştuğunda çevre nasıl değişir?';
    if(i===9){q.question='Çevreleri sırasıyla 16, 32 ve 16 birim olan üç kare, tabanları aynı doğru üzerinde olacak şekilde küçük-büyük-küçük sırasında yan yana konuyor. Her küçük karenin bir kenarının tamamı büyük kareye değiyor. Birleşik şeklin çevresi kaç birimdir?';q.correctAnswer=2;}
   }
   if(group==='BÖLME'&&i===7)q.question='Bir dede, doğduğu yıldan 1968 yılına kadar geçen yıl sayısının torununun bugünkü yaşına eşit olduğunu söylüyor. Dede 1957 doğumlu olduğuna göre torunu kaç yaşındadır?';
   if(group==='ÇIKARM'&&i===0)q.choices=['Cem, Veli, Ali, Can','Can, Veli, Ali, Cem','Can, Ali, Veli, Cem','Ali, Can, Veli, Cem'];
   changes.push({id:q.id,reasons:['verified_math_topic_and_worked_solution'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
