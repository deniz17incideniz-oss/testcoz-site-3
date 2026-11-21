import {test,expect} from '@playwright/test';
// Production and draft have individually reviewed first questions. Check each explicitly;
// only these known variants are accepted so that unexpected content fails the test.
const cases=[
 {slug:'bilimsel-kesif-yolculugu',variants:[
  {evidence:'güneşteki buz daha önce eriyor',wrong:'Her buz parçası her yerde aynı sürede erir.',correct:'Bu denemede güneşteki buz gölgedekinden önce erimiştir.',explanation:'Tek bir deneme bütün buzlar',count:4},
  {evidence:'Güneşteki 8, gölgedeki 14 dakikada eriyor',wrong:'Bütün buzlar her yerde 8 dakikada erir.',correct:'Bu denemede güneşteki buz daha kısa sürede erimiştir.',explanation:'8 dakika, 14 dakikadan kısadır.',count:3}]},
 {slug:'yer-bilimciler-is-basinda',variants:[
  {evidence:'iki farklı mineral bulunuyor',wrong:'Bütün kayaçların sertliği aynıdır.',correct:'Bu kayaç örneği birden fazla mineral içerir.',explanation:'bütün kayaçların sertliğini göstermez',count:4},
  {evidence:'kuvars ve feldispat mineralleri bulunuyor',wrong:'Bütün kayaçlar mutlaka aynı mineralleri içerir.',correct:'Bir kayaç birden fazla mineral içerebilir.',explanation:'tek örnek bütün kayaçların aynı olduğunu kanıtlamaz.',count:3}]},
 {slug:'maddeyi-taniyalim-karistirip-ayiralim',variants:[
  {evidence:'kum içindeki demir parçalarını çektiğini',wrong:'Her karışım yalnız mıknatısla ayrılır.',correct:'Bu denemede mıknatıs demir parçalarını çekmiştir.',explanation:'Elek kullanımına dair bilgi verilmediği için',count:4},
  {evidence:'eleğin altında kum, üstünde çakıl',wrong:'Tanelerin mıknatıs tarafından çekilmesinden',correct:'Tanelerin büyüklüğünden',explanation:'bu işlemde mıknatıs veya renk kullanılmaz.',count:3}]},
 {slug:'yasamimizi-kolaylastiran-elektrik',variants:[
  {evidence:'düğmesini kapatınca ışığın söndüğünü',wrong:'Odanın büyüklüğünü değiştirme',correct:'Lambanın ışık verme durumunu kontrol etme',explanation:'başka araçların çalışması bu gözlemde incelenmemiştir',count:4},
  {evidence:'Aynı tür yeni pil doğru takılınca yanıyor',wrong:'Fenerin çalışmasında pilin hiçbir etkisi yoktur.',correct:'Eski pil feneri çalıştırmak için yeterli enerji sağlayamamış olabilir.',explanation:'Yeni pil ile çalışması eski pilin yetersiz kalmış olabileceğini destekler.',count:3}]}
];
for(const item of cases)test(`${item.slug}: conclusion matches observation`,async({page})=>{
 await page.route('https://**/*',route=>route.abort());await page.setViewportSize({width:320,height:850});
 await page.goto(`/tests/3-sinif-fen-bilimleri-${item.slug}-zor-test-1.html`);
 await page.getByRole('link',{name:'Teste Başla',exact:true}).click();
 const area=page.locator('#questionArea');await expect(area.locator('[data-choice]').first()).toBeVisible();
 const content=await area.innerText(),matches=item.variants.filter(v=>content.includes(v.evidence));expect(matches).toHaveLength(1);const selected=matches[0];
 await expect(area.locator('[data-choice]')).toHaveCount(selected.count);
 await expect(area.locator('[data-choice]').filter({hasText:selected.correct})).toHaveCount(1);
 await area.locator('[data-choice]').filter({hasText:selected.wrong}).click();await page.locator('#nextQuestion').click();
 for(let n=2;n<=10;n++)await page.locator('#skipQuestion').click();
 const review=page.locator('.wrong-item').filter({hasText:selected.evidence});await expect(review).toContainText(selected.correct);await expect(review).toContainText(selected.explanation);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
