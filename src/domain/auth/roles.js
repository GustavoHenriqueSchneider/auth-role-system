export default class Roles {
  static ADMIN = 'admin'
  static USER = 'user'

  static isValidRole = role => Object.entries(Roles)
    .filter(([key, value]) => typeof value === 'string')
    .some(([_, value]) => value === role)
}