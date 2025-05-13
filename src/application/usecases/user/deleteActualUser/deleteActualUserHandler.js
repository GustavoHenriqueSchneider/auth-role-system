import NotFoundException from '../../../exceptions/notFoundException.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import Roles from '../../../../domain/auth/roles.js'

export default class DeleteActualUserHandler {
  #userRepository
  #loggerService

  constructor({ userRepository, loggerService }) {
    this.#userRepository = userRepository
    this.#loggerService = loggerService
  }

  handle = async command => {
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    if (user.hasRole(Roles.ADMIN)) {
      await this.#loggerService.logError(`Tentativa inválida de excluir usuário com a role '${Roles.ADMIN}'.`)
      throw new BadRequestException(`Não é possível excluir um usuário com a role '${Roles.ADMIN}'.`)
    }

    await this.#userRepository.deleteUserById(userId)
    await this.#loggerService.log('Usuário atual excluído.')
  }
}