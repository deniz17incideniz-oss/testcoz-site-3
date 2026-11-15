import {test,expect} from '@playwright/test';
test('habitat evidence and safe observation match the question',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-canlilarin-yasam-alanlarina-yolculuk-zor-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if([3,9,10].includes(n)){
   const img=area.locator('img');const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if(n===3){await expect(area.locator('.evidence-caption ol')).toHaveCount(1);await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');await expect(area).toContainText('koşulları bu balığın yaşamına uygun');}
  }
  if(n===7){await expect(area).toContainText('Canlılara ve taşa dokunmadan yetişkine haber vermek');await area.locator('[data-choice]').filter({hasText:'Canlıları gereksiz yere sınıfa götürmek'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'taşın altında küçük canlılar'})).toContainText('Çocuk canlılara ve taşa dokunmadan bir yetişkine haber verir');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
