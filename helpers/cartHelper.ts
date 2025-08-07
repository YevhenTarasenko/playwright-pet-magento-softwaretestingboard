import { HeaderComponents } from "../pageObjects/pages/components/HeaderComponent";
import { MiniCartComponent } from "../pageObjects/pages/components/MiniCartComponent";

export class CartHelper {
    constructor(
        private readonly header: HeaderComponents,
        private readonly miniCart: MiniCartComponent,
    ) {}

    async clearCart() {
        await this.header.cartCounterIcon.isVisible();
        const isCounterVisible = await this.header.cartCounterIcon.isVisible();

        if (isCounterVisible) {
            await this.header.openMiniCart();
            await this.miniCart.deleteProductFromCart();
            await this.miniCart.expectCartIsEmpty();
        }
    }
}
