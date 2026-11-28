import {test,expect} from '@playwright/test';
test('school collaboration and notices provide clear evidence',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===1){await area.locator('[data-choice]').filter({hasText:'Can bütün işleri yapar'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===2)await expect(area).toContainText('yalnızca salı ve perşembe');if(n===6)await expect(area).toContainText('aynı etkinlik için');await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Grup afiş hazırlıyor'})).toContainText('Selin’in başlığı yazması ve Can’ın resimleri çizmesi');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
