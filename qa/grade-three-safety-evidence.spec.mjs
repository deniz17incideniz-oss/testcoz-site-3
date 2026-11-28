import {test,expect} from '@playwright/test';
test('grade three safety questions align traffic, emergency and visual evidence',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===5)await expect(area).toContainText('Türkiye’de hangi durumda 112');
  if(n===6){await expect(area).toContainText('Yeşil ışık yanınca araçları kontrol etmenin gereksiz olduğunu göstermek');await area.locator('[data-choice]').filter({hasText:'Yeşil ışık yanınca araçları kontrol etmenin gereksiz olduğunu göstermek'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===10){const img=area.locator('img');await expect(img).toHaveAttribute('alt',/Zeynep.*Arda/);const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Bir yaya, geçitte yeşil ışığı'})).toContainText('Yeşil ışık araçları kontrol etmeyi');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
