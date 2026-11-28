import {test, expect} from '@playwright/test';
import path from 'node:path';
import os from 'node:os';
import {tests} from '../scripts/load-bank.mjs';

const slug='4-sinif-matematik-veri-zor-test-1';
const item=tests.find(test=>test.slug===slug).questions[9];
for(const width of [320,375]) test(`Reading target pictograph and scoring at ${width}px`,async({page,request})=>{
  expect(item.id).toBe(`${slug}-soru-10`);
  expect(item.visual.data).toEqual({unit:4,groups:[{label:'4-A',count:6},{label:'4-B',count:8}]});
  expect(item.choices).toEqual(['3','4','6','2']);
  expect(item.correctAnswer).toBe(3);
  await page.route('https://**/*',route=>route.abort());
  await page.setViewportSize({width,height:850});
  async function openQuestion(){
    await page.goto('/test.html?sinif=4&ders=matematik&konu=veri&zorluk=zor&test=1');
    for(let i=0;i<9;i++) await page.locator('#skipQuestion').click();
  }
  await openQuestion();
  const img=page.locator('#questionArea img');
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute('alt','Her kitap resmi 4 kitabı gösterir. 4-A için 6 kitap resmi, 4-B için 8 kitap resmi vardır.');
  await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBeTruthy();
  await expect(page.locator('.question-text')).toContainText('100 kitap okuma hedefi');
  await expect(page.locator('.question-text')).toContainText('22 öğrenci');
  const response=await request.get('/'+item.image); expect(response.status()).toBe(200);
  const svg=await response.text();
  const layout=await page.evaluate(markup=>{
    const host=document.createElement('div');host.style='position:fixed;left:-2000px;width:360px';host.innerHTML=markup;document.body.append(host);
    const root=host.querySelector('svg'), view=root.viewBox.baseVal;
    const books=[...root.querySelectorAll('.book-icon')].map(el=>{const b=el.getBBox();return {x:b.x,y:b.y,w:b.width,h:b.height}});
    const text=[...root.querySelectorAll('text')].map(el=>{const b=el.getBBox();return {value:el.textContent,x:b.x,y:b.y,w:b.width,h:b.height}});
    const outside=[...root.querySelectorAll('text,rect,path')].filter(el=>{const b=el.getBBox();return b.x<0||b.y<0||b.x+b.width>view.width||b.y+b.height>view.height}).length;
    host.remove();return {books,text,outside};
  },svg);
  expect(layout.outside).toBe(0); expect(layout.books).toHaveLength(14);
  const rows=[layout.books.filter(x=>x.y<200),layout.books.filter(x=>x.y>=200)];
  expect(rows.map(row=>row.length)).toEqual([6,8]);
  for(let row=0;row<rows.length;row++){
    const label=layout.text.find(t=>t.value===['4-A','4-B'][row]);
    expect(rows[row][0].x).toBeGreaterThan(label.x+label.w);
    for(let i=1;i<rows[row].length;i++) expect(rows[row][i].x).toBeGreaterThan(rows[row][i-1].x+rows[row][i-1].w);
    expect(rows[row].at(-1).x+rows[row].at(-1).w).toBeLessThan(336);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();
  if(width===320) await page.screenshot({path:path.join(os.tmpdir(),'testcoz-reading-target-320.png'),fullPage:true});
  await page.locator('[data-choice="0"]').click();await page.locator('#nextQuestion').click();
  await expect(page.locator('.result-stat-val')).toHaveText(['0','1','9']);
  const review=page.locator('.wrong-item').last();
  await expect(review).toContainText('44 ÷ 22 = 2');
  await expect(review).toContainText('100 − 56 = 44');
  await openQuestion();await page.locator('[data-choice="3"]').click();await page.locator('#nextQuestion').click();
  await expect(page.locator('.result-stat-val')).toHaveText(['1','0','9']);
});
