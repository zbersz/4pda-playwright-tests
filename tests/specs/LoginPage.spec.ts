import { test, expect } from '../fixtures/fixtures';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationFormFragment } from '../fragments/RegistrationFormFragment';
import { LostPassFormFragment } from '../fragments/LostPassFormFragment';


test.describe('Проверки формы авторизации', () => {   
    test('Проверка перехода на страницу', async ({ loginPage }) => {
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
    });
    test('Проверка доступности элементов формы', async ({ loginForm }) => {
        await loginForm.formHasCorrectAriaSnapshot();
    });
    test('Проверка лейаута формы', async ({ loginForm }) => {
        await loginForm.formHasCorrectLayout();
    });
    test('Проверка установки чекбоксов', async ({ loginPage }) => {
        await test.step('Чекбокс "Запомнить"', async () => {
            await loginPage.loginForm.checkRememberCheckbox();
            await expect(loginPage.loginForm.rememberCheckbox).toBeChecked();
        });
        await test.step('Чекбокс "Скрытый вход"', async () => {
            await loginPage.loginForm.checkAnonymCheckbox();
            await expect(loginPage.loginForm.anonymLoginCheckbox).toBeChecked();            
        });
        await test.step('Чекбокс "Я не могу ввести ответ"', async () => {
            await loginPage.loginForm.checkCantFillAnswerCheckbox();
            await expect(loginPage.loginForm.cantFillAnswerCheckbox).toBeChecked();                     
        });
    });
for (const position of ['upperLink', 'lowerLink'] as const) {
    test(`Переход на форму регистрации (${position})`, async ({ loginPage }) => {
            await loginPage.loginForm.goToRegisterForm(position);
            await expect(loginPage.page).toHaveURL(LoginPage.AUTH_REG_URL);
    });
};
for (const position of ['upperLink', 'lowerLink'] as const) {
    test(`Переход на форму восстановления пароля (${position})`, async ({ loginPage }) => {
            await loginPage.loginForm.goToLostPassForm(position);
            await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOSTPASS_URL);
    });
};
    test('Проверка обновления капчи после перезагрузки страницы', async ({ loginPage }) => {
        await loginPage.loginForm.reloadPageChangesCaptcha();
    });  
});


test.describe('Проверки формы восстановления пароля', () => {
    test('Проверка доступности элементов формы', async ({ lostPassForm }) => {
        await lostPassForm.formHasCorrectAriaSnapshot();
    });        
    test('Проверка лейаута формы', async ({ lostPassForm }) => {
        await lostPassForm.formHasCorrectLayout();
    });
    test('Проверка тултипа пустого поля логин', async ({ lostPassForm }) => {
        await lostPassForm.loginFieldHasValidationMessage();
    });
    test('Проверка кликабельности кнопки сброса пароля', async ({ lostPassForm }) => {
        await expect(lostPassForm.resetPassButton).toBeEnabled();
    });
    test('Проверка отображения сообщений', async ({ lostPassForm }) => {
        await expect(lostPassForm.fillLoginMessage).toBeVisible();
        await expect(lostPassForm.informMessage).toBeVisible();
    });
    test('Проверка корректности сообщений', async ({ lostPassForm }) => {
        await expect(lostPassForm.fillLoginMessage).toContainText(LostPassFormFragment.LOGIN_TEXT_MESSAGE);
        await expect(lostPassForm.informMessage).toContainText(LostPassFormFragment.INFORM_TEXT_MESSAGE);
    });
for (const position of ['upperLink', 'lowerLink'] as const) {
    test(`Переход на форму регистрации (${position})`, async ({ lostPassForm, loginPage }) => {
            await loginPage.goToRegisterFormFromLink(lostPassForm, position);
            await expect(loginPage.page).toHaveURL(LoginPage.AUTH_REG_URL);
    });
};
for (const position of ['upperLink', 'lowerLink'] as const) {
    test(`Переход на форму авторизации (${position})`, async ({ lostPassForm, loginPage }) => {
            await loginPage.goToLoginFormFromLink(lostPassForm, position);
            await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
    });
};
    test('Проверка обновления капчи после перезагрузки страницы', async ({ lostPassForm }) => {
        await lostPassForm.reloadPageChangesCaptcha();
    });
});


test.describe('Проверки формы регистрации', () => {
    test('Проверка доступности элементов формы', async ({ registrationForm }) => {
        await registrationForm.formHasCorrectAriaSnapshot();
    });
    test('Проверка лейаута формы', async ({ registrationForm }) => {
        await registrationForm.formHasCorrectLayout();
    });
    test('Проверка отображения сообщений', async ({ registrationForm }) => {
        await expect(registrationForm.registrationMessage).toBeVisible();
        await expect(registrationForm.informMessage).toBeVisible();
    });
    test('Проверка корректности сообщений', async ({ registrationForm }) => {
        await expect(registrationForm.registrationMessage).toContainText(RegistrationFormFragment.REGISTRATION_TEXT_MESSAGE);
        await expect(registrationForm.informMessage).toContainText(RegistrationFormFragment.INFORM_TEXT_MESSAGE);
    });
    test('Проверка установки чекбоксов', async ({ registrationForm }) => {
        await test.step('Чекбокс "Согласен с правилами ресурса"', async () => {
            await registrationForm.agreeWithRulesCheckboxIsChecked();
            await expect(registrationForm.agreeWithRulesCheckbox).toBeChecked();            
        });
        await test.step('Чекбокс "Согласен с Условиями пр. информации"', async () => {
            await registrationForm.agreeWithTermsCheckboxIsChecked();
            await expect(registrationForm.agreeWithTermsCheckbox).toBeChecked();
        });
    });
    test('Проверка URL страницы правил ресурса', async ({ registrationForm, context }) => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registrationForm.goToRulesPage(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(BasePage.RULES_PAGE_URL);
    });
    test('Проверка URL страницы условий предоставления информации', async ({ registrationForm, context }) => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registrationForm.goToTermsPage(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(BasePage.TERMS_PAGE_URL);
    });
});
