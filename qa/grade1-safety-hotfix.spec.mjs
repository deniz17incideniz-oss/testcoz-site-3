import {test,expect} from '@playwright/test';
test('first grade safety questions have matching answers and explanations',async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-sagligim-ve-guvenligim-zor-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=1;i<=10;i++){
  const area=page.locator('#questionArea');
  if(i===5){await expect(area).toContainText('ellerimizi neden sabunla');await expect(area.locator('img')).toHaveCount(0);await area.locator('[data-choice]').filter({hasText:'Ayakkabılarımızı'}).click();await page.locator('#nextQuestion').click();}
  else if(i===7){await expect(area).toContainText('ev adresini soruyor');await area.locator('[data-choice]').filter({hasText:'hemen göndermeliyim'}).click();await page.locator('#nextQuestion').click();}
  else if(i===9){await expect(area).toContainText('Dişlerini fırçalayan');await page.locator('#skipQuestion').click();}
  else if(i===10){await expect(area).toContainText('kablosunun yıprandığını');await expect(area.locator('img')).toHaveCount(0);await area.locator('[data-choice]').filter({hasText:'elimle düzeltmeye'}).click();await page.locator('#nextQuestion').click();}
  else await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'ellerimizi neden sabunla'})).toContainText('mikropların uzaklaşmasına');
 await expect(page.locator('.wrong-item').filter({hasText:'ev adresini soruyor'})).toContainText('kişisel bilgileri');
 await expect(page.locator('.wrong-item').filter({hasText:'kablosunun yıprandığını'})).toContainText('bir yetişkine haber');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
