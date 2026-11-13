import { test, expect } from '@playwright/test';

const questions = Array.from({ length: 10 }, (_, index) => ({
  id: `fixture-${index + 1}`,
  question: `${index + 1} + 1 kaçtır?`,
  choices: ['2', '3', '4'],
  correctAnswer: 0,
  explanation: 'Örnek açıklama.'
}));

async function openPersonalTest(page, saveResponse) {
  await page.route('**/api/personal-test?*', route => route.fulfill({ json: { test: { id: 'fixture', title: 'Örnek test', questions } } }));
  await page.route('**/api/save-test-result', saveResponse);
  await page.goto('/kisisel-test.html?id=fixture');
}

test('klavyeyle seçim ve geçme odak ile cevap durumunu korur', async ({ page }) => {
  await openPersonalTest(page, route => route.fulfill({ json: { success: true } }));
  await expect(page.locator('[role=progressbar]')).toHaveAttribute('aria-valuenow', '10');
  const first = page.getByRole('radio').nth(0);
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('radio').nth(1)).toBeFocused();
  await expect(page.getByRole('radio').nth(1)).toHaveAttribute('aria-checked', 'true');
  await page.getByRole('button', { name: 'Geç', exact: true }).click();
  await expect(page.locator('[role=progressbar]')).toHaveAttribute('aria-valuenow', '20');
  await page.getByRole('button', { name: '← Önceki' }).click();
  await expect(page.getByRole('radio').nth(1)).toHaveAttribute('aria-checked', 'false');
  await expect(page.locator('.test-score')).toHaveText('0 Cevaplandı');
});

for (const status of [200, 401, 500]) {
  test(`kişisel sonuç kaydı ${status} yanıtını öğrenciye bildirir`, async ({ page }) => {
    let submitted;
    await openPersonalTest(page, route => {
      submitted = route.request().postDataJSON();
      return route.fulfill({ status, json: { success: status === 200 } });
    });
    for (let index = 0; index < questions.length; index++) {
      await page.getByRole('button', { name: 'Geç', exact: true }).click();
    }
    await expect(page.locator('[role=progressbar]')).toHaveAttribute('aria-valuenow', '100');
    await expect(page.locator('#resultArea')).toBeFocused();
    const message = page.locator('#personalSaveStatus');
    if (status === 200) await expect(message).toContainText('Sonucunuz kaydedildi');
    if (status === 401) await expect(message).toContainText('Oturumunuz sona erdi');
    if (status === 500) await expect(message).toContainText('Kalıcı kayıt doğrulanamadı');
    expect(submitted.answers).toEqual(Array(10).fill(null));
    expect(submitted.questionIds).toHaveLength(10);
  });
}

test('ağ hatasında sonuç kaydı doğrulanmadığını gösterir', async ({ page }) => {
  await openPersonalTest(page, route => route.abort());
  for (let index = 0; index < questions.length; index++) {
    await page.getByRole('button', { name: 'Geç', exact: true }).click();
  }
  await expect(page.locator('#personalSaveStatus')).toContainText('Kalıcı kayıt doğrulanamadı');
});
