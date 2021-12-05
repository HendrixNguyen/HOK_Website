import { Request, Response, Router } from 'express'

export class MathController {
  public static buildRouter() {
    const router = Router()
    const self = new this()

    router.get('/', self.getRoom())

    return router
  }

  public getRoom = async (req: Request, res: Response) => {}
}
