import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly heroImage = this.page.locator(".block-promo img");
    private readonly newLumaYogaCollectionLink = this.page.getByRole("strong", {
        name: "Get fit and look fab in new seasonal styles",
    });
    private readonly hotSellersTitle = this.page.locator(".content-heading");
    private readonly footer = this.page.locator(".page-footer");

    async openHomePage() {
        await this.page.goto("");
        await this.expectPageTitle("Home Page");
    }

    async expectHeroImage() {
        await expect(this.heroImage).toHaveScreenshot({ maxDiffPixels: 5 });
    }

    async clickToHeroImage() {
        await this.heroImage.click();
        await this.expectPageTitle("New Luma Yoga Collection");
    }

    async clickToNewLumaYogaCollectionLink() {
        await this.newLumaYogaCollectionLink.click();
        await this.expectPageTitle("New Luma Yoga Collection");
    }

    async expectHotSellersBlock() {
        await expect(this.hotSellersTitle).toBeVisible();
        await expect(this.hotSellersTitle).toHaveText("Hot Sellers");
    }
}
