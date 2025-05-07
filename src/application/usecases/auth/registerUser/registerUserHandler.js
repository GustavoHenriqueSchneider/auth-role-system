import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import UserModel from '../../../../domain/model/userModel.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import RegisterUserResponse from './registerUserResponse.js'
import AlreadyExistsException from '../../../../webapi/exceptions/alreadyExistsException.js'

export default class RegisterUserHandler {
  #userRepository
  #emailService
  #jwtService
  #passwordHasherService
  #redisService

  constructor({
    userRepository, emailService, jwtService, passwordHasherService, redisService
  }) {
    this.#userRepository = userRepository
    this.#emailService = emailService
    this.#jwtService = jwtService
    this.#passwordHasherService = passwordHasherService
    this.#redisService = redisService
  }

  handle = async command => {
    const email = command.getEmail()
    const userExists = await this.#userRepository.existsByEmail(email)

    if (userExists) {
      throw new AlreadyExistsException('Um usuário com esse email já existe.')
    }

    const passwordHash = await this.#passwordHasherService.hash(command.getPassword())
    const user = new UserModel({
      name: command.getName(), email: command.getEmail(), password_hash: passwordHash
    })
    await this.#userRepository.createUser(user)

    const code = TokenGeneratorService.generateToken(6)
    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })

    await this.#redisService.setData(key, code, { expiration: 900 })
    await this.#emailService.sendEmail(email, EmailTemplate.EMAIL_VERIFICATION, { code })

    const token = this.#jwtService.generateAccessToken(new JwtPayload({ email }), { step: Steps.EMAIL_VERIFICATION })
    return new RegisterUserResponse(token)
  }
}