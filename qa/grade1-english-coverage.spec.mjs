import {test, expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';

const english = tests.filter(t => t.classLevel === 1 && t.subject === 'ingilizce' && t.testNumber === 1);

test('all six first-grade English topics offer three Test 1 levels beside Zor Test 2', async ({page, request}) => {
  expect(english).toHaveLength(18);
  await page.goto('/ders/1-sinif-ingilizce.html');
  for (const topic of new Set(english.map(t => t.topic))) {
    const group = english.filter(t => t.topic === topic);
    expect(group.map(t => t.difficulty).sort()).toEqual(['kolay', 'orta', 'zor']);
    for (const t of group) {
      await expect(page.locator(`a[href="../${t.pageUrl}"]`)).toHaveCount(1);
      const response = await request.get('/' + t.pageUrl);
      expect(response.status()).toBe(200);
      expect(await response.text()).toContain(`https://testcoz.pro/${t.pageUrl}`);
    }
    await expect(page.locator(`a[href="../tests/1-sinif-ingilizce-${topic}-zor-test-2.html"]`)).toHaveCount(1);
  }
});

for (const width of [320, 375, 768, 1440]) test(`first-grade English Test 1 works at ${width}px`, async ({page}) => {
  await page.route('https://**/*', route => route.abort());
  await page.setViewportSize({width, height: 900});
  const selected = english.find(t => t.topic === 'greetings' && t.difficulty === 'zor');
  await page.goto('/' + selected.pageUrl);
  await page.getByRole('link', {name: 'Teste Başla', exact: true}).click();
  for (let index = 0; index < 10; index++) {
    await expect(page.locator('.test-counter')).toHaveText(`Soru ${index + 1} / 10`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    if (index < 8) await page.locator(`[data-choice="${selected.questions[index].correctAnswer}"]`).click();
    else if (index === 8) await page.locator(`[data-choice="${(selected.questions[index].correctAnswer + 1) % 3}"]`).click();
    await page.locator(index === 9 ? '#skipQuestion' : '#nextQuestion').click();
  }
  await expect(page.locator('.result-stat-val')).toHaveText(['8', '1', '1']);
  await page.getByRole('link', {name: 'Yanlışlarını Öğren', exact: true}).click();
  await expect(page.locator('.wrong-item')).toHaveCount(2);
});
