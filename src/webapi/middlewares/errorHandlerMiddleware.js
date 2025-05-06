export default async (err, req, res, next) => {
    err.statusCode ||= 500
    err.message ||= 'Erro interno no servidor.'

    res.status(err.statusCode).json({ error: { message: err.message, details: err.details } })
}