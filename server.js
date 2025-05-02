import express from 'express'
import { setupDependencies, container } from './dependencyInjection.js'
import { scopePerRequest } from 'awilix-express'

import errorHandler from './src/webapi/middlewares/errorHandlerMiddleware.js'

import authController from './src/webapi/controllers/authController.js'
import logController from './src/webapi/controllers/logController.js'
import roleController from './src/webapi/controllers/roleController.js'
import userController from './src/webapi/controllers/userController.js'

setupDependencies()

const app = express()
app.use(express.json())
app.use(scopePerRequest(container))

app.use('/auth', authController)
app.use('/logs', logController)
app.use('/roles', roleController)
app.use('/users', userController)

app.use(errorHandler)
app.listen(3000, () => console.log(`running`))

// TODO: criar docker-compose com redis, postgres, elasticsearch
// TODO: implementar swagger
// TODO: implementar nodemailer