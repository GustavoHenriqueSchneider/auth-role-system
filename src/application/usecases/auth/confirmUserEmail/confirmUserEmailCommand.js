export default class ConfirmUserEmailCommand {
  #email
  #code

  constructor({ email, code }) {
    this.#email = email
    this.#code = code
  }

  getEmail = () => this.#email
  getCode = () => this.#code
}