import {test,expect} from '@playwright/test';
test('loads the selected Test 2 subject and reserves SVG dimensions',async({page,request})=>{
 const dataRequests=[];
 page.on('request',r=>{if(r.url().includes('/data/'))dataRequests.push(r.url());});
 await page.route('https://**/*',r=>r.abort());
 await page.goto('/test.html?sinif=1&ders=matematik&konu=uzunluk-ve-kutle-olcme&zorluk=zor&test=2');
 const image=page.locator('#questionArea img');await expect(image).toBeVisible();
 await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 const source=await request.get('/'+await image.getAttribute('src'));
 expect(source.ok()).toBeTruthy();
 const viewBox=(await source.text()).match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
 expect(viewBox).not.toBeNull();
 await expect(image).toHaveAttribute('width',viewBox[1]);
 await expect(image).toHaveAttribute('height',viewBox[2]);
 expect(dataRequests.some(u=>u.endsWith('/data/tests/zor-test2-final.js'))).toBe(false);
 expect(dataRequests.filter(u=>u.includes('/data/runtime/zor-test2-'))).toHaveLength(1);
 await page.locator('#skipQuestion').click();
 await expect(page.locator('.test-counter')).toHaveText('Soru 2 / 10');
});
