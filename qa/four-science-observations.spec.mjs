import {test,expect} from '@playwright/test';
const cases=[
 {slug:'bilimsel-kesif-yolculugu',evidence:'güneşteki buz daha önce eriyor',wrong:'Her buz parçası her yerde aynı sürede erir.',correct:'Bu denemede güneşteki buz gölgedekinden önce erimiştir.',explanation:'Tek bir deneme bütün buzlar'},
 {slug:'yer-bilimciler-is-basinda',evidence:'iki farklı mineral bulunuyor',wrong:'Bütün kayaçların sertliği aynıdır.',correct:'Bu kayaç örneği birden fazla mineral içerir.',explanation:'bütün kayaçların sertliğini göstermez'},
 {slug:'maddeyi-taniyalim-karistirip-ayiralim',evidence:'kum içindeki demir parçalarını çektiğini',wrong:'Her karışım yalnız mıknatısla ayrılır.',correct:'Bu denemede mıknatıs demir parçalarını çekmiştir.',explanation:'Elek kullanımına dair bilgi verilmediği için'},
 {slug:'yasamimizi-kolaylastiran-elektrik',evidence:'düğmesini kapatınca ışığın söndüğünü',wrong:'Odanın büyüklüğünü değiştirme',correct:'Lambanın ışık verme durumunu kontrol etme',explanation:'başka araçların çalışması bu gözlemde incelenmemiştir'}
];
for(const item of cases)test(`${item.slug}: conclusion matches observation`,async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-fen-bilimleri-${item.slug}-zor-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 const area=page.locator('#questionArea');await expect(area).toContainText(item.evidence);await expect(area.locator('[data-choice]')).toHaveCount(4);
 await area.locator('[data-choice]').filter({hasText:item.wrong}).click();await page.locator('#nextQuestion').click();
 for(let n=2;n<=10;n++)await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:item.evidence});await expect(review).toContainText(item.correct);await expect(review).toContainText(item.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
