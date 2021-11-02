import { UserController } from '../controller/users.controller'
import { Router } from 'express'

<<<<<<< HEAD
<<<<<<< HEAD
export class UserRouter {
  public route: Router
  protected UserController: UserController
  // private login: UserController.findUser
  constructor() {
    this.route = Router()
    this.routes()
  }

  public routes() {
    this.route.get('/', () => this.UserController.getAllUser)
    this.route.post('/signup', () => this.UserController.createUser)
    this.route.post('/login', () => this.UserController.findUser)
    // this.route.put('/:id', this.updateUser)
  }
}
=======
import { UserController } from '../controller'

export const authRouter = express.Router()

authRouter.use('/', UserController.buildRouter())
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
=======
import { UserController } from '../controller'

export const authRouter = express.Router()

authRouter.use('/', UserController.buildRouter())
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
