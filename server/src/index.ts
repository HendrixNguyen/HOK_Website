require('dotenv').config()
import express, { Request, Response } from 'express'
import 'body-parser'
import morgan from 'morgan'

const app = express()
const cors = require('cors')

//CORS_OPTIONS
let corsOptions = {
  origin: 'https://localhost:8080/',
}

const bodyParser = require('body-parser')

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//use morgan to console.log http request
app.use(morgan('dev'),

// simple route
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return await res.status(200).send('Home')
})

/* 
app.get("/", (req, res) => {
    res.render({ "../../client/src/main.jsx"})
})
*/

// set port, listen for requests
const PORT = process.env.PORT || 8080
try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
} catch (error) {
  console.log(`Error occurred: ${error.message}`)
}
