export default class UserRoleModel {
  #userId
  #roleId

  constructor({ user_id, role_id }) {
    this.#userId = user_id
    this.#roleId = role_id
  }

  getUserId = () => this.#userId
  getRoleId = () => this.#roleId
}