import {test,expect} from '@playwright/test';

for(const [level,skip,question,wrong,solution] of [
 ['kolay',5,'Bir kalem 12 cm','28 cm','40 mm = 4 cm'],
 ['orta',7,'dikdörtgenin çevresine','2 m 60 cm','İki sıra 520 cm']
]) test(`uzunluk ${level}: mobile review preserves correct unit conversion`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/4-sinif-matematik-uzunluk-olcme-${level}-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<skip;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText(question);
 await page.locator('[data-choice]').filter({hasText:wrong}).click();
 await page.locator('#nextQuestion').click();
 for(let i=skip+1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').filter({hasText:question})).toContainText(solution);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
