import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import RegisterUserResponse from './registerUserResponse.js'

export default class RegisterUserHandler {
  constructor({ userRepository, emailService, jwtService, passwordHasherService, redisService }) {
    this._userRepository = userRepository
    this._emailService = emailService
    this._jwtService = jwtService
    this._passwordHasherService = passwordHasherService
    this._redisService = redisService
  }

  handle = async command => {
    const userExists = this._userRepository.existsByEmail(command.email)
    if (userExists) {
      throw new Error('Um usuário com esse email já existe.')
    }

    const code = TokenGeneratorService.generateToken(6)
    const password = await this._passwordHasherService.hash(command.password)

    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_DATA, { email: command.email })
    await this._redisService.setData(key, { code, password }, { expiration: 900 })

    await this._emailService.sendEmail(command.email, EmailTemplate.EMAIL_VERIFICATION, { code })

    const token = this._jwtService.generateAccessToken(new JwtPayload({
      name: command.name,
      email: command.email
    }), { step: Steps.EMAIL_VERIFICATION })

    return new RegisterUserResponse(token)
  }
}