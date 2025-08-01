import { test } from "../../fixtures/fixturePageAccess";

test.describe("Home page tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.homePage.openHomePage();
    });

    test("Add product with size and color to the cart", async ({ app }) => {
        await app.productCardComponent.addProductToCartByTitle("Radiant Tee", "M", "Purple");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProduct();
    });

    test.fixme("Add product without size and color", async ({ app }) => {
        // KNOWN ISSUE: The "Fusion Backpack" product is not added to Card on the "Home" page after clicking "Add to Card" button
        await app.productCardComponent.addProductToCartByTitle("Fusion Backpack");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProduct();
    });
});
