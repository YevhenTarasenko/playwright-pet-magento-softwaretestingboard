import { Locator, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ProductVariants } from "../../../helpers/Interfaces/productVariantsInterface";

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

        if (!(await sizeOption.isVisible())) {
            throw new Error(`Size "${size}" not found`);
        }

        await sizeOption.hover({ force: true });
        await sizeOption.click({ force: true });

        await expect(sizeOption).toHaveClass(/selected/, { timeout: 5000 });
    }

    private async selectColor(product: Locator, color: string) {
        const colorOption = product.locator(`.color [option-label="${color}"]`);

        if (!(await colorOption.isVisible())) {
            throw new Error(`Color "${color}" not found`);
        }

        await colorOption.hover({ force: true });
        await colorOption.click({ force: true });

        await expect(colorOption).toHaveClass(/selected/, { timeout: 5000 });
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
        await this.page.waitForLoadState("load");
        const product = await this.selectProductByTitle(title);

        if (size) {
            await this.selectSize(product, size);
        }
        if (color) {
            await this.selectColor(product, color);
        }

        await this.addToCart(product);
    }

    async addMultipleProductVariantsToCart(productTitle: string, productVariants: ProductVariants[]) {
        {
            for (const { size, color } of productVariants) {
                await this.addProductToCartByTitle(productTitle, size, color);
                await this.expectSuccessMsgAfterAddingTheProductToCart(productTitle);
            }
        }
    }

    async expectSuccessMsgAfterAddingTheProductToCart(productTitle: string) {
        // await this.page.waitForLoadState("load");
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toContainText(`You added ${productTitle} to your shopping cart`);
    }

    async expectSuccessMsgAfterAddingTheProductToWishList(productTitle: string) {
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toContainText(
            `${productTitle} has been added to your Wish List. Click here to continue shopping.`,
        );
    }

    async expectSuccessMsgAfterAddingTheProductToCompare(productTitle: string) {
        await expect(this.successMsg).toBeVisible();
        await expect(this.successMsg).toContainText(`You added product ${productTitle} to the comparison list.`);
    }

    private async addToWishList(product: Locator) {
        await product.hover();
        const addToWishList = product.getByRole("link", { name: "Add to Wish List" });
        await addToWishList.waitFor({ state: "visible" });

        if (await addToWishList.isVisible()) {
            await addToWishList.click();
        } else {
            throw new Error(`Add to Wish List button not found`);
        }
    }

    async addProductToWishList(title: string) {
        const product = await this.selectProductByTitle(title);

        await this.addToWishList(product);
    }

    private async addToCompare(product: Locator) {
        await product.hover();
        const addToCompare = product.getByRole("link", { name: "Add to Compare" });
        await addToCompare.waitFor({ state: "visible" });

        if (await addToCompare.isVisible()) {
            await addToCompare.click();
        } else {
            throw new Error(`Add to Compare button not found`);
        }
    }

    async addProductToCompareList(title: string) {
        const product = await this.selectProductByTitle(title);

        await this.addToCompare(product);
    }
}
