import { body } from 'express-validator'

export default [
  body('email')
    .notEmpty()
    .withMessage('O email é obrigatório')
    .isEmail()
    .withMessage('O email informado é inválido')
]