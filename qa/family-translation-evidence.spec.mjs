import {test,expect} from '@playwright/test';
test('family translations retain the speaker and possessive meaning',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-ingilizce-family-life-kolay-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===2){await expect(area).toContainText('cümlesini söyleyen kişiye göre Can kimdir');await area.locator('[data-choice]').filter({hasText:'Kız kardeş'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===8){await area.locator('[data-choice]').filter({hasText:'He is happy.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'My brother is Can'})).toContainText('erkek kardeşinin Can olduğunu söylüyor');
 await expect(page.locator('.wrong-item').filter({hasText:'Who is he'})).toContainText('O benim babamdır.');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
