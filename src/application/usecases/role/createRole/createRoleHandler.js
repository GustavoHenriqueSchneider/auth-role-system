import RoleModel from '../../../../domain/model/roleModel.js'
import AlreadyExistsException from '../../../../webapi/exceptions/alreadyExistsException.js'
import CreateRoleResponse from './createRoleResponse.js'

export default class CreateRoleHandler {
  #roleRepository

  constructor({ roleRepository }) {
    this.#roleRepository = roleRepository
  }

  handle = async command => {
    const roleName = command.getName()
    const alreadyExistsRole = await this.#roleRepository.existsRoleByName(roleName)

    if (alreadyExistsRole) {
      throw new AlreadyExistsException('Já existe um cargo com este nome.')
    }

    const role = new RoleModel({ name: command.getName() })
    const roleId = await this.#roleRepository.createRole(role)

    return new CreateRoleResponse(roleId)
  }
}