import { body } from 'express-validator'

export default [
  body('roleId')
    .notEmpty()
    .withMessage('O id do cargo é obrigatório')
    .isNumeric()
    .withMessage('O id do cargo precisa ser do tipo int')
]