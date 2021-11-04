import {User} from '../entities/User'
import {Request, Response, Router} from 'express'

export class UserController {

  public static buildRouter(): Router {
    const router = Router()
    const self = new this();
    router.get('/', self.getAllUser)
    router.post('/', self.createUser)
    router.get('/:id', self.findUser)
    router.put('/:id', self.updateUser)
    // router.delete('/:id', self.deleteUser)
    return router
  }

  public getAllUser = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const users = await User.find()
      return res.status(201).json({users})
    } catch (err) {
      return res.status(404).send(err);
    }
  }

  public createUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const newUser = req.body()
      // const { } = req.body();
      if (newUser.username === await User.findOne('username')) {
        const result = await User.save(newUser)
        return res.json(result)
      }
      return res.status(200).send('Succeed')
    } catch (err) {
      return res.status(400).send('Error creating User')
    }
  }

  //find 1 user:id
  public findUser = async (
    _req: Request,
    res: Response,
  ) => {
    try {
      res.status(201).send('succeed')
    } catch (err) {
      res.status(404).send(err)
    }
  }

  //update user
  public updateUser = async (
    _req: Request,
    res: Response
  ) => {
    try {
      res.status(201).send('succeed')
    } catch (err) {
      res.status(404).send(err)
    }
  }

}
