import {test,expect} from '@playwright/test';
test('school dialogue exposes text to assistive technology and complete English choices',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/2-sinif-ingilizce-school-life-kolay-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===8){await expect(area.locator('img')).toHaveAttribute('alt',/Where is the library\?.*It is next to the classroom/);await expect(area).toContainText('Where is the library? — It is next to the classroom.');}
  if(n===9){await expect(area).toContainText('She reads a book in the library.');await area.locator('[data-choice]').filter({hasText:'She sleeps all day.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Emma reads a book in the library'})).toContainText('Emma’nın yaptığı iş okumaktır');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
