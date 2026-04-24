import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { LoginFormFragment } from '../fragments/LoginFormFragment';
import { LostPassFormFragment } from '../fragments/LostPassFormFragment';
import { RegistrationFormFragment } from '../fragments/RegistrationFormFragment';

type MyFixtures = {
  mainPage: MainPage;
  loginPage: LoginPage;
  loginForm: LoginFormFragment;
  lostPassForm: LostPassFormFragment;
  registrationForm: RegistrationFormFragment;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await use(mainPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await use(loginPage);
  },

  loginForm: async ({ loginPage }, use) => {
    await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
    await use(loginPage.loginForm);
  },

  lostPassForm: async ({ loginPage }, use) => {
    await loginPage.goToLostPassForm();
    await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOSTPASS_URL);
    await use(loginPage.lostPassForm);
  },

  registrationForm: async ({ loginPage }, use) => {
    await loginPage.goToRegistrationForm();
    await expect(loginPage.page).toHaveURL(LoginPage.AUTH_REG_URL);
    await use(loginPage.registrationForm);
  },
});

export { expect }; 