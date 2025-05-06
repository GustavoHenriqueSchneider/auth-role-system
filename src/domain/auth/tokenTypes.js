export default class TokenTypes {
    static ACCESS = 'access'
    static REFRESH = 'refresh'
  
    static isValidTokenType = tokenType => Object.values(TokenTypes).includes(tokenType)
  }