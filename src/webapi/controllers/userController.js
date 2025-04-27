import express from 'express'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

const router = express.Router()

// router.get('/',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.get('/search',
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

// router.put('/:id/anonymize',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.post('/:id/roles',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.get('/:id/roles',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.put('/:id/roles/:roleId',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.put('/me',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.delete('/me',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

// router.put('/me/anonymize',
//     validatorMiddleware(RegisterUserCommand, registerUserValidator),
//     async (req, res, next) => {
//         const response = await registerUserHandler(req.command)
//         res.status(201).send(response)
//     }
// )

export default router