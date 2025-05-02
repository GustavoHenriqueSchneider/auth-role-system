import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import RegisterUserResponse from './registerUserResponse.js'

export default class RegisterUserHandler {
  constructor({ jwtService, redisService }) {
    this._jwtService = jwtService
    this._redisService = redisService
  }

  handle = async command => {
    const code = TokenGeneratorService.generateToken(6)

    const key = RedisKeys.formatKey(RedisKeys.EMAIL_VERIFICATION_CODE, { email: command.email })
    await this._redisService.setData(key, code)

    // TODO: envia o email com código
    console.log(code)

    // TODO: criptografar a senha
    const token = this._jwtService.generateAccessToken(new JwtPayload({
      name: command.name,
      email: command.email,
      password: command.password
    }), Steps.EMAIL_VERIFICATION)

    return new RegisterUserResponse(token)
  }
}