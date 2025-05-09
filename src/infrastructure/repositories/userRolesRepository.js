import UserRoleModel from '../../domain/model/userRoleModel.js'
import Tables from '../../domain/tables.js'

export default class UserRolesRepository {
  #knexClient

  constructor({ knexClient }) {
    this.#knexClient = knexClient
  }

  #userRoles = () => this.#knexClient(Tables.USER_ROLES)

  joinUserToRole = async userRole => {
    await this.#userRoles()
      .insert(userRole.toDatabaseObject())
  }

  removeRoleFromUser = async (userId, roleId) => {
    await this.#userRoles()
      .where({ user_id: userId, role_id: roleId })
      .del()
  }
}