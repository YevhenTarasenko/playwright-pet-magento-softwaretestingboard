import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class MiniCartComponent extends BasePage {
    private readonly proceedToCheckoutBtn = this.page.getByRole("button", { name: "Proceed to Checkout" });
    private readonly productTitle = this.page.locator(".block-minicart .product-item-details .product-item-name");
    private readonly seeDetailsBtn = this.page.locator('.block-minicart .product-item-details [role="tablist"]');
    private readonly productPrice = this.page.locator(".block-minicart .product-item-details .price");
    private readonly editButton = this.page.locator(".block-minicart .product-item-details .edit");
    private readonly deleteButton = this.page.locator(".block-minicart .product-item-details .delete");
    private readonly viewAndEditCartBtn = this.page.locator(".block-minicart .viewcart");
    private readonly okBtnInConfirmPopup = this.page.getByRole("button", { name: "OK" });
    private readonly cancelBtnInConfirmPopup = this.page.getByRole("button", { name: "Cancel" });
    private readonly textInEmptyCart = this.page.locator(".block-minicart .subtitle.empty");
    private readonly closeCartBtn = this.page.locator(".block-minicart .close");

    // action
    async deleteProductFromCart() {
        const initialCount = await this.deleteButton.count();

        for (let i = 0; i < initialCount; i++) {
            await expect(this.deleteButton.first()).toBeVisible();

            // await this.deleteButton.hover({ timeout: 250 });
            await this.deleteButton.first().click();

            await expect(this.okBtnInConfirmPopup).toBeVisible();
            // await this.okBtnInConfirmPopup.hover({ timeout: 250 });
            await this.okBtnInConfirmPopup.click();
        }

        await this.expectCartIsEmpty();
        await this.closeCartBtn.isVisible();
        await this.closeCartBtn.click();

        // if ((await this.deleteButton.count()) > 0) {
        //     await expect(this.deleteButton).toBeVisible();
        //     await this.deleteButton.hover();
        //     await this.deleteButton.first().click();
        //     await this.okBtnInConfirmPopup.click({ delay: 500 });
        //     await this.page.waitForTimeout(1000);

        //     await this.deleteProductFromCart();
        // }
        // await this.closeCartBtn.click();
    }

    // assert
    async expectProductTitle(title: string) {
        await expect(this.productTitle).toHaveText(title);
    }

    async expectCartIsEmpty() {
        await expect(this.textInEmptyCart).toHaveText("You have no items in your shopping cart.");
    }
}
