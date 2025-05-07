import { body } from 'express-validator'
import passwordValidator from '../../../validators/passwordValidator.js'

export default [
  body('email')
    .notEmpty()
    .withMessage('O email é obrigatório')
    .isEmail()
    .withMessage('O email informado é inválido'),

  body('code')
    .notEmpty()
    .withMessage('O código de reset de senha é obrigatório'),

  passwordValidator('password')
]