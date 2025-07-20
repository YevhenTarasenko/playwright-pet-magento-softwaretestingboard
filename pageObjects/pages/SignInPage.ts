import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage {
    private readonly pageTitle = this.page.locator("[data-ui-id='page-title-wrapper']");
    private readonly emailField = this.page.locator("[name='login[username]']");
    private readonly passwordField = this.page.locator("[name='login[password]']");
    private readonly signInBtn = this.page.getByRole("button", { name: "Sign In" });
    private readonly signInPageTitle = this.page.locator("[data-ui-id='page-title-wrapper']");

    async openSignInPage() {
        await this.page.goto("/customer/account/login/referer/");
        await expect(this.pageTitle).toHaveText("Customer Login");
    }

    async fillSignInForm(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
    }

    async expectUserIsSignedIn() {
        await expect(this.signInPageTitle).toHaveText("My Account");
    }
}
