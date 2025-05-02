import { body } from 'express-validator'

export default propertyName => {
    return body(propertyName)
        .isLength({ min: 8 })
        .withMessage('Senha deve ter no mínimo 8 caracteres')
        .isLength({ max: 20 })
        .withMessage('Senha deve ter no máximo 20 caracteres')
        .matches(/\d/)
        .withMessage('Senha deve conter pelo menos um número')
        .matches(/[A-Z]/)
        .withMessage('Senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/)
        .withMessage('Senha deve conter pelo menos uma letra minúscula')
}