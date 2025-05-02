export default class ConfirmUserEmailCommand {
    constructor({ name, email, password, code }) {
        this.name = name
        this.email = email
        this.password = password
        this.code = code
    }
}