export default class GetUserByIdQuery {
  #userId

  constructor({ userId }) {
    this.#userId = userId
  }

  getUserId = () => this.#userId
}