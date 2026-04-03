import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    protected readonly headerUserLogoLocator: Locator;
    private _stylesInjected = false;

    constructor (page: Page) {
        this.page = page;
        this.headerUserLogoLocator = this.page.locator('a[href="/"]');
    }

    async open() {
        await this.page.goto('');
        await expect(this.headerUserLogoLocator).toBeVisible();
    }

    async checkAriaSnapshot(locator: Locator, ariaName: string) {
        await expect(locator).toMatchAriaSnapshot({
            name: ariaName 
        });
    }

    async checkUrl(url: string | RegExp) {
        await this.page.waitForURL(url);
        await expect(this.page).toHaveURL(url);
    }

    async checkLayoutByScreenshot(locator: Locator, screenshotName: string, mask: Locator[] = []) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.evaluate(async () => {
            await document.fonts.ready;
        });
        await this.page.evaluate(async () => {
            const images = Array.from(document.images);

            await Promise.all(images.map(img => {
                if (img.complete && img.naturalWidth !== 0) return;
                return new Promise(res => {
                    const timeout = setTimeout(res, 2000);
                    img.onload = () => {
                        clearTimeout(timeout);
                        res(null);
                    };
                    img.onerror = () => {
                        clearTimeout(timeout);
                        res(null);
                    };
                });
            }));
        });

        if (!this._stylesInjected) {
            await this.page.addStyleTag({
                content: `
                    * {
                    animation: none !important;
                    transition: none !important;
                    }
                `
            });
            this._stylesInjected = true;
        }
        await expect(locator).toHaveScreenshot(screenshotName, {
            animations: 'disabled',
            caret: 'hide',
            timeout: 10000,
            scale: 'css',
            maxDiffPixelRatio: 0.02,
            mask,
        });
    }
}