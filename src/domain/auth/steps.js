export default class Steps {
  static EMAIL_VERIFICATION = 'email-verification'
  static RESET_PASSWORD_VERIFICATION = 'reset-password-verification'

  static isValidStep = step => Object.entries(Steps)
    .filter(([ key, value ]) => typeof value === 'string')
    .some(([ _, value ]) => value === step)
}