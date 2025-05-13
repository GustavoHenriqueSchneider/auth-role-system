import NotFoundException from '../../../exceptions/notFoundException.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import Roles from '../../../../domain/auth/roles.js'
import RandomDataGeneratorService from '../../../services/randomDataGeneratorService.js'

export default class AnonymizeUserByIdHandler {
  #userRepository
  #passwordHasherService
  #loggerService

  constructor({
    userRepository, passwordHasherService, loggerService
  }) {
    this.#userRepository = userRepository
    this.#passwordHasherService = passwordHasherService
    this.#loggerService = loggerService
  }

  handle = async command => {
    const user = await this.#userRepository.getUserById(command.getUserId())

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new NotFoundException('Usuário não encontrado.')
    }

    if (user.hasRole(Roles.ADMIN)) {
      await this.#loggerService.logError(`Tentativa inválida de anonimizar usuário com a role '${Roles.ADMIN}'.`)
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
    await this.#loggerService.anonymizeLogsByUserId(user.getId(), anonymousData)
    await this.#loggerService.log('Usuário anonimizado.')
  }
}