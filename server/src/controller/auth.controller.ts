import { Request, Response, Router } from 'express'

export class AuthController {
  public static buildRouter(): Router {
    const router = Router()
    const self = new this()
    router.post('register', self.postRegister)
    // router.post('login', self.postLogin)
    return router
  }

  public postRegister = async (req: Request, res: Response) => {
    console.log(req.body)
    res.status(201).send({
      success: true,
    })
  }
}
