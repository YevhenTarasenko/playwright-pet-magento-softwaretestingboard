import { test as setup } from "../../fixtures/fixturePageAccess";

setup("Sing in as user", async ({ app }) => {
    const email = process.env.EMAIL_CREDS as string;
    const password = process.env.PASSWORD_CREDS as string;

    if (!email || !password) {
        throw new Error("Email or Password is missing");
    }

    await app.signInPage.openSignInPage();
    await app.signInPage.fillSignInForm(email, password);
    await app.signInPage.clickSignInBtn();
    await app.signInPage.expectUserIsSignedIn();

    await app.signInPage.setStorageState();
});
