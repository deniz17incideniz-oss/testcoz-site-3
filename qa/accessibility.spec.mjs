import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('representative pages: WCAG A/AA and screenshots',async({page})=>{
 await page.route('https://**/*',r=>r.abort());
 await page.setViewportSize({width:1440,height:1000});
 for(const url of ['/','/ders/1-sinif-matematik.html','/tests/1-sinif-matematik-sayilar-ve-nicelikler-kolay-test-1.html','/kayit.html','/giris.html','/404.html']){
  await page.goto(url);
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),url).toEqual([]);
  if(url==='/')await page.screenshot({path:'outputs/home-desktop.png'});
 }
 await page.setViewportSize({width:390,height:844});await page.goto('/');await page.screenshot({path:'outputs/home-mobile-viewport.png'});
 await page.goto('/test.html?sinif=1&ders=matematik&konu=sayilar-ve-nicelikler&zorluk=kolay&test=1');
 await expect(page.locator('.question-text')).toBeVisible();
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
