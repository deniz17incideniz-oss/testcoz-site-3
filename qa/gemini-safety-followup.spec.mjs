import {test,expect} from '@playwright/test';

test('reviewed safety questions show matching explanations on mobile',async({page})=>{
 await page.route('https://**/*',route=>route.abort());
 await page.setViewportSize({width:375,height:667});
 await page.goto('/test.html?sinif=1&ders=hayat-bilgisi&konu=sagligim-ve-guvenligim&zorluk=zor&test=1');
 const expected=new Map([[1,['Mutfak zemini ıslak','Islak yerde koşmalıyım']], [3,['Arkadaşın bahçede düştü','Onunla alay etmeliyim']], [4,['Topun yola kaçtı','Hemen topun peşinden']], [8,['Yangından uzaklaşıp güvenli yere çıktın','123']]]);
 for(let i=1;i<=10;i++){
  const area=page.locator('#questionArea'),item=expected.get(i);
  if(item){
   await expect(area).toContainText(item[0]);
   await expect(area.locator('[data-choice]')).toHaveCount(3);
   await expect(area.locator('img')).toHaveCount(0);
   await area.locator('[data-choice]').filter({hasText:item[1]}).click();
   await page.locator('#nextQuestion').click();
  } else if(i===10) await page.locator('#nextQuestion').click();
  else await page.locator('#skipQuestion').click();
 }
 const review=page.locator('.wrong-item');
 await expect(review.filter({hasText:'Mutfak zemini ıslak'})).toContainText('Islak yerden uzak durup bir yetişkine');
 await expect(review.filter({hasText:'Arkadaşın bahçede düştü'})).toContainText('öğretmene haber');
 await expect(review.filter({hasText:'Topun yola kaçtı'})).toContainText('Yola çıkmadan');
 await expect(review.filter({hasText:'Yangından uzaklaşıp güvenli yere çıktın'})).toContainText('112 aranarak');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
