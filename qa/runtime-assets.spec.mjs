import {test,expect} from '@playwright/test';
test('loads the selected Test 2 subject and reserves SVG dimensions',async({page})=>{
 const dataRequests=[];
 page.on('request',r=>{if(r.url().includes('/data/'))dataRequests.push(r.url());});
 await page.route('https://**/*',r=>r.abort());
 await page.goto('/test.html?sinif=1&ders=matematik&konu=uzunluk-ve-kutle-olcme&zorluk=zor&test=2');
 const image=page.locator('#questionArea img');await expect(image).toBeVisible();
 await expect(image).toHaveAttribute('height','360');
 expect(dataRequests.some(u=>u.endsWith('/data/tests/zor-test2-final.js'))).toBe(false);
 expect(dataRequests.filter(u=>u.includes('/data/runtime/zor-test2-'))).toHaveLength(1);
 await page.locator('#skipQuestion').click();
 await expect(page.locator('.test-counter')).toHaveText('Soru 2 / 10');
});
