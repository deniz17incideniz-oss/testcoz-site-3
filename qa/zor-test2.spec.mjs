import {test,expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';
const bank=tests.filter(t=>t.testNumber===2);
test('grade 4 Hayat Bilgisi remains reachable from the class page and indexed',async({page,request})=>{
 const t=bank.find(t=>t.classLevel===4&&t.subject==='hayat-bilgisi');
 await page.goto('/sinif-4.html');
 await page.locator('a[href="ders/4-sinif-hayat-bilgisi.html"]').click();
 const link=page.locator(`a[href="../${t.pageUrl}"]`);
 await expect(link).toContainText('Zor · Test 2');
 await link.click();
 await expect(page.locator('h1')).toContainText('Zor Test 2');
 const sitemap=await (await request.get('/sitemap.xml')).text();
 expect(sitemap).toContain(`https://testcoz.pro/${t.pageUrl}`);
});
for(const width of [320,375,768,1440])for(const grade of [1,2,3,4])test(`Zor Test 2 grade ${grade} ${width}px scoring and navigation`,async({page})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width,height:900});
 const t=bank.find(t=>t.classLevel===grade&&t.subject===(grade%2?'matematik':'ingilizce'));
 await page.goto(`/ders/${grade}-sinif-${t.subject}.html`);const link=page.locator(`a[href="../${t.pageUrl}"]`);await expect(link).toContainText('Test 2');await link.click();
 await expect(page.locator('h1')).toContainText('Test 2');await page.getByRole('link',{name:'Teste Başla',exact:true}).click();await expect(page.locator('.test-counter')).toHaveText('Soru 1 / 10');
 for(let i=0;i<10;i++){expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();if(i<7)await page.locator(`[data-choice="${t.questions[i].correctAnswer}"]`).click();else if(i<9)await page.locator(`[data-choice="${(t.questions[i].correctAnswer+1)%t.questions[i].choices.length}"]`).click();await page.locator(i===9?'#skipQuestion':'#nextQuestion').click();}
 await expect(page.locator('.result-stat-val')).toHaveText(['7','2','1']);await expect(page.locator('.wrong-item')).toHaveCount(3);await page.getByRole('link',{name:'Yanlışlarını Öğren',exact:true}).click();await expect(page.locator('#wrongReview')).toBeFocused();await expect(page.locator('#wrongReview')).toContainText(t.questions[9].explanation);
 await page.locator('a[href="index.html"]').first().click();await expect(page).toHaveURL(/index.html$/);
});
test('All 130 Test 2 routes and 35 visuals are reachable',async({page,request})=>{
 for(const t of bank){const r=await request.get('/'+t.pageUrl);expect(r.status()).toBe(200);const html=await r.text();expect(html).toContain(`https://testcoz.pro/${t.pageUrl}`);expect(html).toContain('test=2');for(const q of t.questions.filter(q=>q.image)){const r=await request.get('/'+q.image);expect(r.status()).toBe(200);expect(await r.text()).toContain('<svg');}}
});
// Each visual journey gets its own timeout and failure report. The previous
// aggregate shared 60 seconds across every route plus every visual question.
for(const t of bank.filter(t=>t.questions.some(q=>q.image)))test(`Visual journey ${t.slug}`,async({page})=>{
 await page.goto(`/test.html?sinif=${t.classLevel}&ders=${t.subject}&konu=${t.topic}&zorluk=zor&test=2`);
 for(let i=0;i<10;i++){
  await expect(page.locator('.test-counter')).toHaveText(`Soru ${i+1} / 10`);
  if(t.questions[i].image){
   const img=page.locator('#questionArea img');await expect(img).toBeVisible();
   await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
  }
  if(i<9)await page.locator('#skipQuestion').click();
 }
});
