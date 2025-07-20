import { PageHolder } from "./PageHolder";
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { SignInPage } from "../pages/SignInPage";

export class Application extends PageHolder {
    public CreateAccountPage = new CreateAccountPage(this.page);
    public SignInPage = new SignInPage(this.page);
}
