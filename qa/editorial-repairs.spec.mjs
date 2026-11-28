import {test,expect} from '@playwright/test';

test.beforeEach(async({page})=>{await page.route('https://**/*',r=>r.abort());});
test('grade 3 family Test 2 presents repaired family content and explanation',async({page})=>{
 await page.goto('/test.html?sinif=3&ders=ingilizce&konu=family-life&zorluk=zor&test=2');
 await expect(page.locator('#questionArea')).toContainText('Mert is my brother');
 await page.locator('[data-choice="1"]').click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await page.getByRole('link',{name:'Yanlışlarını Öğren',exact:true}).click();
 await expect(page.locator('#wrongReview')).toContainText('Our mother');
});

test('Test 1 uses subject-specific editorial bundle and leaves unrelated routes light',async({page})=>{
 const requests=[];page.on('request',r=>requests.push(r.url()));
 await page.goto('/test.html?sinif=3&ders=ingilizce&konu=family-life&zorluk=kolay&test=1');
 await expect(page.locator('#questionArea')).toContainText('This is my mother');
 expect(requests.some(u=>u.includes('/data/runtime/editorial-3-ingilizce.js'))).toBeTruthy();
 expect(requests.some(u=>u.endsWith('/data/tests/zz-editorial-repairs.js'))).toBeFalsy();
});

test('topic lesson is reachable, expandable, and fits on a narrow screen',async({page})=>{
 await page.setViewportSize({width:320,height:800});
 await page.goto('/ders/3-sinif-ingilizce.html#family-life');
 const card=page.locator('#family-life');
 await card.getByText('Konuyu öğren: örnek, çözüm ve çalışma').click();
 await expect(card).toContainText('Annenin kız kardeşi teyzedir');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
 await card.screenshot({path:'outputs/topic-lesson-mobile.png'});
});
