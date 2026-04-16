import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LoginFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;

    constructor(root: Locator, basePage: BasePage) {
        this.root = root;
        this.basePage = basePage;
    }

    get captchaContainer() {
        return this.root.locator('.captcha');
    }

    get captcha() {
        return this.root.locator('.captcha img');
    }

    get rememberCheckbox() {
        return this.root.getByRole('checkbox', { name: 'Запомнить?' });
    }

    get anonymLoginCheckbox() {
        return this.root.getByRole('checkbox', { name: 'Скрытый вход?' });
    }

    get cantFillAnswerCheckbox() {
        return this.root.getByRole('checkbox', { name: 'Я не могу ввести ответ' });
    }

    get upperRegisterLink() {
        return this.root.getByRole('link', { name: 'Зарегистрироваться' }).first();
    }

    get lowerRegisterLink() {
        return this.root.getByRole('link', { name: 'Зарегистрироваться' }).last();
    }

    get upperLostPassLink() {
        return this.root.getByRole('link', { name: 'Забыли пароль?' }).first();
    }

    get lowerLostPassLink() {
        return this.root.getByRole('link', { name: 'Забыли пароль?' }).last();
    }

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'loginForm.png', [this.captchaContainer]);
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'loginForm.yml');
    }

    async rememberCheckboxIsChecked() {
        await this.basePage.expectElementToBeChecked(this.rememberCheckbox);
    }

    async anonymCheckboxIsChecked() {
        await this.basePage.expectElementToBeChecked(this.anonymLoginCheckbox);
    }

    async cantFillAnswerCheckboxIsChecked() {
        await this.basePage.expectElementToBeChecked(this.cantFillAnswerCheckbox);
    }

    async goToRegister(link: 'upper' | 'lower') {
        const locator = 
            link === 'upper' ? this.upperRegisterLink : this.lowerRegisterLink;
        await locator.click();
    }

    async goToLostPass(link: 'upper' | 'lower') {
        const locator = 
            link === 'upper' ? this.upperLostPassLink : this.lowerLostPassLink;
        await locator.click();
    }

    async reloadPageChangesCaptcha() {
        await this.basePage.expectElementAttributeToChange(this.captcha, 'src', async () => {await this.basePage.page.reload();});
    }

}