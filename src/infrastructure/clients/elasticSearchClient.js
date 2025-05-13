import { Client } from '@elastic/elasticsearch'
import { config } from 'dotenv'
config()

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
})

export default elasticClient