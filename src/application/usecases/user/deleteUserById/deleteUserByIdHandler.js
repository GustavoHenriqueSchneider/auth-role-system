import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import Roles from '../../../../domain/auth/roles.js'

export default class DeleteUserByIdHandler {
  #userRepository

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  handle = async command => {
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    if (user.hasRole(Roles.ADMIN)) {
      throw new BadRequestException(`Não é possível excluir um usuário com a role '${Roles.ADMIN}'.`)
    }

    await this.#userRepository.deleteUserById(userId)
  }
}