import crypto from 'crypto'

export default class TokenGeneratorService {
  static generateToken = (length = 32) => crypto.randomBytes(length).toString('hex')
}