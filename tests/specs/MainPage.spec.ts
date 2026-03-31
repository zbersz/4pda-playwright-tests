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
    test('Проверка URL табов хедера', async ({ mainPage }) => {
        for (const { tabName, url } of MainPage.headerTabs) {
            await test.step(`Проверка URL таба ${tabName}`, async () => {
                await mainPage.openHeaderTabMenu(tabName);
                await mainPage.checkUrl(url);
            });
        }       
    });
    test('Проверка лейаута хедера', async ({ mainPage }) => {
        await mainPage.headerHasCorrectLayout();
    })

});