export default class UserModel {
  #id
  #name
  #email
  #passwordHash
  #isVerified
  #createdAt
  #updatedAt

  constructor({ id, name, email, password_hash, is_verified, created_at, updated_at }) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#passwordHash = password_hash
    this.#isVerified = is_verified ?? false
    this.#createdAt = created_at ?? new Date()
    this.#updatedAt = updated_at
  }

  getId = () => this.#id
  getName = () => this.#name
  getEmail = () => this.#email
  getPasswordHash = () => this.#passwordHash

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