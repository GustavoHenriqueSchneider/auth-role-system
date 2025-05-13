import { config } from 'dotenv'
config()

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    migrations: { directory: './src/infrastructure/database/migrations' },
    seeds: { directory: './src/infrastructure/database/seeds' }
  }
}