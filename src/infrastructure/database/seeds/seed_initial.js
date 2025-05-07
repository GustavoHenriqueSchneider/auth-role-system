import bcrypt from 'bcrypt'
import PasswordHasherService from '../../services/passwordHasherService.js'
import Roles from '../../../domain/auth/roles.js'

import { config } from 'dotenv'
config()

export async function seed(knex) {
  await knex('user_roles').del()
  await knex('users').del()
  await knex('roles').del()

  const roles = await knex('roles')
    .insert([
      { name: Roles.ADMIN },
      { name: Roles.USER }
    ])
    .returning(['id', 'name'])

  const [{ adminUserId }] = await knex('users')
    .insert({
      name: 'Administrador',
      email: process.env.ADMIN_EMAIL,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, PasswordHasherService.SALT_ROUNDS),
      is_verified: true,
      created_at: new Date(),
      updated_at: null
    })
    .returning('id as adminUserId')

  await knex('user_roles').insert(roles.map(role => ({
    user_id: adminUserId,
    role_id: role.id
  })))
}