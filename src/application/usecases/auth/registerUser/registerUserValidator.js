import { body } from 'express-validator'
import passwordValidator from '../../../validators/passwordValidator.js'

export default [
    body('name')
        .notEmpty()
        .withMessage('Nome é obrigatório'),

    body('email')
        .isEmail()
        .withMessage('E-mail inválido'),

    passwordValidator('password')
]