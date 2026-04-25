import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LOGIN_FIELD_TOOLTIP } from '../constants/lostpass.constants'

export class LostPassFormFragment {
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
        await this.basePage.fieldHasValidTooltipMessage(this.loginInput, LOGIN_FIELD_TOOLTIP);
    }
    
    async reloadPageChangesCaptcha() {
        await this.basePage.expectElementAttributeToChange(this.captcha, 'src', async () => {await this.basePage.page.reload();});
    }

    async goToRegisterForm(link: 'upperLink' | 'lowerLink') {
        const locator = 
            link === 'upperLink' ? this.upperRegisterLink : this.lowerRegisterLink;
        await locator.click();
    }

    async goToLoginForm(link: 'upperLink' | 'lowerLink') {
        const locator = 
            link === 'upperLink' ? this.upperLoginLink : this.lowerLoginLink;
        await locator.click();
    }

}