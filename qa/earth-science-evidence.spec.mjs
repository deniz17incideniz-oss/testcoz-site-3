import {test,expect} from '@playwright/test';
test('earth science cards have distinct labels and evidence-based explanations',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});const slug='3-sinif-fen-bilimleri-yer-bilimciler-is-basinda-zor-test-1';
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===1)await expect(area).toContainText('kuvars ve feldispat');
  if(n===7)await expect(area).toContainText('Mermer yapıların kaplamasında');
  if(n===8)await expect(area).toContainText('Bazı canlı kalıntıları uygun koşullarda');
  if([3,6,9,10].includes(n)){
   const img=area.locator('img');await expect(img).toHaveCount(1);const src=await img.getAttribute('src'),response=await request.get('/'+src.replace(/^\//,''));expect(response.ok()).toBeTruthy();const svg=await response.text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if(n!==10){await expect(area.locator('.evidence-caption ol')).toHaveCount(1);await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');}
  }
  if(n===3){await area.locator('[data-choice]').filter({hasText:'her kayaçta fosil olduğunu kanıtlar'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Öğretmenin araştırma kartlarında'})).toContainText('bütün kayaçlar için kesin sonuç vermeye yetmez');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
