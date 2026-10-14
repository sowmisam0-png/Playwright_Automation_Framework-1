import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const productsToSearch = ['iphone', 'laptop', 'wireless mouse'];

for (const [index, productName] of productsToSearch.entries()) {
  test(`search for ${productName} - case ${index + 1}`, async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.searchProduct(productName);

    await expect(page).toHaveURL(/amazon\.com\/s\//i);
  });
}
