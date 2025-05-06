import Roles from '../../domain/auth/roles.js'
import Steps from '../../domain/auth/steps.js'
import BadRequestException from '../exceptions/badRequestException.js'
import ForbiddenException from '../exceptions/forbiddenException.js'
import UnauthorizedException from '../exceptions/unauthorizedException.js'

export default ({ tokenType = 'access', step, role }) => async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return next(new UnauthorizedException('Token não fornecido.'))
        }

        const payload = req.container
            .resolve('jwtService')
            .verifyToken(token)

        if (tokenType && payload.tokenType !== tokenType) {
            return next(new ForbiddenException(`Tipo de token inválido.`))
        }

        if (step) {

            if (!Steps.isValidStep(payload.step)) {
                return next(new BadRequestException(`O passo '${payload.step}' não é válido.`))
            }

            if (payload.step !== step) {
                return next(new ForbiddenException(`Token inválido para o passo '${step}'.`))
            }
        }

        if (role) {

            const invalid_roles = payload.roles.filter(role => !Roles.isValidRole(role))

            if (invalid_roles) {
                return next(new BadRequestException(`Os cargos '${invalid_roles.join("', '")}' são inválidos.`))
            }

            if (!payload.roles.includes(role)) {
                return next(new ForbiddenException(`O usuário atual não possui o cargo '${role}' necessário.`))
            }
        }

        req.user = payload.data
        next()

    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            next(new UnauthorizedException('Token expirado.'))
        }

        next(new UnauthorizedException('Erro ao validar o token.'))
    }
}