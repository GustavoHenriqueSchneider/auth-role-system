import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'
import GetActualUserResponse from './getActualUserResponse.js'

export default class GetActualUserHandler {
  #userRepository

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  handle = async query => {
    const user = await this.#userRepository.getUserById(query.getUserId())

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return new GetActualUserResponse(user)
  }
}