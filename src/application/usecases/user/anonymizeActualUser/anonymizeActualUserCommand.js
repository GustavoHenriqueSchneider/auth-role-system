export default class AnonymizeActualUserCommand {
  #userId

  constructor({ userId }) {
    this.#userId = userId
  }

  getUserId = () => this.#userId
}