import { Router } from 'express'

import { register } from './handlers/register'
import { login } from './handlers/login'
import { auth } from './middlewares/auth'
import { data } from './handlers/data'

export const router = Router()

router.use('/api/register', register)
router.use('/api/login', login)
router.use('/api/data', auth, data)
