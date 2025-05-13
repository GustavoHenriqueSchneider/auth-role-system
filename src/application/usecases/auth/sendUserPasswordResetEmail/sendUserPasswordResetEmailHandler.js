import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import SendUserPasswordResetEmailResponse from './sendUserPasswordResetEmailResponse.js'

export default class SendUserPasswordResetEmailHandler {
  #userRepository
  #cacheService
  #emailService
  #jwtService
  #loggerService

  constructor({
    userRepository, cacheService, emailService, jwtService, loggerService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#emailService = emailService
    this.#jwtService = jwtService
    this.#loggerService = loggerService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)
    const token = await this.#jwtService.generateAccessToken(new JwtPayload({ email }), { step: Steps.RESET_PASSWORD_VERIFICATION })

    if (user === null) {
      return new SendUserPasswordResetEmailResponse(token)
    }

    const code = TokenGeneratorService.generateToken(6)
    const key = RedisKeys.formatKey(RedisKeys.RESET_PASSWORD_EMAIL_CODE, { email })

    await this.#cacheService.setData(key, code, { expiration: 900 })
    await this.#emailService.sendEmail(email, EmailTemplate.PASSWORD_RESET, { code })

    await this.#loggerService.log('Reenvio de email de reset de senha realizado.')
    return new SendUserPasswordResetEmailResponse(token)
  }
}