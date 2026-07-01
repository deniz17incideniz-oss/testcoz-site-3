/* 2. sınıf İngilizce testleri. */
(function () {
  const levels = ["kolay", "orta", "zor"];
  const V = (title, data) => ({ type: "cards", title, data });
  function q(question, choices, correct, explanation, visual) {
    const correctAnswer = choices.indexOf(correct);
    if (correctAnswer < 0) throw new Error("Correct answer is missing: " + question);
    return { question, choices, correctAnswer, explanation, image: null, visual: visual || null };
  }

  const themes = {
    "school-life": { name:"School Life", hero:"Emma", word:"school", meaning:"okul", item:"library", itemMeaning:"kütüphane", instruction:"Go to school.", instructionMeaning:"Okula git.", question:"Where is the library?", answer:"It is next to the classroom.", place:"playground", placeMeaning:"oyun alanı", action:"I read books at school.", actionMeaning:"Okulda kitap okurum.", title:"A Day at School", detail:"Emma reads a book in the library.", order:["Emma goes to school.","She studies in class.","She plays in the playground."], wrong:["hospital","kitchen","bedroom"] },
    "classroom-life": { name:"Classroom Life", hero:"Tom", word:"pencil", meaning:"kurşun kalem", item:"board", itemMeaning:"tahta", instruction:"Open your book.", instructionMeaning:"Kitabını aç.", question:"What is this?", answer:"It is a ruler.", place:"classroom", placeMeaning:"sınıf", action:"I write with a pencil.", actionMeaning:"Kurşun kalemle yazarım.", title:"Ready for the Lesson", detail:"Tom puts his notebook on the desk.", order:["Tom opens his bag.","He takes out his notebook.","He writes the date."], wrong:["garden","bus stop","market"] },
    "personal-life": { name:"Personal Life", hero:"Mia", word:"happy", meaning:"mutlu", item:"toothbrush", itemMeaning:"diş fırçası", instruction:"Wash your hands.", instructionMeaning:"Ellerini yıka.", question:"How old are you?", answer:"I am eight years old.", place:"bathroom", placeMeaning:"banyo", action:"I brush my teeth every day.", actionMeaning:"Her gün dişlerimi fırçalarım.", title:"My Healthy Day", detail:"Mia washes her hands before lunch.", order:["Mia wakes up.","She washes her face.","She eats breakfast."], wrong:["angry","sleepy","hungry"] },
    "family-life": { name:"Family Life", hero:"Jack", word:"mother", meaning:"anne", item:"family photo", itemMeaning:"aile fotoğrafı", instruction:"Help your family.", instructionMeaning:"Ailene yardım et.", question:"Who is she?", answer:"She is my sister.", place:"living room", placeMeaning:"oturma odası", action:"I love my family.", actionMeaning:"Ailemi severim.", title:"My Happy Family", detail:"Jack helps his father set the table.", order:["The family prepares dinner.","They eat together.","They clean the table."], wrong:["teacher","driver","doctor"] },
    "homes-houses-and-neighbourhoods": { name:"Homes, Houses and Neighbourhoods", hero:"Lily", word:"kitchen", meaning:"mutfak", item:"sofa", itemMeaning:"kanepe", instruction:"Go to the kitchen.", instructionMeaning:"Mutfağa git.", question:"Where is the cat?", answer:"It is under the table.", place:"bedroom", placeMeaning:"yatak odası", action:"I live near the park.", actionMeaning:"Parkın yakınında yaşarım.", title:"My Home and Street", detail:"Lily sees a bakery next to her house.", order:["Lily leaves her house.","She walks past the bakery.","She arrives at the park."], wrong:["airplane","ocean","forest"] },
    "life-in-the-city-and-the-world": { name:"Life in the City and the World", hero:"Alex", word:"bus", meaning:"otobüs", item:"city map", itemMeaning:"şehir haritası", instruction:"Wait at the bus stop.", instructionMeaning:"Otobüs durağında bekle.", question:"Where do you live?", answer:"I live in Türkiye.", place:"city centre", placeMeaning:"şehir merkezi", action:"I go to the museum by bus.", actionMeaning:"Müzeye otobüsle giderim.", title:"Around My City", detail:"Alex finds the museum on the city map.", order:["Alex checks the map.","He waits for the bus.","He visits the museum."], wrong:["pencil","bedroom","sandwich"] }
  };

  function easy(t) {
    return [
      q("“"+t.word+"” kelimesinin Türkçe anlamı hangisidir?",[t.meaning,t.wrong[0],t.wrong[1],t.wrong[2]],t.meaning,"“"+t.word+"”, “"+t.meaning+"” demektir."),
      q(t.name+" görselindeki “"+t.item+"” kelimesinin anlamı nedir?",[t.itemMeaning,t.meaning,t.placeMeaning,"oyuncak"],t.itemMeaning,"“"+t.item+"”, “"+t.itemMeaning+"” demektir.",V("Word Card",{word:t.item,meaning:t.itemMeaning})),
      q("“"+t.question+"” sorusuna uygun cevap hangisidir?",[t.answer,"Good morning.","It is red.","Thank you."],t.answer,"Soruyla anlamlı biçimde eşleşen cevap doğru seçenektir."),
      q("“"+t.actionMeaning+"” cümlesinin İngilizcesi hangisidir?",[t.action,t.instruction,t.answer,t.detail],t.action,"Doğru çeviri “"+t.action+"” cümlesidir."),
      q(t.name+" görselindeki “"+t.instruction+"” yönergesinin anlamı nedir?",[t.instructionMeaning,t.actionMeaning,t.placeMeaning,t.meaning],t.instructionMeaning,"Yönergenin doğru anlamı “"+t.instructionMeaning+"”dır.",V("Instruction",{english:t.instruction,turkish:t.instructionMeaning})),
      q("“"+t.placeMeaning+"” için doğru İngilizce kelime hangisidir?",[t.place,t.word,t.item,t.wrong[0]],t.place,"“"+t.place+"”, “"+t.placeMeaning+"” demektir."),
      q(t.name+" temasında hangi İngilizce-Türkçe eşleştirmesi doğrudur?",[t.word+" — "+t.meaning,t.word+" — "+t.itemMeaning,t.item+" — "+t.placeMeaning,t.place+" — "+t.meaning],t.word+" — "+t.meaning,"Kelime ve anlamı doğru eşleştirilmiştir."),
      q(t.name+" konuşma görselinde doğru soru-cevap çifti hangisidir?",[t.question+" — "+t.answer,"Hello! — Goodbye!","What is this? — I am fine.","How are you? — It is blue."],t.question+" — "+t.answer,"Soruya uygun bilgi doğru cevapta verilmiştir.",V("Dialogue",{question:t.question,answer:t.answer})),
      q("Kısa metin: “"+t.detail+"” Metinde "+t.hero+" ne yapıyor?",[t.detail.replace(t.hero+" ",""),"She sleeps all day.","She loses her bag.","She goes home."],t.detail.replace(t.hero+" ",""),"Cevap metinde açıkça verilmiştir."),
      q(t.name+" metni için en uygun İngilizce başlık hangisidir?",[t.title,"A Rainy Night","The Lost Key","A Big Ocean"],t.title,"“"+t.title+"” metnin konusuna uygundur.",V("Title",{title:t.title,hero:t.hero}))
    ];
  }

  function medium(t) {
    return [
      q(t.hero+" says: “"+t.question+"” The answer is “"+t.answer+"” Bu konuşma en çok hangi konuyla ilgilidir?",[t.name,"Weather","Animals","Food"],t.name,"Soru ve cevap "+t.name+" temasıyla ilişkilidir."),
      q(t.name+" görselindeki olayın ikinci adımı hangisidir?",[t.order[1],t.order[0],t.order[2],t.instruction],t.order[1],"Olayın orta adımı “"+t.order[1]+"”dır.",V("First, Then, Finally",{first:t.order[0],second:t.order[1],third:t.order[2]})),
      q(t.name+" temasında hangi İngilizce cümle anlamlı ve doğru sıradadır?",[t.action,t.action.split(" ").reverse().join(" "),t.word+" I "+t.place+".","At "+t.action],t.action,"Sözcükler doğru sırada dizilmiştir."),
      q("Cümleyi tamamla: “This is my ___.” Görselde "+t.item+" vardır.",[t.item,t.word,t.place,t.wrong[0]],t.item,"Görseldeki nesne “"+t.item+"”dır."),
      q(t.name+" yer kartında “"+t.place+"” yazıyor. Türkçe karşılığı hangisidir?",[t.placeMeaning,t.itemMeaning,t.meaning,"cadde"],t.placeMeaning,"“"+t.place+"”, “"+t.placeMeaning+"” demektir.",V("Place Card",{place:t.place,meaning:t.placeMeaning})),
      q("“"+t.question+"” sorusuna neden “"+t.answer+"” cevabı uygundur?",["İstenen bilgiyi verdiği için","Yalnız selamlaşma olduğu için","Bir renk söylediği için","Soruyla ilgisiz olduğu için"],"İstenen bilgiyi verdiği için","Cevap soruda istenen bilgiyi verir."),
      q(t.name+" temasında hangi cümle olumsuz bir anlam bildirir?",["I do not "+t.action.toLowerCase().replace(/^i /,""),t.action,t.detail,t.instruction],"I do not "+t.action.toLowerCase().replace(/^i /,""),"“do not” cümleyi olumsuz yapar."),
      q(t.name+" görselinde aynı gruba ait kelimeler hangileridir?",[t.word+", "+t.item+", "+t.place,t.wrong.join(", "),t.word+", sandwich, ocean","red, seven, run"],t.word+", "+t.item+", "+t.place,"Üç kelime de tema içinde kullanılır.",V("Word Group",{word:t.word,item:t.item,place:t.place})),
      q("Öğretmen “"+t.instruction+"” diyor. Öğrenci ne yapmalıdır?",[t.instructionMeaning,"Soruyu görmezden gelmeli","Sınıftan koşarak çıkmalı","Başka bir yönerge uygulamalı"],t.instructionMeaning,"Öğrenci verilen yönergeyi uygulamalıdır."),
      q(t.name+" görselinde “"+t.detail+"” yazıyor. Ana düşünce hangisidir?",[t.actionMeaning,t.instructionMeaning,"Hava yağmurludur.","Bir oyuncak kaybolmuştur."],t.actionMeaning,"Metnin temasıyla en yakın düşünce doğru seçenektedir.",V("Main Idea",{detail:t.detail,idea:t.actionMeaning}))
    ];
  }

  function hard(t) {
    return [
      q(t.hero+" is in the "+t.place+". There is a "+t.item+". Bu iki ipucuna göre konu hangisidir?",[t.name,"Wild Animals","Space","Sports"],t.name,"Yer ve nesne "+t.name+" temasını gösterir."),
      q(t.name+" görselinde ilk ve son olay verilmiştir. Araya hangisi gelmelidir?",[t.order[1],t.order[0],t.order[2],t.wrong[0]],t.order[1],"Doğru orta adım “"+t.order[1]+"”dır.",V("Missing Step",{first:t.order[0],middle:"?",last:t.order[2]})),
      q("“"+t.detail+"” cümlesini en iyi özetleyen başlık hangisidir?",[t.title,"A Cold Mountain","My Red Balloon","A Long Sleep"],t.title,"Başlık cümledeki olayı yansıtır."),
      q("“"+t.word+"” kelimesinin anlamını metinden bulmak için hangi ipucu yararlıdır?",["“"+t.meaning+"” açıklaması","Sayfa numarası","Noktanın rengi","Kelimenin uzunluğu"],"“"+t.meaning+"” açıklaması","Bağlamdaki açıklama kelimenin anlamını verir."),
      q(t.name+" konuşmasında “"+t.question+"” sorusundan sonra hangisi gelmelidir?",[t.answer,t.instruction,"See you.","It is a pencil."],t.answer,"Soruya uygun cevap “"+t.answer+"”dır.",V("Complete the Dialogue",{question:t.question,answer:t.answer})),
      q("Karışık sözleri düzenle: “"+t.action.split(" ").reverse().join(" / ")+"”", [t.action,t.detail,t.instruction,t.answer],t.action,"Doğru cümle “"+t.action+"” biçimindedir."),
      q("“"+t.instruction+"” cümlesi hangi amaçla söylenmiştir?",["Bir yönerge vermek","Yaş sormak","Renk söylemek","Vedalaşmak"],"Bir yönerge vermek","Cümle yapılması gereken işi bildirir."),
      q(t.name+" görselinde öğretmenin verdiği yönerge hangisidir?",[t.instruction,t.action,"Ignore the rule.","Run away."],t.instruction,"Yönerge doğru seçenekte verilmiştir.",V("Choose the Rule",{instruction:t.instruction,action:t.action})),
      q(t.name+" temasında hangi seçenek doğru bir İngilizce soru cümlesidir?",[t.question,t.answer,t.action,t.detail],t.question,"Soru yapısı ve soru işareti doğru kullanılmıştır."),
      q(t.name+" olay sırası tamamlandığında en uygun sonuç hangisidir?",[t.order[2],t.order[0],t.wrong[0],t.instruction],t.order[2],"Olayın son adımı “"+t.order[2]+"”dır.",V("Story Result",{first:t.order[0],second:t.order[1],result:t.order[2]}))
    ];
  }

  const makers={kolay:easy,orta:medium,zor:hard}, tests=[];
  Object.keys(themes).forEach(topic=>levels.forEach(difficulty=>{
    const t=themes[topic],slug="2-sinif-ingilizce-"+topic+"-"+difficulty+"-test-1";
    const questions=makers[difficulty](t).map((x,i)=>{x.id=i+1;if(x.visual){x.image="images/tests/"+slug+"-soru-"+(i+1)+".svg";x.imageAlt=x.visual.title;}return x;});
    tests.push({classLevel:2,subject:"ingilizce",subjectName:"İngilizce",topic,topicName:t.name,difficulty,testNumber:1,slug,pageUrl:"tests/"+slug+".html",questions});
  }));
  window.TESTCOZ_TESTS=(window.TESTCOZ_TESTS||[]).concat(tests);
})();
