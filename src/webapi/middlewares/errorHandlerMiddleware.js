export default async (err, req, res, next) => {
    console.error(err)

    err.statusCode ||= 500
    err.message ||= 'Erro interno no servidor.'

    res.status(statusCode).json({
        error: {
            ...err.details,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    })
}