import { test, expect } from '@playwright/test';
import { tests } from '../scripts/load-bank.mjs';

test('Madlen data question has a consistent accessible chart and correct review', async ({ page, request }) => {
  const t = tests.find(item => item.slug === '4-sinif-matematik-veri-zor-test-1');
  const q = t.questions[8];
  expect(q.id).toBe('4-sinif-matematik-veri-zor-test-1-soru-9');
  expect(q.visual.data.groups.map(g => g.items.map(i => i.count))).toEqual([[5,3,2],[3,5,3]]);
  expect(q.visual.data.unit).toBe(4);
  expect(q.choices[q.correctAnswer]).toBe('I, II ve III');
  await page.route('https://**/*', route => route.abort());
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/test.html?sinif=4&ders=matematik&konu=veri&zorluk=zor&test=1');
  for (let i = 0; i < 8; i++) await page.locator('#skipQuestion').click();
  const area = page.locator('#questionArea');
  const img = area.locator('img');
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute('alt', q.imageAlt);
  await expect(area.locator('[data-choice]')).toHaveCount(4);
  const response = await request.get('/' + q.image);
  expect(response.status()).toBe(200);
  const svg = await response.text();
  expect((svg.match(/width="25" height="25"/g) || []).length).toBe(21);
  expect(svg).toContain('Her kare 4 kitabı gösterir.');
  const overflows = await page.evaluate(markup => {
    const div = document.createElement('div'); div.style = 'position:fixed;left:-2000px;width:720px'; div.innerHTML = markup; document.body.appendChild(div);
    const root = div.querySelector('svg'), v = root.viewBox.baseVal;
    const out = [...root.querySelectorAll('text,rect')].filter(e => {const b=e.getBBox(); return b.x < 0 || b.y < 0 || b.x+b.width > v.width || b.y+b.height > v.height;}).length;
    div.remove(); return out;
  }, svg);
  expect(overflows).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await area.locator('[data-choice="0"]').click(); await page.locator('#nextQuestion').click();
  await page.locator('#skipQuestion').click();
  const review = page.locator('.wrong-item').filter({ hasText: 'ödünç aldığı kitap türleri' });
  await expect(review).toContainText('I, II ve III');
  await expect(review).toContainText('40');
  await expect(review).toContainText('44');
});
