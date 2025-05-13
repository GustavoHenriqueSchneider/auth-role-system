import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class ResetUserPasswordHandler {
  #userRepository
  #passwordHasherService
  #cacheService

  constructor({
    userRepository, passwordHasherService, cacheService
  }) {
    this.#userRepository = userRepository
    this.#passwordHasherService = passwordHasherService
    this.#cacheService = cacheService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.RESET_PASSWORD_EMAIL_CODE, { email })
    const cachedCode = await this.#cacheService.getData(key)

    if (cachedCode === null || cachedCode !== command.getCode()) {
      throw new BadRequestException('Código de reset de senha incorreto/inválido.')
    }

    const newPasswordHash = await this.#passwordHasherService.hash(command.getPassword())
    user.setPasswordHash(newPasswordHash)

    await this.#userRepository.updateUser(user)
    await this.#cacheService.deleteData(key)
  }
}