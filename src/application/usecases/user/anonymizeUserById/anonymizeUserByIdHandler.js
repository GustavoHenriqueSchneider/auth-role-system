import NotFoundException from '../../../../webapi/exceptions/notFoundException.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'
import Roles from '../../../../domain/auth/roles.js'
import RandomDataGeneratorService from '../../../services/randomDataGeneratorService.js'

export default class AnonymizeUserByIdHandler {
  #userRepository
  #passwordHasherService

  constructor({ userRepository, passwordHasherService }) {
    this.#userRepository = userRepository
    this.#passwordHasherService = passwordHasherService
  }

  handle = async command => {
    const user = await this.#userRepository.getUserById(command.getUserId())

    if (user === null) {
      throw new NotFoundException('Usuário não encontrado.')
    }

    if (user.hasRole(Roles.ADMIN)) {
      throw new BadRequestException(`Não é possível anonimizar um usuário com a role '${Roles.ADMIN}'.`)
    }

    const anonymousData = {
      name: process.env.ANONYMOUS_USERNAME,
      email: RandomDataGeneratorService.generateEmail()
    }

    user.setName(anonymousData.name)
    user.setEmail(anonymousData.email)

    const newPasswordHash = await this.#passwordHasherService.hash(RandomDataGeneratorService.generatePassword())
    user.setPasswordHash(newPasswordHash)

    await this.#userRepository.updateUser(user)
  }
}