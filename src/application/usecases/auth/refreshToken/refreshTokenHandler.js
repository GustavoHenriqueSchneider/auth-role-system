import JwtPayload from '../../../../domain/auth/jwtPayload.js'
import TokenTypes from '../../../../domain/auth/tokenTypes.js'
import RedisKeys from '../../../../domain/redisKeys.js'
import BadRequestException from '../../../exceptions/badRequestException.js'
import ForbiddenException from '../../../exceptions/forbiddenException.js'
import UnauthorizedException from '../../../exceptions/unauthorizedException.js'
import RefreshTokenResponse from './refreshTokenResponse.js'

export default class RefreshTokenHandler {
  #userRepository
  #cacheService
  #jwtService
  #loggerService

  constructor({
    userRepository, cacheService, jwtService, loggerService
  }) {
    this.#userRepository = userRepository
    this.#cacheService = cacheService
    this.#jwtService = jwtService
    this.#loggerService = loggerService
  }

  handle = async command => {
    const refreshToken = command.getRefreshToken()
    let payload

    try {
      payload = await this.#jwtService.verifyToken(refreshToken)

    } catch (error) {

      if (error.name === 'TokenExpiredError') {
        await this.#loggerService.logError('Tentativa inválida de gerar um refresh token utilizando token expirado.')
        throw new UnauthorizedException('Token expirado.')
      }

      await this.#loggerService.logError('Tentativa inválida de gerar um refresh token com token invalido.')
      throw new UnauthorizedException('Erro ao validar o token.')
    }

    if (!TokenTypes.isValidTokenType(payload.tokenType)) {
      await this.#loggerService.logError('Tentativa inválida de gerar um refresh token com token de tipo inválido.')
      throw new BadRequestException(`O tipo de token '${payload.tokenType}' não é válido.`)
    }

    if (payload.tokenType !== TokenTypes.REFRESH) {
      await this.#loggerService.logError('Tentativa inválida de gerar um refresh token com token de tipo incorreto.')
      throw new ForbiddenException('O token informado não é do tipo necessário.')
    }

    const userId = payload.data.userId
    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    const cachedRefreshToken = await this.#cacheService.getData(key)

    if (cachedRefreshToken === null || cachedRefreshToken !== refreshToken) {
      await this.#loggerService.logError('Tentativa inválida de realizar refresh do token.')
      throw new BadRequestException('Refresh token incorreto/inválido.')
    }

    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      await this.#loggerService.logError('Usuário não encontrado.')
      throw new UnauthorizedException('Usuário não encontrado.')
    }

    if (!user.isVerified()) {
      await this.#loggerService.logError('Tentativa inválida de realizar refresh do token para usuário com email não confirmado.')
      throw new BadRequestException('Esse usuário ainda não teve seu email confirmado.')
    }

    const newAccessToken = await this.#jwtService.generateAccessToken(new JwtPayload({
      id: userId,
      name: user.getName(),
      email: user.getEmail(),
      roles: user.getRoles()
    }))

    const newRefreshToken = await this.#jwtService.generateRefreshToken(new JwtPayload({ id: userId }))
    await this.#cacheService.setData(key, newRefreshToken, { expiration: 604800 })

    await this.#loggerService.log('Refresh token gerado.')
    return new RefreshTokenResponse(newAccessToken, newRefreshToken)
  }
}