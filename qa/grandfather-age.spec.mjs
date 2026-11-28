import {test,expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';

test('age question identifies the birthday and explains the calculation',async({page})=>{
 const t=tests.find(t=>t.slug==='4-sinif-matematik-zaman-olcme-zor-test-1'),q=t.questions[5];
 expect(q.id).toBe('4-sinif-matematik-zaman-olcme-zor-test-1-soru-6');
 expect(q.choices[q.correctAnswer]).toBe('11');
 await page.setViewportSize({width:320,height:850});
 await page.goto('/test.html?sinif=4&ders=matematik&konu=zaman-olcme&zorluk=zor&test=1');
 for(let i=0;i<5;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.question-text')).toContainText('doğum günümü kutladığım gün');
 await page.locator('[data-choice="1"]').click();await page.locator('#nextQuestion').click();
 for(let i=0;i<4;i++)await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').nth(5);
 await expect(review).toContainText('1968 − 1957 = 11');
 await expect(review.locator('.val-correct')).toHaveText('11');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
