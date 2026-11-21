import {test,expect} from '@playwright/test';

for(const [grade,subject,topic,count] of [[3,'hayat-bilgisi','ben-ve-okulum',3],[4,'matematik','bolme',4]]) {
 test(`grade ${grade}: single-choice keyboard navigation and answer restoration`,async({page})=>{
  await page.goto(`/test.html?sinif=${grade}&ders=${subject}&konu=${topic}&zorluk=kolay&test=1`);
  const group=page.getByRole('radiogroup');const radios=group.getByRole('radio');
  await expect(radios).toHaveCount(count);
  await expect(group).toHaveAccessibleName(/.+/);
  await radios.first().focus();await page.keyboard.press('ArrowLeft');
  await expect(radios.last()).toBeFocused();await expect(radios.last()).toHaveAttribute('aria-checked','true');
  await page.keyboard.press('ArrowRight');await expect(radios.first()).toBeFocused();
  await page.keyboard.press('ArrowDown');await expect(radios.nth(1)).toHaveAttribute('aria-checked','true');
  await expect(group.locator('[aria-checked="true"]')).toHaveCount(1);
  await page.locator('#nextQuestion').click();await page.locator('#previousQuestion').click();
  await expect(page.getByRole('radiogroup').getByRole('radio').nth(1)).toHaveAttribute('aria-checked','true');
  await expect(page.getByRole('radiogroup').getByRole('radio').nth(1)).toHaveAttribute('tabindex','0');
 });
}
