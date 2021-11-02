import { Router } from 'express'
import { authRouter } from './Auth'

export const router = Router()

router.use('/auth', authRouter)
