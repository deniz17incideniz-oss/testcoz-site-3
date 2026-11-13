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

for (const button of ['#nextQuestion', '#skipQuestion']) {
  test(`${button} çift tıklanırsa yalnızca bir soru ilerler`, async ({ page }) => {
    await openPersonalTest(page, route => route.fulfill({ json: { success: true } }));
    await page.locator(button).dblclick();
    await expect(page.locator('.test-counter')).toHaveText('Soru 2 / 10');
  });
}

test('Önceki çift tıklanırsa yalnızca bir soru geri gider', async ({ page }) => {
  await openPersonalTest(page, route => route.fulfill({ json: { success: true } }));
  await page.locator('#nextQuestion').click();
  await page.locator('#nextQuestion').click();
  await expect(page.locator('.test-counter')).toHaveText('Soru 3 / 10');
  await page.locator('#previousQuestion').dblclick();
  await expect(page.locator('.test-counter')).toHaveText('Soru 2 / 10');
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

for (const [label, response] of [
  ['success false', { status: 200, json: { success: false } }],
  ['geçersiz JSON', { status: 200, contentType: 'application/json', body: '{invalid' }]
]) {
  test(`${label} yanıtı kayıt başarısı olarak gösterilmez`, async ({ page }) => {
    await openPersonalTest(page, route => route.fulfill(response));
    for (let index = 0; index < questions.length; index++) {
      await page.getByRole('button', { name: 'Geç', exact: true }).click();
    }
    await expect(page.locator('#personalSaveStatus')).toContainText('Kalıcı kayıt doğrulanamadı');
    await expect(page.locator('#personalSaveStatus')).not.toHaveClass(/success/);
  });
}
