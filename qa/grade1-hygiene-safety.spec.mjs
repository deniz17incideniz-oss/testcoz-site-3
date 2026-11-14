import {test,expect} from '@playwright/test';
test('first grade hygiene question has one clear answer without misleading card labels',async({page})=>{
 await page.route('https://**/*',route=>route.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea');
 await expect(area).toContainText('Elif ellerini sabunla');
 await expect(area.locator('[data-choice]')).toHaveCount(4);
 await expect(area.locator('img')).toHaveCount(0);
 await area.locator('[data-choice]').filter({hasText:'Can’ın ellerini peçeteyle silmesi'}).click();
 await page.locator('#nextQuestion').click();
 for(let n=3;n<=10;n++)await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:'Elif ellerini sabunla'});
 await expect(review).toContainText('Elif’in ellerini yıkaması');
 await expect(review).toContainText('sabun ve suyla');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
