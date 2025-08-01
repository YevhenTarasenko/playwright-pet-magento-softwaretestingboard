import { Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProductCardComponent extends BasePage {
    private readonly productTitles = this.page.locator(".product-item-info .product-item-link");
    private readonly productCards = this.page.locator(".product-item-info");
    private readonly productImages = this.page.locator(".product-item-info img");
    private readonly productReviews = this.page.locator(".product-item-info .reviews-actions");
    private readonly productSizeOptions = this.page.locator(".size");
    private readonly productColorOptions = this.page.locator(".color");
    private readonly productAddToCartButton = this.page.getByRole("button", { name: "Add to Cart" });
    private readonly productAddToWishListButton = this.page.getByRole("link", { name: "Add to Wish List" });
    private readonly productAddToCompareButton = this.page.getByRole("link", { name: "Add to Compare" });
    private readonly successMsg = this.page.locator(".page.messages");

    private async selectProductByTitle(title: string) {
        const count = await this.productTitles.count();

        for (let i = 0; i < count; i++) {
            const current = this.productTitles.nth(i);
            const text = await current.textContent();

            if (text?.trim() === title) {
                return this.productCards.nth(i);
            }
        }

        throw new Error(`Product with title "${title}" not found`);
    }

    private async selectSize(product: Locator, size: string) {
        const sizeOption = product.locator(`.size [option-label="${size}"]`);

        if (await sizeOption.isVisible()) {
            await sizeOption.click();
        } else {
            throw new Error(`Size "${size}" not found`);
        }
    }

    private async selectColor(product: Locator, color: string) {
        const colorOption = product.locator(`.color [option-label="${color}"]`);

        if (await colorOption.isVisible()) {
            await colorOption.click();
        } else {
            throw new Error(`Color "${color}" not found`);
        }
    }

    private async addToCart(product: Locator) {
        await product.hover();
        const addToCart = product.getByRole("button", { name: "Add to Cart" });
        await addToCart.waitFor({ state: "visible" });

        if (await addToCart.isVisible()) {
            await addToCart.click();
        } else {
            throw new Error(`Add to Cart button not found`);
        }
    }

    async addProductToCartByTitle(title: string, size?: string, color?: string) {
        const product = await this.selectProductByTitle(title);

        if (size) {
            await this.selectSize(product, size);
        }
        if (color) {
            await this.selectColor(product, color);
        }

        await this.addToCart(product);
    }

    async expectSuccessMsgAfterAddingTheProduct() {
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toContainText("You added Radiant Tee to your shopping cart");
    }
}
