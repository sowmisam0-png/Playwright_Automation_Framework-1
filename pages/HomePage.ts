import type { Page } from '@playwright/test';
import { amazonLocators } from '../locators/amazon.locators';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    const baseUrl = process.env.APP_URL || 'https://www.amazon.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToSignIn() {
    const signInUrl = 'https://www.amazon.com/ap/signin';
    await this.page.goto(signInUrl);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForSelector(amazonLocators.emailInput, { timeout: 20000 });
  }

  async searchProduct(productName: string) {
    await this.page.fill(amazonLocators.searchBox, productName);
    await this.page.click(amazonLocators.searchSubmit);
  }
}
