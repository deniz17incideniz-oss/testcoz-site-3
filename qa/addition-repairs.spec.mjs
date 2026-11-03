import {test,expect} from '@playwright/test';

test('addition: mobile test retains worked feedback for an incorrect answer',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/4-sinif-matematik-toplama-kolay-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('[data-choice]').filter({hasText:'3 569'}).click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').first()).toContainText('3 579');
 await expect(page.locator('.wrong-item').first()).toContainText('2 345 + 1 234 = 3 579');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('addition medium: rounding question and worked feedback appear on mobile',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:375,height:850});
 await page.goto('/tests/4-sinif-matematik-toplama-orta-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<5;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText('en yakın yüzlüğe');
 await page.locator('[data-choice]').filter({hasText:'5 900'}).click();
 await page.locator('#nextQuestion').click();
 for(let i=0;i<4;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').filter({hasText:'en yakın yüzlüğe'})).toContainText('2 500 + 3 500 = 6 000');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
