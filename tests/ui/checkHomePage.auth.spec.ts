import { test } from "../../fixtures/fixturePageAccess";

test.describe("Home page tests", () => {
    test.beforeEach(async ({ app }) => {
        await app.homePage.openHomePage();
        await app.homePage.expectPageTitle("Home Page");
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
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProduct();
    });

    test.fixme("Add product without size and color", async ({ app }) => {
        // KNOWN ISSUE: The "Fusion Backpack" product is not added to Card on the "Home" page after clicking "Add to Card" button
        await app.productCardComponent.addProductToCartByTitle("Fusion Backpack");
        await app.productCardComponent.expectSuccessMsgAfterAddingTheProduct();
    });
});
