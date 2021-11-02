import { router } from './router/index'
import express, { Application } from 'express'
import morgan from 'morgan'
import dbConnection from './config/dbconfig'
import { UserRouter } from './router'

export class Server {
  private app: Application
  protected UserRouter: UserRouter

  constructor() {
    //create App with express server
    this.app = express()
    this.configuration()
  }

  public async routes() {
<<<<<<< HEAD
<<<<<<< HEAD
    this.UserRouter = new UserRouter()

    this.app.use('/auth/', this.UserRouter.route)
    this.app.get('/', async (_req: Request, res: Response) => {
      await res.status(200).json({ message: 'This is default home' })
    })
=======
    this.app.use(router)
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
=======
    this.app.use(router)
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
  }

  public configuration(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(morgan('dev'))
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
