import express from 'express'
import Steps from '../../domain/auth/steps.js'

import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import RegisterUserCommand from '../../application/usecases/auth/registerUser/registerUserCommand.js'
import registerUserValidator from '../../application/usecases/auth/registerUser/registerUserValidator.js'
import ConfirmUserEmailCommand from '../../application/usecases/auth/confirmUserEmail/confirmUserEmailCommand.js'
import confirmUserEmailValidator from '../../application/usecases/auth/confirmUserEmail/confirmUserEmailValidator.js'

const router = express.Router()

router.post('/register',
    validatorMiddleware(RegisterUserCommand, registerUserValidator),
    asyncHandlerMiddleware(async (req, res, next) => {

        const response = await req.container
            .resolve('registerUserHandler')
            .handle(req.command)

        return res.status(200).send(response)
    })
)

router.post('/email/validate',
    authMiddleware({ step: Steps.EMAIL_VERIFICATION }),
    validatorMiddleware(ConfirmUserEmailCommand, confirmUserEmailValidator),
    async (req, res, next) => {

        req.command = new ConfirmUserEmailCommand({
            ...req.command,
            ...req.user
        })
        
        const response = await req.container
            .resolve('confirmUserEmailHandler')
            .handle(req.command)

        return res.status(201).send(response)
    }
)

// router.post('/login',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.post('/reset-password',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.post('/reset-password/confirm',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

export default router