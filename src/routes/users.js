import express from 'express'
import { 
    getUsers,
    searchUser,
    updateUser,
    deleteUser,
    anonymizeUserById,
    addUserRole,
    getUserRoles,
    getUserRoleById,
    updateMe,
    deleteMe,
    anonymizeMe
} from '../controllers/users.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/search', searchUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/anonymize', anonymizeUserById)
router.post('/:id/roles', addUserRole)
router.get('/:id/roles', getUserRoles)
router.put('/:id/roles/:roleId', getUserRoleById)
router.put('/me', updateMe)
router.delete('/me', deleteMe)
router.put('/me/anonymize', anonymizeMe)

export default router