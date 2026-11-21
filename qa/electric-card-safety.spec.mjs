import {test,expect} from '@playwright/test';

test('electricity cards and safety scenarios retain clear evidence',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/3-sinif-fen-bilimleri-yasamimizi-kolaylastiran-elektrik-zor-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if([3,6,10].includes(n)){
   const img=area.locator('img');await expect(img).toHaveCount(1);
   const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();
   expect(svg).not.toMatch(/class="value">[AB]<\/text>/);
   if([3,6].includes(n)){
    await expect(area.locator('.evidence-caption ol')).toHaveCount(1);
    await expect(img).toHaveAttribute('alt',/1\. kart:.*2\. kart:/);
    expect(svg).toContain('class="value">1</text>');expect(svg).toContain('class="value">2</text>');
   }
  }
  if(n===3){await expect(area).toContainText('gün ışığıyla yeterince aydınlanan');await expect(area).toContainText('1. karttaki lamba');}
  if(n===6){await expect(area).toContainText('şehir elektriğine bağlı prize');await expect(area).toContainText('1. araç pil, 2. araç şehir elektriği');}
  if(n===10){await expect(area).toContainText('bir cihaz daha bağlanmak istendiğini');await area.locator('[data-choice]').filter({hasText:'Yer kaldıkça cihaz eklemelidir.'}).click();await page.locator('#nextQuestion').click();continue;}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'bir cihaz daha bağlanmak istendiğini'})).toContainText('aşırı yüklenme riski');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
