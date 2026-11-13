import {test,expect} from '@playwright/test';

test('grade 3 environment test removes contradictory cards and explains habitat and reuse',async({page})=>{
 await page.route('https://**/*',route=>route.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-hayat-bilgisi-doga-ve-cevre-orta-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=1;i<=10;i++){
  const area=page.locator('#questionArea');
  await expect(area.locator('[data-choice]')).toHaveCount(3);
  if([2,5,8,10].includes(i))await expect(area.locator('img')).toHaveCount(0);
  if(i===6){await expect(area).toContainText('yaşam alanıdır');await area.locator('[data-choice]').filter({hasText:'yalnızca bir tür'}).click();await page.locator('#nextQuestion').click();}
  else if(i===8){await expect(area).toContainText('yeniden kullanmış');await area.locator('[data-choice]').filter({hasText:'geri dönüşüm tesisinde ham maddeye'}).click();await page.locator('#nextQuestion').click();}
  else {if(i===9)await expect(area).toContainText('12');await page.locator('#skipQuestion').click();}
 }
 await expect(page.locator('.wrong-item').filter({hasText:'gölet'})).toContainText('barınak');
 await expect(page.locator('.wrong-item').filter({hasText:'karton kutu'})).toContainText('yeniden kullanmak');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
