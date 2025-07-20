import { faker } from "@faker-js/faker";
import { User } from "./Interfaces/userInterface";

export class GenerateData {
    static user = {
        validUser(): User {
            return {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5, prefix: "PlayWright@" }),
            };
        },
        emptyUser(): User {
            return {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            };
        },

        firstName(length: number): string {
            return faker.string.alpha(length);
        },

        lastName(length: number): string {
            return faker.string.alpha(length);
        },

        email(length: number, domain: string): string {
            const symbol = faker.string.alpha(length);
            return `${symbol}${domain}`;
        },

        password(length: number): string {
            const lower = faker.string.alpha({ casing: "lower", length: 1 });
            const upper = faker.string.alpha({ casing: "upper", length: 1 });
            const number = faker.string.numeric(1);
            const symbol = faker.string.symbol(1);

            const fixed = `${lower}${upper}${number}${symbol}`;
            const remainingLength = length - fixed.length;

            const remaining = faker.internet.password({ length: remainingLength });

            return `${fixed}${remaining}`;
        },

        validUserWithMinSymbols(): User {
            return {
                firstName: this.firstName(1),
                lastName: this.lastName(1),
                email: this.email(1, "@a.ua"),
                password: this.password(8),
            };
        },

        validUserWithMaxSymbols(): User {
            return {
                firstName: this.firstName(32),
                lastName: this.lastName(32),
                email: this.email(64),
                password: this.password(32),
            };
        },

        invalidUserWithMinSymbols(): User {
            return {
                firstName: "",
                lastName: "",
                email: this.email(1, "@a.a"),
                password: this.password(7),
            };
        },
    };
}
