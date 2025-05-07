import HttpException from './httpException.js'

export default class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message)
  }
}