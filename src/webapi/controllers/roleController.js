/* eslint-disable function-call-argument-newline */
import express from 'express'

import Roles from '../../domain/auth/roles.js'

import asyncHandlerMiddleware from '../middlewares/asyncHandlerMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validatorMiddleware from '../middlewares/validatorMiddleware.js'

import CreateRoleCommand from '../../application/usecases/role/createRole/createRoleCommand.js'
import CreateRoleValidator from '../../application/usecases/role/createRole/createRoleValidator.js'
import DeleteRoleByIdCommand from '../../application/usecases/role/deleteRoleById/deleteRoleByIdCommand.js'
import DeleteRoleByIdValidator from '../../application/usecases/role/deleteRoleById/deleteRoleByIdValidator.js'
import GetRoleByIdQuery from '../../application/usecases/role/getRoleById/getRoleByIdQuery.js'
import GetRoleByIdValidator from '../../application/usecases/role/getRoleById/getRoleByIdValidator.js'
import UpdateRoleByIdCommand from '../../application/usecases/role/updateRoleById/updateRoleByIdCommand.js'
import UpdateRoleByIdValidator from '../../application/usecases/role/updateRoleById/updateRoleByIdValidator.js'

const router = express.Router()

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria um novo cargo
 *     tags: [Roles]
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
 *       201:
 *         description: Cargo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roleId:
 *                   type: number
 */
router.post('/',
  authMiddleware({ role: Roles.ADMIN }),
  validatorMiddleware(CreateRoleCommand, CreateRoleValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    const response = await req.container
      .resolve('createRoleHandler')
      .handle(req.command)

    res.status(201).json(response)
  }))

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Exclui um cargo conforme seu ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cargo
 *     responses:
 *       204:
 *         description: Cargo excluído com sucesso
 */

router.delete('/:roleId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.roleId = req.params.roleId
    next()
  }),
  validatorMiddleware(DeleteRoleByIdCommand, DeleteRoleByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('deleteRoleByIdHandler')
      .handle(req.command)

    res.status(204).send()
  }))

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Retorna os dados de um cargo específico
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cargo
 *     responses:
 *       200:
 *         description: Dados do cargo retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 */
router.get('/:roleId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.roleId = req.params.roleId
    next()
  }),
  validatorMiddleware(GetRoleByIdQuery, GetRoleByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    const response = await req.container
      .resolve('getRoleByIdHandler')
      .handle(req.command)

    res.status(200).json(response)
  }))

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Atualiza um cargo conforme seu ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cargo
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
 *         description: Cargo atualizado com sucesso
 */
router.put('/:roleId',
  authMiddleware({ role: Roles.ADMIN }),
  asyncHandlerMiddleware(async (req, res, next) => {
    req.body.roleId = req.params.roleId
    next()
  }),
  validatorMiddleware(UpdateRoleByIdCommand, UpdateRoleByIdValidator),
  asyncHandlerMiddleware(async (req, res, next) => {
    await req.container
      .resolve('updateRoleByIdHandler')
      .handle(req.command)

    res.status(204).send()
  }))

export default router