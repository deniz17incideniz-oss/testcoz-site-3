import { test, expect } from '@playwright/test';
test('ana sayfada sınıf seçimi mobil ilk ekranda ve bağlantılar erişilebilir', async ({ page }) => {
  await page.setViewportSize({width:375,height:667});
  await page.goto('/');
  const cards=page.locator('#siniflar .class-card');
  await expect(cards).toHaveCount(4);
  for (let i=0;i<4;i++) {
    await expect(cards.nth(i)).toHaveAttribute('href',`sinif-${i+1}.html`);
    const box=await cards.nth(i).boundingBox();
    expect(box.y+box.height).toBeLessThanOrEqual(667);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await cards.first().focus();
  await expect(cards.first()).toBeFocused();
});
