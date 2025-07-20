import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../../helpers/Interfaces/userInterface";

export class CreateAccountPage extends BasePage {
    private readonly pageTitle = this.page.locator("[data-ui-id='page-title-wrapper']");
    private readonly firstNameField = this.page.locator("#firstname");
    private readonly lastNameField = this.page.locator("#lastname");
    private readonly emailField = this.page.locator("#email_address");
    private readonly passwordField = this.page.locator("#password");
    private readonly passwordConfirmField = this.page.locator("#password-confirmation");
    private readonly createAnAccountBtn = this.page.getByRole("button", { name: "Create an Account" });
    private readonly thankYouForRegisteringBlock = this.page.locator(".page.messages");
    private readonly firstNameError = this.page.locator("#firstname-error");
    private readonly lastNameError = this.page.locator("#lastname-error");
    private readonly emailError = this.page.locator("#email_address-error");
    private readonly passwordError = this.page.locator("#password-error");
    private readonly passwordConfirmError = this.page.locator("#password-confirmation-error");

    async openCreateAccountPagePage() {
        await this.page.goto("/customer/account/create/");
        await expect(this.pageTitle).toHaveText("Create New Customer Account");
    }

    async fillCreateAccountForm(user: User) {
        await this.firstNameField.fill(user.firstName);
        await this.lastNameField.fill(user.lastName);
        await this.emailField.fill(user.email);
        await this.passwordField.fill(user.password);
        await this.passwordConfirmField.fill(user.password);
    }

    async clickCreateAccountBtn() {
        await this.createAnAccountBtn.click();
    }

    async expectUserIsRegistered() {
        await expect(this.thankYouForRegisteringBlock).toBeVisible();
    }

    async createValidUser(user: User) {
        await this.fillCreateAccountForm(user);
        await this.clickCreateAccountBtn();
        await this.expectUserIsRegistered();
    }

    async expectRequiredFieldErrors() {
        await expect(this.firstNameError).toHaveText("This is a required field.");
        await expect(this.lastNameError).toHaveText("This is a required field.");
        await expect(this.emailError).toHaveText("This is a required field.");
        await expect(this.passwordError).toHaveText("This is a required field.");
        await expect(this.passwordConfirmError).toHaveText("This is a required field.");
    }

    async expectErrorsForMinSymbols() {
        await expect(this.firstNameError).toHaveText("This is a required field.");
        await expect(this.lastNameError).toHaveText("This is a required field.");
        await expect(this.emailError).toContainText("Please enter a valid email address");
        await expect(this.passwordError).toContainText(
            "Minimum length of this field must be equal or greater than 8 symbols",
        );
    }
}
