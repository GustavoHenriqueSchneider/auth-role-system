import express from 'express'
import { searchLogs } from '../controllers/logs.js'

const router = express.Router()

router.get('/', searchLogs)

export default router