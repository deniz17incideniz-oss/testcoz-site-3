import {test,expect} from '@playwright/test';
import os from 'node:os';import path from 'node:path';
const cases=[
 {slug:'bilimsel-kesif-yolculugu',first:'1. deneme: Güneşteki buz önce eridi.',second:'2. deneme: Güneşteki buz önce eridi.',explanation:'İki denemede de güneşteki buzun önce eridiği'},
 {slug:'yer-bilimciler-is-basinda',first:'1. kayaç: çizildi.',second:'2. kayaç: çizilmedi.',explanation:'birinci kayaç çizilmiş, ikinci kayaç çizilmemiştir'},
 {slug:'maddeyi-taniyalim-karistirip-ayiralim',first:'1. eleme: çakıl üstte, kum altta.',second:'2. eleme: çakıl üstte, kum altta.',explanation:'Her iki elemede de iri çakıl üstte, kum altta kalmıştır'},
 {slug:'yasamimizi-kolaylastiran-elektrik',first:'Oda lambası: düğme kapanınca söndü.',second:'Masa lambası: düğme kapanınca söndü.',explanation:'Her iki lambanın düğmesi kapatılınca ışığının söndüğü'},
 {slug:'canlilarin-yasam-alanlarina-yolculuk',first:'Önce: çalıda iki kuş yuvası görüldü.',second:'Sonra: çalı kaldırılmış, aynı yerde yuva görülmedi.',explanation:'kuşların nereye gittiğini göstermez',habitat:true}
];
for(const item of cases)test(`${item.slug}: evidence and accessible visual agree`,async({page,request})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-fen-bilimleri-${item.slug}-zor-test-1.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<9;n++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(img).toBeVisible();await expect(img).toHaveAttribute('alt',`Gözlem kayıtları. ${item.first} ${item.second}`);
 await expect(area.locator('[data-choice]')).toHaveCount(4);const correct=item.habitat?'Canlıları rahatsız etmeden yeni gözlemler yapıp kayıtlarla karşılaştırmak':'Benzer koşullarda yeni gözlemler yapıp kayıtlarla karşılaştırmak';await expect(area).toContainText(correct);
 const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();
 const visual=await page.evaluate(markup=>{const div=document.createElement('div');div.style='position:fixed;left:-2000px;top:0;width:720px';div.innerHTML=markup;document.body.appendChild(div);const root=div.querySelector('svg'),v=root.viewBox.baseVal;const failures=[...root.querySelectorAll('text')].map(e=>{const b=e.getBBox();return {text:e.textContent,x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height}}).filter(b=>b.x<18||b.y<18||b.right>v.width-18||b.bottom>v.height-18);const labels=[...root.querySelectorAll('text')].map(e=>e.textContent);div.remove();return {failures,labels};},svg);
 expect(visual.failures).toEqual([]);expect(visual.labels).toContain('1. kayıt');expect(visual.labels).toContain('2. kayıt');expect(visual.labels).not.toContain('A');expect(visual.labels).not.toContain('B');
 await img.screenshot({path:path.join(os.tmpdir(),`testcoz-${item.slug}-evidence.png`)});
 await area.locator('[data-choice]').filter({hasText:'Kayıtları silmek'}).click();await page.locator('#nextQuestion').click();await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:item.explanation});await expect(review).toContainText(correct);await expect(review).toContainText(item.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
