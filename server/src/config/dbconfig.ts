import { createConnection } from 'typeorm'
import { dirname, join } from 'path'

const dbConnection = async () => {
  try {
    const conn = await createConnection({
<<<<<<< HEAD
<<<<<<< HEAD
      type: 'mysql', //mysql
      host: 'localhost',
      port: 3306, //3306
      username: process.env.DB_USERNAME_DEV,
      password: process.env.DB_PASSWORD_DEV,
      database: process.env.DB_DATABASE_DEV,
=======
=======
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
<<<<<<< HEAD
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
=======
>>>>>>> d2f361a (Feature/direct route to routefolder (#7))
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
