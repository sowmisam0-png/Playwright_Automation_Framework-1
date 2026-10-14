import fs from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { readDataFile } from '../utils/excelReader';

const csvFile = path.resolve(__dirname, '../test-data/amazon-users.csv');
const excelFile = path.resolve(__dirname, '../test-data/amazon-users.xlsx');
const selectedFile = fs.existsSync(excelFile) ? 'amazon-users.xlsx' : 'amazon-users.csv';
const rawUsername = process.env.AMAZON_USERNAME?.trim();
const rawPassword = process.env.AMAZON_PASSWORD?.trim();
const hasCredentials = Boolean(rawUsername && rawPassword && rawUsername !== 'your_email_or_phone' && rawPassword !== 'your_password');
const testUsers = hasCredentials ? readDataFile(selectedFile) : [
  { username: rawUsername || 'your_email_or_phone', password: rawPassword || 'your_password' }
];

test.describe('Amazon login using Excel or CSV data', () => {
  for (const user of testUsers) {
    test(`login with ${String(user.username)}`, async ({ page }) => {
      test.skip(!hasCredentials, 'Set AMAZON_USERNAME and AMAZON_PASSWORD in .env before running the real Amazon login flow.');

      const homePage = new HomePage(page);
      const loginPage = new LoginPage(page);

      await homePage.open();
      await homePage.goToSignIn();
      await loginPage.login(String(user.username), String(user.password));

      await expect(page).toHaveURL(/amazon\.com/);
    });
  }
});

console.log(`Data loaded from: ${selectedFile}`);
console.log(`CSV fallback path: ${csvFile}`);
