import RedisKeys from '../../../../domain/redisKeys.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class LogoutUserHandler {
  #userRepository
  #redisService

  constructor({ userRepository, redisService }) {
    this.#userRepository = userRepository
    this.#redisService = redisService
  }

  handle = async command => {
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    await this.#redisService.deleteData(key)
  }
}