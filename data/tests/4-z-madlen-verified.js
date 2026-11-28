// Madlen'in dört seçenekli örneği bağımsız olarak hesaplanıp grafikle düzenlendi.
(function () {
  const test = (window.TESTCOZ_TESTS || []).find(item => item.classLevel === 4 && item.subject === 'matematik' && item.topic === 'veri' && item.difficulty === 'zor' && item.testNumber === 1);
  if (!test) return;
  const question = test.questions[8];
  const choices = ['Yalnız II', 'I ve II', 'II ve III', 'I, II ve III'];
  Object.assign(question, {
    question: 'Bir okulda 4-A ve 4-B sınıflarının bir haftada kütüphaneden ödünç aldığı kitap türleri grafikte gösterilmiştir.\n\nI. İki sınıfın ödünç aldığı toplam şiir kitabı sayısı 20’dir.\nII. 4-A’nın masal kitabı sayısı, 4-B’ninkinden 8 fazladır.\nIII. 4-B’nin toplam kitap sayısı, 4-A’nın toplamından 4 fazladır.\n\nGrafiğe göre hangi ifadeler doğrudur?',
    choices, options: choices.slice(), correctAnswer: 3,
    explanation: 'Her kare 4 kitabı gösterir. I: Şiir kitapları (2 + 3) × 4 = 20’dir. II: Masal farkı (5 − 3) × 4 = 8’dir. III: 4-A toplam 10 × 4 = 40, 4-B toplam 11 × 4 = 44 kitap almıştır; fark 4’tür. Üç ifade de doğrudur.',
    visual: { type: 'pairedPictograph', title: 'Ödünç alınan kitaplar', data: {unit:4, groups:[{label:'4-A', items:[{label:'Masal',count:5},{label:'Bilim',count:3},{label:'Şiir',count:2}]},{label:'4-B', items:[{label:'Masal',count:3},{label:'Bilim',count:5},{label:'Şiir',count:3}]}]} },
    imageAlt: 'Her kare 4 kitabı gösterir. 4-A: masal 5 kare, bilim 3 kare, şiir 2 kare. 4-B: masal 3 kare, bilim 5 kare, şiir 3 kare.',
    questionType: 'gorsel-okuma', subSkill: 'Şekil grafiğini yorumlama'
  });
  // Okuma ve bağış hedefi aynı şey olmadığından senaryoyu okuma hedefi olarak netleştir.
  const readingQuestion = test.questions[9];
  const readingChoices = ['3', '4', '6', '2'];
  Object.assign(readingQuestion, {
    question: '4-A ve 4-B sınıfları birlikte 100 kitap okuma hedefi belirledi. Grafik, bu sınıfların şimdiye kadar okuduğu kitap sayılarını gösteriyor. 4-B sınıfındaki 22 öğrenci, hedefe ulaşmak için kalan kitapların her birini yalnız bir öğrenci okuyacak şekilde eşit paylaşıyor. Buna göre her öğrenci kaç kitap okuyacaktır?',
    choices: readingChoices, options: readingChoices.slice(), correctAnswer: 3,
    explanation: 'Her kitap resmi 4 kitabı gösterir. Şimdiye kadar 4-A 6 × 4 = 24, 4-B 8 × 4 = 32 kitap okumuştur. Birlikte 24 + 32 = 56 kitap okuduklarından hedefe 100 − 56 = 44 kitap kalır. 44 kitap 22 öğrenciye eşit paylaştırılırsa her öğrenci 44 ÷ 22 = 2 kitap okur.',
    visual: {type:'readingGoalPictograph', title:'Okunan kitaplar', data:{unit:4,groups:[{label:'4-A',count:6},{label:'4-B',count:8}]}},
    imageAlt: 'Her kitap resmi 4 kitabı gösterir. 4-A için 6 kitap resmi, 4-B için 8 kitap resmi vardır.',
    questionType: 'gorsel-okuma', subSkill: 'Şekil grafiğini yorumlama ve problem çözme'
  });
})();
