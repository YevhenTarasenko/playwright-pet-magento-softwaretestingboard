import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class HeaderComponents extends BasePage {
    private readonly logoImg = this.page.locator(".logo");
    private readonly searchField = this.page.locator("#search");
    private readonly cartBtn = this.page.locator(".showcart");
    private readonly cartCounter = this.page.locator(".showcart .counter.qty .counter-number");

    get cartCounterIconLocator() {
        return this.cartCounter;
    }

    async expectCartCounterIncreased(number: string) {
        await expect(this.cartCounter).toBeVisible();
        await expect(this.cartCounter).toHaveText(number);
    }

    async openMiniCart() {
        await this.cartBtn.hover();
        await this.cartBtn.click();
    }
}
