import HttpException from './httpException.js'

export default class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(404, message)
  }
}