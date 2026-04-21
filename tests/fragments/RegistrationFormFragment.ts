import { Locator } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class RegistrationFormFragment {
    private readonly root: Locator;
    private readonly basePage: BasePage;
    static readonly REGISTRATION_TEXT_MESSAGE: RegExp = /Перед регистрацией необходимо прочесть и согласиться с нашими правилами\./
    static readonly INFORM_TEXT_MESSAGE: RegExp = /Знание правил упростит получение информации и сделает дальнейшее общение комфортным\./

    constructor(root: Locator, basePage: BasePage) {
        this.root = root;
        this.basePage = basePage;

    }

    get registrationText() {
        return this.root.getByText('Регистрация');
    }

    get registrationMessage() {
        return this.root.getByText(/Перед регистрацией необходимо прочесть/i);
    }

    get informMessage() {
        return this.root.getByText(/Знание правил упростит получение информации/i);
    }

    get agreeWithRulesCheckbox() {
        return this.root.getByRole('checkbox', { name: 'Согласен с Правилами ресурса' });
    }

    get agreeWithTermsCheckbox() {
        return this.root.getByRole('checkbox', { name: 'Согласен с Условиями пр. информации' });
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'registrationForm.yml');
    }

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'registrationForm.png');
    }
    
    async registrationMessageToBeVisible() {
        await this.basePage.expectElementToBeVisible(this.registrationMessage);
    }

    async registrationMessageToHaveCorrectText() {
        await this.basePage.expectElementHasCorrectText(this.registrationMessage, RegistrationFormFragment.REGISTRATION_TEXT_MESSAGE);
    }

    async informMessageToBeVisible() {
        await this.basePage.expectElementToBeVisible(this.informMessage);
    }

    async informMessageToHaveCorrectText() {
        await this.basePage.expectElementHasCorrectText(this.informMessage, RegistrationFormFragment.INFORM_TEXT_MESSAGE);
    }

    async agreeWithRulesCheckboxIsChecked() {
        await this.basePage.expectElementToBeChecked(this.agreeWithRulesCheckbox);
    }

    async agreeWithTermsCheckboxIsChecked() {
        await this.basePage.expectElementToBeChecked(this.agreeWithTermsCheckbox);
    }
}