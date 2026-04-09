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
    const links = [
        {
            name: 'Верхняя ссылка для регистрации',
            linkLocator: (page: LoginPage ) => page.upperRegisterLinkLoginFormLocator,
            url: LoginPage.AUTH_REG_URL,
        },
        {
            name: 'Нижняя ссылка для регистрации',
            linkLocator: (page: LoginPage ) => page.lowerRegisterLinkLoginFormLocator,
            url: LoginPage.AUTH_REG_URL,
        },
        {
            name: 'Верхняя ссылка для восстановления пароля',
            linkLocator: (page: LoginPage ) => page.upperLostPasswordLinkLoginFormLocator,
            url: LoginPage.AUTH_LOSTPASS_URL,
        },
        {
            name: 'Нижняя ссылка для восстановления пароля',
            linkLocator: (page: LoginPage ) => page.lowerLostPasswordLinkLoginFormLocator,
            url: LoginPage.AUTH_LOSTPASS_URL,
        }
    ]

    checkboxes.forEach(({ name, method }) => {
        test(`Проверка установки чекбокса "${name}"`, async ({ loginPage }) => {
            await (loginPage as any)[method]();
        });
    });
    links.forEach(({ name, linkLocator, url }) => {
        test(`Проверка URL ${name} формы авторизации`, async ({ loginPage }) => {
            await loginPage.linkHasCorrectUrl(linkLocator(loginPage), url);
        });
    });             
});