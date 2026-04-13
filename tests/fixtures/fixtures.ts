import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  mainPage: MainPage;
  loginPage: LoginPage;
  lostPassPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await use(mainPage);
  },

  loginPage: async ({ mainPage }, use) => {
    const loginPage = await mainPage.goToLoginPage();
    await use(loginPage);
  },

  lostPassPage: async ({ loginPage }, use) => {
    await loginPage.goToLostPassPage();
    await use(loginPage);
  },
});

export { expect }; 