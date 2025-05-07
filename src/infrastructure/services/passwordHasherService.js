import bcrypt from 'bcrypt'

export default class PasswordHasherService {
  static SALT_ROUNDS = 10

  hash = async password => {
    try {
      return await bcrypt.hash(password, PasswordHasherService.SALT_ROUNDS)

    } catch (error) {

      console.error('Erro ao gerar senha criptografada')
      throw error
    }
  }

  compare = async (plain, hashed) => {
    try {
      return await bcrypt.compare(plain, hashed)

    } catch (error) {

      console.error('Erro ao comparar senha crua com criptografada')
      throw error
    }
  }
}