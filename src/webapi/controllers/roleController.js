import express from 'express'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

const router = express.Router()

// router.post('/',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.get('/',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.put('/:id',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.delete('/:id',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

export default router