import { createClient } from 'redis'

export default class RedisService {
  constructor() {
    this._client = createClient({ url: process.env.REDIS_URL })

    this._client()
      .catch((err) => console.error('Falha na conexão com o Redis', err))
  }

  setData = async (key, value, { expiration = 3600 } = {}) => {
    try {
      await this._client.setEx(key, expiration, JSON.stringify(value))

    } catch (error) {

      console.error('Erro ao armazenar dados no Redis:', error)
    }
  }

  getData = async key => {
    try {
      const data = await this._client.get(key)
      return data ? JSON.parse(data) : null

    } catch (error) {

      console.error('Erro ao buscar dados no Redis:', error)
      return null
    }
  }

  deleteData = async key => {
    try {
      await this._client.del(key)

    } catch (error) {

      console.error('Erro ao deletar dados no Redis:', error)
    }
  }
}
