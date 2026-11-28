import {test,expect} from '@playwright/test';
test('revised school injury question explains obtaining adult help',async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-zor-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 const area=page.locator('#questionArea');await expect(area).toContainText('düşen arkadaşın yaralandı');
 await expect(area.locator('[data-choice]')).toHaveCount(3);
 await area.locator('[data-choice]').filter({hasText:'koşmaya zorlamalıyım'}).click();await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.wrong-item').filter({hasText:'düşen arkadaşın yaralandı'})).toContainText('bir yetişkine haber ver');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
