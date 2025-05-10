export default class GetRoleByIdResponse {
  constructor(role) {
    this.name = role.getName()
  }
}