import { body } from 'express-validator'

export default [
  body('userId')
    .notEmpty()
    .withMessage('O id do usuário é obrigatório')
    .isNumeric()
    .withMessage('O id do usuário precisa ser do tipo int'),

  body('name')
    .notEmpty()
    .withMessage('O nome é obrigatório')
    .isLength({ max: 200 })
    .withMessage('O nome deve ter no máximo 200 caracteres')
]