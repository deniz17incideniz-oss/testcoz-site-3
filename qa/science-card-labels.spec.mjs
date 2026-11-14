import {test,expect} from '@playwright/test';
for(const x of [
 {topic:'bilimsel-kesif-yolculugu',step:8,caption:'Sabah: 18 °C',wrong:'Gün boyunca sürekli',reason:'Ölçüm saatleri arasındaki değişimin ayrıntısı bilinmez'},
 {topic:'yasamimizi-kolaylastiran-elektrik',step:8,caption:'Boş oda: 2 saat',wrong:'Ödev sırasındaki 1 saat',reason:'2 saat'},
 {topic:'canlilarin-yasam-alanlarina-yolculuk',step:5,caption:'güvenli yuva yeri',wrong:'İkisi de aynı yuvada',reason:'uygun koşullara'}
])test(`science comparison card ${x.topic}`,async({page,request})=>{
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
