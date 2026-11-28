import {test,expect} from '@playwright/test';
for(const scenario of [
 {slug:'1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1',caption:'Mert: yavaş yürüyor',wrong:'Ada’nın koşması',solution:'yavaş ve dikkatli yürümek'},
 {slug:'1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-kolay-test-1',caption:'Ece: yemekten önce ellerini yıkıyor',wrong:'Bora’nın yıkamadan yemesi',solution:'elleri sabun ve suyla yıkamak'}
]) test(`reviewed image and feedback: ${scenario.slug}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/${scenario.slug}.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea img')).toBeVisible();
 await expect(page.locator('.evidence-caption')).toContainText(scenario.caption);
 await expect(page.getByRole('radiogroup').getByRole('radio')).toHaveCount(3);
 await page.getByRole('radio',{name:scenario.wrong}).click();
 await page.locator('#nextQuestion').click();
 for(let i=2;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.wrong-item').filter({hasText:scenario.wrong})).toContainText(scenario.solution);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
