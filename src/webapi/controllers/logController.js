/* eslint-disable function-call-argument-newline */
import express from 'express'

const router = express.Router()

// router.get('/',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

export default router