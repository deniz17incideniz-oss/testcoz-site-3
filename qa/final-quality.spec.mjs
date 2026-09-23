import {test,expect} from '@playwright/test';
import fs from 'node:fs';
import {tests} from '../scripts/load-bank.mjs';
test.beforeEach(async({page})=>{await page.route('https://**/*',r=>r.abort());});
test('all sitemap URLs return 200 without redirect',async({request})=>{
 const urls=[...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 for(let i=0;i<urls.length;i+=8)await Promise.all(urls.slice(i,i+8).map(async url=>{const r=await request.get(url,{maxRedirects:0});expect(r.status(),url).toBe(200);}));
});
for(const grade of [1,2,3,4])test(`grade ${grade} hard test, back navigation and continuation`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const bank=tests.find(t=>t.classLevel===grade&&t.subject==='matematik'&&t.difficulty==='zor'&&(grade!==4||t.topic==='geometrik-cisimler'));
 await page.goto('/'+bank.pageUrl);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await page.locator('[data-choice="1"]').click();await page.locator('#nextQuestion').click();await page.locator('#previousQuestion').click();await expect(page.locator('[data-choice="1"]')).toHaveAttribute('aria-pressed','true');
 for(let i=0;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-score')).toHaveText('%0');await expect(page.locator('.wrong-item')).toHaveCount(10);
 await expect(page.getByRole('link',{name:'Bir Üst Seviyeyi Dene'})).toHaveCount(0);
 await page.getByRole('link',{name:'Benzer Test Çöz',exact:true}).click();await expect(page.getByRole('link',{name:'Teste Başla',exact:true})).toBeVisible();expect(errors).toEqual([]);
});
test('invalid registration stays local, rejected login and expired session',async({page})=>{
 let sent=0;await page.route('**/api/register',r=>{sent++;return r.fulfill({status:400,json:{message:'Geçersiz kayıt'}});});
 await page.goto('/kayit.html');await page.locator('#registerButton').click();expect(sent).toBe(0);await expect(page).toHaveURL(/kayit/);
 await page.route('**/api/login',r=>r.fulfill({status:401,json:{message:'E-posta veya şifre hatalı.'}}));
 await page.goto('/giris.html');await page.locator('#loginEmail').fill('guardian@example.com');await page.locator('#loginPassword').fill('Incorrect123!');await page.locator('button[type="submit"]').click();await expect(page.locator('body')).toContainText('E-posta veya şifre hatalı.');
 await page.goto('/panel.html');await expect(page).toHaveURL(/giris.html/);
});
test('representative screenshots',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const [name,url] of Object.entries({class:'/sinif-4.html',subject:'/ders/4-sinif-matematik.html',landing:'/tests/4-sinif-matematik-geometrik-cisimler-zor-test-1.html',register:'/kayit.html',guide:'/rehber/yanlis-sorulardan-ogrenme-yontemi.html',quiz:'/test.html?sinif=4&ders=matematik&konu=geometrik-cisimler&zorluk=zor&test=1'})){
 await page.goto(url);if(name==='quiz')await expect(page.locator('.question-text')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();await page.screenshot({path:`outputs/${name}-mobile.png`,fullPage:true});
 }
});
test('double click advances one question only',async({page})=>{
 await page.goto('/test.html?sinif=1&ders=matematik&konu=sayilar-ve-nicelikler&zorluk=kolay&test=1');
 await page.locator('#nextQuestion').dblclick();await expect(page.locator('.test-counter')).toHaveText('Soru 2 / 10');
});
test('result edge cases calculate score and review only unresolved questions',async({page})=>{
 const url='/test.html?sinif=4&ders=matematik&konu=dogal-sayilar&zorluk=zor&test=1';
 const cases=[
  {name:'all wrong',modes:Array(10).fill('wrong'),stats:['0','10','0'],score:'%0',review:10},
  {name:'all correct',modes:Array(10).fill('correct'),stats:['10','0','0'],score:'%100',review:0},
  {name:'all blank',modes:Array(10).fill('blank'),stats:['0','0','10'],score:'%0',review:10},
  {name:'five correct five wrong',modes:[...Array(5).fill('correct'),...Array(5).fill('wrong')],stats:['5','5','0'],score:'%50',review:5},
  {name:'one correct nine wrong',modes:['correct',...Array(9).fill('wrong')],stats:['1','9','0'],score:'%10',review:9}
 ];
 for(const scenario of cases){
  await test.step(scenario.name,async()=>{
   await page.goto(url);
   const correct=await page.evaluate(()=>window.TESTCOZ_TESTS.find(t=>t.classLevel===4&&t.subject==='matematik'&&t.topic==='dogal-sayilar'&&t.difficulty==='zor').questions.map(q=>q.correctAnswer));
   for(let i=0;i<10;i++){
    if(scenario.modes[i]==='blank')await page.locator('#skipQuestion').click();
    else {const choice=scenario.modes[i]==='correct'?correct[i]:(correct[i]+1)%4;await page.locator(`[data-choice="${choice}"]`).click();await page.locator('#nextQuestion').click();}
   }
   await expect(page.locator('.result-score')).toHaveText(scenario.score);
   await expect(page.locator('.result-stat-val')).toHaveText(scenario.stats);
   await expect(page.locator('.wrong-item')).toHaveCount(scenario.review);
   if(scenario.review===0){await expect(page.locator('.all-correct')).toContainText('İncelenecek yanlış veya boş soru bulunmuyor');await expect(page.locator('#reviewAnswers')).toHaveCount(0);}
  });
 }
});
test('invalid quiz parameters and missing bank fail safely',async({page,request})=>{
 await page.goto('/test.html?sinif=99&ders=matematik&konu=olmayan&zorluk=kolay&test=1');
 await expect(page.locator('body')).toContainText(/bulunamadı|geçersiz/i);
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content',/noindex/);
 const missing=await request.get('/kesinlikle-olmayan-sayfa');expect(missing.status()).toBe(404);
});
