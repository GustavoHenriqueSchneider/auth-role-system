export default class TokenTypes {
  static ACCESS = 'access'
  static REFRESH = 'refresh'

  static isValidTokenType = tokenType => Object.entries(TokenTypes)
    .filter(([ key, value ]) => typeof value === 'string')
    .some(([ _, value ]) => value === tokenType)
}