import {test,expect} from '@playwright/test';
test('first grade questions use explicit country and address safety',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-yasadigim-yer-ve-ulkem-kolay-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===1){await expect(area).toContainText('Ankara ve İzmir hangi ülkedeki şehirlerdir?');await expect(area).toContainText('Türkiye');}
  if(n===9){await expect(area).toContainText('Adresimi paylaşmayıp güvendiğim bir yetişkine haber verebilirim.');await area.locator('[data-choice]').filter({hasText:'Adresimi hemen söylemeliyim.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Tanımadığın biri ev adresini soruyor'})).toContainText('adresini paylaşma ve güvendiğin bir yetişkine haber ver');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
