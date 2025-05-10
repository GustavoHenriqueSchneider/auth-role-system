export default class GetUserByIdResponse {
  constructor(user) {
    this.name = user.getName()
    this.email = user.getEmail()
    this.isVerified = user.isVerified()
    this.createdAt = user.getCreatedAt()
    this.updatedAt = user.getUpdatedAt()
  }
}