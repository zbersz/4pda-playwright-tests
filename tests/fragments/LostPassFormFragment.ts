import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LostPassFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;
    static readonly LOGIN_FIELD_TOOLTIP: RegExp = /Заполните это поле|Please fill out this field/;

    constructor(root: Locator, basePage: BasePage) {
        this.root = root;
        this.basePage = basePage;

    }

    get captcha() {
        return this.root.locator('.captcha');
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

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'lostPassForm.png', [this.captcha]);
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'lostPassForm.yml');
    }

    async loginFieldHasValidationMessage() {
        await this.loginInput.click();
        await this.basePage.fieldHasValidationMessage(this.loginInput, LostPassFormFragment.LOGIN_FIELD_TOOLTIP);
    }

    async resetPassButtonIsClickable() {
        await this.basePage.buttonIsClickable(this.resetPassButton);
    }

}