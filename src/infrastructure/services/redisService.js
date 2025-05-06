export default class RedisService {
  constructor({ redisClient }) {
    this._redisClient = redisClient
  }

  setData = async (key, value, { expiration = 3600 } = {}) => {
    try {
      await this._redisClient.setEx(key, expiration, JSON.stringify(value))

    } catch (error) {

      console.error('Erro ao armazenar dados no Redis')
      throw error
    }
  }

  getData = async key => {
    try {
      const data = await this._redisClient.get(key)
      return data ? JSON.parse(data) : null

    } catch (error) {

      console.error('Erro ao buscar dados no Redis')
      return null
    }
  }

  deleteData = async key => {
    try {
      await this._redisClient.del(key)

    } catch (error) {

      console.error('Erro ao deletar dados no Redis')
      throw error
    }
  }
}
