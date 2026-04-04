import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class MainPage extends BasePage {
    private readonly technologyHeaderTabLocator: Locator;
    private readonly technologyTabLocator: Locator;
    private readonly reviewsHeaderTabLocator: Locator;
    private readonly reviewsTabLocator: Locator;
    private readonly headerLocator: Locator;
    private readonly headerAdvLocator: Locator;
    static readonly headerTabs = [
        {
            tabName: 'ОБЗОРЫ',
            url: /reviews/,
        },
        {
            tabName: 'ИГРЫ',
            url: /games/,
        },
        {
            tabName: 'ФОРУМ',
            url: /forum/,
        }
    ]

    constructor (page: Page) {
        super(page);
        this.technologyHeaderTabLocator = this.page.getByRole('link', { name: 'ТЕХНИКА', exact: true });
        this.technologyTabLocator = page
            .locator('li', { has: page.getByRole('link', { name: 'ТЕХНИКА' }) })
            .locator('.menu-sub');
        this.reviewsHeaderTabLocator = this.page.getByRole('link', { name: 'ОБЗОРЫ' });
        this.reviewsTabLocator = this.page
            .locator('li', { has: page.getByRole('link', { name: 'ОБЗОРЫ' }) })
            .locator('.menu-sub');
        this.headerLocator = this.page.locator('div.holder-no-hidden').first();
        this.headerAdvLocator = this.page.locator('ul.menu-main > li.menu-main-item:nth-child(n+5)');

    }

    async technologyTabHasCorrectAriaSnapshot() {
        await this.technologyHeaderTabLocator.click();
        await this.checkAriaSnapshot(this.technologyTabLocator, 'technologyTabLocator.yml');
    }

    async reviewsTabHasCorrectAriaSnapshot() {
        await this.reviewsHeaderTabLocator.click();
        await this.checkAriaSnapshot(this.reviewsTabLocator, 'reviewsTabLocator.yml');
    }

    async pageHasCorrectUrl(url: string) {
        await this.checkUrl(url);
    }

    async openHeaderTabMenu(tabName: string){
        await this.page.getByRole('link', { name: tabName }).click();
        }

    async headerHasCorrectLayout() {
        await this.checkLayoutByScreenshot(this.headerLocator, 'header.png', [this.headerAdvLocator]);
    }
}