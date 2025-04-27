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

export default router