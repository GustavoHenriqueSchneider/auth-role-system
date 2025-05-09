export default class UpdateRoleByIdCommand {
  #roleId
  #name

  constructor({ roleId, name }) {
    this.#roleId = roleId
    this.#name = name
  }

  getRoleId = () => this.#roleId
  getName = () => this.#name
}