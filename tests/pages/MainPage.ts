import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class MainPage extends BasePage {
    private readonly technologyHeaderTabLocator: Locator;
    private readonly technologyTabLocator: Locator;
    private readonly reviewsHeaderTabLocator: Locator;
    private readonly reviewsTabLocator: Locator;
    private readonly headerLocator: Locator;
    private readonly headerAdvLocator: Locator;
    static readonly headerElements = [
        {
            locator: {
                name:'ОБЗОРЫ', 
                exact: true,
            },
            url: /reviews/,
            name: 'Таб ОБЗОРЫ хедера главной страницы',
        },
        {
            locator: {
                name:'ИГРЫ',
            },
            url: /games/,
            name: 'Таб ИГРЫ хедера главной страницы',
        },
        {
            locator: {
                name:'ФОРУМ',
            },
            url: /forum/,
            name: 'Таб ФОРУМ хедера главной страницы',
        },
        {
            locator: {
                name:'⏎',
            },
            url: /forum\/index\.php\?act=auth/,
            name: 'Кнопка авторизации хедера главной страницы',
        }
    ]

    constructor (page: Page) {
        super(page);
        this.technologyHeaderTabLocator = this.page.getByRole('link', { name: 'ТЕХНИКА', exact: true });
        this.technologyTabLocator = this.page
            .locator('li', { has: page.getByRole('link', { name: 'ТЕХНИКА' }) })
            .locator('.menu-sub');
        this.reviewsHeaderTabLocator = this.page.getByRole('link', { name: 'ОБЗОРЫ', exact: true });
        this.reviewsTabLocator = this.page
            .locator('li', { has: page.getByRole('link', { name: 'ОБЗОРЫ' }) })
            .locator('.menu-sub');
        this.headerLocator = this.page.locator('div.holder-no-hidden').first();
        this.headerAdvLocator = this.page.locator('ul.menu-main > li.menu-main-item:nth-child(n+5)');

    }

    async openMainPage() {
            await this.page.goto('');
            await expect(this.headerUserLogoLocator).toBeVisible();
        }

    async technologyTabHasCorrectAriaSnapshot() {
        await this.technologyHeaderTabLocator.click();
        await this.checkAriaSnapshot(this.technologyTabLocator, 'technologyTabLocator.yml');
    }

    async reviewsTabHasCorrectAriaSnapshot() {
        await this.reviewsHeaderTabLocator.click();
        await this.checkAriaSnapshot(this.reviewsTabLocator, 'reviewsTabLocator.yml');
    }

    async openHeaderElement(locatorOptions: { name: string, exact?: boolean }) {
        await Promise.all([
            this.page.waitForLoadState('load'),
            this.headerLocator.getByRole('link', locatorOptions).click(),
        ]);
    }

    async headerHasCorrectLayout() {
        await this.checkLayoutByScreenshot(this.headerLocator, 'header.png', [this.headerAdvLocator]);
    }
}