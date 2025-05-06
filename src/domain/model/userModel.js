export default class UserModel {
  #id
  #name
  #email
  #password_hash
  #is_verified
  #created_at
  #updated_at

  constructor({ id, name, email, password_hash, is_verified = false, created_at, updated_at }) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#password_hash = password_hash
    this.#is_verified = is_verified ?? false
    this.#created_at = created_at
    this.#updated_at = updated_at
  }

  verifyEmail = () => {
    this.#is_verified = true
  }

  toDatabaseObject = () => ({
    name: this.#name,
    email: this.#email,
    password_hash: this.#password_hash,
    is_verified: this.#is_verified
  })
}
