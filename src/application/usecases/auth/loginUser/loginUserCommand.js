export default class LoginUserCommand {
    #email
    #password
    
    constructor({ email, password }) {
        this.#email = email
        this.#password = password
    }

    getEmail = () => this.#email
    getPassword = () => this.#password
}