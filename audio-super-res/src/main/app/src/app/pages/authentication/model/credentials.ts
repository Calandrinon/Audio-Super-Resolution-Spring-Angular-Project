export class Credentials {
    username: string;
    password: string;

    constructor(email, password) {
        this.username = email;
        this.password = password;
    }
}