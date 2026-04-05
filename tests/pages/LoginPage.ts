import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    private readonly headerLoginButtonLocator: Locator;
    private readonly loginFormLocator;
    private readonly captchaLoginFormLocator: Locator;

    constructor (page: Page) {
        super(page);
        this.headerLoginButtonLocator = this.page.getByRole('link', { name: '⏎' });
        this.loginFormLocator = this.page.locator('#auth');
        this.captchaLoginFormLocator = this.page.locator('.captcha');
    }

    async openLoginPage() {
        await this.headerLoginButtonLocator.click();
        await this.page.waitForURL(/forum\/index\.php\?act=auth/);
    }

    async loginFormHasCorrectLayout() {
        await this.checkLayoutByScreenshot(this.loginFormLocator, 'loginForm.png', [this.captchaLoginFormLocator]);
    }

    async loginFormHasCorrectAriaSnapshot() {
        await this.checkAriaSnapshot(this.loginFormLocator, 'loginForm.yml');
    }
}