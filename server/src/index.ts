import express, { Application, Request, Response } from 'express'
import { UserController } from './controller/index'

export class Server {
  private app: Application
  protected UserController: UserController

  constructor() {
    //create App with express server
    this.app = express()
    this.configuration()
    this.routes()
  }

  public routes() {
    this.app.get('/auth/', this.UserController.router)
    this.app.get('/', async (req: Request, res: Response) => {
      await res.status(200).json({ message: 'This is default home' })
    })
  }
  public configuration(): void {
    this.app.set('port', process.env.PORT || 3000)
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`This server has been started on ${this.app.get('port')})}`)
    })
  }
}

const server = new Server()
server.start()
