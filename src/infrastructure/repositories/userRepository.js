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

  getUserById = async userId => {
    return await this.#getDatabase()
      .where({ id: userId })
      .first()
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

  updateUserById = async (userId, user) => {
    return await this.#getDatabase()
      .where({ id: userId })
      .update(user)
  }
}