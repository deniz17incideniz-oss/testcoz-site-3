import {test,expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';
const cases=[
 [2,'classroom-life','Ready for the Lesson'],[2,'personal-life','My Age and Hair'],[2,'family-life','My Mother'],[2,'homes-houses-and-neighbourhoods','My Room and My Cat'],[2,'life-in-the-city-and-the-world','Food and Drinks'],
 [3,'school-life','A Day at School'],[3,'classroom-life','Ready for the Lesson'],[3,'personal-life','Cold Weather and My Coat'],[3,'homes-houses-and-the-neighbourhood','Our Farm and Cows'],[3,'life-in-the-city-and-the-world','At a Café']
];
for(const [grade,topic,answer] of cases)test(`passage evidence ${grade}/${topic}`,async({page,request})=>{
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 const slug=`${grade}-sinif-ingilizce-${topic}-kolay-test-1`,t=tests.find(x=>x.slug===slug),q=t.questions[9];
 expect(q.choices).toHaveLength(4);expect(q.correctAnswer).toBe(0);expect(q.choices[q.correctAnswer]).toBe(answer);expect(q.visual.type).toBe('plainCards');
 const first=q.visual.data.first,second=q.visual.data.second;expect(q.question).toContain(first);expect(q.question).toContain(second);expect(q.imageAlt).toContain(first);expect(q.imageAlt).toContain(second);
 await page.goto(`/tests/${slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();for(let i=1;i<10;i++)await page.locator('#skipQuestion').click();
 const area=page.locator('#questionArea'),img=area.locator('img');await expect(img).toHaveAttribute('alt',q.imageAlt);await expect(area).toContainText(first);await expect(area).toContainText(second);
 const src=await img.getAttribute('src'),svg=await (await request.get('/'+src.replace(/^\//,''))).text();expect(svg).toContain(first);expect(svg).toContain(second);expect(svg).not.toContain(answer);
 const bounds=await page.evaluate(markup=>{const div=document.createElement('div');div.style='position:fixed;left:-2000px;top:0;width:720px';div.innerHTML=markup;document.body.appendChild(div);const root=div.querySelector('svg'),vb=root.viewBox.baseVal;const failures=[...root.querySelectorAll('text')].map(e=>{const b=e.getBBox();return {text:e.textContent,x:b.x,y:b.y,right:b.x+b.width,bottom:b.y+b.height}}).filter(b=>b.x<18||b.y<18||b.right>vb.width-18||b.bottom>vb.height-18);div.remove();return failures;},svg);expect(bounds).toEqual([]);
 await area.locator('[data-choice]').filter({hasText:q.choices[1]}).click();await page.locator('#nextQuestion').click();const result=page.locator('.wrong-item').filter({hasText:first});await expect(result).toContainText(answer);await expect(result).toContainText(q.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
