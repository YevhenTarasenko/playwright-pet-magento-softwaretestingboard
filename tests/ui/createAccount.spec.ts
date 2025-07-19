import { test } from "../../fixtures/fixturePageAccess";
import { TestUserFactory } from "../../helpers/testDataGeneration";

// generate user data
let user = TestUserFactory.generateUser();

test("Create a new account", async ({ app }) => {
    await app.CreateAccountPage.openCreateAccountPagePage();
    await app.CreateAccountPage.fillDataAndCreateAccountPage(user);
});
