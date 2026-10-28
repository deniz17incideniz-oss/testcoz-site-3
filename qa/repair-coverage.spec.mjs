import {test,expect} from '@playwright/test';
import {repairs} from '../data/editorial-repairs.mjs';
import {tests} from '../scripts/load-bank.mjs';
for(const slug of [...new Set(repairs.map(p=>p.slug))])test(`repaired runtime ${slug}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 const t=tests.find(t=>t.slug===slug);
 await page.goto(`/test.html?sinif=${t.classLevel}&ders=${t.subject}&konu=${t.topic}&zorluk=${t.difficulty}&test=${t.testNumber}`);
 await expect(page.locator('.question-text')).toBeVisible();
 const actual=await page.evaluate(slug=>window.TestCozTestNormalizer.normalizeAllTests(window.TESTCOZ_TESTS).find(t=>t.slug===slug).questions,slug);
 for(const p of repairs.filter(p=>p.slug===slug)){
  const expected=t.questions[p.index],q=actual[p.index];
  expect(q.question,q.id).toBe(expected.question);expect(q.choices,q.id).toEqual(expected.choices);expect(q.correctAnswer,q.id).toBe(expected.correctAnswer);expect(q.explanation,q.id).toBe(expected.explanation);expect(q.image||null,q.id).toBe(expected.image||null);
 }
});
for(const width of [320,375,768,1440])test(`school lesson and quiz accessible at ${width}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width,height:900});
 await page.goto('/ders/3-sinif-hayat-bilgisi.html#ben-ve-okulum');
 await page.locator('#ben-ve-okulum summary').click();await expect(page.locator('#ben-ve-okulum')).toContainText('Adil paylaşım herkesin aynı işi yapması demek değildir');
 await page.goto('/test.html?sinif=3&ders=hayat-bilgisi&konu=ben-ve-okulum&zorluk=zor&test=1');await expect(page.locator('[data-choice]')).toHaveCount(3);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);expect(overflow).toBe(false);
});
