import LogTypes from "../../domain/logTypes"

export default class LoggerService {
  #elasticSearchClient

  constructor({ elasticSearchClient }) {
    this.#elasticSearchClient = elasticSearchClient
  }

  #buildMetadata = () => {
    const ip = session.get('ip')
    const method = session.get('method')
    const endpoint = session.get('endpoint')
    const userAgent = session.get('userAgent')
    const userId = session.get('userId')

    return {
      ip,
      method,
      endpoint,
      userAgent,
      userId
    }
  }

  log = async ({ level = 'info', message }) => {
    try {
      await this.#elasticSearchClient.index({
        index: LogTypes.APPLICATION,
        document: {
          timestamp: new Date().toISOString(),
          level,
          message,
          metadata: this.#buildMetadata()
        }
      })
    } catch (error) {

      console.error(`Erro ao criar log no elastic-search`)
      throw error
    }
  }

  logError = async message => {
    await this.log({ level: LogTypes.ERROR, message })
  }

  deleteLogsByUserId = async (userId) => {
    try {
      await this.#elasticSearchClient.deleteByQuery({
        index: LogTypes.APPLICATION,
        query: {
          match: { 'metadata.userId': userId }
        }
      })
    } catch (error) {

      console.error(`Erro ao deletar logs no elastic-search`)
      throw error
    }
  }

  anonymizeLogsByUserId = async (userId, anonymousData) => {
    try {
      await this.#elasticSearchClient.updateByQuery({
        index: LogTypes.APPLICATION,
        script: {
          source: `
            if (ctx._source.metadata.containsKey("name")) {
              ctx._source.metadata.name = params.name;
            }
            if (ctx._source.metadata.containsKey("email")) {
              ctx._source.metadata.email = params.email;
            }`,
          lang: 'painless',
          params: {
            name: anonymousData.name,
            email: anonymousData.email
          }
        },
        query: {
          match: { 'metadata.userId': userId }
        }
      })
    } catch (error) {

      console.error(`Erro ao anonimizar logs no elastic-search`)
      throw error
    }
  }
}
