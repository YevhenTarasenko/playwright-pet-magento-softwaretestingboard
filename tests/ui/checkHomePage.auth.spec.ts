import { test } from "../../fixtures/fixturePageAccess";
import { radiantTeeVariants } from "../../helpers/productVariants";

test.describe("Home page tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.homePage.openHomePage();
        await app.homePage.removeADS();
        await app.homePage.expectPageTitle("Home Page");
        await app.cartHelper.clearCart();
    });

    test("Redirect to 'New Luma Yoga Collection' page by clicking the link", async ({ app }) => {
        await app.homePage.clickToNewLumaYogaCollectionLink();
        await app.homePage.expectPageTitle("New Luma Yoga Collection");
    });

    test("Redirect to 'New Luma Yoga Collection' page by clicking the image", async ({ app }) => {
        await app.homePage.clickToHeroImage();
        await app.homePage.expectPageTitle("New Luma Yoga Collection");
    });

    test.skip("Check Hero image", async ({ app }) => {
        // KNOWN ISSUE: FLAky test with screenshot
        await app.homePage.scrollByPixels(800);
        await app.homePage.expectHeroImage();
    });

    test("Add product with size and color to the cart", async ({ app }) => {
        await app.productCardComponent.addProductToCartByTitle("Radiant Tee", "M", "Purple");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToCart("Radiant Tee");
    });

    test("Add all variants of Radiant Tee to the cart", async ({ app }) => {
        await app.productCardComponent.addMultipleProductVariantsToCart("Radiant Tee", radiantTeeVariants);
        await app.headerComponent.expectCartCounterIncreased("5");
    });

    test.fixme("Add product without size and color", async ({ app }) => {
        // KNOWN ISSUE: The "Fusion Backpack" product is not added to Card on the "Home" page after clicking "Add to Card" button
        await app.productCardComponent.addProductToCartByTitle("Fusion Backpack");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToCart("Fusion Backpack");
    });

    test("Add product to Wish List", async ({ app }) => {
        await app.productCardComponent.addProductToWishList("Radiant Tee");
        await app.homePage.expectPageTitle("My Wish List");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToWishList("Radiant Tee");
    });

    test("Add product to Compare", async ({ app }) => {
        await app.productCardComponent.addProductToCompareList("Radiant Tee");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProductToCompare("Radiant Tee");
    });
});
