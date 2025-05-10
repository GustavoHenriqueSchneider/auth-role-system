import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class UpdateUserByIdHandler {
  #userRepository

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  handle = async command => {
    const user = await this.#userRepository.getUserById(command.getUserId())

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    user.setName(command.getName())
    await this.#userRepository.updateUser(user)
  }
}