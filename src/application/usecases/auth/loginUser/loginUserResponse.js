export default class LoginUserResponse {
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
    }
}