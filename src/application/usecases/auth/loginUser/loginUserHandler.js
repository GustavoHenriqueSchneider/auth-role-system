import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import Steps from '../../../../domain/auth/steps.js'
import UserModel from '../../../../domain/model/userModel.js'
import EmailTemplate from '../../../../domain/emailTemplate.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import TokenGeneratorService from '../../../services/tokenGeneratorService.js'
import LoginUserResponse from './loginUserResponse.js'
import AlreadyExistsException from '../../../../webapi/exceptions/alreadyExistsException.js'
import UnauthorizedException from '../../../../webapi/exceptions/unauthorizedException.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'

export default class LoginUserHandler {
  #userRepository
  #jwtService
  #passwordHasherService
  #redisService

  constructor({ userRepository, jwtService, passwordHasherService, redisService }) {
    this.#userRepository = userRepository
    this.#jwtService = jwtService
    this.#passwordHasherService = passwordHasherService
    this.#redisService = redisService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)
    const unauthorizedExceptionMessage = 'E-mail ou senha inválidos.'

    if (user === null) {
      throw new UnauthorizedException(unauthorizedExceptionMessage)
    }

    const isWrongPassword = !await this.#passwordHasherService.compare(command.getPassword(), user.getPasswordHash())

    if (isWrongPassword) {
      throw new UnauthorizedException(unauthorizedExceptionMessage)
    }

    if (!user.isVerified()) {
      throw new BadRequestException('Esse usuário ainda não teve seu email confirmado.')
    }

    const userId = user.getId()
    const accessToken = this.#jwtService.generateAccessToken(new JwtPayload({
      id: userId,
      name: user.getName(),
      email: user.getEmail(),
      roles: user.getRoles()
    }))

    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    const refreshToken = this.#jwtService.generateRefreshToken(new JwtPayload({ id: userId }))
    await this.#redisService.setData(key, refreshToken, { expiration: 604800 })

    return new LoginUserResponse(accessToken, refreshToken)
  }
}