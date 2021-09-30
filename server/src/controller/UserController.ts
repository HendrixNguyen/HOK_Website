import { User } from '../entities/User'
import express, { NextFunction, Request, Response, Router } from 'express'

export class UserController {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  public getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await User.find()
      res.status(201).send(users)
    } catch (err) {
      console.error(err)
    }
  }

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await res.status(201).send('succeed')
    } catch (err) {
      await res.status(404).send(err)
    }
  }

  //find 1 user:id
  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await res.status(201).send('succeed')
    } catch (err) {
      await res.status(404).send(err)
    }
  }

  //update user
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await res.status(201).send('succeed')
    } catch (err) {
      await res.status(404).send(err)
    }
  }
  //delete user

  public routes() {
    this.router.get('/', this.getAllUser)
    this.router.post('/signup', this.createUser)
    this.router.post('/login', this.findUser)
    this.router.put('/:id', this.updateUser)
  }
}
