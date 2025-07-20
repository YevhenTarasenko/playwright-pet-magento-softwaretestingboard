import { test as setup } from "../../fixtures/fixturePageAccess";

setup("Sing in as user", async ({ app }) => {
    const email = process.env.EMAIL_CREDS as string;
    const password = process.env.PASSWORD_CREDS as string;

    if (!email || !password) {
        throw new Error("Email or Password is missing");
    }

    await app.SignInPage.openSignInPage();
    await app.SignInPage.fillSignInForm(email, password);
    await app.SignInPage.clickSignInBtn();
    await app.SignInPage.expectUserIsSignedIn();

    await app.SignInPage.page.context().storageState({ path: "tests/.authSetup/user.json" });
});
