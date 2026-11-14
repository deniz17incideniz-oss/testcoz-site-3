import {test,expect} from '@playwright/test';
test('motion questions distinguish direction and how fast objects move',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});const slug='3-sinif-fen-bilimleri-hareketi-kesfediyorum-zor-test-1';
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===2){await expect(area).toContainText('aldığı yol ve hareket süresi ölçülmüyor');await area.locator('[data-choice]').filter({hasText:'Top kesinlikle daha hızlı'}).click();await page.locator('#nextQuestion').click();continue;}
  if([3,6,9,10].includes(n)){const img=area.locator('img');await expect(img).toHaveCount(1);const src=await img.getAttribute('src'),res=await request.get('/'+src.replace(/^\//,''));expect(res.ok()).toBeTruthy();const svg=await res.text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);if(n!==10){await expect(img).toHaveAttribute('alt',/A:.*B:/);await expect(area.locator('.evidence-caption')).toContainText('A:');await expect(area.locator('.evidence-caption')).toContainText('B:');}}
  if(n===6){await area.locator('[data-choice]').filter({hasText:'A hızlanır, B yön değiştirir'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Kuzeye giden bir topa'})).toContainText('ne kadar hızlı gittiğinin değişip değişmediğini göstermez');
 await expect(page.locator('.wrong-item').filter({hasText:'A otobüsü hızlanıp yavaşlamadan'})).toContainText('A yön değiştirir, B yavaşlar');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
