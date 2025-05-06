export default class JwtPayload {
    constructor({ userId, name, email, roles }) {
        this.userId = userId
        this.name = name
        this.email = email
        this.roles = roles
    }
}