import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import ResendUserEmailConfirmationResponse from './resendUserEmailConfirmationResponse.js'

export default class ResendUserEmailConfirmationHandler {
  #userRepository
  #emailService
  #jwtService
  #redisService

  constructor({
    userRepository, emailService, jwtService, redisService
  }) {
    this.#userRepository = userRepository
    this.#emailService = emailService
    this.#jwtService = jwtService
    this.#redisService = redisService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)
    const token = this.#jwtService.generateAccessToken(new JwtPayload({ email }), { step: Steps.EMAIL_VERIFICATION })

    if (user === null) {
      return new ResendUserEmailConfirmationResponse(token)
    }

    if (user.isVerified()) {
      return new ResendUserEmailConfirmationResponse(token)
    }

    const code = TokenGeneratorService.generateToken(6)
    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email })

    await this.#redisService.setData(key, code, { expiration: 900 })
    await this.#emailService.sendEmail(email, EmailTemplate.EMAIL_VERIFICATION, { code })

    return new ResendUserEmailConfirmationResponse(token)
  }
}