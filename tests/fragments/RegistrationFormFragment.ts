import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class RegistrationFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;

    constructor(root: Locator, basePage: BasePage) {
        this.root = root;
        this.basePage = basePage;

    }

    get registrationText() {
        return this.root.getByText('Регистрация');
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'registrationForm.yml');
    }

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'registrationForm.png');
    }

}