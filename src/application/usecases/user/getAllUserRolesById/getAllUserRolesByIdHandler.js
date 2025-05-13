import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'
import GetAllUserRolesByIdResponse from './getAllUserRolesByIdResponse.js'

export default class GetAllUserRolesByIdHandler {
  #userRepository

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  handle = async query => {
    const user = await this.#userRepository.getUserById(query.getUserId())

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return new GetAllUserRolesByIdResponse(user.getRoles())
  }
}