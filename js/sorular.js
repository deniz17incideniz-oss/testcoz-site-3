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
