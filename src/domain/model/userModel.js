import Roles from '../auth/roles.js'
import RoleModel from './roleModel.js'

export default class UserModel {
  #id
  #name
  #email
  #passwordHash
  #isVerified
  #roles
  #createdAt
  #updatedAt

  constructor({
    id, name, email, password_hash, is_verified, roles, created_at, updated_at
  }) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#passwordHash = password_hash
    this.#isVerified = is_verified ?? false

    const normalizedRoles = [
      new RoleModel({ name: Roles.USER }),
      ...(roles ?? [])
    ]

    this.#roles = Array.from(new Map(normalizedRoles.map(role => {
      const instance = role instanceof RoleModel ? role : new RoleModel({ name: role })
      return [ instance.getName(), instance ]
    })).values())

    this.#createdAt = created_at ?? new Date()
    this.#updatedAt = updated_at
  }

  getId = () => this.#id
  getName = () => this.#name
  getEmail = () => this.#email
  getPasswordHash = () => this.#passwordHash
  getRoles = () => Object.freeze(this.#roles.map(role => role.getName()))

  setPasswordHash = passwordHash => this.#passwordHash = passwordHash

  hasRole = role => this.#roles.some(r => r.getName() === role)
  isVerified = () => this.#isVerified
  verify = () => this.#isVerified = true

  toDatabaseObject = () => ({
    name: this.#name,
    email: this.#email,
    password_hash: this.#passwordHash,
    is_verified: this.#isVerified,
    created_at: this.#createdAt,
    updated_at: this.#updatedAt
  })
}