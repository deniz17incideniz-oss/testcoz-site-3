import {test,expect} from '@playwright/test';
test('family vocabulary uses an inclusive translation of parents',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-ingilizce-family-life-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===3){await expect(area).toContainText('My parents');await expect(area).toContainText('Ebeveynlerim');await area.locator('[data-choice]').filter({hasText:'Teyzem ve amcam'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'My parents'})).toContainText('my parents ise ebeveynlerim demektir');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
