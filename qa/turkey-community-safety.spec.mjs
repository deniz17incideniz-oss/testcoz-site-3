import {test,expect} from '@playwright/test';
test('emergency number and national flag questions specify Turkey',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/2-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===1){await expect(area).toContainText('güvendiği bir yetişkinin yardımıyla');await expect(area).toContainText('Belediyenin resmî internet sayfasına');}
  if(n===5){await expect(area).toContainText('Şemsi Efendi Mektebinde');await expect(area).toContainText('Öğrencilik yılları');}
  if(n===6){await expect(area).toContainText('Türkiye’de yangın');await expect(area).toContainText('112');await area.locator('[data-choice]').filter({hasText:'101'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===10){await expect(area).toContainText('Türk bayrağında');await expect(area).toContainText('Ay ve yıldız');}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Türkiye’de yangın'})).toContainText('112 Türkiye’de acil yardım');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
