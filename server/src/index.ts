import { router } from './router/index'
import express, { Application } from 'express'
import morgan from 'morgan'
import dbConnection from './config/dbconfig'
import passport from "passport";

export class Server {
  private app: Application

  constructor() {
    //create App with express server
    this.app = express()
    this.configuration()
  }

  public async routes() {
    this.app.use(router)
  }

  public configuration(): void {
    this.app.set('port', process.env.PORT || 3000)
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(passport.initialize());
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
