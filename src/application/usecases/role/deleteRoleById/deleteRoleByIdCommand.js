export default class DeleteRoleByIdCommand {
  #roleId

  constructor({ roleId }) {
    this.#roleId = roleId
  }

  getRoleId = () => this.#roleId
}