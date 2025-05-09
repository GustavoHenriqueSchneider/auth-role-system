import RoleModel from '../../domain/model/roleModel.js'
import UserModel from '../../domain/model/userModel.js'
import Tables from '../../domain/tables.js'

export default class UserRepository {
  #knexClient

  constructor({ knexClient }) {
    this.#knexClient = knexClient
  }

  #users = () => this.#knexClient(Tables.USERS)
  #userRoles = () => this.#knexClient(Tables.USER_ROLES)

  createUser = async user => {
    const trx = await this.#knexClient.transaction()

    try {
      const userRoles = user.getRoles()
      const roleRecords = await trx(Tables.ROLES)
        .select('id', 'name')
        .whereIn('name', userRoles)

      const existentRoles = roleRecords.map(role => role.name)
      const missingRoles = userRoles.filter(role => !existentRoles.includes(role))

      if (missingRoles.length > 0) {
        throw new Error(`Os seguintes cargos não existem: '${missingRoles.join(', ')}'`)
      }

      const [ { userId } ] = await trx(Tables.USERS)
        .insert(user.toDatabaseObject())
        .returning('id as userId')

      await trx(Tables.USER_ROLES).insert(roleRecords.map(role => ({
        user_id: userId,
        role_id: role.id
      })))

      await trx.commit()
      return userId

    } catch (error) {

      await trx.rollback()
      throw error
    }
  }

  #getUserByParams = async params => {
    const userDto = await this.#users()
      .where(params)
      .first()

    if (!userDto) {
      return null
    }

    const roleRows = await this.#userRoles()
      .join(Tables.ROLES, `${Tables.USER_ROLES}.role_id`, `${Tables.ROLES}.id`)
      .where(`${Tables.USER_ROLES}.user_id`, userDto.id)
      .select(`${Tables.ROLES}.id as id`, `${Tables.ROLES}.name as name`)

    const roles = roleRows.map(row => new RoleModel(row))

    return new UserModel({
      ...userDto,
      roles
    })
  }

  getUserByEmail = async email => {
    return this.#getUserByParams({ email })
  }

  getUserById = async userId => {
    return this.#getUserByParams({ id: userId })
  }

  existsUserByEmail = async email => {
    const [ { count } ] = await this.#users()
      .where({ email })
      .count()

    return Number(count) > 0
  }

  updateUser = async user => {
    const userDto = user.toDatabaseObject()
    userDto.updated_at = new Date()

    await this.#users()
      .where({ id: user.getId() })
      .update(userDto)
  }
}