export default class JoinRoleToUserCommand {
  #userId
  #roleId

  constructor({ userId, roleId }) {
    this.#userId = userId
    this.#roleId = roleId
  }

  getUserId = () => this.#userId
  getRoleId = () => this.#roleId
}