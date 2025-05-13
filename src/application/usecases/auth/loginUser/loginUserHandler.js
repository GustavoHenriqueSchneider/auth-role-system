import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import LoginUserResponse from './loginUserResponse.js'
import UnauthorizedException from '../../../../webapi/exceptions/unauthorizedException.js'
import BadRequestException from '../../../../webapi/exceptions/badRequestException.js'

export default class LoginUserHandler {
  #userRepository
  #jwtService
  #passwordHasherService
  #cacheService

  constructor({
    userRepository, jwtService, passwordHasherService, cacheService
  }) {
    this.#userRepository = userRepository
    this.#jwtService = jwtService
    this.#passwordHasherService = passwordHasherService
    this.#cacheService = cacheService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)
    const unauthorizedExceptionMessage = 'Email ou senha inválidos.'

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
    const accessToken = await this.#jwtService.generateAccessToken(new JwtPayload({
      id: userId,
      name: user.getName(),
      email: user.getEmail(),
      roles: user.getRoles()
    }))

    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    const refreshToken = await this.#jwtService.generateRefreshToken(new JwtPayload({ id: userId }))
    await this.#cacheService.setData(key, refreshToken, { expiration: 604800 })

    return new LoginUserResponse(accessToken, refreshToken)
  }
}