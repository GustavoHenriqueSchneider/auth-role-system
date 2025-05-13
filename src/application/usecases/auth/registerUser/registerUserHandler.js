import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import UserModel from '../../../../domain/model/userModel.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import RegisterUserResponse from './registerUserResponse.js'
import AlreadyExistsException from '../../../exceptions/alreadyExistsException.js'

export default class RegisterUserHandler {
  #userRepository
  #cacheService
  #emailService
  #jwtService
  #loggerService
  #passwordHasherService

  constructor({
    userRepository, cacheService, emailService, jwtService, loggerService, passwordHasherService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#emailService = emailService
    this.#jwtService = jwtService
    this.#loggerService = loggerService
    this.#passwordHasherService = passwordHasherService
  }

  handle = async command => {
    const email = command.getEmail()
    const userExists = await this.#userRepository.existsUserByEmail(email)

    if (userExists) {
      await this.#loggerService.logError('Tentativa inválida de recriar usuário.')
      throw new AlreadyExistsException('Um usuário com esse email já existe.')
    }

    const passwordHash = await this.#passwordHasherService.hash(command.getPassword())
    const user = new UserModel({
      name: command.getName(), email: command.getEmail(), password_hash: passwordHash
    })
    await this.#userRepository.createUser(user)

    const code = TokenGeneratorService.generateToken(6)
    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })

    await this.#cacheService.setData(key, code, { expiration: 900 })
    await this.#emailService.sendEmail(email, EmailTemplate.EMAIL_VERIFICATION, { code })

    const token = await this.#jwtService.generateAccessToken(new JwtPayload({ email }), { step: Steps.EMAIL_VERIFICATION })

    await this.#loggerService.log('Usuário criado.')
    return new RegisterUserResponse(token)
  }
}