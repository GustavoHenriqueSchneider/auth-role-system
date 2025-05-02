import ConfirmUserEmailResponse from './confirmUserEmailResponse.js'

export default class ConfirmUserEmailHandler {
  constructor() {}

  handle = async command => {
    // TODO: verificar no redis se o code é valido pro email atual e fazer o cadastro do usuario no banco
    // senha aqui ja deve chegar criptografada pelo token

    return new ConfirmUserEmailResponse(123)
  }
}