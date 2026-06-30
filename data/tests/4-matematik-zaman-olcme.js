/* 4. sınıf Matematik / Zaman Ölçme örnek testleri.
   correctAnswer, choices dizisindeki doğru seçeneğin sıfır tabanlı indeksidir. */
(function () {
  const tests = [
    {
      classLevel: 4,
      subject: "matematik",
      topic: "zaman-olcme",
      difficulty: "kolay",
      testNumber: 1,
      pageUrl: "tests/4-sinif-matematik-zaman-olcme-kolay-test-1.html",
      questions: [
        { question: "1 saat kaç dakikadır?", choices: ["30 dakika", "45 dakika", "60 dakika", "100 dakika"], correctAnswer: 2, explanation: "Bir saat 60 dakikadır.", image: null },
        { question: "2 saat kaç dakikadır?", choices: ["90 dakika", "120 dakika", "150 dakika", "200 dakika"], correctAnswer: 1, explanation: "2 × 60 = 120 dakikadır.", image: null },
        { question: "Yarım saat kaç dakikadır?", choices: ["15 dakika", "20 dakika", "30 dakika", "45 dakika"], correctAnswer: 2, explanation: "60 dakikanın yarısı 30 dakikadır.", image: null },
        { question: "Çeyrek saat kaç dakikadır?", choices: ["10 dakika", "15 dakika", "20 dakika", "25 dakika"], correctAnswer: 1, explanation: "60 dakikanın dörtte biri 15 dakikadır.", image: null },
        { question: "90 dakika aşağıdakilerden hangisine eşittir?", choices: ["1 saat", "1 saat 15 dakika", "1 saat 30 dakika", "2 saat"], correctAnswer: 2, explanation: "90 dakika = 60 dakika + 30 dakika = 1 saat 30 dakikadır.", image: null },
        { question: "1 gün kaç saattir?", choices: ["12 saat", "20 saat", "24 saat", "30 saat"], correctAnswer: 2, explanation: "Bir gün 24 saattir.", image: null },
        { question: "1 hafta kaç gündür?", choices: ["5 gün", "6 gün", "7 gün", "10 gün"], correctAnswer: 2, explanation: "Bir hafta 7 gündür.", image: null },
        { question: "Saat 10.00'da başlayan bir etkinlik 3 saat 15 dakika sürüyor. Etkinlik saat kaçta biter?", choices: ["12.15", "13.00", "13.15", "14.15"], correctAnswer: 2, explanation: "10.00'a 3 saat 15 dakika eklenince 13.15 olur.", image: null },
        { question: "14.00 ile 15.30 arasında kaç dakika vardır?", choices: ["60 dakika", "75 dakika", "90 dakika", "120 dakika"], correctAnswer: 2, explanation: "14.00-15.00 arası 60, 15.00-15.30 arası 30 dakikadır. Toplam 90 dakikadır.", image: null },
        { question: "2 gün kaç saattir?", choices: ["24 saat", "36 saat", "48 saat", "72 saat"], correctAnswer: 2, explanation: "2 × 24 = 48 saattir.", image: null }
      ]
    },
    {
      classLevel: 4,
      subject: "matematik",
      topic: "zaman-olcme",
      difficulty: "orta",
      testNumber: 1,
      pageUrl: "tests/4-sinif-matematik-zaman-olcme-orta-test-1.html",
      questions: [
        { question: "2 saat 35 dakika toplam kaç dakikadır?", choices: ["125", "145", "155", "165"], correctAnswer: 2, explanation: "2 saat 120 dakikadır. 120 + 35 = 155 dakikadır.", image: null },
        { question: "185 dakika kaç saat kaç dakikadır?", choices: ["2 saat 55 dakika", "3 saat 5 dakika", "3 saat 15 dakika", "3 saat 25 dakika"], correctAnswer: 1, explanation: "185 dakikadan 180 dakika, yani 3 saat çıkarılırsa 5 dakika kalır.", image: null },
        { question: "Bir gezi 08.45'te başlayıp 1 saat 35 dakika sürüyor. Gezi saat kaçta biter?", choices: ["10.10", "10.20", "10.30", "11.20"], correctAnswer: 1, explanation: "08.45'e 1 saat eklenince 09.45, 35 dakika eklenince 10.20 olur.", image: null },
        { question: "13.20'de başlayan bir ders 15.05'te bitiyor. Ders ne kadar sürmüştür?", choices: ["1 saat 35 dakika", "1 saat 40 dakika", "1 saat 45 dakika", "2 saat 15 dakika"], correctAnswer: 2, explanation: "13.20'den 14.20'ye 1 saat, 14.20'den 15.05'e 45 dakika geçer.", image: null },
        { question: "3 hafta 4 gün toplam kaç gündür?", choices: ["21 gün", "24 gün", "25 gün", "28 gün"], correctAnswer: 2, explanation: "3 hafta 21 gündür. 21 + 4 = 25 gündür.", image: null },
        { question: "2 yıl 6 ay toplam kaç aydır?", choices: ["26 ay", "28 ay", "30 ay", "32 ay"], correctAnswer: 2, explanation: "2 yıl 24 aydır. 24 + 6 = 30 aydır.", image: null },
        { question: "1 gün 6 saat toplam kaç saattir?", choices: ["24 saat", "26 saat", "30 saat", "36 saat"], correctAnswer: 2, explanation: "1 gün 24 saattir. 24 + 6 = 30 saattir.", image: null },
        { question: "5400 saniye aşağıdakilerden hangisine eşittir?", choices: ["45 dakika", "60 dakika", "1 saat 15 dakika", "1 saat 30 dakika"], correctAnswer: 3, explanation: "5400 ÷ 60 = 90 dakika; 90 dakika da 1 saat 30 dakikadır.", image: null },
        { question: "18.50'de başlayan bir film 20.25'te bitiyor. Film kaç dakika sürmüştür?", choices: ["85 dakika", "90 dakika", "95 dakika", "105 dakika"], correctAnswer: 2, explanation: "18.50-19.50 arası 60, 19.50-20.25 arası 35 dakikadır. Toplam 95 dakikadır.", image: null },
        { question: "Dört dersin her biri 40 dakika, aradaki üç teneffüsün her biri 10 dakikadır. İlk dersin başlangıcından son dersin bitimine kadar kaç dakika geçer?", choices: ["160 dakika", "180 dakika", "190 dakika", "200 dakika"], correctAnswer: 2, explanation: "Dersler 4 × 40 = 160, teneffüsler 3 × 10 = 30 dakikadır. Toplam 190 dakikadır.", image: null }
      ]
    },
    {
      classLevel: 4,
      subject: "matematik",
      topic: "zaman-olcme",
      difficulty: "zor",
      testNumber: 1,
      pageUrl: "tests/4-sinif-matematik-zaman-olcme-zor-test-1.html",
      questions: [
        { question: "2 gün 7 saate 19 saat eklenirse sonuç kaç gün kaç saat olur?", choices: ["2 gün 26 saat", "3 gün 1 saat", "3 gün 2 saat", "3 gün 7 saat"], correctAnswer: 2, explanation: "2 gün 7 saat = 55 saattir. 55 + 19 = 74 saat = 3 gün 2 saattir.", image: null },
        { question: "3 hafta 2 günden 10 gün çıkarılırsa kaç gün kalır?", choices: ["11 gün", "12 gün", "13 gün", "15 gün"], correctAnswer: 2, explanation: "3 hafta 2 gün = 23 gündür. 23 - 10 = 13 gündür.", image: null },
        { question: "2 saat 45 dakika ile 1 saat 38 dakikanın toplamı kaçtır?", choices: ["3 saat 73 dakika", "4 saat 13 dakika", "4 saat 23 dakika", "4 saat 33 dakika"], correctAnswer: 2, explanation: "45 + 38 = 83 dakika = 1 saat 23 dakikadır. Saatlerle birlikte toplam 4 saat 23 dakikadır.", image: null },
        { question: "05.50'de yola çıkan bir araç 3 saat 25 dakika sonra varıyor. Varış saati kaçtır?", choices: ["08.15", "08.25", "09.05", "09.15"], correctAnswer: 3, explanation: "05.50'ye 3 saat eklenince 08.50, 25 dakika eklenince 09.15 olur.", image: null },
        { question: "1 yıl 3 ay ile 18 ayın toplamı kaç yıl kaç aydır?", choices: ["2 yıl 3 ay", "2 yıl 6 ay", "2 yıl 9 ay", "3 yıl 1 ay"], correctAnswer: 2, explanation: "1 yıl 3 ay = 15 aydır. 15 + 18 = 33 ay = 2 yıl 9 aydır.", image: null },
        { question: "Bir otobüs 12.00'de yola çıkıp ertesi gün 02.35'te varıyor. Yolculuk ne kadar sürmüştür?", choices: ["12 saat 35 dakika", "13 saat 35 dakika", "14 saat 25 dakika", "14 saat 35 dakika"], correctAnswer: 3, explanation: "12.00'dan 24.00'a 12 saat, 00.00'dan 02.35'e 2 saat 35 dakika geçer. Toplam 14 saat 35 dakikadır.", image: null },
        { question: "4 saat 10 dakikadan 165 dakika çıkarılırsa ne kalır?", choices: ["1 saat 15 dakika", "1 saat 25 dakika", "1 saat 35 dakika", "2 saat 5 dakika"], correctAnswer: 1, explanation: "4 saat 10 dakika = 250 dakikadır. 250 - 165 = 85 dakika = 1 saat 25 dakikadır.", image: null },
        { question: "Bir saat her gün 5 dakika ileri gidiyor. Pazartesi 08.00'de doğru ayarlanan saat, perşembe 08.00'de kaçı gösterir?", choices: ["08.05", "08.10", "08.15", "08.20"], correctAnswer: 2, explanation: "Pazartesi 08.00'den perşembe 08.00'e 3 gün geçer. Saat 3 × 5 = 15 dakika ileri gider ve 08.15'i gösterir.", image: null },
        { question: "Bir yarışın ilk etabı 1 saat 48 dakika, ikinci etabı 2 saat 37 dakika sürüyor. İki etap arasında 25 dakika mola veriliyor. Yarışmacı başlangıçtan bitişe kadar toplam ne kadar zaman geçirir?", choices: ["4 saat 25 dakika", "4 saat 40 dakika", "4 saat 50 dakika", "5 saat"], correctAnswer: 2, explanation: "1.48 + 2.37 = 4 saat 25 dakikadır. 25 dakikalık mola eklenince 4 saat 50 dakika olur.", image: null },
        { question: "23.35'te hareket eden trenin yolculuğu 2 saat 50 dakika sürüyor. Tren hangi gün ve saatte varır?", choices: ["Aynı gün 01.25", "Ertesi gün 01.25", "Ertesi gün 02.15", "Ertesi gün 02.25"], correctAnswer: 3, explanation: "23.35'e 25 dakika eklenince ertesi gün 00.00 olur; kalan 2 saat 25 dakika sonunda saat 02.25'tir.", image: null }
      ]
    }
  ];

  window.TESTCOZ_TESTS = (window.TESTCOZ_TESTS || []).concat(tests);
})();
