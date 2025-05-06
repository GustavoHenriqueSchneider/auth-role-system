import { asClass, asValue } from 'awilix'

import knexClient from './clients/knexClient.js'
import redisClient from './clients/redisClient.js'
import smtpClient from './clients/smtpClient.js'

import UserRepository from './repositories/userRepository.js'

import EmailService from './services/emailService.js'
import JwtService from './services/jwtService.js'
import PasswordHasherService from './services/passwordHasherService.js'
import RedisService from './services/redisService.js'

const registerClients = container => {
  container.register({
    knexClient: asValue(knexClient),
    redisClient: asValue(redisClient),
    smtpClient: asValue(smtpClient)
  })
}

const registerRepositories = container => {
  container.register({
    userRepository: asClass(UserRepository).singleton()
  })
}

const registerServices = container => {
  container.register({
    emailService: asClass(EmailService).singleton(),
    jwtService: asClass(JwtService).singleton(),
    passwordHasherService: asClass(PasswordHasherService).singleton(),
    redisService: asClass(RedisService).singleton()
  })
}

export default container => {
  registerClients(container)
  registerRepositories(container)
  registerServices(container)
}