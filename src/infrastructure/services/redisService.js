export default class RedisService {
  #redisClient

  constructor({ redisClient }) {
    this.#redisClient = redisClient
  }

  setData = async (key, value, { expiration = 3600 } = {}) => {
    try {
      await this.#redisClient.setEx(key, expiration, JSON.stringify(value))

    } catch (error) {

      console.error('Erro ao armazenar dados no Redis')
      throw error
    }
  }

  getData = async key => {
    try {
      const data = await this.#redisClient.get(key)
      return data ? JSON.parse(data) : null

    } catch (error) {

      console.error('Erro ao buscar dados no Redis')
      return null
    }
  }

  deleteData = async key => {
    try {
      await this.#redisClient.del(key)

    } catch (error) {

      console.error('Erro ao deletar dados no Redis')
      throw error
    }
  }
}
