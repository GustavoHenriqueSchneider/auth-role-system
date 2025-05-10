export default class UserRoleModel {
  #userId
  #roleId

  constructor({ user_id, role_id }) {
    this.#userId = user_id
    this.#roleId = role_id
  }

  toDatabaseObject = () => ({
    user_id: this.#userId,
    role_id: this.#roleId,
  })
}