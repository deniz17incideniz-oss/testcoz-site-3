import {test,expect} from '@playwright/test';
for(const item of [
 {slug:'classroom-life',alt:/What is this\?.*It is a ruler\./,answer:'Tom puts his notebook on the desk.',wrong:'She sleeps all day.',review:'defterini sıranın üstüne koyar'},
 {slug:'personal-life',alt:/How old are you\?.*I am eight years old\./,answer:'Mia washes her hands before lunch.',wrong:'She sleeps all day.',review:'öğle yemeğinden önce ellerini yıkar'},
 {slug:'family-life',alt:/Who is she\?.*She is my sister\./,answer:'Jack helps his father set the table.',wrong:'She sleeps all day.',review:'babasına sofrayı kurarken yardım eder'},
 {slug:'homes-houses-and-neighbourhoods',alt:/Where is the cat\?.*It is under the table\./,answer:'Lily sees a bakery next to her house.',wrong:'She sleeps all day.',review:'evinin yanında bir fırın görür'}
])test(`accessible dialogue and complete answer ${item.slug}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/2-sinif-ingilizce-${item.slug}-kolay-test-1.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===8)await expect(area.locator('img')).toHaveAttribute('alt',item.alt);
  if(n===9){await expect(area).toContainText(item.answer);await area.locator('[data-choice]').filter({hasText:item.wrong}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:item.answer})).toContainText(item.review);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
