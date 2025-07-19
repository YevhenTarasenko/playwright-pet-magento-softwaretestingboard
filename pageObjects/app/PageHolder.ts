import type { Page } from "@playwright/test";

export abstract class PageHolder {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
