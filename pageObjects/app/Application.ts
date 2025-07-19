import { PageHolder } from "./PageHolder";
import { CreateAccountPage } from "../pages/CreateAccountPage";

export class Application extends PageHolder {
    public CreateAccountPage = new CreateAccountPage(this.page);
}
