export default class GetRoleByIdQuery {
  #roleId

  constructor({ roleId }) {
    this.#roleId = roleId
  }

  getRoleId = () => this.#roleId
}