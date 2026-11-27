import {test, expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';

const cases = [
  {difficulty:'kolay', index:6, text:'bilgi ve örnek eşleştirmelerinden hangisi doğrudur',
    correct:'Soru cümlesinin sonuna soru işareti konur. — Bugün bize gelir misin?',
    explanation:'Soru bildiren cümlelerin sonuna soru işareti konur.'},
  {difficulty:'orta', index:7, text:'Bu cümlelerin sonundaki noktalama işaretleri için hangisi doğrudur?',
    correct:'İki cümledeki işaret de doğrudur.',
    explanation:'I. cümle soru bildirdiği için soru işareti, II. cümle üzüntü bildirdiği için ünlem işaretiyle bitmiştir.'}
];

for (const item of cases) test(`Noktalama ${item.difficulty}: soru, cevap ve açıklama uyumu`, async ({page}) => {
  const t = tests.find(test => test.slug === `4-sinif-turkce-noktalama-isaretleri-${item.difficulty}-test-1`);
  const q = t.questions[item.index];
  expect(q.correctAnswer).toBe(3);
  expect(q.choices).toHaveLength(4);
  expect(new Set(q.choices).size).toBe(4);
  expect(q.choices[q.correctAnswer]).toBe(item.correct);
  await page.setViewportSize({width:375,height:800});
  await page.goto(`/test.html?sinif=4&ders=turkce&konu=noktalama-isaretleri&zorluk=${item.difficulty}&test=1`);
  for (let i=0;i<item.index;i++) await page.locator('#skipQuestion').click();
  await expect(page.locator('.question-text')).toContainText(item.text);
  await expect(page.locator('[data-choice="3"]')).toContainText(item.correct);
  await page.locator('[data-choice="0"]').click();
  await page.locator('#nextQuestion').click();
  for(let i=item.index+1;i<10;i++) await page.locator('#skipQuestion').click();
  await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
  const review = page.locator('.wrong-item').nth(item.index);
  await expect(review).toContainText(item.correct);
  await expect(review).toContainText(item.explanation);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});
