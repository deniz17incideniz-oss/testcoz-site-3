import {test,expect} from '@playwright/test';
for(const x of [
 {topic:'bilimsel-kesif-yolculugu',step:8,caption:'Sabah: 18 °C',wrong:'Gün boyunca sürekli',reason:'Ölçüm saatleri arasındaki değişimin ayrıntısı bilinmez'},
 {topic:'yasamimizi-kolaylastiran-elektrik',step:8,caption:'Boş oda: 2 saat',wrong:'Ödev sırasındaki 1 saat',reason:'2 saat'},
 {topic:'canlilarin-yasam-alanlarina-yolculuk',step:5,caption:'güvenli yuva yeri',wrong:'İkisi de aynı yuvada',reason:'uygun koşullara'},
 {topic:'canlilar-dunyasina-yolculuk',step:8,caption:'Fasulye: 3 cm',wrong:'Boyu 5 cm olan her şey cansızdır',reason:'6 − 3 = 3 cm'},
 {topic:'canlilar-dunyasina-yolculuk',step:9,caption:'Öğrencinin etiketi',wrong:'Üçü de yer kapladığı için bitkidir',reason:'Mantarlar bitkilerden ayrı bir gruptur'}
])test(`science comparison card ${x.topic} question ${x.step+1}`,async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 const slug=`3-sinif-fen-bilimleri-${x.topic}-zor-test-1`;
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<x.step;i++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(img).toHaveCount(1);await expect(img).toHaveAttribute('alt',/.+/);
 await expect(area.locator('.evidence-caption')).toContainText(x.caption);
 const src=await img.getAttribute('src'),svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
 await area.locator('[data-choice]').filter({hasText:x.wrong}).click();await page.locator('#nextQuestion').click();
 for(let i=x.step+1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.wrong-item').filter({hasText:x.wrong})).toContainText(x.reason);
 if(x.topic==='bilimsel-kesif-yolculugu')await expect(page.locator('.wrong-item').filter({hasText:x.wrong})).toContainText('sabahki 18 °C’den yüksektir');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});


test('living things questions stay within the evidence and grade language',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-canlilar-dunyasina-yolculuk-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await expect(page.locator('#questionArea')).toContainText('Zaman içinde büyüyüp uzaması');
 for(let i=0;i<7;i++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea');await expect(area).toContainText('Kedi büyür ve yetişkin bir kedi olur');await expect(area).not.toContainText('tür');
});


for(const x of [{step:2,first:'Tohum:',second:'Taş:',answer:'Islanmak tek başına canlılık değildir'},{step:5,first:'Kedi, kelebek, serçe',second:'Gül, çam, fasulye',answer:'1. karttakiler hayvan, 2. karttakiler bitkidir'}])test(`numbered groups match question ${x.step+1}`,async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-canlilar-dunyasina-yolculuk-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<x.step;i++)await page.locator('#skipQuestion').click();const area=page.locator('#questionArea');await expect(area).toContainText('1. kart');await expect(area).toContainText('2. kart');await expect(area.locator('.evidence-caption')).toContainText(x.first);await expect(area.locator('.evidence-caption')).toContainText(x.second);await expect(area.locator('[data-choice]').filter({hasText:x.answer})).toBeVisible();
 await expect(area.locator('.evidence-caption ol')).toHaveCount(1);const img=area.locator('img');await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);const src=await img.getAttribute('src'),svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');expect(svg).not.toMatch(/class="value">[AB]<\/text>/);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
