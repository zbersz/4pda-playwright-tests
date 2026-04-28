import { expect, Locator, Page } from '@playwright/test';

export interface ScreenshotCheckOptions {
//   Локаторы динамического контента для маскировки
  mask?: Locator[];
//   Допустимый процент отличий
  maxDiffPixelRatio?: number;
//   Таймаут ожидания
  timeout?: number;
//   Шрифты для явной загрузки
  fonts?: string[];
}

export class BasePage {
    readonly page: Page;
    protected readonly headerSiteLogoLocator: Locator;
    private _stylesInjected = false;
    static readonly RULES_PAGE_URL: RegExp = /forum\/index\.php\?act=boardrules/;
    static readonly TERMS_PAGE_URL: RegExp = /copyright_notice/;

    constructor (page: Page) {
        this.page = page;
        this.headerSiteLogoLocator = this.page.locator('a.logo[href="https://4pda.to/"]');
    }

    async checkAriaSnapshot(locator: Locator, ariaName: string) {
        await expect(locator).toMatchAriaSnapshot({
            name: ariaName 
        });
    }

    async checkLayoutByScreenshot(
        locator: Locator,
        screenshotName: string,
        options: ScreenshotCheckOptions = {}
    ) {
        const {
        mask = [],
        maxDiffPixelRatio = 0.02,
        timeout = 10000,
        fonts = [],
        } = options;
    
        await this.page.waitForLoadState("networkidle");
    
        // Ждём шрифты.
        await this.page.evaluate(async (fontList: string[]) => {
        await document.fonts.ready;
        if (fontList.length > 0) {
            const results = await Promise.all(fontList.map((f) => document.fonts.load(f)));
            results.forEach((r, i) => {
            if (r.length === 0) console.warn(`[screenshot] font not loaded: ${fontList[i]}`);
            });
        }
        }, fonts);
    
        // Ждём изображения внутри элемента (нужно для lazy-load картинок которые появляются в DOM после первого рендера)
        await locator.evaluate(async (el) => {
        const imgs = Array.from(el.querySelectorAll("img"));
        await Promise.all(
            imgs.map((img) => {
            if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
            return new Promise<void>((resolve) => {
                const timer = setTimeout(resolve, 3000);
                img.onload = () => { clearTimeout(timer); resolve(); };
                img.onerror = () => { clearTimeout(timer); resolve(); };
            });
            })
        );
        });
    
        //Глушим анимации и фиксируем скроллбар
        if (!this._stylesInjected) {
        await this.page.addStyleTag({
            content: `
            *, *::before, *::after {
                animation-duration: 0s !important;
                animation-delay: 0s !important;
                transition-duration: 0s !important;
                transition-delay: 0s !important;
            }
            html { overflow-y: scroll; }
            `,
        });
        this._stylesInjected = true;
        }
    
        await expect(locator).toBeVisible({ timeout });
    
        // Получаем координаты и снимаем через clip.
        //    expect(locator).toHaveScreenshot() делает внутренний scrollIntoView
        //    перед каждой попыткой — это сбивает рендеринг шрифтов.
        //    expect(page).toHaveScreenshot({ clip }) снимает по координатам
        //    без скролла — позиция рендеринга стабильна между прогонами.
        const box = await locator.boundingBox();
        if (!box) throw new Error(`[screenshot] boundingBox is null: ${screenshotName}`);
    
        await expect(this.page).toHaveScreenshot(screenshotName, {
        animations: "disabled",
        caret: "hide",
        timeout,
        scale: "css",
        maxDiffPixelRatio,
        mask,
        clip: box,
        });
    }

    async fieldHasValidTooltipMessage(locator: Locator, expectedText: string | RegExp) {
        const message = await locator.evaluate(el => (el as HTMLInputElement).validationMessage);
        expect(message).toMatch(expectedText);
    }

    async expectElementAttributeToChange(
        locator: Locator,
        attribute: string,
        action: () => Promise<void>,
    ) {
        const before = await locator.getAttribute(attribute);
        await action();
        await locator.waitFor();
        const after = await locator.getAttribute(attribute);
        expect(before).not.toBe(after);
    }
}