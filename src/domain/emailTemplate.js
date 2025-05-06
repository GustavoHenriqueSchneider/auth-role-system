export default class EmailTemplate {
  static EMAIL_VERIFICATION = 'email-verification'
  static PASSWORD_RESET = 'password-reset'
  static WELCOME = 'welcome'

  static #templates = {
    'email-verification': ({code}) => ({
      subject: 'Confirmação de E-mail',
      html: `
          <h1>Bem-vindo!</h1>
          <p>Use o código abaixo para confirmar seu e-mail:</p>
          <h2>${code}</h2>
          <p>Se você não solicitou isso, ignore este e-mail.</p>
        `
    }),
    'password-reset': ({token}) => ({
      subject: 'Redefinição de Senha',
      html: `
          <p>Recebemos uma solicitação para redefinir sua senha.</p>
          <p>Use o token abaixo para continuar:</p>
          <h2>${token}</h2>
        `
    }),
    'welcome': ({name}) => ({
      subject: 'Conta criada com sucesso!',
      html: `<p>Olá ${name}, sua conta foi criada com sucesso. Bem-vindo(a)!</p>`
    })
  }

  static isValidTemplate = templateType => this.#templates[templateType] !== undefined

  static getTemplate = templateType => this.isValidTemplate(templateType) ? this.#templates[templateType] : null
}