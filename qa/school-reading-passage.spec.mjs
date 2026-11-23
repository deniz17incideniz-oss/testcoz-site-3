import {test,expect} from '@playwright/test';
test('school reading question provides the passage visually and accessibly',async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/2-sinif-ingilizce-school-life-kolay-test-1.html');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<10;n++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(area).toContainText('Emma is at school. She reads a book in the library.');
 await expect(img).toHaveAttribute('alt',/Emma is at school\..*She reads a book in the library\./);await expect(area.locator('[data-choice]')).toHaveCount(4);await expect(area).toContainText('A Day at School');
 const src=await img.getAttribute('src');const svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).not.toContain('A Day at School');expect(svg).toContain('Emma is at school.');expect(svg).toContain('She reads a book in the library.');
 await area.locator('[data-choice]').filter({hasText:'A Rainy Night'}).click();await page.locator('#nextQuestion').click();
 await expect(page.locator('.wrong-item').filter({hasText:'Emma is at school'})).toContainText('okulda bir gün');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
