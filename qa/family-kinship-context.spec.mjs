import {test,expect} from '@playwright/test';
test('family terms and time references stay faithful to the text',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-ingilizce-family-life-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===3){await expect(area).toContainText('yemekten sonra okuduğu söylenen kimdir');await area.locator('[data-choice]').filter({hasText:'Dad'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===5){await area.locator('[data-choice]').filter({hasText:'Mother and cousin'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Mum reads after dinner'})).toContainText('Anne yemekten sonra');
 await expect(page.locator('.wrong-item').filter({hasText:'Grandma has two children'})).toContainText('amcam veya dayım gibi');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
