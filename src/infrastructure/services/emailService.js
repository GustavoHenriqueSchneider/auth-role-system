import EmailTemplate from '../../domain/emailTemplate.js'

export default class EmailService {
  #smtpClient
  #loggerService

  constructor({ smtpClient, loggerService }) {
    this.#smtpClient = smtpClient
    this.#loggerService = loggerService
  }

  sendEmail = async (emailAddress, templateType, params = {}) => {
    try {
      if (!EmailTemplate.isValidTemplate(templateType)) {
        throw new Error(`Template de email desconhecido: ${templateType}`)
      }

      await this.#smtpClient.sendMail({
        from: `"Auth System" <${process.env.EMAIL_ADDRESS}>`,
        to: emailAddress,
        ...EmailTemplate.getTemplate(templateType)(params)
      })
    } catch (error) {

      await this.#loggerService.logError(`Erro ao enviar o email do tipo ${templateType}`)
      throw error
    }
  }
}