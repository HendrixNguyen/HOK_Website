import {UserController} from '../controller'
import {Router} from "express";

export const authRouter = Router()

authRouter.use('/', UserController.buildRouter())

