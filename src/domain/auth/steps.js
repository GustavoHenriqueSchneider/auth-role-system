export default class Steps {
  static EMAIL_VERIFICATION = 'email-verification'
  static RESET_PASSWORD_VERIFICATION = 'reset-password-verification'

  static isValidStep = step => Object.values(Steps).includes(step)
}