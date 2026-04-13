import { Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class LostPassFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;

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

    async lostPassFormHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'lostPassForm.png', [this.captcha]);
    }

}