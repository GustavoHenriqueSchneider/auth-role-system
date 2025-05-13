import { asClass, asValue } from 'awilix'

import elasticSearchClient from './clients/elasticSearchClient.js'
import knexClient from './clients/knexClient.js'
import redisClient from './clients/redisClient.js'
import smtpClient from './clients/smtpClient.js'

import RoleRepository from './repositories/roleRepository.js'
import UserRepository from './repositories/userRepository.js'
import UserRolesRepository from './repositories/userRolesRepository.js'

import CacheService from './services/cacheService.js'
import EmailService from './services/emailService.js'
import JwtService from './services/jwtService.js'
import LoggerService from './services/loggerService.js'
import PasswordHasherService from './services/passwordHasherService.js'

const registerClients = container => {
  container.register({
    elasticSearchClient: asValue(elasticSearchClient),
    knexClient: asValue(knexClient),
    redisClient: asValue(redisClient),
    smtpClient: asValue(smtpClient)
  })
}

const registerRepositories = container => {
  container.register({
    roleRepository: asClass(RoleRepository).singleton(),
    userRepository: asClass(UserRepository).singleton(),
    userRolesRepository: asClass(UserRolesRepository).singleton()
  })
}

const registerServices = container => {
  container.register({
    cacheService: asClass(CacheService).singleton(),
    emailService: asClass(EmailService).singleton(),
    jwtService: asClass(JwtService).singleton(),
    loggerService: asClass(LoggerService).singleton(),
    passwordHasherService: asClass(PasswordHasherService).singleton()
  })
}

export default container => {
  registerClients(container)
  registerRepositories(container)
  registerServices(container)
}