import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
    private readonly headerLoginButtonLocator: Locator;
    private readonly loginFormLocator: Locator;
    private readonly captchaLoginFormLocator: Locator;
    private readonly rememberCheckboxLoginFormLocator: Locator;
    private readonly anonymLoginCheckboxLoginFormLocator: Locator;
    private readonly cantFillAnswerCheckboxLoginFormLocator: Locator;
    readonly upperRegisterLinkLoginFormLocator: Locator;
    readonly lowerRegisterLinkLoginFormLocator: Locator;
    readonly upperLostPasswordLinkLoginFormLocator: Locator;
    readonly lowerLostPasswordLinkLoginFormLocator: Locator;
    static readonly AUTH_REG_URL: RegExp = /forum\/index\.php\?act=auth#reg/;
    static readonly AUTH_URL: RegExp = /forum\/index\.php\?act=auth/;
    static readonly AUTH_LOSTPASS_URL: RegExp = /forum\/index\.php\?act=auth#lostpass/;

    constructor (page: Page) {
        super(page);
        this.headerLoginButtonLocator = this.page.getByRole('link', { name: '⏎' });
        this.loginFormLocator = this.page.locator('#auth');
        this.captchaLoginFormLocator = this.page.locator('.captcha');
        this.rememberCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Запомнить?' });
        this.anonymLoginCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Скрытый вход?' });
        this.cantFillAnswerCheckboxLoginFormLocator = this.page.getByRole('checkbox', { name: 'Я не могу ввести ответ' });
        this.upperRegisterLinkLoginFormLocator = this.page.getByRole('link', { name: 'Зарегистрироваться' }).nth(0);
        this.lowerRegisterLinkLoginFormLocator = this.page.getByRole('link', { name: 'Зарегистрироваться' }).nth(1);
        this.upperLostPasswordLinkLoginFormLocator = this.page.getByRole('link', { name: 'Забыли пароль?' }).nth(0);
        this.lowerLostPasswordLinkLoginFormLocator = this.page.getByRole('link', { name: 'Забыли пароль?' }).nth(1);
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

    async linkHasCorrectUrl(locator: Locator, url: RegExp) {
        await locator.click();
        await this.checkUrl(url);
    }
}