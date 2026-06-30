/* 2. sınıf Matematik testleri — Türkiye Yüzyılı Maarif Modeli konu kapsamı.
   Sorular ortak test motorunu, görseller ortak SVG üreticisini kullanır. */
(function () {
  const difficulties = ["kolay", "orta", "zor"];

  function visual(type, title, data) {
    return { type: type, title: title, data: data };
  }

  function q(question, choices, correct, explanation, picture) {
    const correctAnswer = choices.indexOf(String(correct));
    if (correctAnswer < 0) throw new Error("Doğru cevap seçeneklerde yok: " + question);
    return { question: question, choices: choices, correctAnswer: correctAnswer, explanation: explanation, image: null, visual: picture || null };
  }

  function numeric(question, answer, wrongs, explanation, picture, seed) {
    const values = [answer].concat(wrongs).map(String).filter(function (value, index, list) { return list.indexOf(value) === index; });
    let delta = 1;
    while (values.length < 4) {
      const candidate = String(Number(answer) + delta);
      if (!values.includes(candidate)) values.push(candidate);
      delta += 1;
    }
    const shift = (seed || question.length) % 4;
    const choices = values.slice(shift).concat(values.slice(0, shift));
    return q(question, choices, answer, explanation, picture);
  }

  function orderNumbers(values, descending) {
    return values.slice().sort(function (a, b) { return descending ? b - a : a - b; }).join(" < ");
  }

  const numberConfigs = {
    kolay: { n: 34, m: 43, third: 41, start: 20, step: 2, target: 48 },
    orta: { n: 58, m: 85, third: 65, start: 25, step: 5, target: 72 },
    zor: { n: 76, m: 67, third: 83, start: 38, step: 3, target: 93 }
  };

  function numbersOne(difficulty) {
    const c = numberConfigs[difficulty];
    const tens = Math.floor(c.n / 10);
    const ones = c.n % 10;
    const sorted = [c.n, c.m, c.third].slice().sort(function (a, b) { return a - b; });
    return [
      q("Kütüphane kartında " + c.n + " yazıyor. Bu sayı kaç onluk ve kaç birlikten oluşur?", [tens + " onluk " + ones + " birlik", ones + " onluk " + tens + " birlik", tens + " onluk", ones + " birlik"], tens + " onluk " + ones + " birlik", c.n + " sayısında onlar basamağı " + tens + ", birler basamağı " + ones + "tir."),
      q("Görselde " + tens + " onluk çubuk ve " + ones + " birlik küp vardır. Modellenen sayı hangisidir?", [String(c.n), String(tens + ones), String(tens * 10), String(ones * 10 + tens)], c.n, tens + " onluk " + (tens * 10) + ", " + ones + " birlik " + ones + " eder; sayı " + c.n + "tür.", visual("chart", "Onluk ve birlik modeli", { items: [{ label: "Onluk", value: tens }, { label: "Birlik", value: ones }] })),
      q("Sınıf kitaplığında bir rafta " + c.n + ", diğer rafta " + c.m + " kitap vardır. Hangi raftaki sayı daha büyüktür?", [String(Math.max(c.n, c.m)), String(Math.min(c.n, c.m)), String(Math.abs(c.n - c.m)), String(c.n + c.m)], Math.max(c.n, c.m), "Onlar basamakları karşılaştırıldığında " + Math.max(c.n, c.m) + " daha büyüktür."),
      q(c.n + ", " + c.m + " ve " + c.third + " sayılarının küçükten büyüğe doğru sıralanışı hangisidir?", [sorted.join(" < "), [sorted[2], sorted[1], sorted[0]].join(" < "), [sorted[0], sorted[2], sorted[1]].join(" < "), [sorted[1], sorted[0], sorted[2]].join(" < ")], sorted.join(" < "), "Sayılar küçükten büyüğe " + sorted.join(", ") + " biçiminde sıralanır."),
      numeric("Sayı yolunda " + c.start + "den başlayıp " + c.step + "şer ilerleyen çocuk " + [c.start, c.start + c.step, c.start + 2 * c.step].join(", ") + " sayılarını söylüyor. Sıradaki sayı kaçtır?", c.start + 3 * c.step, [c.start + 2 * c.step + 1, c.start + 4 * c.step, c.start + 2 * c.step - 1], "Her adımda " + c.step + " eklenir; sıradaki sayı " + (c.start + 3 * c.step) + " olur.", visual("numberLine", "Ritmik sayma", { start: c.start, end: c.start + 4 * c.step, arrow: [c.start, c.start + c.step, c.start + 2 * c.step, c.start + 3 * c.step] }), 5),
      numeric(c.target + " numaralı koltuğun hemen öncesindeki ve hemen sonrasındaki sayıların toplamı kaçtır?", (c.target - 1) + (c.target + 1), [c.target * 2 - 1, c.target * 2 + 1, c.target], (c.target - 1) + " + " + (c.target + 1) + " = " + (c.target * 2) + ".", null, 6),
      numeric(c.n + " sayısındaki " + tens + " rakamının basamak değeri kaçtır?", tens * 10, [tens, ones * 10, c.n], "Onlar basamağındaki " + tens + " rakamının değeri " + tens + " onluk, yani " + (tens * 10) + "dur.", null, 7),
      numeric("Görseldeki sayı örüntüsü " + c.start + ", " + (c.start + c.step) + ", ?, " + (c.start + 3 * c.step) + " biçimindedir. Soru işaretinin yerine ne gelmelidir?", c.start + 2 * c.step, [c.start + c.step + 1, c.start + 3 * c.step, c.start + 4 * c.step], "Örüntü " + c.step + "şer arttığı için eksik sayı " + (c.start + 2 * c.step) + "dir.", visual("equation", "Eksik sayıyı bul", { text: c.start + ", " + (c.start + c.step) + ", ?, " + (c.start + 3 * c.step) }), 8),
      numeric("Bir sayı " + tens + " onluk ve " + ones + " birlikten oluşuyor. Bu sayının " + c.step + " fazlası kaçtır?", c.n + c.step, [c.n - c.step, c.n + c.step + 1, tens + ones + c.step], c.n + " + " + c.step + " = " + (c.n + c.step) + ".", null, 9),
      numeric("Görselde " + (c.target - 2) + ", " + (c.target - 1) + " ve " + c.target + " numaralı duraklar sıralıdır. Ortadaki durak numarası ile son durak numarasının farkı kaçtır?", 1, [2, c.step, c.target], c.target + " - " + (c.target - 1) + " = 1.", visual("numberLine", "Ardışık duraklar", { start: c.target - 3, end: c.target + 1, arrow: [c.target - 2, c.target - 1, c.target] }), 10)
    ];
  }

  const measureConfigs = {
    kolay: { moneyA: 12, moneyB: 8, budget: 30, hour: 2, addHour: 1, day: 11, addDay: 3, long: 18, short: 12, share: 10 },
    orta: { moneyA: 24, moneyB: 17, budget: 50, hour: 3, addHour: 2, day: 16, addDay: 7, long: 35, short: 19, share: 16 },
    zor: { moneyA: 36, moneyB: 28, budget: 80, hour: 4, addHour: 3, day: 18, addDay: 9, long: 48, short: 27, share: 18 }
  };

  function numbersTwo(difficulty) {
    const c = measureConfigs[difficulty];
    const card = { kolay: "Başlangıç kartında", orta: "Uygulama kartında", zor: "Akıl yürütme kartında" }[difficulty];
    return [
      numeric("Defne " + c.moneyA + " TL'lik kitap ile " + c.moneyB + " TL'lik kalemlik alıyor. Toplam kaç TL öder?", c.moneyA + c.moneyB, [c.moneyA - c.moneyB, c.moneyA + c.moneyB + 2, c.moneyA], c.moneyA + " + " + c.moneyB + " = " + (c.moneyA + c.moneyB) + " TL.", null, 1),
      numeric("Görselde kumbarada " + c.budget + " TL vardır. " + c.moneyA + " TL harcanırsa kaç TL kalır?", c.budget - c.moneyA, [c.budget + c.moneyA, c.moneyA, c.budget - c.moneyA + 2], c.budget + " - " + c.moneyA + " = " + (c.budget - c.moneyA) + " TL kalır.", visual("coins", "Kumbara hesabı", { values: [c.budget, c.moneyA] }), 2),
      numeric("Saat " + c.hour + ".00'yi gösteriyor. " + c.addHour + " saat sonra saat kaç olur?", c.hour + c.addHour, [c.hour, c.hour + c.addHour + 1, Math.max(1, c.hour - c.addHour)], c.hour + " + " + c.addHour + " = " + (c.hour + c.addHour) + "; saat " + (c.hour + c.addHour) + ".00 olur.", null, 3),
      numeric("Takvimde ayın " + c.day + ". günündeyiz. " + c.addDay + " gün sonra ayın kaçı olur?", c.day + c.addDay, [c.day + c.addDay - 1, c.day + c.addDay + 1, c.day - c.addDay], c.day + " + " + c.addDay + " = " + (c.day + c.addDay) + ".", null, 4),
      numeric("Görselde mavi şerit " + c.long + " cm, sarı şerit " + c.short + " cm'dir. Mavi şerit kaç santimetre daha uzundur?", c.long - c.short, [c.long + c.short, c.short, c.long - c.short + 2], c.long + " - " + c.short + " = " + (c.long - c.short) + " cm.", visual("bars", "Şeritlerin uzunluğu", { items: [{ label: "Mavi", value: c.long }, { label: "Sarı", value: c.short }] }), 5),
      q(card + ", bir silginin uzunluğunu ölçmek için hangi birimi kullanmak daha uygundur?", ["Santimetre", "Metre", "Kilometre", "Litre"], "Santimetre", "Silgi gibi küçük nesnelerin uzunluğu santimetreyle ölçülür."),
      q(card + ", eşit kollu terazide elma kefesi aşağıda, boş kutu kefesi yukarıdadır. Buna göre hangisi doğrudur?", ["Elma daha ağırdır", "Boş kutu daha ağırdır", "İkisi eşittir", "Uzunlukları eşittir"], "Elma daha ağırdır", "Terazide aşağı inen kefe daha ağır olan nesneyi gösterir."),
      numeric("Görselde " + c.share + " düğme iki eş kutuya paylaştırılıyor. Her kutuya kaç düğme konur?", c.share / 2, [c.share, c.share / 2 + 1, c.share / 2 - 1], c.share + " düğme iki eş gruba ayrılınca her grupta " + (c.share / 2) + " düğme olur.", visual("dots", "Eşit paylaşma", { groups: [{ label: "1. kutu", count: c.share / 2 }, { label: "2. kutu", count: c.share / 2 }] }), 8),
      numeric("Ece'nin " + c.budget + " TL'si vardır. Önce " + c.moneyA + " TL, sonra " + c.moneyB + " TL harcıyor. Kaç TL'si kalır?", c.budget - c.moneyA - c.moneyB, [c.budget - c.moneyA, c.budget - c.moneyB, c.moneyA + c.moneyB], c.moneyA + " + " + c.moneyB + " = " + (c.moneyA + c.moneyB) + "; " + c.budget + " - " + (c.moneyA + c.moneyB) + " = " + (c.budget - c.moneyA - c.moneyB) + " TL.", null, 9),
      numeric("Görselde bir yolun ilk bölümü " + c.long + " metre, ikinci bölümü " + c.short + " metredir. Yolun tamamı kaç metredir?", c.long + c.short, [c.long - c.short, c.long, c.short], c.long + " + " + c.short + " = " + (c.long + c.short) + " metredir.", visual("chart", "Yol bölümleri", { items: [{ label: "1. bölüm", value: c.long }, { label: "2. bölüm", value: c.short }] }), 10)
    ];
  }

  const operationConfigs = {
    kolay: { a: 26, b: 13, c: 8, groups: 3, each: 4, start: 5, step: 3 },
    orta: { a: 47, b: 28, c: 15, groups: 4, each: 5, start: 12, step: 4 },
    zor: { a: 68, b: 37, c: 24, groups: 5, each: 6, start: 17, step: 5 }
  };

  function operations(difficulty) {
    const c = operationConfigs[difficulty];
    const sum = c.a + c.b;
    const difference = c.a - c.b;
    const missing = c.a - c.c;
    return [
      numeric("Okul şenliğinde sabah " + c.a + ", öğleden sonra " + c.b + " bilet satıldı. Toplam kaç bilet satılmıştır?", sum, [difference, sum + 10, c.a], c.a + " + " + c.b + " = " + sum + ".", null, 1),
      numeric("Görselde kutuda önce " + c.a + " top vardır. " + c.b + " top çıkarılınca kaç top kalır?", difference, [sum, difference + 2, c.b], c.a + " - " + c.b + " = " + difference + ".", visual("equation", "Çıkarma işlemi", { text: c.a + " - " + c.b + " = ?" }), 2),
      numeric("Kütüphaneye " + c.a + " kitap geldi. " + c.b + " kitap daha eklenip " + c.c + " kitap sınıflara verildi. Rafta kaç kitap kaldı?", sum - c.c, [sum, c.a - c.c, sum + c.c], c.a + " + " + c.b + " = " + sum + "; " + sum + " - " + c.c + " = " + (sum - c.c) + ".", null, 3),
      numeric("Bir toplama işleminde eksik sayı + " + c.c + " = " + c.a + " olduğuna göre eksik sayı kaçtır?", missing, [c.a + c.c, c.a, missing + 2], c.a + "dan " + c.c + " çıkarılır: " + c.a + " - " + c.c + " = " + missing + ".", null, 4),
      numeric("Görselde " + c.a + " + " + c.b + " = " + (sum - c.c) + " + ? eşitliği vardır. Soru işareti kaç olmalıdır?", c.c, [c.b, c.a, sum - c.c], "Sol taraf " + sum + "dur. Sağ tarafta " + (sum - c.c) + " olduğuna göre eksik sayı " + c.c + "tür.", visual("equation", "Eşitliği tamamla", { text: c.a + " + " + c.b + " = " + (sum - c.c) + " + ?" }), 5),
      numeric(c.groups + " tabakta " + c.each + "er kurabiye vardır. Tekrarlı toplama yapıldığında toplam kaç kurabiye olur?", c.groups * c.each, [c.groups + c.each, c.groups * c.each + c.each, c.groups * (c.each - 1)], Array(c.groups).fill(c.each).join(" + ") + " = " + (c.groups * c.each) + ".", null, 6),
      q("Bir sepette " + c.a + " elma vardı, bir kısmı dağıtılınca " + difference + " elma kaldı. Dağıtılan elma sayısını bulmak için hangi işlem yapılmalıdır?", [c.a + " - " + difference, c.a + " + " + difference, difference + " - " + c.a, difference + " + " + c.c], c.a + " - " + difference, "Başlangıç sayısından kalan sayı çıkarılarak dağıtılan miktar bulunur."),
      numeric("Görseldeki örüntü " + c.start + ", " + (c.start + c.step) + ", " + (c.start + 2 * c.step) + ", ? biçimindedir. Eksik sayı kaçtır?", c.start + 3 * c.step, [c.start + 2 * c.step + 1, c.start + 4 * c.step, c.start + 2 * c.step - 1], "Sayılar " + c.step + "er artar; eksik sayı " + (c.start + 3 * c.step) + " olur.", visual("equation", "Sayı örüntüsü", { text: c.start + ", " + (c.start + c.step) + ", " + (c.start + 2 * c.step) + ", ?" }), 8),
      numeric(c.a + " - " + c.b + " = " + difference + " işlemindeki sonucu toplama işlemiyle kontrol etmek için " + difference + " sayısına kaç eklenmelidir?", c.b, [c.a, difference, c.c], "Çıkarma işlemi " + difference + " + " + c.b + " = " + c.a + " toplamasıyla kontrol edilir.", null, 9),
      numeric("Görselde birinci kutuda " + c.a + ", ikinci kutuda " + c.b + " boncuk vardır. İki kutudan toplam " + c.c + " boncuk kullanılırsa kaç boncuk kalır?", sum - c.c, [difference, sum, sum + c.c], "Toplam " + sum + " boncuk vardır; " + c.c + " çıkarılınca " + (sum - c.c) + " kalır.", visual("chart", "Boncuk kutuları", { items: [{ label: "1. kutu", value: c.a }, { label: "2. kutu", value: c.b }, { label: "Kullanılan", value: c.c }] }), 10)
    ];
  }

  function geometryOne(difficulty) {
    const factor = difficulty === "kolay" ? 1 : difficulty === "orta" ? 2 : 3;
    const card = { kolay: "Başlangıç kartında", orta: "Uygulama kartında", zor: "Akıl yürütme kartında" }[difficulty];
    const squares = factor + 1;
    const triangles = factor;
    return [
      q(card + ", bir şeklin dört eş kenarı ve dört köşesi olduğu yazıyor. Bu şekil hangisidir?", ["Kare", "Üçgen", "Çember", "Dikdörtgen"], "Kare", "Karenin dört eş kenarı ve dört köşesi vardır."),
      numeric("Görselde " + squares + " kare vardır. Karelerin toplam köşe sayısı kaçtır?", squares * 4, [squares * 3, squares * 4 + 2, squares], "Her karenin 4 köşesi vardır; " + squares + " × 4 = " + (squares * 4) + ".", visual("shapeSet", "Karelerin köşeleri", { shapes: Array(squares).fill("square") }), 2),
      q(card + ", yuvarlanabilen ve köşesi olmayan cisim soruluyor. Doğru cevap hangisidir?", ["Küre", "Küp", "Dikdörtgen prizma", "Kare"], "Küre", "Kürenin köşesi yoktur ve eğri yüzeyi sayesinde yuvarlanır."),
      numeric(squares + " kare ile " + triangles + " üçgenin toplam kenar sayısı kaçtır?", squares * 4 + triangles * 3, [squares * 3 + triangles * 4, squares + triangles, squares * 4 + triangles], "Kareler " + (squares * 4) + ", üçgenler " + (triangles * 3) + " kenar verir; toplam " + (squares * 4 + triangles * 3) + ".", null, 4),
      q(card + ", görselde kare ve dikdörtgen farklı yönlere çevrilmiştir. Yönleri değişince hangisi doğrudur?", ["Şekillerin türü değişmez", "Kare üçgen olur", "Dikdörtgen çember olur", "Köşeler yok olur"], "Şekillerin türü değişmez", "Bir şekli çevirmek, kenar ve köşe özelliklerini değiştirmez.", visual("rotatedShapes", "Yön değişse de şekil aynı", { items: [{ id: "A", shape: "square", rotate: 30 }, { id: "B", shape: "rectangle", rotate: 90 }] })),
      q(card + ", iki eş kare yan yana ve birer kenarları ortak olacak biçimde birleştiriliyor. Dış sınır hangi şekle benzer?", ["Dikdörtgen", "Üçgen", "Çember", "Tek kare"], "Dikdörtgen", "İki eş kare yan yana birleşince uzun bir dikdörtgen oluşur."),
      q(card + ", küpün yüzlerinden biri kâğıda çiziliyor. Hangi düzlemsel şekil elde edilir?", ["Kare", "Üçgen", "Çember", "Beşgen"], "Kare", "Küpün her yüzü kare biçimindedir."),
      numeric("Görselde " + squares + " kare ve " + triangles + " üçgen vardır. Köşesi olan toplam kaç şekil vardır?", squares + triangles, [squares, triangles, squares + triangles + 1], "Karelerin ve üçgenlerin tamamının köşesi vardır: " + squares + " + " + triangles + " = " + (squares + triangles) + ".", visual("shapeSet", "Köşeli şekilleri say", { shapes: Array(squares).fill("square").concat(Array(triangles).fill("triangle")) }), 8),
      q(card + ", yalnızca düz yüzlü cisimlerden bir yapı oluşturulacaktır. Hangisi kullanılmaya en uygundur?", ["Küp", "Küre", "Çember", "Daire"], "Küp", "Küp düz yüzlere sahip üç boyutlu bir cisimdir."),
      numeric("Görselde " + squares + " kare, " + triangles + " üçgen ve 1 çember vardır. Bu şekillerin toplam köşe sayısı kaçtır?", squares * 4 + triangles * 3, [squares * 4 + triangles * 3 + 1, squares + triangles + 1, squares * 3 + triangles * 4], "Çemberin köşesi yoktur; kare ve üçgenlerin köşeleri toplamı " + (squares * 4 + triangles * 3) + "tür.", visual("shapeSet", "Toplam köşe sayısı", { shapes: Array(squares).fill("square").concat(Array(triangles).fill("triangle")).concat(["circle"]) }), 10)
    ];
  }

  const routeConfigs = {
    kolay: { right: 2, up: 1, lengthA: 12, lengthB: 8 },
    orta: { right: 3, up: 2, lengthA: 24, lengthB: 15 },
    zor: { right: 4, up: 3, lengthA: 37, lengthB: 19 }
  };

  function geometryTwo(difficulty) {
    const c = routeConfigs[difficulty];
    const card = { kolay: "Başlangıç krokisinde", orta: "Uygulama krokisinde", zor: "Akıl yürütme krokisinde" }[difficulty];
    return [
      q(card + ", Ece sınıf kapısının önünde duruyor. Kitaplık kapının sağındaysa hangi yöne gitmelidir?", ["Sağa", "Sola", "Aşağı", "Olduğu yerde"], "Sağa", "Kitaplık kapının sağında olduğu için sağa gidilmelidir."),
      q("Görselde robot önce " + c.right + " kare sağa, sonra " + c.up + " kare yukarı gidiyor. Robotun son hareket yönü hangisidir?", ["Yukarı", "Sağ", "Sol", "Aşağı"], "Yukarı", "Robotun ikinci ve son hareketi yukarı yönündedir.", visual("cards", "Robotun yolu", { first: c.right + " kare sağa", second: c.up + " kare yukarı" })),
      q(card + ", bir nesne masanın altında ve sandalyenin solundadır. Konumu anlatan doğru ifade hangisidir?", ["Masanın altında, sandalyenin solunda", "Masanın üstünde, sandalyenin sağında", "Masanın yanında, sandalyenin üstünde", "İki eşyanın da üzerinde"], "Masanın altında, sandalyenin solunda", "Soruda iki konum bilgisi de açıkça verilmiştir."),
      numeric(c.lengthA + " cm'lik çubuk ile " + c.lengthB + " cm'lik çubuk uç uca eklenirse toplam uzunluk kaç santimetre olur?", c.lengthA + c.lengthB, [c.lengthA - c.lengthB, c.lengthA, c.lengthB], c.lengthA + " + " + c.lengthB + " = " + (c.lengthA + c.lengthB) + " cm.", null, 4),
      q(card + ", bir şeklin dikey çizginin iki yanında eş parçaları vardır. Bu çizgiye ne denir?", ["Simetri doğrusu", "Sayı doğrusu", "Kenar", "Köşe"], "Simetri doğrusu", "Şekli iki eş ayna görüntüsüne ayıran çizgi simetri doğrusudur.", visual("cards", "Simetriyi keşfet", { left: "◀ şeklin yarısı", line: "|", right: "şeklin yarısı ▶" })),
      numeric("Bir çocuk " + c.right + " adım doğuya, " + c.up + " adım kuzeye gidiyor. Toplam kaç adım atmıştır?", c.right + c.up, [c.right * c.up, Math.abs(c.right - c.up), c.right + c.up + 1], c.right + " + " + c.up + " = " + (c.right + c.up) + " adım.", null, 6),
      q(card + ", kare biçimindeki bir kâğıt ortadan iki eş parçaya katlanıyor. Kat yeri için hangisi söylenebilir?", ["Bir simetri doğrusu olabilir", "Köşeleri yok eder", "Kâğıdı çembere dönüştürür", "Uzunluğu ölçmez"], "Bir simetri doğrusu olabilir", "Eş parçaları üst üste getiren kat izi simetri doğrusu olabilir."),
      numeric("Görselde A yolu " + c.lengthA + " metre, B yolu " + c.lengthB + " metredir. A yolu B yolundan kaç metre uzundur?", c.lengthA - c.lengthB, [c.lengthA + c.lengthB, c.lengthB, c.lengthA - c.lengthB + 2], c.lengthA + " - " + c.lengthB + " = " + (c.lengthA - c.lengthB) + " metredir.", visual("bars", "İki yolun uzunluğu", { items: [{ label: "A yolu", value: c.lengthA }, { label: "B yolu", value: c.lengthB }] }), 8),
      q(card + ", spor salonu sınıfın kuzeyinde, kütüphane spor salonunun doğusundadır. Sınıftan kütüphaneye giden yolun doğru sırası hangisidir?", ["Önce kuzeye, sonra doğuya", "Önce güneye, sonra batıya", "Yalnız batıya", "Önce doğuya, sonra güneye"], "Önce kuzeye, sonra doğuya", "Önce spor salonuna ulaşmak için kuzeye, ardından kütüphane için doğuya gidilir."),
      numeric("Görselde bir parkurun " + c.lengthA + " metrelik bölümünün " + c.lengthB + " metresi yürünmüştür. Geriye kaç metre kalmıştır?", c.lengthA - c.lengthB, [c.lengthA + c.lengthB, c.lengthB, c.lengthA], c.lengthA + " - " + c.lengthB + " = " + (c.lengthA - c.lengthB) + " metre kalır.", visual("chart", "Parkurda kalan yol", { items: [{ label: "Toplam", value: c.lengthA }, { label: "Yürünen", value: c.lengthB }] }), 10)
    ];
  }

  const dataConfigs = {
    kolay: { a: 6, b: 4, c: 5, unit: 1 },
    orta: { a: 9, b: 6, c: 8, unit: 1 },
    zor: { a: 12, b: 8, c: 10, unit: 2 }
  };

  function dataResearch(difficulty) {
    const c = dataConfigs[difficulty];
    const card = { kolay: "Başlangıç araştırmasında", orta: "Uygulama araştırmasında", zor: "Akıl yürütme araştırmasında" }[difficulty];
    const total = c.a + c.b + c.c;
    return [
      q(card + ", sınıftaki çocukların en sevdiği oyunu öğrenmek isteyen öğretmen önce ne yapmalıdır?", ["Uygun bir araştırma sorusu belirlemeli", "Cevapları tahmin etmeli", "Grafiği silmeli", "Yalnız bir kişiye bakmalı"], "Uygun bir araştırma sorusu belirlemeli", "Veri toplamadan önce neyin araştırılacağı açıkça belirlenmelidir."),
      numeric("Görselde elma " + c.a + ", muz " + c.b + ", çilek " + c.c + " oy almıştır. En çok seçilen ile en az seçilen arasındaki fark kaçtır?", Math.max(c.a, c.b, c.c) - Math.min(c.a, c.b, c.c), [Math.max(c.a, c.b, c.c), Math.min(c.a, c.b, c.c), total], "En büyük değer " + Math.max(c.a, c.b, c.c) + ", en küçük değer " + Math.min(c.a, c.b, c.c) + "; fark " + (Math.max(c.a, c.b, c.c) - Math.min(c.a, c.b, c.c)) + ".", visual("chart", "Meyve tercihleri", { items: [{ label: "Elma", value: c.a }, { label: "Muz", value: c.b }, { label: "Çilek", value: c.c }] }), 2),
      numeric("Bir çetele tablosunda kitap için " + c.a + ", dergi için " + c.b + " işaret vardır. Toplam kaç işaret kullanılmıştır?", c.a + c.b, [c.a - c.b, c.a, c.b], c.a + " + " + c.b + " = " + (c.a + c.b) + ".", null, 3),
      q(card + ", “Sınıfımızdaki çocukların en sevdiği mevsim hangisidir?” sorusuna cevap vermek için hangi bilgi toplanmalıdır?", ["Çocukların sevdiği mevsimler", "Çocukların boyları", "Kalemlerin uzunluğu", "Sınıfın kapı sayısı"], "Çocukların sevdiği mevsimler", "Toplanan veri araştırma sorusuyla doğrudan ilgili olmalıdır."),
      numeric("Görselde A grubu " + c.a + ", B grubu " + c.b + ", C grubu " + c.c + " kitap okumuştur. Üç grup toplam kaç kitap okumuştur?", total, [c.a + c.b, c.a + c.c, total + c.unit], c.a + " + " + c.b + " + " + c.c + " = " + total + ".", visual("chart", "Okunan kitaplar", { items: [{ label: "A", value: c.a }, { label: "B", value: c.b }, { label: "C", value: c.c }] }), 5),
      q(card + ", yalnız iki kişinin görüşünü alıp bütün sınıf için sonuç çıkarmak neden uygun değildir?", ["İki kişi sınıfın tamamını temsil etmeyebilir", "Grafik renkli olmaz", "Sorular çok kısa olur", "Kalem sayısı azalır"], "İki kişi sınıfın tamamını temsil etmeyebilir", "Güvenilir sonuç için araştırılan gruptan yeterli sayıda kişiye ulaşılmalıdır."),
      numeric("Bir grafikte kırmızı " + c.a + ", mavi " + c.b + " kez seçilmiştir. Mavinin kırmızıyla eşit olması için kaç oy daha alması gerekir?", c.a - c.b, [c.a + c.b, c.a, c.b], c.b + " sayısına " + (c.a - c.b) + " eklenince " + c.a + " olur.", null, 7),
      numeric("Görselde her simge " + c.unit + " oyu gösteriyor. A seçeneği için " + c.a / c.unit + " simge varsa kaç oy vardır?", c.a, [c.a / c.unit, c.a + c.unit, c.a - c.unit], (c.a / c.unit) + " simge × " + c.unit + " oy = " + c.a + " oy.", visual("pictograph", "Simgeli grafik", { unit: c.unit, items: [{ label: "A", symbols: c.a / c.unit }] }), 8),
      q(card + ", toplanan veriler araştırma sorusuna cevap vermiyorsa en doğru davranış hangisidir?", ["Soruyla ilgili verileri yeniden toplamak", "Sonucu uydurmak", "Yanlış veriyi gizlemek", "Araştırmayı açıklamadan bitirmek"], "Soruyla ilgili verileri yeniden toplamak", "Doğru sonuç için araştırma sorusuyla ilgili veri kullanılmalıdır."),
      numeric("Görselde ilk gün " + c.a + ", ikinci gün " + c.b + ", üçüncü gün " + c.c + " fidan sulanmıştır. İlk ve üçüncü günün toplamı, ikinci günden kaç fazladır?", c.a + c.c - c.b, [c.a + c.c, total, c.a - c.b], "İlk ve üçüncü gün " + (c.a + c.c) + " fidan; " + (c.a + c.c) + " - " + c.b + " = " + (c.a + c.c - c.b) + ".", visual("chart", "Sulanan fidanlar", { items: [{ label: "1. gün", value: c.a }, { label: "2. gün", value: c.b }, { label: "3. gün", value: c.c }] }), 10)
    ];
  }

  const builders = {
    "sayilar-ve-nicelikler-1": numbersOne,
    "sayilar-ve-nicelikler-2": numbersTwo,
    "islemlerden-cebirsel-dusunmeye": operations,
    "nesnelerin-geometrisi-1": geometryOne,
    "nesnelerin-geometrisi-2": geometryTwo,
    "veriye-dayali-arastirma": dataResearch
  };

  const topicNames = {
    "sayilar-ve-nicelikler-1": "Sayılar ve Nicelikler (1)",
    "sayilar-ve-nicelikler-2": "Sayılar ve Nicelikler (2)",
    "islemlerden-cebirsel-dusunmeye": "İşlemlerden Cebirsel Düşünmeye",
    "nesnelerin-geometrisi-1": "Nesnelerin Geometrisi (1)",
    "nesnelerin-geometrisi-2": "Nesnelerin Geometrisi (2)",
    "veriye-dayali-arastirma": "Veriye Dayalı Araştırma"
  };

  const tests = [];
  Object.keys(builders).forEach(function (topic) {
    difficulties.forEach(function (difficulty) {
      const slug = "2-sinif-matematik-" + topic + "-" + difficulty + "-test-1";
      const questions = builders[topic](difficulty).map(function (question, index) {
        question.id = index + 1;
        if (question.visual) {
          question.image = "images/tests/" + slug + "-soru-" + (index + 1) + ".svg";
          question.imageAlt = question.visual.title;
        }
        return question;
      });
      tests.push({
        classLevel: 2,
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
