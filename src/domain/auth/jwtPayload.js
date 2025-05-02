export default class JwtPayload {
    constructor({ userId, name, email, password, roles }) {
        this.userId = userId
        this.name = name
        this.email = email
        this.password = password
        this.roles = roles
    }
}