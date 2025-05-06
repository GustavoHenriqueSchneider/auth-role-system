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
import RegisterUserCommand from '../../application/usecases/auth/registerUser/registerUserCommand.js'
import registerUserValidator from '../../application/usecases/auth/registerUser/registerUserValidator.js'
import ResendUserEmailConfirmationCommand from '../../application/usecases/auth/resendUserEmailConfirmation/resendUserEmailConfirmationCommand.js'
import resendUserEmailConfirmationValidator from '../../application/usecases/auth/resendUserEmailConfirmation/resendUserEmailConfirmationValidator.js'

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

// router.post('/logout',
//     authMiddleware({ role: Roles.USER }),
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(200).send()
//     })
// )

// router.post('/refresh',
//     authMiddleware({ tokenType: TokenTypes.REFRESH }),
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(200).send()
//     })
// )

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

// router.post('/reset-password/confirm',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(200).json(response)
//     })
// )

// router.post('/reset-password',
//     authMiddleware({ step: Steps.RESET_PASSWORD_VERIFICATION }),
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(200).send()
//     })
// )

export default router