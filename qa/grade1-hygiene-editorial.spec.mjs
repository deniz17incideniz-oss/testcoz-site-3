import {test,expect} from '@playwright/test';
test('health questions avoid misleading cards and explain safe medicine use',async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===2){await expect(area).toContainText('Elif ellerini sabunla');await expect(area.locator('img')).toHaveCount(0);await area.locator('[data-choice]').filter({hasText:'Can’ın ellerini peçeteyle silmesi'}).click();await page.locator('#nextQuestion').click();}
  else if(n===7){await expect(area).toContainText('Kendini hasta hisseden');await area.locator('[data-choice]').filter({hasText:'Arkadaşına verilen ilacı'}).click();await page.locator('#nextQuestion').click();}
  else await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Elif ellerini sabunla'})).toContainText('Elif’in ellerini yıkaması');
 await expect(page.locator('.wrong-item').filter({hasText:'Kendini hasta hisseden'})).toContainText('Doktor ilaç önerirse');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
