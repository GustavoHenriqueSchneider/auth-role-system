export default class CreateRoleCommand {
  #name

  constructor({ name }) {
    this.#name = name
  }

  getName = () => this.#name
}