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
        await loginPage.loginForm.loginFormHasCorrectLayout();
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
});

test.describe('Проверки формы восстановления пароля', () => {        
    test('Проверка лейаута формы', async ({ lostPassPage }) => {
        await lostPassPage.lostPassForm.lostPassFormHasCorrectLayout();
    }); 
    });
