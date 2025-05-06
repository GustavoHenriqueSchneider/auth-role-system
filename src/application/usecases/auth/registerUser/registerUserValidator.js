import { body } from 'express-validator'
import passwordValidator from '../../../validators/passwordValidator.js'

export default [
    body('name')
        .notEmpty()
        .withMessage('O nome é obrigatório')
        .isLength({ max: 200 })
        .withMessage('O nome deve ter no máximo 200 caracteres'),

    body('email')
        .notEmpty()
        .withMessage('O email é obrigatório')
        .isEmail()
        .withMessage('O email informado é inválido'),

    passwordValidator('password')
]