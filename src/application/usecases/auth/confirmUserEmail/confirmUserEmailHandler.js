import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class ConfirmUserEmailHandler {
  #userRepository
  #cacheService

  constructor({ userRepository, cacheService }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })
    const cachedCode = await this.#cacheService.getData(key)

    if (cachedCode === null || cachedCode !== command.getCode()) {
      throw new BadRequestException('Código de confirmação incorreto/inválido.')
    }

    if (user.isVerified()) {
      throw new BadRequestException('Usuário já verificado.')
    }

    user.verify()
    await this.#userRepository.updateUser(user)
    await this.#cacheService.deleteData(key)
  }
}