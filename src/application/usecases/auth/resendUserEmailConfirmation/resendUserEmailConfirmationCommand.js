export default class ResendUserEmailConfirmationCommand {
  #email

  constructor({ email }) {
    this.#email = email
  }

  getEmail = () => this.#email
}