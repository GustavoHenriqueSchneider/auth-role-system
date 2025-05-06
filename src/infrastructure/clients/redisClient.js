import { createClient } from 'redis'

const redisClient = createClient({ url: process.env.REDIS_URL })

redisClient.on('error', err => {
    console.error('Erro no Redis:', err)
})

await redisClient.connect()
    .catch(err => console.error('Falha na conexão com o Redis', err))

export default redisClient