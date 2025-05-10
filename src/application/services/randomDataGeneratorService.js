import { faker } from '@faker-js/faker'

export default class RandomDataGeneratorService {
  static generateEmail = () => {
    return faker.internet.email({ provider: 'fakeDomainForAnonymization' })
  }

  static generatePassword = () => {
    return faker.internet.password({ length: 20, prefix: 'Ab@1' })
  }
}