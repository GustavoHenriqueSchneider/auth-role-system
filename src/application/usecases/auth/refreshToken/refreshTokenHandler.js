import JwtPayload from "../../../../domain/auth/jwtPayload.js"
import TokenTypes from "../../../../domain/auth/tokenTypes.js"
import RedisKeys from "../../../../domain/redisKeys.js"
import BadRequestException from "../../../../webapi/exceptions/badRequestException.js"
import ForbiddenException from "../../../../webapi/exceptions/forbiddenException.js"
import UnauthorizedException from "../../../../webapi/exceptions/unauthorizedException.js"
import RefreshTokenResponse from "./refreshTokenResponse.js"

export default class RefreshTokenHandler {
  #userRepository
  #jwtService
  #redisService

  constructor({ userRepository, jwtService, redisService }) {
    this.#userRepository = userRepository
    this.#jwtService = jwtService
    this.#redisService = redisService
  }

  handle = async command => {
    const refreshToken = command.getRefreshToken()
    let payload

    try {
      payload = this.#jwtService.verifyToken(refreshToken)

    } catch (error) {

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado.')
      }

      throw new UnauthorizedException('Erro ao validar o token.')
    }

    if (!TokenTypes.isValidTokenType(payload.tokenType)) {
      throw new BadRequestException(`O tipo de token '${payload.tokenType}' não é válido.`)
    }

    if (payload.tokenType !== TokenTypes.REFRESH) {
      throw new ForbiddenException(`O token informado não é do tipo necessário.`)
    }

    const userId = payload.data.userId
    const key = RedisKeys.formatKey(RedisKeys.USER_REFRESH_TOKEN, { userId })
    const cachedRefreshToken = await this.#redisService.getData(key)

    if (cachedRefreshToken === null || cachedRefreshToken !== refreshToken) {
      throw new BadRequestException('Refresh token incorreto/inválido.')
    }

    const user = await this.#userRepository.getUserById(userId)

    if (user === null) {
      throw new UnauthorizedException('Usuário não encontrado.')
    }

    if (!user.isVerified()) {
      throw new BadRequestException('Esse usuário ainda não teve seu email confirmado.')
    }

    const newAccessToken = this.#jwtService.generateAccessToken(new JwtPayload({
      id: userId,
      name: user.getName(),
      email: user.getEmail(),
      roles: user.getRoles()
    }))

    const newRefreshToken = this.#jwtService.generateRefreshToken(new JwtPayload({ id: userId }))
    await this.#redisService.setData(key, newRefreshToken, { expiration: 604800 })

    return new RefreshTokenResponse(newAccessToken, newRefreshToken)
  }
}