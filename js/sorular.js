/* ============================================================
   TestÇöz — SORU BANKASI

   NASIL SORU EKLERSİN?
   ============================================================

   Her soru şu formatta:
   {
     soru: "Soru metni buraya",
     secenekler: ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"],
     dogru: 0,          ← Doğru şıkkın index'i (0=A, 1=B, 2=C, 3=D)
     aciklama: "İsteğe bağlı açıklama metni"
   }

   KONU ID'Leri main.js dosyasından alınır.
   Format: SORULAR["sinif-ders-konu-zorluk"]

   Örnek: SORULAR["1-matematik-toplama-kolay"]
          SORULAR["3-matematik-carpma-orta"]
   ============================================================ */

const SORULAR = {

  /* ========================================================
     1. SINIF — MATEMATİK
  ======================================================== */

  "1-matematik-sayilar-kolay": [
    {
      soru: "Aşağıdaki sayılardan hangisi en büyüktür?",
      secenekler: ["15", "9", "21", "18"],
      dogru: 2,
      aciklama: "21 sayısı diğerlerinden büyüktür."
    },
    {
      soru: "5 sayısından önce hangi sayı gelir?",
      secenekler: ["6", "4", "7", "3"],
      dogru: 1,
      aciklama: "Sayı doğrusunda 5'ten önce 4 gelir."
    },
    {
      soru: "10'dan büyük, 15'ten küçük olan sayı hangisidir?",
      secenekler: ["9", "15", "12", "16"],
      dogru: 2,
      aciklama: "12, hem 10'dan büyük hem de 15'ten küçüktür."
    },
    {
      soru: "Hangi sayı 7 ile 9 arasındadır?",
      secenekler: ["6", "10", "8", "11"],
      dogru: 2,
      aciklama: "8, 7 ile 9 arasındaki tek tam sayıdır."
    },
    {
      soru: "Onluk ve 3 birlik kaç eder?",
      secenekler: ["30", "31", "13", "3"],
      dogru: 2,
      aciklama: "1 onluk = 10, 10 + 3 = 13."
    }
  ],

  "1-matematik-toplama-kolay": [
    {
      soru: "3 + 5 = ?",
      secenekler: ["7", "9", "8", "6"],
      dogru: 2,
      aciklama: "3 + 5 = 8"
    },
    {
      soru: "6 + 4 = ?",
      secenekler: ["9", "11", "10", "8"],
      dogru: 2,
      aciklama: "6 + 4 = 10"
    },
    {
      soru: "Ahmet'in 7 kalemi var. Annesi ona 3 kalem daha aldı. Şimdi kaç kalemi vardır?",
      secenekler: ["9", "11", "10", "4"],
      dogru: 2,
      aciklama: "7 + 3 = 10 kalem."
    },
    {
      soru: "2 + 9 = ?",
      secenekler: ["10", "12", "11", "13"],
      dogru: 2,
      aciklama: "2 + 9 = 11"
    },
    {
      soru: "□ + 4 = 9 ise □ kaçtır?",
      secenekler: ["4", "6", "5", "3"],
      dogru: 2,
      aciklama: "9 - 4 = 5, yani □ = 5."
    }
  ],

  "1-matematik-toplama-orta": [
    {
      soru: "14 + 23 = ?",
      secenekler: ["36", "38", "37", "39"],
      dogru: 2,
      aciklama: "14 + 23 = 37"
    },
    {
      soru: "35 + 40 = ?",
      secenekler: ["70", "80", "75", "65"],
      dogru: 2,
      aciklama: "35 + 40 = 75"
    },
    {
      soru: "Bir sınıfta 18 kız, 15 erkek öğrenci var. Toplam kaç öğrenci vardır?",
      secenekler: ["31", "35", "33", "34"],
      dogru: 2,
      aciklama: "18 + 15 = 33 öğrenci."
    },
    {
      soru: "27 + 36 = ?",
      secenekler: ["61", "65", "63", "62"],
      dogru: 2,
      aciklama: "27 + 36 = 63"
    },
    {
      soru: "49 + 21 = ?",
      secenekler: ["69", "71", "70", "68"],
      dogru: 2,
      aciklama: "49 + 21 = 70"
    }
  ],

  "1-matematik-cikarma-kolay": [
    {
      soru: "9 - 4 = ?",
      secenekler: ["4", "6", "5", "3"],
      dogru: 2,
      aciklama: "9 - 4 = 5"
    },
    {
      soru: "10 - 7 = ?",
      secenekler: ["2", "4", "3", "5"],
      dogru: 2,
      aciklama: "10 - 7 = 3"
    },
    {
      soru: "Zeynep'in 8 çikolatası vardı. 3 tanesini arkadaşına verdi. Kaç çikolatası kaldı?",
      secenekler: ["4", "6", "5", "3"],
      dogru: 2,
      aciklama: "8 - 3 = 5 çikolata."
    },
    {
      soru: "7 - 0 = ?",
      secenekler: ["0", "1", "7", "6"],
      dogru: 2,
      aciklama: "Bir sayıdan 0 çıkarılırsa sonuç değişmez: 7 - 0 = 7."
    },
    {
      soru: "12 - 5 = ?",
      secenekler: ["6", "8", "7", "9"],
      dogru: 2,
      aciklama: "12 - 5 = 7"
    }
  ],

  /* ========================================================
     2. SINIF — MATEMATİK
  ======================================================== */

  "2-matematik-carpma-kolay": [
    {
      soru: "2 × 3 = ?",
      secenekler: ["5", "8", "6", "4"],
      dogru: 2,
      aciklama: "2 × 3 = 6"
    },
    {
      soru: "4 × 2 = ?",
      secenekler: ["6", "10", "8", "12"],
      dogru: 2,
      aciklama: "4 × 2 = 8"
    },
    {
      soru: "5 × 3 = ?",
      secenekler: ["10", "20", "15", "12"],
      dogru: 2,
      aciklama: "5 × 3 = 15"
    },
    {
      soru: "3 × 3 = ?",
      secenekler: ["6", "12", "9", "8"],
      dogru: 2,
      aciklama: "3 × 3 = 9"
    },
    {
      soru: "Bir kutuda 4 kalem var. 2 kutu kalemde kaç kalem vardır?",
      secenekler: ["6", "10", "8", "12"],
      dogru: 2,
      aciklama: "4 × 2 = 8 kalem."
    }
  ],

  "2-matematik-toplama-orta": [
    {
      soru: "125 + 234 = ?",
      secenekler: ["350", "370", "359", "360"],
      dogru: 2,
      aciklama: "125 + 234 = 359"
    },
    {
      soru: "247 + 138 = ?",
      secenekler: ["375", "395", "385", "365"],
      dogru: 2,
      aciklama: "247 + 138 = 385"
    },
    {
      soru: "300 + 150 = ?",
      secenekler: ["400", "500", "450", "350"],
      dogru: 2,
      aciklama: "300 + 150 = 450"
    }
  ],

  /* ========================================================
     3. SINIF — MATEMATİK
  ======================================================== */

  "3-matematik-carpma-kolay": [
    {
      soru: "6 × 7 = ?",
      secenekler: ["40", "48", "42", "36"],
      dogru: 2,
      aciklama: "6 × 7 = 42"
    },
    {
      soru: "8 × 4 = ?",
      secenekler: ["28", "36", "32", "24"],
      dogru: 2,
      aciklama: "8 × 4 = 32"
    },
    {
      soru: "9 × 3 = ?",
      secenekler: ["24", "30", "27", "21"],
      dogru: 2,
      aciklama: "9 × 3 = 27"
    },
    {
      soru: "7 × 8 = ?",
      secenekler: ["54", "63", "56", "48"],
      dogru: 2,
      aciklama: "7 × 8 = 56"
    },
    {
      soru: "6 × 6 = ?",
      secenekler: ["30", "40", "36", "42"],
      dogru: 2,
      aciklama: "6 × 6 = 36"
    }
  ],

  "3-matematik-carpma-orta": [
    {
      soru: "12 × 4 = ?",
      secenekler: ["44", "52", "48", "56"],
      dogru: 2,
      aciklama: "12 × 4 = 48"
    },
    {
      soru: "15 × 3 = ?",
      secenekler: ["40", "50", "45", "35"],
      dogru: 2,
      aciklama: "15 × 3 = 45"
    },
    {
      soru: "Bir sınıfta 6 sıra var. Her sırada 4 öğrenci oturuyor. Sınıfta kaç öğrenci vardır?",
      secenekler: ["20", "28", "24", "18"],
      dogru: 2,
      aciklama: "6 × 4 = 24 öğrenci."
    },
    {
      soru: "25 × 2 = ?",
      secenekler: ["40", "60", "50", "45"],
      dogru: 2,
      aciklama: "25 × 2 = 50"
    },
    {
      soru: "11 × 6 = ?",
      secenekler: ["60", "72", "66", "64"],
      dogru: 2,
      aciklama: "11 × 6 = 66"
    }
  ],

  "3-matematik-carpma-zor": [
    {
      soru: "34 × 3 = ?",
      secenekler: ["99", "105", "102", "96"],
      dogru: 2,
      aciklama: "34 × 3 = 102"
    },
    {
      soru: "27 × 4 = ?",
      secenekler: ["100", "112", "108", "104"],
      dogru: 2,
      aciklama: "27 × 4 = 108"
    },
    {
      soru: "Bir çiftçinin 5 tarlası var. Her tarlada 48 ağaç bulunuyor. Toplam kaç ağaç vardır?",
      secenekler: ["220", "250", "240", "230"],
      dogru: 2,
      aciklama: "5 × 48 = 240 ağaç."
    }
  ],

  "3-matematik-bolme-kolay": [
    {
      soru: "12 ÷ 3 = ?",
      secenekler: ["3", "5", "4", "6"],
      dogru: 2,
      aciklama: "12 ÷ 3 = 4"
    },
    {
      soru: "20 ÷ 4 = ?",
      secenekler: ["4", "6", "5", "3"],
      dogru: 2,
      aciklama: "20 ÷ 4 = 5"
    },
    {
      soru: "18 ÷ 2 = ?",
      secenekler: ["8", "10", "9", "7"],
      dogru: 2,
      aciklama: "18 ÷ 2 = 9"
    },
    {
      soru: "15 elma 3 çocuğa eşit paylaştırılıyor. Her çocuğa kaç elma düşer?",
      secenekler: ["4", "6", "5", "3"],
      dogru: 2,
      aciklama: "15 ÷ 3 = 5 elma."
    },
    {
      soru: "24 ÷ 6 = ?",
      secenekler: ["3", "5", "4", "6"],
      dogru: 2,
      aciklama: "24 ÷ 6 = 4"
    }
  ],

  /* ========================================================
     4. SINIF — MATEMATİK
  ======================================================== */


  /* ========================================================
     4. SINIF - MATEMATIK - DOGAL SAYILAR (ZOR)
  ======================================================== */

  "4-matematik-dogal-sayilar-zor": [
    {
      soru: "Sayi yuvarlama kurallarina gore asagidaki ifaleri inceleyiniz:\n\nI. 74.582 sayisi en yakin yuzluge yuvarlandiginda 74.600 olur.\nII. 36.995 sayisi en yakin onluga yuvarlandiginda 37.000 olur.\nIII. 85.450 sayisi en yakin yuzluge yuvarlandiginda 85.400 olur.\n\nBu ifadelerden hangileri dogrudir?",
      secenekler: ["I ve III", "Yalniz III", "II ve III", "I ve II"],
      dogru: 3,
      aciklama: "I. dogru: 74.582 yuzluge 74.600. II. dogru: 36.995 onluga 37.000. III. yanlis: 85.450 yuzluge 85.500 olur (400 degil)."
    },
    {
      soru: "Bir bilgisayar oyununda birinci oyuncu 45.680, ikinci oyuncu 45.805 puan almistir. Ucuncu oyuncunun puani birinci oyuncudan fazla, ikinci oyuncudan azdir ve yuzler basamaginda 7 rakami bulunmaktadir.\n\nBuna gore ucuncu oyuncunun puani asagidakilerden hangisi olabilir?",
      secenekler: ["45.675", "45.725", "45.870", "46.710"],
      dogru: 1,
      aciklama: "45.680 < x < 45.805 ve yuzler basamagi = 7 olmali. 45.725: yuzler=7, aralikta. Diger secenekler aralik disinda veya yuzler 7 degil."
    },
    {
      soru: "Dort ilcenin nufuslari sunlardur:\nCamlica: 125.480 - Kavakli: 125.540 - Sogutlu: 125.449 - Meseli: 125.610\n\nBu tabloya gore asagidaki ifadelerden hangisi dogrudir?",
      secenekler: ["Nufusu en az olan ilce Kavakli, en fazla olan ilce ise Meseli olarak kayit altina alinmistir.", "Camlica ve Kavakli ilcelerinin nufuslari en yakin yuzluge yuvarlandiginda ayni sayi elde edilir.", "Sogutlu ilcesinin nufusu en yakin yuzluge yuvarlandiginda yuz yirmi bes bin bes yuz elde edilir.", "Ilcelerin nufuslari buyukten kucuge dogru siralandiginda Camlica ilcesi ikinci sirada yer alir."],
      dogru: 1,
      aciklama: "Camlica 125.480 yuzluge 125.500. Kavakli 125.540 yuzluge 125.500. Ikisi de 125.500 olur."
    },
    {
      soru: "Bir cevre koruma projesinde toplanan atik pil sayisi 345.678 adettir. Bu sayi icin asagidaki ifadeler verilmistir:\n\nI. Binler bolugundeki rakamlarin toplami 12'dir.\nII. On binler basamagindaki rakamin basamak degeri 40.000'dir.\nIII. Onlar basamagindaki rakamin basamak degeri 7'dir.\n\nBu ifadelerden hangileri dogrudir?",
      secenekler: ["Yalniz I", "I ve II", "I ve III", "II ve III"],
      dogru: 1,
      aciklama: "345.678: I. Binler bolugu = 345, 3+4+5=12. II. On binler = 4, deger = 40.000. III. Onlar = 7, deger = 70 (7 degil). I ve II dogru."
    },
    {
      soru: "Bir banka kasasinin sifresi 805.042'dir. Sifrenin basamak degerleriyle ilgili su ifadeler verilmistir:\n\nI. 8 yuz binlik + 5 binlik + 4 onluk + 2 birlik\nII. Yuz binler basamaginin degeri 800.000'dir.\nIII. Binler bolugundeki sayi 85'tir.\n\nBu ifadelerden hangileri dogrudir?",
      secenekler: ["Yalniz II", "I ve II", "I ve III", "II ve III"],
      dogru: 1,
      aciklama: "805.042: I. 800.000+5.000+40+2=805.042. II. Yuz binler=8, degeri=800.000. III. Binler bolugu=805 (85 degil). I ve II dogru."
    },
    {
      soru: "Bir araba fabrikasinin aylik uretimi:\nOcak: 102.450 - Subat: 120.054 - Mart: 102.540 - Nisan: 120.504\n\nBu tabloya gore asagidakilerden hangisi dogrudir?",
      secenekler: ["Mart ayindaki sayinin on binler basamagindaki rakam 0'dir.", "Nisan ayindaki sayinin birler bolugundeki sayi 54'tur.", "Ocak ayindaki sayinin binler bolugunde 12 vardir.", "Subat ayindaki sayinin yuzler basamagindaki rakamin degeri 500'dur."],
      dogru: 0,
      aciklama: "Mart 102.540: on binler basamagi = 0. Dogru cevap A."
    },
    {
      soru: "Bir roketin Dunya'dan uzakligi 408.092 kilometredir. Bu uzaklik icin asagidaki ifadeler verilmistir:\n\nI. Binler bolugundeki sayi 408'dir.\nII. Yuzler basamagindaki rakam 9'dur.\nIII. Sayinin okunusu 'dort yuz sekiz bin doksan iki' seklindedir.\n\nHangileri dogrudir?",
      secenekler: ["I ve III", "Yalniz I", "II ve III", "I ve II"],
      dogru: 0,
      aciklama: "408.092: I. Binler bolugu=408. III. Okunusu: dort yuz sekiz bin doksan iki. I ve III dogru. Yuzler basama=0 (9 degil)."
    },
    {
      soru: "Dort ilcenin nufuslari:\nKemer: 145.087 - Cinar: 140.578 - Ova: 104.785 - Tepe: 154.078\n\nBu tabloya gore nufuslarla ilgili asagidakilerden hangisi YANLISTIR?",
      secenekler: ["Kemer ilcesinin binler bolugundeki sayi 145'tir.", "Cinar ilcesinin yuzler basamagindaki rakam 5'tir.", "Ova ilcesinin on binler basamagindaki rakamin basamak degeri 40.000'dir.", "Tepe ilcesinin birler bolugundeki sayi 78'dir."],
      dogru: 2,
      aciklama: "Ova: 104.785, on binler basamagi = 0, degeri = 0 (40.000 degil). C yanlisir."
    },
    {
      soru: "Bir ciftci deposundaki bugday miktarini 5 yuz binlik, 7 binlik, 4 onluk ve 8 birlik olarak kaydetmistir.\n\nI. Ciftcinin kaydettigi sayi 507.048'dir.\nII. Bu sayinin binler bolugunde 507 rakamlari bulunur.\nIII. On binler basamagindaki rakamin degeri 70.000'dir.\n\nBu ifadelerden hangileri dogrudir?",
      secenekler: ["I ve III", "Yalniz I", "I ve II", "II ve III"],
      dogru: 2,
      aciklama: "500.000+7.000+40+8=507.048: I. Dogru. Binler bolugu=507: II. Dogru. On binler=0, degeri=0: III. Yanlis. I ve II dogru."
    },
    {
      soru: "Bir muzeyi yil boyunca ziyaret eden kisi sayisi 'iki yuz uc bin on bes' olarak aciklanmistir. Buna gore, ziyaretci sayisini gosteren sayinin binler bolugundeki sayi ile birler bolugundeki sayinin toplami kacdir?",
      secenekler: ["218", "233", "353", "408"],
      dogru: 0,
      aciklama: "Iki yuz uc bin on bes = 203.015. Binler bolugu = 203, birler bolugu = 15. Toplam = 203 + 15 = 218."
    }
  ],

  "4-matematik-dortislem-orta": [
    {
      soru: "120 ÷ 4 + 15 = ?",
      secenekler: ["40", "50", "45", "55"],
      dogru: 2,
      aciklama: "120 ÷ 4 = 30, 30 + 15 = 45"
    },
    {
      soru: "8 × 7 - 16 = ?",
      secenekler: ["38", "44", "40", "46"],
      dogru: 2,
      aciklama: "8 × 7 = 56, 56 - 16 = 40"
    },
    {
      soru: "3 × (12 + 8) = ?",
      secenekler: ["50", "70", "60", "44"],
      dogru: 2,
      aciklama: "12 + 8 = 20, 3 × 20 = 60"
    },
    {
      soru: "144 ÷ 12 = ?",
      secenekler: ["10", "14", "12", "16"],
      dogru: 2,
      aciklama: "144 ÷ 12 = 12"
    },
    {
      soru: "Bir kitap 48 sayfadır. Ali her gün 6 sayfa okursa kitabı kaç günde bitirir?",
      secenekler: ["6", "10", "8", "9"],
      dogru: 2,
      aciklama: "48 ÷ 6 = 8 gün."
    }
  ],

  "4-matematik-kesirler-orta": [
    {
      soru: "1/2 + 1/2 = ?",
      secenekler: ["1/4", "1/3", "1", "2"],
      dogru: 2,
      aciklama: "Aynı paydali kesirler toplanırken paylar toplanır: 1+1 = 2, 2/2 = 1."
    },
    {
      soru: "Hangi kesir 1/2'ye eşittir?",
      secenekler: ["1/4", "3/8", "2/4", "2/3"],
      dogru: 2,
      aciklama: "2/4 = 1/2 (pay ve payda 2'ye bölünür)."
    },
    {
      soru: "3/4 - 1/4 = ?",
      secenekler: ["1/4", "3/4", "2/4", "1"],
      dogru: 2,
      aciklama: "Aynı paydali kesirler çıkarılırken paylar çıkarılır: 3-1 = 2, sonuç 2/4."
    },
    {
      soru: "Bir pizzanın 3/8'i yendi. Geriye kaçta kaçı kaldı?",
      secenekler: ["3/8", "5/8", "4/8", "2/8"],
      dogru: 1,
      aciklama: "8/8 - 3/8 = 5/8 kaldı."
    },
    {
      soru: "Aşağıdaki kesirlerden hangisi en büyüktür?",
      secenekler: ["1/4", "1/3", "1/2", "1/6"],
      dogru: 2,
      aciklama: "Paylar eşit olduğunda payda küçüldükçe kesir büyür. 1/2 en büyüktür."
    }
  ]

  /* ========================================================
     BURAYA YENİ SORULAR EKLEYEBİLİRSİNİZ

     Yeni konu eklemek için format:

     "SINIF-DERS-KONU-ZORLUK": [
       {
         soru: "Soru metni",
         secenekler: ["A", "B", "C", "D"],
         dogru: 0,
         aciklama: "Açıklama"
       }
     ]

     Örnek yeni konu:
     "1-turkce-sesler-kolay": [
       { soru: "...", secenekler: [...], dogru: 0, aciklama: "..." }
     ]
  ======================================================== */

};
