import { body } from 'express-validator'

export default propertyName => {
    return body(propertyName)
        .notEmpty()
        .withMessage('A senha é obrigatória')
        .isLength({ min: 8 })
        .withMessage('A senha deve ter no mínimo 8 caracteres')
        .isLength({ max: 20 })
        .withMessage('A senha deve ter no máximo 20 caracteres')
        .matches(/\d/)
        .withMessage('A senha deve conter pelo menos um número')
        .matches(/[A-Z]/)
        .withMessage('A senha deve conter pelo menos uma letra maiúscula')
        .matches(/[a-z]/)
        .withMessage('A senha deve conter pelo menos uma letra minúscula')
}