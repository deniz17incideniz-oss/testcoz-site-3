import {test,expect} from '@playwright/test';

test('reviewed first-grade school test has three choices and actionable feedback',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await expect(page.getByRole('radiogroup').getByRole('radio')).toHaveCount(3);
 await expect(page.locator('#questionArea')).toContainText('Ders programına');
 await page.getByRole('radio',{name:/Hava durumuna/}).click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').first()).toContainText('Ders programı');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
