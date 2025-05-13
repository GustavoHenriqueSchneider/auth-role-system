import jwt from 'jsonwebtoken'
import TokenTypes from '../../domain/auth/tokenTypes.js'

export default class JwtService {
  #secret
  #loggerService

  constructor({ loggerService }) {
    this.#secret = process.env.JWT_SECRET
    this.#loggerService = loggerService
  }

  generateAccessToken = async (payload, { step } = {}) => {
    try {
      return jwt.sign({
        data: payload, tokenType: TokenTypes.ACCESS, step
      }, this.#secret, { expiresIn: '15m' })

    } catch (error) {

      await this.#loggerService.logError(`Erro ao gerar token JWT do tipo '${TokenTypes.ACCESS}'`)
      throw error
    }
  }

  generateRefreshToken = async payload => {
    try {
      return jwt.sign({ data: payload, tokenType: TokenTypes.REFRESH }, this.#secret, { expiresIn: '7d' })

    } catch (error) {

      await this.#loggerService.logError(`Erro ao gerar token JWT do tipo '${TokenTypes.REFRESH}'`)
      throw error
    }
  }

  verifyToken = async token => {
    try {
      return jwt.verify(token, this.#secret)

    } catch (error) {

      await this.#loggerService.logError('Erro ao validar token JWT')
      throw error
    }
  }
}