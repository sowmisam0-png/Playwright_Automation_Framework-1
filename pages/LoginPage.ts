import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { amazonLocators } from '../locators/amazon.locators';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.fill(amazonLocators.emailInput, username);
    await this.page.click(amazonLocators.continueButton);
    await this.page.fill(amazonLocators.passwordInput, password);
    await this.page.click(amazonLocators.signInSubmit);
  }

  async verifyLoggedIn() {
    await expect(this.page.locator(amazonLocators.navUserName)).toBeVisible();
  }
}
