import type { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async open(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
  }
}
