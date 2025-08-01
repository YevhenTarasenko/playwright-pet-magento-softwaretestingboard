import { PageHolder } from "./PageHolder";
import { CreateAccountPage } from "../pages/CreateAccountPage";
import { SignInPage } from "../pages/SignInPage";
import { HomePage } from "../pages/HomePage";
import { ProductCardComponent } from "../pages/components/ProductCardComponent";

export class Application extends PageHolder {
    public createAccountPage = new CreateAccountPage(this.page);
    public signInPage = new SignInPage(this.page);
    public homePage = new HomePage(this.page);
    public productCardComponent = new ProductCardComponent(this.page);
}
