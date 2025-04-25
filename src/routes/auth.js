import express from 'express'
import { 
    register, 
    confirmEmail, 
    login, 
    requestPasswordReset, 
    resetPassword
} from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/email/validate', confirmEmail)
router.post('/login', login)
router.post('/reset-password', requestPasswordReset)
router.post('/reset-password/confirm', resetPassword)

export default router