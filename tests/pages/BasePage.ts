import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    protected readonly headerUserLogoLocator: Locator;

    constructor (page: Page) {
        this.page = page;
        this.headerUserLogoLocator = this.page.locator('a[href="https://4pda.to/"]');
    }

    async open() {
        await this.page.goto('');
        await expect(this.headerUserLogoLocator).toBeVisible();
    }

    async checkAriaShapshot(locator: Locator, ariaName: string) {
        await expect(locator).toMatchAriaSnapshot({
            name: ariaName 
        });
    }

    async checkUrl(url: string | RegExp) {
        await expect(this.page).toHaveURL(url);
    }

    async checkLayoutByScreenshot(locator: Locator, screenshotName: string, mask: Locator[] = []) {
        await this.page.waitForLoadState('networkidle');
        await this.page.evaluate(async () => {
            await document.fonts.ready;
        });
        await expect(locator).toHaveScreenshot(screenshotName, {
            animations: 'disabled',
            caret: 'hide',
            timeout: 10000,
            scale: 'css',
            maxDiffPixelRatio: 0.01,
            mask,
        });
    }
}