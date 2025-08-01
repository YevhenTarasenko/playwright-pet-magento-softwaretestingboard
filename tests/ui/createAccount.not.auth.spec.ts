import { test } from "../../fixtures/fixturePageAccess";
import { GenerateData } from "../../helpers/GenerateData";

test.describe("Create Account", () => {
    test.beforeEach(async ({ app }) => {
        await app.createAccountPage.openCreateAccountPage();
    });

    test("Create a new account", async ({ app }) => {
        await app.createAccountPage.createValidUser(GenerateData.user.validUser());
    });

    test("Create a new account with min number of symbols", async ({ app }) => {
        await app.createAccountPage.fillCreateAccountForm(GenerateData.user.validUserWithMinSymbols());
        await app.createAccountPage.clickCreateAccountBtn();
        await app.createAccountPage.expectUserIsRegistered();
    });

    test("Create a new account with max number of symbols", async ({ app }) => {
        await app.createAccountPage.fillCreateAccountForm(GenerateData.user.validUserWithMaxSymbols());
        await app.createAccountPage.clickCreateAccountBtn();
        await app.createAccountPage.expectUserIsRegistered();
    });

    test("Empty fields", async ({ app }) => {
        await app.createAccountPage.fillCreateAccountForm(GenerateData.user.emptyUser());
        await app.createAccountPage.clickCreateAccountBtn();
        await app.createAccountPage.expectRequiredFieldErrors();
    });

    test("Create an account with min invalid number of symbols", async ({ app }) => {
        await app.createAccountPage.fillCreateAccountForm(GenerateData.user.invalidUserWithMinSymbols());
        await app.createAccountPage.clickCreateAccountBtn();
        await app.createAccountPage.expectErrorsForMinSymbols();
    });
});
