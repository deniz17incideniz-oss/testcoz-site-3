import {test,expect} from '@playwright/test';
test('matter questions preserve evidence, safety and numbered cards',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 const slug='3-sinif-fen-bilimleri-maddeyi-taniyalim-karistirip-ayiralim-zor-test-1';await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if([3,6,9,10].includes(n)){
   const img=area.locator('img');await expect(img).toHaveCount(1);const src=await img.getAttribute('src'),svg=await (await request.get('/'+src.replace(/^\//,''))).text();
   expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if([3,6].includes(n)){await expect(area.locator('.evidence-caption ol')).toHaveCount(1);await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');}
  }
  if(n===6)await expect(area).toContainText('İçi aydınlatılan');
  if(n===8)await expect(area).toContainText('Öğretmen gözetiminde masaya dökülen temiz suyu');
  if(n===9){await expect(area).toContainText('mıknatısın çekmediği kum');await area.locator('[data-choice]').filter({hasText:'Mıknatısın kumu da çekmesi'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'mıknatısın çekmediği kum'})).toContainText('bu karışımdaki kumun mıknatısla çekilmediği');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
