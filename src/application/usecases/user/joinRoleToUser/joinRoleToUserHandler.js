import Roles from '../../../../domain/auth/roles.js'
import UserRoleModel from '../../../../domain/model/userRoleModel.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import NotFoundException from '../../../exceptions/notFoundException.js'

export default class JoinRoleToUserHandler {
  #userRepository
  #roleRepository
  #userRolesRepository
  #loggerService

  constructor({
    userRepository, roleRepository, userRolesRepository, loggerService
  }) {
    this.#userRepository = userRepository
    this.#roleRepository = roleRepository
    this.#userRolesRepository = userRolesRepository
    this.#loggerService = loggerService
  }

  handle = async command => {
    const userId = command.getUserId()
    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    const roleId = command.getRoleId()
    const role = await this.#roleRepository.getRoleById(roleId)

    if (role === null) {
      await this.#loggerService.logError('Cargo não encontrado.')
      throw new NotFoundException('Cargo não encontrado.')
    }

    if (role.getName() === Roles.ADMIN) {
      await this.#loggerService.logError(`Tentativa inválida de vincular o cargo '${Roles.ADMIN}' ao usuário.`)
      throw new BadRequestException(`Não é possível adicionar o cargo '${Roles.ADMIN}'.`)
    }

    let userRole = await this.#userRolesRepository.getUserRoleByIds(userId, roleId)

    if (userRole) {
      await this.#loggerService.logError('Tentativa inválida de vincular um cargo já vinculado ao usuário.')
      throw new BadRequestException('O usuário já possui o cargo informado.')
    }

    userRole = new UserRoleModel({ user_id: userId, role_id: roleId })
    await this.#userRolesRepository.joinUserToRole(userRole)
    await this.#loggerService.log('Cargo vinculado ao usuário.')
  }
}