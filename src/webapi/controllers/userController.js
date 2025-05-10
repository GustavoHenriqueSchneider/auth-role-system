/* eslint-disable function-call-argument-newline */
import express from 'express'

import Roles from '../../domain/auth/roles.js'

import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import UpdateUserByIdCommand from '../../application/usecases/user/updateUserById/updateUserByIdCommand.js'
import UpdateUserByIdValidator from '../../application/usecases/user/updateUserById/updateUserByIdValidator.js'

import GetUserByIdQuery from '../../application/usecases/user/getUserById/getUserByIdQuery.js'
import GetUserByIdValidator from '../../application/usecases/user/getUserById/getUserByIdValidator.js'

const router = express.Router()

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retorna os dados de um usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser consultado
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isVerified:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */
router.get('/:userId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    next()
  }),
  validatorMiddleware(GetUserByIdQuery, GetUserByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    const response = await req.container
      .resolve('getUserByIdHandler')
      .handle(req.command)

    res.status(200).json(response)
  }))

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Atualiza os dados de um usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       204:
 *         description: Usuário atualizado com sucesso
 */
router.put('/:userId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    next()
  }),
  validatorMiddleware(UpdateUserByIdCommand, UpdateUserByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('updateUserByIdHandler')
      .handle(req.command)

    res.status(204).send()
  }))

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