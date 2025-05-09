export default class RoleModel {
  #id
  #name
  #being_used

  constructor({
    id, name, being_used
  }) {
    this.#id = id
    this.#name = name.toLowerCase()
    this.#being_used = being_used ?? false
  }

  getId = () => this.#id
  getName = () => this.#name

  setName = name => this.#name = name.toLowerCase()

  isVinculatedToAnyUser = () => this.#being_used

  toDatabaseObject = () => ({ name: this.#name })
}