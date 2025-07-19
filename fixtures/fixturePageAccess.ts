import { test as base } from "@playwright/test";
import { Application } from "../pageObjects/app/Application";

export const test = base.extend<{ app: Application }>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});
