/* eslint-disable function-call-argument-newline */
import express from 'express'

const router = express.Router()

//gu - acesso admin
// router.get('/:userId',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.put('/:userId',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.delete('/:userId',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.put('/:userId/anonymize',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.post('/:userId/roles',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

//nathan - acesso admin
// router.get('/:userId/roles',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.put('/:userId/roles/:roleId',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.get('/me',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.put('/me',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.delete('/me',
//     validatorMiddleware(Command, Validator),
//     asyncHandlerMiddleware(async (req, res, next) => {
//         const response = await req.container
//         await req.container
//             .resolve('Handler')
//             .handle(req.command)

//         res.status(*).json(response)
//         res.status(*).send()
//     }))

// router.put('/me/anonymize',
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