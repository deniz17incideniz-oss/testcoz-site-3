import {test,expect} from '@playwright/test';
for(const x of [
 {slug:'1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1',hasVisual:false,caption:'Elif ellerini sabunla',wrong:'Can’ın ellerini peçeteyle silmesi',solution:'mikropların azalmasına'},
 {slug:'2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1',caption:'Ayşe: emniyet kemerini takıyor',wrong:'Eren’in kemerini takmaması',solution:'yaralanma riskini azaltmaya'}
]) test(`safety visuals and feedback ${x.slug}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});await page.goto(`/tests/${x.slug}.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();await page.locator('#skipQuestion').click();
 if(x.hasVisual===false){await expect(page.locator('#questionArea img')).toHaveCount(0);await expect(page.locator('#questionArea')).toContainText(x.caption);}else{await expect(page.locator('#questionArea img')).toBeVisible();await expect(page.locator('.evidence-caption')).toContainText(x.caption);}
 await expect(page.getByRole('radiogroup').getByRole('radio')).toHaveCount(3);await page.getByRole('radio',{name:x.wrong}).click();await page.locator('#nextQuestion').click();
 for(let i=2;i<10;i++)await page.locator('#skipQuestion').click();await expect(page.locator('.wrong-item').filter({hasText:x.wrong})).toContainText(x.solution);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('personal information answer concerns privacy rather than germs',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.goto('/tests/1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<5;i++)await page.locator('#skipQuestion').click();await expect(page.locator('#questionArea')).toContainText('ev adresini');await page.getByRole('radio',{name:/Adresimi hemen/}).click();await page.locator('#nextQuestion').click();
 for(let i=6;i<10;i++)await page.locator('#skipQuestion').click();await expect(page.locator('.wrong-item').filter({hasText:'ev adresini'})).toContainText('Kişisel bilgilerini paylaşmadan önce');
});
