export default class DeleteActualUserCommand {
  #userId

  constructor({ userId }) {
    this.#userId = userId
  }

  getUserId = () => this.#userId
}