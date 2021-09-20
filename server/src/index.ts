require("dotenv").config()
import express from "express"
import "body-parser"

const app = express()

const bodyParser = require("body-parser")

const cors = require("cors")

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Dating application." })
})

/* 
app.get("/", (req, res) => {
    res.render({ "../../client/src/main.jsx"})
})
*/

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
function corsOptions(corsOptions: any): any {
    throw new Error("Function not implemented.")
}

