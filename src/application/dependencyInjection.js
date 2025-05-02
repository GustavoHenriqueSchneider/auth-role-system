import { asClass } from 'awilix'

import RegisterUserHandler from './usecases/auth/registerUser/registerUserHandler.js'
import ConfirmUserEmailHandler from './usecases/auth/confirmUserEmail/confirmUserEmailHandler.js'

export default container => {
  container.register({
    registerUserHandler: asClass(RegisterUserHandler).scoped(),
    confirmUserEmailHandler: asClass(ConfirmUserEmailHandler).scoped()
  })
}