import AlreadyExistsException from '../../../exceptions/alreadyExistsException.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class UpdateRoleByIdHandler {
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

    const newRoleName = command.getName()
    const alreadyExistsRole = await this.#roleRepository.existsRoleByName(newRoleName)

    if (alreadyExistsRole) {
      await this.#loggerService.logError('Tentativa inválida de atualizar cargo com nome de outro ja existente.')
      throw new AlreadyExistsException('Já existe um cargo com este nome.')
    }

    role.setName(newRoleName)
    await this.#roleRepository.updateRole(role)
    await this.#loggerService.log('Cargo excluído.')
  }
}