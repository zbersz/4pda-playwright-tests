import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';


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
        await loginPage.loginForm.rememberCheckboxIsChecked();
        await loginPage.loginForm.anonymCheckboxIsChecked();
        await loginPage.loginForm.cantFillAnswerCheckboxIsChecked();
    });
    test('Переход на форму регистрации (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkRegisterUrlFromLink(loginPage.loginForm, 'upper');
        });
    test('Переход на форму регистрации (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkRegisterUrlFromLink(loginPage.loginForm, 'lower');
        });
    test('Переход на форму восстановления пароля (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkLostPassUrlFromLink(loginPage.loginForm, 'upper');
        });
    test('Переход на форму восстановления пароля (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkLostPassUrlFromLink(loginPage.loginForm, 'lower');
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
        await lostPassView.lostPassForm.resetPassButtonIsClickable();
    });
    test('Проверки отображения сообщений', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.fillLoginMessageToBeVisible();
        await lostPassView.lostPassForm.informMessageToBeVisible();
    });
    test('Проверки корректности сообщений', async ({ lostPassView }) => {
        await lostPassView.lostPassForm.fillLoginMessageToHaveCorrectText();
        await lostPassView.lostPassForm.informMessageToHaveCorrectText();
    });
    test('Переход на форму регистрации (верхняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkRegisterUrlFromLink(lostPassView.lostPassForm, 'upper');
        });
    test('Переход на форму регистрации (нижняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkRegisterUrlFromLink(lostPassView.lostPassForm, 'lower');
        });
    test('Переход на логин форму (верхняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkLoginUrlFromLink(lostPassView.lostPassForm, 'upper');
        });
    test('Переход на логин форму (нижняя ссылка)', async ({ lostPassView }) => {
        await lostPassView.checkLoginUrlFromLink(lostPassView.lostPassForm, 'lower');
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
});
