import { createConnection } from 'typeorm'
import { dirname, join } from 'path'

const dbConnection = async () => {
  try {
    const conn = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [join(dirname(dirname(__filename)), 'entities', '*.ts')],
      migrations: [join(dirname(dirname(__filename)), 'migrations', '*.ts')],
    }).catch((e) => {
      console.error('ERROR: Không thể kết nối tới Database !')
      console.error(e)
      process.exit(1)
    })

    await conn.runMigrations()

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
