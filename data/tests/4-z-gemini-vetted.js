/* Downloads'taki Gemini paketinden matematiksel olarak yeniden doğrulanmış sorular.
   Kaynak görseller pakette bulunmadığı için yalnız metni kendi başına yeterli sorular kullanılır. */
(function () {
  const tests = window.TESTCOZ_TESTS || [];

  function question(text, choices, correct, explanation, sourceId) {
    const offset = Array.from(text).reduce((sum, character) => sum + character.codePointAt(0), 0) % choices.length;
    const ordered = choices.slice(offset).concat(choices.slice(0, offset));
    return {
      question: text,
      choices: ordered,
      correctAnswer: ordered.indexOf(correct),
      explanation,
      image: null,
      source: "gemini-vetted",
      sourceId
    };
  }

  const groups = {
    "dogal-sayilar": [
      question("Altı basamaklı bir şifrenin yüz binler basamağı 8, on binler basamağı 4'tür. Binler ve birler basamaklarındaki rakamlar eşittir ve toplamları 14'tür. Yüzler basamağı 2, onlar basamağı 1 olduğuna göre şifrenin okunuşu hangisidir?", ["Sekiz yüz kırk yedi bin iki yüz on yedi", "Altı yüz kırk yedi bin iki yüz on yedi", "Sekiz yüz elli yedi bin iki yüz on yedi", "Sekiz yüz kırk yedi bin dört yüz on yedi"], "Sekiz yüz kırk yedi bin iki yüz on yedi", "Basamaklara sırasıyla 8, 4, 7, 2, 1 ve 7 yazılır. Sayı 847.217 olur; okunuşu sekiz yüz kırk yedi bin iki yüz on yedidir.", "1.1"),
      question("3, 0, 8, 5, 1 ve 9 rakamları birer kez kullanılıyor. Ali en büyük altı basamaklı çift sayıyı, Ayşe en küçük altı basamaklı tek sayıyı yazıyor. İki sayının binler bölüğündeki rakamların toplamı kaçtır?", ["22", "24", "26", "28"], "26", "Ali 985.310, Ayşe 103.589 sayısını yazar. Binler bölükleri 985 ve 103'tür; rakamların toplamı 9 + 8 + 5 + 1 + 0 + 3 = 26 olur.", "1.2"),
      question("K = 400.000 + 50.000 + 800 + 2, L = 450.082, M = 400.000 + 5.000 + 800 + 20 ve N = 400.000 + 50.000 + 8.000 + 20'dir. Büyükten küçüğe doğru sıralama hangisidir?", ["N > K > L > M", "N > L > K > M", "K > N > L > M", "K > L > N > M"], "N > K > L > M", "Sayılar N = 458.020, K = 450.802, L = 450.082 ve M = 405.820'dir. Basamaklar soldan karşılaştırılınca sıralama N > K > L > M olur.", "1.3"),
      question("Kitap numaraları 10.450, 10.550, 10.650 biçiminde 100'er artıyor. 11.250 numaralı kitap bu örüntünün kaçıncı terimidir?", ["7. terim", "8. terim", "9. terim", "10. terim"], "9. terim", "11.250 − 10.450 = 800'dür. Sekiz kez 100 eklenir; başlangıç birinci terim olduğu için 11.250 sayısı 9. terimdir.", "1.4"),
      question("Rakamları farklı, rakamları toplamı 25 olan en büyük beş basamaklı sayının ilk rakamı tek, son rakamı çifttir. Bu sayının yüzler basamağının basamak değeri kaçtır?", ["70", "700", "800", "7.000"], "700", "Koşullara uyan en büyük sayı 98.710'dur. Yüzler basamağındaki 7'nin basamak değeri 7 × 100 = 700'dür.", "1.5"),
      question("248.517 sayısının binler ve birler bölükleri yer değiştiriliyor. Oluşan sayının on binler ve onlar basamak değerleri toplamı kaçtır?", ["10.400", "10.040", "40.010", "14.000"], "10.040", "Bölükler yer değiştirince 517.248 oluşur. On binler basamak değeri 10.000, onlar basamak değeri 40'tır; toplam 10.040'tır.", "1.6"),
      question("Altı basamaklı bir sayının her basamağında en az bir boncuk vardır ve toplam 24 boncuk kullanılmıştır. Yazılabilecek en küçük sayının okunuşu hangisidir?", ["Yüz on bir bin üç yüz doksan dokuz", "Yüz on bir bin dokuz yüz otuz dokuz", "İki yüz on bir bin dokuz yüz dokuz", "Yüz on iki bin iki yüz doksan dokuz"], "Yüz on bir bin üç yüz doksan dokuz", "Sayıyı küçültmek için soldaki basamaklar 1 tutulur, kalan boncuklar sağdaki basamaklara yerleştirilir. 1 + 1 + 1 + 3 + 9 + 9 = 24 olduğundan en küçük sayı 111.399'dur.", "1.7"),
      question("Bir bilet numarasında yüz binler ve yüzler basamağı aynı, binler bölüğündeki rakamların toplamı 12 olmalıdır. Hangisi bu koşulları sağlamaz?", ["480.412", "570.599", "651.600", "380.311"], "380.311", "380.311 sayısında yüz binler ve yüzler basamağı 3'tür; ancak binler bölüğündeki 3 + 8 + 0 toplamı 11'dir. Bu nedenle koşulu sağlamaz.", "1.8"),
      question("1000 ile 1999 arasında binler ve onlar basamakları ardışık tek rakamlar olan en büyük sayının rakamları toplamı kaçtır?", ["20", "22", "24", "26"], "22", "Binler basamağı 1 olduğundan onlar basamağı ardışık tek rakam olan 3'tür. En büyük sayı 1.939 olur; 1 + 9 + 3 + 9 = 22'dir.", "1.9")
    ],
    toplama: [
      question("Ankara'da 145.650 TL bağış toplandı. İstanbul'daki bağış bundan 85.400 TL fazladır. İzmir'deki bağış ise Ankara ve İstanbul toplamından 42.000 TL eksiktir. Üç şehirde toplam kaç TL bağış toplanmıştır?", ["654.500", "685.200", "711.400", "742.600"], "711.400", "İstanbul: 145.650 + 85.400 = 231.050 TL. İzmir: 145.650 + 231.050 − 42.000 = 334.700 TL. Toplam 711.400 TL'dir.", "2.1"),
      question("Kerem'in 18.250 TL'si ve bundan 5.400 TL fazla olan birikimi daha vardır. 42.500 TL'lik bilgisayarı aldıktan sonra 1.200 TL kalması için kaç TL borç almalıdır?", ["1.500", "1.600", "1.800", "2.400"], "1.800", "İkinci birikim 23.650 TL, toplam birikim 41.900 TL'dir. Alışverişten sonra 1.200 TL kalması için 43.700 TL gerekir; 43.700 − 41.900 = 1.800 TL borç almalıdır.", "2.3"),
      question("A, B, C ve D şehirleri sırayla aynı yol üzerindedir. A–C arası 450 km, B–D arası 520 km ve A–D arası 780 km'dir. B–C arası kaç kilometredir?", ["170", "180", "190", "210"], "190", "A–C ile B–D toplamında B–C bölümü iki kez sayılır. 450 + 520 − 780 = 190 km olduğundan B–C arası 190 km'dir.", "2.4"),
      question("Üç aday sırasıyla 124.560, birinciden 15.200 eksik ve ikinciden 8.450 fazla oy aldı. Toplam 400.000 oyun kaçı geçersizdir?", ["45.150", "46.820", "48.270", "51.340"], "48.270", "İkinci aday 109.360, üçüncü aday 117.810 oy alır. Geçerli oy toplamı 351.730'dur; 400.000 − 351.730 = 48.270 oy geçersizdir.", "2.8"),
      question("İki sayının toplamı 54.380, büyük sayı küçük sayıdan 12.420 fazladır. Küçük sayının rakamları toplamı kaçtır?", ["16", "18", "19", "21"], "19", "Fark toplamdan çıkarılır: 54.380 − 12.420 = 41.960. Bu değer iki küçük sayıya eşittir; küçük sayı 20.980 olur. Rakamları toplamı 2 + 0 + 9 + 8 + 0 = 19'dur.", "2.10")
    ],
    cikarma: [
      question("Depoda 184.500 ürün vardı. 125.000 ürün üretildi, 164.750 ürün satıldı ve sonra 90.200 ürün daha üretildi. Yıl sonunda 150.000 ürün kalması için son dönemde kaç ürün satılmalıdır?", ["74.850", "84.950", "92.400", "105.500"], "84.950", "Satıştan önceki son stok 184.500 + 125.000 − 164.750 + 90.200 = 234.950'dir. 150.000 kalması için 234.950 − 150.000 = 84.950 ürün satılmalıdır.", "2.2"),
      question("14.500 kg buğdayın önce 3.250 kg'ı, sonra 4.100 kg'ı satılıyor. Kalanın bir bölümü tohumluk ayrılınca satılacak 5.000 kg kalıyor. Tohumluk kaç kilogramdır?", ["1.850", "2.150", "2.450", "2.600"], "2.150", "İki satıştan sonra 14.500 − 3.250 − 4.100 = 7.150 kg kalır. Bunun 5.000 kg'ı satılacaksa 7.150 − 5.000 = 2.150 kg tohumluktur.", "2.5"),
      question("48.753 ile 25.148 toplanırken ilk sayının on binler ve yüzler basamağı yer değiştiriliyor. Hatalı sonuç ile doğru sonuç arasındaki fark kaçtır?", ["28.500", "29.700", "30.200", "31.400"], "29.700", "48.753 yerine 78.453 kullanılmıştır. İki toplamda ikinci sayı aynı olduğundan yalnız ilk sayıları karşılaştırırız: 78.453 − 48.753 = 29.700.", "2.6"),
      question("35.000 kg kapasiteli uçağa 3 tane 4.500 kg'lık konteyner ve 12.850 kg palet yükleniyor. Görevli yüklü ağırlığı 1.500 kg eksik hesaplıyor. Görevlinin bulduğu kalan kapasite kaç kilogramdır?", ["8.650", "9.250", "10.150", "11.650"], "10.150", "Gerçek yük 3 × 4.500 + 12.850 = 26.350 kg'dır. Görevli 24.850 kg hesaplar; 35.000 − 24.850 = 10.150 kg kalan kapasite bulur.", "2.7"),
      question("85.400 litrelik depodan ikinci gün, birinci günden 4.500 litre fazla su kullanılıyor. İki gün sonunda 48.300 litre kaldığına göre birinci gün kaç litre kullanılmıştır?", ["14.500", "15.800", "16.300", "18.200"], "16.300", "Toplam kullanılan su 85.400 − 48.300 = 37.100 litredir. Birinci güne x dersek x + (x + 4.500) = 37.100 olur; 2x = 32.600 ve x = 16.300 litredir.", "2.9")
    ],
    carpma: [
      question("35 sıra ve her sırada 24 koltuk olan salon doludur. 340 öğrenci bileti 85 TL, kalan biletler 125 TL'dir. Toplam gelir kaç TL'dir?", ["85.500", "91.400", "92.500", "95.000"], "91.400", "Salonda 35 × 24 = 840 kişi vardır. 340 öğrenci 28.900 TL, kalan 500 kişi 62.500 TL öder. Toplam 91.400 TL'dir.", "3.1"),
      question("Bir uçak 42 seferin her birinde 145 palet, her palette 24 koli taşıyor. Toplam kaç koli taşınır?", ["135.240", "142.500", "146.160", "150.100"], "146.160", "Önce palet sayısı 145 × 42 = 6.090 bulunur. Her palette 24 koli olduğundan 6.090 × 24 = 146.160 koli taşınır.", "3.2"),
      question("Ali 345 × 42 işleminde onlar basamağındaki 4 ile bulduğu ara sonucu bir basamak sola kaydırmadan topluyor. Hatalı sonuç ile doğru sonuç arasındaki fark kaçtır?", ["11.500", "12.420", "13.150", "14.490"], "12.420", "Doğru sonuç 14.490'dır. Hatalı işlemde 345 × 4 = 1.380 ile 345 × 2 = 690 toplanır ve 2.070 bulunur. Fark 14.490 − 2.070 = 12.420'dir.", "3.3"),
      question("75 gömlek 185 TL'den, 45 pantolon 240 TL'den alınıyor. 25.000 TL veren kişinin para üstü kaç TL'dir?", ["250", "325", "350", "400"], "325", "Gömlekler 75 × 185 = 13.875 TL, pantolonlar 45 × 240 = 10.800 TL tutar. Toplam 24.675 TL'dir; para üstü 25.000 − 24.675 = 325 TL olur.", "3.4"),
      question("Tavuklar 45 gün boyunca günde 215 yumurta veriyor. Yumurtalar 30'lu kolilere konuyor ve yalnız tam dolu koliler 110 TL'den satılıyor. Gelir kaç TL'dir?", ["35.200", "35.420", "36.100", "36.500"], "35.420", "Toplam 215 × 45 = 9.675 yumurta vardır. 9.675 ÷ 30 işleminden 322 tam koli çıkar. 322 × 110 = 35.420 TL gelir elde edilir.", "3.6"),
      question("Çevresi 675 metre olan parkurda 30 gün boyunca her gün 14 tur koşuluyor. Toplam kaç metre koşulur?", ["275.500", "280.000", "283.500", "290.000"], "283.500", "Bir günde 675 × 14 = 9.450 metre koşulur. 30 günde 9.450 × 30 = 283.500 metre olur.", "3.7"),
      question("Kampanyada 124 bileklik 875 TL'den, kampanyasız dönemde 86 bileklik 950 TL'den satılıyor. Hangi dönemin geliri ne kadar fazladır?", ["Kampanyasız dönem / 25.400", "Kampanyalı dönem / 26.800", "Kampanyasız dönem / 26.800", "Kampanyalı dönem / 25.400"], "Kampanyalı dönem / 26.800", "Kampanya geliri 124 × 875 = 108.500 TL, diğer gelir 86 × 950 = 81.700 TL'dir. Kampanyalı dönem 108.500 − 81.700 = 26.800 TL fazladır.", "3.8"),
      question("Bir araç şehir içinde 120 km boyunca kilometrede 245 kuruş, şehir dışında 450 km boyunca kilometrede 180 kuruş tüketiyor. Toplam tüketim kaç kuruştur?", ["108.500", "110.400", "112.500", "115.000"], "110.400", "Şehir içi tüketim 120 × 245 = 29.400 kuruş, şehir dışı tüketim 450 × 180 = 81.000 kuruştur. Toplam 110.400 kuruştur.", "3.9")
    ],
    bolme: [
      question("415 öğrenci, en fazla 42 kişi alan otobüslerle geziye gidecek. En az kaç otobüs gerekir?", ["9", "10", "11", "12"], "10", "415 ÷ 42 işleminde 9 otobüs yalnız 378 öğrenci taşır ve 37 öğrenci kalır. Kalan öğrenciler için bir otobüs daha gerekir; toplam 10 otobüs kiralanır.", "4.1"),
      question("Böleni 34, bölümü 25 olan bir bölme işleminde bölünenin alabileceği en küçük ve en büyük değerlerin toplamı kaçtır?", ["1.700", "1.724", "1.733", "1.783"], "1.733", "En küçük bölünen 34 × 25 + 0 = 850'dir. Kalan 34'ten küçük olacağı için en büyük bölünen 34 × 25 + 33 = 883'tür. Toplamları 1.733'tür.", "4.2"),
      question("875 litre zeytinyağı 18 litrelik tenekelere dolduruluyor. Tam dolmayan tenekedeki yağ satılmayacağına göre kaç litre yağ satışa sunulamaz?", ["9", "11", "13", "15"], "11", "875 ÷ 18 işleminde 18 × 48 = 864 olur. 875 − 864 = 11 litre arttığı için 11 litre satışa sunulamaz.", "4.3"),
      question("560 gül 12'şerli buket yapılıyor. Tam buketler 150 TL'den, artan güller tanesi 15 TL'den satılıyor. Toplam gelir kaç TL'dir?", ["6.900", "7.020", "7.150", "7.200"], "7.020", "560 ÷ 12 = 46 kalan 8'dir. Buket geliri 46 × 150 = 6.900 TL, artan güller 8 × 15 = 120 TL getirir. Toplam 7.020 TL'dir.", "4.4"),
      question("Bir pakette toplam 855 gram vida vardır ve her vida 15 gramdır. Böyle 45 pakette toplam kaç vida bulunur?", ["2.565", "2.655", "2.750", "2.805"], "2.565", "Bir pakette 855 ÷ 15 = 57 vida vardır. 45 paket için 57 × 45 = 2.565 vida bulunur.", "4.6"),
      question("7.850 TL'nin 450 TL'si ayrılıyor, kalanı 37 kişiye eşit paylaştırılıyor. Bölme işleminden artan kaç TL olur?", ["0", "12", "15", "20"], "0", "7.850 − 450 = 7.400 TL kalır. 7.400 ÷ 37 = 200 ve kalan 0 olduğundan artan para yoktur.", "4.9")
    ]
  };

  for (const [topic, replacements] of Object.entries(groups)) {
    const test = tests.find((item) => item.classLevel === 4 && item.subject === "matematik" && item.topic === topic && item.difficulty === "zor" && item.testNumber === 1);
    if (!test) continue;
    replacements.forEach((replacement, index) => { test.questions[index] = replacement; });
  }
})();
