import {test,expect} from '@playwright/test';

test('failed question bundle offers a usable retry',async({page})=>{
 let fail=true;
 await page.route('**/data/runtime/image-dimensions.js',route=>fail?route.abort():route.continue());
 await page.goto('/test.html?sinif=4&ders=matematik&konu=bolme&zorluk=kolay&test=1');
 await expect(page.getByRole('heading',{name:'Test yüklenemedi'})).toBeVisible();
 const retry=page.getByRole('button',{name:'Yeniden Dene'});
 await expect(page.getByRole('alert')).toContainText('Bağlantını kontrol');
 fail=false;await retry.click();
 await expect(page.locator('#questionArea')).toContainText('48 kilogram');
});

test('a stalled question bundle stops loading and offers retry',async({page})=>{
 await page.clock.install();
 await page.route('**/data/runtime/image-dimensions.js',()=>{});
 await page.goto('/test.html?sinif=4&ders=matematik&konu=bolme&zorluk=kolay&test=1',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#testSubtitle')).toHaveText('Konu yükleniyor…');
 await page.clock.fastForward(16000);
 await expect(page.getByRole('heading',{name:'Test yüklenemedi'})).toBeVisible();
 await expect(page.getByRole('button',{name:'Yeniden Dene'})).toBeVisible();
});
