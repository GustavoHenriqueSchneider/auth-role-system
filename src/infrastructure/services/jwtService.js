import jwt from 'jsonwebtoken'

export default class JwtService {
    constructor() {
        this._secret = process.env.JWT_SECRET
    }

    generateAccessToken = (payload, step) =>
        jwt.sign({ data: payload, tokenType: 'access', step }, this._secret, { expiresIn: '15m' })

    generateRefreshToken = payload =>
        jwt.sign({ data: payload, tokenType: 'refresh' }, this._secret, { expiresIn: '7d' })

    verifyToken = token => jwt.verify(token, this._secret)
}
