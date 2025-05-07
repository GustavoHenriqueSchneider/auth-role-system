import jwt from 'jsonwebtoken'
import TokenTypes from '../../domain/auth/tokenTypes.js'

export default class JwtService {
  #secret

  constructor() {
    this.#secret = process.env.JWT_SECRET
  }

  generateAccessToken = (payload, { step } = {}) => {
    try {
      return jwt.sign({
        data: payload, tokenType: TokenTypes.ACCESS, step
      }, this.#secret, { expiresIn: '15m' })

    } catch (error) {

      console.error(`Erro ao gerar token JWT do tipo '${TokenTypes.ACCESS}'`)
      throw error
    }
  }

  generateRefreshToken = payload => {
    try {
      return jwt.sign({ data: payload, tokenType: TokenTypes.REFRESH }, this.#secret, { expiresIn: '7d' })

    } catch (error) {

      console.error(`Erro ao gerar token JWT do tipo '${TokenTypes.REFRESH}'`)
      throw error
    }
  }

  verifyToken = token => {
    try {
      return jwt.verify(token, this.#secret)

    } catch (error) {

      console.error('Erro ao validar token JWT')
      throw error
    }
  }
}
