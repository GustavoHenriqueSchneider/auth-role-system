import { body } from 'express-validator'

export default [
  body('userId')
    .notEmpty()
    .withMessage('O id do usuário é obrigatório')
    .isNumeric()
    .withMessage('O id do usuário precisa ser do tipo int')
]