import { body } from 'express-validator'

export default [
    body('name')
        .notEmpty()
        .withMessage('Nome é obrigatório'),

    body('email')
        .isEmail()
        .withMessage('E-mail inválido'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Senha deve ter no mínimo 8 caracteres'),
]