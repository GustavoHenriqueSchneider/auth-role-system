import Roles from '../../domain/auth/roles.js'
import Steps from '../../domain/auth/steps.js'

export default ({ tokenType = 'access', step, role }) => async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            const error = new Error('Token não fornecido.')
            error.statusCode = 401
            return next(error)
        }

        const payload = req.container
            .resolve('jwtService')
            .verifyToken(token)

        if (tokenType && payload.tokenType !== tokenType) {
            const error = new Error(`Tipo de token inválido.`)
            error.statusCode = 403
            return next(error)
        }

        if (step) {

            if (!Steps.isValidStep(payload.step)) {
                const error = new Error(`O passo '${payload.step}' não é válido.`)
                error.statusCode = 403
                return next(error)
            }

            if (payload.step !== step) {
                const error = new Error(`Token inválido para o passo '${step}'.`)
                error.statusCode = 403
                return next(error)
            }
        }

        if (role) {

            const invalid_roles = payload.roles.filter(role => !Roles.isValidRole(role))

            if (invalid_roles) {
                const error = new Error(`Os cargos '${invalid_roles.join("', '")}' são inválidos.`)
                error.statusCode = 403
                return next(error)
            }

            if (!payload.roles.includes(role)) {
                const error = new Error(`O usuário atual não possui o cargo '${role}' necessário.`)
                error.statusCode = 403
                return next(error)
            }
        }

        req.user = payload.data
        next()

    } catch (error) {

        const err = new Error('Erro ao validar o token.')
        err.statusCode = err.statusCode || 401
        next(err)
    }
}