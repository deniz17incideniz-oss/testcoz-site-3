import {test,expect} from '@playwright/test';
test('earth science questions use relevant evidence and a risk-aware path',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-yer-bilimciler-is-basinda-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===4)await expect(area).toContainText('Küçük parçalar mutlaka ilk taşla aynı büyüklüktedir.');
  if(n===6)await expect(area).toContainText('İki alanın eğimi mutlaka aynıdır.');
  if(n===9)await expect(area).toContainText('Tepsilere dökülen eşit su miktarını yeniden ölçmek');
  if(n===10){await expect(area).toContainText('güvenli olduğunu değerlendirdiği patikada');await expect(area.locator('img')).toHaveAttribute('alt',/Öğretmenin güvenli bulduğu patika/);await area.locator('[data-choice]').filter({hasText:'Patikada hiçbir tehlikenin bulunmadığını kesin olarak bilmek'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'güvenli olduğunu değerlendirdiği patikada'})).toContainText('tehlikesiz olduğunu kesinleştirmez');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
