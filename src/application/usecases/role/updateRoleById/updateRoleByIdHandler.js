import AlreadyExistsException from '../../../../webapi/exceptions/alreadyExistsException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class UpdateRoleByIdHandler {
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

    const newRoleName = command.getName()
    const alreadyExistsRole = await this.#roleRepository.existsRoleByName(newRoleName)

    if (alreadyExistsRole) {
      throw new AlreadyExistsException('Já existe um cargo com este nome.')
    }

    role.setName(newRoleName)
    await this.#roleRepository.updateRole(role)
  }
}