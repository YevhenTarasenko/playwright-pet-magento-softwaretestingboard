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

    async openCreateAccountPagePage() {
        await this.page.goto("/customer/account/create/");
        await expect(this.pageTitle).toHaveText("Create New Customer Account");
    }

    async fillDataAndCreateAccountPage(user: User) {
        await this.firstNameField.fill(user.firstName);
        await this.lastNameField.fill(user.lastName);
        await this.emailField.fill(user.email);
        await this.passwordField.fill(user.password);
        await this.passwordConfirmField.fill(user.password);
        await this.createAnAccountBtn.click();

        await expect(this.thankYouForRegisteringBlock).toBeVisible();
    }
}
