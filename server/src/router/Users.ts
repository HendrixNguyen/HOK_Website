import { UserController } from '../controller'
import { Router } from "express";

export const usersRouter = Router()

usersRouter.use('/', UserController.buildRouter())

