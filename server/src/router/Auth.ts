import express from 'express'

import { getUser } from '../controller/index'

const route = express.Router()

route.get('/', async (req: express.Request, res: express.Response) => {
  try {
    await res.status(202).send('Succeed')
  } catch (e) {
    console.log(e)
  }
})

route.post('/login', getUser)
