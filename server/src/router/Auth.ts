import express from 'express'

import { UserController } from '../controller'

export const authRouter = express.Router()

authRouter.use('/', UserController.buildRouter())
