export default class Roles {
  static ADMIN = 'admin'
  static USER = 'user'

  static isValidRole = role => Object.values(Roles).includes(role)
}