import jwt from 'jsonwebtoken'

export default class JwtService {
    #secret

    constructor() {
        this.#secret = process.env.JWT_SECRET
    }

    generateAccessToken = (payload, { step } = {}) =>
        jwt.sign({ data: payload, tokenType: 'access', step }, this.#secret, { expiresIn: '15m' })

    generateRefreshToken = payload =>
        jwt.sign({ data: payload, tokenType: 'refresh' }, this.#secret, { expiresIn: '7d' })

    verifyToken = token => jwt.verify(token, this.#secret)
}
