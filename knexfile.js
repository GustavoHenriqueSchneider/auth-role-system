import { config } from 'dotenv'
config()

export default {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: { directory: './src/infrastructure/database/migrations' },
    seeds: { directory: './src/infrastructure/database/seeds' }
  }
}