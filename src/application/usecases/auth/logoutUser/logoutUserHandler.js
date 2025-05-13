import RedisKeys from '../../../../domain/redisKeys.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class LogoutUserHandler {
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
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    await this.#cacheService.deleteData(key)
    await this.#loggerService.log('Logout realizado.')
  }
}