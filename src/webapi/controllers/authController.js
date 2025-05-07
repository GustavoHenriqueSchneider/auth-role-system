import express from 'express'

import Roles from '../../domain/auth/roles.js'
import Steps from '../../domain/auth/steps.js'
import TokenTypes from '../../domain/auth/tokenTypes.js'

import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import ConfirmUserEmailCommand from '../../application/usecases/auth/confirmUserEmail/confirmUserEmailCommand.js'
import confirmUserEmailValidator from '../../application/usecases/auth/confirmUserEmail/confirmUserEmailValidator.js'
import LoginUserCommand from '../../application/usecases/auth/loginUser/loginUserCommand.js'
import loginUserValidator from '../../application/usecases/auth/loginUser/loginUserValidator.js'
import LogoutUserCommand from '../../application/usecases/auth/logoutUser/logoutUserCommand.js'
import logoutUserValidator from '../../application/usecases/auth/logoutUser/logoutUserValidator.js'
import RefreshTokenCommand from '../../application/usecases/auth/refreshToken/refreshTokenCommand.js'
import refreshTokenValidator from '../../application/usecases/auth/refreshToken/refreshTokenValidator.js'
import RegisterUserCommand from '../../application/usecases/auth/registerUser/registerUserCommand.js'
import registerUserValidator from '../../application/usecases/auth/registerUser/registerUserValidator.js'
import ResendUserEmailConfirmationCommand from '../../application/usecases/auth/resendUserEmailConfirmation/resendUserEmailConfirmationCommand.js'
import resendUserEmailConfirmationValidator from '../../application/usecases/auth/resendUserEmailConfirmation/resendUserEmailConfirmationValidator.js'
import ResetUserPasswordCommand from '../../application/usecases/auth/resetUserPassword/resetUserPasswordCommand.js'
import resetUserPasswordValidator from '../../application/usecases/auth/resetUserPassword/resetUserPasswordValidator.js'
import SendUserPasswordResetEmailCommand from '../../application/usecases/auth/sendUserPasswordResetEmail/sendUserPasswordResetEmailCommand.js'
import sendUserPasswordResetEmailValidator from '../../application/usecases/auth/sendUserPasswordResetEmail/sendUserPasswordResetEmailValidator.js'

const router = express.Router()

router.post('/email/validate',
    authMiddleware({ step: Steps.EMAIL_VERIFICATION }),
    asyncHandlerMiddleware(async (req, res, next) => {
        req.body.email = req.user.email
        next()
    }),
    validatorMiddleware(ConfirmUserEmailCommand, confirmUserEmailValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        await req.container
            .resolve('confirmUserEmailHandler')
            .handle(req.command)

        res.status(200).send()
    })
)

router.post('/login',
    validatorMiddleware(LoginUserCommand, loginUserValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        const response = await req.container
            .resolve('loginUserHandler')
            .handle(req.command)

        res.status(200).json(response)
    })
)

router.post('/logout',
    authMiddleware({ role: Roles.USER }),
    asyncHandlerMiddleware(async (req, res, next) => {
        req.body.userId = req.user.userId
        next()
    }),
    validatorMiddleware(LogoutUserCommand, logoutUserValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        await req.container
            .resolve('logoutUserHandler')
            .handle(req.command)

        res.status(200).send()
    })
)

router.post('/refresh',
    validatorMiddleware(RefreshTokenCommand, refreshTokenValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        const response = await req.container
            .resolve('refreshTokenHandler')
            .handle(req.command)

        res.status(200).json(response)
    })
)

router.post('/register',
    validatorMiddleware(RegisterUserCommand, registerUserValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        const response = await req.container
            .resolve('registerUserHandler')
            .handle(req.command)

        res.status(201).json(response)
    })
)

router.post('/email/resend-confirmation',
    validatorMiddleware(ResendUserEmailConfirmationCommand, resendUserEmailConfirmationValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        const response = await req.container
            .resolve('resendUserEmailConfirmationHandler')
            .handle(req.command)

        res.status(200).json(response)
    })
)

router.post('/reset-password/confirm',
    authMiddleware({ step: Steps.RESET_PASSWORD_VERIFICATION }),
    asyncHandlerMiddleware(async (req, res, next) => {
        req.body.email = req.user.email
        next()
    }),
    validatorMiddleware(ResetUserPasswordCommand, resetUserPasswordValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        await req.container
            .resolve('resetUserPasswordHandler')
            .handle(req.command)

        res.status(200).send()
    })
)

router.post('/reset-password',
    validatorMiddleware(SendUserPasswordResetEmailCommand, sendUserPasswordResetEmailValidator),
    asyncHandlerMiddleware(async (req, res, next) => {
        const response = await req.container
            .resolve('sendUserPasswordResetEmailHandler')
            .handle(req.command)

        res.status(200).json(response)
    })
)

export default router