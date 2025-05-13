import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class ConfirmUserEmailHandler {
  #userRepository
  #cacheService
  #loggerService

  constructor({
    userRepository, cacheService, loggerService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#loggerService = loggerService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })
    const cachedCode = await this.#cacheService.getData(key)

    if (cachedCode === null || cachedCode !== command.getCode()) {
      await this.#loggerService.logError('Tentativa inválida de confirmação de email de usuário.')
      throw new BadRequestException('Código de confirmação incorreto/inválido.')
    }

    if (user.isVerified()) {
      await this.#loggerService.logError('Tentativa inválida de verificar usuário já verificado.')
      throw new BadRequestException('Usuário já verificado.')
    }

    user.verify()
    await this.#userRepository.updateUser(user)
    await this.#cacheService.deleteData(key)
    await this.#loggerService.log('Email de usuário confirmado.')
  }
}