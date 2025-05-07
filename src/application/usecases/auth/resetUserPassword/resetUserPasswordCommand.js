export default class ResetUserPasswordCommand {
    #email
    #code
    #password

    constructor({ email, code, password }) {
        this.#email = email
        this.#code = code
        this.#password = password
    }

    getEmail = () => this.#email
    getCode = () => this.#code
    getPassword = () => this.#password
}