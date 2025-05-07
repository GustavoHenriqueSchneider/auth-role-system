export default class RegisterUserCommand {
  #name
  #email
  #password

  constructor({
    name, email, password
  }) {
    this.#name = name
    this.#email = email
    this.#password = password
  }

  getName = () => this.#name
  getEmail = () => this.#email
  getPassword = () => this.#password
}