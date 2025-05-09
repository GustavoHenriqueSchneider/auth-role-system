import RoleModel from '../../domain/model/roleModel.js'
import Tables from '../../domain/tables.js'

export default class RoleRepository {
  #knexClient

  constructor({ knexClient }) {
    this.#knexClient = knexClient
  }

  #roles = () => this.#knexClient(Tables.ROLES)
  #userRoles = () => this.#knexClient(Tables.USER_ROLES)

  createRole = async role => {
    const [ { roleId } ] = await this.#roles()
      .insert(role.toDatabaseObject())
      .returning('id as roleId')

    return roleId
  }

  getRoleById = async roleId => {
    const roleDto = await this.#roles()
      .where({ id: roleId })
      .first()

    if (!roleDto) {
      return null
    }

    const beingUsed = await this.#userRoles()
      .where({ role_id: roleDto.id })
      .first() !== undefined

    return new RoleModel({ ...roleDto, being_used: beingUsed })
  }

  existsRoleByName = async name => {
    const [ { count } ] = await this.#roles()
      .where({ name })
      .count()

    return Number(count) > 0
  }

  deleteRoleById = async roleId => {
    await this.#roles()
      .where({ id: roleId })
      .del()
  }

  updateRole = async role => {
    const roleDto = role.toDatabaseObject()

    await this.#roles()
      .where({ id: role.getId() })
      .update(roleDto)
  }
}