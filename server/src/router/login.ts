import express from 'express'

const route = express.Router()

route.get('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(202).send('Succeed')
  } catch (e) {
    console.log(e)
  }
})
