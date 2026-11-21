import {test,expect} from '@playwright/test';

for(const [difficulty,width,skips,wrong,question,solution] of [
 ['kolay',320,0,'2 512','3 764 − 1 352','Sonuç 2 412'],
 ['orta',375,5,'3 300','en yakın yüzlüğe','4 700 − 1 300 = 3 400']
]) test(`subtraction ${difficulty}: mobile feedback explains the chosen question`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width,height:850});
 await page.goto(`/tests/4-sinif-matematik-cikarma-${difficulty}-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<skips;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText(question);
 await page.locator('[data-choice]').filter({hasText:wrong}).click();
 await page.locator('#nextQuestion').click();
 for(let i=skips+1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').filter({hasText:question})).toContainText(solution);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
