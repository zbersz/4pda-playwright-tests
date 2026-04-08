import { test, expect } from '../fixtures/fixtures';
import { LoginPage } from '../pages/LoginPage';


test.describe('Тесты страницы авторизации', () => {

    test('Проверка перехода на страницу авторизации', async ({ loginPage }) => {
        await expect(loginPage.page).toHaveURL(LoginPage.AUTH_URL);
    });
    test('Проверка доступности элементов формы авторизации', async ({ loginPage }) => {
        await loginPage.loginFormHasCorrectAriaSnapshot();
    });
    test('Проверка лейаута формы авторизации', async ({ loginPage }) => {
        await loginPage.loginFormHasCorrectLayout();
    });
    const checkboxes = [
            {
                name: 'Запомнить?',
                method: 'rememberCheckboxIsChecked',
            },
            {
                name: 'Скрытый вход?',
                method: 'anonymCheckboxIsChecked',                
            },
            {
                name: 'Я не могу ввести ответ',
                method: 'cantFillAnswerCheckboxIsChecked',                     
            }
        ];

    checkboxes.forEach(({ name, method }) => {
        test(`Проверка установки чекбокса "${name}"`, async ({ loginPage }) => {
            await (loginPage as any)[method]();
        });
    });
        test('Проверка URL формы регистрации (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.linkHasCorrectUrl(loginPage.upperRegisterLinkLoginFormLocator, LoginPage.AUTH_REG_URL);
    });
        test('Проверка URL формы регистрации (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.linkHasCorrectUrl(loginPage.lowerRegisterLinkLoginFormLocator, LoginPage.AUTH_REG_URL);
    });
        test('Проверка URL формы сброса пароля (верхняя ссылка)', async ({ loginPage }) => {
        await loginPage.linkHasCorrectUrl(loginPage.upperLostPasswordLinkLoginFormLocator, LoginPage.AUTH_LOSTPASS_URL);
    });
        test('Проверка URL формы сброса пароля (нижняя ссылка)', async ({ loginPage }) => {
        await loginPage.linkHasCorrectUrl(loginPage.lowerLostPasswordLinkLoginFormLocator, LoginPage.AUTH_LOSTPASS_URL);
    });               
});