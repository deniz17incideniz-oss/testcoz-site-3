import {test,expect} from '@playwright/test';
test('neighborhood questions describe adult accompaniment and clear choices',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===1)await expect(area).toContainText('güvendiği bir yetişkinle');
  if(n===4){await expect(area).toContainText('Başkaları bulamasın diye kitabı gizlemeliyim.');await area.locator('[data-choice]').filter({hasText:'Başkaları bulamasın diye kitabı gizlemeliyim.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Mahalle kütüphanesinden'})).toContainText('diğer okuyucuların da kitaptan yararlanmasını sağlar');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
