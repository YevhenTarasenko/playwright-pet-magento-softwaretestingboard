import { expect, type Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectPageTitle(title: string) {
        const pageTitle = this.page.locator("[data-ui-id='page-title-wrapper']");

        await expect(pageTitle).toHaveText(title);
    }

    async scrollByPixels(pixels: number) {
        await this.page.mouse.wheel(0, pixels);
        await this.page.waitForTimeout(250);
    }
}
