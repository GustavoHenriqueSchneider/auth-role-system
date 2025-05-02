import Steps from '../../domain/auth/steps.js'

export default ({ tokenType = 'access', step }) => async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            const error = new Error('Token não fornecido')
            error.statusCode = 401
            return next(error)
        }

        const payload = req.container
            .resolve('jwtService')
            .verifyToken(token)

        if (tokenType && payload.tokenType !== tokenType) {
            const error = new Error(`Tipo de token inválido`)
            error.statusCode = 403
            return next(error)
        }

        if (step) {

            if (!Steps.isStep(payload.step)) {
                const error = new Error(`O passo '${payload.step}' não é válido`)
                error.statusCode = 403
                return next(error)
            }

            if (payload.step !== step) {
                const error = new Error(`Token inválido para o passo '${step}'`)
                error.statusCode = 403
                return next(error)
            }
        }

        req.body = {
            ...req.body,
            ...payload.data
        }

        next()

    } catch (error) {

        const err = new Error('Erro ao validar token')
        err.statusCode = err.statusCode || 401
        next(err)
    }
}