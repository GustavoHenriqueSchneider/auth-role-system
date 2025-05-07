export default class RefreshTokenResponse {
  constructor(accessToken, refreshToken) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}