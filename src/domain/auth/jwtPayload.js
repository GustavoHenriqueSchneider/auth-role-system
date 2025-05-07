export default class JwtPayload {
  #userId
  #name
  #email
  #roles

  constructor({
    id, name, email, roles
  }) {
    this.userId = id
    this.name = name
    this.email = email
    this.roles = roles
  }
}