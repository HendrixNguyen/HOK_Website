import 'pg'
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  user: '{process.env.DB_USERNAME_DEV}',
  host: '{process.env.DB_HOST}',
  database: '{process.env.DB_NAME}',
  password: '{process.env.DB_PASSWORD_DEV}',
})

export default pool
