import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import LoginUserResponse from './loginUserResponse.js'
import UnauthorizedException from '../../../exceptions/unauthorizedException.js'
import BadRequestException from '../../../exceptions/badRequestException.js'

export default class LoginUserHandler {
  #userRepository
  #cacheService
  #jwtService
  #loggerService
  #passwordHasherService

  constructor({
    userRepository, cacheService, jwtService, loggerService, passwordHasherService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#jwtService = jwtService
    this.#loggerService = loggerService
    this.#passwordHasherService = passwordHasherService
  }

  handle = async command => {
    const email = command.getEmail()
    const user = await this.#userRepository.getUserByEmail(email)
    const unauthorizedExceptionMessage = 'Email ou senha inválidos.'

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new UnauthorizedException(unauthorizedExceptionMessage)
    }

    const isWrongPassword = !await this.#passwordHasherService.compare(command.getPassword(), user.getPasswordHash())

    if (isWrongPassword) {
      await this.#loggerService.logError('Tentativa inválida de login.')
      throw new UnauthorizedException(unauthorizedExceptionMessage)
    }

    if (!user.isVerified()) {
      await this.#loggerService.logError('Tentativa inválida de login para usuário com email não confirmado.')
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

    await this.#loggerService.log('Login realizado.')
    return new LoginUserResponse(accessToken, refreshToken)
  }
}