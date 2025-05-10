export default class GetUserByIdResponse {
  constructor(user) {
    this.name = user.getName()
    this.email = user.getEmail()
  }
}