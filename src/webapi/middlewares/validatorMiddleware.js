import { validationResult } from 'express-validator'

export default (Request, validator) => async (req, res, next) => {
    try {
        await Promise.all(validator.map(validation => validation.run(req)))
        const result = validationResult(req)

        if (!result.isEmpty()) {
            const error = new Error('Erro de validação')
            error.statusCode = 400
            error.details = result.array()
            return next(error)
        }

        req.command = new Request(req.body)
        next()

    } catch (error) {

        next(error)
    }
}