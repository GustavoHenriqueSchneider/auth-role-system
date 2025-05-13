import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class ResetUserPasswordHandler {
  #userRepository
  #passwordHasherService
  #cacheService
  #loggerService

  constructor({
    userRepository, cacheService, loggerService, passwordHasherService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#loggerService = loggerService
    this.#passwordHasherService = passwordHasherService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.RESET_PASSWORD_EMAIL_CODE, { email })
    const cachedCode = await this.#cacheService.getData(key)

    if (cachedCode === null || cachedCode !== command.getCode()) {
      await this.#loggerService.logError('Tentativa inválida de reset de senha de usuário.')
      throw new BadRequestException('Código de reset de senha incorreto/inválido.')
    }

    const newPasswordHash = await this.#passwordHasherService.hash(command.getPassword())
    user.setPasswordHash(newPasswordHash)

    await this.#userRepository.updateUser(user)
    await this.#cacheService.deleteData(key)
    await this.#loggerService.log('Reset de senha realizado para usuário.')
  }
}