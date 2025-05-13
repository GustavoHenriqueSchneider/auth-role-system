import RoleModel from '../../../../domain/model/roleModel.js'
import AlreadyExistsException from '../../../exceptions/alreadyExistsException.js'
import CreateRoleResponse from './createRoleResponse.js'

export default class CreateRoleHandler {
  #roleRepository
  #loggerService

  constructor({ roleRepository, loggerService }) {
    this.#roleRepository = roleRepository
    this.#loggerService = loggerService
  }

  handle = async command => {
    const roleName = command.getName()
    const alreadyExistsRole = await this.#roleRepository.existsRoleByName(roleName)

    if (alreadyExistsRole) {
      await this.#loggerService.logError('Tentativa inválida de recriar cargo.')
      throw new AlreadyExistsException('Já existe um cargo com este nome.')
    }

    const role = new RoleModel({ name: command.getName() })
    const roleId = await this.#roleRepository.createRole(role)

    await this.#loggerService.log('Cargo criado.')
    return new CreateRoleResponse(roleId)
  }
}