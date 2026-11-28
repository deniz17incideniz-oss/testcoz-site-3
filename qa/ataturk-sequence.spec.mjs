import {test,expect} from '@playwright/test';
test('first grade Anıtkabir question distinguishes before, during and after',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-turkce-mustafa-kemalden-ataturke-zor-test-2.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<8;i++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea');await expect(area).toContainText('Anıtkabir gezisinden sonra');for(const text of ['Geziden önce','Gezi sırasında','Geziden sonra'])await expect(area.getByRole('radio',{name:text,exact:false})).toBeVisible();
 await area.getByRole('radio',{name:'Gezi sırasında',exact:false}).click();await page.locator('#nextQuestion').click();await page.locator('#skipQuestion').click();
 await expect(page.locator('.wrong-item').filter({hasText:'Anıtkabir gezisinden sonra'})).toContainText('Geziden sonra');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
