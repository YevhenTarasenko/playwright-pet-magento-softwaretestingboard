import { test } from "../../fixtures/fixturePageAccess";

test.describe("Mini cart", () => {
    test.beforeEach(async ({ app }) => {
        await app.homePage.openHomePage();
        await app.homePage.removeADS();
        await app.homePage.expectPageTitle("Home Page");
        await app.cartHelper.clearCart();
    });

    test("Add product to cart and check this product", async ({ app }) => {
        await app.productCardComponent.addProductToCartByTitle("Breathe-Easy Tank", "M", "Yellow");
        await app.homePage.removeADS();
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToCart("Breathe-Easy Tank");
        await app.headerComponent.expectCartCounterIncreased("1");
        await app.headerComponent.openMiniCart();

        // check product
        await app.miniCartComponent.expectAllProductProperties("Breathe-Easy Tank", "M", "Yellow", "$34.00", "1");
        await app.miniCartComponent.expectCartSubtotal("$34.00");
    });

    test("Update product quantity and check subtotal", async ({ app }) => {
        await app.productCardComponent.addProductToCartByTitle("Argus All-Weather Tank", "L", "Gray");
        await app.homePage.removeADS();
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToCart("Argus All-Weather Tank");
        await app.headerComponent.expectCartCounterIncreased("1");
        await app.headerComponent.openMiniCart();

        await app.miniCartComponent.expectAllProductProperties("Argus All-Weather Tank", "L", "Gray", "$22.00", "1");
        await app.miniCartComponent.expectCartSubtotal("$22.00");

        await app.miniCartComponent.changeProductQty("2");
        await app.miniCartComponent.expectCartSubtotal("$44.00");

        await app.miniCartComponent.changeProductQty("4");
        await app.miniCartComponent.expectCartSubtotal("$88.00");
    });
});
