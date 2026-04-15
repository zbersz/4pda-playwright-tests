import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  mainPage: MainPage;
  loginPage: LoginPage;
  lostPassView: LoginPage;
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

  lostPassView: async ({ loginPage }, use) => {
    await loginPage.goToLostPassPage();
    await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOSTPASS_URL);
    await use(loginPage);
  },
});

export { expect }; 