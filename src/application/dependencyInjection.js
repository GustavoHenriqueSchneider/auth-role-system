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
import GetRoleByIdHandler from './usecases/role/getRoleById/getRoleByIdHandler.js'
import UpdateRoleByIdHandler from './usecases/role/updateRoleById/updateRoleByIdHandler.js'

import AnonymizeActualUserHandler from './usecases/user/anonymizeActualUser/anonymizeActualUserHandler.js'
import AnonymizeUserByIdHandler from './usecases/user/anonymizeUserById/anonymizeUserByIdHandler.js'
import DeleteActualUserHandler from './usecases/user/deleteActualUser/deleteActualUserHandler.js'
import DeleteUserByIdHandler from './usecases/user/deleteUserById/deleteUserByIdHandler.js'
import GetActualUserHandler from './usecases/user/getActualUser/getActualUserHandler.js'
import GetAllUserRolesByIdHandler from './usecases/user/getAllUserRolesById/getAllUserRolesByIdHandler.js'
import GetUserByIdHandler from './usecases/user/getUserById/getUserByIdHandler.js'
import JoinRoleToUserHandler from './usecases/user/joinRoleToUser/joinRoleToUserHandler.js'
import RemoveRoleFromUserHandler from './usecases/user/removeRoleFromUser/removeRoleFromUserHandler.js'
import UpdateActualUserHandler from './usecases/user/updateActualUser/updateActualUserHandler.js'
import UpdateUserByIdHandler from './usecases/user/updateUserById/updateUserByIdHandler.js'

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
    deleteRoleByIdHandler: asClass(DeleteRoleByIdHandler).scoped(),
    getRoleByIdHandler: asClass(GetRoleByIdHandler).scoped(),
    updateRoleByIdHandler: asClass(UpdateRoleByIdHandler).scoped()
  })
}

const registerUserUseCases = container => {
  container.register({
    anonymizeActualUserHandler: asClass(AnonymizeActualUserHandler).scoped(),
    anonymizeUserByIdHandler: asClass(AnonymizeUserByIdHandler).scoped(),
    deleteActualUserHandler: asClass(DeleteActualUserHandler).scoped(),
    deleteUserByIdHandler: asClass(DeleteUserByIdHandler).scoped(),
    getActualUserHandler: asClass(GetActualUserHandler).scoped(),
    getAllUserRolesByIdHandler: asClass(GetAllUserRolesByIdHandler).scoped(),
    getUserByIdHandler: asClass(GetUserByIdHandler).scoped(),
    joinRoleToUserHandler: asClass(JoinRoleToUserHandler).scoped(),
    removeRoleFromUserHandler: asClass(RemoveRoleFromUserHandler).scoped(),
    updateActualUserHandler: asClass(UpdateActualUserHandler).scoped(),
    updateUserByIdHandler: asClass(UpdateUserByIdHandler).scoped()
  })
}

export default container => {
  registerAuthUseCases(container)
  registerLogUseCases(container)
  registerRoleUseCases(container)
  registerUserUseCases(container)
}