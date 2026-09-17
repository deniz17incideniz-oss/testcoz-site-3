import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{await page.route('https://**/*',r=>r.abort());});
for(const width of [320,375,390,430,768])test(`layout and navigation ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const url of ['/','/sinif-1.html','/ders/1-sinif-matematik.html','/kayit.html','/hakkimizda.html','/404.html']){
  await page.goto(url);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),url).toBeTruthy();
 }
 await page.goto('/');const menu=page.locator('#mobileMenuBtn');if(await menu.isVisible()){await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');}
 if(width===390)await page.screenshot({path:'outputs/home-mobile.png',fullPage:true});
});
for(const grade of [1,2,3,4])test(`grade ${grade} complete, wrong, skipped and restart`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.locator(`#siniflar a[href="sinif-${grade}.html"]`).click();
 await page.locator(`a[href="ders/${grade}-sinif-matematik.html"]`).click();
 await page.locator('.difficulty-link').first().click();await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await expect(page.locator('.test-counter')).toHaveText('Soru 1 / 10');
 const correct=await page.evaluate(()=>{const p=new URLSearchParams(location.search);return window.TESTCOZ_TESTS.find(t=>t.classLevel===Number(p.get('sinif'))&&t.subject===p.get('ders')&&t.topic===p.get('konu')&&t.difficulty===p.get('zorluk')).questions.map(q=>q.correctAnswer);});
 await expect(page.locator('.report-question')).toHaveAttribute('href',/mailto:iletisim@testcoz.pro/);
 for(let i=0;i<10;i++){
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  for(const img of await page.locator('#questionArea img').all())await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
  if(i<7){await page.locator(`[data-choice="${correct[i]}"]`).click();await expect(page.locator('[aria-pressed="true"]')).toHaveCount(1);await page.locator('#nextQuestion').click();}
  else if(i<9){await page.locator(`[data-choice="${(correct[i]+1)%4}"]`).click();await page.locator('#nextQuestion').click();}
  else {await page.locator('[data-choice="0"]').click();await page.locator('#skipQuestion').click();}
 }
 await expect(page.locator('.result-score')).toHaveText('%70');
 await expect(page.locator('.result-stat-val')).toHaveText(['7','2','1']);await expect(page.locator('.wrong-item')).toHaveCount(3);
 await page.getByRole('link',{name:'Yanlışlarını Öğren',exact:true}).click();await expect(page.locator('#wrongReview')).toBeFocused();
 if(grade===1)await page.screenshot({path:'outputs/result-mobile.png',fullPage:true});
 await page.locator('#restartTest').click();await expect(page.locator('.test-counter')).toHaveText('Soru 1 / 10');await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
 expect(errors).toEqual([]);
});
test('registration, login, panel and logout UI with explicit API fixtures',async({page})=>{
 let registration;
 await page.route('**/api/register',async r=>{registration=r.request().postDataJSON();await r.fulfill({json:{success:true,message:'Kayıt alındı.'}});});
 await page.route('**/api/login',r=>r.fulfill({json:{success:true,message:'Giriş başarılı.'}}));
 await page.route('**/api/student-weaknesses',r=>r.fulfill({json:{user:{studentName:'Deneme',classLevel:1,dailyGoal:10},recentTests:[],weaknesses:[]}}));
 await page.route('**/api/logout',r=>r.fulfill({json:{success:true}}));
 await page.goto('/kayit.html');await page.locator('#studentName').fill('Deneme');await page.locator('#classLevel').selectOption('1');await page.locator('#dailyGoal').fill('10');await page.locator('#email').fill('guardian@example.com');await page.locator('#password').fill('Example123!');await page.locator('#passwordConfirm').fill('Example123!');await page.locator('#consent').check();await page.locator('#registerButton').click();
 await expect(page).toHaveURL(/giris.html/);expect(registration.phone).toBe('');
 await page.locator('#loginEmail').fill('guardian@example.com');await page.locator('#loginPassword').fill('Example123!');await page.locator('button[type="submit"]').click();await expect(page).toHaveURL(/panel.html/);
 await expect(page.locator('#recentTests')).toContainText('Henüz');await page.locator('#logoutButton').click();await expect(page).toHaveURL(/index.html/);
});
