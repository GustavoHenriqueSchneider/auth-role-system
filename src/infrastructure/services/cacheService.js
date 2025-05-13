export default class CacheService {
  #redisClient
  #loggerService

  constructor({ redisClient, loggerService }) {
    this.#redisClient = redisClient
    this.#loggerService = loggerService
  }

  setData = async (key, value, { expiration = 3600 } = {}) => {
    try {
      await this.#redisClient.setEx(key, expiration, JSON.stringify(value))

    } catch (error) {

      await this.#loggerService.logError('Erro ao armazenar dados no Redis')
      throw error
    }
  }

  getData = async key => {
    try {
      const data = await this.#redisClient.get(key)
      return data ? JSON.parse(data) : null

    } catch (error) {

      await this.#loggerService.logError('Erro ao buscar dados no Redis')
      return null
    }
  }

  deleteData = async key => {
    try {
      await this.#redisClient.del(key)

    } catch (error) {

      await this.#loggerService.logError('Erro ao deletar dados no Redis')
      throw error
    }
  }
}