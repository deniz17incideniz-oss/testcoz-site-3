import {test,expect} from '@playwright/test';

test('reviewed Gemini multiplication: mobile answer and explanation',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/4-sinif-matematik-carpma-kolay-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('[data-choice]').filter({hasText:'50'}).click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').first()).toContainText('12 × 5 = 60');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
