/* eslint-disable function-call-argument-newline */
import express from 'express'

import Roles from '../../domain/auth/roles.js'

import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import AnonymizeActualUserCommand from '../../application/usecases/user/anonymizeActualUser/anonymizeActualUserCommand.js'
import AnonymizeActualUserValidator from '../../application/usecases/user/anonymizeActualUser/anonymizeActualUserValidator.js'
import AnonymizeUserByIdCommand from '../../application/usecases/user/anonymizeUserById/anonymizeUserByIdCommand.js'
import AnonymizeUserByIdValidator from '../../application/usecases/user/anonymizeUserById/anonymizeUserByIdValidator.js'
import DeleteActualUserCommand from '../../application/usecases/user/deleteActualUser/deleteActualUserCommand.js'
import DeleteActualUserValidator from '../../application/usecases/user/deleteActualUser/deleteActualUserValidator.js'
import DeleteUserByIdCommand from '../../application/usecases/user/deleteUserById/deleteUserByIdCommand.js'
import DeleteUserByIdValidator from '../../application/usecases/user/deleteUserById/deleteUserByIdValidator.js'
import GetActualUserQuery from '../../application/usecases/user/getActualUser/getActualUserQuery.js'
import GetActualUserValidator from '../../application/usecases/user/getActualUser/getActualUserValidator.js'
import GetAllUserRolesByIdQuery from '../../application/usecases/user/getAllUserRolesById/getAllUserRolesByIdQuery.js'
import GetAllUserRolesByIdValidator from '../../application/usecases/user/getAllUserRolesById/getAllUserRolesByIdValidator.js'
import GetUserByIdQuery from '../../application/usecases/user/getUserById/getUserByIdQuery.js'
import GetUserByIdValidator from '../../application/usecases/user/getUserById/getUserByIdValidator.js'
import JoinRoleToUserCommand from '../../application/usecases/user/joinRoleToUser/joinRoleToUserCommand.js'
import JoinRoleToUserValidator from '../../application/usecases/user/joinRoleToUser/joinRoleToUserValidator.js'
import RemoveRoleFromUserCommand from '../../application/usecases/user/removeRoleFromUser/removeRoleFromUserCommand.js'
import RemoveRoleFromUserValidator from '../../application/usecases/user/removeRoleFromUser/removeRoleFromUserValidator.js'
import UpdateActualUserCommand from '../../application/usecases/user/updateActualUser/updateActualUserCommand.js'
import UpdateActualUserValidator from '../../application/usecases/user/updateActualUser/updateActualUserValidator.js'
import UpdateUserByIdCommand from '../../application/usecases/user/updateUserById/updateUserByIdCommand.js'
import UpdateUserByIdValidator from '../../application/usecases/user/updateUserById/updateUserByIdValidator.js'

const router = express.Router()

/**
 * @swagger
 * /users/me/anonymize:
 *   patch:
 *     summary: Anonimiza os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Dados do usuário anonimizado com sucesso
 */
router.patch('/me/anonymize',
  authMiddleware({ role: Roles.USER }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.user.userId
    next()
  }),
  validatorMiddleware(AnonymizeActualUserCommand, AnonymizeActualUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('anonymizeActualUserHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/{userId}/anonymize:
 *   patch:
 *     summary: Anonimiza os dados de um usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser anonimizado
 *     responses:
 *       204:
 *         description: Dados do usuário anonimizado com sucesso
 */
router.patch('/:userId/anonymize',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    next()
  }),
  validatorMiddleware(AnonymizeUserByIdCommand, AnonymizeUserByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('anonymizeUserByIdHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Exclui a conta do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Conta excluída com sucesso
 */
router.delete('/me',
  authMiddleware({ role: Roles.USER }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.user.userId
    next()
  }),
  validatorMiddleware(DeleteActualUserCommand, DeleteActualUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('deleteActualUserHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Exclui um usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser excluído
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 */
router.delete('/:userId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    next()
  }),
  validatorMiddleware(DeleteUserByIdCommand, DeleteUserByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('deleteUserByIdHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 */
router.get('/me',
  authMiddleware({ role: Roles.USER }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.user.userId
    next()
  }),
  validatorMiddleware(GetActualUserQuery, GetActualUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    const response = await req.container
      .resolve('getActualUserHandler')
      .handle(req.command)

    res.status(200).json(response)
  }))

/**
 * @swagger
 * /users/{userId}/roles:
 *   get:
 *     summary: Lista todos os cargos atribuídos a um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de cargos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/:userId/roles',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    next()
  }),
  validatorMiddleware(GetAllUserRolesByIdQuery, GetAllUserRolesByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    const response = await req.container
      .resolve('getAllUserRolesByIdHandler')
      .handle(req.command)

    res.status(200).json(response)
  }))

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
 * /users/{userId}/roles/{roleId}:
 *   patch:
 *     summary: Atribui um cargo a um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cargo a ser atribuído
 *     responses:
 *       204:
 *         description: Cargo atribuído com sucesso
 */
router.patch('/:userId/roles/:roleId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    req.body.roleId = req.params.roleId
    next()
  }),
  validatorMiddleware(JoinRoleToUserCommand, JoinRoleToUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('joinRoleToUserHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/{userId}/roles/{roleId}:
 *   delete:
 *     summary: Remove um cargo de um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cargo a ser removido
 *     responses:
 *       204:
 *         description: Cargo removido com sucesso
 */
router.delete('/:userId/roles/:roleId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.params.userId
    req.body.roleId = req.params.roleId
    next()
  }),
  validatorMiddleware(RemoveRoleFromUserCommand, RemoveRoleFromUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('removeRoleFromUserHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualiza os dados do usuário autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
router.put('/me',
  authMiddleware({ role: Roles.USER }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.userId = req.user.userId
    next()
  }),
  validatorMiddleware(UpdateActualUserCommand, UpdateActualUserValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('updateActualUserHandler')
      .handle(req.command)

    res.status(204).send()
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

export default router