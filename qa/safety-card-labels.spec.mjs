import {test,expect} from '@playwright/test';
for(const grade of [2,3])test(`grade ${grade} safety cards do not impersonate answer letters`,async({page,request})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 const slug=`${grade}-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1`;
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');const targets=grade===3?[2,8]:[2];
  if(targets.includes(n)){
   const img=area.locator('img');await expect(img).toHaveCount(1);await expect(img).toHaveAttribute('alt',/.+/);
   const src=await img.getAttribute('src');const response=await request.get('/'+src.replace(/^\//,''));expect(response.ok()).toBeTruthy();
   const svg=await response.text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);expect(svg).toContain(grade===2?'Ela:':n===2?'İpek:':'Ece:');
   if(n===8){await expect(area).toContainText('bulduğu ilacı');await area.locator('[data-choice]').filter({hasText:'Arda’nın bulduğu ilacı'}).click();await page.locator('#nextQuestion').click();continue;}
  }
  await page.locator('#skipQuestion').click();
 }
 if(grade===3)await expect(page.locator('.wrong-item').filter({hasText:'Ece bir ilaç bulunca'})).toContainText('Bulduğun ilaçlara dokunmadan');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
