import { body } from 'express-validator'

export default [
  body('refreshToken')
    .notEmpty()
    .withMessage('O refresh token é obrigatório')
]