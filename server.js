import express from 'express'
import { scopePerRequest } from 'awilix-express'
import { config } from 'dotenv'

import { setupDependencies, container } from './dependencyInjection.js'

import errorHandlerMiddleware from './src/webapi/middlewares/errorHandlerMiddleware.js'

import authController from './src/webapi/controllers/authController.js'
import logController from './src/webapi/controllers/logController.js'
import roleController from './src/webapi/controllers/roleController.js'
import userController from './src/webapi/controllers/userController.js'

config()
setupDependencies()

const app = express()
app.use(express.json())
app.use(scopePerRequest(container))

app.use('/auth', authController)
app.use('/logs', logController)
app.use('/roles', roleController)
app.use('/users', userController)

app.use(errorHandlerMiddleware)
app.listen(3000, () => console.log('running'))

// TODO: criar docker-compose com elasticsearch
// TODO: implementar swagger, eslint