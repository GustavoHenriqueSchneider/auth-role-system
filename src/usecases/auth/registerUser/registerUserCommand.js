export default class RegisterUserCommand {
    constructor({ name, email, password }) {
        this.name = name
        this.email = email
        this.password = password
    }
}