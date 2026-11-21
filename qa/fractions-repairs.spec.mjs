import {test,expect} from '@playwright/test';

for(const [difficulty,width,wrong,correct,explanation] of [
 ['kolay',320,'8/3','3/8','Pay 3, payda 8'],
 ['orta',375,'6','9','3 × 3 = 9']
]) test(`fractions ${difficulty}: mobile answer review explains the result`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width,height:850});
 await page.goto(`/tests/4-sinif-matematik-kesirler-${difficulty}-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('[data-choice]').filter({hasText:wrong}).click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 const first=page.locator('.wrong-item').first();
 await expect(first).toContainText(correct);
 await expect(first).toContainText(explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
