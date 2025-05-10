import bcrypt from 'bcrypt'
import PasswordHasherService from '../../services/passwordHasherService.js'
import Roles from '../../../domain/auth/roles.js'

import { config } from 'dotenv'
import RandomDataGeneratorService from '../../../application/services/randomDataGeneratorService.js'
config()

export async function seed(knex) {
  const roles = await knex('roles')
    .whereNot({ name: Roles.ADMIN })
    .select('id')

  const [ { userId } ] = await knex('users')
    .insert({
      name: 'Fake User',
      email: RandomDataGeneratorService.generateEmail(),
      password_hash: bcrypt.hashSync(RandomDataGeneratorService.generatePassword(), PasswordHasherService.SALT_ROUNDS),
      is_verified: true,
      created_at: new Date(),
      updated_at: null
    })
    .returning('id as userId')

  await knex('user_roles').insert(roles.map(role => ({
    user_id: userId,
    role_id: role.id
  })))
}