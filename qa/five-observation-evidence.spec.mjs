import {test,expect} from '@playwright/test';
// Both production and draft variants are authored separately. Reject unknown variants.
const cases=[
 {slug:'bilimsel-kesif-yolculugu',variants:[
  {evidence:'Eşit büyüklükteki buzlarla yapılan iki denemede',first:'1. deneme: Güneşteki buz önce eridi.',second:'2. deneme: Güneşteki buz önce eridi.',wrong:'Kayıtları silmek',correct:'Benzer koşullarda yeni gözlemler yapıp kayıtlarla karşılaştırmak',explanation:'İki denemede de güneşteki buzun önce eridiği',count:4,labels:['1. kayıt','2. kayıt']},
  {evidence:'sabah 18 °C, öğle 22 °C, akşam 20 °C',first:'Sabah: 18 °C; öğle: 22 °C',second:'Akşam: 20 °C',wrong:'Gün boyunca sürekli ısınmıştır.',correct:'Öğle sıcaklığı sabahtan yüksek, akşam sıcaklığı öğlenden düşüktür.',explanation:'Ölçüm saatleri arasındaki değişimin ayrıntısı bilinmez',count:3,labels:[]}]},
 {slug:'yer-bilimciler-is-basinda',variants:[
  {evidence:'İki kayaç aynı cisimle, aynı kuvvet uygulanarak',first:'1. kayaç: çizildi.',second:'2. kayaç: çizilmedi.',wrong:'Kayıtları silmek',correct:'Benzer koşullarda yeni gözlemler yapıp kayıtlarla karşılaştırmak',explanation:'birinci kayaç çizilmiş, ikinci kayaç çizilmemiştir',count:4,labels:['1. kayıt','2. kayıt']},
  {evidence:'Süzülen su kayıtları:',first:'Az toprak birikti',second:'Çok toprak birikti',wrong:'Her kapta biriken toprağın rengini karşılaştırmak',correct:'Her kapta biriken toprağın miktarını aynı koşullarda, aynı yöntemle ölçmek',explanation:'Suyun eşit miktarı ise deney koşuludur',count:3,labels:['1','2']}]},
 {slug:'maddeyi-taniyalim-karistirip-ayiralim',variants:[
  {evidence:'Kum ve iri çakıl karışımı iki kez eleniyor',first:'1. eleme: çakıl üstte, kum altta.',second:'2. eleme: çakıl üstte, kum altta.',wrong:'Kayıtları silmek',correct:'Benzer koşullarda yeni gözlemler yapıp kayıtlarla karşılaştırmak',explanation:'Her iki elemede de iri çakıl üstte, kum altta kalmıştır',count:4,labels:['1. kayıt','2. kayıt']},
  {evidence:'Ayırma sırası:',first:'İri çakıl, demir ataş ve mıknatısın çekmediği kum',second:'Mıknatısla yalnızca ataşlar alındı',wrong:'Mıknatısın kumu da çekmesi beklenir.',correct:'Uygun delikli elekle kum ve çakıl ayrılır.',explanation:'bu karışımdaki kumun mıknatısla çekilmediği de belirtilmiştir',count:3,labels:[]}]},
 {slug:'yasamimizi-kolaylastiran-elektrik',variants:[
  {evidence:'İki lambanın düğmesi kapatıldığında',first:'Oda lambası: düğme kapanınca söndü.',second:'Masa lambası: düğme kapanınca söndü.',wrong:'Kayıtları silmek',correct:'Benzer koşullarda yeni gözlemler yapıp kayıtlarla karşılaştırmak',explanation:'Her iki lambanın düğmesi kapatılınca ışığının söndüğü',count:4,labels:['1. kayıt','2. kayıt']},
  {evidence:'Günlük kayıt: masa lambası 1 saat ödev sırasında',first:'Ödev: 1 saat',second:'Boş oda: 2 saat',wrong:'Ödev sırasındaki 1 saat',correct:'Boş odadaki 2 saat',explanation:'Oda boşaldıktan sonraki iki saat gereksiz kullanım',count:3,labels:[]}]},
 {slug:'canlilarin-yasam-alanlarina-yolculuk',variants:[
  {evidence:'Bir alandaki iki gözlem kaydı görselde verilmiştir',first:'Önce: çalıda iki kuş yuvası görüldü.',second:'Sonra: çalı kaldırılmış, aynı yerde yuva görülmedi.',wrong:'Kayıtları silmek',correct:'Canlıları rahatsız etmeden yeni gözlemler yapıp kayıtlarla karşılaştırmak',explanation:'kuşların nereye gittiğini göstermez',count:4,labels:['1. kayıt','2. kayıt']},
  {evidence:'Gözlem listeleri: ormanda çam, sincap, serçe',first:'Orman: çam, sincap, serçe',second:'Gölet: saz, kurbağa, balık',wrong:'Her iki listede de yalnız hayvanlar vardır.',correct:'Ortamlar farklı canlılara yaşam alanı sağlayabilir.',explanation:'Listelerde hem bitkiler hem hayvanlar bulunur.',count:3,labels:[]}]}
];
for(const item of cases)test(`${item.slug}: evidence and accessible visual agree`,async({page,request})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-fen-bilimleri-${item.slug}-zor-test-1.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<9;n++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(img).toBeVisible();
 const content=await area.innerText(),matches=item.variants.filter(v=>content.includes(v.evidence));expect(matches).toHaveLength(1);const v=matches[0];
 await expect(img).toHaveAttribute('alt',new RegExp(v.first.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));await expect(img).toHaveAttribute('alt',new RegExp(v.second.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));
 await expect(area.locator('[data-choice]')).toHaveCount(v.count);await expect(area.locator('[data-choice]').filter({hasText:v.correct})).toHaveCount(1);
 const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();
 const visual=await page.evaluate(markup=>{const div=document.createElement('div');div.style='position:fixed;left:-2000px;top:0;width:720px';div.innerHTML=markup;document.body.appendChild(div);const root=div.querySelector('svg'),vb=root.viewBox.baseVal;const failures=[...root.querySelectorAll('text')].map(e=>{const b=e.getBBox();return {text:e.textContent,x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height}}).filter(b=>b.x<18||b.y<18||b.right>vb.width-18||b.bottom>vb.height-18);const labels=[...root.querySelectorAll('text')].map(e=>e.textContent);div.remove();return {failures,labels};},svg);
 expect(visual.failures).toEqual([]);for(const label of v.labels)expect(visual.labels).toContain(label);expect(visual.labels).not.toContain('A');expect(visual.labels).not.toContain('B');
 await area.locator('[data-choice]').filter({hasText:v.wrong}).click();await page.locator('#nextQuestion').click();await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:v.evidence});await expect(review).toContainText(v.correct);await expect(review).toContainText(v.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
