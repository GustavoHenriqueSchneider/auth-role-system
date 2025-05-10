export default class DeleteUserByIdCommand {
  #userId

  constructor({ userId }) {
    this.#userId = userId
  }

  getUserId = () => this.#userId
}