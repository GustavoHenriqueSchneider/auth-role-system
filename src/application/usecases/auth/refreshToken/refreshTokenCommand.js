export default class RefreshTokenCommand {
  #refreshToken

  constructor({ refreshToken }) {
    this.#refreshToken = refreshToken
  }

  getRefreshToken = () => this.#refreshToken
}