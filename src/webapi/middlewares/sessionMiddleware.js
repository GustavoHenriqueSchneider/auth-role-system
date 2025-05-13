import sessionNamespace from '../../../namespace.js'

export default async (req, res, next) => {
  sessionNamespace.run(() => {
    sessionNamespace.set('ip', req.ip)
    sessionNamespace.set('method', req.method)
    sessionNamespace.set('endpoint', req.originalUrl)
    sessionNamespace.set('userAgent', req.headers['user-agent'])

    next()
  })
}
