import { validationResult } from 'express-validator'
import BadRequestException from '../exceptions/badRequestException.js'

export default (Request, validator) => async (req, res, next) => {
  try {
    await Promise.all(validator.map(validation => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
      return next(new BadRequestException('Erro de validação.', { details: result.array() }))
    }

    req.command = new Request(req.body)
    next()

  } catch (error) {

    next(error)
  }
}