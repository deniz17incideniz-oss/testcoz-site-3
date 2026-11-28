import {test, expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';

const slug = '4-sinif-turkce-noktalama-isaretleri-zor-test-2';
const expected = [', ve .', 'Çocuklar, kitaplarınızı açın.', 'Kütüphanenin saat kaçta açıldığını biliyor musun', ':  .  ?', 'Ece’ye İzmir’i anlattım.', '23.04.2026 – 24.04.2026', '! ve .', 'Yarışta 3. oldum.', 'Sana bir şey söyleyecektim... Beni dinler misin?', 'Ece İzmir’e yarın gidecek.'];

test('ten punctuation questions have the reviewed answers and remain usable on mobile', async ({page, request}) => {
  const target = tests.find(item => item.slug === slug);
  expect(target.questions).toHaveLength(10);
  for (const [index, question] of target.questions.entries()) {
    expect(question.choices).toHaveLength(4);
    expect(new Set(question.choices).size).toBe(4);
    expect(question.choices[question.correctAnswer]).toBe(expected[index]);
  }
  await page.route('https://**/*', route => route.abort());
  await page.setViewportSize({width: 320, height: 820});
  await page.goto('/tests/' + slug + '.html');
  await page.getByRole('link', {name: 'Teste Başla', exact: true}).click();
  for (let index = 0; index < 10; index++) {
    await expect(page.locator('.test-counter')).toHaveText(`Soru ${index + 1} / 10`);
    if (index === 5) {
      const img = page.locator('#questionArea img');
      await expect(img).toHaveAttribute('alt', 'Gün: 23; ay: 04; yıl: 2026.');
      await expect.poll(() => img.evaluate(node => node.complete && node.naturalWidth > 0)).toBeTruthy();
      const svg = await (await request.get('/' + await img.getAttribute('src'))).text();
      for (const part of ['Gün: 23', 'Ay: 04', 'Yıl: 2026']) expect(svg).toContain(part);
      expect(svg).not.toContain('23.04.2026');
    }
    const chosen = index === 5 ? '23.04.2026 – 24/04.2026' : expected[index];
    const choice = page.locator(`[data-choice="${target.questions[index].choices.indexOf(chosen)}"]`);
    await expect(choice.locator('span').last()).toHaveText(chosen);
    await choice.click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await page.locator('#nextQuestion').click();
  }
  await expect(page.locator('.result-stat-val')).toHaveText(['9', '1', '0']);
  await expect(page.locator('.wrong-item')).toContainText(['23.04.2026']);
  await expect(page.locator('.wrong-item')).toContainText(['iki tarih için de noktayla ayrılması istenmiştir']);
});
