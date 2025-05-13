import NotFoundException from '../../../exceptions/notFoundException.js'
import GetRoleByIdResponse from './getRoleByIdResponse.js'

export default class GetRoleByIdHandler {
  #roleRepository
  #loggerService

  constructor({ roleRepository, loggerService }) {
    this.#roleRepository = roleRepository
    this.#loggerService = loggerService
  }

  handle = async query => {
    const role = await this.#roleRepository.getRoleById(query.getRoleId())

    if (role === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Cargo não encontrado.')
    }

    return new GetRoleByIdResponse(role)
  }
}