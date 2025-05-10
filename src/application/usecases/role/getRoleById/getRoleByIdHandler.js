import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'
import GetRoleByIdResponse from './getRoleByIdResponse.js'

export default class GetRoleByIdHandler {
  #roleRepository

  constructor({ roleRepository }) {
    this.#roleRepository = roleRepository
  }

  handle = async query => {
    const role = await this.#roleRepository.getRoleById(query.getRoleId())

    if (role === null) {
      throw new NotFoundException('Cargo não encontrado.')
    }

    return new GetRoleByIdResponse(role)
  }
}