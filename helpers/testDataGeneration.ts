import { faker } from "@faker-js/faker";
import { User } from "./Interfaces/userInterface";

export class TestUserFactory {
    static generateValidUser(): User {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 5, prefix: "PlayWright@" }),
        };
    }

    static emptyUser(): User {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }

    static generateFirstName(length: number): string {
        return faker.string.alpha(length);
    }

    static generateLastName(length: number): string {
        return faker.string.alpha(length);
    }

    static generateEmail(length: number): string {
        const symbol = faker.string.alpha(length);
        return `${symbol}@a.ua`;
    }

    static generatePassword(length: number): string {
        const lower = faker.string.alpha({ casing: "lower", length: 1 });
        const upper = faker.string.alpha({ casing: "upper", length: 1 });
        const number = faker.string.numeric(1);
        const symbol = faker.string.symbol(1);

        const fixed = `${lower}${upper}${number}${symbol}`;
        const remainingLength = length - fixed.length;

        const remaining = faker.internet.password({ length: remainingLength });

        return `${fixed}${remaining}`;
    }

    static generateUserWithMinSymbols(): User {
        return {
            firstName: this.generateFirstName(1),
            lastName: this.generateLastName(1),
            email: this.generateEmail(1),
            password: this.generatePassword(8),
        };
    }
    static generateUserWithMaxSymbols(): User {
        return {
            firstName: this.generateFirstName(32),
            lastName: this.generateLastName(32),
            email: this.generateEmail(64),
            password: this.generatePassword(32),
        };
    }
}
