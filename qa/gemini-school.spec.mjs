import {test,expect} from '@playwright/test';

test('reviewed first-grade school test has three choices and actionable feedback',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 await expect(page.getByRole('radiogroup').getByRole('radio')).toHaveCount(3);
 await expect(page.locator('#questionArea')).toContainText('Ders programına');
 await page.getByRole('radio',{name:/Hava durumuna/}).click();
 await page.locator('#nextQuestion').click();
 for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
 await expect(page.locator('.wrong-item').first()).toContainText('Ders programı');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});


test('school questions show clear choices and explanations on mobile',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:320,height:850});
 await page.goto('/tests/1-sinif-hayat-bilgisi-ben-ve-okulum-kolay-test-1.html');
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 const checks={3:['Okulun yönetiminden','Servis şoförü'],4:['kitapları alıp','Spor salonu'],6:['Okul bahçesi nasıl','Sadece bir öğrencinin'],7:['bir rafı var','masanın üzerinde'],10:['aynı oyuncağı','İkimizden biri']};
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(checks[n]){await expect(area).toContainText(checks[n][0]);await area.locator('[data-choice]').filter({hasText:checks[n][1]}).click();await page.locator('#nextQuestion').click();}
  else await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'Okulun yönetiminden'})).toContainText('Okul müdürü');
 await expect(page.locator('.wrong-item').filter({hasText:'aynı oyuncağı'})).toContainText('Sırayla oynamayı konuşmak');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
