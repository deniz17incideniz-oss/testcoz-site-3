import {test,expect} from '@playwright/test';

for(const [topic,level,step,fragment,answer] of [
 ['sagligim-ve-guvenligim','kolay',6,'ışığın kırmızı olduğunu','Kaldırımda bekleyip yeşil'],
 ['ailem-ve-toplum','kolay',6,'ortak oyun alanını','Oyundan sonra alanı temiz'],
 ['ailem-ve-toplum','orta',3,'sofrayı hazırlamayı','Sofrayı hazırladıktan sonra'],
 ['yasadigim-yer-ve-ulkem','kolay',6,'müzeyi gezen öğrencilerden','Eserlere dokunmadan'],
 ['yasadigim-yer-ve-ulkem','orta',3,'tarihî çeşmenin üzerine','durumu bir yetişkine'],
 ['doga-ve-cevre','kolay',6,'bir kuş yuvası','Yuvaya dokunmadan'],
 ['doga-ve-cevre','orta',3,'genç fidanın büyümesine','ihtiyacına göre sulanmasına'],
 ['bilim-teknoloji-ve-sanat','kolay',6,'kablosunun hasarlı','Cihaza dokunmadan'],
 ['bilim-teknoloji-ve-sanat','orta',3,'görseli kullanmak istiyor','Kullanım iznini kontrol']
]) test(`grade 3 ${topic} ${level} reviewed question`,async({page})=>{
 await page.route('https://**/*',route=>route.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-hayat-bilgisi-${topic}-${level}-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let i=0;i<step;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText(fragment);
 await expect(page.locator('[data-choice]')).toHaveCount(3);
 await expect(page.locator('[data-choice]').filter({hasText:answer})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
