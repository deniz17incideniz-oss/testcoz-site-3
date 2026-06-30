/* 1. sınıf Matematik testleri — Türkiye Yüzyılı Maarif Modeli tema kapsamı.
   Görsel tanımları scripts/generate-test-assets.mjs tarafından özgün SVG dosyalarına dönüştürülür. */
(function () {
  const difficulties = ["kolay", "orta", "zor"];

  function visual(type, title, data) {
    return { type: type, title: title, data: data };
  }

  function q(question, choices, correct, explanation, picture) {
    const correctAnswer = choices.indexOf(correct);
    if (correctAnswer < 0) throw new Error("Doğru cevap seçeneklerde yok: " + question);
    return { question: question, choices: choices, correctAnswer: correctAnswer, explanation: explanation, image: null, visual: picture || null };
  }

  const banks = {
    "sayilar-ve-nicelikler": {
      kolay: [
        q("Sınıf kitaplığının alt rafında 8, üst rafında 6 hikâye kitabı var. Hangi rafta daha çok kitap vardır?", ["Alt raf", "Üst raf", "İki raf eşit", "Belli değil"], "Alt raf", "8, 6'dan büyüktür; alt rafta daha çok kitap vardır."),
        q("Oyun panosundaki mavi noktaları dikkatle say. Panoda kaç mavi nokta vardır?", ["7", "8", "9", "10"], "9", "Noktaları birer birer sayınca 9 nokta bulunur.", visual("dots", "Mavi noktalar", { groups: [{ label: "Mavi", count: 9 }] })),
        q("Ece, sınıf sırasındaki sayı kartlarını 11, 12, 13 diye dizdi. Sıradaki karta hangi sayı gelmelidir?", ["10", "12", "14", "15"], "14", "Sayılar birer artıyor; 13'ten sonra 14 gelir."),
        q("Bahçedeki yarışta Deniz üçüncü, Eylül dördüncü oldu. Deniz'in hemen önündeki çocuk kaçıncıdır?", ["Birinci", "İkinci", "Üçüncü", "Dördüncü"], "İkinci", "Üçüncü sıranın hemen önünde ikinci sıra vardır."),
        q("Sayı doğrusunda kurbağa 5'ten başlayıp bir adım ileri gidiyor. Hangi sayıya ulaşır?", ["4", "5", "6", "7"], "6", "5'ten bir sayı ileri gidince 6'ya ulaşılır.", visual("numberLine", "Bir adım ileri", { start: 0, end: 10, marks: [5, 6], arrow: [5, 6] })),
        q("Bir kutuda 10 sarı, diğer kutuda 10 yeşil boncuk var. Kutulardaki boncuk sayıları için hangisi doğrudur?", ["Sarılar daha çok", "Yeşiller daha çok", "Sayıları eşit", "İkisi de boş"], "Sayıları eşit", "Her iki kutuda da 10 boncuk olduğu için sayıları eşittir."),
        q("Mert 20'den geriye doğru 20, 19, 18 diye sayıyor. Sıradaki sayı hangisidir?", ["16", "17", "19", "21"], "17", "Geriye sayarken her adımda 1 azalır; 18'den sonra 17 gelir."),
        q("Şekil örüntüsünde kırmızı, mavi, kırmızı, mavi kutular sıralanıyor. Sıradaki kutu hangi renkte olmalıdır?", ["Kırmızı", "Mavi", "Yeşil", "Sarı"], "Kırmızı", "Renkler kırmızı-mavi biçiminde tekrar eder.", visual("pattern", "Renk örüntüsü", { items: ["red", "blue", "red", "blue", "?"] })),
        q("Oyuncak trenin vagonlarında 15, 16 ve 17 yazıyor. 16 sayısı hangi iki sayının arasındadır?", ["14 ile 15", "15 ile 17", "16 ile 18", "17 ile 19"], "15 ile 17", "Sayı sırasına göre 16, 15 ile 17 arasındadır."),
        q("Sepetteki toplar küçük gruplara ayrılmıştır. İki grupta dörder, son grupta bir top vardır. Toplam kaç top vardır?", ["7", "8", "9", "10"], "9", "4, 4 ve 1 top birlikte 9 top eder.", visual("dots", "Top grupları", { groups: [{ label: "1. grup", count: 4 }, { label: "2. grup", count: 4 }, { label: "3. grup", count: 1 }] }))
      ],
      orta: [
        q("Kütüphane görevlisi 14 numaralı kitabı, 13 ile 15 numaralı kitapların arasına koymak istiyor. Bu yerleştirme için hangisi doğrudur?", ["14, 13'ten önce gelir", "14, 13 ile 15 arasına gelir", "14, 15'ten sonra gelir", "14 en başa gelir"], "14, 13 ile 15 arasına gelir", "Sayı sırası 13, 14, 15 biçimindedir."),
        q("Görselde iki kalem kutusundaki çıkartmalar gösteriliyor. Mor kutuda kırmızı kutudan kaç tane daha fazla çıkartma vardır?", ["1", "2", "3", "4"], "2", "Mor kutuda 9, kırmızı kutuda 7 çıkartma vardır; aradaki fark 2'dir.", visual("dots", "Çıkartma kutuları", { groups: [{ label: "Mor kutu", count: 9 }, { label: "Kırmızı kutu", count: 7 }] })),
        q("Sınıf sayma oyununda çocuklar 5, 10, 15 diye söylüyor. Aynı kurala göre sıradaki sayı hangisidir?", ["16", "18", "20", "25"], "20", "Sayılar beşer artıyor; 15'ten sonra 20 gelir."),
        q("Bir sırada Arda baştan 5. sıradadır. Arda'nın hemen arkasındaki çocuk baştan kaçıncıdır?", ["3.", "4.", "5.", "6."], "6.", "Beşinci sıranın hemen arkasında altıncı sıra vardır."),
        q("Sayı doğrusunda kuş 12'den başlayıp ikişer ileri iki sıçrama yapıyor. Sonunda hangi sayıya konar?", ["14", "15", "16", "18"], "16", "12'den sonra 14'e, sonra 16'ya ulaşır.", visual("numberLine", "İkişer ileri", { start: 10, end: 20, marks: [12, 14, 16], arrow: [12, 14, 16] })),
        q("Öğretmen 18 düğmeyi sayarken bir kısmını beşerli grupladı: 5, 10, 15. Geriye kaç düğme kalır?", ["2", "3", "4", "5"], "3", "15'ten 18'e ulaşmak için 3 düğme daha gerekir."),
        q("Bir sayı 9'dan büyük, 12'den küçüktür. Bu sayı hangisi olabilir?", ["8", "9", "10", "13"], "10", "10, 9'dan büyük ve 12'den küçüktür."),
        q("Görseldeki örüntüde her adımda nokta sayısı bir artıyor. Soru işaretinin yerine kaç nokta gelmelidir?", ["3", "4", "5", "6"], "5", "Örüntü 2, 3, 4 diye birer artar; sonraki adım 5'tir.", visual("dots", "Artan örüntü", { groups: [{ label: "1", count: 2 }, { label: "2", count: 3 }, { label: "3", count: 4 }, { label: "?", count: 5 }] })),
        q("Ela 20'den geriye ikişer sayarken 20, 18, 16, 14 dedi. Ela'nın sıradaki söylemesi gereken sayı hangisidir?", ["10", "11", "12", "13"], "12", "İkişer geriye sayınca 14'ten sonra 12 gelir."),
        q("Panoda 6 yıldız, 8 daire ve 6 üçgen vardır. Hangi iki şeklin sayısı eşittir?", ["Yıldız ve daire", "Daire ve üçgen", "Yıldız ve üçgen", "Üçü de eşit"], "Yıldız ve üçgen", "Yıldızlar ve üçgenler altışar tanedir.", visual("chart", "Şekil sayıları", { items: [{ label: "Yıldız", value: 6 }, { label: "Daire", value: 8 }, { label: "Üçgen", value: 6 }] }))
      ],
      zor: [
        q("Bir sayı 10'dan büyük, 15'ten küçük ve çift sayma sırasında söyleniyor. Bu koşullara uyan sayı hangisidir?", ["11", "12", "13", "15"], "12", "12, 10 ile 15 arasındadır ve ikişer sayarken söylenir."),
        q("Sayı doğrusunda tavşan önce 7'den 10'a, sonra aynı uzunlukta bir sıçrama daha yapıyor. Tavşan hangi sayıya ulaşır?", ["11", "12", "13", "14"], "13", "İlk sıçrama 3 birimdir; 10'a 3 eklenince 13 olur.", visual("numberLine", "Eşit sıçramalar", { start: 5, end: 15, marks: [7, 10, 13], arrow: [7, 10, 13] })),
        q("Sınıf panosundaki sayı dizisinde 4, 6, 8, ?, 12 yazıyor. Boş yere gelecek sayı ile 12 arasında kaç sayı vardır?", ["Hiç", "1", "2", "3"], "1", "Boş yere 10 gelir; 10 ile 12 arasında yalnızca 11 vardır."),
        q("Yarışta Selin baştan 4., sondan 3. sıradadır. Selin'in önünde ve arkasında bulunan çocukların toplamı kaçtır?", ["4", "5", "6", "7"], "5", "Selin'in önünde 3, arkasında 2 çocuk vardır; toplam 5 çocuk."),
        q("Üç kutuda sırasıyla 5, 7 ve 9 taş vardır. Her kutuya aynı kuralla taş eklenirse dördüncü kutuda kaç taş olmalıdır?", ["10", "11", "12", "14"], "11", "Taş sayıları ikişer artıyor: 5, 7, 9, 11.", visual("dots", "Taş kutuları", { groups: [{ label: "1", count: 5 }, { label: "2", count: 7 }, { label: "3", count: 9 }, { label: "4", count: 11 }] })),
        q("Bir sayı kartı 16'dan önce, 14'ten sonra geliyor. Karttaki sayının bir eksiği kaçtır?", ["13", "14", "15", "16"], "14", "14 ile 16 arasındaki sayı 15'tir; 15'in bir eksiği 14'tür."),
        q("Nehir 100'e kadar onar sayarken iki kartı ters çevirdi: 30, 40, ?, 60. Ters çevrilen kartta hangi sayı vardır?", ["45", "50", "55", "70"], "50", "Onar sayma dizisi 30, 40, 50, 60'tır."),
        q("Şekil örüntüsünde bir üçgen, iki daire, bir üçgen, iki daire biçimi tekrar ediyor. Görseldeki boş iki yere sırayla ne gelmelidir?", ["Üçgen-daire", "Daire-üçgen", "İki üçgen", "İki daire"], "Üçgen-daire", "Tekrar eden bölüm üçgen, daire, dairedir; boşluklar üçgen ve daire ile başlar.", visual("pattern", "Tekrar eden örüntü", { items: ["triangle", "circle", "circle", "triangle", "circle", "circle", "?", "?"] })),
        q("Bir torbadaki bilyelerin sayısı 20'den azdır. Beşer sayınca 15'ten sonra yalnız 2 bilye kalıyor. Torbada kaç bilye vardır?", ["15", "16", "17", "18"], "17", "15 bilyeye kalan 2 bilye eklenir; toplam 17 olur."),
        q("Grafikte kırmızı kart 12, mavi kart 15, yeşil kart 13 kez seçilmiştir. En çok ve en az seçilenler arasındaki sayı farkı kaçtır?", ["1", "2", "3", "4"], "3", "En çok 15, en az 12'dir; aralarında 3 vardır.", visual("chart", "Seçilen kartlar", { items: [{ label: "Kırmızı", value: 12 }, { label: "Mavi", value: 15 }, { label: "Yeşil", value: 13 }] }))
      ]
    },

    "uzunluk-ve-kutle-olcme": {
      kolay: [
        q("Sınıfta kalemin boyunu ölçmek isteyen Ada, kalemden çok daha büyük bir adım yerine küçük ataşlar kullanıyor. Ada neden doğru bir araç seçmiştir?", ["Ataş renkli olduğu için", "Ataş kaleme uygun büyüklükte olduğu için", "Adım daha kısa olduğu için", "Kalem ağır olduğu için"], "Ataş kaleme uygun büyüklükte olduğu için", "Küçük nesneler, uygun büyüklükte eş birimlerle ölçülür."),
        q("Görseldeki iki kurdeleden hangisi daha uzundur?", ["Mavi kurdele", "Sarı kurdele", "İkisi eşit", "Belli değil"], "Mavi kurdele", "Mavi kurdele görselde daha uzun çizilmiştir.", visual("bars", "Kurdeleler", { items: [{ label: "Mavi", value: 9 }, { label: "Sarı", value: 6 }] })),
        q("Efe, kitabının uzunluğunu aynı boydaki silgileri uç uca koyarak ölçüyor. Silgilerin arasında boşluk bırakmaması neden önemlidir?", ["Kitap ağırlaşmasın diye", "Doğru ölçüm yapmak için", "Silgiler renkli görünsün diye", "Kitap açılmasın diye"], "Doğru ölçüm yapmak için", "Ölçme birimleri boşluksuz ve uç uca yerleştirilmelidir."),
        q("Bir elinde dolu suluk, diğer elinde boş kalem kutusu tutan Duru'nun hangi eli daha çok aşağı iner?", ["Suluk olan eli", "Kalem kutusu olan eli", "İki eli de eşit", "Hiçbiri"], "Suluk olan eli", "Dolu suluk boş kalem kutusundan daha ağırdır."),
        q("Terazide oyuncak ayı tarafı aşağıda, top tarafı yukarıdadır. Buna göre hangisi daha ağırdır?", ["Top", "Oyuncak ayı", "İkisi eşit", "Terazi"], "Oyuncak ayı", "Eşit kollu terazide aşağı inen taraf daha ağırdır.", visual("balance", "Oyuncak terazisi", { left: { label: "Ayı", value: 8 }, right: { label: "Top", value: 4 } })),
        q("Sınıf kapısının genişliğini ölçmek için hangisi daha uygundur?", ["Bir pirinç tanesi", "Bir adım", "Bir saç teli", "Bir düğme"], "Bir adım", "Kapı gibi büyük uzunluklarda adım daha uygun bir standart olmayan ölçüdür."),
        q("Üç çubuktan kırmızı en uzun, sarı en kısa ise mavi çubuğun uzunluğu için hangisi söylenebilir?", ["Kırmızıdan uzun", "Sarıdan kısa", "İkisinin arasında", "Hepsiyle eşit"], "İkisinin arasında", "Kırmızı en uzun ve sarı en kısa olduğuna göre mavi ikisinin arasındadır."),
        q("Görselde bir kalem 5 eş ataş uzunluğundadır. Kalemin uzunluğu kaç ataştır?", ["3 ataş", "4 ataş", "5 ataş", "6 ataş"], "5 ataş", "Kalemin altında uç uca dizilmiş 5 eş ataş vardır.", visual("units", "Ataşla ölçme", { count: 5, object: "Kalem" })),
        q("Büyük ama boş bir karton kutu ile küçük bir taş karşılaştırılıyor. Hangisinin daha ağır olduğunu anlamanın en güvenilir yolu nedir?", ["Rengine bakmak", "Boyuna bakmak", "Terazide tartmak", "Adını söylemek"], "Terazide tartmak", "Büyüklük her zaman ağırlığı göstermez; teraziyle karşılaştırmak gerekir."),
        q("Görseldeki üç kitabın boyları karşılaştırılıyor. En kısa kitap hangisidir?", ["A kitabı", "B kitabı", "C kitabı", "Hepsi eşit"], "B kitabı", "B kitabının çubuğu diğerlerinden daha kısadır.", visual("bars", "Kitap boyları", { items: [{ label: "A", value: 7 }, { label: "B", value: 4 }, { label: "C", value: 6 }] }))
      ],
      orta: [
        q("Mina masasını 8 karış, kardeşi 10 karış ölçtü. Masa değişmediğine göre sonuçların farklı çıkmasının en uygun nedeni nedir?", ["Masanın rengi", "Karışlarının farklı büyüklükte olması", "Odanın sıcaklığı", "Masanın ağır olması"], "Karışlarının farklı büyüklükte olması", "Standart olmayan birimler kişiden kişiye değişebilir."),
        q("Görselde aynı uzunluktaki raf, büyük bloklarla 4; küçük bloklarla 8 birim ölçülüyor. Hangi sonuç doğrudur?", ["Rafın boyu değişmiştir", "Küçük birim kullanıldığında sayı artar", "Büyük bloklar yanlıştır", "İki ölçüm de yapılamaz"], "Küçük birim kullanıldığında sayı artar", "Aynı uzunluk küçük birimlerle ölçülünce daha çok birim gerekir.", visual("unitsCompare", "Aynı raf, iki birim", { large: 4, small: 8 })),
        q("Bir ip önce 6 eş çubukla ölçülüyor. Sonra çubuklardan biri diğerlerinden daha kısa seçiliyor. İkinci ölçüm neden güvenilir değildir?", ["İp renkli olduğu için", "Birimler eş uzunlukta olmadığı için", "Çubuk sayısı az olduğu için", "İp hafif olduğu için"], "Birimler eş uzunlukta olmadığı için", "Doğru ölçümde kullanılan bütün birimler aynı uzunlukta olmalıdır."),
        q("Terazide elma 5 küple, armut 3 küple dengeleniyor. Buna göre hangisi doğrudur?", ["Armut daha ağır", "Elma daha ağır", "İkisi eşit", "Küpler ölçülemez"], "Elma daha ağır", "Elma 5, armut 3 eş küp ağırlığındadır; 5 daha büyüktür."),
        q("Görselde A paketi 7, B paketi 7 eş küple dengededir. Paketler için hangisi söylenir?", ["A daha ağır", "B daha ağır", "Kütleleri eşit", "A daha uzundur"], "Kütleleri eşit", "İki paket de 7 eş küple dengelendiği için kütleleri eşittir.", visual("chart", "Paketlerin kütlesi", { items: [{ label: "A paketi", value: 7 }, { label: "B paketi", value: 7 }] })),
        q("Sınıf tahtasını silgiyle ölçmek isteyen çocuk çok uzun süre uğraşıyor. Aynı ölçümü daha kolay yapmak için hangisini seçmelidir?", ["Daha küçük bir düğme", "Bir karış", "Bir pirinç tanesi", "Bir boncuk"], "Bir karış", "Büyük uzunluklarda daha büyük ve uygun birim kullanmak ölçmeyi kolaylaştırır."),
        q("Kırmızı şerit maviden uzun, mavi şerit sarıdan uzundur. En kısa şerit hangisidir?", ["Kırmızı", "Mavi", "Sarı", "Hepsi eşit"], "Sarı", "Sıralama kırmızı, mavi, sarı biçimindedir; en kısa sarıdır."),
        q("Görselde kalem 6 ataş, defter 9 ataş uzunluğundadır. Defter kalemden kaç ataş daha uzundur?", ["2", "3", "4", "5"], "3", "9 ataştan 6 ataş çıkarılınca 3 ataş kalır.", visual("chart", "Ataşla ölçüm", { items: [{ label: "Kalem", value: 6 }, { label: "Defter", value: 9 }] })),
        q("Bir oyuncak araba 4 eş küp, bir bebek 6 eş küp ağırlığındadır. İkisini hafiften ağıra dizersek sıra nasıl olur?", ["Bebek-araba", "Araba-bebek", "İkisi eşit", "Sıralanamaz"], "Araba-bebek", "4 küp ağırlığındaki araba, 6 küp ağırlığındaki bebekten hafiftir."),
        q("Ölçüm çiziminde ilk üç blok uç uca, son blok arada boşluk bırakılarak konulmuştur. Bu ölçüm için hangisi doğrudur?", ["Tam doğrudur", "Boşluk nedeniyle sonuç hatalıdır", "Blok sayısı değişmez", "Nesne ağırdır"], "Boşluk nedeniyle sonuç hatalıdır", "Birimler arasında boşluk bırakılırsa uzunluk fazla ölçülür.", visual("measurementError", "Ölçüm hatasını bul", { units: 4, gapAfter: 3 } ))
      ],
      zor: [
        q("Aynı koridoru Can 12 adım, öğretmeni 8 adım ölçüyor. İkisi de boşluk bırakmadan yürüdüğüne göre öğretmenin adımı için hangisi söylenebilir?", ["Daha kısadır", "Daha uzundur", "Can'ınkiyle eşittir", "Ölçüm yapılamaz"], "Daha uzundur", "Aynı uzunluk daha az sayıda birimle ölçüldüyse kullanılan birim daha uzundur."),
        q("Görselde bir masa 5 büyük blok veya 10 küçük blok uzunluğundadır. Bir büyük blok kaç küçük blok kadar olabilir?", ["1", "2", "3", "5"], "2", "5 büyük blok 10 küçük bloğa eşitse bir büyük blok 2 küçük bloktur.", visual("unitsCompare", "Birimleri karşılaştır", { large: 5, small: 10 })),
        q("Bir çocuk kitabı 7 silgi uzunluğunda tahmin ediyor, ölçünce 9 silgi buluyor. Tahmini ile ölçümü arasında kaç silgi fark vardır?", ["1", "2", "3", "4"], "2", "9 ile 7 arasındaki fark 2'dir."),
        q("A paketi B'den ağır, C'den hafiftir. Paketleri hafiften ağıra sıralayan seçenek hangisidir?", ["A-B-C", "B-A-C", "C-A-B", "B-C-A"], "B-A-C", "B, A'dan hafif; C ise A'dan ağırdır. Sıra B-A-C olur."),
        q("Terazide kırmızı kutu 8 küple dengededir. Mavi kutu kırmızıdan 2 küp daha hafiftir. Mavi kutu kaç küple dengelenir?", ["5", "6", "8", "10"], "6", "8 küpten 2 küp çıkarılır; mavi kutu 6 küptür.", visual("balance", "Kutuların kütlesi", { left: { label: "Kırmızı", value: 8 }, right: { label: "Mavi", value: 6 } })),
        q("Bir masa önce 9 eş kalemle ölçülüyor. Kalemlerin her biri iki kat uzun birimlerle değiştirilirse yaklaşık kaç yeni birim gerekir?", ["4 ya da 5", "9", "18", "20"], "4 ya da 5", "Birim iki kat uzayınca gereken birim sayısı yaklaşık yarıya iner."),
        q("Üç nesnenin kütleleri 4, 7 ve 5 eş küptür. Ortanca ağırlıktaki nesne kaç küptür?", ["4", "5", "6", "7"], "5", "4, 5, 7 sıralamasında ortadaki değer 5'tir."),
        q("Görseldeki şeritlerden A, B'den 2 birim uzun; C ise A'dan 1 birim kısadır. En uzun şerit hangisidir?", ["A", "B", "C", "A ile C eşit"], "A", "A, B'den uzundur; C de A'dan 1 birim kısa olduğu için en uzun A'dır.", visual("bars", "Şerit karşılaştırma", { items: [{ label: "A", value: 8 }, { label: "B", value: 6 }, { label: "C", value: 7 }] })),
        q("Bir kutu 6 misket, bir top 9 misket ağırlığındadır. Kutuya 3 misket ağırlığında oyuncak eklenirse kutu ile top için hangisi doğru olur?", ["Kutu daha hafif", "Top daha hafif", "Kütleleri eşit", "Karşılaştırılamaz"], "Kütleleri eşit", "Kutunun yeni kütlesi 6 + 3 = 9 miskettir; top da 9 miskettir."),
        q("Görselde bir çocuk cetvel gibi kullandığı blokları üst üste bindirmiştir. Gerçek uzunluk, bulduğu sonuçtan nasıl etkilenir?", ["Daha fazla görünür", "Daha az görünür", "Hiç değişmez", "Ağırlık artar"], "Daha az görünür", "Birimler üst üste bindirilince aynı uzunluk için eksik birim sayılır.", visual("measurementError", "Üst üste binen birimler", { units: 5, overlap: true } ))
      ]
    },

    "paralarimiz": {
      kolay: [
        q("Okul kantinindeki alışveriş oyununda üzerinde '5 TL' yazan para kartı seçiliyor. Bu kart hangi değeri gösterir?", ["1 TL", "5 TL", "10 TL", "20 TL"], "5 TL", "Kartın üzerinde yazan 5 TL, paranın değeridir."),
        q("Görseldeki para kartlarından hangisinin değeri en büyüktür?", ["5 TL", "10 TL", "20 TL", "50 TL"], "50 TL", "5, 10, 20 ve 50 arasında en büyük değer 50'dir.", visual("coins", "Para kartları", { values: [5, 10, 20, 50] })),
        q("Ece'nin kumbarasında bir 10 TL ve bir 5 TL para resmi var. Hangi para tek başına daha değerlidir?", ["5 TL", "10 TL", "İkisi eşit", "Belli değil"], "10 TL", "10 TL, 5 TL'den daha büyük bir değeri gösterir."),
        q("Bir para kartında '1 TL' yazıyor. Bu kartı değeri küçükten büyüğe dizilen 1, 5, 10 TL kartlarının neresine koymalıyız?", ["En başa", "5 ile 10 arasına", "En sona", "Hiçbir yere"], "En başa", "1 TL, 5 TL ve 10 TL'den küçüktür."),
        q("Görselde iki para değeri karşılaştırılıyor. Hangi ifade doğrudur?", ["20 TL, 10 TL'den küçüktür", "20 TL, 10 TL'den büyüktür", "İkisi eşittir", "10 TL yoktur"], "20 TL, 10 TL'den büyüktür", "20 sayısı 10'dan büyüktür.", visual("coins", "Değerleri karşılaştır", { values: [10, 20] })),
        q("Market oyununda kasiyer 100 TL yazan kartı arıyor. Hangi kartı seçmelidir?", ["10 TL", "20 TL", "50 TL", "100 TL"], "100 TL", "İstenen değer doğrudan 100 TL yazan karttır."),
        q("Aşağıdaki para değerlerinden hangisi diğerlerinden daha küçüktür?", ["5 TL", "20 TL", "50 TL", "100 TL"], "5 TL", "5, verilen değerlerin en küçüğüdür."),
        q("Görselde üç para kartı küçükten büyüğe dizilecektir. Doğru sıra hangisidir?", ["20-10-5", "5-10-20", "10-5-20", "20-5-10"], "5-10-20", "5 TL < 10 TL < 20 TL sıralaması doğrudur.", visual("coins", "Küçükten büyüğe", { values: [5, 10, 20] })),
        q("Bir 50 TL kartı ile bir 50 TL kartı karşılaştırılıyor. Değerleri için hangisi doğrudur?", ["Birincisi büyük", "İkincisi büyük", "Değerleri eşit", "İkisi de 5 TL"], "Değerleri eşit", "İki kart da 50 TL değerindedir."),
        q("Görseldeki değerlerden hangisi 200 TL'yi gösterir?", ["20", "50", "100", "200"], "200", "Üzerinde 200 yazan para kartı 200 TL değerindedir.", visual("coins", "Para değerini bul", { values: [20, 50, 100, 200] } ))
      ],
      orta: [
        q("Sınıf marketinde 10 TL, 20 TL ve 5 TL kartları karışık duruyor. Küçükten büyüğe doğru diziliş hangisidir?", ["5-10-20", "10-5-20", "20-10-5", "5-20-10"], "5-10-20", "5, 10 ve 20'nin doğru artan sırası 5-10-20'dir."),
        q("Görselde iki cüzdanda birer para kartı var. Mor cüzdandaki değer, sarı cüzdaktakinden kaç TL daha büyüktür?", ["5 TL", "10 TL", "15 TL", "20 TL"], "10 TL", "Mor cüzdanda 20 TL, sarıda 10 TL vardır; fark 10 TL'dir.", visual("coins", "İki cüzdan", { labeled: [{ label: "Mor", value: 20 }, { label: "Sarı", value: 10 }] })),
        q("Bir çocuk 50 TL kartından daha küçük, 10 TL kartından daha büyük bir para değeri seçiyor. Hangisini seçmiş olabilir?", ["5 TL", "20 TL", "50 TL", "100 TL"], "20 TL", "20 TL, 10 TL'den büyük ve 50 TL'den küçüktür."),
        q("Para panosunda 1, 5, 10, 20, 50, 100, 200 TL değerleri vardır. 20 TL'den hemen sonra gelen daha büyük değer hangisidir?", ["10 TL", "25 TL", "50 TL", "100 TL"], "50 TL", "Verilen para değerleri sıralamasında 20 TL'den sonra 50 TL gelir."),
        q("Görseldeki dört para değerinden en küçük ve en büyük olanlar hangileridir?", ["5 ve 20", "10 ve 100", "5 ve 100", "20 ve 50"], "5 ve 100", "En küçük 5 TL, en büyük 100 TL'dir.", visual("coins", "En küçük ve en büyük", { values: [5, 10, 20, 100] })),
        q("Kasadaki iki karttan biri 100 TL, diğeri 50 TL'dir. 50 TL kartının değeri için hangisi doğrudur?", ["100 TL'den büyüktür", "100 TL'den küçüktür", "100 TL'ye eşittir", "200 TL'dir"], "100 TL'den küçüktür", "50, 100'den küçüktür."),
        q("Bir para değeri 5 TL'den büyük, 20 TL'den küçüktür ve panoda bulunan resmî değerlerden biridir. Bu değer hangisidir?", ["7 TL", "10 TL", "15 TL", "25 TL"], "10 TL", "Verilen resmî para değerleri içinde koşula uyan 10 TL'dir."),
        q("Görselde 5 TL, 50 TL ve 10 TL kartları var. Ortanca değerdeki kart hangisidir?", ["5 TL", "10 TL", "50 TL", "Hepsi eşit"], "10 TL", "5 < 10 < 50 olduğundan ortadaki değer 10 TL'dir.", visual("coins", "Ortanca değeri bul", { values: [5, 50, 10] })),
        q("Oyunda Defne 20 TL kartını, Aras 10 TL kartını seçti. Defne'nin kartı Aras'ın kartının kaç katı değerindedir?", ["Aynı", "2 katı", "3 katı", "10 katı"], "2 katı", "İki tane 10 TL, 20 TL eder; 20 TL iki katıdır."),
        q("Görselde değerleri kapatılan kartların altında sırasıyla 10, 20, 50 yazıyor. En sağdaki kartın değeri hangisidir?", ["10 TL", "20 TL", "50 TL", "100 TL"], "50 TL", "En sağdaki kartın altında 50 yazmaktadır.", visual("coins", "Kart sırası", { values: [10, 20, 50] } ))
      ],
      zor: [
        q("Para kartları 5, 10, 20, 50 diye büyüyor. Bu dizide 10 TL ile 50 TL arasında kaç farklı kart vardır?", ["1", "2", "3", "4"], "1", "10 TL ile 50 TL arasında yalnız 20 TL kartı vardır."),
        q("Görselde A kartı 20 TL, B kartı 50 TL, C kartı 10 TL'dir. B'den küçük ama C'den büyük kart hangisidir?", ["A", "B", "C", "Hiçbiri"], "A", "20 TL, 50 TL'den küçük ve 10 TL'den büyüktür.", visual("coins", "Hangi kart arada?", { labeled: [{ label: "A", value: 20 }, { label: "B", value: 50 }, { label: "C", value: 10 }] })),
        q("Bir kutudaki para kartının değeri 100 TL'den küçük, 20 TL'den büyük ve listede 20'den sonraki ilk resmî değerdir. Kart kaç TL'dir?", ["25 TL", "40 TL", "50 TL", "75 TL"], "50 TL", "Resmî değerler sıralamasında 20 TL'den sonra 50 TL gelir."),
        q("İki tane 10 TL kartının toplam değeriyle aynı olan tek para kartı hangisidir?", ["5 TL", "10 TL", "20 TL", "50 TL"], "20 TL", "10 TL + 10 TL = 20 TL'dir."),
        q("Görselde 5 TL'lik iki kart ve 10 TL'lik bir kart bulunuyor. Hangi iki kart birlikte 10 TL değerindedir?", ["İki 5 TL", "5 TL ve 10 TL", "İki 10 TL", "Hiçbiri"], "İki 5 TL", "5 TL + 5 TL = 10 TL'dir.", visual("coins", "Eş değeri bul", { values: [5, 5, 10] })),
        q("Bir 50 TL kartı, kaç tane 10 TL kartıyla aynı değerdedir?", ["2", "3", "4", "5"], "5", "Beş tane 10 TL'nin toplamı 50 TL'dir."),
        q("Ela'nın kartı 20 TL'den büyük, 100 TL'den küçüktür. Mert'in kartı Ela'nınkinden küçüktür ve 20 TL'dir. Ela'nın kartı hangisi olabilir?", ["10 TL", "20 TL", "50 TL", "100 TL"], "50 TL", "50 TL, 20'den büyük ve 100'den küçüktür."),
        q("Görselde 100 TL bir tarafta, iki eş 50 TL kartı diğer taraftadır. Değerler için hangisi doğrudur?", ["100 TL daha büyük", "İki 50 TL daha büyük", "Değerleri eşit", "Karşılaştırılamaz"], "Değerleri eşit", "50 TL + 50 TL = 100 TL'dir.", visual("balance", "Eş para değerleri", { left: { label: "100 TL", value: 100 }, right: { label: "50+50 TL", value: 100 } })),
        q("200 TL değerine ulaşmak için 100 TL'lik kaç eş kart gerekir?", ["1", "2", "3", "4"], "2", "100 TL + 100 TL = 200 TL'dir."),
        q("Görselde 10, 20, 50 ve 100 TL kartları küçükten büyüğe dizilmiş. 20 TL kartı soldan kaçıncıdır?", ["1.", "2.", "3.", "4."], "2.", "Dizi 10, 20, 50, 100 olduğundan 20 TL ikinci sıradadır.", visual("coins", "Para sırası", { values: [10, 20, 50, 100] } ))
      ]
    },

    "toplama-ve-cikarma": {
      kolay: [
        q("Sınıfın okuma köşesinde 7 masal kitabı vardı. Öğretmen rafa 3 yeni kitap daha koydu. Rafta şimdi kaç kitap vardır?", ["9", "10", "11", "12"], "10", "7 kitabın üzerine 3 kitap eklenir: 7 + 3 = 10."),
        q("Görselde iki kutudaki boncuklar bir araya getiriliyor. Toplam kaç boncuk olur?", ["7", "8", "9", "10"], "9", "Bir kutuda 5, diğerinde 4 boncuk vardır; 5 + 4 = 9.", visual("dots", "Boncukları birleştir", { groups: [{ label: "1. kutu", count: 5 }, { label: "2. kutu", count: 4 }] })),
        q("Bahçede 12 çocuk oyun oynuyordu. Üç çocuk sınıfa döndü. Bahçede kaç çocuk kaldı?", ["8", "9", "10", "15"], "9", "12 çocuktan 3'ü ayrılır: 12 - 3 = 9."),
        q("Bir yapbozun 6 parçası masada, 6 parçası kutudadır. Tüm parçalar bir araya gelince kaç parça olur?", ["10", "11", "12", "13"], "12", "6 + 6 = 12 parçadır."),
        q("Sayı kartında 8 + 5 işlemi gösteriliyor. Sonuç hangisidir?", ["11", "12", "13", "14"], "13", "8'in üzerine 5 sayınca 13'e ulaşılır.", visual("equation", "İşlem kartı", { text: "8 + 5 = ?" })),
        q("Kuş yemliğinde 15 tane yem vardı. Kuşlar 4 tanesini yedi. Kaç yem kaldı?", ["9", "10", "11", "12"], "11", "15 - 4 = 11 yem kalır."),
        q("Bir kutuda hiç kırmızı kalem yoktur. Kutudaki 9 mavi kaleme 0 kırmızı kalem eklenirse toplam kaç kalem olur?", ["0", "8", "9", "10"], "9", "Bir sayıya sıfır eklemek sayıyı değiştirmez; 9 + 0 = 9."),
        q("Görselde 14 yıldızın 5'i üzeri çizilerek ayrılıyor. Geriye kaç yıldız kalır?", ["8", "9", "10", "11"], "9", "14 yıldızdan 5'i ayrılır: 14 - 5 = 9.", visual("subtraction", "Yıldızları ayır", { total: 14, removed: 5 })),
        q("Eylül 9 mavi ve 4 sarı çıkartmayı dosyasına yapıştırdı. Toplam çıkartma sayısını veren işlem hangisidir?", ["9 - 4", "9 + 4", "9 + 9", "4 - 9"], "9 + 4", "İki grup birleştirildiği için toplama işlemi kullanılır."),
        q("Denge kartının solunda 6 + 3 yazıyor. Sağ tarafa eşit sonuç veren hangi sayı gelmelidir?", ["7", "8", "9", "10"], "9", "6 + 3 = 9 olduğu için sağ tarafa 9 yazılır.", visual("equation", "Eşitliği tamamla", { text: "6 + 3 = ?" } ))
      ],
      orta: [
        q("Defne'nin koleksiyonunda 8 taş vardı. Önce 5 taş ekledi, sonra 2 taşı arkadaşına verdi. Koleksiyonda kaç taş kaldı?", ["9", "10", "11", "13"], "11", "8 + 5 = 13, ardından 13 - 2 = 11."),
        q("Görselde 7 kırmızı ve 6 mavi pul var. Toplamın 15 olması için kaç pul daha gerekir?", ["1", "2", "3", "4"], "2", "7 + 6 = 13; 15'e ulaşmak için 2 pul gerekir.", visual("dots", "Pul koleksiyonu", { groups: [{ label: "Kırmızı", count: 7 }, { label: "Mavi", count: 6 }] })),
        q("Bir otobüste 14 yolcu vardı. Durakta 4 kişi indi, 3 kişi bindi. Otobüste şimdi kaç yolcu vardır?", ["11", "12", "13", "17"], "13", "14 - 4 = 10, 10 + 3 = 13."),
        q("Sınıfta iki grup vardır. Bir grupta 9, diğerinde 6 çocuk bulunuyor. Grupların eşit olması için küçük gruba kaç çocuk katılmalıdır?", ["2", "3", "4", "5"], "3", "6'ya 3 eklenince 9 olur ve gruplar eşitlenir."),
        q("İşlem kartında 7 + ? = 12 yazıyor. Soru işaretinin yerine hangi sayı gelmelidir?", ["4", "5", "6", "7"], "5", "7'nin 12 olması için 5 eklenir.", visual("equation", "Eksik toplananı bul", { text: "7 + ? = 12" })),
        q("Kütüphanede 18 kitabın 7'si ödünç verildi. Sonra 2 kitap geri getirildi. Rafta kaç kitap oldu?", ["11", "12", "13", "14"], "13", "18 - 7 = 11, sonra 11 + 2 = 13."),
        q("Mert 6 + 8 işlemini, Ece 8 + 6 işlemini yaptı. Sonuçları için hangisi doğrudur?", ["Mert'inki büyük", "Ece'ninki büyük", "Sonuçlar eşit", "İkisi de 12"], "Sonuçlar eşit", "Toplananların yeri değişse de toplam değişmez; ikisi de 14'tür."),
        q("Görselde terazinin bir yanında 5 + 4, diğer yanında 3 + ? vardır. Denge için soru işareti kaç olmalıdır?", ["4", "5", "6", "7"], "6", "5 + 4 = 9'dur; 3 + 6 da 9 eder.", visual("equation", "Dengeyi kur", { text: "5 + 4 = 3 + ?" })),
        q("Bir çiftlikte 16 civcivin 5'i kümese girdi. Dışarıda kalanların 2'si de sonra içeri girdi. Dışarıda kaç civciv kaldı?", ["7", "8", "9", "11"], "9", "16 - 5 = 11, 11 - 2 = 9."),
        q("Sayı doğrusunda 10'dan başlayıp 4 ileri, sonra 3 geri gidiliyor. Son durak hangi sayıdır?", ["9", "10", "11", "17"], "11", "10 + 4 = 14, 14 - 3 = 11.", visual("numberLine", "İleri ve geri", { start: 8, end: 16, marks: [10, 14, 11], arrow: [10, 14, 11] } ))
      ],
      zor: [
        q("Sınıf oyununda bir takım 7 puan aldı, sonra 5 puan daha kazandı ve yanlış cevap yüzünden 3 puanı silindi. Takımın kaç puanı kaldı?", ["8", "9", "10", "12"], "9", "7 + 5 = 12, 12 - 3 = 9."),
        q("Görselde iki kutunun toplamı 16 boncuktur. Birinci kutuda 9 boncuk olduğuna göre ikinci kutuda kaç boncuk vardır?", ["5", "6", "7", "8"], "7", "16'dan 9 çıkarılır: 16 - 9 = 7.", visual("equation", "İki kutu", { text: "9 + ? = 16" })),
        q("Bir rafta 13 kitap vardır. Alt rafa bazı kitaplar aktarılınca üst rafta 8 kitap kalıyor. Kaç kitap aktarılmıştır?", ["4", "5", "6", "7"], "5", "13 - 8 = 5 kitap aktarılmıştır."),
        q("Ece'nin 6, Can'ın 9 kartı var. Ece 2 kart kazanırken Can 1 kartını veriyor. Son durumda aralarındaki fark kaçtır?", ["0", "1", "2", "3"], "0", "Ece 8, Can da 8 karta ulaşır; fark 0'dır."),
        q("Denge görselinde 8 + 4 işlemi, 15 - ? işlemine eşittir. Soru işareti kaçtır?", ["2", "3", "4", "5"], "3", "8 + 4 = 12'dir; 15 - 3 de 12 eder.", visual("equation", "Eşit işlemler", { text: "8 + 4 = 15 - ?" })),
        q("Bir torbada 20 bilye vardı. Önce 6, sonra 5 bilye çıkarıldı. Torbada kaç bilye kaldı?", ["8", "9", "10", "11"], "9", "20 - 6 = 14, 14 - 5 = 9."),
        q("Toplamları 17 olan iki sayıdan biri 8'dir. Diğer sayının 2 eksiği kaçtır?", ["5", "6", "7", "9"], "7", "Diğer sayı 17 - 8 = 9'dur; 9'un 2 eksiği 7'dir."),
        q("Görselde 4, 7 ve 5 oyuncak üç rafa yerleştirilmiş. Toplam oyuncakların 6'sı alınırsa kaç oyuncak kalır?", ["8", "9", "10", "11"], "10", "4 + 7 + 5 = 16, 16 - 6 = 10.", visual("chart", "Oyuncak rafları", { items: [{ label: "1. raf", value: 4 }, { label: "2. raf", value: 7 }, { label: "3. raf", value: 5 }] })),
        q("Bir sayıya 6 ekleyince 14 oluyor. Aynı sayıdan 3 çıkarılırsa sonuç kaç olur?", ["3", "4", "5", "6"], "5", "Başlangıç sayısı 14 - 6 = 8'dir; 8 - 3 = 5."),
        q("Sayı yolunda bir piyon 5'ten başlayıp 7 ileri, 4 geri ve 2 ileri gidiyor. Sonunda hangi sayıya ulaşır?", ["8", "9", "10", "11"], "10", "5 + 7 = 12, 12 - 4 = 8, 8 + 2 = 10.", visual("numberLine", "Üç hareket", { start: 4, end: 14, marks: [5, 12, 8, 10], arrow: [5, 12, 8, 10] } ))
      ]
    },

    "konum-ve-es-nesneler": {
      kolay: [
        q("Sınıfta saat tahtanın üstünde, kitaplık tahtanın sağındadır. Saatin tahtaya göre konumu hangisidir?", ["Altında", "Üstünde", "Sağında", "Arkasında"], "Üstünde", "Saat, tahtanın üst tarafındadır."),
        q("Görselde kedi kutunun içinde, top kutunun dışındadır. Kutunun içinde olan hangisidir?", ["Kedi", "Top", "İkisi", "Hiçbiri"], "Kedi", "Görselde kedi kutunun sınırları içindedir.", visual("position", "İçinde ve dışında", { relation: "inside", first: "Kedi", second: "Top" })),
        q("Efe, kapıdan içeri girince iki adım ileri yürüyor. Efe hangi yönde hareket etmiştir?", ["İleri", "Geri", "Sağa", "Sola"], "İleri", "Başlangıç noktasından ön tarafa doğru hareket etmiştir."),
        q("Bir oyuncak araba masanın altında, kalem masanın üzerindedir. Masanın altında olan nesne hangisidir?", ["Kalem", "Araba", "Masa", "İkisi de"], "Araba", "Oyuncak araba masanın altındadır."),
        q("Görselde sarı yıldız mavi dairenin solundadır. Mavi daire yıldızın hangi tarafındadır?", ["Solunda", "Sağında", "Üstünde", "İçinde"], "Sağında", "Yıldız dairenin solundaysa daire yıldızın sağındadır.", visual("position", "Sağ ve sol", { relation: "left-right", first: "Yıldız", second: "Daire" })),
        q("İki çorap aynı renk, aynı desen ve aynı büyüklüktedir. Bu çoraplar için hangi söz kullanılır?", ["Uzak", "Eş", "Ağır", "Kısa"], "Eş", "Bütün görsel özellikleri aynı olan nesneler eştir."),
        q("Sırada Ayşe, Bora ile Cem'in arasındadır. Ortada kim vardır?", ["Ayşe", "Bora", "Cem", "Hepsi"], "Ayşe", "'Arasında' ifadesi Ayşe'nin ortada olduğunu belirtir."),
        q("Görselde ev başlangıç, okul hedeftir. Okula ulaşmak için ok yönünde kaç adım ileri gidilmelidir?", ["1", "2", "3", "4"], "3", "Ev ile okul arasında üç eş adım gösterilmiştir.", visual("path", "Evden okula", { steps: ["ileri", "ileri", "ileri"] })),
        q("Bahçedeki ağaç yakında, dağ uzakta görünüyor. Uzakta olan hangisidir?", ["Ağaç", "Dağ", "Bahçe", "İkisi de"], "Dağ", "Dağ, bakılan noktaya göre uzaktadır."),
        q("Görselde dört eldivenden hangileri birbirinin eşidir?", ["A ile B", "A ile C", "B ile D", "C ile D"], "A ile C", "A ve C aynı renk, şekil ve büyüklüktedir.", visual("matching", "Eşini bul", { items: [{ id: "A", kind: "star", color: "blue" }, { id: "B", kind: "circle", color: "red" }, { id: "C", kind: "star", color: "blue" }, { id: "D", kind: "star", color: "green" }] }))
      ],
      orta: [
        q("Mina'nın önünde Ece, arkasında Arda oturuyor. Arda'nın Mina'ya göre konumu hangisidir?", ["Önünde", "Arkasında", "Sağında", "Üstünde"], "Arkasında", "Arda, Mina'nın arka tarafında oturur."),
        q("Görselde robot başlangıçtan bir adım sağa, iki adım ileri gidiyor. Hangi hedefe ulaşır?", ["A", "B", "C", "D"], "C", "Gösterilen yolu izleyince robot C hedefine ulaşır.", visual("path", "Robotun yolu", { steps: ["sağ", "ileri", "ileri"], target: "C" })),
        q("Top, sandalyenin altında ve masanın solundadır. Topun masaya göre konumu hangisidir?", ["Sağında", "Solunda", "Üstünde", "İçinde"], "Solunda", "Cümlede topun masanın solunda olduğu açıkça belirtilmiştir."),
        q("Bir nesnenin eşini seçerken yalnız rengine bakmak neden her zaman yeterli değildir?", ["Renk görünmez", "Şekli ve büyüklüğü farklı olabilir", "Her nesne ağırdır", "Eş nesneler renksizdir"], "Şekli ve büyüklüğü farklı olabilir", "Eşlik için renk, şekil ve büyüklük gibi özellikler birlikte incelenir."),
        q("Görselde üç anahtar vardır. Kırmızı anahtarın tam eşi hangisidir?", ["A", "B", "C", "Hiçbiri"], "B", "B anahtarı kırmızı anahtarla aynı renk, şekil ve büyüklüktedir.", visual("matching", "Anahtarın eşini bul", { items: [{ id: "Örnek", kind: "key", color: "red" }, { id: "A", kind: "key", color: "blue" }, { id: "B", kind: "key", color: "red" }, { id: "C", kind: "key-small", color: "red" }] })),
        q("Okulun kapısından giren çocuk önce ileri, sonra sağa dönüyor. Başlangıç yönüne göre son hareketi hangi yöndedir?", ["İleri", "Geri", "Sağ", "Sol"], "Sağ", "İkinci yönerge sağa dönmektir."),
        q("Kırmızı kutu mavi kutunun üstünde, sarı kutu kırmızının üstündedir. En alttaki kutu hangisidir?", ["Kırmızı", "Mavi", "Sarı", "Hepsi eşit"], "Mavi", "Sıralama üstten alta sarı, kırmızı, mavidir."),
        q("Görselde piyon 2 adım ileri, 1 adım sola, 1 adım ileri gidiyor. Kaç hareket yapmıştır?", ["2", "3", "4", "5"], "4", "İki ileri hareket ile bir sola ve bir ileri hareket toplam 4 harekettir.", visual("path", "Piyonun rotası", { steps: ["ileri", "ileri", "sol", "ileri"] })),
        q("İki oyuncak arabanın rengi ve boyu aynı, fakat birinin dört diğerinin üç tekeri vardır. Arabalar eş midir?", ["Evet, renkleri aynı", "Evet, boyları aynı", "Hayır, bütün özellikleri aynı değil", "Belli değil"], "Hayır, bütün özellikleri aynı değil", "Teker sayısı farklı olduğu için arabalar tam eş değildir."),
        q("Görselde kitap, kalem ile silginin arasında; silgi kitabın sağındadır. Kalem kitabın hangi tarafındadır?", ["Sağında", "Solunda", "Üstünde", "Arkasında"], "Solunda", "Kitap ortada ve silgi sağdaysa kalem soldadır.", visual("position", "Masa düzeni", { relation: "row", items: ["Kalem", "Kitap", "Silgi"] } ))
      ],
      zor: [
        q("Bir robot başlangıçtan iki adım ileri, bir adım sağa, bir adım geri gidiyor. Başlangıç noktasına göre robot nerede kalır?", ["Bir adım ileride ve sağda", "Bir adım geride", "Başlangıçta", "İki adım solda"], "Bir adım ileride ve sağda", "İki ileri ve bir geri hareket net bir adım ileri; ayrıca bir adım sağdır."),
        q("Görselde piyon A'dan B'ye ulaşmak için önce 2 ileri, sonra 2 sağa gidiyor. Piyon aynı yolu geri dönerken hangi yönergeleri izlemelidir?", ["2 ileri, 2 sağ", "2 sol, 2 geri", "2 sağ, 2 geri", "2 geri, 2 sol"], "2 sol, 2 geri", "Ters yolda hareketler ters yönde ve ters sıraya yakın uygulanır: sağın tersi sol, ilerinin tersi geridir.", visual("path", "Gidiş ve dönüş", { steps: ["ileri", "ileri", "sağ", "sağ"], target: "B" })),
        q("A kutusu B'nin sağında, C'nin solundadır. Kutular soldan sağa nasıl sıralanır?", ["A-B-C", "B-A-C", "C-A-B", "B-C-A"], "B-A-C", "A, B'nin sağında ve C'nin solunda olduğundan ortadadır."),
        q("Bir çift eldivenin biri ters çevrilmiş olsa da renk, şekil ve büyüklüğü aynıdır. Eldivenler için en uygun ifade hangisidir?", ["Eş değildir", "Eştir; yönü değişmiştir", "Biri daha büyüktür", "Biri daha ağırdır"], "Eştir; yönü değişmiştir", "Yön değişse de biçimsel özellikler aynı kaldığı için nesneler eştir."),
        q("Görselde dört karttan üçü aynı biçimsel özelliktedir. Farklı olan kart hangisidir?", ["A", "B", "C", "D"], "D", "D kartının şekli diğer üç karttan farklıdır.", visual("matching", "Farklı olanı bul", { items: [{ id: "A", kind: "star", color: "blue" }, { id: "B", kind: "star", color: "blue" }, { id: "C", kind: "star", color: "blue" }, { id: "D", kind: "circle", color: "blue" }] })),
        q("Kedi ağacın önünde, top kedinin arkasında ama ağacın önündedir. Ortada hangisi vardır?", ["Kedi", "Top", "Ağaç", "Hiçbiri"], "Top", "Sıralama kedi, top, ağaç biçimindedir; ortada top bulunur."),
        q("Bir labirent yönergesinde '3 ileri, 1 sol, 2 geri' yazıyor. Toplam kaç karelik hareket yapılır?", ["4", "5", "6", "7"], "6", "3 + 1 + 2 = 6 karelik hareket yapılır."),
        q("Görselde robot iki farklı rotadan aynı hedefe gidiyor. Kısa rota 4, uzun rota 6 adımdır. Kısa rota kaç adım daha azdır?", ["1", "2", "3", "4"], "2", "6 adımdan 4 adım çıkarılınca fark 2 olur.", visual("pathCompare", "İki rota", { first: 4, second: 6 })),
        q("Bir nesne kırmızı topun sağında, mavi küpün solundadır. Bu nesne iki oyuncağa göre nerededir?", ["İkisinin arasında", "İkisinin sağında", "İkisinin solunda", "İkisinin üstünde"], "İkisinin arasında", "Kırmızı topun sağında ve mavi küpün solunda olmak aralarında bulunmaktır."),
        q("Görselde örnek şeklin eşini bulmak için renk, şekil ve büyüklük birlikte inceleniyor. Hangi kart tam eştir?", ["A", "B", "C", "D"], "C", "Yalnız C kartı örnekle aynı renk, şekil ve büyüklüktedir.", visual("matching", "Üç ölçüte göre eş", { items: [{ id: "Örnek", kind: "triangle", color: "green", size: 2 }, { id: "A", kind: "triangle", color: "red", size: 2 }, { id: "B", kind: "circle", color: "green", size: 2 }, { id: "C", kind: "triangle", color: "green", size: 2 }, { id: "D", kind: "triangle", color: "green", size: 1 }] }))
      ]
    },

    "geometrik-sekiller": {
      kolay: [
        q("Sınıf panosundaki şeklin üç kenarı ve üç köşesi vardır. Bu şeklin adı nedir?", ["Üçgen", "Kare", "Dikdörtgen", "Çember"], "Üçgen", "Üç kenarlı ve üç köşeli şekil üçgendir."),
        q("Görseldeki şekillerden hangisinin köşesi yoktur?", ["A", "B", "C", "D"], "D", "D ile gösterilen çemberin köşesi yoktur.", visual("shapes", "Köşesi olmayanı bul", { items: ["triangle", "square", "rectangle", "circle"] })),
        q("Bir pencerenin karşılıklı kenarları eşit ve dört köşesi vardır. Pencere hangi şekle benzer?", ["Üçgen", "Dikdörtgen", "Çember", "Nokta"], "Dikdörtgen", "Pencere çoğunlukla dört köşeli bir dikdörtgene benzer."),
        q("Yuvarlanabilen bir top ile köşeli bir kutu karşılaştırılıyor. Hangisi yuvarlak bir nesnedir?", ["Top", "Kutu", "İkisi", "Hiçbiri"], "Top", "Topun yüzeyi yuvarlaktır ve yuvarlanabilir."),
        q("Görselde aynı tür şekiller eşleştiriliyor. Üçgenin eşi hangi harfle gösterilmiştir?", ["A", "B", "C", "D"], "B", "B şekli de üç kenarlı ve üç köşeli bir üçgendir.", visual("shapes", "Şeklin eşini bul", { sample: "triangle", items: ["circle", "triangle", "square", "rectangle"] })),
        q("Bir karenin kaç kenarı vardır?", ["2", "3", "4", "5"], "4", "Karenin dört kenarı vardır."),
        q("Saatin çevresini gösteren çizgi, köşesi olmayan hangi şekle benzer?", ["Üçgen", "Kare", "Dikdörtgen", "Çember"], "Çember", "Yuvarlak ve köşesiz çevre çizgisi çembere benzer."),
        q("Görselde bir ev resmi üçgen çatı ve kare gövdeden oluşuyor. Resimde kaç farklı şekil türü vardır?", ["1", "2", "3", "4"], "2", "Evde üçgen ve kare olmak üzere iki şekil türü vardır.", visual("shapeHouse", "Şekillerden ev", { roof: "triangle", body: "square" })),
        q("Dört kenarı ve dört köşesi olan uzun bir kapı hangi şekle daha çok benzer?", ["Üçgen", "Dikdörtgen", "Çember", "Küre"], "Dikdörtgen", "Uzun kapının biçimi dört kenarlı dikdörtgene benzer."),
        q("Görselde üçgen, kare, dikdörtgen ve çember var. Üç köşeli şekil hangisidir?", ["Üçgen", "Kare", "Dikdörtgen", "Çember"], "Üçgen", "Üçgenin üç köşesi vardır.", visual("shapes", "Köşe sayıları", { labeled: [{ label: "Üçgen", shape: "triangle" }, { label: "Kare", shape: "square" }, { label: "Dikdörtgen", shape: "rectangle" }, { label: "Çember", shape: "circle" }] }))
      ],
      orta: [
        q("Bir şeklin dört kenarı vardır ve bütün kenarları aynı uzunluktadır. Bu şekil hangisidir?", ["Üçgen", "Kare", "Dikdörtgen", "Çember"], "Kare", "Dört eş kenarlı şekil karedir."),
        q("Görseldeki yapı 2 üçgen, 1 kare ve 1 çemberden oluşuyor. Yapıda toplam kaç şekil vardır?", ["2", "3", "4", "5"], "4", "2 + 1 + 1 = 4 şekil vardır.", visual("shapeSet", "Şekil yapısı", { shapes: ["triangle", "triangle", "square", "circle"] })),
        q("Kare ile dikdörtgenin ortak özelliği hangisidir?", ["Köşeleri yoktur", "Üç kenarlıdır", "Dört kenar ve dört köşeleri vardır", "Yuvarlaktır"], "Dört kenar ve dört köşeleri vardır", "Her ikisinin de dört kenarı ve dört köşesi bulunur."),
        q("Üçgen, kare ve çember şekilleri köşe sayısına göre azdan çoğa sıralanırsa doğru sıra hangisidir?", ["Çember-üçgen-kare", "Üçgen-çember-kare", "Kare-üçgen-çember", "Çember-kare-üçgen"], "Çember-üçgen-kare", "Çember 0, üçgen 3, kare 4 köşelidir."),
        q("Görselde A şekli 4 eş kenarlı, B şekli 3 kenarlı, C şekli köşesizdir. A şeklinin adı nedir?", ["Üçgen", "Kare", "Dikdörtgen", "Çember"], "Kare", "Dört eş kenarlı A şekli karedir.", visual("shapes", "Özelliğine göre adlandır", { labeled: [{ label: "A", shape: "square" }, { label: "B", shape: "triangle" }, { label: "C", shape: "circle" }] })),
        q("Bir çocuk sadece köşeli şekilleri bir kutuya koyuyor. Hangisini bu kutuya koymamalıdır?", ["Kare", "Üçgen", "Dikdörtgen", "Çember"], "Çember", "Çemberin köşesi yoktur."),
        q("Bir resimde 3 kare pencere ve 2 üçgen çatı vardır. Hangi şekilden daha çok kullanılmıştır?", ["Üçgen", "Kare", "İkisi eşit", "Çember"], "Kare", "3 kare, 2 üçgenden daha fazladır."),
        q("Görselde şekiller kenar sayılarına göre iki gruba ayrılıyor. Üçgen hangi gruba gitmelidir?", ["Köşesizler", "3 kenarlılar", "4 kenarlılar", "Yuvarlaklar"], "3 kenarlılar", "Üçgenin üç kenarı vardır.", visual("shapeGroups", "Şekilleri grupla", { groups: [{ label: "3 kenar", shapes: ["triangle"] }, { label: "4 kenar", shapes: ["square", "rectangle"] }, { label: "Köşesiz", shapes: ["circle"] }] })),
        q("Bir kare döndürülüp köşesi aşağıya bakacak biçimde tutuluyor. Şeklin adı değişir mi?", ["Evet, üçgen olur", "Evet, çember olur", "Hayır, kare kalır", "Dikdörtgen olur"], "Hayır, kare kalır", "Şeklin yönü değişse de kenar ve köşe özellikleri değişmez."),
        q("Görselde bir robot 1 kare gövde, 2 dikdörtgen kol ve 1 çember baştan yapılmıştır. Kaç dört kenarlı şekil kullanılmıştır?", ["1", "2", "3", "4"], "3", "Bir kare ile iki dikdörtgen toplam 3 dört kenarlı şekildir.", visual("shapeRobot", "Şekillerden robot", { square: 1, rectangle: 2, circle: 1 } ))
      ],
      zor: [
        q("Bir şeklin köşe sayısı üçgenden fazla, çemberden fazladır ve dört kenarı vardır. Bu şekil hangisi olabilir?", ["Kare", "Üçgen", "Çember", "Nokta"], "Kare", "Kare dört kenarlı ve dört köşelidir."),
        q("Görseldeki örüntü üçgen, kare, kare biçiminde tekrar ediyor. İki boş yere sırayla hangi şekiller gelmelidir?", ["Üçgen-kare", "Kare-üçgen", "İki üçgen", "İki çember"], "Üçgen-kare", "Tekrar eden bölüm üçgen-kare-karedir; yeni bölüm üçgen-kare ile başlar.", visual("shapePattern", "Şekil örüntüsü", { shapes: ["triangle", "square", "square", "triangle", "square", "square", "?", "?"] })),
        q("Bir yapıda 2 üçgen ve bazı kareler vardır. Toplam 6 şeklin 4'ü köşeli karedir. Yapıda kaç kare vardır?", ["2", "3", "4", "6"], "4", "Soruda dört şeklin kare olduğu belirtilmiştir."),
        q("Dört kenarlı şekiller kutusunda 3 kare ve 2 dikdörtgen var. Kutudaki şekillerin toplam köşe sayısı kaçtır?", ["12", "16", "20", "24"], "20", "Beş şeklin her biri 4 köşelidir; 5 × 4 = 20 köşe."),
        q("Görselde A yapısında 2 üçgen, B yapısında 1 kare var. İki yapıdaki toplam kenar sayısı kaçtır?", ["7", "8", "9", "10"], "10", "İki üçgen 6, bir kare 4 kenardır; toplam 10.", visual("shapeSet", "Toplam kenarı bul", { labeled: [{ label: "A", shapes: ["triangle", "triangle"] }, { label: "B", shapes: ["square"] }] })),
        q("Bir şekil dört köşelidir ama tüm kenarlarının eşit olması gerekmiyor. Bu açıklamaya en uygun şekil hangisidir?", ["Dikdörtgen", "Üçgen", "Çember", "Nokta"], "Dikdörtgen", "Dikdörtgen dört köşelidir; kısa ve uzun kenarları olabilir."),
        q("Bir çocuk 2 kareyi yan yana birleştiriyor. Dış sınırda oluşan büyük şekil hangisine benzer?", ["Üçgen", "Dikdörtgen", "Çember", "Tek kare"], "Dikdörtgen", "İki eş kare yan yana gelince uzun bir dikdörtgen sınırı oluşur."),
        q("Görselde 2 kare, 3 üçgen ve 1 çember vardır. Köşesi olan şekillerin sayısı kaçtır?", ["4", "5", "6", "7"], "5", "Kareler ve üçgenler köşelidir: 2 + 3 = 5.", visual("shapeSet", "Köşeli şekilleri say", { shapes: ["square", "square", "triangle", "triangle", "triangle", "circle"] })),
        q("Bir geometrik yapıdaki şekillerin toplam 11 köşesi vardır. Yapıda bir kare ve bir üçgen varsa kalan şeklin kaç köşesi vardır?", ["0", "3", "4", "5"], "4", "Kare 4, üçgen 3 köşedir; 11 - 7 = 4 köşe kalır."),
        q("Görselde farklı yönlere çevrilmiş dört şekil var. Hangileri aynı şekil türüdür?", ["A ve B", "A ve C", "B ve D", "C ve D"], "A ve C", "A ve C'nin yönleri farklı olsa da ikisi de üçgendir.", visual("rotatedShapes", "Yön değişse de şekil aynı", { items: [{ id: "A", shape: "triangle", rotate: 0 }, { id: "B", shape: "square", rotate: 20 }, { id: "C", shape: "triangle", rotate: 180 }, { id: "D", shape: "circle", rotate: 0 }] }))
      ]
    },

    "veriye-dayali-arastirma": {
      kolay: [
        q("Sınıfta çocuklara en sevdikleri meyve soruluyor. Elma, muz ve çilek cevapları hangi tür bilgidir?", ["Renk", "Kategori", "Uzunluk", "Saat"], "Kategori", "Meyve türleri farklı kategoriler oluşturur."),
        q("Görseldeki nesne grafiğinde elma 5, muz 3 kez seçilmiştir. Daha çok seçilen meyve hangisidir?", ["Elma", "Muz", "İkisi eşit", "Armut"], "Elma", "5 elma simgesi, 3 muz simgesinden daha fazladır.", visual("chart", "Sevilen meyveler", { items: [{ label: "Elma", value: 5 }, { label: "Muz", value: 3 }] })),
        q("Öğretmen sınıftaki kalemleri renklerine göre ayırmak istiyor. Hangi soru bu araştırmaya uygundur?", ["Kalemler hangi renktir?", "Bugün hava nasıl?", "Saat kaç?", "Kapı kaç adım?"], "Kalemler hangi renktir?", "Araştırma sorusu kalemlerin renk kategorilerini öğrenmeye yöneliktir."),
        q("Bir çetelede her çizgi bir kitabı gösteriyor. Dört çizgi varsa kaç kitap kaydedilmiştir?", ["2", "3", "4", "5"], "4", "Her çizgi bir kitabı gösterdiği için dört çizgi dört kitaptır."),
        q("Görselde kırmızı 4, mavi 4, sarı 2 oy almıştır. Eşit oy alan renkler hangileridir?", ["Kırmızı ve mavi", "Mavi ve sarı", "Kırmızı ve sarı", "Üçü de"], "Kırmızı ve mavi", "Kırmızı ve mavi renklerin oyları dörderdir.", visual("chart", "Renk oyları", { items: [{ label: "Kırmızı", value: 4 }, { label: "Mavi", value: 4 }, { label: "Sarı", value: 2 }] })),
        q("Verileri karışık bırakmak yerine tabloya yazmanın yararı nedir?", ["Veriyi saklamak", "Veriyi düzenli görmek", "Sayıları yok etmek", "Soruyu değiştirmek"], "Veriyi düzenli görmek", "Tablo, toplanan bilgileri düzenli ve anlaşılır gösterir."),
        q("Bir grafikte kediyi seven 6, köpeği seven 8 çocuk vardır. En çok sevilen hayvan hangisidir?", ["Kedi", "Köpek", "İkisi eşit", "Kuş"], "Köpek", "8, 6'dan büyük olduğu için köpek daha çok seçilmiştir."),
        q("Görseldeki sıklık tablosunda kırmızı top 3, yeşil top 5 tanedir. Toplam kaç top kaydedilmiştir?", ["6", "7", "8", "9"], "8", "3 + 5 = 8 top vardır.", visual("chart", "Top renkleri", { items: [{ label: "Kırmızı", value: 3 }, { label: "Yeşil", value: 5 }] })),
        q("Bir araştırmada önce ne yapılmalıdır?", ["Cevabı uydurmak", "Araştırma sorusu belirlemek", "Grafiği silmek", "Sonucu değiştirmek"], "Araştırma sorusu belirlemek", "Veri toplamadan önce neyi öğrenmek istediğimizi belirlemeliyiz."),
        q("Görselde oyun tercihleri verilmiştir: saklambaç 5, seksek 2, ip atlama 4. En az seçilen oyun hangisidir?", ["Saklambaç", "Seksek", "İp atlama", "Hepsi eşit"], "Seksek", "En küçük sayı 2 olduğu için seksek en az seçilmiştir.", visual("chart", "Oyun tercihleri", { items: [{ label: "Saklambaç", value: 5 }, { label: "Seksek", value: 2 }, { label: "İp atlama", value: 4 }] }))
      ],
      orta: [
        q("Sınıfın kitap türü tercihlerini öğrenmek isteyen Elif, yalnız iki arkadaşına soruyor. Daha güvenilir sonuç için ne yapmalıdır?", ["Kimseye sormamalı", "Sınıftaki daha çok çocuğa sormalı", "Cevapları değiştirmeli", "Soruyu silmeli"], "Sınıftaki daha çok çocuğa sormalı", "Araştırılan gruptan daha çok kişiye sormak sınıfı daha iyi temsil eder."),
        q("Görseldeki grafikte masal 6, şiir 3, bilgi kitabı 5 kez seçilmiştir. Masal ile şiir arasındaki fark kaçtır?", ["2", "3", "4", "5"], "3", "6 - 3 = 3 seçim farkı vardır.", visual("chart", "Kitap türleri", { items: [{ label: "Masal", value: 6 }, { label: "Şiir", value: 3 }, { label: "Bilgi", value: 5 }] })),
        q("'Sınıfımızdaki çocukların en sevdiği mevsim hangisidir?' sorusunu cevaplamak için hangi veri toplanmalıdır?", ["Çocukların boyları", "Sevdikleri mevsimler", "Kalem renkleri", "Kitap sayıları"], "Sevdikleri mevsimler", "Araştırma sorusuyla doğrudan ilgili veri mevsim tercihleridir."),
        q("Çetele tablosunda elma için 7, armut için 5 çizgi vardır. İki meyve için toplam kaç çizgi kullanılmıştır?", ["10", "11", "12", "13"], "12", "7 + 5 = 12 çizgidir."),
        q("Görselde üç ulaşım tercihi vardır. Otobüs 7, yürüyüş 4, bisiklet 6 oy almıştır. Otobüs ve bisiklet toplam kaç oy almıştır?", ["11", "12", "13", "17"], "13", "7 + 6 = 13 oy eder.", visual("chart", "Okula ulaşım", { items: [{ label: "Otobüs", value: 7 }, { label: "Yürüyüş", value: 4 }, { label: "Bisiklet", value: 6 }] })),
        q("Aynı soru bugün ve yarın farklı çocuklara sorulursa sonuçların değişebilmesinin nedeni nedir?", ["Grafik bozulur", "Cevap veren kişiler değişir", "Sayılar kaybolur", "Sorunun harfleri değişir"], "Cevap veren kişiler değişir", "Farklı kişiler farklı tercihler bildirebilir."),
        q("Bir nesne grafiğinde her yıldız bir çocuğu gösteriyor. Mavi sütunda 8 yıldız, sarı sütunda 5 yıldız varsa mavi kaç fazla seçilmiştir?", ["2", "3", "4", "5"], "3", "8 - 5 = 3'tür."),
        q("Görselde pazartesi 4, salı 6, çarşamba 5 kitap okunmuştur. En çok kitap hangi gün okunmuştur?", ["Pazartesi", "Salı", "Çarşamba", "Her gün eşit"], "Salı", "En büyük değer 6 ve salı gününe aittir.", visual("chart", "Okunan kitaplar", { items: [{ label: "Pzt", value: 4 }, { label: "Salı", value: 6 }, { label: "Çrş", value: 5 }] })),
        q("Toplanan verilerin araştırma sorusuna cevap vermediği fark edilirse en doğru davranış hangisidir?", ["Sonucu uydurmak", "Uygun veriyi yeniden toplamak", "Tabloyu boş bırakmak", "Soruyu gizlemek"], "Uygun veriyi yeniden toplamak", "Araştırma sorusuyla ilgili ve doğru veri toplanmalıdır."),
        q("Görselde kedi 5, köpek 5, kuş 3 oy almıştır. 'Kedi en çok seçilmiştir.' yorumu neden eksiktir?", ["Kedi hiç seçilmedi", "Köpek de aynı sayıda seçildi", "Kuş daha çok seçildi", "Grafik yok"], "Köpek de aynı sayıda seçildi", "Kedi ve köpek beşer oyla en çok seçilen iki kategoridir.", visual("chart", "Evcil hayvan oyları", { items: [{ label: "Kedi", value: 5 }, { label: "Köpek", value: 5 }, { label: "Kuş", value: 3 }] }))
      ],
      zor: [
        q("Bir sınıfın oyun tercihi grafiğinde top oyunu 8, seksek 5, satranç 7 oy almıştır. Top oyunu ile satranç toplamı, seksekten kaç fazladır?", ["8", "9", "10", "15"], "10", "8 + 7 = 15; 15 - 5 = 10."),
        q("Görselde üç günün geri dönüşüm sayıları 6, 9 ve 7'dir. En çok olan günden en az olan günün sayısı çıkarılırsa sonuç kaçtır?", ["2", "3", "4", "5"], "3", "En çok 9, en az 6'dır; fark 3'tür.", visual("chart", "Geri dönüşüm kutuları", { items: [{ label: "Pzt", value: 6 }, { label: "Salı", value: 9 }, { label: "Çrş", value: 7 }] })),
        q("Bir araştırmada 18 çocuktan 7'si elma, 6'sı muz seçti. Kalan çocuklar çilek seçtiğine göre çileği kaç çocuk seçmiştir?", ["4", "5", "6", "7"], "5", "7 + 6 = 13; 18 - 13 = 5 çocuk çilek seçmiştir."),
        q("Bir grafiğe göre A kitabı 4, B kitabı 7 kez okunmuştur. A'nın B ile eşit olması için kaç kez daha okunması gerekir?", ["2", "3", "4", "5"], "3", "4'e 3 eklenince 7 olur."),
        q("Görseldeki çetelede A için 5, B için 8, C için 6 işaret vardır. A ve C birlikte B'den kaç fazladır?", ["2", "3", "4", "5"], "3", "5 + 6 = 11; 11 - 8 = 3.", visual("chart", "Çetele sonuçları", { items: [{ label: "A", value: 5 }, { label: "B", value: 8 }, { label: "C", value: 6 }] })),
        q("'Okulumuzdaki herkes hangi oyunu seviyor?' sorusu yalnız 1/A sınıfına sorulursa hangi sorun oluşur?", ["Soru çok kısa olur", "Tüm okulu temsil etmeyebilir", "Hiç veri oluşmaz", "Grafik çizilemez"], "Tüm okulu temsil etmeyebilir", "Yalnız bir sınıfın cevapları bütün okulun tercihini göstermeyebilir."),
        q("Bir nesne grafiğinde her resim 2 oy gösteriyor. Mavi için 4 resim varsa kaç oy vardır?", ["4", "6", "8", "10"], "8", "Her resim 2 oy ise 4 × 2 = 8 oy vardır."),
        q("Görselde her simge 2 kitabı gösteriyor. Masal için 3, şiir için 2 simge vardır. İki türde toplam kaç kitap vardır?", ["5", "8", "10", "12"], "10", "Masal 6, şiir 4 kitaptır; toplam 10.", visual("pictograph", "Her simge 2 kitap", { unit: 2, items: [{ label: "Masal", symbols: 3 }, { label: "Şiir", symbols: 2 }] })),
        q("Bir veri tablosunda kırmızı 6, mavi 9'dur. Sonradan 3 kırmızı seçim daha eklenirse hangi yorum doğru olur?", ["Mavi daha çok kalır", "Kırmızı daha çok olur", "İki renk eşit olur", "Toplam azalır"], "İki renk eşit olur", "6 + 3 = 9 olur; kırmızı ve mavi eşitlenir."),
        q("Görselde A 7, B 4, C 6 oy almıştır. En az seçilene 3 oy eklenirse yeni durumda en çok hangi kategoriler olur?", ["Yalnız A", "A ve B", "A ve C", "Yalnız C"], "A ve B", "B'nin oyu 4 + 3 = 7 olur; A da 7 oyla eşit en çoktur.", visual("chart", "Oylar değişirse", { items: [{ label: "A", value: 7 }, { label: "B", value: 4 }, { label: "C", value: 6 }] }))
      ]
    }
  };

  const topicNames = {
    "sayilar-ve-nicelikler": "Sayılar ve Nicelikler",
    "uzunluk-ve-kutle-olcme": "Uzunluk ve Kütle Ölçme",
    "paralarimiz": "Paralarımız",
    "toplama-ve-cikarma": "Toplama ve Çıkarma",
    "konum-ve-es-nesneler": "Konum ve Eş Nesneler",
    "geometrik-sekiller": "Geometrik Şekiller",
    "veriye-dayali-arastirma": "Veriye Dayalı Araştırma"
  };

  const tests = [];
  Object.keys(banks).forEach(function (topic) {
    difficulties.forEach(function (difficulty) {
      const slug = "1-sinif-matematik-" + topic + "-" + difficulty + "-test-1";
      const questions = banks[topic][difficulty].map(function (question, index) {
        question.id = index + 1;
        if (question.visual) {
          question.image = "images/tests/" + slug + "-soru-" + (index + 1) + ".svg";
          question.imageAlt = question.visual.title;
        }
        return question;
      });
      tests.push({
        classLevel: 1,
        subject: "matematik",
        subjectName: "Matematik",
        topic: topic,
        topicName: topicNames[topic],
        difficulty: difficulty,
        testNumber: 1,
        slug: slug,
        pageUrl: "tests/" + slug + ".html",
        questions: questions
      });
    });
  });

  window.TESTCOZ_TESTS = (window.TESTCOZ_TESTS || []).concat(tests);
})();
