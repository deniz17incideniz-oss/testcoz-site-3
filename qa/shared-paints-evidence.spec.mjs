import {test,expect} from '@playwright/test';
test('shared classroom paints have a consistent prompt and answer',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===3){await expect(area).toContainText('Öğretmenime nasıl hissettiğimi söylemeliyim.');await expect(area).toContainText('Nasıl hissettiğimi kimseye söylemeden beklemeliyim.');}
  if(n===4){await expect(area).toContainText('hangi bölüme gitmesi daha uygundur');await expect(area).toContainText('Spor salonuna');await expect(area).toContainText('Yemekhaneye');}
  if(n===5){await expect(area).toContainText('Ona yardım etmek için');await expect(area).toContainText('Kalemi kendim kullanmak üzere alabilirim.');}
  if(n===6){await expect(area).toContainText('kapaklı ortak boyaları');await expect(area).toContainText('Kapaklarını kapatıp yerlerine koymalıyım.');await area.locator('[data-choice]').filter({hasText:'Kapaklarını açık bırakmalıyım.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'kapaklı ortak boyaları'})).toContainText('Ortak boyaları kapatıp yerine koymak');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
