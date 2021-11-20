import { Router } from 'express'
import { authRouter } from './Auth'
import { usersRouter } from './Users'

export const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
