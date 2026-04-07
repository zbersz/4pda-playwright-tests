import { test, expect } from '../fixtures/fixtures';


test.describe('Тесты страницы авторизации', () => {

    test('Проверка перехода на страницу авторизации', async ({ loginPage }) => {
        await expect(loginPage.page).toHaveURL(/forum\/index\.php\?act=auth/);
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
});