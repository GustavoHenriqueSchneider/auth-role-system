import { body } from 'express-validator'

export default [
  body('name')
    .notEmpty()
    .withMessage('O nome do cargo é obrigatório')
    .isAlpha()
    .withMessage('O nome do cargo precisa conter somente caracteres')
]