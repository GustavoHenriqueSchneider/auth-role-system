export default class SendUserPasswordResetEmailCommand {
    #email
    
    constructor({ email }) {
        this.#email = email
    }

    getEmail = () => this.#email
}