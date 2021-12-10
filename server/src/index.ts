import { router } from './router'
import express, { Application } from 'express'
import morgan from 'morgan'
import dbConnection from './config/dbconfig'
import { MigrateManager } from './migrates'
import cors from 'cors'

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
    this.app.use(cors())
  }

  public async init() {
    await dbConnection()
    await MigrateManager.run()
    await this.routes()
  }

  public async start() {
    await new Promise<void>((done) => {
      this.app.listen(this.app.get('port'), () => {
        console.log(`This server has been started on ${this.app.get('port')}`)
        done()
      })
    })
  }
}

const server = new Server()
server.init()
server.start()
