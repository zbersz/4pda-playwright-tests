import { test, expect } from '../fixtures/fixtures';
import { MainPage } from '../pages/MainPage';


test.describe('Тесты главной страницы', () => {

    test('Проверка перехода на домашнюю страницу', async ({ mainPage }) => {
        await expect(mainPage.page).toHaveURL('');
    });
    test('Проверка доступности элементов таба ТЕХНИКА', async ({ mainPage }) => {
        await mainPage.technologyTabHasCorrectAriaSnapshot();
    });
    test('Проверка доступности элементов таба ОБЗОРЫ', async ({ mainPage }) => {
        await mainPage.reviewsTabHasCorrectAriaSnapshot();
    });
    test('Проверка URL элементов хедера', async ({ mainPage }) => {
        for (const { locator, url, name } of MainPage.headerElements) {
            await test.step(`Проверка URL таба ${name}`, async () => {
                await mainPage.openHeaderElement(locator);
                await mainPage.checkUrl(url);
                await mainPage.open();
            });
        }
    });
    test('Проверка лейаута хедера', async ({ mainPage }) => {
        await mainPage.headerHasCorrectLayout();
    })

});