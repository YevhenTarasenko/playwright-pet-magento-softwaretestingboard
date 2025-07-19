import { test } from "../../fixtures/fixturePageAccess";
import { TestUserFactory } from "../../helpers/testDataGeneration";

test.describe("Create Account", () => {
    test.beforeEach(async ({ app }) => {
        await app.CreateAccountPage.openCreateAccountPagePage();
    });

    test("Create a new account", async ({ app }) => {
        await app.CreateAccountPage.createValidUser(TestUserFactory.generateValidUser());
    });

    test("Create a new account with min number of symbols", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(TestUserFactory.generateUserWithMinSymbols());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectUserIsRegistered();
    });

    test("Create a new account with max number of symbols", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(TestUserFactory.generateUserWithMaxSymbols());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectUserIsRegistered();
    });

    test("Empty fields", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(TestUserFactory.emptyUser());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectRequiredFieldErrors();
    });
});
