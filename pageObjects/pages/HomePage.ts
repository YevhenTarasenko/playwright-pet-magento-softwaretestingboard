import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly heroImage = this.page.locator(".block-promo img");
    private readonly newLumaYogaCollectionLink = this.page.getByText("Shop New Yoga");
    private readonly hotSellersTitle = this.page.locator(".content-heading");
    private readonly footer = this.page.locator(".page-footer");

    async openHomePage() {
        await this.page.goto("");
    }

    async expectHeroImage() {
        await expect(this.heroImage).toHaveScreenshot(["home-page", "hero-image.png"], {
            maxDiffPixels: 5,
            animations: "disabled",
        });
    }

    async clickToHeroImage() {
        await expect(this.heroImage).toBeVisible();
        await expect(this.heroImage).toBeEnabled();

        await this.heroImage.hover({ force: true });
        await this.heroImage.click({ force: true });
    }

    async clickToNewLumaYogaCollectionLink() {
        await expect(this.newLumaYogaCollectionLink).toBeVisible();
        await expect(this.newLumaYogaCollectionLink).toBeEnabled();

        await this.newLumaYogaCollectionLink.hover({ force: true });
        await this.newLumaYogaCollectionLink.click({ force: true });
    }

    async expectHotSellersBlock() {
        await expect(this.hotSellersTitle).toBeVisible();
        await expect(this.hotSellersTitle).toHaveText("Hot Sellers");
    }
}
