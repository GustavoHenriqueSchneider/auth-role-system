import express from 'express'
import { 
    createRole, 
    getRole, 
    putRole, 
    deleteRole 
} from '../controllers/roles.js'

const router = express.Router()

router.post('/', createRole)
router.get('/', getRole)
router.put('/:id', putRole)
router.delete('/:id', deleteRole)

export default router