import NotFoundException from '../../../exceptions/notFoundException.js'
import GetUserByIdResponse from './getUserByIdResponse.js'

export default class GetUserByIdHandler {
  #userRepository

  constructor({ userRepository }) {
    this.#userRepository = userRepository
  }

  handle = async query => {
    const user = await this.#userRepository.getUserById(query.getUserId())

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    return new GetUserByIdResponse(user)
  }
}