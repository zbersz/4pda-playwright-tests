import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginFormFragment } from '../fragments/LoginFormFragment';
import { LostPassFormFragment } from '../fragments/LostPassFormFragment';

export class LoginPage extends BasePage {
    private readonly loginFormRoot: Locator;
    readonly loginForm: LoginFormFragment;
    private readonly lostPassFormRoot: Locator;
    readonly lostPassForm: LostPassFormFragment;
    static readonly AUTH_URL: RegExp = /forum\/index\.php\?act=auth/;
    static readonly AUTH_REG_URL: RegExp = /forum\/index\.php\?act=auth#reg/;
    static readonly AUTH_LOSTPASS_URL: RegExp = /forum\/index\.php\?act=auth#lostpass/;

    constructor(page: Page) {
        super(page);

        this.loginFormRoot = page.locator('#auth');
        this.loginForm = new LoginFormFragment(this.loginFormRoot, this);

        this.lostPassFormRoot = page.locator('#lostpass');
        this.lostPassForm = new LostPassFormFragment(this.lostPassFormRoot, this);
    }

    async goToLostPassPage() {
        await this.page.goto('/forum/index.php?act=auth#lostpass');
        await this.checkUrl(LoginPage.AUTH_LOSTPASS_URL);
        await expect(this.lostPassForm.lostPassText).toBeVisible();
    }

    async checkRegisterFromUpperLink() {
        await this.loginForm.goToRegister('upper');
        await this.checkUrl(LoginPage.AUTH_REG_URL);
    }

    async checkRegisterFromLowerLink() {
        await this.loginForm.goToRegister('lower');
        await this.checkUrl(LoginPage.AUTH_REG_URL);
    }
    
    async checkLostPassFromUpperLink() {
        await this.loginForm.goToLostPass('upper');
        await this.checkUrl(LoginPage.AUTH_LOSTPASS_URL);
    }

    async checkLostPassFromLowerLink() {
        await this.loginForm.goToLostPass('lower');
        await this.checkUrl(LoginPage.AUTH_LOSTPASS_URL);
    }

}