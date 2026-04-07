import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    private readonly headerLoginButtonLocator: Locator;
    private readonly loginFormLocator;
    private readonly captchaLoginFormLocator: Locator;
    private readonly rememberCheckboxLoginFormLocator: Locator;
    private readonly anonymLoginCheckboxLoginFormLocator: Locator;
    private readonly cantFillAnswerCheckboxLoginFormLocator: Locator;

    constructor (page: Page) {
        super(page);
        this.headerLoginButtonLocator = this.page.getByRole('link', { name: '⏎' });
        this.loginFormLocator = this.page.locator('#auth');
        this.captchaLoginFormLocator = this.page.locator('.captcha');
        this.rememberCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Запомнить?' });
        this.anonymLoginCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Скрытый вход?' });
        this.cantFillAnswerCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Я не могу ввести ответ' });
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

    async rememberCheckboxIsChecked() {
        await this.elementIsChecked(this.rememberCheckboxLoginFormLocator);
    }

    async anonymCheckboxIsChecked() {
        await this.elementIsChecked(this.anonymLoginCheckboxLoginFormLocator);
    }

    async cantFillAnswerCheckboxIsChecked() {
        await this.elementIsChecked(this.cantFillAnswerCheckboxLoginFormLocator);
    }
}