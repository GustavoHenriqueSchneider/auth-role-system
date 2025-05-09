export default class EmailTemplate {
  static EMAIL_VERIFICATION = 'email-verification'
  static PASSWORD_RESET = 'password-reset'

  static #templates = {
    'email-verification': ({ code }) => ({
      subject: 'Confirmação de Email',
      html: `
          <h1>Bem-vindo!</h1>
          <p>Use o código abaixo para confirmar seu email:</p>
          <h2>${code}</h2>
          <p>Se você não solicitou isso, ignore este email.</p>
        `
    }),
    'password-reset': ({ code }) => ({
      subject: 'Redefinição de Senha',
      html: `
          <p>Recebemos uma solicitação para redefinir sua senha.</p>
          <p>Use o código abaixo para confirmar:</p>
          <h2>${code}</h2>
          <p>Se você não solicitou isso, ignore este email.</p>
        `
    })
  }

  static isValidTemplate = templateType => this.#templates[templateType] !== undefined
  static getTemplate = templateType => this.isValidTemplate(templateType) ? this.#templates[templateType] : null
}