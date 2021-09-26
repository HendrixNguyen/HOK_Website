import express from 'express'

const route = express.Router()

route.get('/', async (req: express.Request, res: express.Response) => {
  try {
    await res.status(202).send('Succeed')
  } catch (e) {
    console.log(e)
  }
})
