import HttpException from "./httpException.js";

export default class AlreadyExistsException extends HttpException {
    constructor(message = 'Conflict') {
        super(409, message)
    }
}