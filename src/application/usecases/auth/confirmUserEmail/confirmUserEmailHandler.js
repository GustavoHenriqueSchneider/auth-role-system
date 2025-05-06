import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class ConfirmUserEmailHandler {
  #userRepository
  #redisService

  constructor({ userRepository, redisService }) {
    this.#userRepository = userRepository
    this.#redisService = redisService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })
    const cachedCode = await this.#redisService.getData(key)

    if (cachedCode === null || cachedCode !== command.getCode()) {
      throw new BadRequestException('Código de confirmação incorreto/inválido.')
    }

    if (user.isVerified()) {
      throw new BadRequestException('Usuário já verificado.')
    }

    user.verify()
    await this.#userRepository.updateUser(user)
    await this.#redisService.deleteData(key)
  }
}