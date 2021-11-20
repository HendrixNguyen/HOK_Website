import { AuthController } from '../controller'
import { Router } from 'express'

export const authRouter = Router()

authRouter.use('/', AuthController.buildRouter())
