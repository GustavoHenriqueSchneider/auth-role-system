import Roles from '../../domain/auth/roles.js'
import Steps from '../../domain/auth/steps.js'
import TokenTypes from '../../domain/auth/tokenTypes.js'

import BadRequestException from '../exceptions/badRequestException.js'
import ForbiddenException from '../exceptions/forbiddenException.js'
import UnauthorizedException from '../exceptions/unauthorizedException.js'

export default ({ tokenType = TokenTypes.ACCESS, step, role }) => async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader?.split(' ')[1]

        if (!token) {
            return next(new UnauthorizedException('Token não fornecido.'))
        }

        const payload = req.container
            .resolve('jwtService')
            .verifyToken(token)

        if (!TokenTypes.isValidTokenType(payload.tokenType)) {
            return next(new BadRequestException(`O tipo de token '${payload.tokenType}' não é válido.`))
        }

        if (payload.tokenType !== tokenType) {
            return next(new ForbiddenException(`O token informado não é do tipo necessário.`))
        }

        if (step) {

            if (!Steps.isValidStep(payload.step)) {
                return next(new BadRequestException(`O step '${payload.step}' não é válido.`))
            }

            if (payload.step !== step) {
                return next(new ForbiddenException(`O token informado não contém o step necessário.`))
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