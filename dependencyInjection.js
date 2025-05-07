import { createContainer } from 'awilix'

import buildApplicationDependencies from './src/application/dependencyInjection.js'
import buildInfrastructureDependencies from './src/infrastructure/dependencyInjection.js'

export const container = createContainer()

export function setupDependencies() {
  buildApplicationDependencies(container)
  buildInfrastructureDependencies(container)
}