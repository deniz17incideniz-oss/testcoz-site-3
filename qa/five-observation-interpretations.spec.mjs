import {test,expect} from '@playwright/test';
import os from 'node:os';import path from 'node:path';
const cases=[
 {slug:'bilimsel-kesif-yolculugu',observation:'Güneşteki buz gölgedekinden önce eridi.',interpretation:'Güneş, bu denemede erimeyi hızlandırmış olabilir.',explanation:'Güneşin erimeyi hızlandırmış olabileceği düşüncesi'},
 {slug:'yer-bilimciler-is-basinda',observation:'Bir kayaçta farklı renkli taneler görüldü.',interpretation:'Taneler farklı mineraller olabilir.',explanation:'farklı mineraller olabileceği yorumu ek incelemeyle araştırılabilir'},
 {slug:'maddeyi-taniyalim-karistirip-ayiralim',observation:'Mıknatıs demir parçalarını çekti.',interpretation:'Demir mıknatısa çekilebilen maddelere örnek olabilir.',explanation:'Demirin mıknatısa çekilebilen maddelere örnek olabileceği düşüncesi'},
 {slug:'yasamimizi-kolaylastiran-elektrik',observation:'Düğme kapatılınca lamba söndü.',interpretation:'Düğme lambanın ışığını kontrol ediyor olabilir.',explanation:'Düğmenin lambanın ışığını kontrol ediyor olabileceği düşüncesi'},
 {slug:'canlilarin-yasam-alanlarina-yolculuk',observation:'Gölette kurbağa, böcek ve su bitkisi görüldü.',interpretation:'Gölet farklı canlılara yaşam alanı sağlıyor olabilir.',explanation:'Göletin farklı canlılara yaşam alanı sağlıyor olabileceği düşüncesi'}
];
for(const item of cases)test(`${item.slug}: observation and interpretation agree`,async({page,request})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-fen-bilimleri-${item.slug}-zor-test-1.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<3;n++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(img).toBeVisible();await expect(img).toHaveAttribute('alt',`Gözlem: ${item.observation} Yorum: ${item.interpretation}`);
 await expect(area.locator('[data-choice]')).toHaveCount(4);const correct='Gözlem duyularla elde edilir, yorum veriye anlam verir.';await expect(area).toContainText(correct);
 const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();
 const visual=await page.evaluate(markup=>{const div=document.createElement('div');div.style='position:fixed;left:-2000px;top:0;width:480px';div.innerHTML=markup;document.body.appendChild(div);const root=div.querySelector('svg'),v=root.viewBox.baseVal;const failures=[...root.querySelectorAll('text')].map(e=>{const b=e.getBBox();return {text:e.textContent,x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height}}).filter(b=>b.x<18||b.y<18||b.right>v.width-18||b.bottom>v.height-18);const labels=[...root.querySelectorAll('text')].map(e=>e.textContent);div.remove();return {failures,labels};},svg);
 expect(visual.failures).toEqual([]);expect(visual.labels).toContain('Gözlem');expect(visual.labels).toContain('Yorum');expect(visual.labels).not.toContain('A');expect(visual.labels).not.toContain('B');
 await img.screenshot({path:path.join(os.tmpdir(),`testcoz-${item.slug}-interpretation.png`)});
 await area.locator('[data-choice]').filter({hasText:'Gözlem her zaman kişisel görüştür.'}).click();await page.locator('#nextQuestion').click();for(let n=4;n<=10;n++)await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:'Hangisi gözlem ile yorum arasındaki farkı'});await expect(review).toContainText(correct);await expect(review).toContainText(item.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
