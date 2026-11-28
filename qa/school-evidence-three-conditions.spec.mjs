import {test,expect} from '@playwright/test';
test('book selection and class vote use only stated evidence',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===2){await expect(area).toContainText('sayfalarının tam');await expect(area).toContainText('üç koşulu');await area.locator('[data-choice]').filter({hasText:'Sayfaları eksik olan, ilkokula uygun bir öykü kitabı.'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===3){await area.locator('[data-choice]').filter({hasText:'Oylamadan sonra kimsenin farklı fikri kalmamıştır.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'kitap toplama kampanyası'})).toContainText('verilen üç koşulu birlikte karşılar');
 await expect(page.locator('.wrong-item').filter({hasText:'Sınıfça oyun seçilecek'})).toContainText('herkesin fikrinin aynılaştığını göstermez');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
