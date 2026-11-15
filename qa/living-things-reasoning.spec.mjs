import {test,expect} from '@playwright/test';
test('living things questions distinguish observation and classification',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-canlilar-dunyasina-yolculuk-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===2){await expect(area).toContainText('Hareket eden her şey canlı değildir');await expect(area).toContainText('Oyuncağın pille yürümesi onun beslendiğini');}
  if(n===8){await expect(area).toContainText('martta 20 cm, haziranda 25 cm');await area.locator('[data-choice]').filter({hasText:'Yavrunun boyu her ay tam 5 cm artmıştır.'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===10){await expect(area).toContainText('Mantar ve papatya bitki, kuş hayvandır.');await expect(area).toContainText('Mantar ve kuş hayvan, papatya bitkidir.');}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'kedi yavrusunun boyu'})).toContainText('bu iki ölçüm boy artışını gösterir');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
