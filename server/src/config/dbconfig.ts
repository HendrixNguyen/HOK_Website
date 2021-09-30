import { createConnection } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const dbConnection = async () => {
  try {
    const conn = await createConnection({
      type: 'postgres',
      url: process.env.DB_DEV_URI,
      synchronize: true,
      logging: true,
      entities: ['src/entity/*.ts'],
      migrations: ['src/migrations/**/*.ts'],
    })

    console.log(`DB is connected to ${conn.isConnected}`)
  } catch (err) {
    console.error(err)
  }
}

//   await createConnection({
//     type: 'postgres',
//     host: process.env.DB_HOST || 'localhost',
//     port: 5432,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     synchronize: true,
//     logging: true,
//     entities: ['src/entity/**/*.ts'],
//     migrations: ['src/migration/**/*.ts'],
//     // subscribers: ['src/subscriber/**/*.ts'],
//   })
// }

export default dbConnection
