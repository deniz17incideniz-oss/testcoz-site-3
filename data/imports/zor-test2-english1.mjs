// The final source has colours under Numbers and animal/body words under Colours.
// Keep valid original items, then repair the mismatched topic slots explicitly.
const rows={
 greetings:{
  2:['Mira meets a friend at school in the morning. Which two English words can she say?','Good morning!','Good night!','Goodbye!','Morning sabah demektir. Sabah karşılaşınca Good morning ile selam verilir.'],
  5:['Ali says, “Hello, I am Ali.” His new friend wants to tell Ali her name. What can she say?','Hello, I am Ece.','Good night, Ali.','I am seven apples.','I am Ece ifadesi adını söyler. Böylece tanışma konuşmasına uygun cevap verir.'],
  7:['A: “Nice to meet you.” B: “________” Which reply completes the greeting?','Nice to meet you, too.','Open the door.','This is a pencil.','Nice to meet you tanıştığıma sevindim demektir. Too da sözcüğüyle karşılıklı sevindiğini belirtir.'],
  8:['Your friend says, “How are you?” You feel happy. Which reply fits?','I am fine, thank you.','I am a book.','It is blue.','How are you nasılsın sorusudur. I am fine, thank you iyi olduğumuzu ve teşekkür ettiğimizi bildirir.']
 },
 numbers:{
  0:['There are two red balls and one blue ball. How many balls are there altogether?','Three','Two','Four','Two iki, one bir ve three üç demektir. İki top ile bir top toplam üç toptur.'],
  1:['I have five pencils. I give one pencil to my friend. How many pencils do I have now?','Four','Five','Six','Five beş, one bir, four dört demektir. Beş kalemden biri verilince dört kalır.'],
  2:['One, two, three, ________. Which word comes next?','Four','Seven','One','Sayı dizisi one, two, three, four biçiminde ilerler. Three sonrasında four gelir.'],
  3:['Which word tells the number 8 in English?','Eight','Eighteen','Three','Eight sekizdir. Eighteen on sekiz, three üç demektir.'],
  4:['There are six birds on a branch. Two birds fly away. Which English number tells how many remain?','Four','Six','Eight','Six altı ve two iki olduğundan dört kuş kalır. Four dört sayısının İngilizcesidir.'],
  6:['Ece has three books. Her friend gives her two more. How many books does she have?','Five','Three','Six','Three üç, two iki ve five beş demektir. Üç kitaba iki kitap eklenince beş olur.'],
  7:['Which number word comes just before ten?','Nine','Eleven','Seven','Ten on sayısıdır. Ondan hemen önce dokuz gelir; İngilizcesi nine sözcüğüdür.'],
  8:['Four children are playing. One more child joins them. Which number word tells the new group size?','Five','Four','Six','Four dört çocuk, one bir çocuk daha demektir. Yeni grup beş kişidir: five.'],
  9:['There are ten crayons in a box. Which word means ten?','Ten','Two','One','Ten on demektir. Two iki, one bir sayısıdır.']
 },
 colours:{
  1:['The sun is yellow. The grass is ________. Which colour completes the sentence?','Green','Blue','Red','Grass çimen demektir. Çimenin yaygın rengi green, yani yeşildir.'],
  3:['An orange fruit is orange. A ripe tomato is usually ________.','Red','Purple','Black','Red kırmızıdır. Olgun domatesin yaygın rengi kırmızıdır; orange turuncudur.'],
  5:['A white cloud is beside a blue sky. Which word means white?','White','Blue','Brown','White beyaz, blue mavi, brown kahverengi demektir. Bulutun belirtilen rengi white sözcüğüdür.'],
  7:['A leaf is green. Which English sentence matches it?','It is green.','It is pink.','It is black.','Green yeşil demektir. Yaprak için It is green cümlesi verilen renkle eşleşir.'],
  8:['The night sky is dark and the moon looks white. Which word names the moon’s colour here?','White','Yellow','Red','Metin Ay’ın beyaz göründüğünü söylüyor. White beyaz demektir; diğer renkler metinde verilmez.']
 },
 animals:{
  1:['This animal has four legs, says “meow” and likes to sleep on a sofa. What is it?','A cat','A fish','A bird','Meow sesi kedinin sesidir. Cat kedi demektir; fish balık, bird kuştur.'],
  3:['Which animal can swim and has fins instead of legs?','A fish','A dog','A rabbit','Fish balıktır. Yüzgeçleriyle suda yüzer; köpek ve tavşan bacaklarıyla hareket eder.'],
  5:['A bird can fly. Which animal below can also fly?','A butterfly','A cat','A turtle','Butterfly kelebektir ve uçabilir. Kedi ile kaplumbağa uçmaz.'],
  7:['A sheep gives us wool. Which animal makes a “baa” sound?','A sheep','A lion','A fish','Sheep koyundur. Koyunun sesi baa diye gösterilir ve yününden yararlanılır.'],
  9:['Which animal is small, hops and has long ears?','A rabbit','An elephant','A whale','Rabbit tavşandır; uzun kulaklıdır ve zıplar. Fil ile balina bu özellikleri birlikte taşımaz.']
 },
 classroom:{
  0:['The teacher says, “Please sit down.” What should you do?','Sit on your chair.','Run outside.','Close your eyes.','Sit down otur demektir. Sandalyeye oturmak yönergeyi yerine getirir.'],
  1:['You want to answer a question in class. Which sentence asks for permission?','May I speak, please?','I am a banana.','The sky is green.','May I speak, please? söz almak için nazikçe izin istemektir.'],
  2:['The teacher says, “Open your book to page five.” What do you open?','Your book','The window','Your lunchbox','Open your book kitabını aç demektir. Yönerge pencereyi veya yemek kutusunu söylemez.'],
  3:['Your friend cannot find an eraser. You have a spare one. What can you say?','Here you are.','Good night.','I am a fish.','Here you are bir nesneyi birine uzatırken söylenir. Yedek silgiyi vermeye uygundur.'],
  4:['The teacher says, “Listen and point to the door.” Which action comes first?','Listen.','Point to the door.','Close the door.','Listen and point iki eylemi sırayla verir. İlk eylem dinlemek, sonra kapıyı göstermektir.'],
  5:['You did not hear the teacher clearly. Which sentence asks for repetition?','Can you say it again, please?','I like oranges.','This is my ball.','Say it again yeniden söylemek demektir. Duyulmayan yönerge için bu istek uygundur.'],
  6:['A student drops a pencil. You pick it up and give it back. What might the student say?','Thank you.','Goodbye, class.','I am seven.','Thank you teşekkür etmek için kullanılır. Kalemini geri alan öğrenci böyle karşılık verebilir.'],
  7:['The teacher says, “Do not run in the classroom.” Which action follows the rule?','Walk carefully.','Run quickly.','Jump on a chair.','Do not run koşma demektir. Dikkatli yürümek kurala uyar.'],
  8:['Which English word names the person who teaches a class?','Teacher','Window','Notebook','Teacher öğretmen demektir. Window pencere, notebook defterdir.'],
  9:['At the end of the lesson, the teacher says, “Close your books.” What should students do?','Close their books.','Open their lunchboxes.','Draw on the desk.','Close your books kitaplarınızı kapatın yönergesidir. Ders sonundaki eylem budur.']
 },
 family:{
  0:['My mother has a son. He is not me. Who can he be?','My brother','My aunt','My grandmother','Mother anne, son erkek çocuk ve brother erkek kardeştir. Diğer seçenekler erkek çocuk değildir.'],
  1:['My father’s mother is my ________.','grandmother','brother','sister','Father’s mother babanın annesidir. İngilizcede grandmother büyükanne demektir.'],
  2:['Two children have the same mother and father. What can they call each other?','Brother and sister','Teacher and student','Shopkeeper and customer','Aynı anne ve babanın çocukları kardeştir. Brother erkek kardeş, sister kız kardeştir.'],
  3:['“This is my aunt. She is my mother’s sister.” Who is the aunt?','My mother’s sister','My father','My brother','Cümle aunt sözcüğünü annenin kız kardeşi olarak açıklar. Brother erkek kardeştir.'],
  5:['My dad is reading. My mum is cooking. Who is reading?','My dad','My mum','My sister','Reading okumaktır. Metinde okuyan kişi dad, yani babadır.'],
  6:['My sister is older than me. Which sentence describes her?','She is my older sister.','She is my younger brother.','She is my grandmother.','Older sister abla anlamındadır. Erkek kardeş veya büyükanne değildir.'],
  7:['My grandfather is my mother’s father. Who is he?','My grandfather','My cousin','My uncle','Mother’s father annenin babasıdır. Grandfather dede demektir.'],
  8:['A family photo shows my mum, my dad and my brother. Who is the boy in the photo?','My brother','My grandmother','My aunt','Brother erkek kardeştir. Fotoğraftaki erkek çocuk brother olarak verilmiştir.'],
  9:['My father has a brother. He is my ________.','uncle','sister','mother','Father’s brother babanın erkek kardeşidir. Uncle amca veya dayı anlamında kullanılır.']
 }
};
function replace(q,row,index){const choices=row.slice(1,4),shift=index%3;Object.assign(q,{question:row[0],choices:[...choices.slice(3-shift),...choices.slice(0,3-shift)],correctAnswer:shift,explanation:row[4]});}
export function repairEnglish1(tests,catalog,changes){
 const groups=tests.filter(t=>t.classLevel===1&&t.subject==='ingilizce');
 const byTopic=Object.fromEntries(groups.map(t=>[t.topic,t]));
 // The apple count illustration belongs to Numbers, rather than Greetings.
 [byTopic.greetings.questions[5],byTopic.animals.questions[5]]=[byTopic.animals.questions[5],byTopic.greetings.questions[5]];
 const mapping={numbers:'colours',colours:'animals',animals:'numbers'};
 const topics=catalog.grades[1].subjects.find(s=>s.id==='ingilizce').topics;
 for(const t of groups){
  const from=t.topic,to=mapping[from]||from,topic=topics.find(p=>p.id===to);
  t.topic=to;t.topicName=topic.name;t.slug=`1-sinif-ingilizce-${to}-zor-test-2`;t.pageUrl=`tests/${t.slug}.html`;
  t.questions.forEach((q,i)=>{
   const before=structuredClone(q),row=rows[to]?.[i];
   if(row)replace(q,row,i);
   else if(from==='animals'&&i===5)q.explanation='Görselde beş elma bulunur. Beş sayısının İngilizcesi five sözcüğüdür.';
   else if(from==='animals'){
    const notes={0:'Rabbit tavşandır; uzun kulaklarıyla ve zıplamasıyla tanınır.',2:'Meow miyav sesidir. Bu sesi çıkaran hayvan cat, yani kedidir.',4:'Fish balıktır. Suda yüzer ve bacakları yoktur.',8:'Giraffe zürafadır; çok uzun boynuyla tanınır.',9:'Sheep koyundur. Yünü tekstilde kullanılır.'};
    q.explanation=notes[i]||q.explanation;
   }
   if(q.image)q.image=`images/tests/${t.slug}-soru-${i+1}.svg`;
   changes.push({id:q.id,reasons:['verified_english_topic_and_context'],fromTopic:from,toTopic:to,before,after:structuredClone(q)});
  });
 }
}
