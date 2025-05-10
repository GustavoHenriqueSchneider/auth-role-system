export default class AnonymizeUserByIdCommand {
  #userId

  constructor({ userId }) {
    this.#userId = userId
  }

  getUserId = () => this.#userId
}