import express from 'express'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import RegisterUserCommand from '../../usecases/auth/registerUser/registerUserCommand.js'
import registerUserHandler from '../../usecases/auth/registerUser/registerUserHandler.js'
import registerUserValidator from '../../usecases/auth/registerUser/registerUserValidator.js'

const router = express.Router()

router.post('/register',
    validatorMiddleware(RegisterUserCommand, registerUserValidator),
    async (req, res, next) => {
        const response = await registerUserHandler(req.command)
        res.status(201).send(response)
    }
)

// router.post('/email/validate',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

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