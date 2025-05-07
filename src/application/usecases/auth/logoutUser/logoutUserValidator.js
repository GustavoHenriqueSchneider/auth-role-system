import { body } from 'express-validator'

export default [
  body('userId')
    .notEmpty()
    .withMessage('O email é obrigatório')
]