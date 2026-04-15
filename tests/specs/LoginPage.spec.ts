import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';


test.describe('Проверки формы авторизации', () => {
    test('Проверка перехода на страницу', async ({ loginPage }) => {
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_URL);
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
        await loginPage.checkRegisterFromUpperLink();
        });
    test('Переход на форму регистрации (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkRegisterFromLowerLink();
        });
    test('Переход на форму восстановления пароля (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkLostPassFromUpperLink();
        });
    test('Переход на форму восстановления пароля (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.checkLostPassFromLowerLink();
        });
    test('Проверка обновления капчи после перезагрузки страницы', async ({ loginPage }) => {
        await loginPage.loginForm.reloadPageChangesCaptcha();
    });  
});

test.describe('Проверки формы восстановления пароля', () => {
    test('Проверка доступности элементов формы', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.formHasCorrectAriaSnapshot();
    });        
    test('Проверка лейаута формы', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.formHasCorrectLayout();
    });
    test('Проверка тултипа пустого поля логин', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.loginFieldHasValidationMessage();
    });
    test('Проверка кликабельности кнопки сброса пароля', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.resetPassButtonIsClickable();
    });
    test('Проверки отображения сообщений', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.fillLoginMessageToBeVisible();
        await lostPassPage.lostPassForm.informMessageToBeVisible();
    });
    test('Проверки корректности сообщений', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.fillLoginMessageToHaveCorrectText();
        await lostPassPage.lostPassForm.informMessageToHaveCorrectText();
    });
    test('Проверка обновления капчи после перезагрузки страницы', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.reloadPageChangesCaptcha();
    });
    });
