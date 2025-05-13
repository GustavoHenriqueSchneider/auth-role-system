import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
})

redisClient.on('error', err => {
  console.error('Erro no Redis:', err)
})

await redisClient.connect()
  .catch(err => console.error('Falha na conexão com o Redis', err))

export default redisClient