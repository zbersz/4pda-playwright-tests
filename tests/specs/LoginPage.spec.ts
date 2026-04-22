import { test, expect } from '../fixtures/fixtures';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationFormFragment } from '../fragments/RegistrationFormFragment';
import { LostPassFormFragment } from '../fragments/LostPassFormFragment';


test.describe('Проверки формы авторизации', () => {   
    test('Проверка перехода на страницу', async ({ loginPage }) => {
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
    });
    test('Проверка доступности элементов формы', async ({ loginPage }) => {
        await loginPage.loginForm.formHasCorrectAriaSnapshot();
    });
    test('Проверка лейаута формы', async ({ loginPage }) => {
        await loginPage.loginForm.formHasCorrectLayout();
    });
    test('Проверка установки чекбоксов', async ({ loginPage }) => {
        await test.step('Чекбокс "Запомнить"', async () => {
            await loginPage.loginForm.rememberCheckboxIsChecked();
            await expect(loginPage.loginForm.rememberCheckbox).toBeChecked();
        });
        await test.step('Чекбокс "Скрытый вход"', async () => {
            await loginPage.loginForm.anonymCheckboxIsChecked();
            await expect(loginPage.loginForm.anonymLoginCheckbox).toBeChecked();            
        });
        await test.step('Чекбокс "Я не могу ввести ответ"', async () => {
            await loginPage.loginForm.cantFillAnswerCheckboxIsChecked();
            await expect(loginPage.loginForm.cantFillAnswerCheckbox).toBeChecked();                     
        });
    });
    test('Переход на форму регистрации (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.loginForm.goToRegister('upper');
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_REG_URL);
        });
    test('Переход на форму регистрации (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.loginForm.goToRegister('lower');
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_REG_URL);
        });
    test('Переход на форму восстановления пароля (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.loginForm.goToLostPass('upper');
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOSTPASS_URL);
        });
    test('Переход на форму восстановления пароля (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.loginForm.goToLostPass('lower');
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_LOSTPASS_URL);
        });
    test('Проверка обновления капчи после перезагрузки страницы', async ({ loginPage }) => {
        await loginPage.loginForm.reloadPageChangesCaptcha();
    });  
});

test.describe('Проверки формы восстановления пароля', () => {
    test('Проверка доступности элементов формы', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.formHasCorrectAriaSnapshot();
    });        
    test('Проверка лейаута формы', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.formHasCorrectLayout();
    });
    test('Проверка тултипа пустого поля логин', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.loginFieldHasValidationMessage();
    });
    test('Проверка кликабельности кнопки сброса пароля', async ({ lostPassView }) => {
        await expect(lostPassView.lostPassForm.resetPassButton).toBeEnabled();
    });
    test('Проверка отображения сообщений', async ({ lostPassView }) => {
        await expect(lostPassView.lostPassForm.fillLoginMessage).toBeVisible();
        await expect(lostPassView.lostPassForm.informMessage).toBeVisible();
    });
    test('Проверка корректности сообщений', async ({ lostPassView }) => {
        await expect(lostPassView.lostPassForm.fillLoginMessage).toContainText(LostPassFormFragment.LOGIN_TEXT_MESSAGE);
        await expect(lostPassView.lostPassForm.informMessage).toContainText(LostPassFormFragment.INFORM_TEXT_MESSAGE);
    });
    test('Переход на форму регистрации (верхняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkRegisterUrlFromLink(lostPassView.lostPassForm, 'upper');
        await expect(lostPassView.page).toHaveURL(LoginPage.AUTH_REG_URL);
        });
    test('Переход на форму регистрации (нижняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkRegisterUrlFromLink(lostPassView.lostPassForm, 'lower');
        await expect(lostPassView.page).toHaveURL(LoginPage.AUTH_REG_URL);
        });
    test('Переход на логин форму (верхняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkLoginUrlFromLink(lostPassView.lostPassForm, 'upper');
        await expect(lostPassView.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
        });
    test('Переход на логин форму (нижняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkLoginUrlFromLink(lostPassView.lostPassForm, 'lower');
        await expect(lostPassView.page).toHaveURL(LoginPage.AUTH_LOGIN_URL);
        });
    test('Проверка обновления капчи после перезагрузки страницы', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.reloadPageChangesCaptcha();
    });
});

test.describe('Проверки формы регистрации', () => {
    test('Проверка доступности элементов формы', async ({ registrationView }) => {
        await registrationView.registrationForm.formHasCorrectAriaSnapshot();
    });
    test('Проверка лейаута формы', async ({ registrationView }) => {
        await registrationView.registrationForm.formHasCorrectLayout();
    });
    test('Проверка отображения сообщений', async ({ registrationView }) => {
        await expect(registrationView.registrationForm.registrationMessage).toBeVisible();
        await expect(registrationView.registrationForm.informMessage).toBeVisible();
    });
    test('Проверка корректности сообщений', async ({ registrationView }) => {
        await expect(registrationView.registrationForm.registrationMessage).toContainText(RegistrationFormFragment.REGISTRATION_TEXT_MESSAGE);
        await expect(registrationView.registrationForm.informMessage).toContainText(RegistrationFormFragment.INFORM_TEXT_MESSAGE);
    });
    test('Проверка установки чекбоксов', async ({ registrationView }) => {
        await test.step('Чекбокс "Согласен с правилами ресурса"', async () => {
            await registrationView.registrationForm.agreeWithRulesCheckboxIsChecked();
            await expect(registrationView.registrationForm.agreeWithRulesCheckbox).toBeChecked();            
        });
        await test.step('Чекбокс "Согласен с Условиями пр. информации"', async () => {
            await registrationView.registrationForm.agreeWithTermsCheckboxIsChecked();
            await expect(registrationView.registrationForm.agreeWithTermsCheckbox).toBeChecked();
        });
    });
    test('Проверка URL страницы правил ресурса', async ({ registrationView, context }) => {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            registrationView.registrationForm.goToRulesPage(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL(BasePage.RULES_PAGE_URL);
    });
});
