import {test,expect} from '@playwright/test';
test('first grade school corrections show coherent feedback on mobile',async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=1;i<=10;i++){
  const area=page.locator('#questionArea');
  if(i===3){await expect(area).toContainText('Arkadaşı henüz sözünü bitirmedi');await area.locator('[data-choice]').filter({hasText:'sözünü kesmelidir'}).click();await page.locator('#nextQuestion').click();}
  else if(i===5){await expect(area).toContainText('parmak kaldırıyor');await expect(area.locator('img')).toHaveCount(0);await page.locator('#skipQuestion').click();}
  else if(i===7){await expect(area).toContainText('koridorunda neden koşmadan');await area.locator('[data-choice]').filter({hasText:'daha hızlı toplamak'}).click();await page.locator('#nextQuestion').click();}
  else if(i===10){await expect(area).toContainText('sınıfının yerini bulamıyor');await expect(area.locator('img')).toHaveCount(0);await area.locator('[data-choice]').filter({hasText:'aynı anda konuşmasına'}).click();await page.locator('#nextQuestion').click();}
  else await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'sözünü bitirmedi'})).toContainText('sözünü bitirmesini beklemek');
 await expect(page.locator('.wrong-item').filter({hasText:'koridorunda neden'})).toContainText('çarpışma ve düşme');
 await expect(page.locator('.wrong-item').filter({hasText:'sınıfının yerini bulamıyor'})).toContainText('aradığı sınıfa ulaşmasına');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
