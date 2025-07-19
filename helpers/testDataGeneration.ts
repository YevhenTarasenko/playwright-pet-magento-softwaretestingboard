import { faker } from "@faker-js/faker";
import { User } from "./Interfaces/userInterface";

export class TestUserFactory {
    static generateUser(): User {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 5, prefix: "PlayWright@" }),
        };
    }
}
