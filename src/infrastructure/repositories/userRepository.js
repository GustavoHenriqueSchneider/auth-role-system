export default class UserRepository {
    constructor({ knexClient }) {
      this._knexClient = knexClient
    }
  
    createUser = async (user) => {
      return await this._knexClient('users').insert(user)
    }

    getUserById = async () => {
        return await this._knexClient('users').where({ email }).sin()
    }
  
    existsByEmail = async (email) => {
      const result = await this._knexClient('users')
        .where({ email })
        .count('id as count')
        .first()
  
      return Number(result.count) > 0
    }
  
    deleteUserById = async (email) => {
      return await this._knexClient('users').where({ email }).del()
    }
  
    updatePasswordById = async (userId, newPassword) => {
      return await this._knexClient('users').where({ id: userId }).update({ password: newPassword })
    }
  }
  