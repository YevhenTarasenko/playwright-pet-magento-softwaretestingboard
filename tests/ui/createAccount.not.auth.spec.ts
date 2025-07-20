import { test } from "../../fixtures/fixturePageAccess";
import { GenerateData } from "../../helpers/GenerateData";

test.describe("Create Account", () => {
    test.beforeEach(async ({ app }) => {
        await app.CreateAccountPage.openCreateAccountPage();
    });

    test("Create a new account", async ({ app }) => {
        await app.CreateAccountPage.createValidUser(GenerateData.user.validUser());
    });

    test("Create a new account with min number of symbols", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(GenerateData.user.validUserWithMinSymbols());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectUserIsRegistered();
    });

    test("Create a new account with max number of symbols", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(GenerateData.user.validUserWithMaxSymbols());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectUserIsRegistered();
    });

    test("Empty fields", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(GenerateData.user.emptyUser());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectRequiredFieldErrors();
    });

    test("Create an account with min invalid number of symbols", async ({ app }) => {
        await app.CreateAccountPage.fillCreateAccountForm(GenerateData.user.invalidUserWithMinSymbols());
        await app.CreateAccountPage.clickCreateAccountBtn();
        await app.CreateAccountPage.expectErrorsForMinSymbols();
    });
});
