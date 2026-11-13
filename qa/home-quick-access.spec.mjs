import { test, expect } from '@playwright/test';
test('ana sayfada sınıf seçimi mobil ilk ekranda ve bağlantılar erişilebilir', async ({ page }) => {
  await page.setViewportSize({width:375,height:667});
  await page.goto('/');
  const cards=page.locator('#siniflar .class-card');
  await expect(cards).toHaveCount(4);
  await expect(page.getByRole('link', {name: /1\. Sınıf/}).first()).toBeVisible();
  for (let i=0;i<4;i++) {
    await expect(cards.nth(i)).toHaveAttribute('href',`sinif-${i+1}.html`);
    const box=await cards.nth(i).boundingBox();
    expect(box.y+box.height).toBeLessThanOrEqual(667);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await cards.first().focus();
  await expect(cards.first()).toBeFocused();
});

test('hızlı seçim gerçek bir testi açar', async ({page}) => {
 await page.goto('/'); const form=page.locator('#quick-test'); await expect(form).toBeVisible();
 await form.locator('[name=grade]').selectOption('1'); await form.locator('[name=subject]').selectOption('matematik');
 await form.locator('[name=topic]').selectOption('sayilar-ve-nicelikler');
 await expect(form.locator('[name=test] option')).toHaveCount(5);
 await form.locator('[name=test]').selectOption({index:1}); await form.getByRole('button',{name:'Testi başlat'}).click();
 await expect(page).toHaveURL(/test\.html\?/); await expect(page.locator('#questionArea')).toBeVisible();
});

test('sınıf ve ders sayfalarında navigasyon açıklamalardan önce gelir', async ({page}) => {
 await page.goto('/sinif-1.html');
 const cls=await page.locator('.static-subject-grid').boundingBox();
 const guide=await page.locator('.class-content').boundingBox();
 expect(cls.y).toBeLessThan(guide.y);
 await page.goto('/ders/1-sinif-matematik.html');
 const topics=await page.locator('.topic-list').boundingBox();
 const content=await page.locator('.subject-content').boundingBox();
 expect(topics.y).toBeLessThan(content.y);
 await expect(page.locator('.topic-list a').first()).toBeVisible();
});
