import BadRequestException from '../../../exceptions/badRequestException.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class DeleteRoleByIdHandler {
  #roleRepository
  #loggerService

  constructor({ roleRepository, loggerService }) {
    this.#roleRepository = roleRepository
    this.#loggerService = loggerService
  }

  handle = async command => {
    const roleId = command.getRoleId()
    const role = await this.#roleRepository.getRoleById(roleId)

    if (role === null) {
      await this.#loggerService.logError('Cargo não encontrado.')
      throw new NotFoundException('Cargo não encontrado.')
    }

    if (role.isVinculatedToAnyUser()) {
      await this.#loggerService.logError('Não é possível apagar um cargo em uso.')
      throw new BadRequestException('Não é possível apagar um cargo em uso.')
    }

    await this.#roleRepository.deleteRoleById(roleId)
    await this.#loggerService.log('Cargo excluído.')
  }
}