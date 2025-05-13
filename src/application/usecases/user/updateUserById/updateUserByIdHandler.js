import NotFoundException from '../../../exceptions/notFoundException.js'

export default class UpdateUserByIdHandler {
  #userRepository
  #loggerService

  constructor({ userRepository, loggerService }) {
    this.#userRepository = userRepository
    this.#loggerService = loggerService
  }

  handle = async command => {
    const user = await this.#userRepository.getUserById(command.getUserId())

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    user.setName(command.getName())
    await this.#userRepository.updateUser(user)
    await this.#loggerService.log('Usuário atualizado.')
  }
}