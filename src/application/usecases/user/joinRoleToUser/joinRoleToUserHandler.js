import Roles from '../../../../domain/auth/roles.js'
import UserRoleModel from '../../../../domain/model/userRoleModel.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'

export default class JoinRoleToUserHandler {
  #userRepository
  #roleRepository
  #userRolesRepository

  constructor({
    userRepository, roleRepository, userRolesRepository
  }) {
    this.#userRepository = userRepository
    this.#roleRepository = roleRepository
    this.#userRolesRepository = userRolesRepository
  }

  handle = async command => {
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    const roleId = command.getRoleId()
    const role = await this.#roleRepository.getRoleById(roleId)

    if (role === null) {
      throw new NotFoundException('Cargo não encontrado.')
    }

    if (role.getName() === Roles.ADMIN) {
      throw new BadRequestException(`Não é possível adicionar o cargo '${Roles.ADMIN}'.`)
    }

    let userRole = await this.#userRolesRepository.getUserRoleByIds(userId, roleId)

    if (userRole) {
      throw new BadRequestException('O usuário já possui o cargo informado.')
    }

    userRole = new UserRoleModel({ user_id: userId, role_id: roleId })
    await this.#userRolesRepository.joinUserToRole(userRole)
  }
}