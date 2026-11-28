import {test,expect} from '@playwright/test';
test('science investigation cards match observations and conditions',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});const slug='3-sinif-fen-bilimleri-bilimsel-kesif-yolculugu-zor-test-1';
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if([3,6,10].includes(n)){
   const img=area.locator('img'),src=await img.getAttribute('src'),res=await request.get('/'+src.replace(/^\//,''));expect(res.ok()).toBeTruthy();const svg=await res.text();expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if(n!==10){await expect(area.locator('.evidence-caption ol')).toHaveCount(1);await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');}
   if(n===3){await expect(area.locator('.evidence-caption')).toContainText('Pazartesi 4 cm, cuma 7 cm');await expect(area.locator('.evidence-caption')).toContainText('Filiz bu hafta 3 cm uzamış');}
   if(n===6)await expect(area).toContainText('pencerenin açık ya da kapalı olması değişmiştir');
  }
  if(n===3){await area.locator('[data-choice]').filter({hasText:'Yalnız saksının rengine'}).click();await page.locator('#nextQuestion').click();continue;}await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Kayıt kartları'})).toContainText('7 − 4 = 3 cm');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('science Test 2 explains the neutral question and safe observation',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-bilimsel-kesif-yolculugu-zor-test-2.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');if(n===5)await expect(area).toContainText('öğretmenin güvenli olduğunu belirlediği');
  if(n===8){await area.locator('[data-choice]').filter({hasText:'Herkes muz seçti'}).click();await page.locator('#nextQuestion').click();continue;}await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Bir araştırmada çocukların sevdiği meyveler'})).toContainText('“En sevdiğin meyve hangisidir?” sorusu');
});
