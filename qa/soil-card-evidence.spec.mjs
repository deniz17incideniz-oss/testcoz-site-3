import {test,expect} from '@playwright/test';
test('soil and agriculture evidence cards match the questions',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});const slug='3-sinif-fen-bilimleri-topragi-taniyorum-tarimi-kesfediyorum-zor-test-1';
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if([3,6,9,10].includes(n)){
   const img=area.locator('img');await expect(img).toHaveCount(1);const src=await img.getAttribute('src'),res=await request.get('/'+src.replace(/^\//,''));expect(res.ok()).toBeTruthy();const svg=await res.text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if([3,6].includes(n)){await expect(area.locator('.evidence-caption ol')).toHaveCount(1);await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');}
  }
  if(n===6){await area.locator('[data-choice]').filter({hasText:'Küfü yalnız rengine göre süs sanmak'}).click();await page.locator('#nextQuestion').click();continue;}await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Ürün kartları'})).toContainText('Küflü ürünü çocuk tüketmemeli');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
