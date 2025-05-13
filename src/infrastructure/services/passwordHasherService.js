import bcrypt from 'bcrypt'

export default class PasswordHasherService {
  #loggerService

  constructor({ loggerService }) {
    this.#loggerService = loggerService
  }

  static SALT_ROUNDS = 10

  hash = async password => {
    try {
      return await bcrypt.hash(password, PasswordHasherService.SALT_ROUNDS)

    } catch (error) {

      await this.#loggerService.logError('Erro ao gerar senha criptografada')
      throw error
    }
  }

  compare = async (plain, hashed) => {
    try {
      return await bcrypt.compare(plain, hashed)

    } catch (error) {

      await this.#loggerService.logError('Erro ao comparar senha crua com criptografada')
      throw error
    }
  }
}