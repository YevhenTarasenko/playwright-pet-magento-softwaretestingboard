import { expect, type Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectPageTitle(title: string) {
        const pageTitle = this.page.locator("[data-ui-id='page-title-wrapper']");

        await this.page.waitForLoadState("load");
        await expect(pageTitle).toHaveText(title);
    }

    async scrollByPixels(pixels: number) {
        await this.page.mouse.wheel(0, pixels);
        await this.page.waitForTimeout(250);
    }

    async removeADS() {
        await this.page.waitForLoadState("load");
        await this.page.waitForTimeout(1000);

        await this.page.evaluate(() => {
            const selectors = [
                ".google-auto-placed",
                "#ad_position_box",
                ".adsbygoogle",
                ".adsbygoogle-noablate",
                "[id*='ad']",
                "[class*='ad']",
                "[class*='ads']",
                "[class*='banner']",
                "iframe",
            ];

            selectors.forEach((selector) => {
                document.querySelectorAll(selector).forEach((el) => {
                    try {
                        el.remove();
                    } catch (e) {
                        console.warn(`Cannot remove element: ${e}`);
                    }
                });
            });
        });
        await this.page.waitForTimeout(1000);
    }
}
