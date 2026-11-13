import {test,expect} from '@playwright/test';
test('two contextual safety questions retain appropriate feedback',async({page})=>{
 await page.route('https://**/*',route=>route.abort());
 await page.setViewportSize({width:375,height:667});
 await page.goto('/test.html?sinif=1&ders=hayat-bilgisi&konu=sagligim-ve-guvenligim&zorluk=zor&test=1');
 for(let i=1;i<=10;i++){
  const area=page.locator('#questionArea');
  if(i===2 || i===6){
   await expect(area).toContainText(i===2?'Tanımadığın biri kapıyı çalıyor':'Yerde bir ilaç buldun');
   await expect(area.locator('[data-choice]')).toHaveCount(3);
   await expect(area.locator('img')).toHaveCount(0);
   await area.locator('[data-choice]').nth(1).click();
   await page.locator('#nextQuestion').click();
  }else if(i===10) await page.locator('#nextQuestion').click();
  else await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Tanımadığın biri kapıyı çalıyor'})).toContainText('Kapıyı açmadan yetişkine haber');
 await expect(page.locator('.wrong-item').filter({hasText:'Yerde bir ilaç buldun'})).toContainText('İlacı almadan bir yetişkine haber');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
