import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LostPassFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;
    static readonly LOGIN_FIELD_TOOLTIP: RegExp = /Заполните это поле|Please fill out this field/;
    static readonly LOGIN_TEXT_MESSAGE: RegExp = /Введите ваш логин или e-mail\s*\(не чувствительно к регистру\)\./
    static readonly INFORM_TEXT_MESSAGE: RegExp = /После заполнения формы на вашу почту будет отправлено письмо с инструкцией по восстановлению пароля\./

    constructor(root: Locator, basePage: BasePage) {
        this.root = root;
        this.basePage = basePage;

    }

    get captchaContainer() {
        return this.root.locator('.captcha');
    }

    get captcha() {
        return  this.root.locator('.captcha img');
    }

    get lostPassText() {
        return this.root.getByText('Сброс пароля');
    }
    
    get loginInput() {
        return this.root.getByRole('textbox', { name: 'логин или e-mail' });
    }

    get resetPassButton() {
        return this.root.getByRole('button', { name: 'Сбросить пароль' });
    }

    get fillLoginMessage() {
        return this.root.getByText('Введите ваш логин или e-mail');
    }

    get informMessage() {
        return this.root.locator('.small-text').getByText(/После заполнения формы на вашу почту будет отправлено письмо/i);
    }

    get upperRegisterLink() {
        return this.root.locator('.cell.right').nth(1).getByRole('link', { name: 'Зарегистрироваться' });
    }

    get lowerRegisterLink() {
        return this.root.locator('.cell.right').nth(2).getByRole('link', { name: 'Зарегистрироваться' });
    }

    get upperLoginLink() {
        return this.root.getByRole('link', { name: 'Войти' }).first();
    }

    get lowerLoginLink() {
        return this.root.getByRole('link', { name: 'Войти' }).nth(1);
    }

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'lostPassForm.png', [this.captchaContainer]);
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'lostPassForm.yml');
    }

    async loginFieldHasValidationMessage() {
        await this.loginInput.click();
        await this.basePage.fieldHasValidTooltipMessage(this.loginInput, LostPassFormFragment.LOGIN_FIELD_TOOLTIP);
    }
    
    async reloadPageChangesCaptcha() {
        await this.basePage.expectElementAttributeToChange(this.captcha, 'src', async () => {await this.basePage.page.reload();});
    }

    async goToRegister(link: 'upper' | 'lower') {
        const locator = 
            link === 'upper' ? this.upperRegisterLink : this.lowerRegisterLink;
        await locator.click();
    }

    async goToLogin(link: 'upper' | 'lower') {
        const locator = 
            link === 'upper' ? this.upperLoginLink : this.lowerLoginLink;
        await locator.click();
    }

}