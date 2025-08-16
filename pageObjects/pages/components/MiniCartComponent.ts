import { expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export class MiniCartComponent extends BasePage {
    private readonly cartSubtotal = this.page.locator(".block-minicart .subtotal .price");
    private readonly proceedToCheckoutBtn = this.page.getByRole("button", { name: "Proceed to Checkout" });
    private readonly productTitle = this.page.locator(".block-minicart .product-item-details .product-item-name");
    private readonly seeDetailsBtn = this.page.locator('.block-minicart .product-item-details [role="tablist"]');
    private readonly productSize = this.page.locator(".block-minicart .product-item-details .values").nth(0);
    private readonly productColor = this.page.locator(".block-minicart .product-item-details .values").nth(1);
    private readonly productPrice = this.page.locator(".block-minicart .product-item-details .price");
    private readonly productQtyField = this.page.locator(".block-minicart .product-item-details .details-qty input");
    private readonly updateProductQtyFieldBtn = this.page.locator(
        '.block-minicart .product-item-details [title="Update"]',
    );
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

            await this.deleteButton.first().hover({ timeout: 250 });
            await this.deleteButton.first().click({ delay: 250 });

            await this.page.waitForTimeout(250);
            await expect(this.okBtnInConfirmPopup).toBeVisible();
            await this.okBtnInConfirmPopup.click({ delay: 250 });
            await this.page.waitForTimeout(3000);
        }

        await this.expectCartIsEmpty();
        await this.closeCartBtn.isVisible();
        await this.closeCartBtn.click();
    }

    async changeProductQty(productQtyField: string) {
        await this.productQtyField.clear();
        await this.productQtyField.fill(productQtyField);
        await this.page.click("#mini-cart");
        await expect(this.updateProductQtyFieldBtn).toBeVisible();
        await this.updateProductQtyFieldBtn.hover();
        await this.updateProductQtyFieldBtn.click();
    }

    async clickProceedToCheckoutBtn() {
        await this.proceedToCheckoutBtn.click();
    }

    async clickEditButton() {
        await this.editButton.click();
        await this.editButton.click();
    }

    // assert
    async expectProductTitle(title: string) {
        await expect(this.productTitle).toHaveText(title);
    }

    async expectAllProductProperties(title: string, size: string, color: string, price: string, qty: string) {
        await expect(this.productTitle).toHaveText(title);

        await this.seeDetailsBtn.hover();
        await this.seeDetailsBtn.click();

        await expect(this.productSize).toHaveText(size);
        await expect(this.productColor).toHaveText(color);
        await expect(this.productPrice).toHaveText(price);
        await expect(this.productQtyField).toHaveValue(qty);
    }

    async expectCartSubtotal(subtotalPrice: string) {
        await expect(this.cartSubtotal).toHaveText(subtotalPrice);
    }

    async expectCartIsEmpty() {
        await expect(this.textInEmptyCart).toHaveText("You have no items in your shopping cart.");
    }
}
