import { body } from 'express-validator'

export default [
  body('roleId')
    .notEmpty()
    .withMessage('O id do cargo é obrigatório'),

  body('name')
    .notEmpty()
    .withMessage('O nome do cargo é obrigatório')
    .isAlpha()
    .withMessage('O nome do cargo precisa conter somente caracteres')
]