import HttpException from './httpException.js'

export default class BadRequestException extends HttpException {
  constructor(message = 'Bad Request', details) {

    if (typeof details === 'object' && JSON.stringify(details) !== '{}') {
      return super(400, message, details)
    }

    super(400, message)
  }
}