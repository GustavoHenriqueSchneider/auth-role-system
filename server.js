import express from 'express'
import { scopePerRequest } from 'awilix-express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { config } from 'dotenv'

import { setupDependencies, container } from './dependencyInjection.js'

import errorHandlerMiddleware from './src/webapi/middlewares/errorHandlerMiddleware.js'

import authController from './src/webapi/controllers/authController.js'
import roleController from './src/webapi/controllers/roleController.js'
import userController from './src/webapi/controllers/userController.js'

config()
setupDependencies()

const app = express()
app.use(express.json())
app.use(scopePerRequest(container))

const applicationUrl = `http://localhost:${process.env.APPLICATION_PORT}`
const documentationRoute = '/docs'
const documentationUrl = `${applicationUrl}${documentationRoute}`

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Role System API',
      version: '1.0.0',
      description: 'Documentação da API de autenticação e gerenciamento de usuários'
    },
    servers: [
      { url: applicationUrl }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [ './src/webapi/controllers/*.js' ]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use(documentationRoute, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// CONTROLLERs
app.use('/auth', authController)
app.use('/roles', roleController)
app.use('/users', userController)

app.use(errorHandlerMiddleware)

app.listen(process.env.APPLICATION_PORT, () =>
  console.log(`Aplicação em execução. Documentação disponível em: ${documentationUrl}`))