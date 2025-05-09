import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class DeleteRoleByIdHandler {
  #roleRepository

  constructor({ roleRepository }) {
    this.#roleRepository = roleRepository
  }

  handle = async command => {
    const roleId = command.getRoleId()
    const role = await this.#roleRepository.getRoleById(roleId)

    if (role === null) {
      throw new NotFoundException('Cargo não encontrado.')
    }

    if (role.isVinculatedToAnyUser()) {
      throw new BadRequestException('Não é possível apagar um cargo em uso.')
    }

    await this.#roleRepository.deleteRoleById(roleId)
  }
}