import {test,expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';
const groups=new Map();
for(const t of tests.filter(t=>t.classLevel<=3&&t.testNumber===1))groups.set(`${t.classLevel}:${t.subject}`,t);
for(const [key,t]of groups)test(`all browser choices and answer keys match the source for ${key}`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.goto(`/test.html?sinif=${t.classLevel}&ders=${t.subject}&konu=${t.topic}&zorluk=${t.difficulty}&test=1`);
 await expect(page.locator('[data-choice]')).toHaveCount(3);
 const actual=await page.evaluate(()=>window.TestCozTestNormalizer.normalizeAllTests(window.TESTCOZ_TESTS).filter(t=>t.testNumber===1).flatMap(t=>t.questions.map(q=>({id:q.id,choices:q.choices,answer:q.choices[q.correctAnswer]}))));
 const expected=tests.filter(x=>x.classLevel===t.classLevel&&x.subject===t.subject&&x.testNumber===1).flatMap(t=>t.questions.map(q=>({id:q.id,choices:q.choices,answer:q.choices[q.correctAnswer]})));
 expect(actual).toEqual(expected);
 expect(actual.every(q=>q.choices.length===3)).toBe(true);
});

test('science evidence cards and wrong-answer explanations fit a mobile screen',async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto('/test.html?sinif=3&ders=fen-bilimleri&konu=hareketi-kesfediyorum&zorluk=zor&test=1');
 for(let i=0;i<2;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('#questionArea')).toContainText('B arabası');
 const img=page.locator('#questionArea img');await expect(img).toBeVisible();
 expect(await img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'outputs/science-evidence-mobile.png',fullPage:true});
 for(let i=2;i<10;i++)await page.locator('#skipQuestion').click();
 await page.getByRole('link',{name:'Yanlışlarını Öğren',exact:true}).click();
 await expect(page.locator('#wrongReview')).toContainText('Eşit sürelerde alınan yollar karşılaştırılır');
 await page.goto('/ders/3-sinif-fen-bilimleri.html#hareketi-kesfediyorum');
 await page.locator('#hareketi-kesfediyorum summary').click();
 await expect(page.locator('#hareketi-kesfediyorum')).toContainText('Süreler ve karolar eşit');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:'outputs/science-lesson-mobile.png',fullPage:true});
});
