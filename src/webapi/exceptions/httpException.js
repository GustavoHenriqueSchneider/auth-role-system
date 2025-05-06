export default class HttpException extends Error {
    constructor(statusCode = 500, message, details) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
        this.details = details
        Error.captureStackTrace(this, this.constructor)
    }
}