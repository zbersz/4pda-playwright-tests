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

    get rulesButton() {
        return this.root.getByRole('link', { name: 'ПРАВИЛА РЕСУРСА 4PDA' });
    }

    get termsButton() {
        return this.root.getByRole('link', { name: 'УСЛОВИЯ ПРЕДОСТАВЛЕНИЯ ИНФОРМАЦИИ' });
    }

    get upperLostPassLink() {
        return this.root.getByRole('link', { name: 'Забыли пароль?' }).first();
    }

    get lowerLostPassLink() {
        return this.root.getByRole('link', { name: 'Забыли пароль?' }).last();
    }

    get upperLoginLink() {
        return this.root.getByRole('link', { name: 'Войти' }).first();
    }

    get lowerLoginLink() {
        return this.root.getByRole('link', { name: 'Войти' }).last();
    }

    async formHasCorrectAriaSnapshot() {
        await this.basePage.checkAriaSnapshot(this.root, 'registrationForm.yml');
    }

    async formHasCorrectLayout() {
        await this.basePage.checkLayoutByScreenshot(this.root, 'registrationForm.png');
    }

    async agreeWithRulesCheckboxIsChecked() {
        await this.agreeWithRulesCheckbox.check();
    }

    async agreeWithTermsCheckboxIsChecked() {
        await this.agreeWithTermsCheckbox.check();
    }

    async goToRulesPage() {
        await this.rulesButton.click();
    }

    async goToTermsPage() {
        await this.termsButton.click();
    }

    async goToLostPassForm(link: 'upperLink' | 'lowerLink') {
        const locator = 
            link === 'upperLink' ? this.upperLostPassLink : this.lowerLostPassLink;
        await locator.click();
    }

    async goToLoginForm(link: 'upperLink' | 'lowerLink') {
        const locator = 
            link === 'upperLink' ? this.upperLoginLink : this.lowerLoginLink;
        await locator.click();
    }
}