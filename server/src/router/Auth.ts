import { UserController } from '../controller/users.controller'
import { Router } from 'express'

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
