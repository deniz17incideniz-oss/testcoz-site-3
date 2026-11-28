// Topic-aligned replacements for the ten grade-four punctuation questions.
// Rules: https://tdk.gov.tr/icerik/yazim-kurallari/noktalama-isaretleri-aciklamalar/
// Grade scope: https://tymm.meb.gov.tr/ilkokul-turkce-dersi/unite/390
const rows = [
  ['“Pazardan elma( ) armut ve muz aldık( )” cümlesinde boşluklara sırasıyla hangi işaretler getirilmelidir?', ', ve .', ', ve ?', '. ve .', ': ve .', 'Sıralanan eş görevli sözcüklerden elma ve armudun arasına virgül; tamamlanmış bildirme cümlesinin sonuna nokta gelir.'],
  ['Hangi cümlede virgül, seslenilen kişileri belirtmek için kullanılmıştır?', 'Çocuklar, kitaplarınızı açın.', 'Elma, armut ve erik aldım.', 'Masada kalem, defter ve silgi var.', 'Kırmızı, sarı ve mavi renkleri seçti.', '“Çocuklar” sözü dinleyenlere seslenir; seslenme sözünden sonra virgül kullanılır. Diğer cümlelerde virgül, sıralanan sözcükleri ayırır.'],
  ['Aşağıdaki cümlelerin hangisinin sonuna soru işareti getirilmelidir?', 'Kütüphanenin saat kaçta açıldığını biliyor musun', 'Kütüphanenin saat kaçta açıldığını merak ettim', 'Kütüphanenin saat kaçta açılacağını sordum', 'Kütüphanenin saat kaçta açılacağını öğrenmeliyiz', '“Biliyor musun” doğrudan soru sorar; soru işaretiyle tamamlanır. Diğer cümleler soru sözcükleri içerse de bir durumu bildirir ve noktayla tamamlanır.'],
  ['“Çantamda üç eşya var( ) defter, kalem ve silgi( ) Bunlardan birini alır mısın( )” metnindeki boşluklara sırasıyla hangi işaretler getirilmelidir?', ':  .  ?', '.  .  ?', ':  ?  .', ',  .  ?', 'Üç eşyanın sıralanmasından önce iki nokta, tamamlanan listenin sonuna nokta, soru cümlesinin sonuna soru işareti gelir.'],
  ['Hangi cümlede iki özel ada gelen ekler kesme işaretiyle doğru ayrılmıştır?', 'Ece’ye İzmir’i anlattım.', 'Eceye İzmir’i anlattım.', 'Ece’ye İzmiri anlattım.', 'Eceye İzmiri anlattım.', 'Ece ve İzmir özel adlarına gelen “ye” ve “i” ekleri ayrı ayrı kesme işaretiyle ayrılır; işaretten sonra boşluk bırakılmaz.'],
  ['Gün, ay ve yılı gösteren sayıların arasına nokta konulacaktır. Görseldeki 23 Nisan 2026 tarihi ve onu izleyen 24 Nisan 2026 tarihi hangi seçenekte bu kurala uygun yazılmıştır?', '23.04.2026 – 24.04.2026', '23.04.2026 – 24/04.2026', '23/04.2026 – 24.04.2026', '23.04,2026 – 24.04.2026', 'Gün, ay ve yılı gösteren sayıların iki tarih için de noktayla ayrılması istenmiştir: 23.04.2026 ve 24.04.2026.'],
  ['“Eyvah( ) Otobüsü kaçırdık( )” cümlelerinde ilk boşluğa duygu belirten işaret, ikinci boşluğa bildirme cümlesini bitiren işaret getirilecektir. Sıra hangisidir?', '! ve .', ', ve .', '! ve ?', '. ve .', '“Eyvah” üzüntü bildirir ve ardından ünlem kullanılabilir. İkinci cümle bildirme cümlesi olarak noktayla tamamlanır.'],
  ['Hangi cümlede nokta, bir sayının sıra bildirdiğini göstermek için kullanılmıştır?', 'Yarışta 3. oldum.', 'Toplantı 12.05.2026 tarihinde yapılacak.', 'Dr. Selin sınıfa geldi.', 'Bugün erken kalktım.', '“3.” yazılışı “üçüncü” diye okunur; nokta sayıdan sonra sıra bildirmek için kullanılmıştır.'],
  ['İlk cümlede konuşanın sözünü tamamlamadığı, ikinci cümlede ise yanıt beklediği hangi yazımla gösterilmiştir?', 'Sana bir şey söyleyecektim... Beni dinler misin?', 'Sana bir şey söyleyecektim... Beni dinler misin.', 'Sana bir şey söyleyecektim. Beni dinler misin?', 'Sana bir şey söyleyecektim, Beni dinler misin?', 'Tamamlanmamış sözün sonunda üç nokta, yanıt bekleyen soru cümlesinin sonunda soru işareti kullanılır.'],
  ['Aşağıdaki cümlelerden hangisinde özel ada gelen ek ve cümlenin sonundaki işaret doğru kullanılmıştır?', 'Ece İzmir’e yarın gidecek.', 'Ece İzmire yarın gidecek.', 'Ece İzmir’e yarın gidecek?', 'Ece İzmir’e yarın gidecek:', 'İzmir özel adına gelen “e” eki kesmeyle ayrılır; soru olmayan tamamlanmış bildirme cümlesi noktayla biter.']
];

export function repairPunctuation4(tests, changes) {
  const slug = '4-sinif-turkce-noktalama-isaretleri-zor-test-2';
  const test = tests.find(t => t.slug === slug);
  if (!test || test.questions.length !== rows.length) throw new Error(`Missing punctuation test: ${slug}`);
  for (const [index, q] of test.questions.entries()) {
    const expectedId = `T2-G4-TÜRK-NOKTAL-${String(index + 1).padStart(2, '0')}`;
    if (q.id !== expectedId || q.choices.length !== 4) throw new Error(`Unexpected punctuation record: ${q.id}`);
    const before = structuredClone(q);
    const [question, ...rest] = rows[index];
    const choices = rest.slice(0, 4), explanation = rest[4], shift = index % 4;
    Object.assign(q, {
      question,
      choices: [...choices.slice(4 - shift), ...choices.slice(0, 4 - shift)],
      correctAnswer: shift,
      explanation
    });
    // Replace the old story diagram with the date components, without separators.
    if (index === 5) {
      if (!q.image) throw new Error(`Expected existing illustration: ${q.id}`);
      q.visual = {type: 'dateComponents', title: 'Tarihin bölümleri', data: {steps: ['Gün: 23', 'Ay: 04', 'Yıl: 2026']}};
      q.imageAlt = 'Gün: 23; ay: 04; yıl: 2026.';
    } else if (q.image || q.visual) {
      throw new Error(`Unexpected existing illustration: ${q.id}`);
    }
    changes.push({ id: q.id, reasons: ['grade_four_punctuation_topic_repair'], before, after: structuredClone(q) });
  }
}
