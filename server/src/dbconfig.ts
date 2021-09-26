import { createConnection } from 'typeorm'

require('dotenv').config()

const dbConnection = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    // subscribers: ['src/subscriber/**/*.ts'],
  })
}

export default dbConnection
