import { asClass } from 'awilix'

import ConfirmUserEmailHandler from './usecases/auth/confirmUserEmail/confirmUserEmailHandler.js'
import LoginUserHandler from './usecases/auth/loginUser/loginUserHandler.js'
import LogoutUserHandler from './usecases/auth/logoutUser/logoutUserHandler.js'
import RefreshTokenHandler from './usecases/auth/refreshToken/refreshTokenHandler.js'
import RegisterUserHandler from './usecases/auth/registerUser/registerUserHandler.js'
import ResendUserEmailConfirmationHandler from './usecases/auth/resendUserEmailConfirmation/resendUserEmailConfirmationHandler.js'
import ResetUserPasswordHandler from './usecases/auth/resetUserPassword/resetUserPasswordHandler.js'
import SendUserPasswordResetEmailHandler from './usecases/auth/sendUserPasswordResetEmail/sendUserPasswordResetEmailHandler.js'

import CreateRoleHandler from './usecases/role/createRole/createRoleHandler.js'
import DeleteRoleByIdHandler from './usecases/role/deleteRoleById/deleteRoleByIdHandler.js'
import UpdateRoleByIdHandler from './usecases/role/updateRoleById/updateRoleByIdHandler.js'

const registerAuthUseCases = container => {
  container.register({
    confirmUserEmailHandler: asClass(ConfirmUserEmailHandler).scoped(),
    loginUserHandler: asClass(LoginUserHandler).scoped(),
    logoutUserHandler: asClass(LogoutUserHandler).scoped(),
    refreshTokenHandler: asClass(RefreshTokenHandler).scoped(),
    registerUserHandler: asClass(RegisterUserHandler).scoped(),
    resendUserEmailConfirmationHandler: asClass(ResendUserEmailConfirmationHandler).scoped(),
    resetUserPasswordHandler: asClass(ResetUserPasswordHandler).scoped(),
    sendUserPasswordResetEmailHandler: asClass(SendUserPasswordResetEmailHandler).scoped()
  })
}

const registerLogUseCases = container => {
  container.register({})
}

const registerRoleUseCases = container => {
  container.register({
    createRoleHandler: asClass(CreateRoleHandler).scoped(),
    //
    deleteRoleByIdHandler: asClass(DeleteRoleByIdHandler).scoped(),
    updateRoleByIdHandler: asClass(UpdateRoleByIdHandler).scoped()
  })
}

const registerUserUseCases = container => {
  container.register({})
}

export default container => {
  registerAuthUseCases(container)
  registerLogUseCases(container)
  registerRoleUseCases(container)
  registerUserUseCases(container)
}