import UserModel from "../../domain/model/userModel.js"

export default class UserRepository {
  #knexClient

  constructor({ knexClient }) {
    this.#knexClient = knexClient
  }

  #getDatabase = () => this.#knexClient('users')

  createUser = async user => {
    const userDto = user.toDatabaseObject()

    const [result] = await this.#getDatabase()
      .insert(userDto)
      .returning('id')

    return result.id
  }

  getUserByEmail = async email => {
    const userDto = await this.#getDatabase()
      .where({ email })
      .first()

    return userDto ? new UserModel(userDto) : null
  }

  existsByEmail = async email => {
    const [{ count }] = await this.#getDatabase()
      .where({ email })
      .count()

    return Number(count) > 0
  }

  deleteUserById = async userId => {
    return await this.#getDatabase()
      .where({ id: userId })
      .del()
  }

  updateUser = async user => {
    const userDto = user.toDatabaseObject()
    userDto.updated_at = new Date()

    return await this.#getDatabase()
      .where({ id: user.getId() })
      .update(userDto)
  }
}