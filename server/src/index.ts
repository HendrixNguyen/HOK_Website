import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import dbConnection from './config/dbconfig'
import { UserController } from './controller/users.controller'

export class Server {
  private app: Application
  protected UserController: UserController

  constructor() {
    //create App with express server
    this.app = express()
    this.configuration()
    this.routes()
  }

  public async routes() {
    dbConnection()
    this.UserController = new UserController()

    this.app.get('/auth/', this.UserController.router)
    this.app.get('/', async (_req: Request, res: Response) => {
      await res.status(200).json({ message: 'This is default home' })
    })
  }

  public configuration(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(morgan('dev'))
  }

  public start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`This server has been started on ${this.app.get('port')}`)
    })
  }
}

const server = new Server()
server.start()
