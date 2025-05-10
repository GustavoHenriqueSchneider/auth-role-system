export default class UpdateActualUserCommand {
  #userId
  #name

  constructor({ userId, name }) {
    this.#userId = userId
    this.#name = name
  }

  getUserId = () => this.#userId
  getName = () => this.#name
}