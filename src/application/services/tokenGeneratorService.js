import crypto from 'crypto'

export default class TokenGeneratorService {
  static generateToken = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''

    const bytes = crypto.randomBytes(length)
    for (let i = 0; i < length; i++) {
      result += chars[bytes[i] % chars.length]
    }

    return result
  }
}