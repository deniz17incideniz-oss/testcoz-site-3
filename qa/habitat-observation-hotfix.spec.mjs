import {test,expect} from '@playwright/test';

test('pond observation supports the displayed habitat conclusion',async({page})=>{
  await page.route('https://**/*',route=>route.abort());
  await page.setViewportSize({width:320,height:850});
  await page.goto('/tests/3-sinif-fen-bilimleri-canlilarin-yasam-alanlarina-yolculuk-zor-test-1.html');
  await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
  const area=page.locator('#questionArea');
  await expect(area).toContainText('su bitkileri, kurbağalar ve böcekler');
  await expect(area.locator('[data-choice]')).toHaveCount(4);
  await area.locator('[data-choice]').filter({hasText:'Bütün kurbağalar bu gölette yaşar.'}).click();
  await page.locator('#nextQuestion').click();
  for(let n=2;n<=10;n++)await page.locator('#skipQuestion').click();
  const review=page.locator('.wrong-item').filter({hasText:'su bitkileri, kurbağalar ve böcekler'});
  await expect(review).toContainText('Aynı yaşam alanında farklı canlılar bulunabilir.');
  await expect(review).toContainText('aynı gölette görülmüştür');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
