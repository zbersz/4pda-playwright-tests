import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginFormFragment } from '../fragments/LoginFormFragment';
import { LostPassFormFragment } from '../fragments/LostPassFormFragment';
import { RegistrationFormFragment } from '../fragments/RegistrationFormFragment';

export class LoginPage extends BasePage {
    protected readonly siteLogoLocator: Locator;
    private readonly loginFormRoot: Locator;
    readonly loginForm: LoginFormFragment;
    private readonly lostPassFormRoot: Locator;
    readonly lostPassForm: LostPassFormFragment;
    private readonly registrationFormRoot: Locator;
    readonly registrationForm: RegistrationFormFragment;
    static readonly AUTH_LOGIN_URL: RegExp = /forum\/index\.php\?act=auth/;
    static readonly AUTH_REG_URL: RegExp = /forum\/index\.php\?act=auth#reg/;
    static readonly AUTH_LOSTPASS_URL: RegExp = /forum\/index\.php\?act=auth#lostpass/;

    constructor(page: Page) {
        super(page);

        this.siteLogoLocator = this.page.getByRole('link', { name: '4' });

        this.loginFormRoot = page.locator('#auth');
        this.loginForm = new LoginFormFragment(this.loginFormRoot, this);

        this.lostPassFormRoot = page.locator('#lostpass');
        this.lostPassForm = new LostPassFormFragment(this.lostPassFormRoot, this);

        this.registrationFormRoot = page.locator('#reg');
        this.registrationForm = new RegistrationFormFragment(this.registrationFormRoot, this);

    }

    async openLoginPage() {
        await this.page.goto('forum/index.php?act=auth');
        await expect(this.siteLogoLocator).toBeVisible();
    }

    async goToLostPassForm() {
        await this.page.goto('/forum/index.php?act=auth#lostpass');
    }

    async goToRegistrationForm() {
        await this.page.goto('/forum/index.php?act=auth#reg');
    }

    async goToRegisterFormFromLink(
        form: LoginFormFragment | LostPassFormFragment,
        position: 'upperLink' | 'lowerLink',
    ) {
        await form.goToRegisterForm(position);
    }

    async goToLostPassFormFromLink(
        form: LoginFormFragment | RegistrationFormFragment,
        position: 'upperLink' | 'lowerLink',
    ) {
        await form.goToLostPassForm(position);
    }

    async goToLoginFormFromLink(
        form: LostPassFormFragment | RegistrationFormFragment,
        position: 'upperLink' | 'lowerLink',
    ) {
        await form.goToLoginForm(position);
    }

}