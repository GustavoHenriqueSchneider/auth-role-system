export default class JwtPayload {
    #userId
    #name
    #email
    #roles

    constructor({ userId, name, email, roles }) {
        this.userId = userId
        this.name = name
        this.email = email
        this.roles = roles
    }
}