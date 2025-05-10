import { validationResult } from 'express-validator'
import BadRequestException from '../exceptions/badRequestException.js'

export default (Request, validator) => async (req, res, next) => {
  try {
    await Promise.all(validator.map(validation => validation.run(req)))
    const result = validationResult(req)

    if (!result.isEmpty()) {
      const formattedDetails = result.array().reduce((acc, curr) => {
        acc[curr.path] = curr.msg
        return acc
      }, {})

      return next(new BadRequestException('Erro de validação.', { details: formattedDetails }))
    }

    req.command = new Request(req.body)
    next()

  } catch (error) {

    next(error)
  }
}