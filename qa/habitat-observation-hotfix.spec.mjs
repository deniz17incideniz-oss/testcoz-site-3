import {test,expect} from '@playwright/test';

test('pond observation supports the displayed habitat conclusion',async({page})=>{
  await page.route('https://**/*',route=>route.abort());
  await page.setViewportSize({width:320,height:850});
  await page.goto('/tests/3-sinif-fen-bilimleri-canlilarin-yasam-alanlarina-yolculuk-zor-test-1.html');
  await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
  const area=page.locator('#questionArea');
  await expect(area).toContainText('su bitkileri');
  await expect(area).toContainText('kurbağalar');
  await expect(area).toContainText('böcekler');
  const choices=area.locator('[data-choice]');
  expect(await choices.count()).toBeGreaterThanOrEqual(3);
  await expect(choices.filter({hasText:'Aynı yaşam alanında farklı canlılar bulunabilir.'})).toHaveCount(1);
  const liveWrong='Bütün kurbağalar bu gölette yaşar.';
  const draftWrong='Gölette yaşayan bütün canlıların bu kayıtta sayıldığı kesindir.';
  const liveCount=await choices.filter({hasText:liveWrong}).count();
  const draftCount=await choices.filter({hasText:draftWrong}).count();
  expect(liveCount+draftCount).toBe(1);
  await choices.filter({hasText:liveCount?liveWrong:draftWrong}).click();
  await page.locator('#nextQuestion').click();
  for(let n=2;n<=10;n++)await page.locator('#skipQuestion').click();
  const review=page.locator('.wrong-item').filter({hasText:'su bitkileri'});
  await expect(review).toContainText('Aynı yaşam alanında farklı canlılar bulunabilir.');
  await expect(review).toContainText('farklı canlı');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
