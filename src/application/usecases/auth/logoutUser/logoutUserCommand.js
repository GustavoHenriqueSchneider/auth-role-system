export default class LogoutUserCommand {
    #userId
    
    constructor({ userId }) {
        this.#userId = userId
    }

    getUserId = () => this.#userId
}