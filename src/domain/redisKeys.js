export default class RedisKeys {
    static EMAIL_VERIFICATION_CODE = 'register:email_verification_code:{email}'
    static RESET_PASSWORD_EMAIL_CODE = 'reset-password:email_code:{email}'

    static formatKey = (template, params) => template.replace(/{(.*?)}/g, (_, key) => params[key])
}