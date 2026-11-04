import {test,expect} from '@playwright/test';

for(const [topic,difficulty,skip,question,wrong,explanation] of [
 ['bolme','kolay',3,'Hangi bölme işleminin sonucu','72 ÷ 9','45 ÷ 5 = 9'],
 ['bolme','orta',4,'diğer üç işlemin bölümünden','480 ÷ 6','360 ÷ 4 = 90'],
 ['carpma','orta',4,'45 × 16','Yalnız ilk ikisi eşittir.','30 × 24 = 720']
]) test(`${topic} ${difficulty}: reviewed comparison and explanation on mobile`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/4-sinif-matematik-${topic}-${difficulty}-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<skip;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText(question);
 await page.locator('[data-choice]').filter({hasText:wrong}).click();
 await page.locator('#nextQuestion').click();
 for(let i=skip+1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').filter({hasText:question})).toContainText(explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
