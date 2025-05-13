import session from '../../../namespace.js'

export default async (req, res, next) => {
  session.run(() => {
    session.set('ip', req.ip)
    session.set('method', req.method)
    session.set('endpoint', req.originalUrl)
    session.set('userAgent', req.headers['user-agent'])

    next()
  })
}
