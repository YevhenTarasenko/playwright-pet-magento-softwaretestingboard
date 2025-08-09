import { Page } from "@playwright/test";
import { HeaderComponents } from "../pageObjects/pages/components/HeaderComponent";
import { MiniCartComponent } from "../pageObjects/pages/components/MiniCartComponent";

export class CartHelper {
    page: Page;
    constructor(
        private readonly header: HeaderComponents,
        private readonly miniCart: MiniCartComponent,
    ) {}

    async clearCart() {
        await this.header.cartCounterIconLocator.isVisible();
        const isCounterVisible = await this.header.cartCounterIconLocator.isVisible();

        if (isCounterVisible) {
            await this.header.openMiniCart();
            await this.miniCart.deleteProductFromCart();
            await this.miniCart.expectCartIsEmpty();
        }
    }
}
