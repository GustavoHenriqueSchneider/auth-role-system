import knex from 'knex'
import knexfile from '../../../knexfile.js'

const knexClient = knex(knexfile.development)
export default knexClient