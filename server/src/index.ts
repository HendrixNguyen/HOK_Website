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
  }

  public async routes() {
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
    this.app.use(express.urlencoded())
  }

  public async start() {
    if (!process.env.IS_TESTING) {
      await dbConnection()
    }

    await this.routes()

    await new Promise<void>((done) => {
      const server = this.app.listen(this.app.get('port'), () => {
        console.log(`This server has been started on ${this.app.get('port')}`)
        done()
      })

      if (process.env.IS_TESTING) {
        server.close()
      }
    })
  }
}

const server = new Server()
server.start()
