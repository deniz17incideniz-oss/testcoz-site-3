import { test, expect } from '@playwright/test';

const testUrl = '/test.html?sinif=4&ders=turkce&konu=noktalama-isaretleri&zorluk=zor&test=2';

test('authored emphasis is readable while solving and reviewing a test', async ({ page }) => {
  await page.goto('/test.html?sinif=1&ders=turkce&konu=guzel-davranislarimiz&zorluk=zor&test=2');
  for (let i = 0; i < 3; i++) await page.locator('#skipQuestion').click();
  const question = page.locator('.question-text');
  await expect(question.locator('strong')).toHaveText(['yanlıştır']);
  await expect(question).not.toContainText('**');
  for (let i = 0; i < 7; i++) await page.locator('#skipQuestion').click();
  const first = page.locator('.wrong-item').nth(3);
  await expect(first.locator('h3 strong')).toHaveText(['yanlıştır']);
  await expect(first.locator('h3')).not.toContainText('**');
});

test('question content stays escaped even when it contains emphasis', async ({ page }) => {
  await page.route('**/data/runtime/zor-test2-4-turkce.js', async route => {
    const response = await route.fetch();
    const body = await response.text();
    const fixture = {
      question: 'Bak: **<img src=x onerror="window.injected=true">**',
      choice: '**<svg onload="window.injected=true">**',
      explanation: '**<img src=x onerror="window.injected=true">** açıklama'
    };
    const injection = `\n{const q=window.TESTCOZ_TESTS.find(t=>t.slug==='4-sinif-turkce-noktalama-isaretleri-zor-test-2').questions[0];const f=${JSON.stringify(fixture)};q.question=f.question;q.choices[0]=f.choice;q.explanation=f.explanation;}\n`;
    await route.fulfill({ response, body: body + injection });
  });
  await page.goto(testUrl);
  await expect(page.locator('.question-text strong')).toHaveText('<img src=x onerror="window.injected=true">');
  await expect(page.locator('.question-text img, .options-grid svg')).toHaveCount(0);
  await expect(page.locator('[data-choice="0"] strong')).toContainText('<svg');
  for (let i = 0; i < 10; i++) await page.locator('#skipQuestion').click();
  await expect(page.locator('.wrong-item').first().locator('p strong').last()).toContainText('<img');
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
});
