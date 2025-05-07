export default class RoleModel {
  #id
  #name

  constructor({ id, name }) {
    this.#id = id
    this.#name = name
  }

  getId = () => this.#id
  getName = () => this.#name
}