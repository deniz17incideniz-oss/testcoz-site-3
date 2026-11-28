import {test,expect} from '@playwright/test';
import {tests} from '../scripts/load-bank.mjs';
test('second grade safety questions retain clear online and traffic guidance',async({page})=>{
 const t=tests.find(x=>x.slug==='2-sinif-hayat-bilgisi-sagligim-ve-guvenligim-orta-test-1');
 expect(t.questions[0].subSkill).toBe('Çevrim içi kişisel güvenlik');expect(t.questions[5].subSkill).toBe('Yaya geçidi levhası');
 await page.route('https://**/*',r=>r.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/${t.slug}.html`);await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 for(let n=1;n<=10;n++){
  const area=page.locator('#questionArea');
  if(n===1){await expect(area).toContainText('Adresimi paylaşmadan güvendiğim bir yetişkine haber vermeliyim.');await area.locator('[data-choice]').filter({hasText:'Adresimi herkesin görebileceği yere yazmalıyım.'}).click();await page.locator('#nextQuestion').click();continue;}
  if(n===6){await expect(area).toContainText('Yaya geçidi işareti');await expect(area).toContainText('Yayaların karşıya geçmesi için ayrılmış yer');}
  if(n===7){await expect(area).toContainText('Türkiye’de yangın');await expect(area).toContainText('112');}
  await page.locator('#skipQuestion').click();
 }
 await expect(page.locator('.wrong-item').filter({hasText:'oyun uygulamasında'})).toContainText('adresini paylaşma ve güvendiğin bir yetişkine haber ver');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
